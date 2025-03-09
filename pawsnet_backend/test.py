import requests
import base64

# Read image file and convert to base64
with open('demo_pet_img.jpeg', 'rb') as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

# Prepare data
data = {
    "name": "Rex",
    "type": "Dog",
    "breed": "Golden Retriever",
    "age": 3.5,
    "gender": "Male",
    "weight": 65.5,
    "description": "Friendly and well-trained",
    "vaccinations": {"rabies": "2024-01-15", "distemper": "2023-11-20"},
    "image": f"data:image/jpeg;base64,{encoded_image}"
}

# Send request
response = requests.post('https://pawsnet-backend.onrender.com/api/register-pet/', json=data)
print(response.status_code)
print(response.json())
