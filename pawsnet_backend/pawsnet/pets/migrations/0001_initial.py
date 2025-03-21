# Generated by Django 5.1.7 on 2025-03-09 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('Dog', 'Dog'), ('Cat', 'Cat'), ('Bird', 'Bird'), ('Fish', 'Fish'), ('Small Animal', 'Small Animal'), ('Reptile', 'Reptile'), ('Other', 'Other')], default='Dog', max_length=20)),
                ('breed', models.CharField(blank=True, max_length=100, null=True)),
                ('age', models.FloatField()),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Unknown', 'Unknown')], default='Male', max_length=10)),
                ('weight', models.FloatField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('vaccinations', models.JSONField(default=dict)),
            ],
        ),
    ]
