const mockGetDimensions = jest.fn().mockReturnValue({
	height: 1200,
	width: 1200,
});

jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
	const DimentsionsActual = jest.requireActual('react-native/Libraries/Utilities/Dimensions');
	return class extends DimentsionsActual {
		static get: jest.Mock = mockGetDimensions;
	};
});

import 'cross-fetch/polyfill';

import { BlueBaseApp, getComponent } from '@bluebase/core';
import { FlatList, View } from 'react-native';
import React, { useCallback } from 'react';

import BlueBasePluginApollo from '@bluebase/plugin-apollo';
import { ListCarouselProps } from '../ListCarousel';
import { ListCarouselToolbar } from '../ListCarouselToolbar';
import MaterialUiPlugin from '@bluebase/plugin-material-ui';
import { MockedProvider } from '@apollo/client/testing';
import Plugin from '../../../index';
import { ProductListQueryMocks } from '../../GraphqlList/__artifacts__/mocks';
import ResponsiveListSizingPlugin from '@bluebase/plugin-responsive-grid';
import { ResponsiveListSizingProps } from '../../ResponsiveListSizing';
import { mount } from 'enzyme';
// import { success } from '../__stories__/mocks';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [BlueBasePluginApollo, MaterialUiPlugin, Plugin, ResponsiveListSizingPlugin];
const ResponsiveListSizing = getComponent<ResponsiveListSizingProps>('ResponsiveListSizing');

const ListCarousel = getComponent<ListCarouselProps>('ListCarousel');

jest.mock('expo', () => ({}));

describe('ProductCarousel', () => {
	it('should render a ListCarouselToolbar & ListCarousel', async () => {
		const FakeGQLListComponent = (props: any) => {
			return <View {...props} />;
		};

		// mount
		const wrapper = mount(
			<BlueBaseApp plugins={plugins} components={{ ResponsiveListSizing }}>
				<MockedProvider mocks={ProductListQueryMocks.success()} addTypename={false}>
					<ListCarousel
						title="Air Conditioners"
						GraphqlListComponent={FakeGQLListComponent as any}
					/>
				</MockedProvider>
			</BlueBaseApp>
		);

		// Wait for Grid
		await waitForElement(wrapper, ListCarousel);

		expect(wrapper.find(FakeGQLListComponent).exists()).toBe(true);

		const moveBack = wrapper.find(ListCarouselToolbar).prop('moveBack');
		const moveNext = wrapper.find(ListCarouselToolbar).prop('moveNext');

		// Test move Next
		expect(moveBack()).toBeUndefined();
		expect(moveNext()).toBeUndefined();

		wrapper.unmount();
	});

	it('should move scroll index on moveNext and moveback Function', async () => {
		const mockScrollToIndex = jest.fn();
		// tslint:disable-next-line: max-classes-per-file
		class MockFlatList extends FlatList<any> {
			scrollToIndex: (opts: any) => void = (opts: any) => {
				// super.scrollToIndex(opts);
				mockScrollToIndex(opts);
			};
		}

		const FakeGQLListComponent = (props: any) => {
			const ListComponent = props.ListComponent;
			return (
				<ListComponent
					{...props}
					data={[{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }]}
					renderItem={useCallback(
						({ item }: any) => (
							<View {...item} />
						),
						[]
					)}
				/>
			);
		};

		const wrapper = mount(
			<BlueBaseApp plugins={plugins} components={{ ResponsiveListSizing }}>
				<MockedProvider mocks={ProductListQueryMocks.success()} addTypename={false}>
					<ListCarousel
						title="Air Conditioners"
						GraphqlListComponent={FakeGQLListComponent as any}
						BaseListComponent={MockFlatList}
					/>
				</MockedProvider>
			</BlueBaseApp>
		);

		// await waitForGrid(wrapper);

		// Wait for Grid
		await waitForElement(wrapper, MockFlatList);

		expect(wrapper.find(MockFlatList).exists()).toBe(true);

		expect(wrapper.find(MockFlatList).prop('numColumns')).toEqual(1);

		const onViewableItemsChanged: any = wrapper.find(MockFlatList).prop('onViewableItemsChanged');
		const moveNext = wrapper.find(ListCarouselToolbar).prop('moveNext');
		const moveBack = wrapper.find(ListCarouselToolbar).prop('moveBack');

		// Change viewable items
		let index = onViewableItemsChanged({
			viewableItems: [{ index: 0 }, { index: 1 }, { index: 2 }],
		});
		expect(index).toBe(0);
		wrapper.update();

		// Test move Next
		index = moveNext();
		expect(index).toBe(3);
		expect(mockScrollToIndex).toHaveBeenLastCalledWith({ animated: true, index: 2 });

		// Change viewable items
		index = onViewableItemsChanged({
			viewableItems: [{ index: 3 }, { index: 4 }],
		});
		expect(index).toBe(3);
		wrapper.update();

		// Test move Next
		index = moveNext();
		expect(index).toBe(4);
		expect(mockScrollToIndex).toHaveBeenLastCalledWith({ animated: true, index: 4 });

		// Test move Back
		index = moveBack();
		expect(index).toBe(1);
		expect(mockScrollToIndex).toHaveBeenLastCalledWith({ animated: true, index: 1 });

		// Change viewable items
		index = onViewableItemsChanged({
			viewableItems: [{ index: 0 }, { index: 1 }, { index: 2 }],
		});
		expect(index).toBe(0);
		wrapper.update();

		// Test move Back
		index = moveBack();
		expect(index).toBe(0);
		expect(mockScrollToIndex).toHaveBeenLastCalledWith({ animated: true, index: 1 });

		// // Change viewable items
		// index = onViewableItemsChanged({
		// 	viewableItems: [{ index: 4 }],
		// });
		// expect(index).toBe(4);

		// // Test move Next
		// index = moveNext();
		// expect(index).toBe(4);
		// expect(scrollToIndex).toHaveBeenLastCalledWith({ animated: true, index: 4 });

		// wrapper.update();
		// expect(numColumns).toEqual(3);
		// expect(index).toEqual(3);
		// // Test move back
		// moveBack();
		// expect(index).toEqual(0);
		// moveNext();
		// moveNext();
		// expect(index).toEqual(6);
		// // Test move back if index is not at 0
		// moveBack();
		// expect(index).toEqual(3);
		// expect(getColumns()).toBe(3);
		// // Test if index at where numColuumns are greater than remaining items
		// index = 6;
		// moveNext();
		// expect(index).toEqual(7);
		// index = 11;
		// moveNext();

		// // Manually scroll to index

		// onViewableItemsChanged({
		// 	viewableItems: [{ index: 3 }],
		// });
		// expect(index).toBe(3);

		wrapper.unmount();
	});
});
