import "reflect-metadata";
import * as R from '../src';

@R.ActionExecutor({
    actionName:"test"
})
export class TestExecutor implements R.IActionExecutor{
    execute(parameters: any) : Promise<any>{
        return Promise.resolve(parameters.a + parameters.b);
    }
}

export class WrongExecutor implements R.IActionExecutor{
     execute(parameters: any) : Promise<any>{
        return Promise.resolve(parameters.a + parameters.b);
    }
}

@R.ActionExecutor({
    actionName:"test"
})
export class DuplicateTestExecutor implements R.IActionExecutor{
     execute(parameters: any): Promise<any>{
        return Promise.resolve(parameters.a + parameters.b);
    }
}

@R.ActionExecutor({
    actionName:"test"
})
export class WrongTestExecutor {
    doStuff(){
        
    }
}
export class DumbActivator implements R.Activator{
    activate<T>(type: Function) : T {
        if(type == TestExecutor){
            return new TestExecutor();
        }
    }
}