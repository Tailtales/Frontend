import styled from "styled-components";
import Puppy from "../../assets/Puppy.png";

const Wrapper = styled.div`
  background: #43e4ef;
  width: 100%;
  height: 100vh;
`;
const RiteText = styled.div`
  color: #fff;
  font-family: sans-serif;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 74px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  margin: 48px;
`;

const PuppyWrapper = styled.div`
  display: flex;
`;

const PuppyImageWrapper = styled.div`
  display: grid;
`;

export default function LastRites() {
  const puppies = [{ nft_id: "1" }, { nft_id: "2" }, { nft_id: "3" }];
  return (
    <Wrapper>
      <RiteText>The Last Rites</RiteText>
      <PuppyWrapper>
        {puppies.map((puppy) => {
          return (
            <PuppyImageWrapper key={puppy.nft_id}>
              <img
                src={Puppy}
                height={"200px"}
                width={"180px"}
                style={{ margin: "12px" }}
              ></img>
              <button>Bury</button>
            </PuppyImageWrapper>
          );
        })}
      </PuppyWrapper>
    </Wrapper>
  );
}
