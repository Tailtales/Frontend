import { useAccount, useBalance, useConnect } from '@starknet-react/core'

export const useAccountDetails = () => {
  const { account, address, isConnected } = useAccount()
  return { account, address, isConnected }
}

export const useConnectors = () => {
  const { connect, connectors } = useConnect()
  return { connect, connectors }
}

export const useBalances = () => {
  const { address } = useAccount()
  const {
    data: balance,
  } = useBalance({
    address,
    watch: true,
  })

  return { balance }
}
