import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  padding-top: 164px;
`;

const PuppiesButton = styled.button`
    border-radius: 50px;
    background: #E19143;
    border: none;
    padding: 12px 54px;
    color: #FFF;
    font-family: sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;
export default function Home() {
  const history = useHistory();

  const handleGetPuppies = useCallback(() => {
    history.push("/mint");
  }, [history]);
  return (
    <Wrapper>
      <PuppiesButton onClick={() => handleGetPuppies()}>Get Puppies</PuppiesButton>
    </Wrapper>
  );
}
