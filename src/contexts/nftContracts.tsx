import { useProvider } from "@starknet-react/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import abi from "../abis/mintPuppyABI.json";
import { Contract } from "starknet";
import { nftContractAddress, rpcURL } from "../config";

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

  async function makeRequest(entryPointSelector: string, calldata: string[]) {
    console.log(
      `{"method":"starknet_call","jsonrpc":"2.0","params":{"request":{"contract_address":"${nftContractAddress}","entry_point_selector":"${entryPointSelector}","calldata":${JSON.stringify(
        calldata
      )}},"block_id":"pending"},"id":0}`
    );

    try {
      const data = await fetch(rpcURL, {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
        },
        referrer: "https://testnet.starkscan.co/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `{"method":"starknet_call","jsonrpc":"2.0","params":{"request":{"contract_address":"${nftContractAddress}","entry_point_selector":"${entryPointSelector}","calldata":${JSON.stringify(
          calldata
        )}},"block_id":"pending"},"id":0}`,
        method: "POST",
        mode: "cors",
        credentials: "omit",
      });

      return await data.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }

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
        // const e = await makeRequest(
        //   "0x1e37c7ed6a06a994c20fbd2f42bf29a9f5d6c8e3fc27051e5e2335817ef219a",
        //   [tokenId.toString(), "0"]
        // );
        // console.log(e);

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
  }, [contract]);

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
