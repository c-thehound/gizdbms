from import_export import resources
from database.models import *

class SaleResource(resources.ModelResource):

    class Meta:
        model = Sale

class SaleNewResource(resources.ModelResource):

    class Meta:
        model = SaleImport