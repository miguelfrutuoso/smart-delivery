from .views import CustomUserCreate, ListUsers, UserDetail, BlacklistTokenView, CurrentUser, ListDrivers
from django.urls import path

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('allUsers/', ListUsers.as_view(), name="list_users"),
    path('userDetail/<int:id>', UserDetail.as_view(), name="user_detail"),
    path('current/', CurrentUser.as_view(), name="current_user"),
    path('drivers/', ListDrivers.as_view(), name="list_drivers")
]