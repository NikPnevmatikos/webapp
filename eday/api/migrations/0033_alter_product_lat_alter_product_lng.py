# Generated by Django 4.1 on 2022-09-25 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_alter_product_lat_alter_product_lng'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='lat',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='lng',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
