import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import colors from './colors';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Function to scale sizes based on screen size
const scale = (size) => (width / 375) * size; // 375 is a base width (like iPhone 11)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: scale(20),
    },
    containerLogin: {
        backgroundColor: colors.background, // Light white background
        borderRadius: 15, // Rounded corners
        padding: scale(20), // Space inside the container
        marginHorizontal: scale(20), // Space on the sides
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically

        // Shadow for iOS
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,

        // Shadow for Android
        elevation: 5,
    },
    button: {
        flex: 1,
        marginHorizontal: scale(10),
        borderRadius: scale(5),
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        marginTop: scale(40),
    },

    text: {
        fontSize: scale(18),
        color: colors.text,
        textAlign: 'center',
        marginBottom: scale(10),
    },

    image: {
        width: scale(150),
        height: scale(150),
        resizeMode: 'contain',
        marginBottom: scale(50),
    },
    icon: {
        paddingHorizontal: scale(10),
        color: colors.icon,
        fontSize: scale(30),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(), // Adjusted for screen density
        borderColor: '#ccc',
        marginBottom: scale(20),
        width: '80%',
    },

    input: {
        flex: 1,
        paddingVertical: scale(10),
        paddingHorizontal: scale(10),
        fontSize: scale(18),
        color: '#333',
    },
});

export default styles;
