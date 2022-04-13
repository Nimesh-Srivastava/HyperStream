import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import ChannelMemberScreen from "../screens/ChannelMemberScreen";
import ChannelScreen from "../screens/ChannelScreen";
import InviteMemberScreen from "../screens/InviteMemberScreen";
import { Entypo } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const ChannelStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Chat" 
                component={ChannelScreen} 
                options={({ navigation, route }) => ({ 
                title: "Channel",
                    headerRight: () => (
                        <MembersIcon route={route} navigation={navigation}/>
                    ),
                headerLeft: () => <HamburgerMenu navigation={navigation}/>
                })}
            />
            <Stack.Screen 
                name="ChannelMemberScreen" 
                component={ChannelMemberScreen} 
                options={{ title: "Group Details"}}
            />
            <Stack.Screen 
                name="InviteMembers" 
                component={InviteMemberScreen} 
                options={{ title: "Invite members"}}
            />
        </Stack.Navigator>
    )
    
}

const MembersIcon = ({ route, navigation }) => {
    if(!route?.params?.channel) {
        return null;
    }

    return (
        <Pressable 
        style={styles.icon} 
        onPress={() => 
        navigation.navigate("ChannelMemberScreen", {channel: route?.params?.channel})}>
            
            <FontAwesome5 
            name="users-cog" 
            size={20} 
            // color="#5964E8" 
            color="lightgrey" />

        </Pressable>
    )
}

const HamburgerMenu = ({ navigation }) => {
    return (
        <Pressable 
        style={styles.icon} 
        onPress={() => navigation.openDrawer()}>
            <Entypo name="menu" size={24} color="#5964E8" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 15,
    }
});

export default ChannelStack;