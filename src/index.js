// Libraries
import { AppRegistry } from 'react-native';

// Application info
import { name as appName } from './app.json';

// Entry Component
import Application from './routes/';

AppRegistry.registerComponent(appName, () => Application);
