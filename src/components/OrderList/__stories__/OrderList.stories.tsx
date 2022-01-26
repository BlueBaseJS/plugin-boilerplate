import { BlueBaseApp } from '@bluebase/core';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { OrderList } from '../OrderList';
import { OrderListQueryMocks } from '../../../graphql/mocks';
import React from 'react';
import bootOptions from '../../../../bluebase/common/bluebase';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('OrderList', module)
	.add('Basic Example', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider mocks={OrderListQueryMocks.success(100)} addTypename={false}>
					<OrderList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))
	.add('Empty State', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider mocks={OrderListQueryMocks.empty(100)} addTypename={false}>
					<OrderList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))
	.add('Loading Example', () => (
		<BlueBaseApp {...bootOptions}>
			<OrderList loading />
		</BlueBaseApp>
	))
	.add('With Network Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<OrderList />
			</MemoryRouter>
		</BlueBaseApp>
	))

	.add('With Unauthenticated Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider
					mocks={[OrderListQueryMocks.graphQLErrorsUnAuthenticated as any]}
					addTypename={false}
				>
					<OrderList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))

	.add('With Forbidden Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider
					mocks={[OrderListQueryMocks.graphQLErrorsForbidden as any]}
					addTypename={false}
				>
					<OrderList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	));
