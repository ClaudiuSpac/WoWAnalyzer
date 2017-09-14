import React from 'react';

import Module from 'Parser/Core/Module';
import AbilityTracker from 'Parser/Core/Modules/AbilityTracker';
import Enemies from 'Parser/Core/Modules/Enemies';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';

import { formatPercentage } from 'common/format';
import { formatThousands } from 'common/format';
import { formatDuration } from 'common/format';
import StatisticBox, { STATISTIC_ORDER } from 'Main/StatisticBox';

class ColossusSmashUptime extends Module {
  static dependencies = {
    abilityTracker: AbilityTracker,
    enemies: Enemies,
  };

  statistic() {
    const colossusSmashUptime = this.enemies.getBuffUptime(SPELLS.COLOSSUS_SMASH_DEBUFF.id);
    const colossusSmashUptimePercentage = colossusSmashUptime / this.owner.fightDuration;

    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.COLOSSUS_SMASH_DEBUFF.id} />}
        value={`${formatPercentage(colossusSmashUptimePercentage)}%`}
        label='Colossus Smash Uptime'
        tooltip={`The Colossus Smash total uptime was ${formatDuration(colossusSmashUptime / 1000)}.`}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(9);
}

export default ColossusSmashUptime;
