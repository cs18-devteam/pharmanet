// D:\pharmanet\pharmanet\server\test\units\controllers\pharmacy\pharmacy.staff.controller.test.js

const StaffController = require("../../../../controllers/pharmacy/pharmacy.staff.controller");
const Users = require("../../../../models/UserModel");
const view = require("../../../../common/view");
const { response } = require("../../../../common/response");

jest.mock("../../../../models/UserModel");
jest.mock("../../../../common/view");
jest.mock("../../../../common/response");

describe("Pharmacy Staff Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("renderPharmacyStaff", () => {
    it("should render pharmacy staff intro view", async () => {
      view.mockReturnValue("<intro-view>");
      response.mockImplementation((res, html, status) => res.send({ html, status }));

      const result = await StaffController.renderPharmacyStaff(req, res);

      // The function currently returns the view HTML directly
      expect(view).toHaveBeenCalledWith("pharmacy/pharmacy.member.intro", expect.any(Object));
      expect(result).toBe("<intro-view>");
    });

    it("should handle errors and return 404", async () => {
        // First call throws an error
        view.mockImplementationOnce(() => { throw new Error("View Error"); });
        // Second call (for 404) returns a valid view
        view.mockImplementationOnce(() => "<404-view>");
        
        response.mockImplementation((res, html, status) => res.send({ html, status }));

        const result = await StaffController.renderPharmacyStaff(req, res);

        expect(response).toHaveBeenCalledWith(res, "<404-view>", 404);
        });

  });

  describe("renderPharmacyStaffProfile", () => {
    it("should render staff profile view", async () => {
      const staffData = { id: 1, firstName: "John", lastName: "Doe" };
      req.staffId = 1;
      Users.getById.mockResolvedValue([staffData]);
      view.mockReturnValue("<profile-view>");

      const result = await StaffController.renderPharmacyStaffProfile(req, res);

      expect(Users.getById).toHaveBeenCalledWith(1);
      expect(view).toHaveBeenCalledWith("pharmacy.staff.profile", staffData);
      expect(result).toBe("<profile-view>");
    });

    it("should handle missing staff gracefully", async () => {
      req.staffId = 999;
      Users.getById.mockResolvedValue([]);
      view.mockReturnValue("<profile-view>");

      const result = await StaffController.renderPharmacyStaffProfile(req, res);

      expect(Users.getById).toHaveBeenCalledWith(999);
      expect(view).toHaveBeenCalledWith("pharmacy.staff.profile", undefined);
      expect(result).toBe("<profile-view>");
    });
  });
});
