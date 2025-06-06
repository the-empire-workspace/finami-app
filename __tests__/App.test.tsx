/**
 * @format
 */

import 'react-native'
import React from 'react'

import App from '../App'
// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<App />)
})

jest.mock('react-native/Libraries/LogBox/Data/LogBoxData', () => {
  return {
    isLogBoxErrorMessage: (...args: any) => {
      return ''
    },
    reportLogBoxError: (...args: any) => {
      return ''
    },
    addIgnorePatterns: (...args: any) => {
      return ''
    },
  }
})

jest.mock('@notifee/react-native', () =>
  require('@notifee/react-native/jest-mock'),
)

jest.mock('react-native-date-picker', () => {
  return {}
})

jest.mock('@react-navigation/drawer', () => {
  const addIgnorePatterns = () => {}
  const LogBoxData = {
    addIgnorePatterns,
  }
  const createDrawerNavigator = () => {}
  return {
    LogBoxData,
    createDrawerNavigator,
  }
})

jest.mock('react-native-sqlite-storage', () => {
  return {
    openDatabase: () => {},
    DEBUG: () => {},
  }
})

jest.mock('@web3modal/wagmi-react-native', () => {
  return {
    createWeb3Modal: () => {},
    defaultWagmiConfig: () => {},
    Web3Modal: () => {},
  }
})

jest.mock('wagmi', () => {
  return {
    WagmiConfig: () => {},
  }
})

jest.mock('wagmi/chains', () => {
  return {
    mainnet: '',
    polygon: '',
    arbitrum: '',
  }
})

jest.mock('react-native-localize', () => {
  return {
    findBestLanguageTag: () => {},
  }
})

jest.mock('react-native-fs', () => {
  return {
    readFile: () => {},
  }
})

jest.mock('react-native-file-viewer', () => {
  return {}
})
