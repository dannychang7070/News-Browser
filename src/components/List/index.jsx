import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { PubSub } from 'pubsub-js';
import { API_GET_LATESTET_US_NEWS_DATA, API_GET_SEARCH_DATA } from "../../global/constants";
import './index.css';

export default function List() {
  const [news, setNews] = useState([
  ]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [api, setApi] = useState(API_GET_LATESTET_US_NEWS_DATA + page);
  useEffect(() => {
    let token = PubSub.subscribe('keyword', (_, stateObj) => {
      setKeyword(stateObj.keyword);
      setPage(1);
      setApi(API_GET_SEARCH_DATA + stateObj.keyword + "&page=" + page);
    })
    const getTasks = async () => {
      const newsFromServer = await fetchNews();
      const currentNews = [];
      for (var i = 0; i < newsFromServer.articles.length; i++) {
        const newNews = {};
        newNews.id = nanoid();
        newNews.urlToImage = newsFromServer.articles[i].urlToImage ?? 'https://avatars.githubusercontent.com/u/6412038?v=3';
        newNews.url = newsFromServer.articles[i].url ?? 'https://react.dev/';
        newNews.title = newsFromServer.articles[i].title ?? 'Title';
        newNews.source = newsFromServer.articles[i].source.name ?? 'Unknown Source';
        newNews.description = newsFromServer.articles[i].description;
        newNews.date = newsFromServer.articles[i].publishedAt ?? 'Unknown Date';
        newNews.seen = false;
        currentNews.push(newNews);
      }
      setNews(currentNews);
    }
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(api)
        const data = await res.json()
        setLoading(false);
        return data
      } catch (error) {
        setError(error);
      }
    }
    getTasks();
    return () => {
      PubSub.unsubscribe(token);
    }
  }, [page, api]);
  function prevPage() {
    let prevPageNumber = page - 1;
    if (keyword.length === 0) {
      setPage(prevPageNumber);
      setApi(API_GET_LATESTET_US_NEWS_DATA + prevPageNumber);
    } else {
      setPage(prevPageNumber);
      setApi(API_GET_SEARCH_DATA + keyword + "&page=" + prevPageNumber);
    }
  }
  function nextPage() {
    let nextPageNumber = page + 1;
    if (keyword.length === 0) {
      setPage(nextPageNumber);
      setApi(API_GET_LATESTET_US_NEWS_DATA + nextPageNumber);
    } else {
      setPage(nextPageNumber);
      setApi(API_GET_SEARCH_DATA + keyword + "&page=" + nextPageNumber);
    }
  }
  function saveNews(id) {
    let currentNews = [...news];
    for (let i = 0; i < currentNews.length; i++) {
      if (currentNews[i].id === id) {
        PubSub.publish('favoriteNews', currentNews[i]);
        currentNews.splice(i, 1);
        setNews(currentNews);
        return;
      }
    }
  }
  function setSeen(id) {
    let currentNews = [...news];
    for (let i = 0; i < currentNews.length; i++) {
      if (currentNews[i].id === id) {
        currentNews[i].seen = true;
        setNews(currentNews);
        return;
      }
    }
  }
  return (
    <div>
      {
        loading ? <h2>Loading......</h2> :
          error ? <h2 style={{ color: 'red' }}>{error}</h2> :
            news.length === 0 ? <h2 style={{ color: 'red' }}>No news to show.</h2> :
              news.map((newsObj) => {
                return (
                  <div className="card" key={newsObj.id} style={{ backgroundColor: newsObj.seen ? 'grey' : 'white' }}>
                    <div className="card-image">
                      <a onClick={() => setSeen(newsObj.id)} href={newsObj.url} target="_blank" rel="noreferrer">
                        <img alt="news_img" src={newsObj.urlToImage} style={{ height: '100px' }} />
                      </a>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{newsObj.title}</h5>
                      <p>Source: {newsObj.source}</p>
                      <p className="card-text">{newsObj.description}</p>
                      <p>Publish Time: {newsObj.date}</p>
                      <a onClick={() => setSeen(newsObj.id)} href={newsObj.url} target="_blank" rel="noreferrer" className="btn btn-primary">Learn More</a>&nbsp;
                      <button onClick={() => saveNews(newsObj.id)} className="btn btn-secondary">Favorite</button>
                    </div>
                  </div>
                )
              })
      }
      <div className="navigation">
        {
          page > 1 ? <button onClick={prevPage}>Prev Page</button> : null
        }
        &nbsp;
        {
          news.length > 0 && news.length < 11 && page < 10 ? <button onClick={nextPage}>Next page</button> : null
        }
      </div>
    </div>
  )
}