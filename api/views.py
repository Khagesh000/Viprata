from rest_framework import viewsets
from api.models import ProjectDocument
from api.serializers import ProjectDocumentSerializer

class ProjectDocumentViewSet(viewsets.ModelViewSet):
    queryset = ProjectDocument.objects.all()
    serializer_class = ProjectDocumentSerializer
