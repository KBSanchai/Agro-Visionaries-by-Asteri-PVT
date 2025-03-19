
import React from "react";
import { Layout } from "@/components/Layout";
import { InsightCard } from "@/components/InsightCard";
import { DropletIcon, LeafIcon, FlaskConicalIcon, SunIcon, DropletIcon as DropIcon } from "lucide-react";

const CropHealth = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Crop Health insights</h1>
        </header>

        <div className="space-y-4">
          <InsightCard 
            fieldNumber={1}
            issue="NDVI at 0.35 indicates moderate water stress."
            action="Increase irrigation by 25%."
            icon={<SunIcon className="h-5 w-5" />}
            variant="warning"
          />
          
          <InsightCard 
            fieldNumber={3}
            issue="Aphid density up by 200% near the western border."
            action="Deploy pest control; consider ladybugs."
            icon={<LeafIcon className="h-5 w-5" />}
            variant="danger"
          />
          
          <InsightCard 
            fieldNumber={4}
            issue="15% of plants show early Powdery Mildew signs."
            action="Apply fungicide within 24 hours."
            icon={<FlaskConicalIcon className="h-5 w-5" />}
            variant="warning"
          />
          
          <InsightCard 
            fieldNumber={2}
            issue="Low phosphorus, adequate nitrogen"
            action="Apply phosphorus fertilizer; reduce nitrogen by 15%."
            icon={<LeafIcon className="h-5 w-5" />}
            variant="default"
          />
          
          <InsightCard 
            fieldNumber={5}
            issue="Significant water stress, soil moisture at 18% (optimal: 40%)."
            action="Increase irrigation; monitor moisture closely."
            icon={<DropIcon className="h-5 w-5" />}
            variant="danger"
          />
        </div>
      </div>
    </Layout>
  );
};

export default CropHealth;
