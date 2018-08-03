import {GAME_DATA} from './GameData';

class Generator {
  constructor(player) {
    this.pd = player;
    this.kits = ["assault", "engineer", "support", "recon"];
    this.kit = '';
    this.gadget = [];
    this.rndKit = GAME_DATA.loadout.kits[this.rnd(4)];
    this.randomPre = this.rndKit.slots[0].items[this.rnd(this.rndKit.slots[0].items.length)]
    console.log(this.rndKit.sid, GAME_DATA.compact.weapons[this.randomPre]);
    this.assign = {
      gunAssign: [
        { id: 'F2000', name: "Express Train" },
        { id: 'AS VAL', name: "CO-PILOT" },
        { id: 'DAO-12', name: "DEAD STOP" },
        { id: 'M60-E4', name: "DUST DEVIL" },
        { id: 'BULLDOG', name: "Lions and Tigers and Bears" },
        { id: 'ACE 23', name: "Assault Expert" },
        { id: "UMP-9", name: "Engineer Expert" },
        { id: "FY-JS", name: "Recon Expert" },
        { id: "RPK-12", name: "Support Expert" },
        { id: "GOL Magnum", name: "Eagle\'s Nest" },
        { id: "L85A2", name: "Open Fire" },
        { id: "MP7", name: "Make a dent" },
        { id: "RPK", name: "Powder Keg" },
        { id: "L115", name: "Need Only One" },
        { id: "AR160", name: "Spare time Sniper" },
        { id: "SR-2", name: "Packing a Punch" },
        { id: "AWS", name: "Swiss Cheese" },
        { id: "SR338", name: "Always Deadly" },
        { id: "MPX", name: "Not the Weakest Link" },
        { id: "CS5", name: "The \'I\' in Team" },
        { id: "QBZ-95-1", name: "To Valhalla (Campaign)" },
        { id: "P90", name: "Peace Maker (Campaign)" },
        { id: "M249", name: "Final Duty (Campaign)" }
      ],
      handgunAssignments: [
        { id: "UNICA 6", name: "Big Splash" },
        { id: "M412 REX", name: "Tombstone Actual (Campaign)" },
        { id: "SW40", name: "Curve Ball" }
      ],
      gadgetAssignments: [
        { id: "SUAV", name: "Safe Raiding" },
        { id: "UCAV", name: "Eyes in the Sky" },
        { id: "BALLISTIC SHIELD", name: "Vanguard" },
        { id: "DS-3 DECOY", name: "Disinformation" },
        { id: "TARGET DETECTOR", name: "Eye Spy" },
      ],
      knifeAssignments: [
        { id: "SHANK", name: "Fang of the Underworld (Campaign)" },
        { id: "MACHETE", name: "A Trapped Wolf Will (Campaign)" },
      ]
    }
  }

  rnd = (x) => {
    return Math.floor(Math.random() * x);
  }
  rndCats = (x) => {
    var cats = [];
    if (x === "assault") {
      cats = ["ASSAULT RIFLE", "CARBINE", "SHOTGUN", "DMR"];
    } else if (x === "engineer") {
      cats = ["PDW", "CARBINE", "SHOTGUN", "DMR"];
    } else if (x === "support") {
      cats = ["LMG", "CARBINE", "SHOTGUN", "DMR"];
    } else if (x === "recon") {
      cats = ["SNIPER RIFLE", "CARBINE", "SHOTGUN", "DMR"];
    }
    return cats[this.rnd(cats.length - 1)];
  }

  listGUns = (a, x) => {//a=variables above and x="GRENADE","ASSAULT RIFLE","CARBINE","LMG","PDW","DMR","SNIPER RIFLE","SIDEARM","SHOTGUN"
    let y = 0;
    const pd = this.pd; 
    for (var i = 0; i < pd.weapons.length; i++) {
      if (pd.weapons[i].detail.category === x) {
        a[y] = pd.weapons[i];
        y++;
      } else {
        y = y;
      }
    }

    return a;
  }

  rndPrimary = (x, a) => {//x=one of the tables above a=wich weapon category
    const Gun = [];
    this.listGUns(Gun, a);
    let pre = null,
    gun = true;
    do {
      const tocheck = [];
      pre = Gun[this.rnd(Gun.length - 1)];
      x.forEach(element => {
        if (element.id === pre.name) {
          tocheck[0] = element;
        }
      });
      if (!tocheck[0]) {
        gun = this.gunUnlock(pre.name, this.unlockGun(a, this.unlockItem("weapon")));
      } else {
        gun = this.gunAssignments(tocheck[0].name);
      }
    }
    while (gun === false);
    return pre;
  }

  gunAssignments = (x) => {
    let assignment;
    let checked = 0, gun = false;
    this.pd.assignments.forEach(element => {
      if (element.name === x) {
        assignment = element;
      }
    })
    
    if (undefined === assignment) {
      gun = true;
    } else {
      assignment.criterias.forEach(crit => {
        if (crit.curr === crit.needed) {
          checked++;
        } else {
          checked = checked;
        }
      })

      if (checked === assignment.criterias.length) {
        gun = true;
      } else {
        gun = false;
      }
    }

    return gun;
  }

  unlockItem = (x) => {//have to receive the category of the item for instance weapon or weaponUnlock
    let y = 0;
    const item = [];
    this.pd.upcomingUnlocks.forEach(element => {
      if (element.type === x) {
        item[y] = element;
        y++;
      } else {
        y = y;
      }
    })
    
    return item;
  }

  unlockGun = (x, a) => {//have to receive the category of the primary for instance RIFLE or DMR
    let y = 0;
    const primary = [];
    a.forEach(element => {
      if (element.subname === x) {
        primary[y] = element;
        y++;
      } else {
        y = y;
      }
    })
    
    return primary;
  }

  gunUnlock = (x, y) => {//x=pre.name
    let not = false;
    let gun = false;
    y.forEach(element => {
      if (element.name === x) {
        not = true;
      }
    });

    if (not === true) {
      gun = false;
    } else {
      gun = true;
    }
    
    return gun;
  }
}

export default Generator;