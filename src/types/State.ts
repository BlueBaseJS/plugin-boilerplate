import { DataSchema } from './DataSchema';

export interface State {
	/** Name of this state. */
	name: string;

	/**
	 * Autogenerate from name if not provided.
	 * This value should be unique in the context of same ThingCapability.
	 */
	key: string;

	/** Description of this state */
	description?: string;

	/**
	 * A schema that provides preset settings i.e. unit, displayTemplate, etc.
	 * Example implementations: Length | Area | MassWeight | Volume | Temperature
	 */
	schema: string | DataSchema;

	/**
	 * Metadata of this state. This may be overridden.
	 */
	metadata?: {
		// TODO: can this be a js expression in a string template?
		values?: {
			[value: string]: any; // value: label TODO: select value casing, what if its boolean, a sentence, etc
		};

		max?: number;
		min?: number;
	};
}
