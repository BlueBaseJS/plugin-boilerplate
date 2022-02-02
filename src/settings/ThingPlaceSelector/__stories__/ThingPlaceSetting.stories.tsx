import { ThingPlaceQueryMocks, ThingPlaceUpdateMutationMocks } from '../../../graphql';

import Apollo from '@bluebase/plugin-apollo';
import BEClientPluginUI from '@blueeast/client-plugin-ui';
import { BlueBaseApp } from '@bluebase/core';
import ClientPluginUI from '@mevris/client-plugin-ui';
import JsonForm from '@bluebase/plugin-json-schema-components';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import React from 'react';
import { ThingPlaceSelector } from '../ThingPlaceSelector';
import storiesOf from '@bluebase/storybook-addon';

const stories = storiesOf('ThingPlaceSelector', module);
stories.add('should show ThingPlaceSelector with mocked data', () => (
	<BlueBaseApp plugins={[Plugin, MUIplugin, BEClientPluginUI, Apollo, JsonForm, ClientPluginUI]}>
		<MockedProvider
			mocks={[ThingPlaceQueryMocks.success, ThingPlaceUpdateMutationMocks.success]}
			addTypename={false}
		>
			<ThingPlaceSelector thingId="123" />
		</MockedProvider>
	</BlueBaseApp>
));
