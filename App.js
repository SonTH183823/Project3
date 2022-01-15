import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import Navigation from './navigation/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ContextWrapper from "./context/ContextWrapper";

// import Test from '@screens/test';

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
  "Animated.event now requires a second argument for options",
  "Warning: Encountered two children with the same key"
]);
// LogBox.ignoreAllLogs();
function App() {
  return (
    <SafeAreaProvider >
        <Navigation />
        <StatusBar style="auto"/>
    </SafeAreaProvider>
  );
}

function Main() {
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

export default Main;