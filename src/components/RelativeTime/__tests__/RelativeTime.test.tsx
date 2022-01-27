import React from 'react';
import { RelativeTime } from '../RelativeTime';
import { Text } from 'react-native';
import mockdate from 'mockdate';
import { mount } from 'enzyme';

jest.useFakeTimers();
// Jest doesn't mock Date
// https://github.com/facebook/jest/issues/2684
// So we are using mockdate to solve this problem to fast forward time

describe('RelativeTime', () => {
	it('should accept time in milliseconds', async () => {
		const wrapper = mount(<RelativeTime component={Text} time={Date.now()} />);

		expect(
			wrapper
				.find('RelativeTime')
				.last()
				.text()
		).toBe('0s');

		wrapper.unmount();
	});

	it('should accept time as undefined', async () => {
		const date = new Date();
		const wrapper = mount(<RelativeTime component={Text} time={date.toString()} />);

		expect(
			wrapper
				.find('RelativeTime')).toBeDefined();

		wrapper.unmount();
	});

	it('should accept time as a string', async () => {
		const wrapper = mount(<RelativeTime component={Text} time="2018-01-01 13:03:56" />);

		expect(
			wrapper
				.find('RelativeTime')
				.last()
				.text()
		).toBe('Jan 1, 2018');

		wrapper.unmount();
	});

	it('should render when time changes', () => {
		// Create Initial time
		const time = Date.now();

		// Mount component
		const wrapper = mount(<RelativeTime component={Text} time={time} />);

		// Check initial render
		expect(
			wrapper
				.find('RelativeTime')
				.last()
				.text()
		).toBe('0s');

		// Fast forward time by 1 minute
		mockdate.set(time + 60000);

		// Make sure timeout executes
		jest.advanceTimersByTime(1000);

		// Update tree
		wrapper.update();

		// Test current status
		expect(
			wrapper
				.find('RelativeTime')
				.last()
				.text()
		).toBe('1m');

		// Fast forward time by 5 minutes
		mockdate.set(time + 300000);

		// Make sure timeout executes
		jest.advanceTimersByTime(1000);

		// Update tree
		wrapper.update();

		// Test current status
		expect(
			wrapper
				.find('RelativeTime')
				.last()
				.text()
		).toBe('5m');

		// Wrap up
		wrapper.unmount();
		mockdate.reset();
	});
});
