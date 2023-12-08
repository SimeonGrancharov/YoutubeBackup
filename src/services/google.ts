import { GoogleSignin } from '@react-native-google-signin/google-signin'

export async function googleSignIn(): Promise<void> {
  await GoogleSignin.signIn()
}
