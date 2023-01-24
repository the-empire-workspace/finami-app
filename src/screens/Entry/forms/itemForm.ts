import {styles} from '../styles'

const itemForm = (
  color: any,
  translate: any,
  def: any = null,
  currencies: any,
) => [
  {
    element: 'input',
    name: 'name',
    label: null,
    type: 'text',
    defaultValue: def ? def.name : '',
    keyboardType: 'default',
    placeholder: translate('name'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color},
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
    style: {...styles.input, color: color},
    defaultValue: def ? def.description : '',
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
  {
    element: 'date',
    name: 'payment_date',
    label: null,
    style: {...styles.input, color: color},
    defaultValue: def ? def.payment_date : '',
    placeholder: translate('payment_date'),
    validations: {
      required: true,
    },
  },
  {
    element: 'select',
    name: 'currency',
    type: 'select',
    defaultValue: def ? def.currency : '',
    placeholder: translate('default_currency'),
    placeholderTextColor: color,
    style: {...styles.select, color: color},
    itemStyle: {...styles.select, color: color},
    values: currencies?.map((currency: any) => ({
      label: currency.name,
      value: currency.id,
    })),
    validations: {
      required: true,
    },
  },
  {
    element: 'input',
    name: 'amount',
    label: null,
    type: 'number',
    defaultValue: def ? def.amount?.toString() : '',
    keyboardType: 'numeric',
    placeholder: translate('amount'),
    returnKeyType: 'go',
    placeholderTextColor: color,
    style: {...styles.input, color: color},
    validations: {
      required: true,
      minLength: 1,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'status',
    type: 'select',
    defaultValue: def ? def.status : '',
    placeholder: translate('status'),
    placeholderTextColor: color,
    style: {...styles.select, color: color},
    itemStyle: {...styles.select, color: color},
    values: [
      {
        value: 'paid',
        label: translate('paid'),
      },
      {
        value: 'pending',
        label: translate('pending'),
      },
    ],
    validations: {
      required: true,
    },
  },
  {
    element: 'select',
    name: 'paymentType',
    type: 'select',
    defaultValue: def ? def.paymentType : '',
    placeholder: translate('payment_type'),
    placeholderTextColor: color,
    style: {...styles.select, color: color},
    itemStyle: {...styles.select, color: color},
    values: [
      {
        value: 'concurrent',
        label: translate('concurrent'),
      },
      {
        value: 'unique',
        label: translate('unique'),
      },
    ],
    validations: {
      required: true,
    },
  },
]

export const multiple = (color: any, translate: any, def: any = null) => ({
  element: 'multiple',
  element_array: [
    {
      element: 'select',
      name: 'frequency',
      type: 'select',
      defaultValue: def ? def.frequency : '',
      placeholder: translate('frequency'),
      placeholderTextColor: color,
      style: {...styles.select, color: color},
      itemStyle: {...styles.select, color: color},
      values: [
        {
          value: 'days',
          label: translate('days'),
        },
        {
          value: 'weeks',
          label: translate('weeks'),
        },
        {
          value: 'months',
          label: translate('months'),
        },
      ],
      validations: {
        required: true,
      },
    },
    {
      element: 'input',
      name: 'amount_frequency',
      label: null,
      type: 'number',
      defaultValue: def ? def.amount_frequency : '',
      keyboardType: 'numeric',
      placeholder: translate('quantity'),
      returnKeyType: 'go',
      placeholderTextColor: color,
      style: {...styles.input, color: color},
      validations: {},
    },
  ],
})

export default itemForm
