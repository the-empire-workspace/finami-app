import React, { useState, FC } from 'react'
import { View } from 'react-native'
import FormItem from './FormItem'
import { Props } from './interface'
import Structure from './structure'

const DynamicForm: FC<Props> = ({ formData, returnData }) => {
  const [data, setData]: any = useState({})

  const form = formData.map((value: any) => {
    const { element } = value

    if (element !== 'multiple')
      if (
        !(value.name in data) ||
        (value.defaultValue !== data[value.name][0] &&
          data[value.name][0] === '')
      )
        data[value.name] = [value.defaultValue, false]

    value.element_array?.map((array_element: any) => {
      if (
        !(array_element.name in data) ||
        (array_element.defaultValue !== data[array_element.name][0] &&
          data[array_element.name][0] === '')
      )
        data[array_element.name] = [array_element.defaultValue, false]
    })

    if (element) value.render = Structure[element].render

    return { ...Structure[element], ...value }
  })

  return (
    <View>
      {form.map((values: any, index: any) => (
        <FormItem
          data={data}
          form={form}
          values={values}
          returnData={returnData}
          setData={setData}
          key={index}
        />
      ))}
    </View>
  )
}

export default DynamicForm
