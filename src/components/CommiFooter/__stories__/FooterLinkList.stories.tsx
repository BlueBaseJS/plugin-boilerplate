import { FooterLinkList } from '../FooterLinkList';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiFooter/Parts/FooterLinkList', module)
	.add('Normal State', () => (
		<FooterLinkList
			title="Company"
			items={[
				{ title: 'About Us', href: '/' },
				{ title: 'Contact Us', href: '/' },
			]}
		/>
	))
	.add('Loading State', () => <FooterLinkList loading />);
