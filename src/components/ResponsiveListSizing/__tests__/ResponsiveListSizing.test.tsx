const mockGetDimensions = jest.fn().mockReturnValue({
	height: 800,
	width: 300,
});

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
	const DimentsionsActual = jest.requireActual('react-native/Libraries/Utilities/Dimensions');
	return class extends DimentsionsActual {
		static get: jest.Mock = mockGetDimensions;
	};
});

import { BlueBaseApp } from '@bluebase/core';
import React from 'react';
import { ResponsiveListSizing } from '../index';
import { View } from 'react-native';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const Box = () => {
	return (
		<ResponsiveListSizing>
			{(sizes) => (
				<View testID="container" style={{ width: sizes.containerWidth }}>
					<View testID="item" style={{ width: sizes.itemWidth }} />
				</View>
			)}
		</ResponsiveListSizing>
	);
};

describe('ResponsiveListSizing', () => {
	it('should return sizes on desktop', async () => {
		mockGetDimensions.mockReturnValue({
			height: 1200,
			width: 1200,
		});

		const wrapper = mount(
			<BlueBaseApp>
				<Box />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, Box);

		const onLayout = (wrapper as any)
			.find(Box)
			.find('[testID="list-sizing-main"]')
			.first()
			.prop('onLayout');

		onLayout({
			nativeEvent: {
				layout: {
					width: 1200,
				},
			},
		});

		wrapper.update();

		expect(
			(wrapper as any).find(Box).find('[testID="container"]').first().prop('style').width
		).toBe(1140);

		expect((wrapper as any).find(Box).find('[testID="item"]').first().prop('style').width).toBe(
			171.33333333333334
		);
	});

	it('should return sizes on mobile', async () => {
		mockGetDimensions.mockReturnValue({
			height: 800,
			width: 300,
		});

		const wrapper = mount(
			<BlueBaseApp>
				<Box />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, '[testID="list-sizing-main"]');

		const onLayout = (wrapper as any)
			.find(Box)
			.find('[testID="list-sizing-main"]')
			.first()
			.prop('onLayout');

		onLayout({
			nativeEvent: {
				layout: {
					width: 300,
				},
			},
		});

		wrapper.update();

		expect(
			(wrapper as any).find(Box).find('[testID="container"]').first().prop('style').width
		).toBe('100%');

		expect((wrapper as any).find(Box).find('[testID="item"]').first().prop('style').width).toBe(
			126
		);
	});
});
