from rest_framework.permissions import BasePermission

class isAdminPermission(BasePermission):
    message = 'Only users with Admin role can perform this action'

    def has_permission(self, request, view):    
        if request.user.is_admin == True:
            return True
        else:
            return False

