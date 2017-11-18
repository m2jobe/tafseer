# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-17 21:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0017_auto_20171110_1707'),
    ]

    operations = [
        migrations.CreateModel(
            name='Articles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('articleID', models.IntegerField(verbose_name='objectID')),
                ('articleName', models.TextField(verbose_name='articleName')),
                ('articleContent', models.TextField(verbose_name='articleContent')),
            ],
        ),
        migrations.CreateModel(
            name='Glossary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sortorder', models.IntegerField(verbose_name='sortorder')),
                ('term', models.TextField(verbose_name='term')),
                ('description', models.TextField(verbose_name='description')),
                ('to_glossarize', models.BooleanField(verbose_name='to_glossarize')),
            ],
        ),
        migrations.CreateModel(
            name='SurahDetailed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('objectID', models.IntegerField(verbose_name='objectID')),
                ('surahIntro', models.TextField(verbose_name='surahIntro')),
                ('surahAppendix', models.TextField(verbose_name='surahAppendix')),
                ('surahTeachings', models.TextField(verbose_name='surahTeachings')),
                ('surah', models.TextField(verbose_name='surah')),
                ('surahValue', models.TextField(verbose_name='surahValue')),
            ],
        ),
        migrations.DeleteModel(
            name='Artist',
        ),
        migrations.DeleteModel(
            name='Video',
        ),
    ]
