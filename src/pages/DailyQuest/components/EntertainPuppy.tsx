import styled from "styled-components";
import Puppy from "../../../assets/Puppy.png";
import { useNFTContext } from "../../../contexts/nftContracts";
import { useAccountDetails } from "../../../hooks/starknet-react";
import { useEffect, useMemo, useState } from "react";
import { useContractWrite } from "@starknet-react/core";

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

const ButtonFeed = styled.button`
  border: none;
  border-radius: 50px;
  background-color: green;
  color: white;
  padding: 12px;
  cursor: pointer;
`;

export default function EntertainPuppy() {
  const [selectedPuppy, setSelectedPuppy] = useState<string>();
  const { nfts, refresh, contract } = useNFTContext();
  const { address } = useAccountDetails();

  const calls = useMemo(() => {
    if (!address || !contract || !selectedPuppy) return [];
    return contract.populateTransaction["pet"]!({
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
  }, [selectedPuppy]);

  const entertainPuppy = (id: string) => {
    setSelectedPuppy(id);
  };
  return (
    <Wrapper>
      <RiteText>Entertain your Puppy</RiteText>
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
                <ButtonFeed onClick={() => entertainPuppy(puppy.id)}>
                  Entertain
                </ButtonFeed>
              </PuppyImageWrapper>
            );
          }
        })}
      </PuppyWrapper>
    </Wrapper>
  );
}
