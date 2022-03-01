import React, { createContext, useCallback, useState, useContext } from 'react';
import { MoodOptionWithTimestamp, MoodPickerType } from '../types';

type ContextType = {
  selectedMood: MoodOptionWithTimestamp[];
  handleSelection: (mood: MoodPickerType) => void;
};

const defaultContext: ContextType = {
  selectedMood: [],
  handleSelection: () => {},
};

const AppContext = createContext<ContextType>(defaultContext);

const AppProvider: React.FC = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionWithTimestamp[]>(
    [],
  );
  const handleSelection = useCallback((mood: MoodPickerType): void => {
    setSelectedMood(current => [...current, { mood, timestamp: Date.now() }]);
  }, []);
  return (
    <AppContext.Provider value={{ selectedMood, handleSelection }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
