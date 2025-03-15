# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from .models import Pet
# from .serializers import PetSerializer

# @api_view(['POST'])
# def register_pet(request):
#     serializer = PetSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Pet
from .serializers import PetSerializer
import base64

@api_view(['POST'])
def register_pet(request):
    data = request.data.copy()
    
    # Handle image encoding if an image is provided
    if 'image' in request.data and request.data['image']:
        try:
            # If it's a file upload from form data
            if hasattr(request.data['image'], 'read'):
                image_file = request.data['image']
                image_data = image_file.read()
                data['image'] = image_data
            # If it's a base64 encoded string
            elif isinstance(request.data['image'], str) and ',' in request.data['image']:
                # Extract the base64 part if it's in format like "data:image/jpeg;base64,/9j/4AAQ..."
                base64_data = request.data['image'].split(',')[1]
                data['image'] = base64.b64decode(base64_data)
            elif isinstance(request.data['image'], str):
                # Handle plain base64 string
                data['image'] = base64.b64decode(request.data['image'])
        except Exception as e:
            return Response({
                'error': f'Invalid image format: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = PetSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

