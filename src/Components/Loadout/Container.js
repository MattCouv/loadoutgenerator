import React from 'react';
import ContainerHeader from './ContainerHeader';

const Container = props => (
  <div className="loadout-item-container left-margin-container">
    <ContainerHeader name={props.name} slug={props.slug}/>
    {props.children}
  </div>
);

export default Container;