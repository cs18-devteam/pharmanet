const Pharmacies = require('../models/PharmacyModel');
const { response } = require('../common/response');
const view = require('../common/view');

jest.mock('../models/PharmacyModel');
jest.mock('../common/view', () => jest.fn());
jest.mock('../common/response', () => ({
  response: jest.fn(),
  responseJson: jest.fn()
}));


const mockReq = () => ({});
const mockRes = () => ({});

const {renderAllPharmacies} = require('../controllers/adminController');

describe('renderAllPharmacies', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render pharmacy list with rows', async () => {
    const req = mockReq();
    const res = mockRes();

    // Fake DB data
    const fakePharmacies = [
      { id: 1, name: 'Pharmacy A' },
      { id: 2, name: 'Pharmacy B' }
    ];

    // Mock model call
    Pharmacies.get.mockResolvedValue(fakePharmacies);

    // Mock view return values IN ORDER
    view.mockReturnValueOnce('headerView')     // component.header
    view.mockReturnValueOnce('sidebarView')    // admin/component.sidebar
    view.mockReturnValueOnce('rowView1')       // pharmacy.row (1st)
    view.mockReturnValueOnce('rowView2')       // pharmacy.row (2nd)
    view.mockReturnValueOnce('pharmacyPage');  // admin/pharmacy

    await renderAllPharmacies(req, res);

    // Model call
    expect(Pharmacies.get).toHaveBeenCalledTimes(1);

    // Header view
    expect(view).toHaveBeenNthCalledWith(
      1,
      'component.header',
      { name: 'Pharmacies || Pharmanet Pharmacy Management' }
    );

    // Sidebar view
    expect(view).toHaveBeenNthCalledWith(
      2,
      'admin/component.sidebar'
    );

    // Row views (called per pharmacy)
    expect(view).toHaveBeenNthCalledWith(
      3,
      'admin/component.pharmacy.row',
      fakePharmacies[0]
    );

    expect(view).toHaveBeenNthCalledWith(
      4,
      'admin/component.pharmacy.row',
      fakePharmacies[1]
    );

    // Main page view
    expect(view).toHaveBeenNthCalledWith(
      5,
      'admin/pharmacy',
      {
        header: 'headerView',
        sidebar: 'sidebarView',
        rows: 'rowView1 rowView2'
      }
    );

    // Response
    expect(response).toHaveBeenCalledWith(
      res,
      'pharmacyPage',
      200
    );
  });

});