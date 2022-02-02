import { BlueBaseApp, getComponent } from '@bluebase/core';

import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';
import Plugin from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const plugins = [MaterialCommunityIcons, Plugin];

const ThingsAppIcon = getComponent('ThingsAppIcon');

storiesOf('ThingsAppIcon', module).add('Basic Example', () => (
	<BlueBaseApp plugins={plugins}>
		<ThingsAppIcon size={100} />
	</BlueBaseApp>
));
