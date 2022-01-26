import { MiniListItem } from '../MiniListItem';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('MiniList/MiniListItem', module)
	.add('Normal State', () => <MiniListItem title="Brand Warranty" icon="decagram" />)
	.add('Action', () => (
		<MiniListItem title="Same Day Delivery" icon="truck-fast" action="Learn More" />
	))
	.add('Default Icons', () => <MiniListItem title="Beautiful Mirror Panel" />)
	.add('Loading State', () => <MiniListItem loading />);
