import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const LoadingOverlay = ({ isVisible }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
        >
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
});

export default LoadingOverlay;
