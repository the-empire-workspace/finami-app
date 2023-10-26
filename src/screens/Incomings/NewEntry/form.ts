import {styles} from './styles'

export const NewEntryForm = (color: any, translate: any,colors:any) => [
  {
    element: 'input',
    name: 'payment_concept',
    label: translate("payment_concept"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    keyboardType: 'default',
    placeholder: translate('payment_concept'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  {
    element: 'input',
    name: 'comment',
    label: translate("comment"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    keyboardType: 'default',
    placeholder: translate('comment'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
    multiline: true,
    numberOfLines: 3

  },
  {
    element: 'input',
    name: 'amount',
    label: translate("amount"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'text',
    //confirm number-pad
    keyboardType: 'number-pad',
    placeholder: translate('00'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },
  /*{
    element: 'DatePicker',
    name: 'amount',
    label: translate("amount"),
    labelStyle: { backgroundColor: colors.background100 },
    type: 'DatePicker',
    keyboardType: 'default',
    placeholder: translate('00'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color, borderColor: color},
    validations: {
      required: true,
      minLength: 4,
      maxLength: 72,
    },
  },*/
  //multielements
]
