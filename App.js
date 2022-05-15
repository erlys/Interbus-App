/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React from 'react';
import {
    View,
    Text
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native" 

import { SignUp, Login, Tickets, Travels } from './screens' 

import Tabs from './navigation/tabs'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator()


const App = () => {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown:false
                }}
                initialRouteName={'Login'}>
                <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>                
                <Stack.Screen options={{headerShown: false}} name="Home" component={Tabs} />
                <Stack.Screen options={{headerShown: false}} name="Travels" component={Travels} />
                <Stack.Screen options={{headerShown: false}} name="Tickets" component={Tickets} />
            </Stack.Navigator>
        </NavigationContainer>
        )
}

export default App;
