import 'cross-fetch/polyfill';

import { BlueBaseApp } from '@bluebase/core';
import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import BlueeastClientPluginUI from '@blueeast/client-plugin-ui';
import MaterialUiPlugin from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import { PaymentMethodList } from '../PaymentMethodList';
import PaymentMethodListItem from '../../PaymentMethodListItem';
import { PaymentMethodListQueryMocks } from '../../../graphql/mocks';
import Plugin from '../../../index';
import React from 'react';
import ResponsiveListSizingPlugin from '@bluebase/plugin-responsive-grid';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

// jest.mock('NativeAnimatedHelper');

const plugins = [
	BlueBasePluginApollo,
	MaterialUiPlugin,
	Plugin,
	ResponsiveListSizingPlugin,
	BlueeastClientPluginUI,
];

const GridTestWrapper = ({ children }: any) => (
	<BlueBaseApp plugins={plugins}>
		<MockedProvider mocks={PaymentMethodListQueryMocks.success(100)} addTypename={false}>
			{children}
		</MockedProvider>
	</BlueBaseApp>
);

describe('PaymentMethodList', () => {
	it('should pass custom onPress fn through list', async () => {
		const onPress = jest.fn();

		// mount
		const wrapper = mount(
			<GridTestWrapper>
				<PaymentMethodList onPress={onPress} />
			</GridTestWrapper>
		);

		await waitForElement(wrapper, PaymentMethodList);

		const handler: any = wrapper.find(PaymentMethodListItem).first().prop('onPress');

		handler();

		expect(onPress).toHaveBeenCalledTimes(1);

		wrapper.unmount();
	});

	describe('mapQueryResultToListData method', () => {
		it('should return result data when networkState === 7', async () => {
			// mount
			const wrapper = mount(
				<GridTestWrapper>
					<PaymentMethodList />
				</GridTestWrapper>
			);

			await waitForElement(wrapper, 'PaymentMethodList');

			// Extract Instance
			const mapQueryResultToListData: any = wrapper
				.find('GraphqlList')
				.first()
				.prop('mapQueryResultToListData');

			// Execute function with mocked result
			const data = mapQueryResultToListData({
				data: PaymentMethodListQueryMocks.success()[0].result.data,
				networkStatus: 7,
			} as any);

			// assert
			expect(data).toHaveLength(10);

			wrapper.unmount();
		});

		describe('mapQueryResultToConnection method', () => {
			it('should connection from result', async () => {
				// mount
				const wrapper = mount(
					<GridTestWrapper>
						<PaymentMethodList />
					</GridTestWrapper>
				);

				await waitForElement(wrapper, 'PaymentMethodList');

				// Extract Instance
				const mapQueryResultToConnection: any = wrapper
					.find('GraphqlList')
					.first()
					.prop('mapQueryResultToConnection');

				// Execute function with mocked result
				const connection = mapQueryResultToConnection({
					data: PaymentMethodListQueryMocks.success()[0].result.data,
					networkStatus: 3,
				} as any);

				// assert
				expect(connection.edges).toBeTruthy();
				expect(connection.pageInfo).toBeTruthy();

				wrapper.unmount();
			});
		});
	});
});