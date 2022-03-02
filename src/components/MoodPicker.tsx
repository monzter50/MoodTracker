import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { MoodPickerType, MoodPickerProps } from '../types';
import { theme } from '../theme';

const moodOptions: MoodPickerType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

const ImageSrc = require('../../assets/butterflies.png');
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState<MoodPickerType>();
  const [isChoose, setIsChoose] = useState<boolean>(false);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedOptions ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedOptions ? withTiming(1) : 0.8 }],
    }),
    [selectedOptions],
  );

  const onChooseNewMood = useCallback(() => {
    if (selectedOptions) {
      onSelect(selectedOptions);
      setSelectedOptions(undefined);
      setIsChoose(true);
    }
  }, [onSelect, selectedOptions]);

  if (isChoose) {
    return (
      <View style={styles.container}>
        <Image source={ImageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setIsChoose(false)}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    );
  }

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
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={onChooseNewMood}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
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
    fontFamily: theme.fontFamilyRegular,
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
    fontFamily: theme.fontFamilyRegular,
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
    fontFamily: theme.fontFamilyBold,
  },
  image: {
    height: 100,
    alignSelf: 'center',
  },
});
