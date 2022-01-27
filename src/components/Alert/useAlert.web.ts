import { AlertContext } from './Alert';
import { useContext } from 'react';

export function useAlert() {
	return useContext(AlertContext);
}
