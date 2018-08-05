import React from 'react';
import Container from './Container';
import Attachement from './Attachement';

const ItemsContainer = ({items, generate}) => (
  <Container name="Items" slug="">
    <div className="attachments">
      <div onClick={generate.genGadget1}>
        <Attachement key={items.gadget1.id}
          item={items.gadget1}
          className={items.gadget1.type === 'kititems' ? 'small' : 'xsmall'}/>
      </div>
      <div onClick={generate.genGadget2}>
        <Attachement key={items.gadget2.id} item={items.gadget2}
          className={items.gadget2.type === 'kititems' ? 'small' : 'xsmall'}/>
      </div>
      <div onClick={generate.genGrenade}>
        <Attachement key={items.grenade.id} item={items.grenade}
          className={items.grenade.type === 'kititems' ? 'small' : 'xsmall'}/>
      </div>
      <div onClick={generate.genKnife}>
        <Attachement key={items.knife.id} item={items.knife}
          className={items.knife.type === 'kititems' ? 'small' : 'xsmall'} />
      </div>
    </div>
  </Container>
)

export default ItemsContainer;