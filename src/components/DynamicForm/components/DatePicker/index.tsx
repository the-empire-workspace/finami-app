import React, {useState, FC, useEffect} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {Props} from './interface'
import {styles} from './styles'

const DatePicker2: FC<Props> = ({
  style,
  placeholder,
  date: defaultDate,
  mode = 'datetime',
  onChange,
  maximumDate = undefined,
  minimumDate = undefined,
}) => {
  const [value, setValue] = useState<string | null>(
    defaultDate
      ? `${defaultDate.getDate()}-${
          defaultDate.getMonth() + 1
        }-${defaultDate.getFullYear()}`
      : null,
  )
  const [date, setDate] = useState<Date>(defaultDate)
  const [open, setOpen] = useState(false)

  const confirmDate = (newDate: Date) => {
    setOpen(false)
    setDate(newDate)
    const formatDate = `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`
    setValue(formatDate)
    if (onChange) onChange({nativeEvent: {text: newDate}})
  }

  useEffect(() => {
    if (onChange) onChange({nativeEvent: {text: date}})
  }, [])
  return (
    <>
      <TouchableOpacity
        style={{...style, ...styles.main}}
        onPress={() => {
          setOpen(true)
        }}>
        <Text
          style={{
            color: style?.color,
            textAlign: style?.textAlign,
            fontSize: style?.fontSize,
          }}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
      <DatePicker
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        modal
        open={open}
        date={date}
        mode={mode}
        onCancel={() => setOpen(false)}
        onConfirm={confirmDate}
      />
    </>
  )
}

export default DatePicker2
