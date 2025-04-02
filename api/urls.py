from django.urls import path
from api.views import ProjectDocumentViewSet

urlpatterns = [
    path("project_documents/", ProjectDocumentViewSet.as_view({"get": "list", "post": "create"})),
    path("project_documents/<int:pk>/", ProjectDocumentViewSet.as_view({"put": "update", "get": "retrieve", "delete":"destroy"})),
]
