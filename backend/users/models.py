from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


class UserManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, password, standart_longitude, standart_latitude, **other_fields):

        other_fields.setdefault('is_admin', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_admin') is not True:
            raise ValueError('Superuser must be assigned to is_admin=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, standart_longitude, standart_latitude, **other_fields)
    
    def create_user(self, email, user_name, first_name, password, standart_longitude, standart_latitude, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, first_name=first_name, standart_longitude=standart_longitude, standart_latitude=standart_latitude,  **other_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    GENDER_MALE = 0
    GENDER_FEMALE = 1
    GENDER_OTHER = 2
    GENDER_CHOICES = [(GENDER_MALE, 'Male'), (GENDER_FEMALE, 'Female'), (GENDER_OTHER, 'Other')]

    email = models.EmailField(_('email address'), unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_admin = models.BooleanField(default=False)
    is_retailer = models.BooleanField(default=False)
    is_driver = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    gender = models.IntegerField(choices=GENDER_CHOICES, null=True)
    standart_longitude = models.DecimalField(decimal_places=16, max_digits=20)
    standart_latitude = models.DecimalField(decimal_places=16, max_digits=20)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name', 'standart_longitude', 'standart_latitude']

    def __str__(self):
        return self.user_name
    
    def isretailer(self):
        return self.is_retailer

    def isadmin(self):
        return self.is_retailer

    def isdriver(self):
        return self.is_driver