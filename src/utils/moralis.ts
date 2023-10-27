import { EvmChain } from '@moralisweb3/common-evm-utils';
import Moralis from 'moralis';

export const getBalancesMoralis = async (address: any, chain: any) => {
  try {
    await Moralis.start({ apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk2MDYxODNiLTJjY2MtNDEzNi1iNDZjLTM1MzA3ZDM4MWFkOSIsIm9yZ0lkIjoiMzYyMzk4IiwidXNlcklkIjoiMzcyNDUyIiwidHlwZUlkIjoiNDljZjg4MzAtZDhlNC00M2YzLWJhZmMtYWUwOTIyOGZjNTAwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTgzOTQ2NDgsImV4cCI6NDg1NDE1NDY0OH0.7JAYwASXpRWH52YqhhBFm7lDC3SUoB6SorcCqXz0Ywo' });
  } catch (error) {

  }

  const chains: any = {
    1: EvmChain.ETHEREUM,
    137: EvmChain.POLYGON,
    56: EvmChain.BSC,
  }

  const response = await Moralis.EvmApi?.token?.getWalletTokenBalances({ address, chain: chains[chain] || EvmChain.ETHEREUM })
  const responseNative = await Moralis.EvmApi?.balance?.getNativeBalance({ address, chain: chains[chain] || EvmChain.ETHEREUM })
  console.log(responseNative.result)
  return [...response.result, responseNative.result]

}