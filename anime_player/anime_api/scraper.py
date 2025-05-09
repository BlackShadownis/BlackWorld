from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def get_anime_list(anime_name):
    # Configuración rápida
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        # Búsqueda
        driver.get(f'https://www3.animeflv.net/browse?q={anime_name}')
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".ListAnimes li"))
        )
        
        # Extrae primer resultado
        anime = driver.find_element(By.CSS_SELECTOR, ".ListAnimes li:first-child")
        anime_link = anime.find_element(By.TAG_NAME, "a")
        anime_data = {
            "name": anime_link.get_attribute("title"),
            "link": anime_link.get_attribute("href"),
            "image": anime.find_element(By.TAG_NAME, "img").get_attribute("src")
        }

        # Extrae episodios (página de detalles)
        driver.get(anime_data["link"])
        episodes = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "#episodeList li a"))
        )
        anime_data["episodes"] = [
            {
                "episode_number": ep.text.split()[-1],
                "episode_name": ep.text,
                "episode_link": ep.get_attribute("href")
            } for ep in episodes
        ]

        return [anime_data]

    except Exception as e:
        print(f"Error durante el scraping: {e}")
        return []
    finally:
        driver.quit()