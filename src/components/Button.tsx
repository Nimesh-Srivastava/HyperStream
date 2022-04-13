import { Pressable, StyleSheet, Text, View } from "react-native"

const Button = ({ title = "Button", onPress = () => {} }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{ title }</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        borderRadius: 8,
        marginBottom: 25,
        marginTop: 10,
        marginHorizontal: 30,
        padding: 10,
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button;