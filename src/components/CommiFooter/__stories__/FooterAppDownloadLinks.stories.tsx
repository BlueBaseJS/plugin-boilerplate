import { FooterAppDownloadLinks } from '../FooterAppDownloadLinks';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiFooter/Parts/FooterAppDownloadLinks', module)
	.add('Normal State', () => (
		<FooterAppDownloadLinks
			appleAppStore="https://facebook.com/blueeasttech"
			googlePlayStore="https://facebook.com/blueeasttech"
		/>
	))
	.add('Loading State', () => <FooterAppDownloadLinks loading />);
