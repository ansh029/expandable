import React, { Component } from 'react';

import { Alert, LayoutAnimation, StyleSheet, View, Text, ScrollView, UIManager, TouchableOpacity, Platform, Image } from 'react-native';

class Expandable_ListView extends Component {

  constructor() {

    super();

    this.state = {

      layout_Height: 0

    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.expanded) {
      this.setState(() => {
        return {
          collapseImage: true,
          layout_Height: null
        }
      });
    }
    else {
      this.setState(() => {
        return {
          collapseImage: false,
          layout_Height: 0
        }
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layout_Height !== nextState.layout_Height) {
      return true;
    }
    return false;
  }

  show_Selected_Category = (item) => {

    // Write your code here which you want to execute on sub category selection.
    Alert.alert(item);

  }


  setImage = () => {

    if (this.state.collapseImage) {

      return (

        <Image
          source={{ uri: 'https://png.pngtree.com/svg/20170803/add_1131639.png' }}
          style={styles.iconStyle} />
      )

    } else {

      return (

        <Image
          source={{ uri: 'http://icons.iconarchive.com/icons/visualpharm/must-have/256/Add-icon.png' }}
          style={styles.iconStyle} />

      )
    }

  }

  render() {
    return (
      <View style={styles.Panel_Holder}>

        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickFunction} style={styles.category_View}>

          <Text style={styles.category_Text}>{this.props.item.category_Name} </Text>

          {this.setImage()}

        </TouchableOpacity>

        <View style={{ height: this.state.layout_Height, overflow: 'hidden' }}>

          {
            this.props.item.sub_Category.map((item, key) => (

               <View style={styles.sub_Category_Text}>

                <Text> {item.subname} </Text>

                {
                
                 item.name.map((item, key) => (

                  <Text> {item.ques} </Text>
                 
                      
                ))
                
                }
                {/* <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} /> */}

              </View>

            ))
          }

        </View>

      </View>

    );
  }
}

export default class App extends Component {

  constructor() {
    super();

    if (Platform.OS === 'android') {

      UIManager.setLayoutAnimationEnabledExperimental(true)

    }

    const array = [
      
      {
        expanded: false, category_Name: "1", sub_Category: [{ id: 1,subname:"1.1", name: [{ques:"1.1.1"},{ques:"1.1.2"}] }, { id: 2,subname:"1.2", name: [{ques:"1.2.1"},{ques:"1.2.2"}]}]
      },

      {
        expanded: false, category_Name: "2", sub_Category: [{ id: 3,subname:"2.1", name: [{ques:"2.1.1"},{ques:"2.1.2"}] }, { id: 4,subname:"2.2", name: [{ques:"2.2.1"},{ques:"2.2.2"}] }]
      }
    
    ];

    this.state = { AccordionData: [...array] }
  }

  update_Layout = (index) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = [...this.state.AccordionData];

    array[index]['expanded'] = !array[index]['expanded'];

    this.setState(() => {
      return {
        AccordionData: array
      }
    });

  }

  render() {

    return (

      <View style={styles.MainContainer}>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          {
            this.state.AccordionData.map((item, key) =>
              (
                <Expandable_ListView key={item.category_Name} onClickFunction={this.update_Layout.bind(this, key)} item={item} />
              ))
          }
        </ScrollView>

      </View>

    );


  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#F5FCFF',
  },

  iconStyle: {

    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    tintColor: '#fff'

  },

  sub_Category_Text: {
    fontSize: 18,
    color: '#000',
    padding: 10
  },

  category_Text: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 21,
    padding: 10
  },

  category_View: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0091EA'
  },

  Btn: {
    padding: 10,
    backgroundColor: '#FF6F00'
  }

});