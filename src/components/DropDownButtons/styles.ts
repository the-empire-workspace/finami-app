import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

const localStyles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 10,
  },
  hidden: {
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  show: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  buttonItems: {
    width: '100%',
    padding: 17,
    marginVertical: 5,
    textAlign: 'center',
    borderRadius: 5,
  },
  infoBox: {
    textAlign: 'center',
    alignItems: 'center',
    width: '33.33%',
  },
  svg: {
    position: 'absolute',
    left: 40,
    marginVertical: 'auto',
  },
  buttonAlone: {
    width: 24,
    height: 24,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
export {Typos}
