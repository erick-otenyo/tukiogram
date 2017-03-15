# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-12 17:24
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='default_location',
            field=django.contrib.gis.db.models.fields.PointField(null=True, srid=4326),
        ),
    ]
