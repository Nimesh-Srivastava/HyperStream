import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import React from "react";

const UserListItem = ({ user, onPress, isSelected = false }) => {
    return (
        <Pressable style={styles.container} onPress={() => onPress(user)}>
            <Image source={{ uri: user.image }} style={styles.image}/>
            <Text style={styles.text}>{user.name}</Text>
            <View style={{ marginLeft: 'auto' }}>
                {isSelected && 
                    <AntDesign name="checkcircle" size={22} color="#5964E8" />
                    }
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        marginLeft: 10, 
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 44,
        height: 44,
        borderRadius: 22,
    }
});

export default UserListItem;