# react-native-drivemetadata

Analytics

## Installation

```sh
npm install react-native-drivemetadata
```
 or 

 ```sh
yarn install react-native-drivemetadata
```
## Usage

#initlaise the plugin

```js
import { sdkInit} from 'react-native-drivemetadata';

// ...
  const [result, setResult] = useState<number | undefined>();

 sdkInit(<clientid>, <token>, <appId>)
      .then(setResult)
      .catch((error: any) => console.error("SDK Initialization Error:", error));


```
## send Evetns 

//...
import {  sendTags } from 'react-native-drivemetadata';

const userDetails = {
    userDetails: {
      first_name: "Amit",
      last_name: "Gupta",
      mobile: "7905717240",
      address: "dsdsdsd",
    }
  };
  const eventType = "user_registration";


   sendTags(userDetails, eventType)
      .then((response: any) => console.log("Tags sent successfully:", response))
      .catch((error: any) => console.error("Error sending tags:", error));


```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
