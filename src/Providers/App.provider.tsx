import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { MoodOptionWithTimestamp, MoodPickerType } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

type ContextType = {
  selectedMoods: MoodOptionWithTimestamp[];
  handleSelection: (mood: MoodPickerType) => void;
  handleDelete: (timestamp: number) => void;
};

const defaultContext: ContextType = {
  selectedMoods: [],
  handleSelection: () => {},
  handleDelete: () => {},
};

const setData = async (data: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

const getData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(storageKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

const AppContext = createContext<ContextType>(defaultContext);

const AppProvider: React.FC = ({ children }) => {
  const [selectedMoods, setSelectedMood] = useState<MoodOptionWithTimestamp[]>(
    [],
  );

  const getDataFromStorage = async () => {
    const data = await getData();

    if (data) {
      setSelectedMood(data.moods);
    }
  };

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const handleSelection = useCallback((mood: MoodPickerType): void => {
    setSelectedMood(current => {
      const newValue = [...current, { mood, timestamp: Date.now() }];
      setData({ moods: newValue });
      return newValue;
    });
  }, []);

  const handleDelete = useCallback((timestamp: number): void => {
    setSelectedMood(current => {
      let newValue = current.filter(item => item.timestamp !== timestamp);
      setData({ moods: newValue });
      return newValue;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ selectedMoods, handleSelection, handleDelete }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
