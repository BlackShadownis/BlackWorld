from django.http import JsonResponse
from anime_api.scraper import get_anime_list

def search_anime(request, anime_name):
    try:
        anime_list = get_anime_list(anime_name)
        return JsonResponse(anime_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
