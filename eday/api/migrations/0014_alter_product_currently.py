# Generated by Django 4.1 on 2022-09-07 22:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_product_currently_product_first_bid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='currently',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=7, null=True),
        ),
    ]