import request from "supertest";
import app from "../server";

describe("GET /wildfire/fetch-data", () => {
  jest.mock("../lib/logger", () => ({
    default: {
      error: jest.fn(),
    },
  }));
  it("should return 200 if valid query parameters are provided", async () => {
    const response = await request(app)
      .get("/wildfire/fetch-data")
      .query({ month: "AUG", year: "2023" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          country: expect.any(String),
        }),
      ]),
    );
  }, 10000);

  it("should return 400 if query parameters are missing", async () => {
    const response = await request(app).get("/wildfire/fetch-data");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Year is required!",
      errorType: "ValidationError",
    });
  }, 10000);

  it("should return 400 if query parameters are invalid", async () => {
    const response = await request(app)
      .get("/wildfire/fetch-data")
      .query({ month: "AUGUST", year: "202" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Year must be exactly 4 digits long",
      errorType: "ValidationError",
    });
  }, 10000);
});
