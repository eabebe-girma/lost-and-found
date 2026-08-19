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
        embedding = model.get_image_features(**inputs).pooler_output
        norm_embedding = embedding / embedding.norm(dim=-1, keepdim=True)

    return norm_embedding #basically a tensor containing the embedding

def save_embedding(item_id, embedding): #saving embedding under given item_id
    with open("embeddings.json", "r") as file:
        embeddings = json.load(file)

    #Note: json doesnt understand tensors, so we're have to convert to Python list
    embeddings[item_id] = embedding.squeeze().tolist() 

    with open("embeddings.json", "w") as file:
        json.dump(embeddings, file, indent=4)








# Testing code in this file
if __name__ == "__main__": 
    embedding = get_image_embedding("uploads/images/found-item.jpg")

    print("Embedding shape:", embedding.shape)

    save_embedding("test-item", embedding)
    print("Embedding saved!")