import { BlueBaseApp } from '@bluebase/core';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { ShippingMethodList } from '../ShippingMethodList';
import { ShippingMethodListQueryMocks } from '../../../graphql/mocks';
import bootOptions from '../../../../boot';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ShippingMethodList', module)
	.add('Basic Example', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider mocks={ShippingMethodListQueryMocks.success(100)} addTypename={false}>
					<ShippingMethodList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))
	.add('Empty State', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider mocks={ShippingMethodListQueryMocks.empty(100)} addTypename={false}>
					<ShippingMethodList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))
	.add('Loading Example', () => (
		<BlueBaseApp {...bootOptions}>
			<ShippingMethodList loading />
		</BlueBaseApp>
	))
	.add('With Network Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<ShippingMethodList />
			</MemoryRouter>
		</BlueBaseApp>
	))

	.add('With Unauthenticated Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider
					mocks={[ShippingMethodListQueryMocks.graphQLErrorsUnAuthenticated as any]}
					addTypename={false}
				>
					<ShippingMethodList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))

	.add('With Forbidden Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider
					mocks={[ShippingMethodListQueryMocks.graphQLErrorsForbidden as any]}
					addTypename={false}
				>
					<ShippingMethodList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	));
