import 'cross-fetch/polyfill';

import { BlueBaseApp, NavigationContext } from '@bluebase/core';
import {
	usePaginationWithNavigation,
	withPaginationWithNavigation,
} from '../usePaginationWithNavigation';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/react-testing';
import Plugin from '../../index';
import { ProductGrid } from '../../components/GraphqlList/__artifacts__/ProductGrid';
import { ProductListQueryMocks } from '../../components/GraphqlList/__artifacts__/mocks';
import React from 'react';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

async function waitForLayout(wrapper: any, selector: any) {
	await waitForElement(wrapper, selector);

	const onLayout: any = wrapper.find('[testID="product-grid-root"]').first().prop('onLayout');
	onLayout({
		nativeEvent: {
			layout: {
				height: 800,
				width: 300,
			},
		},
	});
	wrapper.update();
}

const ProductGridWithNavigation = (props: any) => {
	const { page, onPageChange } = usePaginationWithNavigation();
	return <ProductGrid {...props} page={page} onPageChange={onPageChange} />;
};

const ProductGridWithHocNavigation = withPaginationWithNavigation(ProductGrid);

describe('usePaginationWithNavigation', () => {
	it('should render managed list through navigation', async () => {
		const navigation: any = {
			getParam: jest.fn().mockReturnValue(3),
			setParams: jest.fn(),
		};

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginApollo, BlueBasePluginMaterialUI, Plugin]}>
				<NavigationContext.Provider value={navigation}>
					<MockedProvider
						mocks={[
							...ProductListQueryMocks.successOffset(142),
							...ProductListQueryMocks.successOffset(160),
							...ProductListQueryMocks.successOffset(172),
						]}
						addTypename={false}
					>
						<ProductGridWithNavigation />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForLayout(wrapper, ProductGridWithNavigation);

		expect(wrapper.find(ProductGrid).first().prop('page')).toBe(3);

		// expect(wrapper.find(List)).toMatchSnapshot();
		const onPageChange: any = wrapper.find(ProductGrid).first().prop('onPageChange');

		onPageChange(5);

		expect(navigation.setParams).toHaveBeenCalledTimes(1);
		expect(navigation.setParams).toHaveBeenLastCalledWith({ page: 5 }, true);

		wrapper.unmount();
	});
});

describe('withPaginationWithNavigation', () => {
	it('should render managed list through navigation', async () => {
		const navigation: any = {
			getParam: jest.fn().mockReturnValue(3),
			setParams: jest.fn(),
		};

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginApollo, BlueBasePluginMaterialUI, Plugin]}>
				<NavigationContext.Provider value={navigation}>
					<MockedProvider
						mocks={[
							...ProductListQueryMocks.successOffset(142),
							...ProductListQueryMocks.successOffset(160),
							...ProductListQueryMocks.successOffset(172),
						]}
						addTypename={false}
					>
						<ProductGridWithHocNavigation />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForLayout(wrapper, ProductGridWithHocNavigation);

		expect(wrapper.find(ProductGrid).first().prop('page')).toBe(3);

		// expect(wrapper.find(List)).toMatchSnapshot();
		const onPageChange: any = wrapper.find(ProductGrid).first().prop('onPageChange');

		onPageChange(5);

		expect(navigation.setParams).toHaveBeenCalledTimes(1);
		expect(navigation.setParams).toHaveBeenLastCalledWith({ page: 5 }, true);

		wrapper.unmount();
	});
});

const ProductGridWithHocNavigation1 = withPaginationWithNavigation(ProductGrid, { page: 1 });

describe('withPaginationWithNavigation', () => {
	it('should render managed list through navigation with options prop', async () => {
		const navigation: any = {
			getParam: jest.fn().mockReturnValue(3),
			setParams: jest.fn(),
		};

		const wrapper = mount(
			<BlueBaseApp plugins={[BlueBasePluginApollo, BlueBasePluginMaterialUI, Plugin]}>
				<NavigationContext.Provider value={navigation}>
					<MockedProvider
						mocks={[
							...ProductListQueryMocks.successOffset(142),
							...ProductListQueryMocks.successOffset(160),
							...ProductListQueryMocks.successOffset(172),
						]}
						addTypename={false}
					>
						<ProductGridWithHocNavigation1 />
					</MockedProvider>
				</NavigationContext.Provider>
			</BlueBaseApp>
		);

		await waitForLayout(wrapper, ProductGridWithHocNavigation1);

		expect(wrapper.find(ProductGrid).first().prop('page')).toBe(1);
		wrapper.unmount();
	});
});
