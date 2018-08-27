import React from 'react';
import ContainerHeader from './ContainerHeader';

const Container = ({ name, slug, children }) => (
  <div className="loadout-item-container left-margin-container">
    <ContainerHeader name={name} slug={slug} />
    {children}
  </div>
);

export default Container;
