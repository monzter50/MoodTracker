import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodPicker } from '../components';
import { useAppContext } from '../Providers/App.provider';
export const HomeScreen: React.FC = () => {
  const appContext = useAppContext();
  return (
    <View style={styles.container}>
      <MoodPicker onSelect={appContext.handleSelection} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
