import React, {FC, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import {useTheme} from '@providers'
import {styles} from './styles'
import {translate} from 'utils'
import {useRoute} from '@react-navigation/native'
import {Button} from 'theme'
import {BackHandler} from 'components'
import {DatePicker} from 'components/DynamicForm/components'
import {useDispatch} from 'react-redux'
import {generateReport} from 'store/actions'

const Report: FC = () => {
  const {colors} = useTheme()
  const dispatch = useDispatch()
  const route = useRoute()
  const {params}: any = route

  const [updateValues, setUpdateValues]: any = useState({
    from_date: new Date(),
    to_date: new Date(),
  })

  const sentReport = () => {
    const newValues: any = {}
    for (const key in updateValues)
      newValues[key] = new Date(updateValues[key]).getTime()
    dispatch(generateReport({...newValues, type: params?.type, id: params?.id}))
  }

  return (
    <View style={[styles.root]}>
      <View style={[styles.modal, {backgroundColor: colors.background100}]}>
        <BackHandler title={translate('report')} />
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={styles.main}>
          <View style={[styles.mainInputContainer]}>
            <View
              style={[styles.inputContainer, {borderColor: colors.typography}]}>
              <Text
                style={[
                  styles.floatLabel,
                  styles.smallStrongBody,
                  {
                    color: colors.typography,
                    backgroundColor: colors.background100,
                  },
                ]}>
                {translate('from')}
              </Text>
              <DatePicker
                style={{
                  ...styles.modDate,
                  ...styles.body,
                  color: colors.typography,
                }}
                date={updateValues?.from_date || new Date()}
                mode={'date'}
                onChange={(date: any) => {
                  if (
                    new Date(date?.nativeEvent?.text).getTime() <
                    new Date(updateValues?.to_date).getTime()
                  )
                    setUpdateValues((prev: any) => ({
                      ...prev,
                      from_date: date?.nativeEvent?.text,
                    }))
                }}
              />
            </View>
          </View>
          <View style={[styles.mainInputContainer]}>
            <View
              style={[styles.inputContainer, {borderColor: colors.typography}]}>
              <Text
                style={[
                  styles.floatLabel,
                  styles.smallStrongBody,
                  {
                    color: colors.typography,
                    backgroundColor: colors.background100,
                  },
                ]}>
                {translate('to')}
              </Text>
              <DatePicker
                style={{
                  ...styles.modDate,
                  ...styles.body,
                  color: colors.typography,
                }}
                date={updateValues?.to_date || new Date()}
                mode={'date'}
                onChange={(date: any) => {
                  if (
                    new Date(date?.nativeEvent?.text).getTime() >
                    new Date(updateValues?.from_date).getTime()
                  )
                    setUpdateValues((prev: any) => ({
                      ...prev,
                      to_date: date?.nativeEvent?.text,
                    }))
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View style={[styles.modalFooter]}>
          <View style={[styles.buttonContainer]}>
            <Button
              styleText={{
                color: colors.typography,
              }}
              text={translate('generate_report')}
              disabled={false}
              onPress={() => {
                sentReport()
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Report
