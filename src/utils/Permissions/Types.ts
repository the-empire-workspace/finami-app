import { PermissionsAndroid, Alert } from 'react-native'
import { translate } from 'utils/translate'

//Author: Fulvio Farina
///Grant permissions Library for Android
//cleaned on August 8, 2021

const _buttons = {
  buttonNeutral: 'Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
}
const _cameraModal = {
  title: 'Camera Permission',
  message: 'Requirement for Camera',
  ..._buttons,
}

const _readSDModal = {
  title: 'Permission Request to Read the External Storage',
  message: 'Requirement for reading on an external storage',
  ..._buttons,
}

const _writeSDModal = {
  title: 'Permission Request to Write to the External Storage',
  message: 'Requirement for writing on an external storage',
  ..._buttons,
}

const _warnAboutCameraPermissions = () =>
  Alert.alert('Warning', translate('camera_permission'), [{ text: 'OK' }])

export const AndroidPermissionTypes = {
  camera: {
    ask: PermissionsAndroid.PERMISSIONS.CAMERA,
    modal: _cameraModal,
    warn: _warnAboutCameraPermissions,
  },
  readSD: {
    ask: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    modal: _readSDModal,
    warn: null,
  },
  writeSD: {
    ask: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    modal: _writeSDModal,
    warn: null,
  },
}

export const Grant = async (permissionType: any) => {
  const granted = await PermissionsAndroid.request(
    permissionType.ask,
    permissionType.modal,
  )
  if (granted !== PermissionsAndroid.RESULTS.GRANTED)
    if (permissionType.warn) permissionType.warn()
  return granted
}
