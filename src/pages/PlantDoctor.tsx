
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, Send, Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChatService } from "@/utils/ChatService";

const PlantDoctor = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [textDescription, setTextDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<{
    diagnosis: string;
    solution: string;
    confidence: number;
  } | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const handleTextSubmit = async () => {
    if (!textDescription.trim()) {
      toast({
        title: "Missing description",
        description: "Please describe the plant issue",
        variant: "destructive",
      });
      return;
    }

    await analyzePlantIssue(textDescription);
  };

  const handleImageSubmit = async () => {
    if (!imageFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image of the plant issue",
        variant: "destructive",
      });
      return;
    }

    // For image-based diagnosis, we'll create a text prompt based on the image
    const imagePrompt = `[This is an image-based analysis of a crop/plant that may have issues. Please analyze as if you can see the image and provide a diagnosis and solution based on common crop issues.]`;
    
    await analyzePlantIssue(imagePrompt);
  };

  const analyzePlantIssue = async (prompt: string) => {
    setIsAnalyzing(true);
    setDiagnosisResult(null);
    
    try {
      // Create a prompt specifically for plant diagnosis
      const diagnosisPrompt = `Act as an agricultural expert specializing in plant pathology. 
      A farmer is showing you a crop with potential issues. 
      Based on this description: "${prompt}", 
      provide a diagnosis of the most likely issue affecting the plant, 
      suggest a solution using environmentally friendly methods when possible, 
      and rate your confidence level from 1-100%. 
      Format your response in JSON: 
      {
        "diagnosis": "detailed diagnosis",
        "solution": "step by step solution",
        "confidence": confidence percentage as a number
      }`;
      
      const response = await ChatService.sendMessage(diagnosisPrompt);
      
      // Extract JSON from the response
      try {
        // The response might contain markdown codeblocks or other text
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : response;
        const result = JSON.parse(jsonString);
        
        setDiagnosisResult({
          diagnosis: result.diagnosis,
          solution: result.solution,
          confidence: result.confidence || 70, // Default confidence if missing
        });
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        
        // Fallback: Split the response into sections
        const sections = response.split('\n\n');
        setDiagnosisResult({
          diagnosis: sections[0] || "Could not determine diagnosis",
          solution: sections[1] || "No specific solution provided",
          confidence: 50, // Default confidence for fallback
        });
      }
    } catch (error) {
      console.error("Error analyzing plant issue:", error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze the plant issue. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-6 flex flex-col h-[calc(100vh-80px)]">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Plant Doctor</h1>
          <p className="text-sm text-gray-500">
            Diagnose and treat plant issues with AI assistance
          </p>
        </header>

        {!diagnosisResult ? (
          <Tabs defaultValue="image" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="image">
                <Camera className="h-4 w-4 mr-2" /> Photo Diagnosis
              </TabsTrigger>
              <TabsTrigger value="text">
                <Send className="h-4 w-4 mr-2" /> Text Description
              </TabsTrigger>
            </TabsList>

            <TabsContent value="image" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Photo</CardTitle>
                  <CardDescription>
                    Take or upload a clear photo of the affected plant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Plant preview"
                        className="w-full h-64 object-cover rounded-md"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                      >
                        <X className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleImageSubmit} 
                    className="w-full"
                    disabled={!imageFile || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      "Diagnose Issue"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Describe Symptoms</CardTitle>
                  <CardDescription>
                    Provide details about what you're seeing on your plants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="E.g., My rice plants have yellow spots on the leaves and the edges are turning brown..."
                    value={textDescription}
                    onChange={(e) => setTextDescription(e.target.value)}
                    className="min-h-[150px]"
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleTextSubmit} 
                    className="w-full"
                    disabled={!textDescription.trim() || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      "Diagnose Issue"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Diagnosis Results</CardTitle>
              <CardDescription>
                Analysis completed with {diagnosisResult.confidence}% confidence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-2">Issue Identified</h3>
                <p className="text-gray-700">{diagnosisResult.diagnosis}</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Recommended Solution</h3>
                <p className="text-gray-700">{diagnosisResult.solution}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setDiagnosisResult(null)}>
                Start New Diagnosis
              </Button>
              <Button>Save Report</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default PlantDoctor;
