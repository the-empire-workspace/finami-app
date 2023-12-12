import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 10,
    gap: 20,
  },
  buttonContainer: {
    width: '47%',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
