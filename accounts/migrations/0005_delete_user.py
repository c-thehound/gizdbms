# Generated by Django 2.1.7 on 2019-02-26 16:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20190224_1407'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]