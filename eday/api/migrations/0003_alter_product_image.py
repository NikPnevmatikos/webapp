# Generated by Django 4.1 on 2022-09-01 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/no-product-image.png', null=True, upload_to=''),
        ),
    ]
