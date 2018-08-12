import {GAME_DATA} from './GameData';

class Generator {
  constructor(player) {
    this.pd = player;
    this.kit = null;
    this.loadout = {
      kit: this.kit,
      slots: {
        primary: {},
        secondary: {},
        gadget1: {},
        gadget2: {},
        grenade: {},
        knife: {}
      }
    }
    this.gadget = [];
    // this.randomPre = this.rndKit.slots[0].items[this.rnd(this.rndKit.slots[0].items.length)]
    // console.log(this.rndKit.sid, GAME_DATA.compact.weapons[this.randomPre]);

  }

  rnd = (x) => {
    return Math.floor(Math.random() * x);
  }


  randomKit = () => {
    this.kit = GAME_DATA.loadout.kits[this.rnd(4)];

    this.loadout.kit = this.kit;

    return this;
  }

  randomPrimary = () => {
    return this.randomSlot(0);
  }

  randomSecondary  = () => {
    return this.randomSlot(1);
  }

  randomGadget1 = () => {
    return this.randomSlot(2);
  }

  randomGadget2 = () => {
    return this.randomSlot(3);
  }

  randomGrenade = () => {
    return this.randomSlot(4);
  }

  randomKnife = () => {
    return this.randomSlot(5);
  }

  randomSlot(slot) {
    const Items = this.kit.slots[slot].items;
    const key = Object.keys(this.loadout.slots)[slot];
    const id = Items[this.rnd(Items.length)];

    ["weapons", "kititems"].forEach(element => {
      const item = GAME_DATA.compact[element][id];
      if (typeof item === "undefined") {
        return true;
      }
      item.id = id;
      const slots = this.getOptions(id);
      if (slots !== null) {
        item.slots = slots;
      }
      item.className = GAME_DATA.compact[element][item.see[0]].imageConfig.slug;
      if (element === "kititems") {
        item.className = " kititem " + item.className;
      } else {
        item.className =  " weapon " + item.className;
      }
      item.type = element;
      this.loadout.slots[key] = item;
    });

    return this;
  }

  getOptions(id) {
    const weapon = GAME_DATA.loadout.weapons[id];
    if (typeof weapon === "undefined") {
      return null;
    }

    if (typeof weapon.slots === "undefined") {
      return null;
    }

   return weapon.slots.map(slot => {
      const id = slot.items[this.rnd(slot.items.length)];
      const obj = {};
      ["weaponaccessory", "appearances"].forEach(element => {
        const accessory = GAME_DATA.compact[element][id];
        if (typeof accessory === "undefined") {
          return true;
        }
        accessory.className = GAME_DATA.compact[element][accessory.see[0]].imageConfig.slug;
        if (element === "appearances") {
          accessory.className = " camo " + accessory.className;  
        }else{
          accessory.className = " weaponaccessory " + accessory.className;  
        }
        accessory.type = element;
        obj.sid = slot.sid;
        obj.item = accessory;
      });
      return obj;
    }, []);
  }
}

export default Generator;