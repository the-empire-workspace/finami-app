import {debugLog} from 'utils'
import {TextInput} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {DatePicker} from './components'

const Structure: any = {
  input: {
    render: TextInput,
    name: '',
    type: 'text',
    defaultValue: '',
    placeholder: '',
    disabled: false,
    style: {},
    onChange: (val: any) => {
      debugLog(val.target.value)
    },
  },
  date: {
    render: DatePicker,
    name: '',
    date: new Date(),
    placeholder: '',
    mode: 'date',
    style: {},
    disabled: false,
    onChange: (val: any) => {
      debugLog(val.target.value)
    },
  },
  select: {
    render: Picker,
    name: '',
    defaultValue: '',
    placeholder: '',
    style: {},
    disabled: false,
    onChange: (val: any) => {
      debugLog(val.target.value)
    },
  },
  multiple: {
    style: {},
  },
}

export default Structure
