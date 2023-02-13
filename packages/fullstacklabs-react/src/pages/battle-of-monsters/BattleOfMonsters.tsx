import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  const handleStartBattleClick = () => {
    // Fight!
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      <BattleSection>
        <MonsterBattleCard
          title={selectedMonster?.name || 'Player'}
        ></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}
        >
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard title="Computer"></MonsterBattleCard>
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
