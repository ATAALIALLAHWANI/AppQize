import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Dimensions, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import colors from '../data/colors';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import PersonalItem from '../compeonent/PersonalItem';
import { Config } from '../apiService';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
const data = [
    {
        name: 'Syntax Mastery',
        icon: <FontAwesome5 name="code" size={18} color={colors.icon} />,
        color: '#F0C7A5', // Darkened from #FFDEB4
        result: 10,
        date: '24-8-8'

    },
    {
        name: 'Data Structures',
        icon: <MaterialCommunityIcons name="database-outline" size={18} color={colors.icon} />,
        color: '#F0A6A0', // Darkened from #FECACA
        result: 7,
        date: '24-8-8'

    },
    {
        name: 'Algorithms Complexity',
        icon: <AntDesign name="setting" size={18} color={colors.icon} />,
        color: '#8DA5E4', // Darkened from #A5C8FF
        result: 15,
        date: '24-8-8'
    },
    {
        name: 'Cloud Computing',
        icon: <Feather name="cloud" size={18} color={colors.icon} />,
        color: '#8AB9D5', // Darkened from #B4E4FF
        result: 20,
        date: '24-8-8'

    },
    {
        name: 'Problem Solving',
        icon: <Ionicons name="bulb-outline" size={18} color={colors.icon} />,
        color: '#9BBF9E', // Darkened from #C4F0C5
        result: 18,
        date: '24-8-8'

    },
];

const Statistics = () => {
    const [data2, setData2] = useState(null);
    useEffect(() => {
        handleGet();
    }, [])

    const { id } = useContext(UserContext);

    const handleGet = async () => {
        console.log("id = ", id)
        console.log('handle get')
        try {
            const response = await axios.get(`${Config.API_URL1}statistice`, {
                params: { id }
            });
            if (response.status === 200) {
                const mappedData = response.data.map(item => {
                    let icon;
                    let color;

                    // Set icon and color based on the field name
                    switch (item.field) {
                        case 'Syntax Mastery':
                            icon = <FontAwesome5 name="code" size={18} color={colors.icon} />;
                            color = '#F0C7A5'; // Darkened from #FFDEB4
                            break;
                        case 'Data Structures':
                            icon = <MaterialCommunityIcons name="database-outline" size={18} color={colors.icon} />;
                            color = '#F0A6A0'; // Darkened from #FECACA
                            break;
                        case 'Algorithms Complexity':
                            icon = <AntDesign name="setting" size={18} color={colors.icon} />;
                            color = '#8DA5E4'; // Darkened from #A5C8FF
                            break;
                        case 'Cloud Computing':
                            icon = <Feather name="cloud" size={18} color={colors.icon} />;
                            color = '#8AB9D5'; // Darkened from #B4E4FF
                            break;
                        case 'Problem Solving':
                            icon = <Ionicons name="bulb-outline" size={18} color={colors.icon} />;
                            color = '#9BBF9E'; // Darkened from #C4F0C5
                            break;
                        default:
                            icon = <Ionicons name="question" size={18} color={colors.icon} />; // Default icon
                            color = '#CCCCCC'; // Default color
                    }

                    return {
                        name: item.field,
                        icon: icon,
                        color: color,
                        result: item.result,
                        date: item.date,
                    };
                });

                setData2(mappedData); // Set the mapped data to state
            }

        } catch (error) {
            console.log("Error getting statistics data:", error);
        }
    };


    const pieData = data.map(item => ({
        name: item.name,
        population: item.result,
        color: item.color,
        legendFontColor: item.color,
        legendFontSize: 12,


    }));
    const handleEndReached = useCallback(() => {
        console.log('backend')
        handleGet(); // Call handleGet when the end of the list is reached
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <PieChart
                    data={pieData}
                    width={Dimensions.get('window').width - 40}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>

            <View style={styles.containerText}>
                <Text style={styles.text}>Daily </Text>
                <TouchableOpacity onPress={handleGet}>
                    <Ionicons name="today" size={24} color={colors.icon} />

                </TouchableOpacity>
            </View>

            <FlatList
                data={data2}
                renderItem={({ item, index }) => <PersonalItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                contentContainerStyle={{ paddingBottom: 20 }}
                onEndReached={handleEndReached}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundScreen,
        paddingHorizontal: 20,
        paddingTop: 40,

    },
    chartContainer: {
        // backgroundColor: "#FFEDF8"

    },
    containerText: {
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#F7FAFC',
        marginVertical: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    list: {
        width: '100%',
    },
});

export default Statistics;
