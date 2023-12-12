import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  nav: {
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  navItem: {
    width: '25%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
