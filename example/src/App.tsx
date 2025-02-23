import { sdkInit, sendTags, getBackgroundData } from 'react-native-drivemetadata';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [result, setResult] = useState<number | undefined>();

  const userDetails = {
    userDetails: {
      first_name: "Amit",
      last_name: "Gupta",
      mobile: "7905717240",
      address: "dsdsdsd",
    }
  };
  const eventType = "user_registration";

  // Initialize SDK, Send Tags, and Fetch Background Data
  useEffect(() => {
    sdkInit(1635, "4d17d90c78154c9a5569c073b67d8a5a22b2fabfc5c9415b6e7f709d68762054", 2782)
      .then(setResult)
      .catch((error: any) => console.error("SDK Initialization Error:", error));

    sendTags(userDetails, eventType)
      .then((response: any) => console.log("Tags sent successfully:", response))
      .catch((error: any) => console.error("Error sending tags:", error));

  

  }, []);

  // Handle Deep Linking
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      console.log("Deep Link URL:", event.url);

      getBackgroundData("https://example.com/data.json")
      .then((data: any) => console.log("Background Data:", data))
      .catch((error: any) => console.error("Error fetching background data:", error));

     
    };

    // Subscribe to deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Cleanup function to remove listener when component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
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
