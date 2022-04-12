import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import AuthContext from './src/context/AuthContext';

const API_KEY = "xmcvcbgkcwu8";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	
	// const [isReady, setIsReady] = useState(false);
	const [selectedChannel, setSelectedChannel] = useState(null);

	useEffect(() => {
		return () => {
			client.disconnectUser();	
		};
	}, []);

	const onChannelSelect = (channel) => {
		setSelectedChannel(channel);
	}

	if (!isLoadingComplete) {
		return null;
	} else {
    	return (
    		<SafeAreaProvider>
				<AuthContext>
					<OverlayProvider giphyVersion={'original'}>
						<Chat client={client}>
							
							<Navigation colorScheme={colorScheme} />
							
							{/* {!selectedChannel ? (
								<ChannelList onSelect={onChannelSelect} />
							) : (
								<Channel channel={selectedChannel}>
									<Text 
									onPress={() => setSelectedChannel(null)}
									style={{ margin: 50, backgroundColor: 'red', }} >GO BACK</Text>
									<MessageList />
									<MessageInput />
								</Channel>
							)} */}
							
						</Chat>
					</OverlayProvider>
				</AuthContext>
				
        		<StatusBar />
    	  	</SafeAreaProvider>
		);
	}
}
