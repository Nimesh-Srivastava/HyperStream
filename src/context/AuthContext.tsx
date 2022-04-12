import { Auth, API, graphqlOperation } from "aws-amplify";
import { createContext, useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { getStreamToken } from "../graphql/queries";

const AuthContext = createContext({
    userId: null,
    setUserId: (newId : string) => {},
});

const AuthContextComponent = ({ children, client }) => {

    const [userId, setUserId] = useState(null);

    const connectStreamChatUser = async () => {

        const userData = await Auth.currentAuthenticatedUser();
        const { sub, email } = userData.attributes;

        const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
        const token = tokenResponse?.data?.getStreamToken;
        // console.log(token);

        if(!token) {
            Alert.alert("Failed to fetch token");
            return;
        }
        
        await client.connectUser(
			{
				id: sub,
				name: email,
				image: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png"
			}, 
			token
		);

		const channel = client.channel('livestream', 'public', { name: 'General' });
		await channel.watch();

		setUserId(sub);
    }

    useEffect(() => {
        connectStreamChatUser();
    }, []);

    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);