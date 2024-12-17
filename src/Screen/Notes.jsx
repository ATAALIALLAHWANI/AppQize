import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const { SharedStorage } = NativeModules; // Import SharedStorage module
const group = 'group.streak'; // Define your shared group

const NotesApp = () => {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) {
            console.log("Error loading notes:", error);
        }
    };

    const saveNotes = async (newNotes) => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
            // Save the notes for the widget
            const widgetData = { notes: newNotes };
            console.log(widgetData)
            await SharedGroupPreferences.setItem('widgetKey', widgetData, group); // Save for iOS

        } catch (error) {
            console.log("Error saving notes:", error);
        }
        SharedStorage.set(JSON.stringify(widgetData)); // Save for Android
        ToastAndroid.show('Notes updated in widget!', ToastAndroid.SHORT); // Show a toast message
    };

    const addNote = () => {
        if (note.trim() !== '') {
            const newNotes = [...notes, { id: Date.now().toString(), text: note }];
            setNotes(newNotes);
            saveNotes(newNotes); // Save notes after adding a new one
            setNote('');
        }
    };

    const removeNote = (id) => {
        const newNotes = notes.filter((item) => item.id !== id);
        setNotes(newNotes);
        saveNotes(newNotes); // Update notes after removal
    };

    const renderNote = ({ item }) => (
        <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item.text}</Text>
            <TouchableOpacity onPress={() => removeNote(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter a note"
                value={note}
                onChangeText={setNote}
                style={styles.input}
            />
            <Button title="Add Note" onPress={addNote} />
            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={renderNote}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 20,
    },
    noteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    noteText: {
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#ff5c5c',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default NotesApp;
