import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MoodPickerType, MoodPickerProps } from '../types';
import { theme } from '../theme';
const moodOptions: MoodPickerType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState<MoodPickerType>();
  const onChooseNewMood = useCallback(() => {
    if (selectedOptions) {
      onSelect(selectedOptions);
      setSelectedOptions(undefined);
    }
  }, [onSelect, selectedOptions]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.containerEmoji}>
        {moodOptions.map(options => (
          <View key={options.emoji}>
            <Pressable
              onPress={() => setSelectedOptions(options)}
              style={[
                styles.item,
                selectedOptions?.emoji === options.emoji
                  ? styles.selected
                  : undefined,
              ]}>
              <Text>{options.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedOptions?.emoji === options.emoji
                ? options.description
                : ' '}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.button} onPress={onChooseNewMood}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerEmoji: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selected: {
    backgroundColor: theme.primaryColor,
    borderColor: theme.primaryColor,
    borderWidth: 1,
  },
  item: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  descriptionText: {
    textAlign: 'center',
  },
  container: {
    borderWidth: 2,
    borderColor: theme.primaryColor,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-around',
    minHeight: 230,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  button: {
    backgroundColor: theme.primaryColor,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: theme.colorText,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});