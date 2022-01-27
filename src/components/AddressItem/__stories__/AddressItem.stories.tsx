/* eslint-disable react/jsx-no-bind */
import { AddressItem } from '../AddressItem';
import React from 'react';
import { SafeAreaView } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';


// added latest stories
storiesOf('AddressItem', module)
	.add('Basic Example', () => (
		<SafeAreaView>
			<AddressItem
				name="John Doe"
				address1={`540 A, Street 4, Zahoor Ilahi Road `}
				phone="+921234567890"
				email="commi@blueeast.com"
				city=" Lahore "
				province="Punjab"
				country="Pakistan"
				area="12535"
				onPress={() => {
					console.log('Pressed');
				}}
			/>
		</SafeAreaView>
	))
	.add('Without phone number and email', () => (
		<AddressItem
			name="COMMI Checkout"
			address1="H # 123, St # 123 , ABCD"
			onPress={() => {
				console.log('Pressed');
			}}
		/>
	))
	.add('Without name prop only', () => (
		<AddressItem
			address1="Use same shipping address"
			onPress={() => {
				console.log('Pressed');
			}}
		/>
	))
	.add('Disable edit button', () => (
		<AddressItem
			address1="Use same shipping address"
			showEditButton={false}
			onPress={() => {
				console.log('Pressed');
			}}
		/>
	))
	.add('AddressItemSkeleton', () => (
		<>
			<AddressItem
				name="John Doe"
				address1={`540 A, Street 4, Zahoor Ilahi Road `}
				phone="+921234567890"
				email="commi@blueeast.com"
				city=" Lahore "
				province="Punjab"
				country="Pakistan"
				area="12535"
				onPress={() => {
					console.log('Pressed');
				}}
			/>
			<AddressItem loading />
		</>
	));
