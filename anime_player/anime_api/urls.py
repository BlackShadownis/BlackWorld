# anime_api/urls.py
from django.urls import path
from .import views  # Importamos las vistas desde el archivo views.py

urlpatterns = [
    path('anime/search/<str:anime_name>/', views.search_anime, name='search_anime'),  # El endpoint para buscar el anime
]
