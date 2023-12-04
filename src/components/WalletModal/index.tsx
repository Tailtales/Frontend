import { useConnect } from "@starknet-react/core";
import Modal from "../Modal";

export default function WalletModal(props: { isWalletModalOpen: boolean; toggleWalletModal: () => void; }) {
  const { connect, connectors } = useConnect();
  return (
    <Modal isOpen={props.isWalletModalOpen} onDismiss={props.toggleWalletModal} minHeight={false} maxHeight={90}>
      <ul>
      {connectors.map((connector) => (
        <li key={connector.id}>
          <button onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        </li>
      ))}
    </ul>
    </Modal>
  );
}