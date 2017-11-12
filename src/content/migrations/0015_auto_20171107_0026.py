# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-07 00:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0014_surah'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='surah',
            name='surahName',
        ),
        migrations.RemoveField(
            model_name='surah',
            name='surahValue',
        ),
        migrations.AddField(
            model_name='surah',
            name='label',
            field=models.CharField(default='', max_length=50, verbose_name='label'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='surah',
            name='value',
            field=models.CharField(default='', max_length=50, verbose_name='value'),
            preserve_default=False,
        ),
    ]