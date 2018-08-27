import React from 'react';
import Container from './Container';
import Attachement from './Attachement';

const GunContainer = ({
  name, slug, gun, generate,
}) => (
  <Container name={name} slug={gun.slug}>
    <div className="gun-container box-content" onClick={generate}>
      <div className={`weapon large ${gun.className}`} />
    </div>
    <div className="attachments">
      {gun.slots.map(item => <Attachement key={item.sid} className="small" item={item.item} />)}
    </div>
  </Container>
);

export default GunContainer;
