from django.contrib import admin
from .models import Profile


class ProfileAdmin(admin.ModelAdmin):
  # fieldsets = [
  #       ('Name',  {'fields': ['name']}),
  #       ('Email', {'fields': ['email']}),
  #       ('Gender', {'fields': ['gender']}),
  #       ('Message', {'fields': ['message']}),
  #   ]
  list_display = ('name', 'email', 'gender', 'message')

admin.site.register(Profile, ProfileAdmin)