import { Body1, Body2, Dialog, DialogProps, Divider, H6, List } from '@bluebase/components';
import React, { useCallback } from 'react';

import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import { useTheme } from '@bluebase/core';

export interface ActionSheetProps extends ActionSheetOptions, Omit<DialogProps, 'children'> {
	callback: (buttonIndex: number) => void;
}

export const ActionSheetDesktop = (props: ActionSheetProps) => {
	const { theme } = useTheme();
	const {
		options,
		title,
		message,
		callback,
		destructiveButtonIndex,
		titleTextStyle,
		messageTextStyle,
		showSeparators,
		separatorStyle,
		textStyle,
		tintColor,
		icons = [],
		visible,
		onDismiss,
		dismissable,
	} = props;

	function createButton(option: string, index: number): React.ReactElement {
		const cb = useCallback(() => callback(index), []);
		const color = destructiveButtonIndex === index ? theme.palette.error.main : tintColor;

		return (
			<List.Item
				key={`${option}-${index}`}
				title={<Body1 style={{ color, ...textStyle }}>{option}</Body1>}
				onPress={cb}
				left={icons[index]}
			/>
		);
	}

	function renderOptions() {
		let buttons: React.ReactNode[] = options.map((option, index) => createButton(option, index));

		if (showSeparators) {
			buttons = buttons.map((btn, index) => (
				<React.Fragment key={index}>
					<Divider style={separatorStyle} />
					{btn}
				</React.Fragment>
			));
		}
		return buttons;
	}

	return (
		<Dialog visible={visible} onDismiss={onDismiss} dismissable={dismissable}>
			{title ? (
				<H6
					style={{
						color: theme.palette.text.secondary,
						padding: theme.spacing.unit * 2,
						...titleTextStyle,
					}}
				>
					{title}
				</H6>
			) : null}
			{message ? (
				<Body2
					style={{
						color: theme.palette.text.secondary,
						paddingBottom: theme.spacing.unit * 2,
						paddingHorizontal: theme.spacing.unit * 2,
						...messageTextStyle,
					}}
				>
					{message}
				</Body2>
			) : null}

			{renderOptions()}
		</Dialog>
	);
};

ActionSheetDesktop.displayName = 'ActionSheetDesktop';
