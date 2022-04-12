import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat, DeepPartial, Theme } from 'stream-chat-expo';
import { useEffect, useState } from 'react';
import AuthContext from './src/context/AuthContext';
import { StreamColors } from './src/constants/Colors';

import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig);

const API_KEY = "xmcvcbgkcwu8";
const client = StreamChat.getInstance(API_KEY);

const theme: DeepPartial<Theme> = {
	colors: StreamColors
};

function App() {
	const isLoadingComplete = useCachedResources();

	useEffect(() => {
		return () => {
			client.disconnectUser();	
		};
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
    	return (
    		<SafeAreaProvider>
				<AuthContext client={client}>
					<OverlayProvider giphyVersion={'original'} value={{ style: theme }}>
						<Chat client={client}>
							
							<Navigation colorScheme={"dark"} />
							
						</Chat>
					</OverlayProvider>
				</AuthContext>
				
        		<StatusBar />
    	  	</SafeAreaProvider>
		);
	}
}

export default withAuthenticator(App);