import React, {useState, FC} from 'react'
import {returnForm} from '../../functions'
import {View, Text} from 'react-native'
import {styles} from './styles'
import Input from '../Input'
import {useTheme} from '@react-navigation/native'
import {Props} from './interface'

const MultipleElement: FC<Props> = ({
  item,
  returnData,
  form,
  data,
  setData,
  length,
}) => {
  const [validateMultiple, setValidateMultiple] = useState(false)
  const {element: elementMulti, label, render} = item

  const {colors} = useTheme()

  const styleInput = elementMulti === 'select' ? styles.select : styles.input
  item.style = item.style ? {...styleInput, ...item.style} : styles.input
  item.style.color = !validateMultiple ? styles.error.color : styles.input.color

  const onChangeMultiple = (val: any) => {
    returnData(
      returnForm(val, form, item.name, data, setData, setValidateMultiple),
    )
  }

  return (
    <View
      style={[
        styles.rootMultiple,
        {borderBottomColor: colors.primary, width: `${100 / length}%`},
      ]}>
      {label ? <Text>{label}</Text> : null}
      <Input
        element={elementMulti}
        mainRender={render}
        values={item}
        onChange={onChangeMultiple}
      />
    </View>
  )
}

export default MultipleElement
