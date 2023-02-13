import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title }) => {
  return (
    <BattleMonsterCard centralized>
      <BattleMonsterTitle>{title!}</BattleMonsterTitle>
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
