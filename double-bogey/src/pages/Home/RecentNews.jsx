import {Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const RecentNews = ({ articles }) => {

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const limitedArticles = articles.slice(0, 3);

  return (
    limitedArticles.map((article, index) => (
      <Container key={index + 1} className="d-flex align-items-center justify-content-center text-start pt-3" style={{maxWidth: "750px", fontSize: "12px"}}>
        <Link to="/news" style={{ textDecoration: 'none', color: 'black' }}>
          <Card border="dark">
            <Card.Body className="d-flex">
              <Card.Img className="me-3" src={article.images[0].url} style={{ width: '80px' }}/>
              <div className="d-flex flex-column">
                <em><b>{article.headline} ...</b></em>
                <em>{formatTimestamp(article.published)}</em>
              </div>
            </Card.Body>
          </Card>
        </Link>
      </Container>
    ))
  );
};


export default RecentNews;