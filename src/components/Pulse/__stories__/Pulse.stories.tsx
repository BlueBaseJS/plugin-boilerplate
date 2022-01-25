import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { PulseProps } from '../Pulse';

const Pulse = getComponent<PulseProps>('Pulse');

const stories = storiesOf('Pulse', module);

stories.add('Pulse', () => (
	<Pulse />
));

stories.add('Bigger Size', () => (
	<Pulse size={100} />
));

