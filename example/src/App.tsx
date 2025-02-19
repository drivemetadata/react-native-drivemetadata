import drivemetadata from 'react-native-drivemetadata';
import { Text, View, StyleSheet } from 'react-native';
import {  useEffect } from 'react';

export default function App() {

  useEffect(() => {
    drivemetadata.sdkInit(1635, '4d17d90c78154c9a5569c073b67d8a5a22b2fabfc5c9415b6e7f709d68762054', 2659)
      .then((result) => {
        console.log(result); // Expected: "SDK Init Successfully"
      })
      .catch((error) => {
        console.error('SDK Init Error:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
