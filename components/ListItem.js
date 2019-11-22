import React, { Component } from 'react';
import { Text, View, Dimensions, FlatList, Button, Alert, StyleSheet, TouchableOpacity, AsyncStorage, Picker, TextInput, Image } from 'react-native';




export default class ListItem extends Component {

  

  render() {

    const { list } = this.props;
  


    return (
      <View style={{ marginTop: 30 }}>

    <Text>{list.branch_details.branch_name}</Text>
      </View>
    );
  }
}

