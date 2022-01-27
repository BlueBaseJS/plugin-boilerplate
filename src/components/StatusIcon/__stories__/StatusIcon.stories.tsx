import React from 'react';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const StatusIcon = getComponent('StatusIcon');
const stories = storiesOf('StatusIcon', module);
stories
	.add('User with see StatusIcon in red color', () => <StatusIcon color={'red'} />)
	.add('User with see StatusIcon in green color', () => <StatusIcon color={'green'} />)
	.add('User with see StatusIcon in orange color', () => <StatusIcon color={'orange'} />)
	.add('User with see StatusIcon in red color with background ', () => (
		<StatusIcon style={{ backgroundColor: 'black' }} />
	))
	.add('StatusIconWithMargin', () => <StatusIcon style={{ margin: 40 }} />)
	.add('StatusIconWithResize', () => <StatusIcon style={{ fontSize: 40 }} />)
	.add('StatusIconWithVisibilty', () => <StatusIcon style={{ visibility: 'hidden' }} />);
