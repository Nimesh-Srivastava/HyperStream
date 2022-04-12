import { 
    createDrawerNavigator,
    DrawerContentScrollView,
    } from '@react-navigation/drawer';
import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { color } from 'react-native-reanimated';
import { ChannelList } from 'stream-chat-expo';
import ChannelScreen from '../screens/ChannelScreen';
import { useAuthContext } from '../context/AuthContext';
import { Auth } from 'aws-amplify';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{
            headerTintColor: 'white',
        }}>
            <Drawer.Screen 
            name="ChannelScreen" 
            component={ChannelScreen} 
            options={{ title: "Channel"}}
            />
        </Drawer.Navigator>
    );
};

const CustomDrawerContent = (props) => {

    const { userId } = useAuthContext();

    const filters = { members: { $in: [userId] } };
    const publicFilters = { type: 'livestream' }

    const onChannelSelect = (channel) => {
        props.navigation.navigate("ChannelScreen", { channel });
	}

    const logout = () => {
        Auth.signOut();
    }

    return (
        <SafeAreaView {...props} style={{ flex: 1 }}>
            <Text style={styles.title}>
                Development Server
            </Text>

            <Text style={styles.logout} onPress={logout}>LOGOUT</Text>

            <Text style={styles.groupTitle}>Public channels</Text>
            <ChannelList onSelect={onChannelSelect} filters={publicFilters}/>

            <Text style={styles.groupTitle}>Private channels</Text>
            <ChannelList onSelect={onChannelSelect} filters={filters}/>
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
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
    },
    groupTitle: {
        color: '#5964E8',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: 'grey',
        padding: 3,
    },
    logout: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        margin: 10,
        alignSelf: 'center',
        backgroundColor: 'red',
    }
});


export default DrawerNavigator;