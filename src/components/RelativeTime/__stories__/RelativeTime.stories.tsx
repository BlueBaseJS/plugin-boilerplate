import React, { useCallback } from 'react';

import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const RelativeTime = getComponent('RelativeTime');
const DateValue = new Date('December 17, 2017 03:24:00');

storiesOf('RelativeTime', module)
	.add('Date as a object', () => <RelativeTime time={DateValue} />)

	.add('Date as a string', () => <RelativeTime time="January 22, 2018 03:24:00" />)

	.add('Date without time prop', () => <RelativeTime time={DateValue}/>)
	.add('Date with Text component', () => (
		// tslint:disable-next-line: jsx-no-lambda
		<RelativeTime time={DateValue} component={useCallback(() => 'Card', [])} />
	))

	.add('Date with time string empty gives error', () => <RelativeTime time={DateValue}  />);
