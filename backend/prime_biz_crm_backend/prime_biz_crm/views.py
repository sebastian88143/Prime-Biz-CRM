from .models import MyUser

from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response

import jwt, datetime

SECRET_KEY = "my_secret"

@api_view(["POST"])
def login(request):
    data = request.data
    username = data.get("username")
    password = data.get("password")

    try:
        user = MyUser.objects.get(username=username)
        if check_password(password, user.password_hash):
            token = jwt.encode({"id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                               SECRET_KEY, algorithm="HS256")
            return Response({"token": token})
    except MyUser.DoesNotExist:
        pass

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
