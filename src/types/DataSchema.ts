import { DataType } from './DataType';

export interface DataSchema {
	name?: string; // 'TemperatureValue',

	/**
	 * This is the template that is used to generate the display string.
	 *
	 * Example: "{{ value }} {{ schema.abbr }}"
	 */
	displayTemplate?: string;

	unit?: string; // l, oz, mm, kg

	type: DataType; // DataType
}
