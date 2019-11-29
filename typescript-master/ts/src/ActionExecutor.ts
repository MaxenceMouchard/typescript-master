import "reflect-metadata";

export interface ActionMetadata {
    actionName: string;
}

export const METADATA_KEY = Symbol("ActionExecutorMeta");

/**
 * Action executor decorator. This must be used on every executor class
 * @param metadata The metadata to associate with the ActionExecutor class
 */
export function ActionExecutor<TFunction extends Function>( metadata: ActionMetadata ): Function {
    return function(constructor: Function) {
        constructor.prototype[METADATA_KEY] = metadata.actionName;
    };
}

/**
 * All ActionExector need to satisify the IActionExecutor interface in order to be excecuted
 */
export interface IActionExecutor {
    execute(parameters: any) : Promise<any>;
}