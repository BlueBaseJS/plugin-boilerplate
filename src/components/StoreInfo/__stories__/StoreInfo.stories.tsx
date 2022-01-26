import React from 'react';
import { StoreInfo } from '../StoreInfo';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('StoreInfo', module)
	.add('complete example', () => (
		<StoreInfo
			avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJocPrjqeP1o8eqDWsQZihK-CjwNcgYAsONPceO5j58TVdRz5E"
			title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
			url="https://www.google.com"
		/>
	))
	.add('using default image and default size', () => (
		<StoreInfo title="Go to ClickMall" url="https://www.google.com" />
	))
	.add('StoreInfo Skeleton example', () => (
		<>
			<StoreInfo
				avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJocPrjqeP1o8eqDWsQZihK-CjwNcgYAsONPceO5j58TVdRz5E"
				title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
				url="https://www.google.com"
			/>
			<StoreInfo
				loading
				title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
				url="https://www.google.com"
			/>
		</>
	));
