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

@api_view(['GET','POST'])
def customer(request):
    """
    List all customers, or add a new customer
    """
    if request.method == 'GET':
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = CustomerSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)

def get_sales_per_product(products,filter_param,*args):
    """
    Returns a list of sales per product
    """
    if filter_param == "product":
        sales_per_product = [{
            "name":product.name,
            "sales":Sale.objects.filter(product = product).count()
        } 
        for product in products]
    elif filter_param == "county":
        sales_per_product = [{
            "name":product.name,
            "sales":Sale.objects.filter(county = args[0]).count()
        } 
        for product in products]

    return sales_per_product

def get_sales_per_product_per_county(counties,products):
    """
    Returns a list of counties with each county containing a list of products and their sales
    """
    sales_per_product_per_county = [{
        "name":county.name,
        "results":get_sales_per_product(products,"county",county)
    }

    for county in counties]

    return sales_per_product_per_county

def get_sales_per_county(counties):
    """
    Returns a list of all the counties and the sale made in that county
    """
    sales_per_county = [{
        "name":county.name,
        "sales":Sale.objects.filter(county = county).count()
    }
    for county in counties]

    return sales_per_county

def get_sales_per_company(companies):
    """
    Returns a list of all companies and the sales made by that company
    """
    sales_per_company = [{
        "name":company.name,
        "sales":Sale.objects.filter(sales_man__company = company).count()
    }
    for company in companies]

    return sales_per_company

def get_sales_per_product_type(types):
    """
    Returns a list of product types and the total sales in that category
    """
    sales_per_product_type = [{
        "name":_type.name,
        "sales":Sale.objects.filter(product__ptype = _type).count()
    }
    for _type in types]

    return sales_per_product_type

@api_view(['GET'])
def dashboard(request):
    """
    Returns an objects with data to be used in the dashboard
    """
    sales = Sale.objects.all()
    counties = County.objects.all()
    product_types = ProductType.objects.all()
    companies = Company.objects.all()
    products = Product.objects.all()
    total_customers = Customer.objects.all().count()
    total_sales = 0
    for sale in sales:
        total_sales+=sale.quantity
    
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
        "depositAmount":depositamount,
        "salesperproduct":get_sales_per_product(products,"product"),
        "salesperproductpercounty":get_sales_per_product_per_county(counties,products),
        "salespercounty":get_sales_per_county(counties),
        "salespercompany":get_sales_per_company(companies),
        "salesperproducttype":get_sales_per_product_type(product_types)
    }

    return Response(data)