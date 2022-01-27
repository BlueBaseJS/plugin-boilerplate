import React, { useState } from 'react';

import { CircularSlider } from '../CircularSlider';
import { View } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CircularSlider', module)
	.add('1 Handle', () => {
		const Component = () => {
			const [value, setValue] = useState(0.5);

			return (
				<View style={{ padding: 50 }}>
					<CircularSlider value={value} onValueChange={setValue} startAngle={60} endAngle={300} />
				</View>
			);
		};

		return <Component />;
	})
	.add('2 Handles', () => {
		const Component = () => {
			const [value, setValue] = useState(0);
			const [value2, setValue2] = useState(0.75);

			return (
				<View style={{ padding: 50 }}>
					<CircularSlider
						value={value}
						onValueChange={setValue}
						value2={value2}
						onValueChange2={setValue2}
						startAngle={60}
						endAngle={300}
						step={0.1}
					/>
				</View>
			);
		};

		return <Component />;
	})
	.add('Disabled state', () => {
		const Component = () => {
			const [value, setValue] = useState(0.5);

			return (
				<View style={{ padding: 50 }}>
					<CircularSlider
						disabled
						value={value}
						onValueChange={setValue}
						startAngle={60}
						endAngle={300}
					/>
				</View>
			);
		};

		return <Component />;
	});
