# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-29 03:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0006_auto_20171021_2020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artist',
            name='description',
            field=models.TextField(verbose_name='Description'),
        ),
    ]
