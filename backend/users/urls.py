from .views import CustomUserCreate, ListUsers
from django.urls import path

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('allUsers/', ListUsers.as_view(), name="list_users")
    #path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist')
]