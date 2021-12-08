// Import all functions from get-by-id.js 
const lambda = require('../../../src/handlers/get-by-category.js'); 
// Import dynamodb from aws-sdk 
const dynamodb = require('aws-sdk/clients/dynamodb'); 
 
// This includes all tests for getByIdHandler() 
describe('Test getByIdHandler', () => { 
    let getSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        getSpy.mockRestore(); 
    }); 
 
    // This test invokes getByIdHandler() and compare the result  
    it('should get item by id', async () => { 
        const items = [{ race: 'race' }]; 
 
        // Return the specified value whenever the spied get function is called 
        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve({ Items: items }) 
        }); 
 
        const event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                race: 'race' 
            } 
        } 
 
        // Invoke getByIdHandler() 
        const result = await lambda.getByIdHandler(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(items) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 