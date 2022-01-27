import { Caption, Icon } from '@bluebase/components';
import React, { useState } from 'react';

import { SliderProps } from '../Slider';
import { View } from 'react-native';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const Slider = getComponent<SliderProps>('Slider');

storiesOf('Slider', module)
	.add('All', () => {
		const Component = () => {
			const [value, setValue] = useState(0.3);
			const [value2, setValue2] = useState(0.55);

			return (
				<View>
					<View style={{ padding: 20, flexDirection: 'row', height: 50 }}>
						<Caption style={{ flex: 1, textAlign: 'center' }}>
							Value: {Math.round(value * 100)}
						</Caption>
						<Caption style={{ flex: 1, textAlign: 'center' }}>
							Value 2: {Math.round(value2 * 100)}
						</Caption>
					</View>
					<View style={{ padding: 20 }}>
						<Caption>Single + Horizontal</Caption>
						<Slider value={value} onValueChange={setValue} />
					</View>
					<View style={{ padding: 20 }}>
						<Caption>Single + Horizontal + Inverted</Caption>
						<Slider inverted value={value} onValueChange={setValue} />
					</View>
					<View style={{ padding: 20 }}>
						<Caption>Double + Horizontal</Caption>
						<Slider
							value={value}
							onValueChange={setValue}
							value2={value2}
							onValueChange2={setValue2}
							step={0.1}
						/>
					</View>
					<View style={{ padding: 20 }}>
						<Caption>Double + Horizontal + Inverted</Caption>
						<Slider
							value={value}
							onValueChange={setValue}
							value2={value2}
							onValueChange2={setValue2}
							step={0.1}
							inverted
						/>
					</View>
					<View style={{ flexDirection: 'row', paddingVertical: 24 }}>
						<View style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center' }}>
							<Caption style={{ textAlign: 'center', marginBottom: 16 }}>S+V</Caption>
							<Slider vertical height={200} value={value} onValueChange={setValue} />
						</View>
						<View style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center' }}>
							<Caption style={{ textAlign: 'center', marginBottom: 16 }}>S+V+I</Caption>
							<Slider inverted vertical height={200} value={value} onValueChange={setValue} />
						</View>
						<View style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center' }}>
							<Caption style={{ textAlign: 'center', marginBottom: 16 }}>D+V</Caption>
							<Slider
								value={value}
								onValueChange={setValue}
								value2={value2}
								onValueChange2={setValue2}
								step={0.1}
								height={200}
								vertical
							/>
						</View>
						<View style={{ flex: 1, paddingHorizontal: 16, alignItems: 'center' }}>
							<Caption style={{ textAlign: 'center', marginBottom: 16 }}>D+V+I</Caption>
							<Slider
								value={value}
								onValueChange={setValue}
								value2={value2}
								onValueChange2={setValue2}
								step={0.1}
								vertical
								height={200}
								inverted
							/>
						</View>

						{/* <Slider value={value} onValueChange={setValue} vertical height={200} />
						<Slider
							value={value}
							onValueChange={setValue}
							value2={value2}
							onValueChange2={setValue2}
							vertical
							step={0.1}
							height={200}
						/> */}
					</View>
				</View>
			);
		};

		return <Component />;
	})

	.add('Tank Sliders', () => {
		// const Thumb = (props: ThumbProps) => {
		// 	const {
		// 		direction,
		// 		thumbSize,
		// 		thumbTintColor,
		// 		thumbProps,
		// 		minimumTrackTintColor,
		// 		position,
		// 	} = props;
		// 	const { x, y } = position;

		// 	const left = x !== undefined && x - thumbSize / 2;
		// 	const top = y !== undefined && y - thumbSize / 2;

		// 	let width = thumbSize;
		// 	let height = 4;

		// 	if (direction === 'horizontal') {
		// 		width = 4;
		// 		height = thumbSize;
		// 	}

		// 	return (
		// 		<View
		// 			style={{
		// 				width,
		// 				height,
		// 				backgroundColor: thumbTintColor,
		// 				borderColor: minimumTrackTintColor,
		// 				borderRadius: 22,
		// 				left,
		// 				top,
		// 				position: 'absolute',

		// 				...(thumbProps as any),
		// 			}}
		// 		/>
		// 	);
		// };

		const TankSlider = (props: Partial<SliderProps>) => (
			<Slider
				trackWidth={40}
				sliderStyle={{ borderRadius: 8, backgroundColor: '#ccc', overflow: 'hidden' }}
				trackStyle={{ borderRadius: 0, backgroundColor: 'transparent' }}
				filledTrackStyle={{ borderRadius: 0 }}
				ThumbComponent={null as any}
				ThumbComponent2={null as any}
				{...(props as any)}
			/>
		);

		const Component = () => {
			const [value, setValue] = useState(0.3);
			const [value2, setValue2] = useState(0.55);

			return (
				<View>
					<View style={{ padding: 20, flexDirection: 'row', height: 50 }}>
						<Caption style={{ flex: 1, textAlign: 'center' }}>
							Value: {Math.round(value * 100)}
						</Caption>
						<Caption style={{ flex: 1, textAlign: 'center' }}>
							Value 2: {Math.round(value2 * 100)}
						</Caption>
					</View>
					<View style={{ padding: 20 }}>
						<Caption>Single + Horizontal</Caption>
						<TankSlider value={value} onValueChange={setValue} />
					</View>
					<View style={{ padding: 20 }}>
						<Caption>Single + Horizontal + Inverted</Caption>
						<TankSlider inverted value={value} onValueChange={setValue} />
					</View>
					<View style={{ padding: 20 }}>
						<Caption>Double + Horizontal</Caption>
						<TankSlider
							value={value}
							onValueChange={setValue}
							value2={value2}
							onValueChange2={setValue2}
							step={0.1}
						/>
					</View>
					<View style={{ padding: 20 }}>
						<Caption>Double + Horizontal + Inverted</Caption>
						<TankSlider
							value={value}
							onValueChange={setValue}
							value2={value2}
							onValueChange2={setValue2}
							step={0.1}
							inverted
						/>
					</View>
					<View style={{ flexDirection: 'row', paddingVertical: 24 }}>
						<View style={{ flex: 1, paddingHorizontal: 16 }}>
							<Caption style={{ textAlign: 'center', marginBottom: 16 }}>S + V</Caption>
							<TankSlider vertical height={200} value={value} onValueChange={setValue}>
								<Icon name="volume-high" color="#FFF" style={{ position: 'absolute', bottom: 8 }} />
							</TankSlider>
						</View>
						<View style={{ flex: 1, paddingHorizontal: 16 }}>
							<Caption style={{ textAlign: 'center', marginBottom: 16 }}>S + V + I</Caption>
							<TankSlider inverted vertical height={200} value={value} onValueChange={setValue}>
								<Icon name="blinds" color="#FFF" style={{ position: 'absolute', top: 8 }} />
							</TankSlider>
						</View>
						<View style={{ flex: 1, paddingHorizontal: 16 }}>
							<Caption style={{ textAlign: 'center', marginBottom: 16 }}>D + V</Caption>
							<TankSlider
								value={value}
								onValueChange={setValue}
								value2={value2}
								onValueChange2={setValue2}
								step={0.1}
								height={200}
								vertical
							/>
						</View>
						<View style={{ flex: 1, paddingHorizontal: 16 }}>
							<Caption style={{ textAlign: 'center', marginBottom: 16 }}>D + V + I</Caption>
							<TankSlider
								value={value}
								onValueChange={setValue}
								value2={value2}
								onValueChange2={setValue2}
								step={0.1}
								vertical
								height={200}
								inverted
							/>
						</View>

						{/* <Slider value={value} onValueChange={setValue} vertical height={200} />
						<Slider
							value={value}
							onValueChange={setValue}
							value2={value2}
							onValueChange2={setValue2}
							vertical
							step={0.1}
							height={200}
						/> */}
					</View>
				</View>
			);
		};

		return <Component />;
	})

	.add('Vertical', () => {
		const Component = () => {
			const [value, setValue] = useState(20);

			return (
				<View style={{ padding: 50, backgroundColor: 'rgba(255,0,0,.05)' }}>
					<Slider
						value={value}
						onValueChange={setValue}
						vertical
						minimumValue={16}
						maximumValue={32}
						step={1}
						height={200}
					/>
				</View>
			);
		};

		return <Component />;
	})

	.add('Label', () => {
		const Component = () => {
			const [value, setValue] = useState(0.5);

			return (
				<View style={{ padding: 50 }}>
					<Slider
						value={value}
						onValueChange={setValue}
						label="Brightness"
						showValue
						helperText="A description here"
						step={0.05}
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
					<Slider disabled value={value} onValueChange={setValue} />
				</View>
			);
		};

		return <Component />;
	})
	.add('Min + Max values', () => {
		const Component = () => {
			const [value, setValue] = useState(24);

			return (
				<View style={{ padding: 50 }}>
					<Slider
						label="Temperature"
						minimumValue={16}
						maximumValue={32}
						step={1}
						value={value}
						onValueChange={setValue}
					/>
					<Slider
						style={{ marginTop: 20 }}
						label="Temperature"
						minimumValue={16}
						maximumValue={32}
						step={1}
						value={value}
						onValueChange={setValue}
						inverted
					/>

					<View style={{ padding: 50, flexDirection: 'row' }}>
						<Slider
							label="Temperature"
							minimumValue={16}
							maximumValue={32}
							step={1}
							value={value}
							onValueChange={setValue}
							vertical
							height={200}
						/>
						<Slider
							style={{ marginTop: 20 }}
							label="Temperature"
							minimumValue={16}
							maximumValue={32}
							step={1}
							value={value}
							onValueChange={setValue}
							inverted
							vertical
							height={200}
						/>
					</View>
				</View>
			);
		};

		return <Component />;
	});
