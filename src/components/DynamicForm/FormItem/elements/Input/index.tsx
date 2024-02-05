import React, {useState, FC, useEffect} from 'react'
import {InputProps} from './interface'
import {styles} from './styles'
const Input: FC<InputProps> = ({
  element,
  mainRender,
  values,
  onChange,
}: any) => {
  const [value, setValue] = useState('')

  const onChangeInput = (val: any) => {
    if (val?.persist) val.persist()
    setValue(val?.nativeEvent?.text)
    onChange(val?.nativeEvent?.text)
  }

  const onChangeSelect = (val: any) => {
    setValue(val?.nativeEvent?.text || val)
    onChange(val?.nativeEvent?.text || val)
  }

  const setVal = () => {
    if (element === 'select' && !value) {
      setValue(values?.defaultValue || values?.values[0]?.value)
      onChange(values?.defaultValue || values?.values[0]?.value)
      return
    }

    if (element !== 'select') {
      setValue(values?.defaultValue || values?.date || null)
      onChange(values?.defaultValue || values?.date || null)
    }
  }

  useEffect(() => {
    setVal()
  }, [element, values?.defaultValue])

  return element === 'select'
    ? React.createElement(
        mainRender,
        {
          ...values,
          style: {...(styles.select || {}), ...values.style},
          selectedValue: value,
          onValueChange: onChangeSelect,
        },
        values.values.map((option: any, index: any) =>
          React.createElement(mainRender?.Item, {
            ...option,
            ...{key: index},
          }),
        ),
      )
    : React.createElement(mainRender, {
        ...values,
        style: {...(styles[element] || {}), ...values.style},
        value: value,
        onChange: onChangeInput,
      })
}

export default Input
