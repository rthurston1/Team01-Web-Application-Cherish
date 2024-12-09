import { GoogleGenerativeAI } from "@google/generative-ai";
import { Events } from "../eventhub/Events.js";
import { RemoteService } from "./RemoteService.js";
import Service from "./Service.js";
import { debugLog } from "../config/debug.js";
// Please do not do this (storing API key in code and in plain text) in the real world
export const _API_KEY = "AIzaSyCGfZMVVSpTalW31tkK-pO3qYTkxJWVv40";
const MODEL = "gemini-1.5-flash";

class GeminiService extends Service {
  constructor() {
    super();
    this.genAI = null;
    this.period = "day";
    this.summarizeJournal = false;
  }

  addSubscriptions() {
    this.addEvent(Events.GenerateSummary, (period) =>
      this.generateSummary(period)
    );
    this.addEvent(Events.GenerateSummarySuccess, (data) => {
      this.update(Events.GenerateSummarySuccess, data);
    });
    this.addEvent(Events.GenerateSummaryFailed, (error) => {
      this.update(Events.GenerateSummaryFailed, error);
    });
  }

  setPeriod(period) {
    period = period.toLowerCase();
    if (/^(day|week|month|year)$/.test(period)) {
      this.period = period;
    } else {
      throw new Error("Invalid period");
    }
  }

  async initAI(
    period = null,
    systemInstruction = `You are a friendly therapist and you are helping a client to reflect on their ${
      period ? period : this.period
    }.`
  ) {
    try {
      if (!this.genAI) {
        this.genAI = new GoogleGenerativeAI(_API_KEY);
      }

      const model = this.genAI.getGenerativeModel({
        model: MODEL,
        systemInstruction,
      });

      return model;
    } catch (e) {
      debugLog(e, "ERROR");
      throw new Error("Failed to initialize AI");
    }
  }

  async generateSummary(period = null, prompt = null, data = null) {
    try {
      const model = await this.initAI(period);

      if (!data) {
        // Need to fetch the period's data with remote service
      }

      const prompt = prompt
        ? prompt
        : `For the following text, generate a summary for the ${
            period ? period : this.period
          } in a few sentences`;
      const result = await model.generateContent(prompt);
      const summary = result.response.text();

      debugLog(`Prompt: ${prompt}`, "AI");
      debugLog(`${summary}`, "AI");
      //   this.update(Events.GenerateSummarySuccess, summary);

      return summary;
    } catch (e) {
      debugLog(e, "ERROR");
      throw new Error("Failed to generate summary");
    }
  }
}

export default GeminiService;
