import { Dimensions, StyleSheet } from "react-native";
import colors from "./colors";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    illustrationContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    illustration: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    instructions: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    friendInfo: {
        marginLeft: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    friendName: {
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    friendList: {
        maxHeight: 200, // Adjust this height as needed
        width: '100%',
    },
    selectedCategory: {
        borderWidth: 2,
        borderColor: colors.selectedBorder, // Define a color for the border when selected
        opacity: 0.8, // Optional: To give a visual indication of selection
    },
    friendListContent: {
        paddingVertical: 8, // Add some padding if needed
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    termsContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    termsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    termsText: {
        fontSize: 14,
        color: '#555',
    },
    footerButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    footerButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    quizItem: {
        marginVertical: 10,
        marginHorizontal: 5,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff', // Ensure background color is set
        alignItems: 'center', // Center the content
        justifyContent: 'center', // Center the content
    },
    iconContainer: {
        marginBottom: 10, // Space between icon and text
    },
    quizText: {
        fontSize: 16, // Set a font size for text
        color: '#333', // Set a color for text
    },
});

export default styles;
