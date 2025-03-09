# from rest_framework import serializers
# from .models import Pet

# class PetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Pet
#         fields = '__all__'

from rest_framework import serializers
from .models import Pet
import base64

class PetSerializer(serializers.ModelSerializer):
    # Add a field for the serialized representation of the image
    image_data = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Pet
        fields = ['id', 'name', 'type', 'breed', 'age', 'gender', 
                  'weight', 'description', 'vaccinations', 'image', 'image_data']
        extra_kwargs = {
            'image': {'write_only': True}  # Binary data not shown in responses
        }
    
    def get_image_data(self, obj):
        """Convert binary image to base64 for JSON response"""
        if obj.image:
            return base64.b64encode(obj.image).decode('utf-8')
        return None