import * as mocks from './mocks';

import { BlueBaseApp, getComponent } from '@bluebase/core';

import { ErrorObserver } from '@bluebase/components';
import { HelloWorldQuery } from './Query';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { Text } from 'react-native';
import bootOptions from '../../../../boot';
import { plugins } from './plugins';
import storiesOf from '@bluebase/storybook-addon';

const Query = getComponent('GraphqlQuery');

const Hello = () => <Text>World</Text>;

storiesOf('ApolloError', module)
	.add('With Network Error', () => (
		<BlueBaseApp {...bootOptions} plugins={plugins}>
			<Query query={HelloWorldQuery}>
				{(result: { error: { name: string; message: string } }) => (
					<ErrorObserver error={result.error}>
						<Hello />
					</ErrorObserver>
				)}
			</Query>
		</BlueBaseApp>
	))
	.add('With Network Error in urdu', () => (
		<BlueBaseApp {...bootOptions} plugins={plugins} configs={{ locale: 'ur' }}>
			<Query query={HelloWorldQuery}>
				{(result: { error: { name: string; message: string } }) => (
					<ErrorObserver error={result.error}>
						<Hello />
					</ErrorObserver>
				)}
			</Query>
		</BlueBaseApp>
	))
	.add('With UnAuthenticated Error', () => (
		<BlueBaseApp {...bootOptions} plugins={plugins}>
			<MockedProvider mocks={[mocks.graphQLErrorsUnAuthenticated as any]} addTypename={false}>
				<Query query={HelloWorldQuery}>
					{(result: { error: { name: string; message: string } }) => (
						<ErrorObserver error={result.error}>
							<Hello />
						</ErrorObserver>
					)}
				</Query>
			</MockedProvider>
		</BlueBaseApp>
	))
	.add('With UnAuthenticated Error in urdu', () => (
		<BlueBaseApp {...bootOptions} plugins={plugins} configs={{ locale: 'ur' }}>
			<MockedProvider mocks={[mocks.graphQLErrorsUnAuthenticated as any]} addTypename={false}>
				<Query query={HelloWorldQuery}>
					{(result: { error: { name: string; message: string } }) => (
						<ErrorObserver error={result.error}>
							<Hello />
						</ErrorObserver>
					)}
				</Query>
			</MockedProvider>
		</BlueBaseApp>
	))
	.add('With Other GraphQL Errors', () => (
		<BlueBaseApp {...bootOptions} plugins={plugins}>
			<MockedProvider mocks={[mocks.graphQLErrorsBadUserInput as any]} addTypename={false}>
				<Query query={HelloWorldQuery}>
					{(result: { error: { name: string; message: string } }) => (
						<ErrorObserver error={result.error}>
							<Hello />
						</ErrorObserver>
					)}
				</Query>
			</MockedProvider>
		</BlueBaseApp>
	))
	.add('With Forbidden Error', () => (
		<BlueBaseApp {...bootOptions} plugins={plugins}>
			<MockedProvider mocks={[mocks.graphQLErrorsForbidden as any]} addTypename={false}>
				<Query query={HelloWorldQuery}>
					{(result: { error: { name: string; message: string } }) => (
						<ErrorObserver error={result.error}>
							<Hello />
						</ErrorObserver>
					)}
				</Query>
			</MockedProvider>
		</BlueBaseApp>
	))
	.add('With Forbidden Error in urdu', () => (
		<BlueBaseApp {...bootOptions} plugins={plugins} configs={{ locale: 'ur' }}>
			<MockedProvider mocks={[mocks.graphQLErrorsForbidden as any]} addTypename={false}>
				<Query query={HelloWorldQuery}>
					{(result: { error: { name: string; message: string } }) => (
						<ErrorObserver error={result.error}>
							<Hello />
						</ErrorObserver>
					)}
				</Query>
			</MockedProvider>
		</BlueBaseApp>
	))
	.add('With Generic Error', () => (
		<BlueBaseApp {...bootOptions} plugins={plugins}>
			<ErrorObserver error={Error('Boom!')}>
				<Hello />
			</ErrorObserver>
		</BlueBaseApp>
	));
