from django.urls import path

from .views import login, register, check_auth

urlpatterns = [
    path('login/', login),
    path('register/', register),
    path('check-auth/', check_auth),
]
