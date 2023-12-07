import styled from "styled-components";
import breeding from "../../assets/breeding.png";
import { useAccountDetails } from "../../hooks/starknet-react";
import { useContractWrite } from "@starknet-react/core";
import { useMemo, useState } from "react";
import { useNFTContext } from "../../contexts/nftContracts";
import Puppy from "../../assets/Puppy.png";

const Wrapper = styled.div`
  background: #cb6d2b;
  width: 100%;
  height: 100vh;
`;
const BreddingText = styled.div`
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
const BreedCard = styled.div`
  display: flex;
  margin: auto;
  border-radius: 20px;
  background: #eaa778;
  width: 800px;
  padding: 56px 56px 0px 56px;
  height: 280px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
`;
const BreedCardWrapper = styled.div`
  display: flex;
`;
const BreedingDetails = styled.div``;
const BreedingPuppies = styled.div`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 154.212%;
  margin-top: 56px;
`;

const BreedingNFTs = styled.div`
  display: flex;
`;

const BreedButton = styled.button`
  border-radius: 50px;
  background: #22b11f;
  border: none;
  padding: 12px 78px;
  margin-top: 24px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
`;

const PuppyImageWrapper = styled.div<{ isActive: any }>`
  display: grid;
  cursor: pointer;
  border: ${({ isActive }) => (isActive ? `2px solid black` : "none")};
`;

const PuppyWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Breeding() {
  const { address } = useAccountDetails();
  const [selectedPuppies, setSelectedPuppies] = useState<string[]>([]);
  // const [isPuppyActive, setIsPuppyActive] = useState<boolean>(false);
  const { contract, refresh } = useNFTContext();

  const calls = useMemo(() => {
    if (!address || !contract || selectedPuppies.length < 2) return [];
    return contract.populateTransaction["breed"]!(
      {
        low: selectedPuppies[0],
        high: 0,
      },
      {
        low: selectedPuppies[1],
        high: 0,
      }
    );
  }, [contract, address, selectedPuppies]);

  const { writeAsync } = useContractWrite({
    calls,
  });

  const breedPuppy = () => {
    writeAsync().then((tx) => {
      if (tx.transaction_hash) {
        refresh();
        alert(
          `Breeding is in process please wait for some time for the transaction to complete`
        );
      }
    });
  };

  const { nfts } = useNFTContext();
  const selectPuppiesForBreeding = (puppy: NFT) => {
    const puppies: string[] = [];
    if (selectedPuppies.length === 1) puppies.push(selectedPuppies[0]);
    else if (selectedPuppies.length >= 2) puppies.push(selectedPuppies[1]);
    puppies.push(puppy.id);
    setSelectedPuppies(puppies);
  };

  const checkIsPuppyActive = (puppy: NFT) => {
    if (selectedPuppies.length && selectedPuppies.includes(puppy.id)) {
      return true;
    }
    return false;
  };
  return (
    <Wrapper>
      <BreddingText>Breeding</BreddingText>
      <PuppyWrapper>
        {nfts.map((puppy) => {
          if (puppy.owner.toLowerCase() !== address?.toLowerCase()) return;
          if (puppy.isAlive) {
            return (
              <PuppyImageWrapper
                key={puppy.id}
                onClick={() => selectPuppiesForBreeding(puppy)}
                isActive={checkIsPuppyActive(puppy)}
              >
                <img
                  src={Puppy}
                  height={"200px"}
                  width={"180px"}
                  style={{ margin: "12px" }}
                ></img>
              </PuppyImageWrapper>
            );
          }
        })}
      </PuppyWrapper>

      <BreedCardWrapper>
        <BreedCard>
          <img src={breeding} height={"284px"} width={"400px"}></img>
          <BreedingDetails>
            <BreedingPuppies>
              Breed your puppies,to create a new NFT{" "}
            </BreedingPuppies>
            <BreedingNFTs></BreedingNFTs>
            <BreedButton onClick={() => breedPuppy()}>Breed</BreedButton>
          </BreedingDetails>
        </BreedCard>
      </BreedCardWrapper>
    </Wrapper>
  );
}
