import React from 'react';
import SPELLS from 'common/SPELLS';
import CoreCastEfficiency from 'Parser/Core/Modules/CastEfficiency';

class CastEfficiency extends CoreCastEfficiency {

  static CPM_ABILITIES = [
    ...CoreCastEfficiency.CPM_ABILITIES,
    {
      spell: SPELLS.BATTLE_CRY,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => null,
      recommendedCastEfficiency: 0.95,
      extraSuggestion: "",
    },
    {
      spell: SPELLS.BLADESTORM,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => null,
      recommendedCastEfficiency: 0.95,
      extraSuggestion: "",
    },
    {
      spell: SPELLS.MORTAL_STRIKE,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 6 / (1 + haste),
      recommendedCastEfficiency: 0.95,
      extraSuggestion: "",
    },
    {
      spell: SPELLS.COLOSSUS_SMASH,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => null,
      recommendedCastEfficiency: 0.95,
      extraSuggestion: "",
    },
  ];
}

export default CastEfficiency;
