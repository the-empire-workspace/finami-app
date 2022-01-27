import React, { useState, FC, useEffect } from 'react'
import { View } from 'react-native'
import FormItem from './FormItem'
import { Props } from './interface'
import Structure from './structure'

const DynamicForm: FC<Props> = ({ formData, returnData }) => {
  const [data, setData]: any = useState({})
  const checkData = () => {
    const names = []
    const newData = data
    for (const formItem of formData) names.push(formItem.name)
    for (const key of Object.keys(newData))
      if (!names.includes(key)) delete newData[key]
    setData(newData)
  }

  useEffect(() => {
    checkData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  const form = formData.map((value: any) => {
    const { element } = value

    if (element !== 'multiple')
      if (
        !(value?.name in data) ||
        (value.defaultValue !== data[value.name].value &&
          data[value.name].value === '')
      ) {
        if (element === 'date' && value.defaultValue)
          value.date = new Date(value.defaultValue)
        data[value.name] = { value: value.defaultValue, validation: true }
      }

    value.element_array?.map((array_element: any) => {
      if (
        !(array_element.name in data) ||
        (array_element.defaultValue !== data[array_element.name].value &&
          data[array_element.name].value === '')
      )
        data[array_element.name] = {
          value: array_element.defaultValue,
          validation: true,
        }
      if (array_element.element)
        array_element.render = Structure[array_element.element]?.render

      return array_element
    })

    if (element) value.render = Structure[element]?.render

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
