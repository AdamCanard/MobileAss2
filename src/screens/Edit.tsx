import React, {useState} from 'react';

import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  addEditTransaction,
  getTransactionByID,
  TransactionEntry,
  TransactionType,
} from '../utility/utility';
import {styles} from '../utility/styles';

export default function Edit({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}): React.JSX.Element {
  const itemId = route.params.itemId;
  const data = getTransactionByID(itemId);
  const stringTypeReturn = (inputType: TransactionType) => {
    switch (inputType) {
      case TransactionType.Essential:
        return 'Essential';
      case TransactionType.Leisure:
        return 'Leisure';
      default:
        return 'Others';
    }
  };

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.desc);
  const [amount, setAmount] = useState(data.amount + '');
  const [type, setType] = useState(stringTypeReturn(data.type));
  const handleSubmit = () => {
    if (title !== '' && description !== '' && amount !== '') {
      const newEntry: TransactionEntry = {
        id: data.id,
        title: title,
        amount: +amount,
        desc: description,
        type: typeReturn(),
      };
      addEditTransaction(newEntry);
      navigation.goBack();
    }
  };

  const typeReturn = () => {
    switch (type) {
      case 'Essential':
        return TransactionType.Essential;
      case 'Leisure':
        return TransactionType.Leisure;
      default:
        return TransactionType.Others;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaAdd}>
      <View style={styles.addView}>
        <View style={styles.addTitle}>
          <TextInput
            style={styles.addTitleText}
            onChangeText={setTitle}
            value={title}
          />
        </View>
        {title === '' && (
          <Text style={styles.errorStyle}>Title cannot be empty</Text>
        )}
        <View style={styles.addDesc}>
          <TextInput
            style={styles.addDescText}
            onChangeText={setDescription}
            value={description}
            multiline={true}
          />
        </View>
        {description === '' && (
          <Text style={styles.errorStyle}>Description cannot be empty</Text>
        )}
        <View style={styles.addAmount}>
          <TextInput
            style={styles.addAmountText}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        {amount === '' && (
          <Text style={styles.errorStyle}>Amount cannot be empty</Text>
        )}
        <View style={styles.typeButtons}>
          <TouchableOpacity
            onPress={() => {
              setType('Essential');
            }}
            style={
              type === 'Essential'
                ? styles.typeButtonHighlight
                : styles.typeButton
            }>
            <Text style={styles.typeButtonText}>Essential</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType('Leisure');
            }}
            style={
              type === 'Leisure'
                ? styles.typeButtonHighlight
                : styles.typeButton
            }>
            <Text style={styles.typeButtonText}>Leisure</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType('Other');
            }}
            style={
              type === 'Other' ? styles.typeButtonHighlight : styles.typeButton
            }>
            <Text style={styles.typeButtonText}>Other</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitStyle} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
