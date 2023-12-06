import { useProvider } from "@starknet-react/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import abi from "../abis/mintPuppyABI.json";
import { Contract } from "starknet";
import { nftContractAddress } from "../config";

interface INFTContext {
  nfts: NFT[];
  contract: Contract | null;
  refresh: () => Promise<void>;
}

function toHex(bn: bigint) {
  return `0x${bn.toString(16)}`;
}

export const NFTContext = createContext<INFTContext>({} as INFTContext);

export function NFTContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nfts, setNFts] = useState<NFT[]>([]);
  const [contract, setContract] = useState<Contract | null>(null);
  const { provider } = useProvider();

  useEffect(() => {
    if (!provider) {
      setContract(null);
      return;
    }

    const contract = new Contract(abi, nftContractAddress, provider);

    setContract(contract);
  }, [provider]);

  useEffect(() => {
    if (!contract) {
      setNFts([]);
      return;
    }

    (async function () {
      if (!contract) {
        setNFts([]);
        return;
      }
      const totalNFTs = Number(await contract.max_token_id());

      const _nfts: NFT[] = [];
      for (let tokenId = 1; tokenId <= totalNFTs; tokenId++) {
        const exists = await contract.exists(tokenId);
        if (!exists) continue;

        _nfts.push({
          id: tokenId.toString(),
          randomSeed: toHex(await contract.token_uri(tokenId)),
          isAlive: await contract.is_alive(tokenId),
          owner: toHex(await contract.owner_of(tokenId)),
        });
      }

      setNFts(_nfts);
    })().catch((err) => console.error(err));
  }, []);

  async function refresh() {
    if (!contract) {
      setNFts([]);
      return;
    }
    const totalNFTs = Number(await contract.max_token_id());

    const _nfts: NFT[] = [];
    for (let tokenId = 1; tokenId <= totalNFTs; tokenId++) {
      const exists = await contract.exists(tokenId);
      if (!exists) continue;

      _nfts.push({
        id: tokenId.toString(),
        randomSeed: toHex(await contract.token_uri(tokenId)),
        isAlive: await contract.is_alive(tokenId),
        owner: toHex(await contract.owner_of(tokenId)),
      });
    }

    setNFts(_nfts);
  }

  return (
    <NFTContext.Provider value={{ nfts, contract, refresh }}>
      {children}
    </NFTContext.Provider>
  );
}

export const useNFTContext = () => useContext(NFTContext);
