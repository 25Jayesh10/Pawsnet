from django.db import models

class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    email = models.EmailField(unique=True)
    community_coins = models.IntegerField(default=0)

class Pet(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    pet_name = models.CharField(max_length=50)
    pet_type = models.CharField(max_length=50)
    breed = models.CharField(max_length=50, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    weight = models.FloatField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rabies_vaccination = models.BooleanField(default=False)
    distemper_vaccination = models.BooleanField(default=False)
    parvovirus_vaccination = models.BooleanField(default=False)
    other_vaccinations = models.TextField(blank=True, null=True)

class StrayAnimalReport(models.Model):
    URGENCY_LEVEL_CHOICES = [
        ('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High'), ('Critical', 'Critical')
    ]
    
    animal_type = models.CharField(max_length=50)
    animal_condition = models.TextField()
    animal_description = models.TextField(blank=True, null=True)
    last_date_seen = models.DateField()
    time_seen = models.TimeField()
    location_seen = models.TextField()
    urgency_level = models.CharField(max_length=10, choices=URGENCY_LEVEL_CHOICES)
    photo = models.BinaryField(blank=True, null=True)
    reporter_name = models.CharField(max_length=100)
    reporter_contact = models.CharField(max_length=15)
    reporter_email = models.EmailField()

class LostPetReport(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    
    pet_name = models.CharField(max_length=50)
    pet_type = models.CharField(max_length=50)
    breed = models.CharField(max_length=50, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    last_date_seen = models.DateField()
    time_seen = models.TimeField()
    location_seen = models.TextField()
    description = models.TextField(blank=True, null=True)
    photo = models.BinaryField(blank=True, null=True)
    owner_name = models.CharField(max_length=100)
    owner_contact = models.CharField(max_length=15)
    owner_email = models.EmailField()
    reward = models.TextField(blank=True, null=True)

class Event(models.Model):
    event_name = models.CharField(max_length=100)
    event_description = models.TextField()
    event_date = models.DateField()

class Notice(models.Model):
    NOTICE_TYPE_CHOICES = [
        ('Stray Report', 'Stray Report'),
        ('Lost Pet', 'Lost Pet'),
        ('Event', 'Event')
    ]
    
    notice_type = models.CharField(max_length=20, choices=NOTICE_TYPE_CHOICES)
    reference_id = models.IntegerField()
    notice_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# Signals to replicate triggers
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=StrayAnimalReport)
def create_stray_report_notice(sender, instance, created, **kwargs):
    if created:
        Notice.objects.create(
            notice_type='Stray Report',
            reference_id=instance.id,
            notice_description=f'New stray animal report: {instance.animal_description}'
        )

@receiver(post_save, sender=LostPetReport)
def create_lost_pet_notice(sender, instance, created, **kwargs):
    if created:
        Notice.objects.create(
            notice_type='Lost Pet',
            reference_id=instance.id,
            notice_description=f'Lost pet reported: {instance.pet_name}'
        )

@receiver(post_save, sender=Event)
def create_event_notice(sender, instance, created, **kwargs):
    if created:
        Notice.objects.create(
            notice_type='Event',
            reference_id=instance.id,
            notice_description=f'New event organized: {instance.event_name}'
        )

@receiver(post_save, sender=Pet)
def update_community_coins(sender, instance, created, **kwargs):
    if created:
        user_profile = instance.user
        user_profile.community_coins += 10  # Reward for pet registration
        user_profile.save()
