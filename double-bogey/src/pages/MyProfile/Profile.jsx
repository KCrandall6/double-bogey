import React from 'react';
import {Button} from 'react-bootstrap';
import ProfileStats from './Components/ProfileStats';

const Profile = ({person, soloGames, teamGames, clearPlayer}) => {



  // console.log('porf', playerGames)

  return (
    <div className="mobile-container">
      {/* max width contsiner */}
      <div className='d-flex mt-2 me-2 justify-content-end'>
        <Button size="sm" style={{ color:"white", backgroundColor: "#AA9B56", border: "none"}} onClick={() => clearPlayer()}>Reset Player</Button>
      </div>
        <ProfileStats person={person} soloGames={soloGames} teamGames={teamGames}/>
    </div>
  )
};

export default Profile;