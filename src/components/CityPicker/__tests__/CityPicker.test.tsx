/* eslint-disable react/jsx-no-bind */
import { BlueBase, BlueBaseApp, getComponent } from '@bluebase/core';

import BootOptions from '../../../../boot';
import { CityPickerProps } from '../CityPicker';
import React from 'react';
import { areas } from '../__stories__/areas';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const CityPicker = getComponent<CityPickerProps>('CityPicker');

const BBWrapper = ({ children }: any) => (
	<BlueBaseApp
		{...BootOptions}
		filters={{
			'bluebase.boot.end': async (_b: any, _c: any, BB: BlueBase) => {
				await BB.Components.register('Link', ({ children: c }: any) => c);
			},
		}}
	>
		{children}
	</BlueBaseApp>
);

describe('CityPicker', () => {
	it('should render CityPicker with Items', async () => {
		const onSelect = jest.fn();
		const wrapper = mount(
			<BBWrapper>
				<CityPicker onDismiss={() => {}} items={areas} onSelectCity={onSelect} open />
			</BBWrapper>
		);

		await waitForElement(wrapper, CityPicker);
		const cities: any = wrapper
			.find('CityPicker')
			.first()
			.prop('items');
		expect(cities).toHaveLength(1475);

		wrapper.unmount();
	});
	it('should render CityPicker and Call function when city select', async () => {
		const onSelect = jest.fn();
		const wrapper = mount(
			<BBWrapper>
				<CityPicker onDismiss={() => {}} items={areas} onSelectCity={onSelect} open />
			</BBWrapper>
		);

		await waitForElement(wrapper, CityPicker);
		const onSelectCity: any = wrapper
			.find('CityPicker')
			.first()
			.prop('onSelectCity');
		onSelectCity();
		expect(onSelect).toBeCalled();
		wrapper.unmount();
	});
	it('should render CityPicker dropdown with Items', async () => {
		const onSelect = jest.fn();
		const wrapper = mount(
			<BBWrapper>
				<CityPicker
					mode="dropdown"
					onDismiss={() => {}}
					items={areas}
					onSelectCity={onSelect}
					open
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, CityPicker);
		const cities: any = wrapper
			.find('CityPicker')
			.first()
			.prop('items');
		expect(cities).toHaveLength(1475);

		wrapper.unmount();
	});
	it('should render CityPicker dropdown with Items on Web', async () => {
		jest.mock('react-native/Libraries/Utilities/Platform', () => {
			const Platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
			Platform.OS = 'web';
			return Platform;
		});
		const onSelect = jest.fn();
		const wrapper = mount(
			<BBWrapper>
				<CityPicker
					mode="dropdown"
					onDismiss={() => {}}
					items={areas}
					onSelectCity={onSelect}
					open
				/>
			</BBWrapper>
		);

		await waitForElement(wrapper, CityPicker);
		const cities: any = wrapper
			.find('CityPicker')
			.first()
			.prop('items');
		expect(cities).toHaveLength(1475);

		wrapper.unmount();
	});
});
