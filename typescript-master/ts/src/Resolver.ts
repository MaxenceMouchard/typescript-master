import "reflect-metadata";

import { Activator } from './Activator';
import { IActionExecutor, METADATA_KEY } from './ActionExecutor';

export interface ExecutorInfo {
    type: Function;
    instance: IActionExecutor;
}

export class ActionResolver {
    private _executors : Map<string, ExecutorInfo>;
   
    constructor(private _activator: Activator) {
        this._executors = new Map<string, ExecutorInfo>();
    }

    /**
     * Register a new action executor by adding it to the map
     * @param executor The executor class to register
     */
    registerExecutor( executor: Function ) {
        if(!executor.prototype[METADATA_KEY])
            throw "The executor WrongExecutor has no associated action. Please use the ActionExecutor decorator to specify one";
        if(!executor.prototype.execute)
            throw "The executor WrongTestExecutor does not satisfy the IActionExecutor interface";
        if(this._executors.has(executor.prototype[METADATA_KEY]))
            throw "Cannot register DuplicateTestExecutor: The executor TestExecutor is already registered for the action test";
        this._executors.set(executor.prototype[METADATA_KEY], { type: executor, instance: this._activator.activate(executor) });
    }

    /**
     * Get the executor for the given action
     * @param actionName The action name to resolve
     * @return Return the @link{IActionExecutor} associated with the action
     */
    resolve(actionName: string): IActionExecutor {
        if(!this._executors.has(actionName)) { 
            throw `No executor found for the action ${actionName}`;
        }      
        return this._executors.get(actionName).instance;
    }
}