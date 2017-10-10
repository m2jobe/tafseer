# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-09 01:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artist', models.CharField(max_length=50, verbose_name='artist')),
                ('location', models.CharField(max_length=50, verbose_name='location')),
                ('image', models.URLField(verbose_name='imageurl')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
            ],
        ),
    ]