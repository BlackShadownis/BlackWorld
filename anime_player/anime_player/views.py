# anime_player/views.py
from django.http import JsonResponse

def anime_list(request):
    data = {'message': 'Lista de animes'}
    return JsonResponse(data)
