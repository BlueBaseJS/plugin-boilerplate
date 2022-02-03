import React, { useState } from 'react';

import { KelvinCircularSlider } from '../KelvinCircularSlider';
import { View } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

function clamp(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max);
}

function kelvinToRgb(kelvin: number) {
	const temp = kelvin / 100;
	let r, g, b;

	if (temp < 66) {
		r = 255;
		g =
			-155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * Math.log(g);
		b =
			temp < 20
				? 0
				: -254.76935184120902 +
				  0.8274096064007395 * (b = temp - 10) +
				  115.67994401066147 * Math.log(b);
	} else {
		r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * Math.log(r);
		g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * Math.log(g);
		b = 255;
	}

	return {
		r: clamp(Math.floor(r), 0, 255),
		g: clamp(Math.floor(g), 0, 255),
		b: clamp(Math.floor(b), 0, 255),
	};
}

storiesOf('KelvinCircularSlider', module).add('Color Slider', () => {
	const Component = () => {
		const [value, setValue] = useState(180);

		const { r, g, b } = kelvinToRgb(value);

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
				<KelvinCircularSlider
					value={value}
					onValueChange={setValue}
					minimumValue={1500}
					maximumValue={9000}
					startAngle={30}
					endAngle={330}
				/>
				<View
					style={{
						backgroundColor: `rgb(${r}, ${g}, ${b})`,
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
