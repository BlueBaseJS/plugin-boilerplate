import { HeaderLogo } from '../HeaderLogo';
import React from 'react';
import { View } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CommiHeader/Parts/HeaderLogo', module)
	.add('Normal State', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<HeaderLogo source={{ uri: require('./orient-logo.png') }} />
		</View>
	))
	.add('Loading State', () => (
		<View style={{ alignItems: 'flex-start' }}>
			<HeaderLogo source={{ uri: require('./orient-logo.png') }} loading />
		</View>
	));
