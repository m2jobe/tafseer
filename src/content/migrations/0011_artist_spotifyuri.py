# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-29 16:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0010_auto_20171029_1642'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='spotifyURI',
            field=models.CharField(default='', max_length=200, verbose_name='spotifyURI'),
            preserve_default=False,
        ),
    ]