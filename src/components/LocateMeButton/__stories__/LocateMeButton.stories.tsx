import { BlueBaseApp, getComponent } from '@bluebase/core';

import BBPluginMaterialUI from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import { View } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';

const LocateMeButton = getComponent('LocateMeButton');
const stories = storiesOf('LocateMeButton', module);

stories.add('LocationInputView simple example', () => (
	<View>
		<LocateMeButton />
	</View>
))
	.add('LocationInputView simple example in urdu', () => (
		<View>
			<BlueBaseApp plugins={[Plugin, BBPluginMaterialUI]} configs={{ locale: 'ur' }}>
				<LocateMeButton />
			</BlueBaseApp>
		</View>
	));
