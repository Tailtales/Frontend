import { useConnect } from "@starknet-react/core";
import Modal from "../Modal";
import { MouseEvent } from "react";

export default function WalletModal(props: {
  isWalletModalOpen: boolean | undefined;
  toggleWalletModal: ((e: MouseEvent) => void) | undefined;
}) {
  const { connect, connectors } = useConnect();
  return (
    <Modal
      open={props.isWalletModalOpen}
      onCancel={props.toggleWalletModal}
      onOk={props.toggleWalletModal}
    >
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
