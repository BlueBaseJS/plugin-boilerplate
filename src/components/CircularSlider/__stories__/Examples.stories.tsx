import { Button, Icon, List, Noop } from '@bluebase/components';
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import React, { useCallback, useState } from 'react';

import { CircularSlider } from '../CircularSlider';
import { HueCircularSlider } from '../../HueCircularSlider';
import { StatusIconProps } from '../../StatusIcon';
import { getComponent } from '@bluebase/core';
import storiesOf from '@bluebase/storybook-addon';

const StatusIcon = getComponent<StatusIconProps>('StatusIcon');

const Status = () => (
	<View
		style={{
			flexDirection: 'row',
			padding: 8,
			justifyContent: 'flex-end',
			alignItems: 'center',
		}}
	>
		<StatusIcon color="green" />
		<Text style={{ fontSize: 10, marginLeft: 4 }}>Online</Text>
	</View>
);

const Thermostat = () => {
	const [value, setValue] = useState(26);

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					height: 350,
					width: 350,
				}}
			>
				<CircularSlider
					value={value}
					onValueChange={setValue}
					startAngle={30}
					endAngle={330}
					step={1}
					size={350}
					maximumValue={32}
					minimumValue={16}
					minimumTrackTintColor="#3D5AFE"
				/>
				<View
					style={{
						alignItems: 'center',
						position: 'absolute',
						// borderRadius: 25,
						// height: 50,
						// top: -125,
						// width: 50,
					}}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						<Text
							style={{
								fontSize: 60,
								color: '#3D5AFE',
								textAlign: 'center',
								paddingHorizontal: 16,
							}}
						>
							{value}°
						</Text>
					</View>
					<Text style={{ color: '#555' }}>53 mins (153 Rs./hr)</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						position: 'absolute',
						bottom: 0,
					}}
				>
					<View
						style={{
							borderRadius: 25,
							borderColor: '#aaa',
							borderWidth: 1,
							width: 50,
							height: 50,
							justifyContent: 'center',
							alignItems: 'center',
							marginHorizontal: 12,
						}}
					>
						<Icon name="minus" size={24} color="#3D5AFE" />
					</View>

					<View
						style={{
							borderRadius: 25,
							borderColor: '#aaa',
							borderWidth: 1,
							width: 50,
							height: 50,
							justifyContent: 'center',
							alignItems: 'center',
							marginHorizontal: 12,
						}}
					>
						<Icon name="plus" size={24} color="#3D5AFE" />
					</View>
				</View>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					bottom: 0,
				}}
			>
				<View style={{ padding: 16 }}>
					<Text style={{ fontSize: 10, color: '#555', textAlign: 'center' }}>Indoor</Text>
					<Text style={{ fontSize: 22, color: '#555', textAlign: 'center' }}>32°</Text>
				</View>

				<View style={{ padding: 16 }}>
					<Text style={{ fontSize: 10, color: '#555', textAlign: 'center' }}>Outdoor</Text>
					<Text style={{ fontSize: 22, color: '#555', textAlign: 'center' }}>38°</Text>
				</View>
			</View>
		</View>
	);
};

const Thermostat2 = () => {
	const [value, setValue] = useState(26);

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				height: 350,
				width: 350,
			}}
		>
			<CircularSlider
				value={value}
				onValueChange={setValue}
				startAngle={30}
				endAngle={330}
				step={1}
				size={350}
				maximumValue={32}
				minimumValue={16}
				minimumTrackTintColor="#3D5AFE"
			/>
			<View
				style={{
					alignItems: 'center',
					position: 'absolute',
					// borderRadius: 25,
					// height: 50,
					// top: -125,
					// width: 50,
				}}
			>
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<View
						style={{
							borderRadius: 25,
							borderColor: '#aaa',
							borderWidth: 1,
							width: 50,
							height: 50,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Icon name="minus" size={24} color="#3D5AFE" />
					</View>
					<Text
						style={{
							fontSize: 60,
							color: '#3D5AFE',
							textAlign: 'center',
							paddingHorizontal: 16,
						}}
					>
						{value}°
					</Text>
					<View
						style={{
							borderRadius: 25,
							borderColor: '#aaa',
							borderWidth: 1,
							width: 50,
							height: 50,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Icon name="plus" size={24} color="#3D5AFE" />
					</View>
				</View>
				<Text style={{ color: '#555' }}>53 mins (153 Rs./hr)</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					position: 'absolute',
					bottom: 0,
				}}
			>
				<View style={{ padding: 16 }}>
					<Text style={{ fontSize: 10, color: '#555', textAlign: 'center' }}>Indoor</Text>
					<Text style={{ fontSize: 22, color: '#555', textAlign: 'center' }}>32°</Text>
				</View>

				<View style={{ padding: 16 }}>
					<Text style={{ fontSize: 10, color: '#555', textAlign: 'center' }}>Outdoor</Text>
					<Text style={{ fontSize: 22, color: '#555', textAlign: 'center' }}>38°</Text>
				</View>
			</View>
		</View>
	);
};

