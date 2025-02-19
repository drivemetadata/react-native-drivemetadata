import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-dmd' doesn't seem to be linked. Make sure:\n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const dmd = NativeModules.Dmd
  ? NativeModules.Dmd
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

class DriveMetaData {
  /**
   * Enables IDFA tracking.
   * @returns {Promise<string>} A promise that resolves to the IDFA string.
   */
  static enableIdfa(): Promise<string> {
    return dmd.enableIdfa();
  }

  /**
   * Initializes the SDK with the given credentials.
   * @param {number} clientID - The client ID.
   * @param {string} token - The authentication token.
   * @param {number} appId - The application ID.
   * @returns {Promise<string>} A promise that resolves when initialization is complete.
   */
  static sdkInit(clientID: number, token: string, appId: number): Promise<string> {
    return dmd.sdkInit(clientID, token, appId);
  }

  /**
   * Sends a dictionary object to the native module.
   * @param {Record<string, any>} data - A dictionary object to send.
   */
  static sendTags(data: Record<string, any>): void {
    if (!dmd || typeof dmd.sendTags !== 'function') {
      throw new Error('Native module "Dmd" or method "sendTags" is not available.');
    }
    dmd.sendTags(data);
  }

  /**
   * Processes background data for a given URL.
   * @param {string} url - The URL to process.
   */
  static getBackgroundData(url: string):Promise<string> {
    
    return dmd.getBackgroundData(url);
  }

  /**
   * Fetches app details from the native module.
   * @returns {Promise<string>} A promise that resolves to app details.
   */
  static appDetails(): Promise<string> {
    return dmd.appDetails();
  }

  /**
   * Fetches device details from the native module.
   * @returns {Promise<string>} A promise that resolves to device details.
   */
  static deviceDetails(): Promise<string> {
    return dmd.deviceDetails();
  }
}

export default DriveMetaData;
