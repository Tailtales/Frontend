import { StarknetProvider } from "./components/starknet-provider";
import { Provider } from 'react-redux'

import store from './state'


export function App() {
  return (
    <StarknetProvider>
      <Provider store={store}>
       <div>
        
       </div>
      </Provider>
    </StarknetProvider>
  );
}