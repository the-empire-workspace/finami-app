import {BackHandler, DynamicForm} from 'components'
import React, {FC, useEffect, useMemo, useState} from 'react'
import {translate} from 'utils'
import {egressForm, categoryForm} from './form'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {styles} from './styles'
import {useTheme} from 'providers'
import {useDispatch} from 'react-redux'
import {Button} from 'theme'
import {useNavigation, useRoute} from '@react-navigation/native'
import {createCategoryGoals, createGoals} from 'store/actions'

const NewGoals: FC = () => {
  const {colors} = useTheme()
  const [categoryCreation, setCategoryCreation] = useState(false)
  const [values, setValues] = useState<any>({})
  const router = useRoute()
  const navigation: any = useNavigation()
  const dispatch = useDispatch()
  const {params}: any = router
  useEffect(() => {
    if (categoryCreation) setValues({})
    else setValues({})
  }, [categoryCreation])

  const eForm = useMemo(
    () =>
      categoryCreation
        ? categoryForm(translate, values, colors)
        : egressForm(translate, values, colors),
    [categoryCreation],
  )

  const createData = () => {
    const sendValues = Object.keys(values).reduce((prev: any, next: any) => {
      prev[next] = values[next]?.value
      return prev
    }, {})
    if (!Object.keys(sendValues).length) return
    if (categoryCreation) {
      dispatch(
        createCategoryGoals({
          ...sendValues,
          category_id: params?.id || null,
          type: params?.entry_type || params?.type,
        }),
      )
      navigation.goBack()
      return
    }

    dispatch(
      createGoals({
        ...sendValues,
        category_id: params?.id || null,
        type: params?.entry_type || params?.type,
      }),
    )
    navigation.goBack()
  }

  return (
    <View style={[styles.root, {backgroundColor: colors.background100}]}>
      <BackHandler
        title={translate(`new_${params?.entry_type || params?.type}`)}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {params?.type !== 'category' && (
          <View style={[styles.categoryContainer]}>
            <TouchableOpacity
              style={[styles.selectBox, {borderColor: colors.typography}]}
              onPress={() => setCategoryCreation(!categoryCreation)}>
              <View
                style={
                  categoryCreation
                    ? [
                        styles.selectBoxInner,
                        {backgroundColor: colors.typography},
                      ]
                    : {}
                }
              />
            </TouchableOpacity>
            <Text style={[styles.body, {color: colors.typography}]}>
              {translate('enable_category_creation')}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.formContainer,
            {borderBottomColor: colors.background25},
          ]}>
          <Text style={[styles.h3, {color: colors.typography}]}>
            {categoryCreation
              ? translate('category')
              : translate(params?.entry_type || params?.type)}
          </Text>
          <DynamicForm
            formData={eForm}
            returnData={(data: any) => {
              for (const value in data?.value)
                setValues((prev: any) => ({
                  ...prev,
                  [value]: data?.value[value],
                }))
            }}
          />
        </View>
      </ScrollView>
      <View style={[styles.buttonContainer]}>
        <Button
          style={[styles.buttonContent, {backgroundColor: colors.negative}]}
          styleText={{color: colors.typography2}}
          text={translate('cancel')}
          onPress={() => {
            navigation.goBack()
          }}
          disabled={Object.keys(values)?.reduce((prev: any, next: any) => {
            return prev || values?.[next]?.validation !== undefined
              ? !values[next]?.validation
              : false
          }, false)}
        />
        <Button
          text={translate('register')}
          style={[styles.buttonContent, {backgroundColor: colors.positive}]}
          styleText={{color: colors.typography2}}
          onPress={createData}
          disabled={Object.keys(values)?.reduce((prev: any, next: any) => {
            const valid =
              values?.[next]?.validation !== undefined
                ? !values[next]?.validation
                : false
            return prev || valid
          }, false)}
        />
      </View>
    </View>
  )
}

export default NewGoals
