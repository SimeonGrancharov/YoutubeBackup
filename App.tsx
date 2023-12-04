import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

function App(): JSX.Element {
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '719318481645-ssoagvt5c2v1rm3hmsv3g1sqgova7vs9.apps.googleusercontent.com',
      webClientId:
        '719318481645-903hovl9tieh04rn719utgbbslnbsb86.apps.googleusercontent.com',
    });
  }, []);

  const signIn = useCallback(async () => {
    try {
      const user = await GoogleSignin.signIn();

      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View
      style={{
        marginTop: 150,
      }}>
      <GoogleSigninButton onPress={signIn} />
    </View>
  );
}

export default App;
