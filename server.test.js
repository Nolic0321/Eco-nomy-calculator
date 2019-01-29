import Server from './server'
import express from 'express'

jest.mock('express');
describe("Test the root path:",()=>{
    it('It should respond to the GET call', ()=>{
        express.get
    });

    it('returns ingredients',()=>{
        const ingredients = [{name: 'ingredient 1',cost: 3},{name: 'ingredient 2', cost:2}];
        express.get.mockResolvedValue(ingredients);

    })
})