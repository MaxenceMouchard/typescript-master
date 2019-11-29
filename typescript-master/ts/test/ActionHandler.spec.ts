import "reflect-metadata";

import * as R from '../src';
import * as test from './executors';
import { expect } from 'chai';

describe("Action Sender Test", function(){
    var activator = new test.DumbActivator();
    
    var resolver = new R.ActionResolver(activator);
    resolver.registerExecutor(test.TestExecutor);
    
    it("Executor should be executed", function(done){
        var sender = new R.ActionInvoker(resolver);
        
        sender.invoke("test", {
            a: 1,
            b: 6 
        }).then( r => {
            expect(r).to.be.eql(7);
            done();
        });
    });
    
    it("ActionSender should not found the executor and throw an exception", function(){
        var sender = new R.ActionInvoker(resolver);
        
        return expect(function() {
            sender.invoke("tests", {
                a: 1,
                b: 6
            });
        }).to.throw("No executor found for the action tests");
    });
});
