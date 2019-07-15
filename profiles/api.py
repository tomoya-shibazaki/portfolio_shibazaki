from profiles.models import Profile
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer

# Profile Viewset
class ProfileViewSet(viewsets.ModelViewSet):
  # queryset = Profile.objects.all()
  permission_classes = [
    permissions.IsAuthenticated
  ]

  serializer_class = ProfileSerializer

  def get_queryset(self):
    return self.request.user.profiles.all()

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)