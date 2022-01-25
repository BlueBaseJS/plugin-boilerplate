import { Text, View } from '@bluebase/components';

import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const CameraRollPermission = getComponent('CameraRollPermission');
const stories = storiesOf('CameraRollPermission', module);

stories.add('Full Flow', () => (
	<CameraRollPermission>
		<Text>Children Here!</Text>
	</CameraRollPermission>
));
