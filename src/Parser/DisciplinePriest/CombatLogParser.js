import React from 'react';

import MainCombatLogParser from 'Parser/Core/CombatLogParser';
import ParseResults from 'Parser/Core/ParseResults';
import getCastEfficiency from 'Parser/Core/getCastEfficiency';
import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import SpellIcon from 'common/SpellIcon';
import ITEMS from 'common/ITEMS';
import ItemLink from 'common/ItemLink';
import ItemIcon from 'common/ItemIcon';

import StatisticBox from 'Main/StatisticBox';
import SuggestionsTab from 'Main/SuggestionsTab';
import TalentsTab from 'Main/TalentsTab';
import CastEfficiencyTab from 'Main/CastEfficiencyTab';
import ManaTab from 'Main/ManaTab';

import AbilityTracker from './Modules/Core/AbilityTracker';

import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';

import DrapeOfShame from './Modules/Legendaries/DrapeOfShame';
import Velens from './Modules/Legendaries/Velens';
import Prydaz from './Modules/Legendaries/Prydaz';

import CPM_ABILITIES, { SPELL_CATEGORY } from './CPM_ABILITIES';

function formatThousands(number) {
  return (Math.round(number || 0) + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function formatNumber(number) {
  if (number > 1000000) {
    return `${(number / 1000000).toFixed(2)}m`;
  }
  if (number > 10000) {
    return `${Math.round(number / 1000)}k`;
  }
  return formatThousands(number);
}
function getRawHealing(ability) {
  return ability.healingEffective + ability.healingAbsorbed + ability.healingOverheal;
}
function getOverhealingPercentage(ability) {
  return ability.healingOverheal / getRawHealing(ability);
}
function getIssueImportance(value, regular, major, higherIsWorse = false) {
  if (higherIsWorse ? value > major : value < major) {
    return ISSUE_IMPORTANCE.MAJOR;
  }
  if (higherIsWorse ? value > regular : value < regular) {
    return ISSUE_IMPORTANCE.REGULAR;
  }
  return ISSUE_IMPORTANCE.MINOR;
}
function formatPercentage(percentage) {
  return (Math.round((percentage || 0) * 10000) / 100).toFixed(2);
}

class CombatLogParser extends MainCombatLogParser {
  static specModules = {
    // Override the ability tracker so we also get stats for IoL and beacon healing
    abilityTracker: AbilityTracker,

    alwaysBeCasting: AlwaysBeCasting,

    // Legendaries:
    drapeOfShame: DrapeOfShame,
    velens: Velens,
    prydaz: Prydaz,
  };

  generateResults() {
    const results = new ParseResults();

    const fightDuration = this.fightDuration;

    const abilityTracker = this.modules.abilityTracker;
    const getAbility = spellId => abilityTracker.getAbility(spellId);

    const penance = getAbility(SPELLS.PENANCE.id);

    const missedPenanceTicks = (this.modules.alwaysBeCasting.truePenanceCasts * 4) - penance.casts;
    const deadTimePercentage = this.modules.alwaysBeCasting.totalTimeWasted / fightDuration;
    const velensHealingPercentage = this.modules.velens.healing / this.totalHealing;
    const prydazHealingPercentage = this.modules.prydaz.healing / this.totalHealing;
    const drapeOfShameHealingPercentage = this.modules.drapeOfShame.healing / this.totalHealing;

    if (deadTimePercentage > 0.2) {
      results.addIssue({
        issue: `Your dead GCD time can be improved. Try to Always Be Casting (ABC); when there's nothing to heal try to contribute some damage (${Math.round(deadTimePercentage * 100)}% dead GCD time).`,
        icon: 'spell_mage_altertime',
        importance: getIssueImportance(deadTimePercentage, 0.35, 0.4, true),
      });
    }
    if (this.modules.velens.active && velensHealingPercentage < 0.045) {
      results.addIssue({
        issue: <span>Your usage of <ItemLink id={ITEMS.VELENS_FUTURE_SIGHT_BUFF.id} /> can be improved. Try to maximize the amount of casts during the buff or consider using an easier legendary ({(velensHealingPercentage * 100).toFixed(2)}% healing contributed).</span>,
        icon: ITEMS.VELENS_FUTURE_SIGHT_BUFF.icon,
        importance: getIssueImportance(velensHealingPercentage, 0.04, 0.03),
      });
    }

    const castEfficiencyCategories = SPELL_CATEGORY;
    const castEfficiency = getCastEfficiency(CPM_ABILITIES, this);
    castEfficiency.forEach((cpm) => {
      if (cpm.canBeImproved && !cpm.ability.noSuggestion) {
        results.addIssue({
          issue: <span>Try to cast <SpellLink id={cpm.ability.spell.id} /> more often ({cpm.casts}/{cpm.maxCasts} casts: {Math.round(cpm.castEfficiency * 100)}% cast efficiency). {cpm.ability.extraSuggestion || ''}</span>,
          icon: cpm.ability.spell.icon,
          importance: cpm.ability.importance || getIssueImportance(cpm.castEfficiency, cpm.recommendedCastEfficiency - 0.05, cpm.recommendedCastEfficiency - 0.15),
        });
      }
    });

    results.statistics = [
      <StatisticBox
        icon={(
          <img
            src="./img/healing.png"
            style={{ border: 0 }}
            alt="Healing"
          />)}
        value={`${formatNumber(this.totalHealing / fightDuration * 1000)} HPS`}
        label={(
          <dfn data-tip={`The total healing done recorded was ${formatThousands(this.totalHealing)}.`}>
            Healing done
          </dfn>
        )}
      />,
      <StatisticBox
        icon={(
          <img
            src="./img/icons/petbattle_health-down.jpg"
            alt="Dead GCD time"
          />
        )}
        value={`${formatPercentage(deadTimePercentage)} %`}
        label={(
          <dfn data-tip="Dead GCD time is available casting time not used. This can be caused by latency, cast interrupting, not casting anything (e.g. due to movement/stunned), etc.">
            Dead GCD time
          </dfn>
        )}
      />,
      <StatisticBox
        icon={<SpellIcon id={SPELLS.PENANCE.id} />}
        value={missedPenanceTicks}
        label={(
          <dfn data-tip={`Each Penance channel allows you to hit 4 times. You should try to let this channel finish as much as possible. You channeled Penance ${this.modules.alwaysBeCasting.truePenanceCasts} times.`}>
            Wasted Penance Bolts
          </dfn>
        )}
      />,
    ];

    results.items = [
      this.modules.drapeOfShame.active && {
        id: ITEMS.DRAPE_OF_SHAME.id,
        icon: <ItemIcon id={ITEMS.DRAPE_OF_SHAME.id} />,
        title: <ItemLink id={ITEMS.DRAPE_OF_SHAME.id} />,
        result: (
          <dfn data-tip="The actual effective healing contributed by the Drape of Shame equip effect.">
            {((drapeOfShameHealingPercentage * 100) || 0).toFixed(2)} % / {formatNumber(this.modules.drapeOfShame.healing / fightDuration * 1000)} HPS
          </dfn>
        ),
      },
      this.modules.velens.active && {
        id: ITEMS.VELENS_FUTURE_SIGHT_BUFF.id,
        icon: <ItemIcon id={ITEMS.VELENS_FUTURE_SIGHT_BUFF.id} />,
        title: <ItemLink id={ITEMS.VELENS_FUTURE_SIGHT_BUFF.id} />,
        result: (
          <dfn data-tip="The actual effective healing contributed by the Velen's Future Sight use effect.">
            {((velensHealingPercentage * 100) || 0).toFixed(2)} % / {formatNumber(this.modules.velens.healing / fightDuration * 1000)} HPS
          </dfn>
        ),
      },
      this.modules.prydaz.active && {
        id: ITEMS.PRYDAZ_XAVARICS_MAGNUM_OPUS.id,
        icon: <ItemIcon id={ITEMS.PRYDAZ_XAVARICS_MAGNUM_OPUS.id} />,
        title: <ItemLink id={ITEMS.PRYDAZ_XAVARICS_MAGNUM_OPUS.id} />,
        result: (
          <dfn data-tip="The actual effective healing contributed by the Prydaz, Xavaric's Magnum Opus equip effect.">
            {((prydazHealingPercentage * 100) || 0).toFixed(2)} % / {formatNumber(this.modules.prydaz.healing / fightDuration * 1000)} HPS
          </dfn>
        ),
      },
    ];

    results.tabs = [
      {
        title: 'Suggestions',
        url: 'suggestions',
        render: () => (
          <SuggestionsTab issues={results.issues} />
        ),
      },
      {
        title: 'Cast efficiency',
        url: 'cast-efficiency',
        render: () => (
          <CastEfficiencyTab
            categories={castEfficiencyCategories}
            abilities={castEfficiency}
          />
        ),
      },
      {
        title: 'Talents',
        url: 'talents',
        render: () => (
          <TalentsTab combatant={this.selectedCombatant} />
        ),
      },
      {
        title: 'Mana',
        url: 'mana',
        render: () => (
          <ManaTab
            reportCode={this.report.code}
            actorId={this.playerId}
            start={this.fight.start_time}
            end={this.fight.end_time}
          />
        ),
      },
    ];

    return results;
  }
}

export default CombatLogParser;