import React, {useCallback, useState} from 'react';

import {SafeAreaView, Text, View} from 'react-native';
import {
  defaultTransactionEntry,
  getTransactionByID,
  TransactionEntry,
} from '../utility/utility';
import {styles} from '../utility/styles';
import {useFocusEffect} from '@react-navigation/native';

export default function Details({route}: {route: any}): React.JSX.Element {
  const itemId = route.params.itemId;
  const [data, setData] = useState<TransactionEntry>(defaultTransactionEntry);
  useFocusEffect(
    useCallback(() => {
      setData(getTransactionByID(itemId));

      return () => {};
    }, [itemId]),
  );

  return (
    <SafeAreaView style={styles.safeAreaDetails}>
      <View style={styles.detailsStyle}>
        <View style={styles.detailsViewStyle}>
          <Text style={styles.detailsTitleStyle}>{data.title}</Text>
        </View>
        <View style={styles.detailsViewStyle}>
          <Text style={styles.detailsDescStyle}>{data.desc}</Text>
        </View>
        <View style={styles.detailsViewStyle}>
          <Text style={styles.detailsAmountStyle}>{data.amount}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
