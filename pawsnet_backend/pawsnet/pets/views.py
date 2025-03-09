from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Pet
from .serializers import PetSerializer

@api_view(['POST'])
def register_pet(request):
    serializer = PetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
