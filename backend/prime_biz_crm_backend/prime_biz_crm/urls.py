from django.urls import path

from .views import login, register, check_auth, get_user_info, get_top_leads, get_reminders

urlpatterns = [
    path('login/', login),
    path('register/', register),
    path('check-auth/', check_auth),
    path('user_info/', get_user_info),
    path('top_leads/', get_top_leads),
    path('reminders/', get_reminders),
]
