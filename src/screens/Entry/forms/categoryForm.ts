import { styles } from '../styles'

const categoryForm = (color: any, translate: any) => [
  {
    element: 'input',
    name: 'name',
    label: null,
    type: 'text',
    defaultValue: '',
    keyboardType: 'default',
    placeholder: translate('name'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color },
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'description',
    label: null,
    type: 'text',
    style: { ...styles.input, color: color },
    defaultValue: '',
    placeholderTextColor: color,
    keyboardType: 'default',
    placeholder: translate('description'),
    returnKeyType: 'go',
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
]

export default categoryForm
