import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    minHeight: 170,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    minHeight: 80,
    paddingTop: 34,
    paddingBottom: 25,
  },
  headerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  upperBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  downBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noItemBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noItemText: {
    fontSize: 40,
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
