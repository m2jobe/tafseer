# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-29 15:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0007_auto_20171029_0358'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='imageurl1',
            field=models.URLField(default='', verbose_name='imageurl1'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artist',
            name='imageurl2',
            field=models.URLField(default='', verbose_name='imageurl2'),
            preserve_default=False,
        ),
    ]
