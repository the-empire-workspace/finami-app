import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  currencyItem: {
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 150,
    borderColor: '#F0F0F2',
    borderWidth: 2,
    borderRadius: 5,
    minHeight: 112,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    padding: 10,
    paddingTop: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  action: {
    marginHorizontal: 10,
  },
  currencyAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
