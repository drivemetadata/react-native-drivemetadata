import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-drivemetadata' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Drivemetadata = NativeModules.Drivemetadata
  ? NativeModules.Drivemetadata
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );


export function sdkInit(clientID : number, clientToken:String, appId : number) {
  return Drivemetadata.sdkInit(clientID, clientToken, appId);
}
export function sendTags(tags: { [key: string]: any }, eventType: string) {
  return Drivemetadata.sendTags(tags, eventType);
}

export function getBackgroundData(url: string) {

  return Drivemetadata.getBackgroundData(url)
    .then((data: any) => {
      return data;  // ✅ Return the received data
    })
    .catch((error: any) => {
      return null;  // ✅ Return null to avoid `undefined`
    });
}
export async function requestIDFA() {
  try {
    const idfa = await Drivemetadata.requestIDFA(); // ✅ Await result
    return idfa; // ✅ Return value if needed
  } catch (error) {
    throw error; // ✅ Ensure error is propagated
  }
}

