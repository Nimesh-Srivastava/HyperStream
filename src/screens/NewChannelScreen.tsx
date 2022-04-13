import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useChatContext } from "stream-chat-expo";
import Button from "../components/Button";
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const NewChannelScreen = () => {
    const [name, setName] = useState("");
    
    const { client } = useChatContext();
    const { userId } = useAuthContext();

    const navigation = useNavigation();

    const createChannel = async () => {
        const channel = client.channel("team", uuidv4(), { name });
        await channel.create();
        await channel.addMembers([userId]);

        navigation.navigate('ChannelScreen', { channel });
    }

    return (
        <View style={styles.root}>
            <TextInput 
            value={name}
            onChangeText={setName}
            style={styles.input} 
            placeholder="Channel name"
            placeholderTextColor="grey"
            />

            <Button 
            title="Confirm" 
            onPress={createChannel}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        margin: 15,
    },
    input: {
        marginVertical: 10,
        marginHorizontal: 30,
        height: 50,
        borderColor: 'darkgrey',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 15,
        color: 'white',
    }
})

export default NewChannelScreen;