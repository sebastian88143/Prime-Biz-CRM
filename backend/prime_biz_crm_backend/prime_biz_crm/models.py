from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import RegexValidator

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        email = self.normalize_email(email)
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = CustomUserManager()

    class Meta:
        db_table = "User"
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.username

class Lead(models.Model):
    INDUSTRY_CHOICES = [
        ('Manufacturing', 'Manufacturing'),
        ('Retail', 'Retail'),
        ('Services', 'Services'),
        ('Other', 'Other')
    ]

    SIZE_CHOICES = [
        ('Small', 'Small'),
        ('Medium', 'Medium'),
        ('Big', 'Big')
    ]

    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', 
        message="The phone number must contain 9 to 15 digits and may start with '+'"
    )

    company_name = models.CharField(max_length=255)
    contact_person_name = models.CharField(max_length=255)
    contact_person_surname = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, validators=[phone_regex], null=True, blank=True)
    address =  models.CharField(max_length=255, null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    industry = models.CharField(max_length=13, choices=INDUSTRY_CHOICES)
    size = models.CharField(max_length=6, choices=SIZE_CHOICES)
    top_lead = models.BooleanField(default=False)
    notes = models.TextField(null=True, blank=True)
    converted_to_pipeline = models.BooleanField(default=False)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Lead"
        verbose_name = "Lead"
        verbose_name_plural = "Leads"

    def __str__(self):
        return f'{self.company_name}:\n {self.contact_person_name} {self.contact_person_surname}'

class Pipeline(models.Model):
    STAGE_CHOICES = [
        ('Prospecting', 'Prospecting'),
        ('Negotiation', 'Negotiation'),
        ('Proposal Sent', 'Proposal Sent'),
        ('Won', 'Won'),
    ]

    lead = models.ForeignKey(Lead, null=True, on_delete=models.SET_NULL)
    deal_name = models.CharField(max_length=255)
    expected_value = models.DecimalField(max_digits=10, decimal_places=2)
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='Prospecting')
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Pipeline"
        verbose_name = "Pipeline"
        verbose_name_plural = "Pipelines"

    def __str__(self):
        return f'{self.deal_name}\n ${self.expected_value:.2f}\n {self.stage}'

class Reminder(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default='Title')
    description = models.TextField()
    reminder_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Reminder"
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"

    def __str__(self):
        return self.description
