# Generated by Django 2.1.7 on 2019-03-06 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0006_auto_20190306_2113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='credit_amount',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='deposit',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='serial',
            field=models.CharField(max_length=200, null=True),
        ),
    ]