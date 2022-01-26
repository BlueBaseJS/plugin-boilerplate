import { FooterCopyright } from '../FooterCopyright';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiFooter/Parts/FooterCopyright', module)
	.add('Normal State', () => <FooterCopyright />)
	.add('Loading State', () => <FooterCopyright loading />);
