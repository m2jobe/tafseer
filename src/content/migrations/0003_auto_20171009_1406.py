# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-09 14:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0002_auto_20171009_1404'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='video',
            name='shots',
        ),
        migrations.AddField(
            model_name='video',
            name='thumbnail',
            field=models.URLField(default='dd', verbose_name='Thumbnail'),
            preserve_default=False,
        ),
    ]
