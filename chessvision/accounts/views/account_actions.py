from django.shortcuts import render

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login
from django.http import Http404, HttpResponseBadRequest, HttpResponseForbidden

from chessvision.utils.postgres import Session
from accounts.errors.autherrors import InvalidFields, UsernameExists, EmailExists
from sqlalchemy import or_

import json

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
def create_account(request):
    username=request.data.get('username', None)
    password=request.data.get('password', None)
    email=request.data.get('email', None)
    if username == None or password == None or email == None:
        raise HttpResponseBadRequest(json.dumps(InvalidFields().__dict__))
    
    #determine if username and email are unique, else return corresponding error subclass
    s = Session()
    findExistingUser = s.query(User.sa).filter(or_(User.sa.username == username, User.sa.email == email)).first()
    
    if findExistingUser is not None:
        if findExistingUser.username==username:
            error=UsernameExists() 
        else:
            error=EmailExists()
        raise HttpResponseBadRequest(json.dumps(error.__dict__))

    user = User.objects.create_user(username, email, password)
    user.save()
    
    #login the new user after generating user's authentication token
    login(request, user)


"""
############## ACCOUNT AUTHENTICATION ###############

description: this endpoint is accessed to authenicate existing chessvision users
args: 
    username: String 
    password: String

returns:
    Response (indicating status of request)

"""

def login_and_authenticate(request):
    username=request.data.get('username', None)
    password=request.data.get('password', None)
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request,user)
    else:
        return HttpResponseForbidden()

"""
############## ACCOUNT LOGOUT ###############

description: this endpoint is accessed to log users out.

returns:
    Response (indicating status of request)

"""
def logout(request):
    logout(request)






