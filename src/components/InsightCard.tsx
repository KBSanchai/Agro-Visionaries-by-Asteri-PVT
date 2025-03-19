
import React from "react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  fieldNumber: number;
  issue: string;
  action: string;
  icon: React.ReactNode;
  variant?: "default" | "warning" | "danger" | "success";
}

export const InsightCard: React.FC<InsightCardProps> = ({
  fieldNumber,
  issue,
  action,
  icon,
  variant = "default",
}) => {
  return (
    <div className="w-full bg-white rounded-xl p-4 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="space-y-1 pr-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Field {fieldNumber}:</span> {issue}
          </p>
          <p className="font-medium text-gray-900">{action}</p>
        </div>
        <div 
          className={cn(
            "h-9 w-9 flex items-center justify-center rounded-full",
            variant === "default" && "bg-drone-lightBlue text-blue-600",
            variant === "warning" && "bg-drone-yellow text-yellow-600",
            variant === "danger" && "bg-drone-red text-red-600",
            variant === "success" && "bg-drone-green text-green-600"
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
