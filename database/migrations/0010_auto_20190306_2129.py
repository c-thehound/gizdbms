# Generated by Django 2.1.7 on 2019-03-06 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0009_auto_20190306_2119'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='county',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='product',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
