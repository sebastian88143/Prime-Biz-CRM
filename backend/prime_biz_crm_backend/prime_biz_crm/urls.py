from django.urls import path

from .views import login, register, check_auth, get_user_info, get_top_leads, get_all_leads, get_reminders, add_new_lead, get_lead_by_id, update_lead, add_new_pipeline

urlpatterns = [
    path('login/', login),
    path('register/', register),
    path('check-auth/', check_auth),
    path('user_info/', get_user_info),
    path('top_leads/', get_top_leads),
    path('all_leads/', get_all_leads),
    path('reminders/', get_reminders),
    path('add_lead/', add_new_lead),
    path('lead/<int:lead_id>/', get_lead_by_id),
    path('lead/<int:lead_id>/update/', update_lead),
    path('add_pipeline/<int:lead_id>/', add_new_pipeline)
]
