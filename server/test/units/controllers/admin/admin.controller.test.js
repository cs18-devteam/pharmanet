const { renderAdminDashboardView } = require('../../../../controllers/admins/admin.controller');

const { response } = require('../../../../common/response');
const view = require('../../../../common/view');

// MOCK helper modules
jest.mock('../common/response', () => ({
  response: jest.fn(),
  responseJson: jest.fn()
}));

jest.mock('../common/view', () => jest.fn());

const mockRequest = () => ({});

const mockResponse = () => {
  return {};
};

describe('renderAdminDashboardView', () => {
  test('should render admin dashboard with sidebar and header', async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mock return values of view()
    view.mockReturnValueOnce('sidebarView') // admin/component.sidebar
    view.mockReturnValueOnce('headerView')  // component.header
    view.mockReturnValueOnce('dashboardView'); // admin/adminDashboard

    await renderAdminDashboardView(req, res);

    // view() call assertions
    expect(view).toHaveBeenNthCalledWith(
      1,
      'admin/component.sidebar'
    );

    expect(view).toHaveBeenNthCalledWith(
      2,
      'component.header',
      {
        name: 'Admin || Pharmanet Pharmacy Management System'
      }
    );

    expect(view).toHaveBeenNthCalledWith(
      3,
      'admin/adminDashboard',
      {
        sidebar: 'sidebarView',
        header: 'headerView'
      }
    );

    // response() assertion
    expect(response).toHaveBeenCalledWith(
      res,
      'dashboardView',
      200
    );
  });
});

const {renderAdminMedicinesView} = require('../../../../controllers/admins/admin.controller');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('renderAdminMedicinesView', () => {
  test('should render admin medicines page with header and sidebar', async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Order matters — nested calls
    view
      .mockReturnValueOnce('headerView')   // component.header
      .mockReturnValueOnce('sidebarView')  // admin/component.sidebar
      .mockReturnValueOnce('medicinesView'); // admin/medicines

    await renderAdminMedicinesView(req, res);

    // header view
    expect(view).toHaveBeenNthCalledWith(
      1,
      'component.header',
      {
        name: 'Medicines || Pharmanet - Manage all medicines here'
      }
    );

    // sidebar view
    expect(view).toHaveBeenNthCalledWith(
      2,
      'admin/component.sidebar'
    );

    // main medicines view
    expect(view).toHaveBeenNthCalledWith(
      3,
      'admin/medicines',
      {
        header: 'headerView',
        sidebar: 'sidebarView'
      }
    );

    // response assertion
    expect(response).toHaveBeenCalledWith(
      res,
      'medicinesView',
      200
    );
  });
});


const { renderAdminDataAssetsView } = require('../../../../controllers/admins/admin.controller');

describe('renderAdminDataAssetsView', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render data assets page with header and sidebar', async () => {
    const req = mockReq();
    const res = mockRes();

    // Mock view() return values in execution order
    view
      .mockReturnValueOnce('headerView')      // component.header
      .mockReturnValueOnce('sidebarView')     // admin/component.sidebar
      .mockReturnValueOnce('dataAssetsView'); // admin/dataAssets

    await renderAdminDataAssetsView(req, res);

    // Header view called correctly
    expect(view).toHaveBeenNthCalledWith(
      1,
      'component.header',
      {
        name: 'Data assets || Pharmanet - Data Collection'
      }
    );

    // Sidebar view called correctly
    expect(view).toHaveBeenNthCalledWith(
      2,
      'admin/component.sidebar'
    );

    // Main view called correctly
    expect(view).toHaveBeenNthCalledWith(
      3,
      'admin/dataAssets',
      {
        header: 'headerView',
        sidebar: 'sidebarView'
      }
    );

    // Response called with status 200
    expect(response).toHaveBeenCalledWith(
      res,
      'dataAssetsView',
      200
    );
  });

});



const { renderAdminUsersView } = require('../../../../controllers/admins/admin.controller');


describe('renderAdminUsersView', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render admin users page with sidebar and header', async () => {
    const req = mockReq();
    const res = mockRes();

    // Order matters here!
    view
      .mockReturnValueOnce('sidebarView')  // admin/component.sidebar
      .mockReturnValueOnce('headerView')   // component.header
      .mockReturnValueOnce('usersView');   // admin/users

    await renderAdminUsersView(req, res);

    // Sidebar view
    expect(view).toHaveBeenNthCalledWith(
      1,
      'admin/component.sidebar'
    );

    // Header view
    expect(view).toHaveBeenNthCalledWith(
      2,
      'component.header',
      {
        name: 'Users || Pharmanet - Manage All Users'
      }
    );

    // Main users view
    expect(view).toHaveBeenNthCalledWith(
      3,
      'admin/users',
      {
        sidebar: 'sidebarView',
        header: 'headerView'
      }
    );

    // Response
    expect(response).toHaveBeenCalledWith(
      res,
      'usersView',
      200
    );
  });

});




