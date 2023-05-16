/** @format */
import { Dimensions, Image, Text, View } from 'react-native';

const image1 = require('./images/1.jpg');
const image2 = require('./images/2.jpg');
const image3 = require('./images/3.jpg');
const image4 = require('./images/4.jpg');
const getScreenHeigh = Dimensions.get('window').height;
const getScreenWidth = Dimensions.get('window').width;
const Images = [
	{ image: image1 },
	{ image: image2 },
	{ image: image3 },
	{ image: image4 },
];
const layouts = {
	stack: 'stack',
	tinder: 'tinder',
	default: 'default',
};
const types = {
	ParallaxImage: 'ParallaxImage',
	Pagination: 'Pagination',
	CustomInterpolations: 'CustomInterpolations',
	normalSlider: 'normalSlider',
};
const data = [
	{
		title: 'Beautiful and dramatic Antelope Canyon',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: 'https://i.imgur.com/UYiroysl.jpg',
	},
	{
		title: 'Earlier this morning, NYC',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
	},
	{
		title: 'White Pocket Sunset',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
		illustration: 'https://i.imgur.com/MABUbpDl.jpg',
	},
	{
		title: 'Acrocorinth, Greece',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
	},
	{
		title: 'The lone tree, majestic landscape of New Zealand',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
	},
];
export { Images, getScreenHeigh, getScreenWidth, layouts, types, data };
