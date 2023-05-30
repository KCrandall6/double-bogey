import React, {useState, useEffect} from 'react'; 
import { Modal, Button} from 'react-bootstrap';

const NewsModal = ({url, formatTimestamp}) => {

  const [show, setShow] = useState(false);
  const [content, setContent] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const updatedUrl = new URL(url.href);
    updatedUrl.protocol = 'https';

    fetch(updatedUrl.href)
      .then((res) => res.json())
      .then((res) => setContent(res));
  }, [url]);

  return (
    <>
      <Button onClick={() => handleShow()} style={{ color:"white", backgroundColor: "#395144", border: "none"}}>Read More...</Button>
      {url.href[7] === "n" ? (
        <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <div className="d-flex flex-column text-center">
            {content.headlines && content.headlines.length > 0 ? (
              <>
                <Modal.Title>{content.headlines[0].title}</Modal.Title>
                <div className="d-flex flex-row justify-content-around">
                  <p className=""><em>~ by {content.headlines[0].source} ~</em></p>
                  <p className=""><em>~ {formatTimestamp(content.timestamp)} ~</em></p>
                </div>
              </>
            ) : (
              <Modal.Title>No Title Available</Modal.Title>
            )}
          </div>
        </Modal.Header>
          {content.headlines && content.headlines.length > 0 ? (
            <Modal.Body>
              <div dangerouslySetInnerHTML={{ __html: content.headlines[0].story }}></div>
            </Modal.Body>
          ) : (
            <Modal.Body>Error: No Content Available</Modal.Body>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : url.href[7] === "a" ? (
        <Modal show={show} onHide={handleClose} fullscreen={true}>
          <Modal.Header closeButton>
          <div className="d-flex flex-column text-center">
            {content.videos && content.videos.length > 0 ? (
              <>
                <Modal.Title>{content.videos[0].headline}</Modal.Title>
                <div className="d-flex flex-row justify-content-around">
                  <p className=""><em>~ {formatTimestamp(content.timestamp)} ~</em></p>
                </div>
              </>
            ) : (
              <Modal.Title>No Title Available</Modal.Title>
            )}
          </div>
          </Modal.Header>
          {content.videos && content.videos.length > 0 ? (
            <>
              <Modal.Body>
                {content.videos[0].links && content.videos[0].links.mobile && content.videos[0].links.mobile.source.href && (
                  <video controls src={content.videos[0].links.mobile.source.href} style={{ width: '100%' }}></video>
                  )}
                <p>{content.videos[0].description}</p>
              </Modal.Body>
            </>
          ) : (
            <Modal.Body>Error: No Content Available</Modal.Body>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  )
}

export default NewsModal;