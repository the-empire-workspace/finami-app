import React, {useState, FC} from 'react'
import {returnForm} from '../../functions'
import {View} from 'react-native'
import {styles} from './styles'
import Input from '../Input'
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
  const {element: elementMulti, render} = item

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
        {width: `${100 / length}%`},
        item?.elementStyle || {},
      ]}>
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
