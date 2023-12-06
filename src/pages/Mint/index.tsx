import styled from "styled-components";
import minting from '../../assets/minting.png'
import { useAccountDetails } from "../../hooks/starknet-react";
import { useContract, useContractWrite, useNetwork } from "@starknet-react/core";
import { useMemo } from "react";
import mintPuppyABI from '../../abis/mintPuppyABI.json'

const Wrapper = styled.div`
  background: #cb6d2b;
  width: 100%;
  height: 100vh;
`;
const MintingText = styled.div`
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
const MintCard = styled.div`
display:flex;
margin: auto;
border-radius: 20px;
background: #EAA778;
width: 800px;
padding: 56px 56px 0px 56px;
height: 280px;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
backdrop-filter: blur(2px);
`
const MintCardWrapper = styled.div`
    display: flex;
`
const MintingDetails = styled.div`
`
const PublicMinting = styled.div`
color: #FFF;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 154.212%; 
margin-top: 56px;
`
const MintButton = styled.button`
border-radius: 50px;
background: #22B11F;
border: none;
padding: 12px 78px;
margin-top: 24px;
color: white;
text-transform: uppercase;
`
export default function Mint() {

    const { address } = useAccountDetails();
	const { chain } = useNetwork();

	const { contract } = useContract({
		// abi: mintPuppyABI,
		address: chain.nativeCurrency.address,
	});

	const calls = useMemo(() => {
		if (!address || !contract) return [];
		return contract.populateTransaction["transfer"]!(address, { low: 1, high: 0 });
	}, [contract, address]);

	const {
		writeAsync,
		data,
		isPending,
	} = useContractWrite({
		calls,
	});  
   
  const mintPuppy = () => {
   
  }  
  return (
    <Wrapper>
      <MintingText>Minting</MintingText>
      <MintCardWrapper>
      <MintCard>
        <img src={minting} height={"400px"} width={'400px'}></img>
        <MintingDetails>
            <PublicMinting>Public Minting</PublicMinting>
            <div>You can mint your NFTs below</div>
            <div>Price: 0.055ETH</div>
            <MintButton onClick={() => mintPuppy()}>Mint</MintButton>
        </MintingDetails>
      </MintCard>
      </MintCardWrapper>
    </Wrapper>
  );
}
