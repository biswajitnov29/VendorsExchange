describe('Vender Factory', function() {
  var VenderStorage,CalculationService;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('VenderMachinApp'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_InventoryFactory_) {
      VenderStorage = _InventoryFactory_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect(VenderStorage).toBeDefined();
  });
});