import React, {useState, FC} from 'react'
import {returnForm} from './functions'
import {View, Text} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {ItemProps} from './interface'
import {Input, MultipleElement} from './elements'

const FormItem: FC<ItemProps> = ({
  data,
  values,
  returnData,
  setData,
  form,
  index: indexItem,
  length,
}: any) => {
  const {colors} = useTheme()
  const [validate, setValidate] = useState(!!values.defaultValue)
  const {element, element_array, render: mainRender, label: mainLabel} = values

  const onChange = (val: any) =>
    returnData(returnForm(val, form, values.name, data, setData, setValidate))

  values.placeholderTextColor = values.placeholderTextColor
    ? values.placeholderTextColor
    : 'white'

  values.style = values.style
    ? {...styles.input, ...values.style}
    : styles.input

  values.style.color = !validate ? colors.negative : colors.typography
  const Label = mainLabel ? (
    <Text
      style={
        values.labelStyle
          ? {...styles.label, ...values.labelStyle}
          : styles.label
      }>
      {mainLabel}
    </Text>
  ) : null

  return (
    <>
      {element === 'multiple' ? (
        <View style={styles.multipleBox}>
          {Label}
          <View style={styles.notOverflow}>
            {element_array?.map((item: any, index: any) => (
              <MultipleElement
                item={item}
                key={index}
                returnData={returnData}
                form={form}
                data={data}
                setData={setData}
                length={element_array?.length}
              />
            ))}
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.inputContainer,
            indexItem === length - 1 && styles.noMargin,
          ]}>
          {Label}
          <View style={styles[element]}>
            <Input
              element={element}
              mainRender={mainRender}
              values={values}
              onChange={onChange}
            />
          </View>
        </View>
      )}
    </>
  )
}

export default FormItem
