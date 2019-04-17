from django.db import models
import datetime

class Customer(models.Model):
    fname = models.CharField(max_length=200,blank=False)
    lname = models.CharField(max_length=200,blank=False)
    id_no = models.CharField(max_length=200,blank=False,unique=True,primary_key=True)
    phone_number = models.CharField(max_length=200,blank=False)
    alternative_phone_number = models.CharField(max_length=200,blank=True)
    GENDERS = (
        ("M","MALE"),
        ("F","FEMALE")
    )
    gender = models.CharField(choices=GENDERS,max_length=10)

    def __str__(self):
        return self.fname+" "+self.lname

class Company(models.Model):
    name = models.CharField(max_length=200,blank=False)

    def __str__(self):
        return self.name

class ProductType(models.Model):
    name = models.CharField(max_length=200,blank=False)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=500,blank=False)
    ptype = models.ForeignKey(ProductType,on_delete=models.CASCADE,max_length=100,null=True)
    def __str__(self):
        return self.name
    
class County(models.Model):
    name = models.CharField(max_length=500,blank=False,unique=True)
    
    def __str__(self):
        return self.name

class Constituency(models.Model):
    name = models.CharField(max_length=500,blank=False,unique=True)
    county = models.ForeignKey(County,on_delete=models.CASCADE,blank=False)

    def __str__(self):
        return self.name


class Sale(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,null=True)
    sales_man = models.ForeignKey("accounts.User",on_delete=models.CASCADE,null=True,default=1)
    purchase_date = models.DateField(default=datetime.date.today,blank=False)
    county = models.CharField(max_length=500,null=True)
    product = models.CharField(max_length=500,null=True)
    quantity = models.IntegerField(null=True)
    deposit = models.IntegerField(null=True)
    credit_amount = models.IntegerField(null=True)
    serial = models.CharField(max_length=200,blank=False,null=True)

    def __str__(self):
        return self.sales_man.username

class SaleImport(models.Model):
    date_of_purchase = models.DateField(default=datetime.date.today)
    customer_name = models.CharField(max_length=500,blank=False)
    gender = models.CharField(max_length=200,blank=False)
    _id = models.CharField(max_length=200,default="")
    phone = models.CharField(max_length=200,default="")
    alternative_phone_number = models.CharField(max_length=200)
    county = models.CharField(max_length=200)
    sub_county = models.CharField(max_length=200)
    product = models.CharField(max_length=500)
    serial_number = models.CharField(max_length=300)
    total_price = models.IntegerField(null=True)
    deposit = models.IntegerField(null=True)
    credit = models.IntegerField(null=True)
    repayment_tenure = models.IntegerField(null=True)
    status = models.CharField(max_length=300)

    def __str__(self):
        return self.product


# Company
# Product
# Customer
