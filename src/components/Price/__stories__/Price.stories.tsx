import { PriceProps } from '../Price';
import React from 'react';
import { View } from 'react-native';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const Price = getComponent<PriceProps>('Price');

storiesOf('Price', module)
	.add('Small', () => <Price size="small" price={24999} compareAtPrice={34999} percentage={10} />)
	.add('Medium', () => <Price size="medium" price={24999} compareAtPrice={34999} percentage={10} />)
	.add('Large', () => <Price size="large" price={24999} compareAtPrice={34999} percentage={10} />)
	.add('Row', () => (
		<>
			<Price size="small" price={24999} compareAtPrice={34999} percentage={10} />
			<Price size="medium" price={24999} compareAtPrice={34999} percentage={10} />
			<Price size="large" price={24999} compareAtPrice={34999} percentage={10} />
		</>
	))
	.add('Column', () => (
		<View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
			<Price size="small" direction="column" price={24999} compareAtPrice={34999} percentage={10} />
			<Price
				size="medium"
				direction="column"
				price={24999}
				compareAtPrice={34999}
				percentage={10}
			/>
			<Price size="large" direction="column" price={24999} compareAtPrice={34999} percentage={10} />
		</View>
	))
	.add('Loading', () => (
		<View>
			<Price
				size="small"
				loading
				price={24999}
				compareAtPrice={34999}
				percentage={10}
				style={{ paddingVertical: 8 }}
			/>
			<Price
				size="medium"
				loading
				price={24999}
				compareAtPrice={34999}
				percentage={10}
				style={{ paddingVertical: 8 }}
			/>
			<Price
				size="large"
				loading
				price={24999}
				compareAtPrice={34999}
				percentage={10}
				style={{ paddingVertical: 8 }}
			/>
		</View>
	));
