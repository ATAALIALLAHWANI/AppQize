import { FontAwesome5, MaterialCommunityIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import colors from './colors';

const quizData = [
    {
        id: 1,
        name: 'Syntax Mastery',
        icon: <FontAwesome5 name="code" size={18} color={colors.icon} />,
        color: '#F0C7A5',
    },
    {
        id: 2,
        name: 'Data Structures',
        icon: <MaterialCommunityIcons name="database-outline" size={18} color={colors.icon} />,
        color: '#F0A6A0',
    },
    {
        id: 3,
        name: 'Algorithms Complexity',
        icon: <AntDesign name="setting" size={18} color={colors.icon} />,
        color: '#8DA5E4',
    },
    {
        id: 4,
        name: 'Cloud Computing',
        icon: <Feather name="cloud" size={18} color={colors.icon} />,
        color: '#8AB9D5',
    },
    {
        id: 5,
        name: 'Problem Solving',
        icon: <Ionicons name="bulb-outline" size={18} color={colors.icon} />,
        color: '#9BBF9E',
    },
]; export default quizData;