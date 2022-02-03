import { AlertButton, AlertOptions, AlertStatic } from 'react-native';
import { Body2, Button, Dialog, DialogProps } from '@bluebase/components';
import React, { createContext, useCallback, useState } from 'react';

import get from 'lodash.get';
import { useIntl } from '@bluebase/core';

type AlertFn = AlertStatic['alert'];

const StubFn = () => null;

export const AlertContext = createContext<{ alert: AlertFn }>({ alert: StubFn });

export interface AlertParams {
	title: string;
	message?: string;
	buttons?: AlertButton[];
	options?: AlertOptions;
}

const DEFAULT_ALERT_PARAMS: AlertParams = {
	title: 'Alert',
};

export const AlertUI = (
	props: AlertParams &
		Omit<DialogProps, 'children'> & { setDialogVisible: (visible: boolean) => void }
) => {
	const { __ } = useIntl();

	const title = get(props, 'title');
	const message = get(props, 'message');
	const buttons: AlertButton[] = (get(props, 'buttons', []) as AlertButton[]).map(
		({ style, text, ...rest }, index) => ({
			...rest,
			color: style === 'destructive' ? 'error' : 'primary',
			key: index,
			title: text,
			variant: 'text',

			onPress: () => {
				const btnOnPress = get(rest, 'onPress', StubFn);
				btnOnPress();

				props.setDialogVisible(false);
			},
		})
	);
	return (
		<Dialog visible={props.visible} onDismiss={props.onDismiss} dismissable={props.dismissable}>
			<Dialog.Title>{__(title)}</Dialog.Title>
			{message ? (
				<Dialog.Content>
					<Body2>{__(message)}</Body2>
				</Dialog.Content>
			) : null}

			{buttons.length > 0 ? (
				<Dialog.Actions>
					{buttons.map((item) => (
						<Button key={buttons.length} {...item} />
					))}
				</Dialog.Actions>
			) : null}
		</Dialog>
	);
};
AlertUI.displayName = 'AlertUI';

export const withAlertUI = (Component: React.ComponentType<any>) => {
	const AlertProvider = (props: any) => {
		const [dialogVisible, setDialogVisible] = useState(false);
		const [alertParams, setAlertParams] = useState(DEFAULT_ALERT_PARAMS);

		const alert: AlertFn = (title, message, buttons, options) => {
			setAlertParams({ title, message, buttons, options });
			setDialogVisible(true);
		};

		const dismiss = useCallback(() => {
			setDialogVisible(false);

			const onDismiss = get(alertParams, 'options.onDismiss', StubFn);
			onDismiss();
		}, []);

		return (
			<AlertContext.Provider value={{ alert }}>
				<AlertUI
					visible={dialogVisible}
					dismissable={get(alertParams, 'options.cancelable', true)}
					onDismiss={dismiss}
					setDialogVisible={setDialogVisible}
					{...alertParams}
				/>
				<Component {...props} />
			</AlertContext.Provider>
		);
	};

	AlertProvider.displayName = 'AlertProvider';

	return AlertProvider;
};
