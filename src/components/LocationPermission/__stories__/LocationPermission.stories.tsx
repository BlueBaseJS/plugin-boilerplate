import React from 'react';
import { Text } from '@bluebase/components';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const LocationPermission = getComponent('LocationPermission');
const stories = storiesOf('LocationPermission', module);

stories.add('Full Flow', () => (
	<LocationPermission>
		<Text>Children Here!</Text>
	</LocationPermission>
));