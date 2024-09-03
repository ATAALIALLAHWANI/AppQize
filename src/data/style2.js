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
        backgroundColor: colors.icon, // Dynamic background color
        padding: scale(20),
    },


    button: {
        flex: 1,
        marginHorizontal: scale(10),
        borderRadius: scale(5),
        backgroundColor: colors.primary
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 'auto',
        marginTop: scale(40),

    },
    icon: {
        paddingHorizontal: scale(15),
        color: colors.icon, // Dynamic icon color
    },

    text: {
        fontSize: scale(18),
        color: colors.icon, // Dynamic text color
        marginHorizontal: scale(10),
    },
    questionContainer: {
        backgroundColor: colors.background, // Light white background
        borderRadius: scale(15), // Rounded corners
        padding: scale(20), // Space inside the container
        marginHorizontal: 1, // Space on the sides
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically

        // Shadow for iOS
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,

        // Shadow for Android
        elevation: 5,
        width: '100%',
    },
    questionText: {
        fontSize: scale(15),
        fontWeight: 'bold',
        marginBottom: scale(20),
        textAlign: 'center',
        color: colors.icon, // Dynamic text color
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: scale(10),
        padding: scale(15),
        borderRadius: scale(10),
        borderWidth: 1,
        borderColor: colors.border, // Dynamic border color
        width: '100%',

    },
    selectedOption: {
        backgroundColor: colors.primary, // Dynamic selected option background color
        borderColor: colors.border, // Dynamic border color
    },
    progressContainer: {
        marginTop: scale(20),
        alignItems: 'center',
    },
    progressText: {
        fontSize: scale(16),
        marginBottom: scale(10),
        color: colors.primary, // Dynamic text color
    },
    progressBar: {
        width: scale(200),
        height: scale(10),
        backgroundColor: colors.primary, // Dynamic progress bar color
    },


});

export default styles;
