import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodPicker, MoodItemRow } from '../components';
import { MoodOptionWithTimestamp, MoodPickerType } from '../types';
export const HomeScreen: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionWithTimestamp[]>(
    [],
  );
  const handleSelection = useCallback((mood: MoodPickerType): void => {
    setSelectedMood(current => [...current, { mood, timestamp: Date.now() }]);
  }, []);
  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelection} />
      {selectedMood.map(mood => (
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
    justifyContent: 'center',
  },
});
