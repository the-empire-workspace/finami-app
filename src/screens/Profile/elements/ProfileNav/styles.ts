import { StyleSheet } from 'react-native'
import { Typos, Elements } from 'theme'

const localStyles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectionList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: '#D9D9D9',
    borderTopWidth: 1,
  },
  downSelection: {
    borderBottomWidth: 1
  },
  image: {
    width: 95,
    height: 44,
    marginLeft: 5
  },
  poweredByContainer: {
    flexDirection: 'row',
    alignItems: 'center',	
    justifyContent: 'center',
    marginTop: 10
  }
})

export const styles = { ...localStyles, ...Typos, ...Elements }