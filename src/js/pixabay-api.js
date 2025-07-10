import axios from "axios";

//TODO get array img axios API pixabay
export default async function getImagesByQuery(query, page=0) {

  const params = new URLSearchParams({
    key: "51145498-f51992c20e23a6f6f425bd97f",
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    max_width: 320,
    max_height: 200,
    safesearch: "true",
    per_page: 15,
    page: page+1,
  });


  const url = `https://pixabay.com/api/?${params}`;

  return await axios
    .get(url)
    .then((response) => {
      return response.data.hits;
    })
    .catch((error) => {
      console.error("Ошибка", error);
      return [];
    });
}
