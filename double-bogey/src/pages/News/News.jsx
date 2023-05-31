import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';

import NewsModal from './NewsModal';

const News = () => {

  const [articles, setArticles] = useState([]);
  const today = new Date();

  useEffect(() => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/golf/pga/news')
    .then((res) => res.json())
    .then((res) => setArticles(res.articles))
  }, [])

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="news-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center pt-3">
        <h1>Latest Golf News</h1>
        <h4>{formatTimestamp(today)}</h4>
      </div>
      {articles.map((article) => {
        return (
          <Container key={article.dataSourceIdentifier} className="d-flex align-items-center justify-content-center text-start pt-3" style={{maxWidth: "750px"}}>
            <Card border="dark">
              <Card.Img className="pt-3 ps-3 pe-3" src={article.images[0].url} />
              <Card.Body className="d-flex flex-column">
                <h2>{article.headline}</h2>
                <h6 className="mt-1"><em>~ {formatTimestamp(article.published)}</em></h6>
                <Card.Text className="mt-3 mb-4">
                  {article.description}
                </Card.Text>
    
                <NewsModal url={article.links.api.news} formatTimestamp={formatTimestamp}/>
              </Card.Body>
            </Card>
          </Container>
        )
      })}
    </div>
  )
}

export default News;