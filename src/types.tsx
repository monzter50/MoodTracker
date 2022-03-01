export type MoodPickerType = {
  emoji: string;
  description: string;
};

export type MoodOptionWithTimestamp = {
  mood: MoodPickerType;
  timestamp: number;
};

export type MoodPickerProps = {
  onSelect: (mood: MoodPickerType) => void;
};
