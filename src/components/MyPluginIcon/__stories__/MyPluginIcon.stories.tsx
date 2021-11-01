import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

const MyPluginIcon = getComponent('MyPluginIcon');

storiesOf('MyPluginIcon', module)
	.add('Basic Example', () => <MyPluginIcon size={100} />);
