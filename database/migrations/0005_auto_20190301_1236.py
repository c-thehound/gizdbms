# Generated by Django 2.1.7 on 2019-03-01 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0004_auto_20190227_1542'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='id',
        ),
        migrations.RemoveField(
            model_name='sale',
            name='constituency',
        ),
        migrations.AlterField(
            model_name='customer',
            name='id_no',
            field=models.CharField(max_length=200, primary_key=True, serialize=False, unique=True),
        ),
    ]
