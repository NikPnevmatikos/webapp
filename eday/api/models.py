from django.db import models

# Create your models here.

class Product(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)
    price = models.DecimalField(max_digits = 10000, decimal_places = 2)
    descriptions = models.TextField(max_length = 1000)
    #tags = 
    
    def __str__(self):
        return self.name