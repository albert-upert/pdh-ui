import { Fragment } from "react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
  status: "completed" | "active" | "upcoming";
}

interface StepperProps {
  steps: { label: string }[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  className?: string;
  circleClassName?: string;
  connectorClassName?: string;
  labelClassName?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  className,
  circleClassName,
  connectorClassName,
  labelClassName,
}: StepperProps) {
  return (
    <div className={cn("flex w-full items-center", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isClickable = isCompleted && !!onStepClick;

        return (
          <Fragment key={step.label}>
            <div className="gap-3 flex shrink-0 items-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick?.(index)}
                className={cn(
                  "size-10 text-xl font-medium flex items-center justify-center rounded-full border",
                  isActive
                    ? "border-blue-500 text-blue-500"
                    : isCompleted
                      ? "text-white border-blue-500 bg-blue-500"
                      : "border-gray-300 text-gray-400",
                  isClickable
                    ? "cursor-pointer hover:opacity-80"
                    : "cursor-default",
                  circleClassName
                )}
              >
                {index + 1}
              </button>
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  isActive || isCompleted ? "text-blue-600" : "text-gray-400",
                  labelClassName
                )}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 min-w-4 h-px flex-1",
                  isCompleted ? "bg-blue-600" : "bg-gray-300",
                  connectorClassName
                )}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
