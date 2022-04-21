import {styles} from './styles'

const reportForm = (color: any, translate: any, def: any = null) => [
  {
    element: 'date',
    name: 'from_date',
    label: null,
    style: {...styles.input, color: color},
    defaultValue: def ? def.from_date : '',
    placeholder: translate('from_date'),
    validations: {
      required: true,
    },
  },
  {
    element: 'date',
    name: 'to_date',
    label: null,
    style: {...styles.input, color: color},
    defaultValue: def ? def.to_date : '',
    placeholder: translate('to_date'),
    validations: {
      required: true,
    },
  },
]

export default reportForm
