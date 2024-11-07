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
  getNewID,
  TransactionEntry,
  TransactionType,
} from '../utility/utility';
import {styles} from '../utility/styles';

export default function Add({
  navigation,
}: {
  navigation: any;
}): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Essential');

  const handleSubmit = () => {
    if (title !== '' && description !== '' && amount !== '') {
      const newEntry: TransactionEntry = {
        id: getNewID(),
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
            placeholder="Add a Title"
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
            placeholder="Add a Description"
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
            placeholder="Add an Amount"
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
