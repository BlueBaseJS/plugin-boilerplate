import React from 'react';
import { StatusBadgeProps } from '../StatusBadge';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const StatusBadge = getComponent<StatusBadgeProps>('StatusBadge');

storiesOf('StatusBadge', module)
	.add('Basic Example', () => <StatusBadge title="Open" />)
	.add('Custom Color', () => (
		<StatusBadge title="Open" color="#ff5722" backgroundColor="#ffccbc" />
	));
