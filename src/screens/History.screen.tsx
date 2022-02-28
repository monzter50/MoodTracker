import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const HistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
