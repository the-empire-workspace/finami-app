import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  infoBox: {
    textAlign: 'center',
    alignItems: 'center',
    width: '33.33%',
    gap: 5,
    justifyContent: 'center',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
