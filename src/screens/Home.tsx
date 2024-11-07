import React, {useCallback, useState} from 'react';

import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  getInitialData,
  TransactionEntry,
  TransactionType,
  TransactionType_bgColor,
} from '../utility/utility';
import {styles} from '../utility/styles';
import {useFocusEffect} from '@react-navigation/native';

export default function Home({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const [listData, setListData] = useState<TransactionEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      setListData([...getInitialData()]);

      return () => {};
    }, []),
  );

  const renderMe = ({item}: {item: TransactionEntry}) => (
    <Transaction data={item} navigation={navigation} />
  );
  return (
    <SafeAreaView style={styles.safeAreaHome}>
      <View>
        {listData.length === 0 && (
          <Text style={styles.emptyText}>
            Add Transaction to see entry here
          </Text>
        )}
        <FlatList
          data={listData}
          renderItem={renderMe}
          keyExtractor={item => item.id}
          extraData={listData}
        />
      </View>
      <TouchableOpacity
        style={styles.FAB}
        onPress={() => navigation.navigate('Add')}>
        <Text style={styles.FABText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Transaction = ({
  data,
  navigation,
}: {
  data: TransactionEntry;
  navigation: any;
}) => {
  let bg;
  switch (data.type) {
    case TransactionType.Essential:
      bg = TransactionType_bgColor[0];
      break;
    case TransactionType.Leisure:
      bg = TransactionType_bgColor[1];
      break;
    default:
      bg = TransactionType_bgColor[2];
      break;
  }
  return (
    <TouchableOpacity
      style={[styles.transactionStyle, {backgroundColor: bg}]}
      onPress={() => navigation.navigate('Details', {itemId: data.id})}>
      <Text style={styles.transactionTextStyle}>{data.title}</Text>
      <Text style={styles.transactionTextStyle}>{data.amount}</Text>
    </TouchableOpacity>
  );
};
