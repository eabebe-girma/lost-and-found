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

def save_embedding(item_id, embedding): #saving embedding under given item_id
    with open("embeddings.json", "r") as file:
        embeddings = json.load(file)

    #Note: json doesnt understand tensors, so we're have to convert to Python list
    embeddings[item_id] = embedding.squeeze().tolist() 

    with open("embeddings.json", "w") as file:
        json.dump(embeddings, file, indent=4)

def calculate_similarity(image_embedding, text_embedding):
    similarity = image_embedding @ text_embedding.T #calcualting dot product (gives angle between vector)
    return similarity.item() #converts tensor into a normal number
    #note: a highed value = more similar








# Testing code in this file
if __name__ == "__main__": 
    embed1 = get_image_embedding("uploads/images/found-item.jpg")
    embed2 = get_text_embedding("Lined spiral notebook with writing in pencil")
    similarity = calculate_similarity(embed1, embed2)

    print(similarity)

    print("Embedding shape:", embed1.shape)

    save_embedding("test-item", embed1)
    print("Embedding saved!")

    print("text embedding:", embed2.shape)

