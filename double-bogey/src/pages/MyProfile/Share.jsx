import React from 'react';
import {Button} from 'react-bootstrap'
import { endpoint } from '../../configEndpoint';
import step1 from '../../figures/step1.jpeg';
import step2 from '../../figures/step2.jpeg';
import step3 from '../../figures/step3.jpeg';

const Share = () => {

  const handleShareClick = () => {
    const url = endpoint;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL copied');
      })
      .catch((error) => {
        console.error('Failed to copy URL to clipboard:', error);
      });
  };

  return (
    <div className="d-flex flex-column text-center align-items-center justify-content-center mt-2 pb-5">
      <h5 className='m-5'>To copy the url and share, click the button</h5>
      <Button size="lg" style={{ color:"white", backgroundColor: "#395144", border: "none" ,minWidth:"150px"}} onClick={handleShareClick}>Share</Button>
      <br/>
      <p className='ms-5 me-5'><b>1)</b> To download the app, first click the bottom icon of a square with an arrow pointing up.</p>
      <img
        alt='step1'
        src={step1}
        height='500'
        style={{ border: '2px solid black' }}
      />
      <br/>
      <p className='ms-5 me-5'><b>2)</b> Then, pull up the menu and click the 'Add to home Screen' option.</p>
      <img
        alt='step2'
        src={step2}
        height='500'
        style={{ border: '2px solid black' }}
      />
      <br/>
      <p className='ms-5 me-5'><b>3)</b> Lastly, click the blue 'Add' option in the top right and the app will be added to your phone.</p>
      <img
        alt='step3'
        src={step3}
        height='500'
        style={{ border: '2px solid black' }}
      />
    </div>
  )
};

export default Share;