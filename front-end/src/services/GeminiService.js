import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";
import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";
import { debugLog } from "../config/debug.js";
import { getToday } from "../utils/dateUtils.js";
import StorageServiceFactory from "./StorageServiceFactory.js";
// import { DATABASE } from "../main.js";

const MODEL = "gemini-1.5-flash";
const GENERATION_CONFIG = {
  candidateCount: 1, //specifies the number of generated responses to return. Currently, this value can only be set to 1.
  maxOutputTokens: 300, //sets the maximum number of tokens to include in a candidate.
  temperature: 0.3, //sets the randomness of the output. The higher the temperature, the more random the output.
};
const SYSTEM_INSTRUCTION = `
  You are a psychologist who is analyzing a patient's journal and emotion log entries. 
  The data consists of a description of how the person is feeling and the magnitude of the emotion recorded for that time of day. 
  Write a summary of the patient's data in a few sentences, with suggestions on how to improve their mood if they are feeling sad or angry. 
Ratings scale from 1 to 10 with 1 being the worst and 10 being the best. Magnitude of emotion is also on a scale from 1 to 10, varying in intensity. 
`;

class GeminiService extends Service {
  constructor(period = "day", summarizeJournal = false) {
    super();
    this.genAI = null;
    this.period = this.setPeriod(period);
    this.summarizeJournal = summarizeJournal;
    this.remoteService = StorageServiceFactory.getService("Remote");
    this.initAI(this.period);
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
    const p = period.toLowerCase();
    if (/^(day|week|month|year)$/.test(p)) {
      this.period = p;
    } else {
      throw new Error("Invalid period");
    }
  }

  async initAI(systemInstruction = SYSTEM_INSTRUCTION) {
    try {
      if (!this.genAI) {
        this.genAI = new GoogleGenerativeAI(_API_KEY);
      }

      const model = this.genAI.getGenerativeModel({
        model: MODEL,
        SYSTEM_INSTRUCTION,
        generationConfig: GENERATION_CONFIG,
      });

      return model;
    } catch (e) {
      debugLog(e, "ERROR");
      throw new Error("Failed to initialize AI");
    }
  }

  async getData(period) {
    let response;
    const today = getToday();
    switch (period) {
      case "day": // get today's data
        response = await this.remoteService.restoreDay(today);
        break;
      case "week": // get last 7 days' data (including today)
        // response = await this.remoteService.restoreWeek();
        break;
      case "month": // get last 30 days' data (including today)
        // response = await this.remoteService.restoreMonth();
        break;
      case "year": // get last 365 days' data (including today)
        // response = await this.remoteService.restoreYear();
        break;
      default:
        throw new Error("Invalid period");
    }
    return response;
  }

  async generateSummary(period, data = null) {
    try {
      this.setPeriod(period);
      const model = await this.initAI(this.period);

      if (!data) {
        // Need to fetch the period's data with remote service
        try {
          const response = await this.getData(this.period);
          data = JSON.stringify(response.data);
        } catch (e) {
          debugLog(e, "ERROR");
          throw new Error("Failed to fetch data");
        }
      }

      const prompt = `Generate a friendly and personable summary for the ${this.period} in a few sentences given this data: ${data}`;
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
