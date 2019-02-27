from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=False)
    avatar = models.ImageField(upload_to="user_avatars")
    bio = models.TextField(blank=False)

    def __str__(self):
        return self.user.username