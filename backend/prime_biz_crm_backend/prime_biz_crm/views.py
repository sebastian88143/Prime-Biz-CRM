from.models import Lead, Pipeline, Reminder

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import validate_email, RegexValidator, URLValidator
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from decimal import Decimal
import re

SECRET_KEY = "my_secret"

User = get_user_model()

def validate_and_format_website(website):
    if website:
        pattern = r"^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$"
        if re.match(pattern, website):
            website = f"https://{website}"
        
        url_validator = URLValidator()
        try:
            url_validator(website)
        except ValidationError:
            return None
    
    return website

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists. Choose a different one."}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists. Try logging in."}, status=400)
    
    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return Response({"message": "User registered successfully!"}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    username = data.get("username")
    password = data.get("password")

    try:
        user = User.objects.get(username=username)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            refresh["id"] = user.id
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            })
        else:
            return Response({"error": "Invalid credentials"}, status=400)

    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def check_auth(request):
    auth = JWTAuthentication()
    user, _ = auth.authenticate(request)

    if user:
        return Response({"message": "Valid token"})

    return Response({"error": "Unauthorized"}, status=403)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_user_info(request):
    try:
        user = request.user
        
        user_data = {
            "username": user.username,
            "company_name": user.company_name,
            "email": user.email,
            "address": user.address,
            "phone": user.phone,
        }

        return Response({"user": user_data})
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_top_leads(request):
    try:
        leads = Lead.objects.filter(created_by=request.user, top_lead=True, converted_to_pipeline=False)
        lead_data = list(leads.values("id", "company_name", "contact_person_name", "contact_person_surname", "email"))
        return Response({"leads": lead_data})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_all_leads(request):
    try:
        leads = Lead.objects.filter(created_by=request.user, converted_to_pipeline=False)
        
        search_term = request.query_params.get("search")
        size = request.query_params.get("size")
        industry = request.query_params.get("industry")
        top_lead = request.query_params.get("topLeadsOnly")
        
        if search_term:
            leads = leads.filter(company_name__icontains=search_term)
        if size and size != "None":
            leads = leads.filter(size=size)
        if industry and industry != "None":
            leads = leads.filter(industry=industry)
        if top_lead == "true":
            leads = leads.filter(top_lead=True)

        lead_data = list(leads.values("id", "company_name", "industry", "size", "top_lead", "created_at"))

        return Response({"leads": lead_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_reminders(request):
    try:
        reminders = Reminder.objects.filter(user=request.user).order_by("-created_at")[:3]
        reminder_data = list(reminders.values("title", "description", "reminder_date", "created_at"))
        return Response({"reminders": reminder_data})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def add_new_lead(request):
    try:
        data = request.data
        user = request.user

        email = data.get("email")
        if email:
            try:
                validate_email(email)
            except ValidationError:
                return Response({"error_fields": {"email": "Invalid email address."}}, status=400)

        phone = data.get("phone")
        if phone:
            try:
                phone_validator = RegexValidator(
                    regex=r'^\+?1?\d{9,15}$',
                    message="The phone number must contain 9 to 15 digits and may start with '+'."
                )
                phone_validator(phone)
            except ValidationError:
                return Response({"error_fields": {"phone": "Invalid phone number."}}, status=400)

        website = data.get("website")
        if website:
            website = validate_and_format_website(website)

            if website is None:
                return Response({"error_fields": {"website": "Invalid website URL."}}, status=400)

        lead = Lead.objects.create(
            company_name=data.get("company_name"),
            contact_person_name=data.get("contact_person_name"),
            contact_person_surname=data.get("contact_person_surname"),
            email=email,
            address=data.get("address"),
            phone=phone,
            website=website,
            industry=data.get("industry"),
            size=data.get("size"),
            top_lead=data.get("top_lead", False),
            notes=data.get("notes"),
            created_by=user
        )

        return Response({"message": "Lead added successfully!", "lead_id": lead.id}, status=201)
    
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_lead_by_id(request, lead_id):
    try:
        lead = Lead.objects.get(id=lead_id, created_by=request.user)
        
        lead_data = {
            "company_name": lead.company_name,
            "contact_person_name": lead.contact_person_name,
            "contact_person_surname": lead.contact_person_surname,
            "email": lead.email,
            "address": lead.address,
            "phone": lead.phone,
            "website": lead.website,
            "industry": lead.industry,
            "size": lead.size,
            "top_lead": lead.top_lead,
            "notes": lead.notes,
        }

        return Response({"lead": lead_data}, status=status.HTTP_200_OK)
    except Lead.DoesNotExist:
        return Response({"error": "Lead not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def update_lead(request, lead_id):
    try:
        lead = Lead.objects.get(id=lead_id, created_by=request.user)
        data = request.data

        email = data.get("email", lead.email)
        if email:
            try:
                validate_email(email)
            except ValidationError:
                return Response({"error_fields": {"email": "Invalid email address."}}, status=400)

        phone = data.get("phone", lead.phone)
        if phone:
            try:
                phone_validator = RegexValidator(
                    regex=r'^\+?1?\d{9,15}$',
                    message="The phone number must contain 9 to 15 digits and may start with '+'."
                )
                phone_validator(phone)
            except ValidationError:
                return Response({"error_fields": {"phone": "Invalid phone number."}}, status=400)

        website = data.get("website")
        if website:
            website = validate_and_format_website(website)
            
            if website is None:
                return Response({"error_fields": {"website": "Invalid website URL."}}, status=400)

        lead.company_name = data.get("company_name", lead.company_name) or lead.company_name
        lead.contact_person_name = data.get("contact_person_name", lead.contact_person_name) or lead.contact_person_name
        lead.contact_person_surname = data.get("contact_person_surname", lead.contact_person_surname) or lead.contact_person_surname
        lead.email = email
        lead.address=data.get("address", lead.address) or lead.address
        lead.phone = phone
        lead.website = website
        lead.industry = data.get("industry", lead.industry) or lead.industry
        lead.size = data.get("size", lead.size) or lead.size
        lead.top_lead = data.get("top_lead", lead.top_lead)
        lead.notes = data.get("notes", lead.notes) or lead.notes

        lead.save()

        return Response({"message": "Lead updated successfully!"}, status=status.HTTP_200_OK)

    except Lead.DoesNotExist:
        return Response({"error": "Lead not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def add_new_pipeline(request, lead_id):
    try:
        data = request.data
        user = request.user

        deal_name = data.get("deal_name", "").strip()

        if not deal_name:
            return Response({"error_fields": {"deal_name": "This field is required."}}, status=400)

        expected_value = data.get("expected_deal_value", "0")
        try:
            expected_value = Decimal(expected_value)
            if expected_value < 0:
                return Response({"error_fields": {"expected_deal_value": "Value must be positive."}}, status=400)
        except:
            return Response({"error_fields": {"expected_deal_value": "Invalid numeric value."}}, status=400)

        lead = Lead.objects.filter(id=lead_id).first()
        if not lead:
            return Response({"error": "Lead not found."}, status=404)

        pipeline_entry = Pipeline.objects.create(
            lead=lead,
            deal_name=deal_name,
            expected_value=expected_value,
            created_by=user
        )

        lead.converted_to_pipeline = True
        lead.save(update_fields=["converted_to_pipeline"])

        return Response({
            "message": "Pipeline entry added successfully!",
            "pipeline_id": pipeline_entry.id,
            "lead_updated": True,
            },
            status=201
        )

    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_lead(request, lead_id):
    try:
        lead = Lead.objects.get(id=lead_id, created_by=request.user)

        if not lead:
            return Response({"error": "Lead not found or you do not have permission to delete it."}, status=404)
        
        lead.delete()

        return Response({"message": "Lead deleted successfully."}, status=200)
    
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_all_pipelines(request):
    try:
        pipelines = Pipeline.objects.filter(status="Active", created_by=request.user)

        pipeline_data = []
        for pipeline in pipelines:
            pipeline_data.append({
                "id": pipeline.id,
                "deal_name": pipeline.deal_name,
                "expected_value": str(pipeline.expected_value),
                "stage": pipeline.stage,
                "company_name": pipeline.lead.company_name if pipeline.lead else "Unknown",
                "lead_id": pipeline.lead_id
            })

        return Response({"pipelines": pipeline_data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def pipeline_detail(request, pipeline_id):
    try:
        pipeline = Pipeline.objects.get(id=pipeline_id, created_by=request.user)

        if request.method == "GET":
            lead = Lead.objects.get(id=pipeline.lead_id)

            pipeline_data = {
            "id": pipeline.id,
            "deal_name": pipeline.deal_name,
            "expected_value": float(pipeline.expected_value),
            "lead": {
                "id": lead.id if lead else None,
                "company_name": lead.company_name if lead else "",
                "contact_person_name": lead.contact_person_name if lead else "",
                "contact_person_surname": lead.contact_person_surname if lead else "",
                "email": lead.email if lead else "",
                "address": lead.address if lead else "",
                "phone": lead.phone if lead else "",
                "website": lead.website if lead else "",
                "industry": lead.industry if lead else "",
                "size": lead.size if lead else "",
                "top_lead": lead.top_lead if lead else False,
                "notes": lead.notes if lead else "",
                }
            }

            return Response({"pipeline": pipeline_data}, status=status.HTTP_200_OK)
        
        elif request.method == "PUT":
            data = request.data

            pipeline.deal_name = data.get("deal_name", pipeline.deal_name) or pipeline.deal_name

            expected_value = data.get("expected_value")
            if expected_value is not None and expected_value != "":
                try:
                    pipeline.expected_value = Decimal(expected_value)
                    if pipeline.expected_value < 0:
                        return Response({"error_fields": {"expected_value": "Value must be positive."}}, status=400)
                except:
                    return Response({"error_fields": {"expected_value": "Invalid numeric value."}}, status=400)

            pipeline.expected_value = data.get("expected_value", pipeline.expected_value) or pipeline.expected_value

            pipeline.save()

            return Response({"message": "Piepeline updated successfully!"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def move_pipeline_stage(request, pipeline_id):
    try:
        pipeline = Pipeline.objects.get(id=pipeline_id, created_by=request.user)

        stage_order = ["Prospecting", "Negotiation", "Proposal Sent", "Won"]
        current_index = stage_order.index(pipeline.stage)

        if current_index < len(stage_order) - 1:
            pipeline.stage = stage_order[current_index + 1]
            pipeline.save()
            return Response({"message": "Pipeline stage updated", "new_stage": pipeline.stage}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Pipeline is already at the final stage"}, status=status.HTTP_400_BAD_REQUEST)

    except Pipeline.DoesNotExist:
        return Response({"error": "Pipeline not found"}, status=status.HTTP_404_NOT_FOUND)
    except ValueError:
        return Response({"error": "Invalid pipeline stage"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def mark_pipeline_as_lost(request, pipeline_id):
    try:
        pipeline = Pipeline.objects.get(id=pipeline_id, created_by=request.user)

        pipeline.status = 'Lost'
        pipeline.lost_date = timezone.now()
        pipeline.save()

        return Response({"message": "Pipeline marked as lost."}, status=status.HTTP_200_OK)
    except Pipeline.DoesNotExist:
        return Response({"error": "Pipeline not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def mark_pipeline_as_won(request, pipeline_id):
    try:
        pipeline = Pipeline.objects.get(id=pipeline_id, created_by=request.user)

        pipeline.status = 'Won'
        pipeline.save()

        return Response({"message": "Pipeline marked as won."}, status=status.HTTP_200_OK)
    except Pipeline.DoesNotExist:
        return Response({"error": "Pipeline not found."}, status=status.HTTP_404_NOT_FOUND)
