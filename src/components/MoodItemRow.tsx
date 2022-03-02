import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { format } from 'date-fns';
import {
  PanGestureHandler,
  // PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';
import { useAppContext } from '../Providers/App.provider';

const maxPan = 80;
export const MoodItemRow: React.FC<MoodOptionWithTimestamp> = ({
  mood,
  timestamp,
}) => {
  const appContext = useAppContext();
  const offset = useSharedValue(0);

  const onDelete = useCallback((): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDelete(timestamp);
  }, [appContext, timestamp]);

  const removeWithDelay = React.useCallback(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      appContext.handleDelete(timestamp);
    }, 250);
  }, [appContext, timestamp]);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: event => {
        console.warn(event.translationX);
        offset.value = event.translationX;
      },
      onEnd: event => {
        if (Math.abs(event.translationX) > maxPan) {
          // if the item should be removed, animate it off the screen first
          offset.value = withTiming(Math.sign(offset.value) * 2000);

          // then trigger the remove mood item with a small delay
          runOnJS(removeWithDelay)();
        } else {
          // otherwise, animate the item back to the start
          offset.value = withTiming(0);
        }
      },
    },
    [],
  );

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View key={timestamp} style={[styles.moodItem, animatedStyle]}>
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
      </Animated.View>
    </PanGestureHandler>
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
