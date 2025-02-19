#import "Drivemetadata.h"
#import <React/RCTBridgeModule.h>
@import DriveMetaDataiOSSDK;


@implementation Drivemetadata

RCT_EXPORT_MODULE()

// sdk init
RCT_EXPORT_METHOD(sdkInit:(NSInteger)clientID
                  withToken:(NSString *)token
                  withAppId:(NSInteger)appId
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject) {
  // Validate parameters
  if (clientID <= 0 || appId <= 0 || token.length == 0) {
    reject(@"INVALID_PARAMETERS", @"Client ID, token, or app ID is invalid", nil);
    return;
  }

  // Initialize SDK
  @try {
    [DriveMetaData initializeSharedWithClientId:clientID clientToken:token clientAppId:appId];

    resolve(@"DMD SDK Init Successfully");
  } @catch (NSException *exception) {
    reject(@"SDK_INIT_FAILED", @"Failed to initialize SDK", [NSError errorWithDomain:@"DriveMetaDataError" code:500 userInfo:@{NSLocalizedDescriptionKey: exception.reason}]);
  }
}

// Modified method to include a return type
RCT_EXPORT_METHOD(enableIdfa:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  @try {
    NSString *response = [[DriveMetaData shared] requestIDFA]; // Ensure `enableIdfa` exists in SDK
    NSLog(@"enableIdfa   - %@", response);
    resolve(response);
  } @catch (NSException *exception) {
    NSLog(@"Failed to enable IDFA: %@", exception.reason);
    reject(@"IDFA_INIT_FAILED", @"Failed to Get IDFA ID", [NSError errorWithDomain:@"DriveMetaDataError" code:500 userInfo:@{NSLocalizedDescriptionKey: exception.reason}]);  }
}

// sends the data to dmd server

RCT_EXPORT_METHOD(sendTags:(NSDictionary *)data) {
  if (data) {
    
    
    [[DriveMetaData shared] sendTagsWithTags:data eventType:@"delete" completion:^(id response) {
        NSLog(@"Received response: %@", response);
    }];

  } else {
    NSLog(@"Data is null");
  }
}



//handle deeplink

RCT_REMAP_METHOD(getBackgroundData,
                 url:(NSString *)url
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  if (url == nil) {
    reject(@"invalid_url", @"URL cannot be null", nil);
    return;
  }

  @try {
    NSLog(@"Fetching Background Data for URL: %@", url);
    
    [[DriveMetaData shared] getBackgroundDataWithUri:@"https://deep.drivemetadata.com/1mdky" callback:^(NSString * _Nullable jsonString, NSError * _Nullable error) {
        if (error) {
            // Handle error
          reject(@"Error", error.localizedDescription, nil);

        } else if (jsonString) {
          resolve(jsonString);

            // Handle success, use jsonString
            NSLog(@"Amit Kumar Received data: %@", jsonString);
        }
    }];
  } @catch (NSException *exception) {
    reject(@"exception", exception.reason, nil);
  }
}








//E695AE7D-C962-4EB2-9572-665C35422976
RCT_EXPORT_METHOD(appDetails:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSString *response = [[DriveMetaData shared] appDetails];
    NSLog(@"appDetails title: %@", response);
    resolve(response); // Resolve the promise with the response
  }
  @catch (NSException *exception) {
    reject(@"app_details_error", @"Failed to fetch app details", nil); // Reject the promise on error
  }
}


RCT_EXPORT_METHOD(deviceDetails:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSString *response = [[DriveMetaData shared] deviceDetails];
    NSLog(@"deviceDetails title: %@", response);
    resolve(response); // Resolve the promise with the response
  }
  @catch (NSException *exception) {
    reject(@"app_details_error", @"Failed to fetch app details", nil); // Reject the promise on error
  }
}




+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
