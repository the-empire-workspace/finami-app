import {styles} from './styles'

export const stepTwoForm = (color: any, translate: any, def: any) => [
  {
    element: 'input',
    name: 'username',
    label: null,
    type: 'text',
    defaultValue: def?.username || '',
    keyboardType: 'default',
    placeholder: translate('username'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
]
