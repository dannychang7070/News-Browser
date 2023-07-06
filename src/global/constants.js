export const API_HOST = "https://newsapi.org/v2";
export const API_KEY = ""; // Your Key
export const API_GET_LATESTET_US_NEWS_DATA = `${API_HOST}/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}&page=`;
export const API_GET_SEARCH_DATA = `${API_HOST}/everything?&pageSize=10&apiKey=${API_KEY}&q=`;