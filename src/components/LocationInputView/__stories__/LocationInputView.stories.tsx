import React from 'react';
import { View } from '@bluebase/components';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const LocationInputView = getComponent('LocationInputView');
const stories = storiesOf('LocationInputView', module);

stories.add('LocationInputView simple example', () => (
	<View style={{ height: 500, flex: 1 }}>
		<LocationInputView latitude={31.582045} longitude={74.329376} />
	</View>
));
