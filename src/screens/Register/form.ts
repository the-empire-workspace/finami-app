import { styles } from './styles'

export const registerForm = (color: any, translate: any, currencies: any) => [
  {
    element: 'input',
    name: 'name',
    label: null,
    type: 'text',
    defaultValue: '',
    keyboardType: 'default',
    placeholder: translate('name_lastname'),
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
    name: 'profession',
    label: null,
    type: 'text',
    style: { ...styles.input, color: color },
    defaultValue: '',
    placeholderTextColor: color,
    keyboardType: 'default',
    placeholder: translate('job'),
    returnKeyType: 'go',
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'currency',
    type: 'select',
    defaultValue: '',
    placeholder: 'Moneda Predeterminada',
    placeholderTextColor: color,
    style: { ...styles.input, color: color },
    itemStyle: { ...styles.input, color: color },
    values: currencies?.map((currency: any) => ({ label: currency.name, value: currency.id })),
    validations: {
      required: true,
    },
  },
]
