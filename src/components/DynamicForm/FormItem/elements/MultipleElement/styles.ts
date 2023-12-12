import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: '100%',
  },
  rootMultiple: {
    marginBottom: 0,
  },
  input: {
    zIndex: 2,
    fontSize: 16,
    color: 'white',
    width: '100%',
    marginBottom: 0,
    borderWidth: 0,
  },
  select: {
    zIndex: 2,
    fontSize: 16,
    color: 'white',
    width: '100%',
    marginBottom: 0,
  },
  error: {
    color: 'red',
  },
  label: {
    position: 'absolute',
    color: 'white',
    top: -15,
    left: -5,
    opacity: 1,
    padding: 5,
    zIndex: 3,
  },
})
