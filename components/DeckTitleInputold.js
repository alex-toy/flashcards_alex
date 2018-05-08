import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class DeckTitleInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Title of the new deck' };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}





