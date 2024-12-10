import { debugLog } from "../config/debug.js";
import GeminiService from "../services/GeminiService.js";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000000;

describe("GeminiService", () => {
  let geminiService;

  beforeEach(() => {
    geminiService = new GeminiService();
  });

  it("should initialize AI model", async () => {
    expect(geminiService.genAI).toBeDefined();
  });

  it("should generate a summary", async () => {
    // Create a mock object of 3 emotion entries
    const mockData = [
      {
        emotion: "happy",
        magnitude: 9,
        description: "I got a promotion at work today!",
      },
      {
        emotion: "sad",
        magnitude: 7,
        description: "I lost my wallet on the bus.",
      },
      {
        emotion: "angry",
        magnitude: 3,
        description: "I got into an argument with my friend.",
      },
    ];
    const summary = await geminiService.generateSummary("day");
    expect(summary).toBeDefined();
    // console.log(`Data Provided: ${JSON.stringify(mockData)}`);
  });
});
