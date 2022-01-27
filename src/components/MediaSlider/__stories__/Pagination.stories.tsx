import { Pagination } from '../Pagination';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('MediaSlider/Parts/Pagination', module)
	.add('Normal Size', () => (
		<Pagination
			dots={5}
			index={1}
			onChangeIndex={(i: number) => console.log(`Index ${i} pressed`)}
		/>
	))
	.add('Small Size', () => (
		<Pagination
			small
			dots={5}
			index={1}
			onChangeIndex={(i: number) => console.log(`Index ${i} pressed`)}
		/>
	));
