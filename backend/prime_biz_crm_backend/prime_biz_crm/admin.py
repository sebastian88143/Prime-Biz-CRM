from .models import MyUser

from django.contrib import admin

@admin.register(MyUser)
class MyUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')
    search_fields = ('username',)
