#superclass for auth related errors
class AuthError(object): 
    pass

#error subclasses (use cases are straightforward)
class InvalidFields(AuthError):
    def __init__(self):
        self.error_no=0
        self.message="Invalid fields were provided."

class UsernameExists(AuthError):
    def __init__(self):
        self.error_no=1
        self.message="An account associated with that username already exists."

class EmailExists(AuthError):
    def __init__(self):
        self.error_no=2
        self.message="An account associated with that email already exists."