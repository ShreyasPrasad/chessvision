from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('login', views.login_and_authenticate, name='login_and_auth'),
    path('logout', views.logout, name='create_account'),
    path('create', views.create_account, name='create_account'),
]

