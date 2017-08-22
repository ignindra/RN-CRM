/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk';
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import reducers from '../reducers/PeopleReducer';
import PeopleList from './PeopleList';
import Countly from '../config/Countly';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const store = createStore(reducers, applyMiddleware(Thunk));

export default class App extends Component {
  state = { loggedIn: null};

  _CountlyInit() {
    Countly.init("http://ec2-13-228-25-164.ap-southeast-1.compute.amazonaws.com","c1fc3f542598b9a7cb86c5370e0ce721aea46952");
    Countly.start();
    Countly.enableCrashReporting();
    let events = { "eventName": "basic_event", "eventCount": 1 };
    Countly.sendEvent(events);
    events = { "eventName": "event_sum", "eventCount": 1, "eventSum": "0.99" };
    Countly.sendEvent(events);
    events = { "eventName": "event_segment", "eventCount": 12 };
    events.segments = { "Country": "Germany", "Age": "28" };
    Countly.sendEvent(events);
    Countly.recordView("CRM First Screen");
    Countly.stop();
  }

  componentWillMount() {
    this._CountlyInit();
    firebase.initializeApp({
        apiKey: "AIzaSyC__WJVyHXvBfrv6ZKteeBZY8hIKIEkZnk",
        authDomain: "crmlinkedin-270e3.firebaseapp.com",
        databaseURL: "https://crmlinkedin-270e3.firebaseio.com",
        projectId: "crmlinkedin-270e3",
        storageBucket: "crmlinkedin-270e3.appspot.com",
        messagingSenderId: "789444996433"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true:
        return <Navigation />
      case false:
        return <Login />;
      default:
        return <Loader size="large" />;
    }
  }

  render() {
    return (
      <Provider store={store}>
          {/* <View style={styles.container}> */}
            {this.renderInitialView()}
          {/* </View> */}
      </Provider>
    );
  }
}
