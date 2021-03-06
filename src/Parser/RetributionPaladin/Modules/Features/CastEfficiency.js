import React from 'react';

import SPELLS from 'common/SPELLS';

import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';

import CoreCastEfficiency from 'Parser/Core/Modules/CastEfficiency';


class CastEfficiency extends CoreCastEfficiency {
    static CPM_ABILITIES = [
    ...CoreCastEfficiency.CPM_ABILITIES,
    {
      spell: SPELLS.WAKE_OF_ASHES,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 30,
      recommendedCastEfficiency: 0.9,
      extraSuggestion: <span>Try to use Wake as much as possible. It has a high damage per execute time and generates a lot of holy power. It is better to waste 1-2 holy power than to hold the ability.</span>,
    },
    {
      spell: SPELLS.CRUSADE_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 120,
      isActive: combatant => combatant.hasTalent(SPELLS.CRUSADE_TALENT.id),
    },    
    {
      spell: SPELLS.AVENGING_WRATH,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 120,
      hideWithZeroCasts: true,
    },
    {
      spell: SPELLS.HOLY_WRATH_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.COOLDOWNS,
      getCooldown: haste => 180,
      isActive: combatant => combatant.hasTalent(SPELLS.HOLY_WRATH_TALENT.id),
    },
    {
      spell: SPELLS.CRUSADER_STRIKE,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 3.5 / (1 + haste),
      isActive: combatant => combatant.hasTalent(SPELLS.THE_FIRES_OF_JUSTICE_TALENT.id),
    },
    {
      spell: SPELLS.CRUSADER_STRIKE,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 4.5 / (1 + haste),
    },
    {
      spell: SPELLS.ZEAL_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 4.5 / (1 + haste),
      isActive: combatant => combatant.hasTalent(SPELLS.ZEAL_TALENT.id),
    },
    {
      spell: SPELLS.JUDGMENT_CAST,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 12 / (1 + haste),
    },
    {
      spell: SPELLS.BLADE_OF_JUSTICE,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => null, //10.5 / (1 + haste)
      hideWithZeroCasts: true,
    },
    {
      spell: SPELLS.DIVINE_HAMMER_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 12 / (1 + haste),
      isActive: combatant => combatant.hasTalent(SPELLS.DIVINE_HAMMER_TALENT.id),
    },
    {
      spell: SPELLS.TEMPLARS_VERDICT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => null,
    },
    {
      spell: SPELLS.DIVINE_STORM,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => null,
      hideWithZeroCasts: true,
    },
    {
      spell: SPELLS.EXECUTION_SENTENCE_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.ROTATIONAL,
      getCooldown: haste => 20 / (1 + haste),
      isActive: combatant => combatant.hasTalent(SPELLS.EXECUTION_SENTENCE_TALENT.id),
    },
    {
      spell: SPELLS.SHIELD_OF_VENGEANCE,
      category: CastEfficiency.SPELL_CATEGORIES.UTILITY,
      getCooldown: haste => 120, // TODO calculate cd reduction based on artifact
      noCanBeImproved: true,
      importance: ISSUE_IMPORTANCE.MINOR,
    },
    {
      spell: SPELLS.JUSTICARS_VENGEANCE_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.UTILITY,
      getCooldown: haste => null,
      isActive: combatant => combatant.hasTalent(SPELLS.JUSTICARS_VENGEANCE_TALENT.id),
      hideWithZeroCasts: true,
    },
    {
      spell: SPELLS.EYE_FOR_AN_EYE_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.UTILITY,
      getCooldown: haste => null,
      isActive: combatant => combatant.hasTalent(SPELLS.EYE_FOR_AN_EYE_TALENT.id),
      hideWithZeroCasts: true,
    },
    {
      spell: SPELLS.WORD_OF_GLORY_TALENT,
      category: CastEfficiency.SPELL_CATEGORIES.UTILITY,
      getCooldown: haste => null,
      isActive: combatant => combatant.hasTalent(SPELLS.WORD_OF_GLORY_TALENT.id),
      hideWithZeroCasts: true,
    },
  ];
}

export default CastEfficiency;
