/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Add from '../screens/Add';
import Edit from '../screens/Edit';
import {Button, Text, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

function Main(): React.JSX.Element {
  ({navigation, route}: {navigation: any; route: any}) => (
    <Button
      title="Edit"
      onPress={() => navigation.navigate('Edit', {itemId: route.params.itemId})}
    />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {backgroundColor: '#273469'},
            headerTintColor: '#EBF2FA',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({navigation, route}: {navigation: any; route: any}) => ({
            title: 'Details',
            headerStyle: {
              backgroundColor: '#273469',
            },
            headerTintColor: '#EBF2FA',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <TouchableOpacity
                style={{
                  width: 40,
                  borderLeftColor: '#969696',
                  borderTopColor: '#c8c8c8',
                  borderRightColor: '#c8c8c8',
                  borderBottomColor: '#969696',
                  borderWidth: 2,
                  backgroundColor: '#bababa',
                }}
                onPress={() =>
                  navigation.navigate('Edit', {itemId: route.params.itemId})
                }>
                <Text style={{textAlign: 'center'}}>Edit</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {backgroundColor: '#273469'},
            headerTintColor: '#EBF2FA',
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {backgroundColor: '#273469'},
            headerTintColor: '#EBF2FA',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Main;
