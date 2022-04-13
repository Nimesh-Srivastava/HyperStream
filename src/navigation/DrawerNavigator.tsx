import { 
    createDrawerNavigator,
    } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, Pressable } from 'react-native';
import { color } from 'react-native-reanimated';
import { ChannelList } from 'stream-chat-expo';
import ChannelScreen from '../screens/ChannelScreen';
import UserListScreen from '../screens/UserListScreen';
import ChannelMemberScreen from '../screens/ChannelMemberScreen';
import { useAuthContext } from '../context/AuthContext';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';
import { FontAwesome5 } from '@expo/vector-icons';
import NewChannelScreen from '../screens/NewChannelScreen';
import ChannelStack from './ChannelStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{
            headerTintColor: 'white',
        }}>
            <Drawer.Screen 
            name="ChannelScreen" 
            component={ChannelStack} 
            options={{
                headerShown: false,
            }}
            />
            <Drawer.Screen 
            name="UserListScreen" 
            component={UserListScreen} 
            options={{ title: "Users"}}
            />
            <Drawer.Screen 
            name="ChannelMemberScreen" 
            component={ChannelMemberScreen} 
            options={{ title: "Group Details"}}
            />
            <Drawer.Screen 
            name="NewChannelScreen" 
            component={NewChannelScreen} 
            options={{ title: "Users"}}
            />
        </Drawer.Navigator>
    );
};

const CustomDrawerContent = (props) => {
    const [tab, setTab] = useState("public");

    const { userId } = useAuthContext();
    const { navigation } = props;

    const privateFilters = { type: 'messaging', members: { $in: [userId] } };
    const publicFilters = { type: { $ne: 'messaging' }, members: { $in: [userId] } };

    const onChannelSelect = (channel) => {
        navigation.navigate("ChannelScreen", {screen: 'Chat', params: { channel }});
	}

    const logout = () => {
        Auth.signOut();
    }

    return (
        <SafeAreaView {...props} style={{ flex: 1 }}>
            <Text style={styles.title}>
                Development Server
            </Text>

            <View style={styles.tabs}>
                <Text 
                onPress={() => setTab('public')}
                style={[styles.groupTitle, 
                    {color: tab==='public' ? '#5964E8' : 'grey',
                    borderColor: tab==='public' ? '#5964E8' : '#160D00',
                    }
                    ]}>PUBLIC</Text>
                <Text 
                onPress={() => setTab('private')}
                style={[styles.groupTitle, 
                    {color: tab==='private' ? '#5964E8' : 'grey',
                    borderColor: tab==='private' ? '#5964E8' : '#160D00',
                    }
                    ]}>PRIVATE</Text>
            </View>

            {tab==='public' ? (
                <>
                    <Button title='Create Channel' onPress={() => {navigation.navigate('NewChannelScreen')}}/>
                    <ChannelList onSelect={onChannelSelect} filters={publicFilters}/>
                </>
            ) : (
                <>
                    <Button title='New Conversation' onPress={() => {navigation.navigate('UserListScreen')}}/>
                    <ChannelList onSelect={onChannelSelect} filters={privateFilters}/>
                </>
            )}

<Text style={styles.logout} onPress={logout}>LOG OUT</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
        // borderWidth: 2,
        // borderColor: 'white',
        padding: 10,
    },
    groupTitle: {
        alignSelf: 'center',
        borderBottomWidth: 3,
        paddingBottom: 6,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    logout: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: 'red',
        borderRadius: 7,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    icon: {
        marginHorizontal: 15,
    }
});


export default DrawerNavigator;