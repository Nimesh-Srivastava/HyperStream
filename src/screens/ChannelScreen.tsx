import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";

const ChannelScreen = () => {
    const route = useRoute();
    const channel = route.params?.channel;
    const navigation = useNavigation();
    
    navigation.setOptions({ title: channel?.data?.name || "HomeScreen" })

    if(!channel) {
        return (
            <View style={styles.welcome}>
                <Text style={styles.welcomeText1}>
                    Welcome to
                </Text>
                <Text style={styles.welcomeText2}>
                    HyperStream
                </Text>
            </View>
        )
    }

    const MyEmptyComponent = () => null;

    return (
        <Channel channel={channel} DateHeader={MyEmptyComponent} key={channel.data.name}>
            <MessageList />
            <MessageInput />
        </Channel>
    );
};

const styles = StyleSheet.create({
    welcome: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: 70,
    },
    welcomeText1: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    welcomeText2: {
        color: '#5964E8',
        fontSize: 26,
        fontWeight: 'bold',
    },
});

export default ChannelScreen;