import React from 'react';

import CoreCombatLogParser from 'Parser/Core/CombatLogParser';

import SuggestionsTab from 'Main/SuggestionsTab';
import Tab from 'Main/Tab';
import Talents from 'Main/Talents';

import AlwaysBeCasting from './Modules/Core/AlwaysBeCasting';
import CastEfficiency from './Modules/Core/CastEfficiency';

import DamageDone from './Modules/Core/DamageDone';
import DamageTaken from './Modules/Core/DamageTaken';
import HealingDone from './Modules/Core/HealingDone';
import ColossusSmashUptime from './Modules/Core/ColossusSmashUptime';
import ShatteredDefenses from './Modules/Statistics/AbilityUsageIssues/ShatteredDefenses.js'

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // Core Statistics
    damageDone: DamageDone,
    damageTaken: DamageTaken,
    healingDone: HealingDone,

    // Features
    alwaysBeCasting: AlwaysBeCasting,
    castEfficiency: CastEfficiency,

    //SPELLS
    colossusSmashUptime: ColossusSmashUptime,
    shatteredDefenses: ShatteredDefenses,
  };

  generateResults() {
    const results = super.generateResults();

    results.tabs = [
      {
        title: 'Suggestions',
        url: 'suggestions',
        render: () => (
          <SuggestionsTab issues={results.issues} />
        ),
      },
      {
        title: 'Talents',
        url: 'talents',
        render: () => (
          <Tab title="Talents">
            <Talents combatant={this.modules.combatants.selected} />
          </Tab>
        ),
      },
      {
        title: 'Ability Usage',
        url: 'ability_usage',
        render: () => (
          <Tab title="Ability Usage">
            <Talents combatant={this.modules.combatants.selected} />
          </Tab>
        ),
      },
      ...results.tabs,
    ];

    return results;
  }
}

export default CombatLogParser;
