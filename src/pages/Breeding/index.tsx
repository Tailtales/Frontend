import styled from "styled-components";
import breeding from '../../assets/breeding.png'
import { Input } from 'antd';

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
const BreedCardWrapper = styled.div`
    display: flex;
`
const BreedingDetails = styled.div`
`
const BreedingPuppies = styled.div`
color: #FFF;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 154.212%; 
margin-top: 56px;
`

const BreedingNFTs = styled.div`
    display: flex;
`
export default function  Breeding() {
  return (
    <Wrapper>
      <BreddingText>Breeding</BreddingText>
      <BreedCardWrapper>
      <BreedCard>
        <img src={breeding} height={"284px"} width={'400px'}></img>
        <BreedingDetails>
            <BreedingPuppies>Breed your puppies,to create a new NFT </BreedingPuppies>
            <BreedingNFTs>
            <Input placeholder="Select marton id"></Input>
            <Input placeholder="Select sire id"></Input>
            </BreedingNFTs>
            <button>Breed</button>
        </BreedingDetails>
      </BreedCard>
      </BreedCardWrapper>
    </Wrapper>
  );
}
