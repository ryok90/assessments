import { WinnerDisplayContainer, WinnerText } from './WinnerDisplay.styled';

type Props = {
  text: string;
};

const WinnerDisplay: React.FC<Props> = ({ text }) => (
  <WinnerDisplayContainer>
    <WinnerText>{text} wins!</WinnerText>
  </WinnerDisplayContainer>
);

export { WinnerDisplay };
