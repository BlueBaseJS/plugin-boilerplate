import { BlueBaseApp } from '@bluebase/core';
import BlueBaseRnPlaceholder from '@bluebase/plugin-rn-placeholder';
import { PlaceholderLine } from 'rn-placeholder';
import Plugin from '../../..';
import React from 'react';
import { SpecificationGroup } from '../SpecificationGroup';
import { SpecificationItem } from '../SpecificationItem';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const plugins = [BlueBaseRnPlaceholder, Plugin];

const specs = [
	{
		label: 'SIM Size',
		value: 'Nano SIM',
	},
	{
		label: 'Removable Battery',
		value: 'No',
	},
	{
		label: 'Other Features',
		value:
			// eslint-disable-next-line max-len
			'Face Unlock, Dual App Support, USB Type C, Kryo 4 Architecture, Fingerprint Scanner Position: Side, Quick Charging Version: Supports Upto 27W',
	},
];

describe('SpecificationGroup', () => {
	it('should render content', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<SpecificationGroup title="Other Details" items={specs} />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'SpecificationGroup');

		expect(
			wrapper
				.find('H4[testID="specification-group-title"]')
				.last()
				.text()
		).toBe('Other Details');

		expect(wrapper.find(SpecificationItem).length).toBe(3);
	});

	it('should show loading state', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={plugins}>
				<SpecificationGroup loading />
			</BlueBaseApp>
		);

		await waitForElement(wrapper, 'SpecificationGroup');

		expect(wrapper.find(PlaceholderLine).length).toBeGreaterThan(0);

		wrapper.unmount();
	});
});
