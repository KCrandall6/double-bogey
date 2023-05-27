import React, { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';

const News = () => {

  const [articles, setArticles] = useState([]);
  // const today = new Date().toJSON();

  useEffect(() => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/golf/pga/news')
    .then((res) => res.json())
    .then((res) => setArticles(res.articles))
  }, [])

  console.log('articles', articles)

  return (
    <div>
      <h1>Golf News</h1>
      {articles.map((article) => {
        return (
          <Container key={article.dataSourceIdentifier} className="d-flex align-items-center justify-content-center text-start pt-3">
            <Card border="dark">
              <Card.Img className="pt-3 ps-3 pe-3" src={article.images[0].url} />
              <Card.Body>
                <Card.Title>{article.headline}</Card.Title>
                <Card.Text>
                  {article.description}
                </Card.Text>
                <Button style={{ color:"white", backgroundColor: "#395144", border: "none"}}>Read More...</Button>
              </Card.Body>
            </Card>
          </Container>
        )
      })}
      {/* <div className='pb-5'>
        <p>l</p>
      </div> */}
    </div>
  )
}

export default News;