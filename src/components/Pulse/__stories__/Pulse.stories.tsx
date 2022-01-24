import { PulseProps } from '../Pulse';
import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const Pulse = getComponent<PulseProps>('Pulse');

const stories = storiesOf('Pulse', module);

stories.add('Pulse', () => (
	<Pulse />
));

stories.add('Bigger Size', () => (
	<Pulse size={100} />
));

