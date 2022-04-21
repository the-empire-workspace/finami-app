import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: '100%',
  },
  rootMultiple: {
    borderBottomWidth: 1,
  },
  input: {
    zIndex: 2,
    fontSize: 16,
    color: 'white',
    width: '100%',
  },
  select: {
    zIndex: 2,
    fontSize: 16,
    color: 'white',
    width: '100%',
  },
  multipleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
  },
})
