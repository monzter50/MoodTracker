import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const AnalyticsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>AnalyticsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
