from django.urls import path

from .views import (login, register, check_auth, get_user_info, get_top_leads, get_all_leads, get_reminders,
    add_new_lead, get_lead_by_id, update_lead, add_new_pipeline, delete_lead, get_all_pipelines, pipeline_detail,
    move_pipeline_stage, mark_pipeline_as_lost, mark_pipeline_as_won, get_leads_per_day_chart, get_leads_per_industry_chart,
    get_leads_per_pipeline_chart
)
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
    path('add_pipeline/<int:lead_id>/', add_new_pipeline),
    path('delete_lead/<int:lead_id>/', delete_lead),
    path('pipelines/', get_all_pipelines),
    path('pipeline/<int:pipeline_id>/', pipeline_detail),
    path('pipeline/<int:pipeline_id>/move_stage/', move_pipeline_stage),
    path('pipeline/<int:pipeline_id>/mark_as_lost/', mark_pipeline_as_lost),
    path('pipeline/<int:pipeline_id>/mark_as_won/', mark_pipeline_as_won),
    path('leads_per_day_chart/', get_leads_per_day_chart),
    path('leads_per_industry_chart/', get_leads_per_industry_chart),
    path('leads_per_pipeline_chart/', get_leads_per_pipeline_chart),
]
