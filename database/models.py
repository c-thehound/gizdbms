from django.db import models
import datetime

class Customer(models.Model):
    fname = models.CharField(max_length=200,blank=False)
    lname = models.CharField(max_length=200,blank=False)
    id_no = models.CharField(max_length=200,blank=False)
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
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,null=False)
    sales_man = models.ForeignKey("accounts.User",on_delete=models.CASCADE,null=False,default=1)
    purchase_date = models.DateField(default=datetime.date.today,blank=False)
    constituency = models.ForeignKey(Constituency,on_delete=models.CASCADE)
    county = models.ForeignKey(County,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.IntegerField()
    deposit = models.IntegerField()
    credit_amount = models.IntegerField()
    serial = models.CharField(max_length=200,blank=False)

    def __str__(self):
        return self.product.name
