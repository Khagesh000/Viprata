from django.db import models

class ProjectDocument(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.CharField(max_length=50, choices=[
        ('report', 'Report'),
        ('invoice', 'Invoice'),
        ('proposal', 'Proposal'),
        ('notes', 'Notes')
    ])
    author = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=[
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived')
    ])
    tags = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ FIXED: auto_now_add=True
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
