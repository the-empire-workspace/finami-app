import {StyleSheet} from 'react-native'
import {Typos, Elements} from '@theme'

export const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header:{
    width: '100%',
    minHeight:100,
    paddingTop: 34,
    paddingHorizontal: 20,
    paddingBottom: 25
  },
  headerTop:{
    flex:1,
    flexDirection: 'row',
    width: '100%',
    minHeight:60,
    paddingBottom:25
  },
  headerButton:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  input: {
    width: '100%',
  },
})

export const styles = {...localStyles, ...Typos, ...Elements}
