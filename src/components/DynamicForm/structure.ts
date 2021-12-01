import { TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { DatePicker } from './components'


const Structure: any = {
  input: {
    render: TextInput,
    name: '',
    type: 'text',
    defaultValue: '',
    placeholder: '',
    disabled: false,
    onChange: (val: any) => {
      // console.log('target value')
      console.log(val.target.value)
    },
  },
  date: {
    render: DatePicker,
    name: '',
    date: new Date(),
    placeholder: '',
    mode: 'date',
    disabled: false,
    onChange: (val: any) => {
      // console.log('target value')
      console.log(val.target.value)
    },
  },
  select: {
    render: Picker,
    name: '',
    defaultValue: '',
    placeholder: '',
    disabled: false,
    onChange: (val: any) => {
      // console.log('target value')
      console.log(val.target.value)
    },
  },
}

export default Structure
