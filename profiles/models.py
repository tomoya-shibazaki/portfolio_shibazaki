from django.db import models

class Profile(models.Model):
  name = models.CharField(max_length=100)
  email = models.EmailField(max_length=100, unique=True)
  message = models.CharField(max_length=500, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)

  GENDER = [
      ('M', '男'),
      ('F', '女'),
  ]
  gender = models.CharField(
      max_length=2,
      choices=GENDER,
      default='男',
  )
