import { PaginationDot } from '../PaginationDot';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('MediaSlider/Parts/PaginationDot', module)
	.add('Normal Size', () => (
		<>
			<PaginationDot index={0} onPress={() => console.log('Index 0 pressed')} />
			<PaginationDot index={1} onPress={() => console.log('Index 1 pressed')} active />
			<PaginationDot index={2} onPress={() => console.log('Index 2 pressed')} />
		</>
	))
	.add('Small Size', () => (
		<>
			<PaginationDot index={0} small onPress={() => console.log('Index 0 pressed')} />
			<PaginationDot index={1} small onPress={() => console.log('Index 1 pressed')} active />
			<PaginationDot index={2} small onPress={() => console.log('Index 2 pressed')} />
		</>
	));
