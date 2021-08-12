import { Platform } from 'react-native'
import { AndroidPermissionTypes, Grant } from './Types'

export const grantCameraPermission = async () => {
  if (Platform.OS !== 'android') return
  await Grant(AndroidPermissionTypes.camera)
}

export const grantReadSDPermission = async () => {
  if (Platform.OS !== 'android') return
  await Grant(AndroidPermissionTypes.readSD)
}

export const grantWriteSDPermission = async () => {
  if (Platform.OS !== 'android') return
  await Grant(AndroidPermissionTypes.writeSD)
}
