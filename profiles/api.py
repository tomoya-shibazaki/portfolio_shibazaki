from profiles.models import Profile
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer

# Profile Viewset
class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = ProfileSerializer