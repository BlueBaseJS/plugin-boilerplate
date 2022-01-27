import { Body2, IconButton, List, ListItemProps } from '@bluebase/components';
import { Omit, Theme, isMobile, useStyles } from '@bluebase/core';
import React, { useMemo } from 'react';
import { or, renderIfNotNil } from '../../helpers';

import { PlaceholderListItem } from '../../imports';
import { TextStyle } from 'react-native';

interface AddressItemStyles {
	description: TextStyle;
	descriptionText: TextStyle;
	icon: TextStyle;
	threeOrMoreLines: TextStyle;
	threeOrMoreLinesIcon: TextStyle;
}

export interface AddressItemProps extends Omit<ListItemProps, 'title' | 'description'> {
	name?: string;
	onPress?: () => void;
	showEditButton?: boolean;
	address1?: string;
	city?: string;
	province?: string;
	country?: string;
	area?: string;
	phone?: string;
	email?: string;
	loading?: boolean;
	styles?: Partial<AddressItemStyles>;
}

const defaultStyles = (theme: Theme): AddressItemStyles => ({
	description: {
		flexDirection: 'column',
	},
	descriptionText: {
		color: theme.palette.text.secondary,
		paddingVertical: theme.spacing.unit / 4,
	},
	icon: {
	},
	threeOrMoreLines: {
		alignItems: 'flex-start',
	},
	threeOrMoreLinesIcon: {
		marginVertical: theme.spacing.unit
	},
});

export const AddressItem = (props: AddressItemProps) => {

	const {
		name,
		area,
		address1,
		city,
		country,
		province,
		email,
		phone,
		showEditButton,
		onPress,
		loading,
		style,
		...rest
	}: AddressItemProps = props;

	if (loading === true) {
		return <PlaceholderListItem avatar variant="icon" description />;
	}

	const styles = useStyles('AddressItem', props, defaultStyles);

	const address = useMemo(() => (
		[address1, area, city, province, country]
			// remove undefined or null values
			.filter(x => !!x)

			// trim to remove whitespace
			.map(x => (x as string).trim())

			// create a comma seperated string
			.join(', ')
	), [address1, area, city, province, country]);

	const hasThreeOrMoreLines = useMemo(() => {
		let lines = 0;

		if (name) {
			lines = lines + 1;
		}

		if (address) {
			lines = lines + 1;
		}

		if (email) {
			lines = lines + 1;
		}

		if (phone) {
			lines = lines + 1;
		}

		return lines > 2;
	}, [address, name, email, phone]);

	const hasEditButton = !isMobile() && !!showEditButton;

	return (
		<List.Item
			title={name}
			description={
				<Body2 style={styles.description}>
					<Body2 style={styles.descriptionText} testID="address-item-description">
						{address}{'\n'}
					</Body2>
					{renderIfNotNil(phone, (
						<Body2 testID="address-item-phone" style={styles.descriptionText}>
							{phone}{'\n'}
						</Body2>
					))}
					{renderIfNotNil(email, (
						<Body2 testID="address-item-email" style={styles.descriptionText}>
							{email}
						</Body2>
					))}
				</Body2>
			}
			left={
				<List.Icon
					name="map-marker"
					style={{ ...styles.icon, ...or(hasThreeOrMoreLines, styles.threeOrMoreLinesIcon) }}
				/>
			}
			right={renderIfNotNil(hasEditButton, <IconButton name="pencil" size={20} onPress={onPress!} />)}
			{...rest}
			style={{ ...style, ...or(hasThreeOrMoreLines, styles.threeOrMoreLines) }}
			onPress={onPress}
		/>
	);
};

AddressItem.displayName = 'AddressItem';
AddressItem.defaultProps = {
	loading: false,
	showEditButton: true,
};
