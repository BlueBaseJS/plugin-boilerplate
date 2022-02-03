import { BlueBaseApp } from '@bluebase/core';
import { MockedProvider } from '@apollo/client/testing';
import { ProductCarousel } from '../__artifacts__/ProductCarousel';
import { ProductListQueryMocks } from '../../GraphqlList/__artifacts__/mocks';
import React from 'react';
import { View } from 'react-native';
import { plugins } from './plugins';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ListCarousel', module)
	.add('Basic Example', () => (
		<BlueBaseApp plugins={plugins}>
			<View style={{ width: 1000 }}>
				<MockedProvider
					mocks={[...ProductListQueryMocks.success(), ...ProductListQueryMocks.success(160)]}
					addTypename={false}
				>
					<View style={{ margin: 16, backgroundColor: '#fff' }}>
						<ProductCarousel />
					</View>
				</MockedProvider>
			</View>
		</BlueBaseApp>
	))

	.add('Small Size', () => (
		<BlueBaseApp plugins={plugins}>
			<View style={{ width: 500 }}>
				<MockedProvider mocks={ProductListQueryMocks.successLight()} addTypename={false}>
					<View style={{ margin: 16, backgroundColor: '#fff' }}>
						<ProductCarousel />
					</View>
				</MockedProvider>
			</View>
		</BlueBaseApp>
	))

	.add('Loading State', () => (
		<BlueBaseApp plugins={plugins}>
			<View style={{ width: 1000 }}>
				<MockedProvider mocks={ProductListQueryMocks.success()} addTypename={false}>
					<View style={{ margin: 16, backgroundColor: '#fff' }}>
						<ProductCarousel loading />
					</View>
				</MockedProvider>
			</View>
		</BlueBaseApp>
	));
