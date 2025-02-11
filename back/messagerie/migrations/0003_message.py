# Generated by Django 4.2.3 on 2024-04-27 19:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('messagerie', '0002_remove_room_room_name_alter_room_room_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('message_id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('message_body', models.TextField()),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='messagerie.room')),
            ],
        ),
    ]
