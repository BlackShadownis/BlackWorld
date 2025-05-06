import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_anime_list(anime_name):
    print(f"🟢 Iniciando búsqueda para: {anime_name}")

    options = Options()
    options.headless = True
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    base_url = f'https://www3.animeflv.net/browse?q={anime_name}'
    print(f"🌐 Navegando a: {base_url}")
    driver.get(base_url)

    time.sleep(3)

    try:
        anime_link = driver.find_element(By.CSS_SELECTOR, ".Anime a")

        anime_title = anime_link.text
        anime_href = anime_link.get_attribute('href')
        driver.get(anime_href)
        time.sleep(20)
    except Exception as e:
        print(f"❌ Error encontrando el anime: {e}")
        driver.quit()
        return []

    episodes = []
    try:
        episode_blocks = driver.find_elements(By.CSS_SELECTOR, "#episodeList li")
        for block in episode_blocks:
            a_tag = block.find_element(By.TAG_NAME, 'a')
            href = a_tag.get_attribute('href')
            ep_text = a_tag.text.strip()
            ep_num = int(ep_text.split()[-1]) if ep_text.split()[-1].isdigit() else None

            episodes.append({
                "episode_number": ep_num,
                "episode_name": ep_text,
                "episode_link": href
            })
    except Exception as e:
        print(f"⚠️ Error leyendo episodios: {e}")

    driver.quit()

    print(f"✅ Devuelto {len(episodes)} episodios.")
    return [{
        "name": anime_title,
        "link": anime_href,
        "episodes": episodes
    }]
