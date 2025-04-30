import React, { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Leaf, Upload, AlertCircle, Check, Loader2, Camera 
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatService } from "@/utils/ChatService";

const PlantDoctor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image && !description) {
      toast({
        title: "Missing information",
        description: "Please provide an image or description of the plant issue.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await analyzePlantIssue(image, description);
      setDiagnosis(result);
    } catch (error) {
      console.error("Error analyzing plant issue:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your plant issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const analyzePlantIssue = async (imageUrl: string | null, description: string) => {
    // Check if API key is available
    const savedApiKey = ChatService.getApiKey();
    
    if (!savedApiKey) {
      setShowApiKeyInput(true);
      throw new Error("API key not found");
    }
    
    if (apiKey && !ChatService.getApiKey()) {
      ChatService.saveApiKey(apiKey);
    }
    
    let prompt = "I need help diagnosing an issue with my plant or crop. ";
    
    if (description) {
      prompt += `Here's a description of what I'm seeing: ${description}. `;
    }
    
    if (imageUrl) {
      prompt += "I've also uploaded an image of the plant showing the concerning areas. Based on the image and description, can you: 1) Identify the likely issue (disease, pest, deficiency, etc.), 2) Suggest immediate actions to take, and 3) Provide preventative measures for the future?";
    } else {
      prompt += "Based on this description, can you: 1) Identify the likely issue (disease, pest, deficiency, etc.), 2) Suggest immediate actions to take, and 3) Provide preventative measures for the future?";
    }
    
    // Use the ChatService for text analysis
    try {
      const response = await ChatService.sendMessage(prompt, []);
      return response;
    } catch (error) {
      console.error("Error using ChatService:", error);
      throw error;
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
    
    // If we had an ongoing diagnosis attempt, retry it
    if (image || description) {
      handleImageSubmit(new Event("submit") as unknown as React.FormEvent);
    }
  };
  
  const resetDiagnosis = () => {
    setImage(null);
    setDescription("");
    setDiagnosis(null);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Plant Doctor</h1>
              <p className="text-sm text-gray-500">Diagnose your crop's health issues</p>
              <p className="text-xs text-gray-400 mt-1">Powered by Together.ai</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </header>
        
        {showApiKeyInput ? (
          <Card className="p-4 mb-6">
            <h2 className="text-lg font-medium mb-2">Enter Together.ai API Key</h2>
            <p className="text-sm text-gray-500 mb-4">
              Your API key is stored locally and only used to make requests to Together.ai.
            </p>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="togetherapi_..."
              className="mb-4"
            />
            <Button onClick={saveApiKey} className="w-full">
              Save API Key
            </Button>
          </Card>
        ) : diagnosis ? (
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Diagnosis Result</h2>
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <ScrollArea className="mb-4 h-48">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{diagnosis}</p>
            </ScrollArea>
            <Button onClick={resetDiagnosis} variant="secondary" className="w-full">
              Analyze Another Plant
            </Button>
          </Card>
        ) : (
          <Card className="p-4 mb-6">
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div className="flex items-center justify-center bg-gray-50 rounded-md border border-dashed border-gray-300 p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button variant="ghost" size="sm" onClick={handleOpenFileDialog}>
                  {image ? (
                    <div className="flex flex-col items-center">
                      <img src={image} alt="Uploaded Plant" className="max-h-32 max-w-32 rounded-md mb-2" />
                      <p className="text-xs text-gray-500">Change Image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera className="h-6 w-6 text-gray-400 mb-1" />
                      <p className="text-sm text-gray-500">Upload Plant Image</p>
                    </div>
                  )}
                </Button>
              </div>
              <Textarea
                placeholder="Describe the plant issue (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Plant <Leaf className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default PlantDoctor;
