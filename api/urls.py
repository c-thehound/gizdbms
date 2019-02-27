from django.urls import path,include
from .views import *

urlpatterns = [
    path('products/',product,name="Products "),
    path('sales/',sale,name="Sales "),
    path('dashboard/',dashboard,name="Dashboard"),
    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt'))
]