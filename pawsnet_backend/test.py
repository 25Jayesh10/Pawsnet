import requests

# API Endpoint
URL = "https://pawsnet-backend.onrender.com/api/register-pet/"

# Image Path
IMAGE_PATH = "demo_pet_img.jpeg"

# Read Image in Binary Mode
with open(IMAGE_PATH, "rb") as image_file:
    image_binary = image_file.read()

# Prepare Multipart Form Data (Binary Image)
files = {
    "image": ("demo_pet_img.jpeg", image_binary, "image/jpeg")
}

# JSON Data (Other Fields)
data = {
    "name": "Rex",
    "type": "Dog",
    "breed": "Golden Retriever",
    "age": 3.5,
    "gender": "Male",
    "weight": 65.5,
    "description": "Friendly and well-trained",
    "vaccinations": '{"rabies": "2024-01-15", "distemper": "2023-11-20"}'
}

# Send the Request (Multipart)
response = requests.post(URL, data=data, files=files)

# Print Response
print("Status Code:", response.status_code)
print("Response:", response.text)
