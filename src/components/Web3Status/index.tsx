import React, {useState} from "react"
import WalletModal from "../WalletModal"


export default function Web3Status() {
const [isWalletModalOpen, toggleWalletModal] = useState(false)
  return (
     <div>
         {isWalletModalOpen && <WalletModal isWalletModalOpen={isWalletModalOpen} toggleWalletModal={() => toggleWalletModal(false)}/> } 
        <button onClick={() => toggleWalletModal(true)}>Connect Wallet</button>
     </div>
  )
}
