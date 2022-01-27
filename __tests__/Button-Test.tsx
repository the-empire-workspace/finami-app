/**
 * @format
 */

import 'react-native'
import React from 'react'
import { Button } from '../src/components'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders Button Correctly', () => {
  renderer.create(
    <Button
      text="test"
      onPress={() => {
        console.log('test')
      }}
      disabled={false}
    />,
  )
})

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

jest.mock('react-native-date-picker', () => {
  return {}
})
