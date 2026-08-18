from transformers import CLIPProcessor, CLIPModel 
from PIL import Image
import torch 

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

    return norm_embedding


# Testing code 
if __name__ == "__main__": 
    print("hi")
    embedding = get_image_embedding("uploads/images/found-item.jpg")

    print("Embedding shape:", embedding.shape)