import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodItemRow } from '../components';
import { useAppContext } from '../Providers/App.provider';
export const HistoryScreen: React.FC = () => {
  const appContext = useAppContext();
  return (
    <View style={styles.container}>
      {appContext.selectedMood.map(mood => (
        <MoodItemRow
          key={mood.timestamp}
          mood={mood.mood}
          timestamp={mood.timestamp}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
