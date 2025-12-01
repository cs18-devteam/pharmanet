// D:\pharmanet\pharmanet\server\test\units\controllers\pharmacy\pharmacy.staff.leave.controller.test.js

const StaffLeaveController = require(
  "../../../../controllers/pharmacy/pharmacy.staff.leave.controller"
);

const view = require("../../../../common/view");
const { response } = require("../../../../common/response");

// Mocks
jest.mock("../../../../common/view");
jest.mock("../../../../common/response");

describe("Pharmacy Staff Leave Controller", () => {
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

  describe("renderPharmacyStaffLeave", () => {
    it("should render pharmacy staff leave view", async () => {
      // Mock nested view calls
      view.mockReturnValueOnce("<header-view>");   // header
      view.mockReturnValueOnce("<leave-view>");    // main view

      response.mockImplementation((res, html, status) =>
        res.send({ html, status })
      );

      const result = await StaffLeaveController.renderPharmacyStaffLeave(
        req,
        res
      );

      // header call
      expect(view).toHaveBeenCalledWith("component.header", {
        name: "Antibiotics",
      });

      // main view call
      expect(view).toHaveBeenCalledWith("pharmacy.staff.leave", {
        header: "<header-view>",
      });

      expect(result).toBe("<leave-view>");
    });

    it("should handle errors and return 404", async () => {
      // Throw error on any view() call
      view.mockImplementation(() => {
        throw new Error("View Error");
      });

      response.mockImplementation((res, html, status) =>
        res.send({ html, status })
      );

      await StaffLeaveController.renderPharmacyStaffLeave(req, res);

      expect(response).toHaveBeenCalledWith(
        res,
        expect.any(String), // "view('404')" mocked return
        404
      );
    });
  });
});
