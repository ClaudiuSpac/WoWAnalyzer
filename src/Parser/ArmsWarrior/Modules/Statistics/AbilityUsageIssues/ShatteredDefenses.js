import React from 'react';

import Module from 'Parser/Core/Module';
import AbilityTracker from 'Parser/Core/Modules/AbilityTracker';
import Combatants from 'Parser/Core/Modules/Combatants';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';

import { formatNumber } from 'common/format';
import StatisticBox, { STATISTIC_ORDER } from 'Main/StatisticBox';

class ShatteredDefenses extends Module {
  static dependencies = {
    abilityTracker: AbilityTracker,
    combatants: Combatants,
  }
  overwrittenShatteredDefenseBuffs = 0;
  wastedShatteredDefenseBufs = 0;

  /* We need to keep track of whether or not the player overwrote some
  shattered defenses buffs by casting Colossus Smash/Warbreaker while
  the buff was still active. */
  on_byPlayer_cast(event) {

      if (event.ability.guid != SPELLS.COLOSSUS_SMASH.id && event.ability.guid != SPELLS.WARBREAKER.id)
        return;

      if (this.combatants.selected.hasBuff(SPELLS.SHATTERED_DEFENSES_BUFF.id,event.timestamp))
        this.overwrittenShatteredDefenseBuffs = this.overwrittenShatteredDefenseBuffs + 1;
  }

  statistic() {

    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.SHATTERED_DEFENSES_BUFF.id} />}
        value={`${formatNumber(this.overwrittenShatteredDefenseBuffs + this.wastedShatteredDefenseBufs)}`}
        label='Unused Shattered Defenses procs'
        tooltip={`Out of ${formatNumber(this.overwrittenShatteredDefenseBuffs + this.wastedShatteredDefenseBufs)} unused Shattered Defenses procs ${formatNumber(this.overwrittenShatteredDefenseBuffs)} were overwritten and ${formatNumber(this.wastedShatteredDefenseBufs)} were not used at all.`}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(5);
}

export default ShatteredDefenses;
