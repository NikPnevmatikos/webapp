from django.urls import path, include
from .views import *


urlpatterns = [
    path('hello', hello, name= "hello"),
    path('', api_overview),
    path('product_list/', all_products),
    path('user_products/', user_products),
    path('product/create/', create_product),
    path('product/update/<str:pk>/', update_product),
    path('product/delete/<str:pk>/', delete_product),
    path('product/<str:pk>/', product),

    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', registerUser),
    path('users/profile/', getUserProfile),
    path('users/profile/<str:pk>/', getUserProfile_by_Id),
    path('users/update/', updateUserProfile),
    # path('users/adminUpdate/<str:pk>', updateUserProfile_by_Id),
    path('users/delete/<str:pk>/', deleteUser),
    path('users/', getUsers),
]
