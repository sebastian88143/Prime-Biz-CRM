from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

import jwt, datetime

SECRET_KEY = "my_secret"

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
        user = User.objects.create(username=username, email=email, password=make_password(password))
        user.save()
        return Response({"message": "User registered successfully!"}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def login(request):
    data = request.data
    username = data.get("username")
    password = data.get("password")

    try:
        user = User.objects.get(username=username)

        if check_password(password, user.password):
            token = jwt.encode(
                {"id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                SECRET_KEY, 
                algorithm="HS256"
            )
            return Response({"token": token})
        else:
            return Response({"error": "Invalid credentials"}, status=400)

    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=400)


@api_view(["GET"])
def check_auth(request):
    token = request.headers.get("Authorization")

    if not token:
        return Response({"error": "Unauthorized"}, status=401)

    try:
        decoded = jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=["HS256"])
        return Response({"message": "Valid token"})
    except jwt.ExpiredSignatureError:
        return Response({"error": "Token expired"}, status=401)
    except jwt.InvalidTokenError:
        return Response({"error": "Invalid token"}, status=401)
