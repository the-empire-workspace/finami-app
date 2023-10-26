import {styles} from './styles'

export const NewEntryForm = (color: any, translate: any, def?: any) => [
  {
    element: 'input',
    name: 'username',
    label: translate("concept_of_fixe_income"),
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
