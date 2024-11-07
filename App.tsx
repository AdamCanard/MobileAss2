import React from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.viewStyle}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
