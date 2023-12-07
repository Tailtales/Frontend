import { useState } from "react";
import WalletModal from "../WalletModal";
import { useAccountDetails } from "../../hooks/starknet-react";
import { useDisconnect } from "@starknet-react/core";
import styled from "styled-components";

import wallet from "../../assets/wallet.png";

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ConnectWallet = styled.button`
  font-family: sans-serif;
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  background: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 24px;
`;

export default function Web3Status() {
  const [isWalletModalOpen, toggleWalletModal] = useState(false);
  const { isConnected, address } = useAccountDetails();
  const addressShort = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isWalletModalOpen && (
        <WalletModal
          isWalletModalOpen={isWalletModalOpen}
          toggleWalletModal={() => toggleWalletModal(false)}
        />
      )}
      {isConnected && address ? (
        <ConnectWallet onClick={() => disconnect()}>
          {isConnected && addressShort}
        </ConnectWallet>
      ) : (
        <ConnectWalletWrapper onClick={() => toggleWalletModal(true)}>
          <img
            height={"38px"}
            width={"44px"}
            style={{ marginLeft: "24px" }}
            src={wallet}
            alt="logo"
          />
          <ConnectWallet>Connect</ConnectWallet>
        </ConnectWalletWrapper>
      )}
    </div>
  );
}
