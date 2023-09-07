from django.test import TestCase
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from dataclasses import dataclass
from config.settings import env


@dataclass
class UserModel:
    username: str
    password: str


@dataclass
class JWTModel:
    refresh: str
    access: str

    def __init__(self, json):
        self.__dict__.update(json)


TEST_USER: UserModel = UserModel(username='TestUser', password='TestUserPasswordV1234!')


class AuthWithTEMPUser(APITestCase):

    def setUp(self) -> None:
        User.objects.create_user(
            username=TEST_USER.username,
            password=TEST_USER.password
        )

    def test_login_with_user(self) -> JWTModel:
        response = self.client.post(
            path='/api/token/',
            data=TEST_USER.__dict__,
            headers={
                "Content-Type": "application/json"
            },
            format='json'
        )
        self.assertEqual(response.status_code, 200)
        return JWTModel(response.data)

    def test_jwt_refresh(self):
        jwt = self.test_login_with_user()
        response = self.client.post(
            path='/api/token/refresh/',
            data={
                "refresh": jwt.refresh
            },
            headers={
                "Content-Type": "application/json",
                "Authorization": f"{env('AUTH_HEADER_TYPE')} {jwt.access}"
            },
            format='json'
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(list(response.data.keys()), ['access'])

