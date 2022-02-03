import React, { useState } from 'react';

import { HueCircularSlider } from '../HueCircularSlider';
import { View } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('HueCircularSlider', module).add('Color Slider', () => {
	const Component = () => {
		const [value, setValue] = useState(180);

		return (
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					// padding: 50,
					// width: 200,
					// height: 200,
				}}
			>
				<HueCircularSlider value={value} onValueChange={setValue} startAngle={30} endAngle={330} />
				<View
					style={{
						backgroundColor: `hsl(${value}, 100%, 50%)`,
						borderRadius: 25,
						height: 50,
						// top: -125,
						width: 50,
					}}
				/>
			</View>
		);
	};

	return <Component />;
});
