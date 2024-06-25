import { StyleSheet } from 'react-native'
import { Typos, Elements } from '@theme'

const localStyles = StyleSheet.create({
  transactionItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginVertical: 2.5,
    position: 'relative',
    borderWidth: 1,
    minHeight: 65,
    overflow: 'hidden',
  },
  concept: {
    marginBottom: 5,
  },
  backgroundContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.5,
  },
  contentContainer: {
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  textBalance: {
    flexShrink: 1
  },
  fullOpacity: {
    opacity: 1,
  },
  noPadding: { paddingHorizontal: 0, paddingVertical: 0 },
  noPaddingAlt: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minHeight: 80,
  },
  textContent: {
    flex: 1,
  },
  textContentAmount: {
    alignItems: 'flex-end',
    gap: 5,
    flex: 0.5,
    paddingRight: 10
  },
})

export const styles = { ...localStyles, ...Typos, ...Elements }
