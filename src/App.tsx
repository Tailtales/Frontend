import { StarknetProvider } from "./components/starknet-provider";
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import store from './state'
import Layout from "./Layout";


export function App() {
  return (
    <StarknetProvider>
      {/* <Provider store={store}> */}
        <HashRouter>
          <Layout/>
        </HashRouter>
      {/* </Provider> */}
    </StarknetProvider>
  );
}