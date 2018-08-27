import React from 'react';


const Attachement = ({ item, className }) => (
  <div className="loadout-item-info box-content">
    <div className="loadout-item-name">
      <span>{item.slug}</span>
    </div>
    <div className="loadout-item-picture">
      <div className="loadout-item-picture-inner">
        <div className={className + item.className} />
      </div>
    </div>
  </div>
);

export default Attachement;
