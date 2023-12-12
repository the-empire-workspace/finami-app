import {StyleSheet} from 'react-native'

const elements = StyleSheet.create({
  button: {
    paddingVertical: 17,
    paddingHorizontal: 20,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowColor: '#000',
    borderRadius: 5,
    width: '100%',
  },
  modal: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  line: {
    height: 1,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
  },
})

export default elements
