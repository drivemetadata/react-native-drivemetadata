import { sdkInit, sendTags, getBackgroundData, requestIDFA } from 'react-native-drivemetadata';
import { Text, View, StyleSheet, Linking,Alert } from 'react-native';
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

    
    getIDFA();

  }, []);

  async function getIDFA() {
    try {
      const idfa = await requestIDFA();
      console.log("User's IDFA:", idfa);
    } catch (error) {
      console.error("Failed to get IDFA:", error);
    }
  }
  

  // Handle Deep Linking
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {  // ✅ Mark function as async
      console.log("Deep Link URL:", event.url);
  
      // Show an alert when a deep link is received
      Alert.alert("Deep Link Received", `URL: ${event.url}`);
  
      // Fetch background data (optional)
      try {
        const data = await getBackgroundData(event.url);
  
        if (data) {
          console.log("✅ Final Background Data:", data);
        } else {
          console.error("❌ Background data is undefined/null");
        }
      } catch (error) {
        console.error("❌ Error in fetchData:", error);
      }
    };
  
    // Subscribe to deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);
  
    // Cleanup function to remove listener when component unmounts
    return () => {
      subscription.remove();
    };
  }, []);  // ✅ Proper use of useEffect dependency array
  

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
