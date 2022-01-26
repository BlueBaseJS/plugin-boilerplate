import { BlueBaseApp } from '@bluebase/core';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { PaymentMethodList } from '../PaymentMethodList';
import { PaymentMethodListQueryMocks } from '../../../graphql/mocks';
import React from 'react';
import bootOptions from '../../../../bluebase/common/bluebase';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('PaymentMethodList', module)
	.add('Basic Example', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider mocks={PaymentMethodListQueryMocks.success(100)} addTypename={false}>
					<PaymentMethodList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))
	.add('Empty State', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider mocks={PaymentMethodListQueryMocks.empty(100)} addTypename={false}>
					<PaymentMethodList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))
	.add('Loading Example', () => (
		<BlueBaseApp {...bootOptions}>
			<PaymentMethodList loading />
		</BlueBaseApp>
	))
	.add('With Network Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<PaymentMethodList />
			</MemoryRouter>
		</BlueBaseApp>
	))

	.add('With Unauthenticated Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider
					mocks={[PaymentMethodListQueryMocks.graphQLErrorsUnAuthenticated as any]}
					addTypename={false}
				>
					<PaymentMethodList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	))

	.add('With Forbidden Error', () => (
		<BlueBaseApp {...bootOptions}>
			<MemoryRouter>
				<MockedProvider
					mocks={[PaymentMethodListQueryMocks.graphQLErrorsForbidden as any]}
					addTypename={false}
				>
					<PaymentMethodList />
				</MockedProvider>
			</MemoryRouter>
		</BlueBaseApp>
	));
