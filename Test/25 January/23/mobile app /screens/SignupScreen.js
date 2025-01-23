import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function SignupScreen({ navigation }) {
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
        <Text style={styles.title}>Create Account</Text>
        
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />
        
        <TouchableOpacity style={styles.lbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textButton}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textButton}>Back to Login</Text>
        </TouchableOpacity>
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
  logo: {
    width: 110,
    height: 110,
    borderRadius: 45,
  },
  title: { 
    fontSize: 30,
    paddingBottom: '10%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  lbutton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  sbutton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    borderRadius: 10,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});
