from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

#extra information for User Model added with an One to One relationship
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = PhoneNumberField(blank = True, null = True)
    location = models.CharField(max_length=30, blank=True)
    afm = models.CharField(max_length=20, null=True, blank=True)
    verified = models.BooleanField(default=False) 

    buyer_rating = models.DecimalField(
                max_digits=7, decimal_places=2, null=True, blank=True)
    buyer_rev_num = models.IntegerField(null=True, blank=True, default=0)
    
    seller_rating = models.DecimalField(
                max_digits=7, decimal_places=2, null=True, blank=True)
    
    seller_rev_num = models.IntegerField(null=True, blank=True, default=0)

    _id = models.AutoField(primary_key=True, editable=False)  

    def __str__(self):
        return self.user.username

#every time a user is created a Profile is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

#every time a user is updated a Profile is updated
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()



class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/sample1.jpg')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    currently = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, default=0)

    currentwinner = models.IntegerField(null=True, blank=True)

    first_bid = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    number_of_bids = models.IntegerField(null=True, blank=True, default=0)

    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    started = models.DateTimeField(null=True, blank=True)
    ended = models.DateTimeField(null=True, blank=True)
    
    #will be true if a a bid is higher than price
    payed = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)   
    
    def __str__(self):
        return self.name

class MyBids(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    value = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    winningBid = models.BooleanField(default=True)

    createdAt = models.DateTimeField(auto_now_add=True)
    
    _id = models.AutoField(primary_key=True, editable=False)  

    def __str__(self):
        return self.product.name + " -> $" + str(self.value)
    
class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sender' ,on_delete=models.SET_NULL, null=True)
    senderName = models.CharField(max_length=200, null=True, blank=True)
    receiver = models.ForeignKey(User,related_name='receiver', on_delete= models.SET_NULL, null=True)
    receiverName = models.CharField(max_length=200, null=True, blank=True)
    context = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    read = models.BooleanField(default=False)
    
    _id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return str(self.createdAt)


#models for buyer and seller are needed to check if a user has already made a review
class Buyer_Review(models.Model):
    owner = models.ForeignKey(User,related_name='owner', on_delete=models.SET_NULL, null=True)
    buyer = models.ForeignKey(User,related_name='buyer', on_delete=models.SET_NULL, null=True)

    rating = models.IntegerField(null=True, blank=True, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Seller_Review(models.Model):
    owner = models.ForeignKey(User, related_name='seller_owner', on_delete=models.SET_NULL, null=True)
    seller = models.ForeignKey(User,related_name='seller', on_delete=models.SET_NULL, null=True)

    rating = models.IntegerField(null=True, blank=True, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

