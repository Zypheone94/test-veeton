# Generated by Django 4.2.3 on 2024-04-27 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messagerie', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='room_name',
        ),
        migrations.AlterField(
            model_name='room',
            name='room_id',
            field=models.CharField(max_length=5, primary_key=True, serialize=False),
        ),
    ]
