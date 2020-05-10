from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('login', views.login_and_authenticate, name='login_and_auth'),
    path('csrf', views.get_csrf, name='get_csrf'),
    path('auth', views.load_authenticate, name='auth'),
    path('logout', views.logout_user, name='create_account'),
    path('create', views.create_account, name='create_account'),
]

