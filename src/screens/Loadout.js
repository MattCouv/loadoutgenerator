import React from 'react';
import GunContainer from '../Components/Loadout/GunContainer';
import ItemsContainer from '../Components/Loadout/ItemsContainer';

const Loadout = ({ generate, loadout }) => (
  <div id="loadout" className="loadout-container-wpr">

    <div className="row">
      <div className="loadout-kit loadout-item-container">
        <div className="loadout-container-header">
          <h1>
            <span>
              <i />
              kit
            </span>
            <span className="kitname">
              {loadout.kit.sid.replace('WARSAW_ID_M_', '')}
            </span>
          </h1>
        </div>
        <div className="kit-picture box-content gen" onClick={generate.genAll}>
          <div className="picture" style={{ background: `url(/assets/bf4/kits/${loadout.kit.sid.replace('WARSAW_ID_M_', '').toLowerCase()}.png) 0% 0% / 100%` }} />
        </div>
        <div className="gen box-content" onClick={generate.genAll}>
          <div className="gen-border">
            <h1>
              <span>
                generate
              </span>
            </h1>
          </div>
        </div>
      </div>
      <GunContainer name="Primary" gun={loadout.slots.primary} generate={generate.genPrimary} />
      <GunContainer name="Secondary" gun={loadout.slots.secondary} generate={generate.genSecondary} />
      <ItemsContainer items={loadout.slots} generate={generate} />
    </div>
  </div>
);

export default Loadout;
