# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-29 16:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0009_auto_20171029_1621'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='facebook',
            field=models.URLField(default='', verbose_name='facebook'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artist',
            name='instagram',
            field=models.URLField(default='', verbose_name='instagram'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artist',
            name='spotify',
            field=models.URLField(default='', verbose_name='spotify'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artist',
            name='twitter',
            field=models.URLField(default='', verbose_name='twitter'),
            preserve_default=False,
        ),
    ]
