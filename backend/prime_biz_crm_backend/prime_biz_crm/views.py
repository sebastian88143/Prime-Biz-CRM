from.models import Lead, Reminder

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

SECRET_KEY = "my_secret"

User = get_user_model()

@api_view(['POST'])
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
            "email": user.email
        }

        return Response({"user": user_data})
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_top_leads(request):
    try:
        leads = Lead.objects.filter(created_by=request.user, top_lead=True)
        lead_data = list(leads.values("company_name", "contact_person_name", "contact_person_surname", "email"))
        return Response({"leads": lead_data})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_reminders(request):
    try:
        reminders = Reminder.objects.filter(user=request.user)
        reminder_data = list(reminders.values("title", "description", "reminder_date", "created_at"))
        return Response({"reminders": reminder_data})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
