import {EvmChain} from '@moralisweb3/common-evm-utils'
import Moralis from 'moralis'
import Config from 'react-native-config'

const chains: any = {
  1: EvmChain.ETHEREUM,
  137: EvmChain.POLYGON,
  56: EvmChain.BSC,
}

export const getBalancesMoralis = async (address: any, chain: any) => {
  try {
    await Moralis.start({
      apiKey: Config.MORALIS_API_KEY,
    })
  } catch (error) {
    console.log(error, 'an error happend get balances moralis')
  }

  const selectChain = chains[chain] || EvmChain.ETHEREUM

  const response = await Moralis.EvmApi?.token?.getWalletTokenBalances({
    address,
    chain: selectChain,
  })
  const responseNative = await Moralis.EvmApi?.balance?.getNativeBalance({
    address,
    chain: selectChain,
  })
  return [
    ...response.result,
    {value: responseNative.result?.balance?.ether, token: selectChain.currency},
  ]
}

export const getNetworkCurrency = (chain: any) => {
  const selectChain = chains[chain] || EvmChain.ETHEREUM
  return selectChain.currency
}
