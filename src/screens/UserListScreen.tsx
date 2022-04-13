import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useChatContext } from "stream-chat-expo";
import UserListItem from "../components/UserListItem";
import { useAuthContext } from "../context/AuthContext";

const UserListScreen = () => {
    const { client } = useChatContext();
    const { userId } = useAuthContext();
    const navigation = useNavigation();

    const [users, setUsers] = useState([]);
    
    const fetchUsers = async () => {
        const response = await client.queryUsers({});
        setUsers(response.users);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const startChannel = async (user) => {
        const channel = client.channel("messaging", {
            members: [userId, user.id],
        });

        await channel.create();

        navigation.navigate('ChannelScreen', { channel });
    }

    return (
        <FlatList data={users} renderItem={({item}) => <UserListItem user={item} onPress={startChannel}/>} />
    )
};

const styles = StyleSheet.create({
    text: {

    },
});

export default UserListScreen;