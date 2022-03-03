import { groupBy } from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useAppContext } from '../Providers/App.provider';
import { theme } from '../theme';

export const AnalyticsScreen: React.FC = () => {
  const appContext = useAppContext();
  const data = Object.entries(
    groupBy(appContext.selectedMoods, 'mood.emoji'),
  ).map(([key, value]) => ({
    x: key,
    y: value.length,
  }));
  return (
    <View style={styles.container}>
      <VictoryPie
        labelRadius={80}
        radius={150}
        innerRadius={50}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorWhite,
        ]}
        style={{ labels: { fontSize: 30 } }}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
