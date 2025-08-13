// utils/scraper.js
import axios from 'axios';
import * as cheerio from 'cheerio';

export const buscarNoticiasCiclismoSantander = async () => {
  const url = 'https://www.vanguardia.com/buscar/ciclismo+Santander'; // ejemplo

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const noticias = [];

    $('.resultado').each((i, el) => {
      const titulo = $(el).find('h2').text().trim();
      const descripcion = $(el).find('p').text().trim();
      const imagen = $(el).find('img').attr('src');
      const fecha = new Date().toISOString().split('T')[0];

      noticias.push({ titulo, descripcion, imagen, resumen: descripcion, fecha });
    });

    return noticias;
  } catch (err) {
    console.error('Error al scrapear noticias:', err);
    return [];
  }
};

// api/utils/scrapper.js

