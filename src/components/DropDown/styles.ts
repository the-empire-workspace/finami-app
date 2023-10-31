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
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  show: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    height: 50,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  buttonItems: {
    width: '100%',
    padding: 17,
    marginVertical: 5,
    borderColor: 'red',
    borderWidth: 1,
  },
  infoBox: {
    textAlign: 'center',
    alignItems: 'center',
    width: '33.33%',
  },
  lastMovementsContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    left: 40,
    marginVertical: 'auto',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
export {Typos}
