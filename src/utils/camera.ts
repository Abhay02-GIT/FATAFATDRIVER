import {PermissionsAndroid, Platform} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

export async function ensureCameraPermission() {
  if (Platform.OS !== 'android') {
    return true; // iOS asks by itself (needs NSCameraUsageDescription)
  }
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  return result === PermissionsAndroid.RESULTS.GRANTED;
}

// Opens the camera and returns the photo's uri, or undefined if cancelled or denied.
export async function capturePhoto() {
  if (!(await ensureCameraPermission())) {
    return undefined;
  }
  const result = await launchCamera({mediaType: 'photo', quality: 0.8});
  return result.assets?.[0]?.uri;
}
