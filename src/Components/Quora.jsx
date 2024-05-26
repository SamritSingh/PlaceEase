import React, { useState } from 'react';
import './Quora.css';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Navigationbar from './Navigationbar';
import QuoraDefaultBox from './QuoraDefaultBox';


function Quora() {
  const [selectedTitle, setSelectedTitle] = useState('Announcements');

  return (
    <div className='Quora' id='quora'>
      <Navigationbar />
      <div className="quora-content">
        <div className="sidebar">
          <Sidebar setSelectedTitle={setSelectedTitle} />
        </div>
        <div className="main-content">
          <QuoraDefaultBox selectedTitle={selectedTitle} />
          <Feed selectedTitle={selectedTitle} />
        </div>
      </div>
    </div>
  );
}

export default Quora;
