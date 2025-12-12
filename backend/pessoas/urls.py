from django.urls import path
from . import views


urlpatterns = [
    path('salvar/', views.salvar, name='salvar'),
    path('editar/<int:id>/', views.editar, name='editar'),
    path('update/<int:id>/', views.update, name='update'),
    path('delete/<int:id>/', views.delete, name='delete'),

    path('api/pessoas/', views.pessoas_api, name='pessoas_api'),
    path('api/pessoas/<int:id>/', views.pessoa_api, name='pessoa_api'),
]