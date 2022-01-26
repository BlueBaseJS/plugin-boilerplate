import { Button, ListItem, View } from '@bluebase/components';
import React, { useState } from 'react';

import { CityPicker } from '../CityPicker';
import { areas } from './areas';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('CityPicker', module).add('Dialog Example', () =>
	React.createElement(() => {
		const [open, setOpen] = useState(false);
		const [city, setCity] = useState(null);

		return (
			<View style={{ flex: 1 }}>
				<ListItem
					title={city}
					right={
						<Button
							title="Click"
							onPress={() => {
								setOpen(!open);
							}}
						/>
					}
				/>

				<CityPicker
					items={areas}
					style={{ height: 300, width: 300 }}
					mode="dialog"
					onDismiss={() => {
						setOpen(!open);
					}}
					onSelectCity={selection => {
						setCity(selection[1].displayName);
						setOpen(false);
					}}
					open={open}
				/>
			</View>
		);
	})
);

storiesOf('CityPicker', module).add('dropdown Example', () =>
	React.createElement(() => {
		const [open, setOpen] = useState(false);
		const [city, setCity] = useState(null);

		return (
			<View style={{ flex: 1 }}>
				<ListItem
					title={city}
					right={
						<Button
							title="Click"
							onPress={() => {
								setOpen(!open);
							}}
						/>
					}
				/>

				<CityPicker
					items={areas}
					style={{ height: 300, width: 300 }}
					mode="dropdown"
					onDismiss={() => {
						setOpen(!open);
					}}
					onSelectCity={selection => {
						setCity(selection[1].displayName);
						setOpen(false);
					}}
					open={open}
				/>
			</View>
		);
	})
);
