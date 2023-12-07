import styled from "styled-components";
import love from "../../assets/love.png";
import entertain from "../../assets/entertain.png";
import feed from "../../assets/feed.png";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: white;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const DailyQuestButtonsWrapper = styled.div`
  display: flex;
`;
const LoveButton = styled.div`
  color: #fff;
  font-size: 24px;
`;
const EntertainButton = styled.div`
  color: #fff;
  font-size: 24px;
`;
const FeedButton = styled.div`
  color: #fff;
  font-size: 24px;
`;
const LoveButtonWrapper = styled.button`
  border-radius: 20px;
  background: #ef4358;
  border: none;
  padding: 20px 56px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 24px;
`;
const EntertainButtonWrapper = styled.button`
  border-radius: 20px;
  background: #43ef5f;
  border: none;
  padding: 20px 56px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 24px;
`;
const FeedButtonWrapper = styled.button`
  border-radius: 20px;
  background: #43e4ef;
  border: none;
  padding: 20px 56px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 24px;
`;

export default function DailyQuest() {
  const history = useHistory();

  const hanldeLove = () => {
    history.push("/dailyQuests/love");
  };
  const hanldeEntertain = () => {
    history.push("/dailyQuests/entertain");
  };
  const hanldeFeed = () => {
    history.push("/dailyQuests/feed");
  };
  return (
    <Wrapper>
      <DailyQuestButtonsWrapper>
        <LoveButtonWrapper onClick={hanldeLove}>
          <img src={love} height={"90px"} width={"80px"}></img>
          <LoveButton>Love your pet</LoveButton>
        </LoveButtonWrapper>
        <EntertainButtonWrapper onClick={hanldeEntertain}>
          <img src={entertain} height={"90px"} width={"80px"}></img>

          <EntertainButton>Entertain your pet</EntertainButton>
        </EntertainButtonWrapper>
        <FeedButtonWrapper onClick={hanldeFeed}>
          <img src={feed} height={"90px"} width={"80px"}></img>

          <FeedButton>Feed your pet</FeedButton>
        </FeedButtonWrapper>
      </DailyQuestButtonsWrapper>
    </Wrapper>
  );
}
