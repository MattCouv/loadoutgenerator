import React, {Component} from "react";
import Generator from './../Components/Generator';

class Loadout extends Component{
  constructor(props) {
    super(props);

    this.generator = new Generator(props.player);
    if (this.props.loadout === null) {
      this.generate();
    }
  }
  generate = () => {
    const generator = this.generator;
    generator.kit = generator.kits[generator.rnd(3)];
    const { gunAssign, handgunAssignments, knifeAssignments } = generator.assign;
    const loadout = {
      kit: generator.kit,
      primary: generator.rndPrimary(gunAssign, generator.rndCats(generator.kit)),
      handgun: generator.rndPrimary(handgunAssignments, "SIDEARM"),
      grenade: generator.rndPrimary(gunAssign, "GRENADE"),
      knife: generator.rndPrimary(knifeAssignments, "KNIFE")
    };
    this.props.setLoadout(loadout);
  }

  genPrimary = () => {
    const generator = this.generator;
    const { gunAssign } = generator.assign;
    const loadout = {
      ...this.props.loadout,
      primary: generator.rndPrimary(gunAssign, generator.rndCats(this.props.loadout.kit))
    };
    this.props.setLoadout(loadout);
  }
  genHandgun = () => {
    const generator = this.generator;
    const { handgunAssignments } = generator.assign;
    const loadout = {
      ...this.props.loadout,
      handgun: generator.rndPrimary(handgunAssignments, "SIDEARM")
    };
    this.props.setLoadout(loadout);
  }
  genKnife = () => {
    const generator = this.generator;
    const { knifeAssignments } = generator.assign;
    const loadout = {
      ...this.props.loadout,
      knife: generator.rndPrimary(knifeAssignments, "KNIFE")
    };
    this.props.setLoadout(loadout);
  }
  genGrenade = () => {
    const generator = this.generator;
    const { gunAssign } = generator.assign;
    const loadout = {
      ...this.props.loadout,
      grenade: generator.rndPrimary(gunAssign, "GRENADE")
    };
    this.props.setLoadout(loadout);
  }
  render() {
    const styles = {
      picture: (this.props.loadout !== null ? {
        background: 'url(/assets/bf4/kits/' + this.props.loadout.kit + '.png) no-repeat',
        backgroundSize: '100%'
      }:{}),
      primary: (this.props.loadout !== null ? {
        background: 'url(/assets/' + this.props.loadout.primary.imgLineart + ') no-repeat',
        backgroundSize: 'auto 54.4px'
      } : {}),
      handgun: (this.props.loadout !== null ? {
        background: 'url(/assets/' + this.props.loadout.handgun.imgLineart + ') no-repeat',
        backgroundSize: 'auto 54.4px'
      } : {}),
      grenade: (this.props.loadout !== null ? {
        background: 'url(/assets/' + this.props.loadout.grenade.imgLineart + ') no-repeat',
        backgroundSize: '100%'
      } : {}),
      knife: (this.props.loadout !== null ? {
        background: 'url(/assets/' + this.props.loadout.knife.imgLineart + ') no-repeat',
        backgroundSize: '100%'
      } : {})
    };

    return (
      <div id="loadout" className="loadout-container-wpr">

        <div className="row">
          <div className="loadout-kit loadout-item-container">
            <div className="loadout-container-header">
              <h1><span><i></i>kit</span><span className="kitname">{(this.props.loadout !== null ? this.props.loadout.kit : '')}</span></h1>
            </div>
            <div className="kit-picture box-content gen" onClick={this.generate}><div className="picture" style={styles.picture}></div></div>
            <div className="gen box-content" onClick={this.generate}><div className="gen-border"><h1><span>generate</span></h1></div></div>
          </div>
          <div className="loadout-item-container left-margin-container primary-gun">
            <div className="loadout-container-header">
              <h1><span>primary</span><span className="Pname">{(this.props.loadout !== null ? this.props.loadout.primary.name:'')}</span></h1>
            </div>
            <div className="gun-container box-content"><div className="gun primaryW" onClick={this.genPrimary} style={styles.primary}></div></div>
            <div className="loadout-container-header">
              <h1><span>handgun</span><span className="Hname">{(this.props.loadout !== null ? this.props.loadout.handgun.name : '')}</span></h1>
            </div>
            <div className="gun-container box-content"><div className="gun handgunW" onClick={this.genHandgun} style={styles.handgun}></div></div>
            <div className="items">
              <div className="item box-content" onClick={this.genGrenade}>
                <div className="picture-container">
                  <div className="itempic" style={styles.grenade}></div>
                </div>
                <div className="itemname">
                  <h1 className="name">{(this.props.loadout !== null ? this.props.loadout.grenade.name : '')}</h1>
                </div>
              </div>
              <div className="item box-content" onClick={this.genKnife} >
                <div className="picture-container">
                  <div className="itempic" style={styles.knife}></div>
                </div>
                <div className="itemname">
                  <h1 className="name">{(this.props.loadout !== null ? this.props.loadout.knife.name : '')}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loadout;