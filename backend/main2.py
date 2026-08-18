from transformers import CLIPProcessor, CLIPModel
# CLIPModel: actual CLIP neural network that turns image --> numbers 
# CLIPProcessor: prepares image and text into a format that CLIP expects 
from PIL import Image
import torch 

# loading the model (will download pretrained model first time code is run)
model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
)

# processor acts like a translator that preps image and text inputs so the model can undertand them
# this is cause CLIP expects inputs in very specific format
processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
)

#loads an image
#now Python has pic stores in memory
images = [
    Image.open("images/bottle.jpg"),
    Image.open("images/backpack.jpg"),
    Image.open("images/glasses.jpg")
]

texts = [
    "blue water bottle",
]

#note: at this point, CLIP can't use image & text yet -- it has to be processed!!
# same for the below text

# --------- Processing the inputs -----------

# CLIP doesnt work w/ normal Python lists -- it needs PyTorch tensors
# PyTorch tensors: essentially a more powerful version of a NumPy array that's optimized for machine leaning

inputs = processor(
    text=texts, #list where e/ element will be a text description
    images=images, #passing list of images 
    return_tensors="pt", 
    padding=True #processor pads shorter text so everything has the same shape --> makes it easier for model to process batches 
)


#----------- Generating embeddings ---------

# using "torch.no_grad" because PyTorch will assume you're training a model, which isnt the case here 
    # so this line tells PyTorch we're not training CLIP, we're only using it --> use whenever running a pretrained model

#both functions below are inside the 'model' object
#get_image_features(): takes processed image data and turns it into an embedding
#get_text_features(): takes processed text data and turns it into an embedding

#.pooler_output: gives us the single vector representing the image as a whole
    #needed ebcause the CLIP model we're using produces a bunch of info which we don't need

with torch.no_grad():
    image_features = model.get_image_features(  
        pixel_values = inputs["pixel_values"]  
    ).pooler_output

    text_features = model.get_text_features(
        input_ids = inputs["input_ids"],
        attention_mask = inputs["attention_mask"] 
    ).pooler_output

# Checking how similar the embeddings are
    # Imagine each embedding as an arrow pointing in some direction (basically a vector)
    # Then, we use cosine similarity:
        # Cosine similarity bascailyl emasures the angle between the vectors
        # same direction = semantically similar
        # close to 1 --> very similar, close to -1 --> very different

# normalizing so that every factor has a length of 1 
image_features = image_features / image_features.norm(dim=-1, keepdim=True)
text_features = text_features / text_features.norm(dim=-1, keepdim=True)

similarity = image_features @ text_features.T #calculating dot product
print(similarity)


# Interpreting result:

'''
    tensor([
        [0.3403, 0.1838, 0.1752],
        [0.2002, 0.2758, 0.1695],
        [0.1583, 0.1320, 0.3185]])

    This means for image1 which is the waterbottle, column 1 is the largest decimal --> more similar
    So, just get largest decimal from each row to find the most similar image for that description
        

'''


# -------- Making CLIP choose the best match -----------

#argmax() finds the largest value --> PyThorch

best_match = similarity.argmax().item()
best_score = similarity[best_match].item()

print("Best match:", best_match)
print("Similarity:", best_score)

image_paths = [
    "images/bottle.jpg",
    "images/backpack.jpg",
    "images/glasses.jpg",
]

print("Best match:", image_paths[best_match])

# Note: When implmenting into app, CLIP will not be running on every image every time a new user searches for an item
#   Instead, we'll save teh image embedding the first time its done and only use CLIP on user's text description.

# -------- Ranking the similarity scores -----------

scores = similarity.squeeze() # flattening tensor so that its not [3,1] but [3]

# topk(): special function in PyTorch that gives the top 3 highest scores and their indices

values, indices = torch.topk(scores, k=2) #gives teh 2 best matches
#indices from this result correspond to the images 





