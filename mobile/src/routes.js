import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Stack = createStackNavigator();

function Routes() {
  return (
    
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Main" >
                
                <Stack.Screen name="Main" component={Main} 
                options={{title: 'DevRadar', 
                headerTitleAlign: 'center',
                headerStyle: {backgroundColor: '#7D40E7'}, 
                headerTintColor:'#FFF',
                }
                } />
                
                <Stack.Screen name="Profile" component={Profile} options={{title: 'Perfil no GitHub'}} />

            </Stack.Navigator>
        </NavigationContainer>
  );
}

export default Routes;