import React from 'react';
import { connect } from 'react-redux';
import GunContainer from '../Components/Loadout/GunContainer';
import ItemsContainer from '../Components/Loadout/ItemsContainer';
import {
  genAll,
  genGadget1, genGadget2, genGrenade, genPrimary, genKnife, genSecondary,
} from '../store/loadout/actions';

const Index = ({ generate, loadout }) => (
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
          <div className="picture" style={{ background: `url(/static/bf4/kits/${loadout.kit.sid.replace('WARSAW_ID_M_', '').toLowerCase()}.png) 0% 0% / 100%` }} />
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

const mapStateToProps = ({ loadout }) => ({
  loadout,
});

const mapDispatchToProps = dispatch => ({
  generate: {
    genAll: () => dispatch(genAll()),
    genPrimary: () => dispatch(genPrimary()),
    genSecondary: () => dispatch(genSecondary()),
    genGadget1: () => dispatch(genGadget1()),
    genGadget2: () => dispatch(genGadget2()),
    genGrenade: () => dispatch(genGrenade()),
    genKnife: () => dispatch(genKnife()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
