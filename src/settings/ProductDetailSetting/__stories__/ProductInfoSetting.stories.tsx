import { BlueBaseApp, NavigationContext } from '@bluebase/core';

import Apollo from '@bluebase/plugin-apollo';
import JsonForm from '@bluebase/plugin-json-schema-components';
import MUI from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import { ProductInfoSetting } from '../../ProductInfoSettings';
import React from 'react';
import { ThingProductQueryMocks } from '../../../graphql';
import storiesOf from '@bluebase/storybook-addon';

const stories = storiesOf('ProductInfoSetting', module);

const getParam = (_id: string, _defaultValue: any) => {
	return '123';
};

stories.add('should show ProductInfoSetting with mock data', () => (
	<BlueBaseApp plugins={[Plugin, MUI, Apollo, JsonForm]}>
		<NavigationContext.Provider value={{ getParam } as any}>
			<MockedProvider mocks={[ThingProductQueryMocks.success]} addTypename={true}>
				<ProductInfoSetting thingId="123" />
			</MockedProvider>
		</NavigationContext.Provider>
	</BlueBaseApp>
));
