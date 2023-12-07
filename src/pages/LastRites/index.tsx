import styled from "styled-components";
import Puppy from "../../assets/Puppy.png";
import { useNFTContext } from "../../contexts/nftContracts";
import { useAccountDetails } from "../../hooks/starknet-react";
import { useContractWrite } from "@starknet-react/core";
import { useEffect, useMemo, useState } from "react";

const Wrapper = styled.div`
  background: #43e4ef;
  width: 100%;
  height: 100%;
  min-height: 100vh;
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
  flex-direction: row;
  flex-wrap: wrap;
`;

const PuppyImageWrapper = styled.div`
  display: grid;
`;
const ButtonBury = styled.button`
  border: none;
  border-radius: 50px;
  background-color: red;
  color: white;
  padding: 12px;
  cursor: pointer;
`;

export default function LastRites() {
  const { nfts, refresh, contract } = useNFTContext();
  const { address } = useAccountDetails();
  const [selectedPuppy, setSelectedPuppy] = useState<string>();

  const calls = useMemo(() => {
    if (!address || !contract || !selectedPuppy) return [];
    return contract.populateTransaction["bury"]!({
      low: selectedPuppy,
      high: 0,
    });
  }, [contract, address, selectedPuppy]);

  const { writeAsync } = useContractWrite({
    calls,
  });

  useEffect(() => {
    if (selectedPuppy) {
      writeAsync().then((tx) => {
        if (tx.transaction_hash) {
          refresh();
          alert(`Congratulations you have won ${Math.random() / 1000} ethers`);
        }
      });
    }
  }, [refresh, selectedPuppy, writeAsync]);

  const buryPuppy = (id: string) => {
    setSelectedPuppy(id);
  };
  return (
    <Wrapper>
      <RiteText>The Last Rites</RiteText>
      <PuppyWrapper>
        {nfts.map((puppy) => {
          if (!puppy.isAlive) {
            return (
              <PuppyImageWrapper key={puppy.id}>
                <img
                  src={Puppy}
                  height={"200px"}
                  width={"180px"}
                  style={{ margin: "12px" }}
                ></img>
                <ButtonBury onClick={() => buryPuppy(puppy.id)}>
                  Bury
                </ButtonBury>
              </PuppyImageWrapper>
            );
          }
        })}
      </PuppyWrapper>
    </Wrapper>
  );
}
