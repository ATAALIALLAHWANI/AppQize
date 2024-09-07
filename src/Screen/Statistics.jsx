import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Dimensions, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import colors from '../data/colors';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import PersonalItem from '../components/PersonalItem';
import { Config } from '../apiService';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import _ from 'lodash';
import LoadingOverlay from '../components/LoadingOverlay';

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
};

const Statistics = () => {
    const [data2, setData2] = useState(null);
    const { id } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false); // State to show/hide the loading spinner

    useEffect(() => {
        handleGet();
    }, []);

    const handleGet = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${Config.API_URL1}statistice/by/${id}`);
            if (response.status === 200) {
                console.log('done');
                const mappedData = response.data.map(item => {
                    let icon;
                    let color;

                    switch (item.field) {
                        case 'Syntax Mastery':
                            icon = <FontAwesome5 name="code" size={18} color={colors.icon} />;
                            color = '#F0C7A5';
                            break;
                        case 'Data Structures':
                            icon = <MaterialCommunityIcons name="database-outline" size={18} color={colors.icon} />;
                            color = '#F0A6A0';
                            break;
                        case 'Algorithms Complexity':
                            icon = <AntDesign name="setting" size={18} color={colors.icon} />;
                            color = '#8DA5E4';
                            break;
                        case 'Cloud Computing':
                            icon = <Feather name="cloud" size={18} color={colors.icon} />;
                            color = '#8AB9D5';
                            break;
                        case 'Problem Solving':
                            icon = <Ionicons name="bulb-outline" size={18} color={colors.icon} />;
                            color = '#9BBF9E';
                            break;
                        default:
                            icon = <Ionicons name="question" size={18} color={colors.icon} />;
                            color = '#CCCCCC';
                    }

                    return {
                        name: item.field,
                        icon: icon,
                        color: color,
                        result: item.result,
                        date: item.date,
                    };
                });

                setData2(mappedData);
            }

        } catch (error) {
            console.log("Error getting statistics data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Grouping and Summing the Data
    const groupedData = _(data2)
        .groupBy('name')
        .map((items, name) => {
            const icon = items[0].icon;
            const color = items[0].color;
            const totalResult = _.sumBy(items, 'result');

            return {
                name,
                icon,
                color,
                result: totalResult,
            };
        })
        .value();

    // Generating pieData
    const pieData = groupedData.map(item => ({
        name: item.name,
        population: item.result,
        color: item.color,
        legendFontColor: item.color,
        legendFontSize: 12,
    }));

    const handleEndReached = useCallback(() => {
        handleGet();
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
                renderItem={({ item }) => <PersonalItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                contentContainerStyle={{ paddingBottom: 20 }}
                onEndReached={handleEndReached}
            />
            <LoadingOverlay isVisible={isLoading} />

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
    chartContainer: {},
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
