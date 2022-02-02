import { ThingNodeQueryMocks, ThingRenameMutationMocks } from '../../../mocks';

import Apollo from '@bluebase/plugin-apollo';
import { BlueBaseApp } from '@bluebase/core';
import { InMemoryCache } from '@apollo/client/cache';
import JsonForm from '@bluebase/plugin-json-schema-components';
import JsonGraphqlForm from '@bluebase/plugin-json-graphql-components';
import MUIplugin from '@bluebase/plugin-material-ui';
import { MockedProvider as MockedProviderDefault } from '@apollo/client/testing';
import Plugin from '../../../index';
import React from 'react';
import { ThingNameForm } from '../ThingNameForm';
import storiesOf from '@bluebase/storybook-addon';

const HappyFragmentMatcher = { match: () => true };

const MockedProvider = (props: any) => (
	<MockedProviderDefault
		addTypename={false}
		cache={
			new InMemoryCache({
				addTypename: false,
				fragmentMatcher: HappyFragmentMatcher,
			})
		}
		{...props}
	/>
);

const stories = storiesOf('ThingNameForm', module);

stories
	.add('should show ThingNameForm with live data', () => (
		<BlueBaseApp
			plugins={[Plugin, MUIplugin, Apollo, JsonGraphqlForm, JsonForm]}
			configs={{
				'plugin.apollo.httpLinkOptions': {
					uri: 'https://api-eu-west-2.graphcms.com/v2/ckx6mwwm85tkz01xq2bo70fow/master',
				},
			}}
		>
			<ThingNameForm id="123" onSuccess={() => {}} />
		</BlueBaseApp>
	))
	.add('should show ThingNameForm with mocked data', () => (
		<BlueBaseApp plugins={[Plugin, MUIplugin, Apollo, JsonGraphqlForm, JsonForm]}>
			<MockedProvider
				mocks={[ThingNodeQueryMocks.success, ThingRenameMutationMocks.success]}
				addTypename={true}
			>
				<ThingNameForm id="123" onSuccess={() => {}} />
			</MockedProvider>
		</BlueBaseApp>
	))
	.add('should show ThingNameForm with mocked data in urdu', () => (
		<BlueBaseApp
			plugins={[Plugin, MUIplugin, Apollo, JsonGraphqlForm, JsonForm]}
			configs={{ locale: 'ur' }}
		>
			<MockedProvider
				mocks={[ThingNodeQueryMocks.success, ThingRenameMutationMocks.success]}
				addTypename={true}
			>
				<ThingNameForm id="123" onSuccess={() => {}} />
			</MockedProvider>
		</BlueBaseApp>
	));
