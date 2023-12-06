import { StarknetProvider } from "./components/starknet-provider";
import { HashRouter } from "react-router-dom";
import Layout from "./Layout";
import { NFTContextProvider } from "./contexts/nftContracts";

export function App() {
  return (
    <StarknetProvider>
      <NFTContextProvider>
        <HashRouter>
          <Layout />
        </HashRouter>
      </NFTContextProvider>
    </StarknetProvider>
  );
}