const Pills = () => (
	<View
		style={{
			// padding: 8,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<Button
			icon={{ name: 'power', type: 'icon' }}
			title="Turn Off"
			variant="outlined"
			style={{ margin: 8 }}
			size="small"
		/>
		<Button
			icon={{ name: 'snowflake', type: 'icon' }}
			title="Cool"
			variant="outlined"
			style={{ margin: 8 }}
			size="small"
		/>
		<Button
			icon={{ name: 'fan', type: 'icon' }}
			title="High"
			variant="outlined"
			style={{ margin: 8 }}
			size="small"
		/>
		{/* <Button
			icon={{ name: 'dots-horizontal', type: 'icon' }}
			title="More"
			variant="outlined"
			style={{ margin: 8 }}
			size="small"
		/> */}
	</View>
);

const Advisories = () => (
	<View>
		<FlatList
			contentContainerStyle={{ padding: 8 }}
			data={[
				{
					description: 'Awesome! You are saving lots of energy',
					key: '1',
					left: <Text style={{ fontSize: 32 }}>🍃</Text>,
					onPress: Noop as any,
					right: <Icon name="chevron-right" />,
					style: { backgroundColor: '#C8F0D9', borderRadius: 4, margin: 4 },
					title: 'Energy Ninja',
				},
				{
					description: "We're now cruising on Auto Pilot",
					key: '2',
					left: <Text style={{ fontSize: 32 }}>✈️</Text>,
					onPress: Noop as any,
					right: <Icon name="chevron-right" />,
					style: { backgroundColor: '#E7E9F9', borderRadius: 4, margin: 4 },
					title: 'Cruising...',
				},
			]}
			renderItem={useCallback(
				({ item }) => (
					<List.Item {...item} />
				),
				[]
			)}
			horizontal
		/>
	</View>
);

storiesOf('CircularSlider: Examples', module)
	.add('Air Conditioner', () => {
		const Component = () => {
			return (
				<SafeAreaView style={StyleSheet.absoluteFill}>
					<Status />

					<View
						style={{
							flexGrow: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Thermostat />
					</View>

					<Pills />

					<Advisories />
				</SafeAreaView>
			);
		};

		return <Component />;
	})
	.add('Air Conditioner 2', () => {
		const Component = () => {
			return (
				<SafeAreaView style={StyleSheet.absoluteFill}>
					<Status />

					<View
						style={{
							flexGrow: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Thermostat2 />
					</View>

					<Pills />

					<Advisories />
				</SafeAreaView>
			);
		};

		return <Component />;
	})

	.add('Dimmable Light', () => {
		const Component = () => {
			const [power, setPower] = useState(true);
			const [value, setValue] = useState(50);

			return (
				<SafeAreaView style={StyleSheet.absoluteFill}>
					<Status />

					{power ? (
						<View
							style={{
								flexGrow: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									height: 350,
									width: 350,
								}}
							>
								<CircularSlider
									value={value}
									onValueChange={setValue}
									startAngle={30}
									endAngle={330}
									step={1}
									size={350}
									maximumValue={32}
									minimumValue={16}
									// minimumTrackTintColor="#00C854"
								/>
								<View
									style={{
										alignItems: 'center',
										position: 'absolute',
										// borderRadius: 25,
										// height: 50,
										// top: -125,
										// width: 50,
									}}
								>
									<TouchableWithoutFeedback onPress={useCallback(() => setPower(!power), [])}>
										<View
											style={{
												borderRadius: 100,
												// borderColor: '#fff',
												// borderWidth: 1,
												width: 200,
												height: 200,
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: power ? '#00C854' : '#F54336',
											}}
										>
											<Icon name="power" size={50} color="#fff" />
										</View>
									</TouchableWithoutFeedback>
								</View>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'center',
										position: 'absolute',
										bottom: 0,
									}}
								>
									<View
										style={{
											borderRadius: 25,
											borderColor: '#aaa',
											borderWidth: 1,
											width: 50,
											height: 50,
											justifyContent: 'center',
											alignItems: 'center',
											marginHorizontal: 12,
										}}
									>
										<Icon name="minus" size={24} />
									</View>

									<View
										style={{
											borderRadius: 25,
											borderColor: '#aaa',
											borderWidth: 1,
											width: 50,
											height: 50,
											justifyContent: 'center',
											alignItems: 'center',
											marginHorizontal: 12,
										}}
									>
										<Icon name="plus" size={24} />
									</View>
								</View>
							</View>
						</View>
					) : (
						<View
							style={{
								flexGrow: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<TouchableWithoutFeedback onPress={useCallback(() => setPower(!power), [])}>
								<View
									style={{
										borderRadius: 100,
										// borderColor: '#fff',
										// borderWidth: 1,
										width: 200,
										height: 200,
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: power ? '#00C854' : '#F54336',
									}}
								>
									<Icon name="power" size={50} color="#fff" />
								</View>
							</TouchableWithoutFeedback>
						</View>
					)}

					<Advisories />
				</SafeAreaView>
			);
		};

		return <Component />;
	})

	.add('Color Light', () => {
		const Component = () => {
			const [power, setPower] = useState(true);
			const [value, setValue] = useState(200);
			const [brightness, setBrightness] = useState(100);

			return (
				<SafeAreaView style={StyleSheet.absoluteFill}>
					<Status />

					{power ? (
						<View
							style={{
								flexGrow: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									height: 350,
									width: 350,
								}}
							>
								<View
									style={{
										alignItems: 'center',
										position: 'absolute',
										height: 350,
										width: 350,
									}}
								>
									<CircularSlider
										value={brightness}
										onValueChange={setBrightness}
										startAngle={130}
										endAngle={230}
										step={1}
										size={350}
										maximumValue={0}
										minimumValue={100}
										axis="+y"
										trackWidth={12}
										trackProps={{ strokeLinecap: 'round' }}
										// minimumTrackTintColor="#00C854"
									/>
								</View>

								<HueCircularSlider
									value={value}
									onValueChange={setValue}
									startAngle={60}
									endAngle={300}
									size={350}
									thumbStyle={{
										borderColor: `hsl(${value}, 100%, 50%)`,
									}}
								/>

								<View
									style={{
										// alignItems: 'center',
										// justifyContent: 'center',
										position: 'absolute',
									}}
								>
									<TouchableWithoutFeedback onPress={useCallback(() => setPower(!power), [])}>
										<View
											style={{
												borderRadius: 75,
												height: 150,
												width: 150,
												justifyContent: 'center',
												alignItems: 'center',
												backgroundColor: power ? `hsl(${value}, 100%, 50%)` : '#F54336',
											}}
										>
											<Icon name="power" size={50} color="#fff" />
										</View>
									</TouchableWithoutFeedback>
								</View>
							</View>
						</View>
					) : (
						<View
							style={{
								flexGrow: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<TouchableWithoutFeedback onPress={useCallback(() => setPower(!power), [])}>
								<View
									style={{
										borderRadius: 75,
										height: 150,
										width: 150,
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: power ? `hsl(${value}, 100%, 50%)` : '#F54336',
									}}
								>
									<Icon name="power" size={50} color="#fff" />
								</View>
							</TouchableWithoutFeedback>
						</View>
					)}

					<Advisories />
				</SafeAreaView>
			);
		};

		return <Component />;
	});
