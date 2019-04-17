from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import *

@admin.register(Sale)
class SaleAdmin(ImportExportModelAdmin):
    pass
    
admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(Company)
admin.site.register(County)
admin.site.register(Constituency)
admin.site.register(ProductType)
