import { useState, useEffect } from 'react';
import { PubSub } from 'pubsub-js';
import './index.css';

export default function Favorite() {
  const [saveNews, setSaveNews] = useState([
    {
      id: 0,
      urlToImage: 'https://cdn.mos.cms.futurecdn.net/WMab7m8CVng8rUHffk5bgR-1200-80.jpg',
      url: 'https://readwrite.com/tools-for-every-business-and-seo-specialist-in-2023/',
      title: '5 Must-Have Group of Tools for Every Business and SEO Specialist in 2023',
      source: 'ReadWrite',
      description: 'As the digital landscape evolves, so do the tools and strategies needed to make businesses succeed online. Search Engine Optimization itself, as a business marketing strategy, has had its ‘death’ declared so many times because it felt like it was no longer re…',
      date: "2023-06-20"
    },
  ]);
  useEffect(() => {
    let favoriteToken = PubSub.subscribe('favoriteNews', (_, stateObj) => {
      let currentNews = [...saveNews];
      currentNews.push(stateObj);
      setSaveNews(currentNews);
    })
    return () => {
      PubSub.unsubscribe(favoriteToken);
    }
  }, [saveNews]);
  function removeNews(id) {
    if (window.confirm("Remove this item?")) {
      let currentNews = [...saveNews];
      for (let i = 0; i < currentNews.length; i++) {
        if (currentNews[i].id === id) {
          currentNews.splice(i, 1);
        }
      }
      setSaveNews(currentNews);
    }
  }
  return (
    <div>
      <h2>My favorite News</h2>
      {
        saveNews.length === 0 ? <h2 style={{ color: 'red' }}>No favorite news to show.</h2> :
          saveNews.map((newsObj) => {
            return (
              <div className="card" key={newsObj.id}>
                <div className="card-image">
                  <a href={newsObj.url} target="_blank" rel="noreferrer">
                    <img alt="news_img" src={newsObj.urlToImage} style={{ height: '100px' }} />
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{newsObj.title}</h5>
                  <p>Source: {newsObj.source}</p>
                  <p className="card-text">{newsObj.description}</p>
                  <p>Publish Time: {newsObj.date}</p>
                  <a href={newsObj.url} target="_blank" rel="noreferrer" className="btn btn-primary">Learn More</a>&nbsp;
                  <button onClick={() => removeNews(newsObj.id)} className="btn btn-secondary">Remove</button>
                </div>
              </div>
            )
          })
      }
      <hr className="solid"></hr>
    </div>
  )
}