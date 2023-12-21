import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  currencyItem: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  questionContainer: {
    width: '100%',
    gap: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelection: {
    paddingHorizontal: 19,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 17,
    borderRadius: 5,
    borderWidth: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  fileSelection: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
