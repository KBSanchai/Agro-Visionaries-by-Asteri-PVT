
type MessageInput = {
  role: "user" | "assistant";
  content: string;
};

export class ChatService {
  private static API_KEY_STORAGE_KEY = "openai_api_key";

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async sendMessage(
    message: string,
    previousMessages: MessageInput[] = []
  ): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error("API key not found");
    }

    try {
      const messages = [
        {
          role: "system",
          content: "You are a helpful agricultural assistant specialized in farming, crops, soil management, irrigation, pest control, and sustainable agriculture practices. Provide detailed and accurate information to help farmers improve their yields and adopt sustainable techniques. Always keep your responses focused on agriculture and farming. If asked about non-agricultural topics, politely redirect the conversation back to farming. Keep responses concise but informative, and suggest actionable advice when appropriate."
        },
        ...previousMessages,
        { role: "user", content: message }
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to get response from OpenAI");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}
