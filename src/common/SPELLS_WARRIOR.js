/**
 * All Warrior abilities except talents go in here. You can also put a talent in here if you want to override something imported in the `./talents` folder, but that should be extremely rare.
 * You need to do this manually, usually an easy way to do this is by opening a WCL report and clicking the icons of spells to open the relevant Wowhead pages, here you can get the icon name by clicking the icon, copy the name of the spell and the ID is in the URL.
 * You can access these entries like other entries in the spells files by importing `common/SPELLS` and using the assigned property on the SPELLS object. Please try to avoid abbreviating properties.
 */

export default {
  // Arms:
  MORTAL_STRIKE: {
    id: 12294,
    name: 'Mortal Strike',
    icon: 'ability_warrior_savageblow',
  },
  COLOSSUS_SMASH: {
    id: 167105,
    name: 'Colossus Smash',
    icon: 'ability_warrior_colossussmash',
  },

  COLOSSUS_SMASH_DEBUFF: {
  id: 208086,
  name: 'Colossus Smash',
  icon: 'ability_warrior_colossussmash',
  },
  BLADESTORM: {
    id: 227847,
    name: 'Bladestorm',
    icon: 'ability_warrior_bladestorm',
  },
  SLAM: {
    id: 1464,
    name: 'Slam',
    icon: 'ability_warrior_decisivestrike',
  },
  EXECUTE: {
    id: 163201,
    name: 'Execute',
    icon: 'inv_sword_48',
  },
  CHARGE: {
    id: 100,
    name: 'Charge',
    icon: 'ability_warrior_charge',
  },
  BATTLE_CRY: {
    id: 1719,
    name: 'Battle Cry',
    icon: 'warrior_talent_icon_innerrage',
  },
  WARBREAKER: {
    id: 209577,
    name: 'Warbreaker',
    icon: 'inv_sword_2h_artifactarathor_d_01',
  },
  SHATTERED_DEFENSES_BUFF: {
    id: 248625,
    name: 'Warbreaker',
    icon: 'warrior_talent_icon_igniteweapon',
  },

  // Fury:
  // ...

  // Protection:
  // ...

  // Shared:
  // ...
};
