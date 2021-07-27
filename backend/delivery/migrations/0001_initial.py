# Generated by Django 3.2.4 on 2021-07-22 12:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='orderTimelocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('longitude', models.DecimalField(decimal_places=8, max_digits=12)),
                ('latitude', models.DecimalField(decimal_places=8, max_digits=12)),
            ],
        ),
        migrations.CreateModel(
            name='timeInterval',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('order_timelocation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='time_interval', to='delivery.ordertimelocation')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_publish', models.DateField()),
                ('date_available', models.DateField()),
                ('weight', models.DecimalField(decimal_places=2, max_digits=5)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='customer', to=settings.AUTH_USER_MODEL)),
                ('retailer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='retailer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
