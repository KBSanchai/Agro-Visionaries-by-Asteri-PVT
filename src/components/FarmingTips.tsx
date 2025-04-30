
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tip {
  id: number;
  emoji: string;
  title: string;
  description: string;
  category: string;
}

const farmingTips: Tip[] = [
  {
    id: 1,
    emoji: "🐝",
    title: "Attract Pollinators",
    description: "Plant sunflowers to attract bees and other pollinators, which can boost your crop yields by up to 30%.",
    category: "biodiversity",
  },
  {
    id: 2,
    emoji: "🌾",
    title: "Crop Rotation",
    description: "Rotate your crops every season to maintain soil health, reduce pests, and prevent nutrient depletion.",
    category: "soil",
  },
  {
    id: 3,
    emoji: "💧",
    title: "Smart Watering",
    description: "Water early morning or late evening to reduce evaporation loss and maximize water efficiency.",
    category: "water",
  },
  {
    id: 4,
    emoji: "🦗",
    title: "Natural Pest Control",
    description: "Plant marigolds around your vegetables to repel harmful insects while attracting beneficial ones.",
    category: "pests",
  },
  {
    id: 5,
    emoji: "🍂",
    title: "Mulching Magic",
    description: "Apply a 2-inch layer of organic mulch to conserve moisture, suppress weeds, and add nutrients.",
    category: "soil",
  },
];

export const FarmingTips: React.FC = () => {
  const { toast } = useToast();

  const handleShare = (tip: Tip) => {
    // In a real app, this would use the Web Share API
    toast({
      title: "Sharing Tip",
      description: `The tip "${tip.title}" would be shared via messaging apps.`,
    });
  };

  const handleSave = (tip: Tip) => {
    toast({
      title: "Tip Saved",
      description: `The tip "${tip.title}" has been saved to your collection.`,
    });
  };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Daily Farming Tips</h2>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {farmingTips.map((tip) => (
            <CarouselItem key={tip.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{tip.emoji}</span>
                    <h3 className="font-medium">{tip.title}</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleShare(tip)}
                    className="flex items-center gap-1"
                  >
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSave(tip)}
                    className="flex items-center gap-1"
                  >
                    <Bookmark className="h-4 w-4" /> Save
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="static translate-y-0 mr-2" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};
