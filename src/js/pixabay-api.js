import axios from 'axios';
import { hideLoader } from './render-functions.js';

//TODO get array img axios API pixabay
export default async function getImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: '51145498-f51992c20e23a6f6f425bd97f',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    max_width: 320,
    max_height: 200,
    safesearch: 'true',
    per_page: 15,
    page: page,
  });

  const url = `https://pixabay.com/api/?${params}`;

  try {
    const response = await axios.get(url);
    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Ошибка', error);
    return [];
  }
}
