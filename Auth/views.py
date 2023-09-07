from django.shortcuts import render, HttpResponse
from rest_framework import status
from rest_framework.generics import views
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.backends import TokenBackend
from config.settings import SECRET_KEY
# Create your views here.
from rest_framework_simplejwt.authentication import JWTAuthentication
JWT_authenticator = JWTAuthentication()


class SayMyName(views.View):
    permissions_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        def p401():
            _ = HttpResponse("null")
            _.status_code = status.HTTP_401_UNAUTHORIZED
            return _

        try:
            response = JWT_authenticator.authenticate(request)
            if response is not None:
                # unpacking
                user, token = response
                return HttpResponse(f":{user}")
        except Exception as e:
            print(e)
        return p401()

