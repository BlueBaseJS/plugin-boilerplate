import React, { useState } from 'react';

import { GradientCircularSlider } from '../GradientCircularSlider';
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

storiesOf('GradientCircularSlider', module)
	.add('Hue Color Slider', () => {
		const Component = () => {
			const [value, setValue] = useState(180);

			console.log('value', value);
			return (
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						// padding: 50,
						// width: 300,
						// height: 300,
					}}
				>
					<GradientCircularSlider
						colors={['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00']}
						value={value}
						onValueChange={setValue}
						startAngle={30}
						endAngle={330}
						// size={250}
						minimumValue={0}
						maximumValue={360}
					/>
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
	})

	.add('Kelvin Color Slider', () => {
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
					<GradientCircularSlider
						colors={[
							'rgb(255,106,0)',
							'rgb(255,159,65)',
							'rgb(255,191,131)',
							'rgb(255,214,177)',
							'rgb(255,232,214)',
							'rgb(255,245,244)',
							'rgb(241,241,255)',
							'rgb(224,231,255)',
						]}
						// size={250}
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
