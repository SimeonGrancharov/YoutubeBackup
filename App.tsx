import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';

function App(): JSX.Element {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: [`https://www.googleapis.com/auth/youtube`],
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

      const kk = await GoogleSignin.getTokens();

      console.log('>>> ', kk);

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=e82&type=video`,
        {
          headers: {
            Authorization: `Bearer ${kk.accessToken}`,
          },
        },
      );

      const data = await res.json();

      console.log(JSON.stringify(data));
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
