import { View } from '@bluebase/components';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

const LocationMapView = getComponent('LocationMapView');
const stories = storiesOf('LocationMapView', module);

stories.add('LocationDisplayView simple example', () => (
	<View style={{ height: 500, flex: 1 }}>
		<LocationMapView latitude={31.582045} longitude={74.329376} />
	</View>
));
