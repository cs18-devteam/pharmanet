// Correct paths from test file to controller & common files
const Controller = require("../../../../controllers/pharmacy/pharmacy.attendance.controller");
const Users = require("../../../../models/UserModel");
const { response } = require("../../../../common/response");
const view = require("../../../../common/view");

// Mock dependencies
jest.mock("../../../../models/UserModel");
jest.mock("../../../../common/response");
jest.mock("../../../../common/view");

describe("Pharmacy Attendance Controller", () => {

    let req, res;

    beforeEach(() => {
        req = { pharmacistId: 1 };
        res = { send: jest.fn() };
        response.mockImplementation((res, data, status) => ({ res, data, status }));
        view.mockImplementation((template, data) => ({ template, data }));
    });

    it("should render attendance page for valid pharmacist", async () => {
        // Mock Users.getById to return a staff object
        Users.getById.mockResolvedValue([{ firstName: "John", lastName: "Doe" }]);

        const result = await Controller.renderAttendance(req, res);

        expect(Users.getById).toHaveBeenCalledWith(1);
        expect(view).toHaveBeenCalled(); // view should be called
        expect(response).toHaveBeenCalledWith(res, expect.any(Object), 200);
        expect(result.status).toBe(200);
    });

    it("should render 404 page on error", async () => {
        Users.getById.mockRejectedValue(new Error("Database error"));

        const result = await Controller.renderAttendance(req, res);

        expect(response).toHaveBeenCalledWith(res, expect.objectContaining({ template: '404' }), 200);
        expect(result.status).toBe(200);
    });
});
