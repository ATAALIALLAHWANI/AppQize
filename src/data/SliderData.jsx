import { ImageSourcePropType } from 'react-native';

export type CardType = {
    title: String;
    image: ImageSourcePropType;
    description: String;
};

export const ImageSlider = [
    {
        title: 'Mastering Algorithms',
        image: require('./image/slider1.jpg'),
        description: 'Enhance your problem-solving skills with our comprehensive quiz on algorithms and data structures.'
    },
    {
        title: 'Database Design',
        image: require('./image/slider2.jpg'),
        description: 'Test your knowledge of database design principles and SQL queries with our expert quiz.'
    },
    {
        title: 'Web Development Fundamentals',
        image: require('./image/slider3.jpg'),
        description: 'Challenge yourself with questions on web development fundamentals including HTML, CSS, and JavaScript.'
    },
    {
        title: 'Software Engineering Best Practices',
        image: require('./image/slider4.jpg'),
        description: 'Evaluate your understanding of software engineering best practices and design patterns in our detailed quiz.'
    }
];
