# Generated by Django 4.1 on 2022-09-21 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_profile_buyer_rating_profile_buyer_rev_num_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='currectwinner',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
