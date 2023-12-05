import { GoogleSignin } from '@react-native-google-signin/google-signin'

export async function googleSignIn() {
  try {
    await GoogleSignin.signIn()
  } catch (err) {}
}
