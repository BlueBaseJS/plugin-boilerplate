import {
	ActionSheetOptions,
	ActionSheetProps,
	ActionSheetProvider,
} from '@expo/react-native-action-sheet';
import React, { createContext, useCallback, useState } from 'react';

import { ActionSheetDesktop } from './ActionSheetDesktop';

export type ShowActionSheetFn = ActionSheetProps['showActionSheetWithOptions'];

const StubFn = () => null;

const DEFAULT_ACTIONSHEET_PARAMS: ActionSheetOptions & {
	callback: (buttonIndex: number) => void;
} = {
	callback: StubFn,
	options: [],
};

export const ActionSheetDesktopContext = createContext<{
	showActionSheetOrDialogWithOptions: ShowActionSheetFn;
}>({ showActionSheetOrDialogWithOptions: StubFn });

export const withActionSheetProvider = (Component: React.ComponentType<any>) => {
	const ActionSheetUniversalProvider = (props: any) => {
		const [dialogVisible, setDialogVisible] = useState(false);
		const [actionSheetParams, setActionSheetParams] = useState(DEFAULT_ACTIONSHEET_PARAMS);

		const showActionSheetOrDialogWithOptions: ShowActionSheetFn = (options, callback) => {
			setActionSheetParams({
				...options,
				callback: index => {
					callback(index);
					setDialogVisible(false);
				},
			});
			setDialogVisible(true);
		};

		const dismiss = useCallback(() => {
			setDialogVisible(false);
		},[]);

		return (
			<ActionSheetDesktopContext.Provider value={{ showActionSheetOrDialogWithOptions }}>
				<ActionSheetDesktop
					dismissable
					onDismiss={dismiss}
					visible={dialogVisible}
					{...actionSheetParams}
				/>
				<ActionSheetProvider>
					<Component {...props} />
				</ActionSheetProvider>
			</ActionSheetDesktopContext.Provider>
		);
	};

	ActionSheetUniversalProvider.displayName = 'ActionSheetUniversalProvider';

	return ActionSheetUniversalProvider;
};
