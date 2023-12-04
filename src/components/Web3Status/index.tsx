import React, { useState } from "react";
import WalletModal from "../WalletModal";
import { useAccountDetails } from "../../hooks/starknet-react";
import { useDisconnect } from "@starknet-react/core";

export default function Web3Status() {
  const [isWalletModalOpen, toggleWalletModal] = useState(false);
  const { isConnected, address } = useAccountDetails();
  const addressShort = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected && addressShort}
      {isWalletModalOpen && (
        <WalletModal
          isWalletModalOpen={isWalletModalOpen}
          toggleWalletModal={() => toggleWalletModal(false)}
        />
      )}
      {isConnected && address ? (
        <button onClick={() => disconnect()}>Diconnect Wallet</button>
      ) : (
        <button onClick={() => toggleWalletModal(true)}>Connect Wallet</button>
      )}
    </div>
  );
}
