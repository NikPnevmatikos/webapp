# Generated by Django 4.1 on 2022-09-08 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_product_ended_product_started'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='payed',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='mybids',
            name='winningBid',
            field=models.BooleanField(default=True),
        ),
    ]
