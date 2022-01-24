import React from 'react';
import { View } from '@bluebase/components';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const LocationDisplayView = getComponent('LocationDisplayView');
const stories = storiesOf('LocationDisplayView', module);

stories.add('LocationDisplayView simple example', () => (
	<View style={{ height: 500, flex: 1 }}>
		<LocationDisplayView latitude={31.582045} longitude={74.329376} />
	</View>
));
