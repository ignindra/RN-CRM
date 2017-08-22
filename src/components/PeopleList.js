/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PeopleItem from './PeopleItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import PeopleDetail from './PeopleDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
});

class PeopleList extends Component {
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'user'}
        size={30} 
        style={{ textAlign: 'center', color: tintColor }}
      />
    )
  }

  renderInitialView() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.people);
    if (this.props.detailView) {
      return (
        <PeopleDetail />
      );
    } else {
      return (
        <ListView 
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) => 
            <PeopleItem people={rowData} />
          }
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle='light-content' />
        {this.renderInitialView()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.people,
    detailView: state.detailView
  };
};

export default connect(mapStateToProps)(PeopleList);
