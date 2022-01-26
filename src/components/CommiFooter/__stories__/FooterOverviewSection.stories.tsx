import { FooterOverviewSection } from '../FooterOverviewSection';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiFooter/Parts/FooterOverviewSection', module)
	.add('Normal State', () => (
		<FooterOverviewSection tagline="BlueEast (Orient Group), 26 km, Multan Rd, Maraka, Maraka Village, Lahore, Punjab 54000." />
	))
	.add('Loading State', () => <FooterOverviewSection loading />);
