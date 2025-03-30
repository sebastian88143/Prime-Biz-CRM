from .models import CustomUser, Lead, Pipeline, Reminder

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'company_name', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'company_name')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    ordering = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('company_name', 'address', 'phone')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'created_at')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )

class LeadAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'contact_person_name', 'contact_person_surname', 'email', 'phone', 'industry', 'size', 'top_lead')
    search_fields = ('company_name', 'contact_person_name', 'contact_person_surname', 'email', 'phone')
    list_filter = ('industry', 'size', 'top_lead', 'converted_to_pipeline')

class PipelineAdmin(admin.ModelAdmin):
    list_display = ('deal_name', 'expected_value', 'stage', 'status', 'created_by', 'created_at')
    search_fields = ('deal_name', 'lead__company_name')
    list_filter = ('stage', 'status')

class ReminderAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'reminder_date', 'created_at')
    search_fields = ('title', 'user__username')
    list_filter = ('reminder_date',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Lead, LeadAdmin)
admin.site.register(Pipeline, PipelineAdmin)
admin.site.register(Reminder, ReminderAdmin)
