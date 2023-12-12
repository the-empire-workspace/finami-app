import {StyleSheet} from 'react-native'

export const styles: any = StyleSheet.create({
  root: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
  },
  rootMultiple: {
    borderWidth: 1,
  },
  input: {
    zIndex: 2,
    fontSize: 14,
    color: 'white',
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontFamily: 'Poppins',
    letterSpacing: 0.14,
    marginBottom: 16,
  },
  select: {
    zIndex: 2,
    fontSize: 14,
    color: 'white',
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontFamily: 'Poppins',
    letterSpacing: 0.14,
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
