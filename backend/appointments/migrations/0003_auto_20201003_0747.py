# Generated by Django 3.1.1 on 2020-10-03 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0002_auto_20201003_0301'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointmenttotals',
            name='p_sub',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='appointmenttotals',
            name='s_sub',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
