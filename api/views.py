from django.shortcuts import render
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from database.models import *


@api_view(['GET','POST'])
def product(request):
    """
    List all products, or create a new product
    """
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProductSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def sale(request):
    """
    List all sales, or create a new sale
    """
    if request.method == 'GET':
        sales = Sale.objects.all()
        serializer = SaleSerializer(sales,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SaleSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def dashboard(request):
    """
    Returns an objects with data to be used in the dashboard
    """
    sales = Sale.objects.all()
    total_customers = Customer.objects.all().count()
    total_sales = sales.count()
    creditamount = 0
    for sale in sales:
        creditamount+=sale.credit_amount
    depositamount = 0
    for sale in sales:
        depositamount+=sale.deposit
    
    data = {
        "totalcustomers":total_customers,
        "totalsales":total_sales,
        "creditAmount":creditamount,
        "depositAmount":depositamount
    }

    return Response(data)