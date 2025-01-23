import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <ImageBackground 
      source={{ uri: "https://cdn5.f-cdn.com/contestentries/1578585/21468461/5d62b49ac544b_thumb900.jpg" }}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.container}>
        
        <View style={styles.image}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/025/666/699/non_2x/energy-management-flat-icon-design-illustration-nature-and-ecology-symbol-on-white-background-eps-10-file-vector.jpg"
            }}
            style={styles.logo}
          />
        </View>
        
        <Text style={styles.title}>Energy and Utility Management</Text>

        <TextInput 
          placeholder="Username or Email" 
          style={styles.input}
        />

        <TextInput 
          placeholder="Password"  
          style={styles.input}
        />

        <TouchableOpacity 
          style={styles.lbutton} 
          onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textlogin}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.sbutton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.textsignup}>Signup</Text>
        </TouchableOpacity>

        <Text style={styles.titlebottom}>Register face unlock or fingerprint</Text>
        
        <View style={styles.image2} >
          <Image
          source={{
            uri: "https://www.shutterstock.com/image-vector/human-head-fingerprint-biometric-security-600nw-2361302769.jpg"
          }}
          style={styles.logobottom}
          />
        </View> 

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '8%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  image: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image2: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 45,
  },
  logobottom: {
    width: 40,
    height: 40,
    borderRadius: 45,
    marginTop:10,
    
  },
  titlebottom:{
    textAlign:"center",
    marginTop:50,
  },
  title: { 
    fontSize: 30,
    paddingBottom: '20%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 25,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  lbutton: {
    backgroundColor: '#5db374',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  textlogin: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  sbutton: {
    backgroundColor: 'lightpink',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  textsignup: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});
