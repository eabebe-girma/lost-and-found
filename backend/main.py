# Program flow:
    # main.py recieves image from React frontend
    # main.py saves image --> gives it to CLIP --> save info

from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware #used to make sure frontend and backend are allowed ro talk to each other when running on browswer (when testing app on laptop)
from fastapi.staticfiles import StaticFiles
from pathlib import Path  #Python tool for working with files and folders
import shutil #gives Python tools for copying files 
import uuid; #Python's way of generating unique identifiers 

from clip_model import get_image_embedding, get_text_embedding, save_embedding, find_matches

app = FastAPI() #creating API application and storing that backend in varibale "app"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"], #saying allow my web app running at this address to communicated with me(backend)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads") #tells FastAPI that for "/uploads" requests look inside uplodas folder


UPLOAD_DIR = Path("uploads/images")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True) #creates uploads/images folder if it doesnt already exist


#First endpoint is for homepage
@app.get("/")
async def home():
    return {"message" : "Lost and Found backend is running!"}  #info sent to backend


#Creating an endpoint for backend to recieve image from report-found
@app.post("/report-found")
async def report_found( #function that deals with above request with 2 parameters: image and location
    image: UploadFile = File(...),  
    location: str = Form(...)
 ):  # same thing, ... means its required 

    #1. Generate unique ID and name image
    item_id = str(uuid.uuid4())
    file_name = f"{item_id}.jpg"
    image_path = UPLOAD_DIR / file_name; # gives path to save image --> becomes: uploads/images/blahblah.jpg

    #2. Save image
    with image_path.open("wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    #3. Send saved image to CLIP and get embedding
    embedding = get_image_embedding(image_path)

    #4. Save that embedding to JSON file 
    save_embedding(item_id, file_name, location, embedding)

    return { #info sent to frontend
        "message": "Item reported successfully!",
    }

#Creating a Python model that tells FastAPI a list-item request should contain a field called description which is a string
class LostItem(BaseModel): 
    description: str

@app.post("/report-lost")
async def report_lost(
    item: LostItem
):
    description = item.description

    #1. Use CLIP to get text embedding
    text_embedding = get_text_embedding(description)

    #2. Compare text embedding with all image embeddings 
    matches = find_matches(text_embedding)

    return {
        "matches": matches
    }