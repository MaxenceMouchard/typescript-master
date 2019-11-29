export interface Activator{
    
    /**
     * Create a new instance of the given class.
     * @param type The class to instanciate
     */
    activate<T>( type: Function ): T;    
}