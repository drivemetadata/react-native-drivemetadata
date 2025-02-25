#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Drivemetadata, NSObject)



RCT_EXTERN_METHOD(sdkInit:(NSInteger)clientID
                 withToken:(NSString *)clientToken
                 withAppId:(NSInteger)appId
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)


RCT_EXTERN_METHOD(sendTags:(NSDictionary *)tags
                 withEventType:(NSString *)eventType
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getBackgroundData:(NSString *)url
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(requestIDFA:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
