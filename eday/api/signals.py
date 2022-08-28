

# entire file will be commented out

from django.db.models.signals import pre_save
from django.contrib.auth.models import User


# change username to email without changing the django user model
def updateUser(sender, instance, **kwargs):

    user = instance
    if user.email != '':
        user.username = user.email

pre_save.connect(updateUser, sender=User)    



    