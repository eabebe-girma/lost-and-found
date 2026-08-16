# Program flow:
    # main.py recieves image from React frontend
    # main.py saves image --> gives it to CLIP --> save info

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware #used to make sure frontend and backend are allowed ro talk to each other when running on browswer (when testing app on laptop)
from pathlib import Path  #Python tool for working with files and folders
import shutil #gives Python tools for copying files 

app = FastAPI() #creating API application and storing that backend in varibale "app"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"], #saying allow my web app running at this address to communicated with me(backend)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    image_path = UPLOAD_DIR / image.filename # gives path to save image --> becomes: uploads/images/blahblah.jpg

    with image_path.open("wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return { #info sent to backend
        "message": "Found item saved",
        "image_path": str(image_path),
        "location": location
    }

