from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('',TemplateView.as_view(template_name='frontend/index.html')),
    path('', include('profiles.urls')),
    path('', include('accounts.urls')),
]
