import { StyleSheet } from 'react-native'

export const styles: any = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: '100%',
  },
  rootMultiple: {
    borderBottomWidth: 1,
  },
  select: {
    zIndex: 2,
    fontSize: 14,
    color: 'white',
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    fontFamily: 'Poppins',
    letterSpacing: 0.14,
    marginBottom: 16,
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
