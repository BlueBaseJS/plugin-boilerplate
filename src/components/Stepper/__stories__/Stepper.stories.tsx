import React, { useCallback, useState } from 'react';

import { Button } from '@bluebase/components';
import { SafeAreaView } from 'react-native';
import { StepperProps } from '..';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const Stepper = getComponent<StepperProps>('Stepper');

const onChangeValue = (value: number | null) => {
	console.log(value);
};

storiesOf('Stepper', module)
	.add('Basic Example', () => (
		<SafeAreaView style={{ alignItems: 'flex-start' }}>
			<Stepper value={1} onChangeValue={onChangeValue} />
		</SafeAreaView>
	))
	.add('Loading', () => (
		<SafeAreaView style={{ alignItems: 'flex-start' }}>
			<Stepper loading value={1} onChangeValue={onChangeValue} />
		</SafeAreaView>
	))
	.add('with max, min and step', () => (
		<SafeAreaView style={{ alignItems: 'flex-start' }}>
			<Stepper max={8} value={6} min={4} step={2} onChangeValue={onChangeValue} />
		</SafeAreaView>
	))
	.add('value 16, max 8', () => (
		<SafeAreaView style={{ alignItems: 'flex-start' }}>
			<Stepper max={8} value={16} min={4} step={2} onChangeValue={onChangeValue} />
		</SafeAreaView>
	))
	.add('error state', () => (
		<SafeAreaView style={{ alignItems: 'flex-start' }}>
			<Stepper value={14} error helperText="An Error Occurred!" onChangeValue={onChangeValue} />
		</SafeAreaView>
	))
	.add('disabled state', () => (
		<SafeAreaView style={{ alignItems: 'flex-start' }}>
			<Stepper value={14} disabled onChangeValue={onChangeValue} />
		</SafeAreaView>
	))
	.add('should update value when a new prop is passed', () => {
		const Example = () => {
			const [inc, setInc] = useState(2);
			return (
				<SafeAreaView style={{ alignItems: 'flex-start' }}>
					<Button title="+" variant="outlined" onPress={useCallback(() => setInc(inc + 1), [])} />
					<Stepper value={inc} max={5} />
					<Button title="-" variant="outlined" onPress={useCallback(() => setInc(inc - 1), [])} />
				</SafeAreaView>
			);
		};

		return <Example />;
	});
