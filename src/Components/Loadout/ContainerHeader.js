import React from 'react';


const ContainerHeader = props => (
    <div className="loadout-container-header">
      <h1><span>{props.name}</span><span className="Pname">{(props.slug !== null ? props.slug : '')}</span></h1>
    </div>
);

export default ContainerHeader;