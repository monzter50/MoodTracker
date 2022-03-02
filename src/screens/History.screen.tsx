import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { MoodItemRow } from '../components';
import { useAppContext } from '../Providers/App.provider';
export const HistoryScreen: React.FC = () => {
  const appContext = useAppContext();
  return (
    <ScrollView style={styles.container}>
      {appContext.selectedMoods
        .slice()
        .reverse()
        .map(mood => (
          <MoodItemRow
            key={mood.timestamp}
            mood={mood.mood}
            timestamp={mood.timestamp}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
