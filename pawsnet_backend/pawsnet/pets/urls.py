from django.urls import path
from .views import register_pet

urlpatterns = [
    path('register-pet/', register_pet, name='register_pet'),
]

