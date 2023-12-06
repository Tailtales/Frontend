import styled from "styled-components";
import Puppy from "../../../assets/Puppy.png";
import { useNFTContext } from "../../../contexts/nftContracts";
import { useAccountDetails } from "../../../hooks/starknet-react";
import { useEffect } from "react";

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

export default function LovePuppy() {
  const { address } = useAccountDetails();
  const { nfts, refresh } = useNFTContext();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Wrapper>
      <RiteText>Love your Puppy</RiteText>
      <PuppyWrapper>
        {nfts.map((puppy) => {
          if (puppy.owner.toLowerCase() !== address?.toLowerCase()) return;
          if (puppy.isAlive) {
            return (
              <PuppyImageWrapper key={puppy.id}>
                <img
                  src={Puppy}
                  height={"200px"}
                  width={"180px"}
                  style={{ margin: "12px" }}
                ></img>
                <button>Love</button>
              </PuppyImageWrapper>
            );
          }
        })}
      </PuppyWrapper>
    </Wrapper>
  );
}
