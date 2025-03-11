from .models import CustomUser, Lead, Pipeline, Reminder

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("id", "username", "email", "is_staff", "is_superuser", "created_at")
    list_filter = ("is_staff", "is_superuser", "is_active")
    search_fields = ("username", "email")
    ordering = ("id",)

    fieldsets = (
        ("Podstawowe informacje", {"fields": ("username", "email", "password")}),
        ("Uprawnienia", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Daty", {"fields": ("last_login", "created_at")}),
    )

    add_fieldsets = (
        (
            "Dodaj użytkownika",
            {
                "classes": ("wide",),
                "fields": ("username", "email", "password1", "password2", "is_staff", "is_superuser"),
            },
        ),
    )

    readonly_fields = ("created_at",)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.site_header = "Panel Administracyjny"
admin.site.site_title = "CRM Admin"
admin.site.index_title = "Zarządzanie CRM"


class LeadAdmin(admin.ModelAdmin):
    list_display = ("company_name", "contact_person_name", "contact_person_surname", "email", "phone", "industry", "size", "top_lead", "created_by", "created_at")
    list_filter = ("industry", "size", "top_lead", "created_at")
    search_fields = ("company_name", "contact_person_name", "contact_person_surname", "email", "phone")
    ordering = ("-created_at",)
    
    readonly_fields = ("created_at", "created_by")

    fieldsets = (
        ("Dane firmy", {"fields": ("company_name", "industry", "size", "website", "address")}),
        ("Dane kontaktowe", {"fields": ("contact_person_name", "contact_person_surname", "email", "phone")}),
        ("Informacje dodatkowe", {"fields": ("top_lead", "notes")}),
        ("Dane systemowe", {"fields": ("created_by", "created_at")}),
    )

admin.site.register(Lead, LeadAdmin)


class PipelineAdmin(admin.ModelAdmin):
    list_display = ("deal_name", "lead", "expected_value", "stage", "created_by", "created_at")
    list_filter = ("stage", "created_at")
    search_fields = ("deal_name", "lead__company_name", "created_by__username")
    ordering = ("-created_at",)
    
    readonly_fields = ("created_at", "created_by")

    fieldsets = (
        ("Informacje o transakcji", {"fields": ("deal_name", "lead", "expected_value", "stage")}),
        ("Dane systemowe", {"fields": ("created_by", "created_at")}),
    )

admin.site.register(Pipeline, PipelineAdmin)


class ReminderAdmin(admin.ModelAdmin):
    list_display = ("user", "description", "reminder_date", "created_at")
    list_filter = ("reminder_date", "created_at")
    search_fields = ("user__username", "description")
    ordering = ("-reminder_date",)

    readonly_fields = ("created_at",)

    fieldsets = (
        ("Szczegóły przypomnienia", {"fields": ("user", "description", "reminder_date")}),
        ("Dane systemowe", {"fields": ("created_at",)}),
    )

admin.site.register(Reminder, ReminderAdmin)
