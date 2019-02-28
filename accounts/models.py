from django.db import models
from django.contrib.auth.models import AbstractUser
from database.models import Company

class User(AbstractUser):
    ROLES = (
        ("ADMIN","ADMINISTRATOR"),
        ("STAFF","STAFF")
    )

    role = models.CharField(max_length=200,blank=False,default="STAFF",choices=ROLES)
    company = models.ForeignKey(Company,on_delete=models.CASCADE,blank=False,null=True)

    def __str__(self):
        return self.username

# class UserProfile(models.Model):
#     user = models.ForeignKey(User,on_delete=models.CASCADE,blank=False)
#     avatar = models.ImageField(upload_to="user_avatars")
#     bio = models.TextField(blank=False)

#     def __str__(self):
#         return self.user.username

