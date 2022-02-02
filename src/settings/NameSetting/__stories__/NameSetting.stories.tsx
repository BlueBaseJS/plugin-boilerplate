import { MockedProvider } from '@apollo/client/testing';
import { NameSetting } from '../NameSetting';
import React from 'react';
import { ThingNodeQueryMocks } from '../../../graphql';
import storiesOf from '@bluebase/storybook-addon';

const stories = storiesOf('NameSetting', module);

stories.add('should show NameSetting with mock data', () => (
	<MockedProvider mocks={[ThingNodeQueryMocks.success]} addTypename={true}>
		<NameSetting thingId="123" />
	</MockedProvider>
));
