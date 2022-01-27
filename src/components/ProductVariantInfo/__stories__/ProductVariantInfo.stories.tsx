import { ProductVariantInfo } from '../ProductVariantInfo';
/* eslint-disable max-len */
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ProductVariantInfo', module)
	.add('complete example', () => (
		<ProductVariantInfo
			avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJocPrjqeP1o8eqDWsQZihK-CjwNcgYAsONPceO5j58TVdRz5E"
			title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
			url="https://www.google.com"
			variants={[
				{ name: 'color', value: 'Red' },
				{ name: 'size', value: 'xLarge' },
			]}
		/>
	))
	.add('only product image', () => (
		<ProductVariantInfo
			avatar="https://smhttp-ssl-18627.nexcesscdn.net/wp-content/uploads/2016/11/mild-steel-sheet.jpg"
			title="Apple Iphone 7"
			url="https://www.google.com"
		/>
	))
	.add('using default image and default size', () => (
		<ProductVariantInfo title="Apple Iphone 7" url="https://www.google.com" />
	))
	.add('only title and variant', () => (
		<ProductVariantInfo
			title="Apple Iphone 7"
			url="https://www.google.com"
			variants={[
				{ name: 'color', value: 'Red' },
				{ name: 'size', value: 'xLarge' },
			]}
		/>
	))
	.add('ProductVariantInfoSkeleton', () => (
		<>
			<ProductVariantInfo
				avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJocPrjqeP1o8eqDWsQZihK-CjwNcgYAsONPceO5j58TVdRz5E"
				title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
				url="https://www.google.com"
				variants={[
					{ name: 'color', value: 'Red' },
					{ name: 'size', value: 'xLarge' },
				]}
			/>
			<ProductVariantInfo
				loading
				title="Apple Iphone 7 - 2GB  RAM 128GB Rom With latest A7 chip "
				url="https://www.google.com"
			/>
		</>
	));
