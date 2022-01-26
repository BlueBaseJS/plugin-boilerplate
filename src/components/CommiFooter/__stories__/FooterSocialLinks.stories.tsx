import { FooterSocialLinks } from '../FooterSocialLinks';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiFooter/Parts/FooterSocialLinks', module)
	.add('Normal State', () => (
		<FooterSocialLinks
			items={[
				{ name: 'facebook', href: 'https://facebook.com/blueeasttech' },
				{ name: 'twitter', href: '/' },
				{ name: 'instagram', href: '/' },
				{ name: 'youtube', href: '/' },
			]}
		/>
	))
	.add('Loading State', () => <FooterSocialLinks loading />);
