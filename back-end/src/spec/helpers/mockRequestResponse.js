/*  Helper function to create a mock request and response for the unit testing */
/* Author: Nikolay Ostroukhov @nikozbk */
export function createMockRequestResponse(params = {}) {
  const req = {
    body: params,
  };
  const res = {
    status: jasmine.createSpy("status").and.returnValue({
      json: jasmine.createSpy("json"),
      send: jasmine.createSpy("send"),
    }),
    json: jasmine.createSpy("json"),
    send: jasmine.createSpy("send"),
    setHeader: jasmine.createSpy("setHeader"),
  };
  return { req, res };
}
