# Generated by Django 4.2.3 on 2024-04-27 19:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messagerie', '0003_message'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='room',
            new_name='room_id',
        ),
    ]
