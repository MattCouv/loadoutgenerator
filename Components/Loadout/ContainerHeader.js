import React from 'react';


const ContainerHeader = ({name, slug}) => (
  <div className="loadout-container-header">
    <h1>
      <span>{name}</span>
      <span className="Pname">{(slug !== null ? slug : '')}</span>
    </h1>
  </div>
);

export default ContainerHeader;
