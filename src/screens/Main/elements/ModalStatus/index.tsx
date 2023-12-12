import React, {FC} from 'react'
import {useTheme} from 'providers'
import {Modal, Text, TouchableOpacity, View} from 'react-native'
import {Props} from './interface'
import {translate} from 'utils'
import styles from './styles'

const ModalStatus: FC<Props> = ({elementData, onAccept, onClose}) => {
  const {colors} = useTheme()

  return (
    <Modal
      transparent
      animationType="slide"
      visible={!!elementData?.element}
      style={styles.root}>
      <View style={styles.container}>
        <View style={[styles.modal, {backgroundColor: colors.background100}]}>
          <Text style={[styles.text, {color: colors.typography}]}>
            {translate('change_status')} {elementData?.element?.name}
          </Text>
          <View style={styles.insider}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, {backgroundColor: colors.negative}]}>
              <Text style={[styles.buttonText, {color: colors.typography}]}>
                {translate('cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAccept}
              style={[styles.button, {backgroundColor: colors.positive}]}>
              <Text style={[styles.buttonText, {color: colors.typography}]}>
                {translate('update')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalStatus
