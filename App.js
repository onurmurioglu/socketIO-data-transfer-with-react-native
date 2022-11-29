
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import io from 'socket.io-client/dist/socket.io';

const socket = io("http://localhost:3001", {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 1000,
  transports: ["websocket"]
});

export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      rate: 0
    }
  }


  componentDidMount(){
    socket.on("connect", function(){
      console.log("Sockete bağlanıldı");
    });

    socket.emit('welcome-application');

    socket.on('send-client', (data) => {
      this.setState({ rate: data.value });
    });

    socket.on("welcome-app", (data) => {
      alert(data.text);
    })
  }


  render() {
    return(

        <SafeAreaView style = {{flex:1, backgroundColor: 'lightgreen'}}>
            <View style = {{
              flex: 1,
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
                
                <Text style= {{textAlign: 'center', fontSize: 20}}>Kur değeri güncelleniyor...</Text>
                <Text style= {{fontSize: 30, fontWeight: 'bold'}}>{this.state.rate}</Text>
            
            </View>
        </SafeAreaView>

    )
  }
}