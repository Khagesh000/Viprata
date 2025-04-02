# Generated by Django 4.2.11 on 2025-04-02 09:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_alter_projectdocument_tags"),
    ]

    operations = [
        migrations.AlterField(
            model_name="projectdocument",
            name="author",
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="projectdocument",
            name="category",
            field=models.CharField(
                choices=[
                    ("report", "Report"),
                    ("invoice", "Invoice"),
                    ("proposal", "Proposal"),
                    ("notes", "Notes"),
                ],
                max_length=50,
            ),
        ),
        migrations.AlterField(
            model_name="projectdocument",
            name="status",
            field=models.CharField(
                choices=[
                    ("draft", "Draft"),
                    ("published", "Published"),
                    ("archived", "Archived"),
                ],
                max_length=50,
            ),
        ),
        migrations.AlterField(
            model_name="projectdocument",
            name="title",
            field=models.CharField(max_length=255),
        ),
    ]
