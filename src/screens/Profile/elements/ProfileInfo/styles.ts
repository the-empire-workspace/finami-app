import {StyleSheet} from 'react-native'
import {Typos, Elements} from 'theme'

const localStyles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 23,
    paddingHorizontal: 20,
    position: 'relative',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  text: {
    marginRight: 5,
  },
  CurrencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  currency: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 46,
    height: 46,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    border: 1,
    borderColor: 'black',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
