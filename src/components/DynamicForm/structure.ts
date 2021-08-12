import { TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'

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
