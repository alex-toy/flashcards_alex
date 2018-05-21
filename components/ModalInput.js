import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, StyleSheet, TouchableOpacity} from 'react-native';

class ModalInput extends Component {
  
  
  	
  	constructor(props) {
    	super(props)
    	this.state = { 
    		modalVisible : false,
    	}
  	}
  	
  	
  	
  	static getDerivedStateFromProps(nextProps, prevState){
  		if (prevState.modalVisible !== nextProps.modalVisible) {
      		return {
    			modalVisible : nextProps.modalVisible
    		}
    	}
    	return {
    		modalVisible : prevState.modalVisible
    	}
  	}
  	
  	

  	setModalVisible(visible) {
    	this.setState({modalVisible: visible});
  	}
  	
  	
  	render() {
  	
  	const { message } = this.props
  	
    
    return (
      <View style={styles.container}>
        
        
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22, }}>
            <View>
              
              	
              	<Text style={styles.deckInput}>{ message }</Text>

              
              
              	<TouchableOpacity 
    				style={styles.button}
    				onPress={() => { this.setModalVisible(!this.state.modalVisible); }}
    			>
      			<Text style={styles.buttonText}>Back to user form</Text>
    			</TouchableOpacity>
              
              
            </View>
          </View>
        </Modal>

        
        

      </View>
      
      
      
    );
  }
}



const styles = StyleSheet.create({
  container: {
  	flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  newUserForm: {
  	backgroundColor: 'powderblue',
  	borderRadius: 7,
    borderWidth: 1,
    borderColor: 'black',
  	alignItems: 'stretch',
  	margin : 20,
  },
  button: {
    margin : 10,
    backgroundColor: 'steelblue',
    padding : 10,
    borderRadius: 7,
  },
  forbiddenButton: {
    margin : 10,
    backgroundColor: 'red',
    padding : 10,
    borderRadius: 7,
  },
  deckInput : {
  	backgroundColor: 'white',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'black',
    color : 'black',
    padding : 10,
    margin : 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title : {
    fontSize: 19,
    fontWeight: 'bold',
    margin : 10,
    alignSelf: 'center',
  },
  buttonText : {
  	alignSelf: 'center',
  	color : 'black',
  }
});


export default ModalInput














































