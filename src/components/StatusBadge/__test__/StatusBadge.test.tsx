import { BlueBaseApp, getComponent } from '@bluebase/core';

import Plugin from '../../../index';
import React from 'react';
import { StatusBadgeProps } from '../StatusBadge';
import { mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';

const StatusBadge = getComponent<StatusBadgeProps>('StatusBadge');

describe('StatusBadge', () => {
	it('should check if variants are showing without variant array', async () => {
		const wrapper = mount(
			<BlueBaseApp plugins={[Plugin, require('@bluebase/plugin-material-ui')]}>
				<StatusBadge title="Open" />
			</BlueBaseApp>
		);
		await waitForElement(wrapper, 'StatusBadge');
		expect(
			wrapper
				.find('Text')
				.last()
				.text()
		).toBe('Open');
	});
});
