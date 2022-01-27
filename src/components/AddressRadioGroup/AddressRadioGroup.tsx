import { Divider, Radio, View } from '@bluebase/components';
import { Theme, useStyles } from '@bluebase/core';

import { Address } from '../../graphql/types';
import { AddressItem } from '../AddressItem';
import React from 'react';
import { ViewStyle } from 'react-native';
import { noop } from '../../helpers';

interface AddressRadioGroupStyles {
	item: ViewStyle;
}

export interface AddressRadioGroupProps {
	/** Selected address id */
	value?: string;
	onValueChange?: (value: string) => void;
	loading?: boolean;
	items?: Address[];
	styles?: Partial<AddressRadioGroupStyles>;
}

export interface AddressRadioGroupState {
	value?: string;
}

const defaultStyles = (theme: Theme): AddressRadioGroupStyles => ({
	item: {
		paddingLeft: theme.spacing.unit,
	},
});

export const AddressRadioGroup = (props: AddressRadioGroupProps) => {

	const { value, items, onValueChange, loading } = props;
	const styles = useStyles('AddressRadioGroup', props, defaultStyles);

	const address = items!.find(x => x.id === value);

	const selectIndex = (value: string) => () => {
		onValueChange!(value);
	};

	if (loading) {
		const items = [0, 1];
		return items.map((i: number) => (
			<React.Fragment key={i}>
				<AddressItem loading />
				{i < items.length - 1 ? <Divider inset /> : null}
			</React.Fragment>
		));
	}

	return items!.map((item: any, index: number) => {
		const { name, address1, phone, city, area, province } = item.node;
		return (
			<React.Fragment key={item.id}>
				<AddressItem
					name={name}
					address1={address1}
					phone={phone}
					city={city}
					area={area}
					province={province}
					showEditButton={false}
					left={
						<View style={{ marginHorizontal: 10 }}>
							<Radio
								checked={address && address.id === item.id}
								value={item.id}
								onValueChange={selectIndex(item.id)}
							/>
						</View>
					}
					style={styles.item}
					onPress={selectIndex(item.id)}
				/>
				{index < items!.length - 1 ? <Divider inset /> : null}
			</React.Fragment>
		);
	}) as any;
};

AddressRadioGroup.displayName = 'AddressRadioGroup';
AddressRadioGroup.defaultProps = {
	items: [],
	loading: false,
	onValueChange: noop,
};
