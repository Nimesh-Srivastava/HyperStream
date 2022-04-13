import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import UserListItem from "../components/UserListItem";

const ChannelMemberScreen = () => {
    const route = useRoute();
    const channel = route.params.channel;

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
        />
    )
};

// const styles = StyleSheet.create({

// })

export default ChannelMemberScreen;