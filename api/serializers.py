from rest_framework import serializers
from api.models import ProjectDocument

class ProjectDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDocument
        fields = '__all__'  # ✅ Ensure all fields are included
