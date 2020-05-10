from django.shortcuts import render

from accounts.models import CustomUser
from django.contrib.auth import authenticate, logout, login
from django.http import HttpResponse, Http404, HttpResponseBadRequest, HttpResponseForbidden, JsonResponse
from django.views.decorators.http import require_http_methods

from chessvision.utils.postgres import Session
from accounts.errors.autherrors import InvalidFields, UsernameExists, EmailExists
from sqlalchemy import or_

from django.middleware.csrf import get_token

import json

""" 
##### GET CSRF #####

description: this endpoint is accessed via get and ensures that the frontend client receives/stores 
the csrf token associated with the current session. 

"""
@require_http_methods(["GET"])
def get_csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

"""
############## ACCOUNT CREATION ###############

description: this endpoint is accessed to create and login new chessvision users
args: 
    username: String 
    password: String
    email: String 

returns:
    Response (indicating status of request)

"""
@require_http_methods(["POST"])
def create_account(request):
    body = json.loads(request.body)
    username = body.get('username', None)
    password = body.get('password', None)
    email = body.get('email', None)
    if username is None or password is None or email is None:
        return HttpResponseBadRequest()
    #determine if username and email are unique, else return corresponding error subclass
    s = Session()
    findExistingUser = s.query(CustomUser.sa).filter(or_(CustomUser.sa.username == username, CustomUser.sa.email == email)).first()
    
    if findExistingUser is not None:
        if findExistingUser.username==username:
            error=UsernameExists() 
        else:
            error=EmailExists()
        return HttpResponseBadRequest(json.dumps(error.__dict__))

    user = CustomUser.objects.create_user(username, email, password)
    user.save()
    
    #login the new user after generating user's authentication token
    login(request, user)
    return HttpResponse(201)

"""
############## ACCOUNT LOGIN ###############

description: this endpoint is accessed to login existing chessvision users via the application's login page
args: 
    username: String 
    password: String

returns:
    Response (indicating status of request)

"""
@require_http_methods(["POST"])
def login_and_authenticate(request):
    body = json.loads(request.body)
    username = body.get('username', False)
    password = body.get('password', False)
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request,user)
        return HttpResponse(request.user.is_authenticated, status=200)
    else:
        return HttpResponse('Unauthorized', status=401)


"""
############## ACCOUNT AUTHENTICATION ###############

description: this endpoint is accessed to authenicate existing chessvision users on page load
in order to retrieve basic user attributes, including permissions, email, and username etc. 

args:
    username: String 
    password: String

returns:
    Response (indicating status of request)

"""
@require_http_methods(["GET"])
def load_authenticate(request):
    if request.user.is_authenticated:
        responseObj = {
            'username': request.user.username,
            'email': request.user.email
        }
        return JsonResponse(responseObj)
    else:
        return HttpResponse(request.user.is_authenticated, status=401)


"""
############## ACCOUNT LOGOUT ###############

description: this endpoint is accessed to log users out.

returns:
    Response (indicating status of request)

"""
def logout_user(request):
    logout(request)
    return HttpResponse(status=200)






