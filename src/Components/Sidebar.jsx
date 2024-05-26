import React from 'react';
import SidebarContent from './SidebarContent';
import './Sidebar.css';

function Sidebar({ setSelectedTitle }) {
  const titles = [
    "Announcements",
    "Amazon",
    "Microsoft",
    "Google",
    "ZScaler",
    "Infosys",
    "Wipro",
    "Morgan Stanley",
    "JP Morgan",
    "Accenture"
  ];

  return (
    <div className='Sidebar'>
      {titles.map((title) => (
        <div key={title} onClick={() => setSelectedTitle(title)}>
          <SidebarContent title={title} />
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
