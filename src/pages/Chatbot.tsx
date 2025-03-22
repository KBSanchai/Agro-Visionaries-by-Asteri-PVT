
import React, { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, SendIcon, Bot, Sprout, User } from "lucide-react";
import { ChatService } from "@/utils/ChatService";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: "Hello! I'm your agricultural assistant. Ask me anything about farming, crop management, or agricultural techniques!",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Check if API key is available
      const savedApiKey = ChatService.getApiKey() || apiKey;
      
      if (!savedApiKey) {
        setShowApiKeyInput(true);
        setIsLoading(false);
        toast({
          title: "API Key Required",
          description: "Please enter your OpenAI API key to continue",
        });
        return;
      }
      
      if (apiKey && !ChatService.getApiKey()) {
        ChatService.saveApiKey(apiKey);
      }
      
      const response = await ChatService.sendMessage(
        input,
        messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      );
      
      const botMessage: Message = {
        id: Date.now().toString() + "-response",
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get response from the AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    
    ChatService.saveApiKey(apiKey);
    setShowApiKeyInput(false);
    toast({
      title: "Success",
      description: "API key saved successfully!",
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-6 flex flex-col h-[calc(100vh-80px)]">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sprout className="h-6 w-6 text-green-600" />
            Agri Assistant
          </h1>
          <p className="text-sm text-gray-500">Your farming guidance companion</p>
        </header>

        {showApiKeyInput ? (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h2 className="text-lg font-medium mb-2">Enter OpenAI API Key</h2>
            <p className="text-sm text-gray-500 mb-4">
              Your API key is stored locally and only used to make requests to OpenAI.
            </p>
            <div className="space-y-4">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full"
              />
              <Button onClick={saveApiKey} className="w-full">
                Save API Key
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 mb-4 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.role === "user"
                          ? "bg-drone-blue text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.role === "assistant" ? (
                          <Bot className="h-4 w-4 mr-1" />
                        ) : (
                          <User className="h-4 w-4 mr-1" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.role === "user" ? "You" : "Assistant"}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about farming, crops, or agriculture..."
                className="w-full pr-12 resize-none"
                rows={3}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute bottom-3 right-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SendIcon className="h-4 w-4" />
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Chatbot;
