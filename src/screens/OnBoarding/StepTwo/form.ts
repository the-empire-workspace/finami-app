import { styles } from './styles'

export const stepTwoForm = (color: any, translate: any, def: any, background?: any, currenciesFormatValues?: any) => [
  {
    element: 'input',
    name: 'username',
    label: translate('username'),
    labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
    type: 'text',
    defaultValue: def?.username || '',
    keyboardType: 'default',
    placeholder: translate('username'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'principal_currency',
    label: translate('principal_currency'),
    labelStyle: background ? { ...styles.label, backgroundColor: background } : { ...styles.label },
    type: 'text',
    defaultValue: def?.currenciesFormatValues[0] || [],
    keyboardType: 'default',
    placeholder: translate('principal_currency'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: { ...styles.input, color: color, borderColor: color },
    values: currenciesFormatValues,
    validations: {
      required: true,
    },
  },
]
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}

