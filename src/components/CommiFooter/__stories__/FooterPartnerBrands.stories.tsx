import { FooterPartnerBrands } from '../FooterPartnerBrands';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiFooter/Parts/FooterPartnerBrands', module)
	.add('Normal State', () => (
		<FooterPartnerBrands
			items={[
				{
					href: 'https://facebook.com/blueeasttech',
					name: 'Orient',
					uri: require('./logo-orient.png'),
				},
				{
					href: 'https://facebook.com/blueeasttech',
					name: 'Orient',
					uri: require('./logo-orient.png'),
				},
				{
					href: 'https://facebook.com/blueeasttech',
					name: 'Orient',
					uri: require('./logo-orient.png'),
				},
			]}
		/>
	))
	.add('Loading State', () => <FooterPartnerBrands loading />);
