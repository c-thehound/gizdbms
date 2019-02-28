# Generated by Django 2.1.7 on 2019-02-27 13:24

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Constituency',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='County',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(max_length=200)),
                ('lname', models.CharField(max_length=200)),
                ('id_no', models.CharField(max_length=200)),
                ('phone_number', models.CharField(max_length=200)),
                ('alternative_phone_number', models.CharField(blank=True, max_length=200)),
                ('gender', models.CharField(choices=[('M', 'MALE'), ('F', 'FEMALE')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_date', models.DateField(default=datetime.date.today)),
                ('quantity', models.IntegerField()),
                ('deposit', models.IntegerField()),
                ('credit_amount', models.IntegerField()),
                ('serial', models.CharField(max_length=200)),
                ('constituency', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Constituency')),
                ('county', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.County')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Customer')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.Product')),
            ],
        ),
        migrations.AddField(
            model_name='constituency',
            name='county',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='database.County'),
        ),
    ]
