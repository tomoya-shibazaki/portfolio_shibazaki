from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
  name = models.CharField(max_length=100)
  email = models.EmailField(max_length=100, unique=True)
  GENDER = [
      ('-', '-'),
      ('M', '男'),
      ('F', '女'),
  ]
  gender = models.CharField(
      max_length=1,
      choices=GENDER,
      default='-',
  )
  owner = models.ForeignKey(User, related_name='profiles', on_delete=models.CASCADE, null=True)
  message = models.CharField(max_length=500, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
