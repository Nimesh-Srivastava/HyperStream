import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ActivityIndicator, ColorSchemeName } from 'react-native';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import SignUpScreen from '../screens/SignUpScreen';
import { useAuthContext } from '../context/AuthContext';

import DrawerNavigator from './DrawerNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

	const { userId } = useAuthContext();

	if(!userId){
		return <ActivityIndicator />
	}

	return (
		<Stack.Navigator>

			{/* {!userId ? (
				<Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
			) : (
				<Stack.Screen name="Root" component={DrawerNavigator} options={{ headerShown: false }} />
			)} */}
			
			<Stack.Screen name="Root" component={DrawerNavigator} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}