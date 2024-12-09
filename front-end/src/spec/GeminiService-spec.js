import { debugLog } from "../config/debug.js";
import GeminiService from "../services/GeminiService.js";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe("GeminiService", () => {
  let geminiService;

  beforeEach(() => {
    geminiService = new GeminiService();
  });

  it("should initialize AI model", async () => {
    const model = await geminiService.initAI();
    expect(model).toBeDefined();
  });

  it("should generate a summary", async () => {
    const summary = await geminiService.generateSummary("day");
    expect(summary).toBeDefined();
  });

  it("should throw an error for invalid period", () => {
    expect(() => geminiService.setPeriod("invalid")).toThrowError(
      "Invalid period"
    );
  });
});
