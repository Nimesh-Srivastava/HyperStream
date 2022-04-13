import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import UserListItem from "../components/UserListItem";

const ChannelMemberScreen = () => {
    const route = useRoute();
    const channel = route.params.channel;
    const navigation = useNavigation();

    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        const response = await channel.queryMembers({});
        setMembers(response.members);
    };

    useEffect(() => {
        fetchMembers();
    }, [channel]);

    return (
        <FlatList 
        data={members} 
        keyExtractor={(item) => item.user_id}
        renderItem={({item}) => <UserListItem user={item.user} onPress={() => {}}/>}
        ListHeaderComponent={() => <Button title="Invite users" onPress={() => {
            navigation.navigate('InviteMembers', { channel })
            }}/>}
        />
    )
};

// const styles = StyleSheet.create({

// })

export default ChannelMemberScreen;