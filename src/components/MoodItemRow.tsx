import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { format } from 'date-fns';
import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';
import { useAppContext } from '../Providers/App.provider';

export const MoodItemRow: React.FC<MoodOptionWithTimestamp> = ({
  mood,
  timestamp,
}) => {
  const appContext = useAppContext();
  const onDelete = useCallback((): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDelete(timestamp);
  }, [appContext, timestamp]);
  return (
    <View key={timestamp} style={styles.moodItem}>
      <View style={styles.moodHeader}>
        <Text style={styles.moodValue}>{mood.emoji}</Text>
        <Text style={styles.moodTitle}>{mood.description}</Text>
      </View>
      <View>
        <Text style={styles.moodDate}>
          {format(new Date(timestamp), "d MMM, yyyy 'at' h:mmaaa")}
        </Text>
      </View>
      <Pressable onPress={onDelete}>
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodItem: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    padding: theme.medium,
    marginBottom: theme.medium,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodTitle: {
    fontSize: 18,
    color: theme.primaryColor,
    fontWeight: 'bold',
    fontFamily: theme.fontFamilyBold,
  },
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
    fontFamily: theme.fontFamilyRegular,
  },
});
