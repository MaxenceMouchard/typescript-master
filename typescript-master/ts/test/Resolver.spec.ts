import "reflect-metadata";

import * as R from '../src/';
import * as executors from './executors'
import { expect } from 'chai';

describe("ActionResolver Tests", function(){
   it("Resolver should not accept an executor without the ActionExecutor decorator", function(){
        var resolver = new R.ActionResolver(new executors.DumbActivator());
        
         return expect(function(){
           resolver.registerExecutor(executors.WrongExecutor);
        }).to.throw("The executor WrongExecutor has no associated action. Please use the ActionExecutor decorator to specify one");
    });
    
    it("Resolver should not accept an executor that not satisfy the IActionExecutor interface", function(){
        var resolver = new R.ActionResolver(new executors.DumbActivator());
        
        return expect(function(){
            resolver.registerExecutor(executors.WrongTestExecutor);
        }).to.throw("The executor WrongTestExecutor does not satisfy the IActionExecutor interface");
    });
    
    it("Resolver should not allow the registration of an executor more than once", function(){
        var resolver = new R.ActionResolver(new executors.DumbActivator());
        resolver.registerExecutor(executors.TestExecutor);
        
        return expect(function(){
           resolver.registerExecutor(executors.TestExecutor);
        }).to.throw("The executor TestExecutor is already registered");
    });
    
    it("Resolver should not allow the registration of differents executors for the same action", function(){
        var resolver = new R.ActionResolver(new executors.DumbActivator());
        resolver.registerExecutor(executors.TestExecutor);
        
        return expect(function(){
           resolver.registerExecutor(executors.DuplicateTestExecutor);
        }).to.throw("Cannot register DuplicateTestExecutor: The executor TestExecutor is already registered for the action test");
    });
    
    it("Resolver should resolve the previously registered executor", function(){
        var resolver = new R.ActionResolver(new executors.DumbActivator());
        resolver.registerExecutor(executors.TestExecutor);
        var executor = resolver.resolve('test');
        
        return expect(executor instanceof executors.TestExecutor).to.be.true;
    });
    
    it("Resolver should not found the executor", function(){
        var resolver = new R.ActionResolver(new executors.DumbActivator());
        return expect(function(){
            resolver.resolve('test');
        }).to.throw("No executor found for the action test");
    });
});