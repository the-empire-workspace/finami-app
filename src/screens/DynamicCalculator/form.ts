import {Platform} from 'react-native'

export const calculatorForm = (
  translate: any,
  def: any,
  currencies: any = [],
  colors: any = {},
) => [
  {
    element: 'input',
    name: 'amount',
    label: translate('amount'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'numeric',
    defaultValue: def?.amount?.value || '',
    placeholder: translate('amount'),
    returnKeyType: 'next',
    keyboardType: 'numeric',
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'base_currency',
    label: translate('base_currency'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: String(def?.base_currency?.value || currencies[0]?.id),
    keyboardType: 'default',
    placeholder: translate('base_currency'),
    returnKeyType: 'go',
    itemStyle: Platform.OS === 'ios' ? {color: colors.typography} : {},
    values: [...(currencies || [])]?.map((currency: any) => ({
      label: `${currency?.name} (${currency?.symbol})`,
      value: String(currency?.id),
    })),
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
  {
    element: 'select',
    name: 'calculate_currency',
    label: translate('calculate_currency'),
    labelStyle: {backgroundColor: colors?.background100},
    type: 'text',
    defaultValue: String(def?.calculate_currency?.value || currencies[1]?.id),
    keyboardType: 'default',
    placeholder: translate('calculate_currency'),
    itemStyle: Platform.OS === 'ios' ? {color: colors.typography} : {},
    returnKeyType: 'go',
    values: [...(currencies || [])]
      ?.filter(
        (currency: any) => currency?.id !== Number(def?.base_currency?.value),
      )
      .map((currency: any) => ({
        label: `${currency?.name} (${currency?.symbol})`,
        value: String(currency?.id),
      })),
    validations: {
      required: true,
      minLength: 0,
      maxLength: 72,
    },
  },
]
