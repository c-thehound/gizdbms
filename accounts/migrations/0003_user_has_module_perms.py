# Generated by Django 2.1.7 on 2019-02-24 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_is_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='has_module_perms',
            field=models.BooleanField(default=True),
        ),
    ]
