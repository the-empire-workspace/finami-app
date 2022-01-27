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
// __mocks__/react-native-appearance.js

jest.mock('react-native-appearance', () => {
  return {
    AppearanceProvider: ({ children }: any) => {
      return children
    },
    useColorScheme: () => {
      return
    },
  }
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
  }
})

jest.mock('react-native-date-picker', () => {
  return {}
})
