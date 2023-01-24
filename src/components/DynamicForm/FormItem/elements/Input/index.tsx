import React, { useState, FC, useEffect } from 'react'
import { InputProps } from './interface'

const Input: FC<InputProps> = ({
  element,
  mainRender,
  values,
  onChange,
}: any) => {
  const [value, setValue] = useState(values?.defaultValue || '')

  const onChangeInput = (val: any) => {
    if (val?.persist) val.persist();
    setValue(val?.nativeEvent?.text)
    onChange(val?.nativeEvent?.text)
  }

  const onChangeSelect = (val: any) => {
    setValue(val?.nativeEvent?.text || val)
    onChange(val?.nativeEvent?.text || val)
  }

  useEffect(() => {
    if (element === 'select' && !value) {
      setValue(values?.values[0]?.value)
      onChange(values?.values[0]?.value)
    }
    if (values?.defaultValue) onChange(values?.defaultValue || value)
  }, [element])

  useEffect(() => {
    if (element === 'select' && !value) {
      setValue(values?.values[0]?.value)
      onChange(values?.values[0]?.value)
    }
    if (values?.defaultValue) onChange(values?.defaultValue)
  }, [element])

  return element === 'select'
    ? React.createElement(
      mainRender,
      { ...values, selectedValue: value, onValueChange: onChangeSelect },
      values.values.map((option: any, index: any) =>
        React.createElement(mainRender?.Item, {
          ...option,
          ...{ key: index },
        }),
      ),
    )
    : React.createElement(mainRender, {
      ...values,
      value: value,
      onChange: onChangeInput,
    })
}

export default Input
