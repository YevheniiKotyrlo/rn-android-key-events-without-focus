import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  const [lastKey, setLastKey] = useState('none');
  const [taps, setTaps] = useState(0);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View
          onKeyDown={event => setLastKey(event.nativeEvent.key)}
          style={styles.screen}
          testID="root">
          <Pressable
            onPress={() => setTaps(count => count + 1)}
            style={styles.button}
            testID="tap-target">
            <Text>Tapped {taps} times</Text>
          </Pressable>
          <Text testID="last-key">Last key: {lastKey}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    padding: 24,
  },
  button: {
    borderWidth: 1,
    padding: 16,
  },
});

export default App;
