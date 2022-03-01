import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionWithTimestamp, MoodPickerType } from '../types';
export const AnalyticsScreen: React.FC = () => {
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
        <Text key={mood.timestamp}>
          {mood.mood.emoji}
          {mood.mood.description} {'-'} {new Date(mood.timestamp).toString()}
        </Text>
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
