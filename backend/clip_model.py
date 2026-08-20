from transformers import CLIPProcessor, CLIPModel 
from PIL import Image
import torch 
import json

model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
)

processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
) 

def get_image_embedding(image_path):
    image = Image.open(image_path).convert("RGB")

    inputs = processor(
        images=image,
        return_tensors="pt"
    )

    #this is where CLIP is given the image to produce an embedding
    with torch.no_grad():
        image_embedding = model.get_image_features(**inputs).pooler_output
        norm_embedding = image_embedding / image_embedding.norm(dim=-1, keepdim=True)

    return norm_embedding #basically a tensor containing the embedding

def get_text_embedding(text):
    inputs = processor(
        text=text,
        return_tensors="pt",
        padding=True
    )

    with torch.no_grad():
        text_embedding = model.get_text_features(**inputs).pooler_output
        norm_embedding = text_embedding / text_embedding.norm(p=2, dim=-1, keepdim=True)

    return norm_embedding #tensor containing text embedding

def save_embedding(item_id, image_filename, location, embedding): #saving embedding under given item_id
    with open("embeddings.json", "r") as file:
        embeddings = json.load(file)

    embeddings[item_id] = {  #dictionary of dicts w/ key being item_id
        "image": image_filename,
        "location": location,
        "embedding": embedding.squeeze().tolist()  #Note: json doesnt understand tensors, so we're have to convert to Python list
    }

    with open("embeddings.json", "w") as file:
        json.dump(embeddings, file, indent=4)

def calculate_similarity(image_embedding, text_embedding):
    similarity = image_embedding @ text_embedding.T #calcualting dot product (gives angle between vector)
    return similarity.item() #converts tensor into a normal number
    #note: a highed value = more similar

def find_matches(text_embedding):
    with open("embeddings.json", "r") as file:
        embeddings = json.load(file)

    matches = [] #list of dictionaries, where e/ dict is a potential match

    for item_id, item_data in embeddings.items():
        saved_embedding = item_data["embedding"]

        image_embedding = torch.tensor(saved_embedding).unsqueeze(0) #preparing embedding so model can process it

        similarity = calculate_similarity(image_embedding, text_embedding)

        matches.append({
            "item_id": item_id,
            "image": item_data["image"],
            "location": item_data["location"],
            "similarity": similarity
        })

        matches.sort( #sorting from highest --> lowest similarity
            key=lambda x: x["similarity"],
            reverse=True
        )

        return matches #returning list of dictionaries

    





# Testing code in this file
if __name__ == "__main__": 
    text_embed = get_text_embedding("White eraser with blue and white paper wrapper")

    matches = find_matches(text_embed) 

    print("Matches:")
    for match in matches:
        print(match)


