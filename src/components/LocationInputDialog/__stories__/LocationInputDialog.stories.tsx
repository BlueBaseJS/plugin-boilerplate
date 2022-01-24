import { BlueBaseApp, getComponent } from '@bluebase/core';

import JsonFormPlugin from '@bluebase/plugin-json-schema-components';
import MUIplugin from '@bluebase/plugin-material-ui';
import Plugin from '../../../index';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const LocationInputDialog = getComponent('LocationInputDialog');
const stories = storiesOf('LocationInputDialog', module);

stories
	.add('LocationInputDialog simple example', () => (
		<LocationInputDialog
			visible={true}
			// eslint-disable-next-line react/jsx-no-bind
			onSubmit={(values: object) => {
				console.log(values);
			}}
		/>
	))
	.add('LocationInputDialog simple example in urdu', () => (
		<BlueBaseApp plugins={[Plugin, MUIplugin, JsonFormPlugin]} configs={{ locale: 'ur' }}>
			<LocationInputDialog
				visible={true}
				// eslint-disable-next-line react/jsx-no-bind
				onSubmit={(values: { latitude: number; longitude: number }) => {
					console.log(values);
				}}
			/>
		</BlueBaseApp>
	));
