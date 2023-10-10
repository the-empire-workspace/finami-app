/**
 * @format
 */

import 'react-native'
import React from 'react'
import App from '../App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<App />)
})

jest.mock('react-native/Libraries/LogBox/Data/LogBoxData', () => {
  return {
    isLogBoxErrorMessage: (...args: any) => {
      console.log(args)
      return ''
    },
    reportLogBoxError: (...args: any) => {
      console.log(args)
      return ''
    },
    addIgnorePatterns: (...args: any) => {
      console.log(args)
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

jest.mock('react-native-chart-kit', () => {
  return {}
})

jest.mock('react-native-sqlite-storage', () => {
  return {
    openDatabase: () => {
      return {}
    },
    DEBUG: () => {},
  }
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
