import DriveMetaDataiOSSDK
import AdSupport
import AppTrackingTransparency


@objc(Drivemetadata)
class Drivemetadata: NSObject {
  
  
  
  @objc(sdkInit:withToken:withAppId:withResolver:withRejecter:)
  func sdkInit(clientID: Int, clientToken: String, appId: Int, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    DriveMetaData.initializeShared(clientId: clientID, clientToken: clientToken, clientAppId: appId)
    
    // Return success message or any needed response
    resolve("SDK initialized successfully")
  }
  
  // send Tags
  
  @objc(sendTags:withEventType:withResolver:withRejecter:)
  func sendTags(tags: NSDictionary, eventType: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    if let tagsDict = tags as? [String: Any] {
      DriveMetaData.shared?.sendTags(tags: tagsDict, eventType: eventType) { response in
        print("Received response: \(response)") // `response` is a non-optional String
        resolve(response)  // Resolve directly
      }
    } else {
      let error = NSError(domain: "DriveMetadata", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid tags dictionary"])
      reject("INVALID_INPUT", "Tags parameter is not a valid dictionary", error)
    }
  }
  
  // deeplink
  
  @objc(getBackgroundData:withResolver:withRejecter:)
  func getBackgroundData(url: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    if let url = URL(string: url) {
      DriveMetaData.shared?.getBackgroundData(uri: url) { (jsonString, error) in
        if let error = error {
          reject("BACKGROUND_DATA_ERROR", error.localizedDescription, error)
        } else if let jsonString = jsonString {
          resolve(jsonString)
        } else {
          reject("UNKNOWN_ERROR", "No data received", nil)
        }
      }
      
    } else {
      print("Invalid URL")
    }
  }
  @objc(requestIDFA:rejecter:)
  func requestIDFA(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      if #available(iOS 14, *) {
        ATTrackingManager.requestTrackingAuthorization { status in
          switch status {
          case .authorized:
            let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
            resolve(idfa)
          case .denied, .restricted, .notDetermined:
            resolve(nil) // Return `nil` if not authorized
          @unknown default:
            resolve(nil)
          }
        }
      } else {
        let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
        resolve(idfa)
      }
    }
  }
  
}
