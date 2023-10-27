import { createPublicClient, http } from 'viem'
import { mainnet, polygon, bsc } from 'wagmi/chains'

export const chainConnection = (chain: any) => {
  const selectChain: any = {
    1: mainnet,
    137: polygon,
    56: bsc,
  }

  const client = createPublicClient({ chain: selectChain[chain], transport: http() })
  return client
}