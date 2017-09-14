import React from 'react';

import SPELLS from 'common/SPELLS';
import Icon from 'common/Icon';

import { formatPercentage } from 'common/format';

import CoreAlwaysBeCasting from 'Parser/Core/Modules/AlwaysBeCasting';

import StatisticBox, { STATISTIC_ORDER } from 'Main/StatisticBox';

class AlwaysBeCasting extends CoreAlwaysBeCasting {

  static ABILITIES_ON_GCD = [

    // Abilities
    SPELLS.MORTAL_STRIKE.id,
    SPELLS.COLOSSUS_SMASH.id,
    SPELLS.BLADESTORM.id,
    SPELLS.SLAM.id,
    SPELLS.CHARGE.id,
    SPELLS.BATTLE_CRY.id,
    SPELLS.WARBREAKER.id,
  ];

  suggestions(when) {
    const deadTimePercentage = this.totalTimeWasted / this.owner.fightDuration;

    when(deadTimePercentage).isGreaterThan(0.1)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest('Your dead GCD time can be improved. Try to Always Be Casting (ABC); try to reduce the delay between casting spells.')
          .icon('spell_mage_altertime')
          .actual(`${formatPercentage(actual)}% dead GCD time`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`)
          .regular(recommended + 0.05).major(recommended + 0.15);
      });
  }
  statistic() {

    const deadTimePercentage = this.totalTimeWasted / this.owner.fightDuration;

    return (
      <StatisticBox
        icon={<Icon icon="spell_mage_altertime" alt="Dead GDC time" />}
        value={`${formatPercentage(deadTimePercentage)} %`}
        label="Dead GCD time"
        tooltip={'Dead GCD time is available casting time not used. This can be caused by latency or not casting anything (e.g. due to movement/stunned), etc.'}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(4);
}

export default AlwaysBeCasting;
