from django.db import models

class Pet(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Unknown", "Unknown"),
    ]

    TYPE_CHOICES = [
        ("Dog", "Dog"),
        ("Cat", "Cat"),
        ("Bird", "Bird"),
        ("Fish", "Fish"),
        ("Small Animal", "Small Animal"),
        ("Reptile", "Reptile"),
        ("Other", "Other"),
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="Dog")
    breed = models.CharField(max_length=100, blank=True, null=True)
    age = models.FloatField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default="Male")
    weight = models.FloatField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    # Vaccinations stored as a JSON field
    vaccinations = models.JSONField(default=dict)

    def __str__(self):
        return f"{self.name} ({self.type})"
