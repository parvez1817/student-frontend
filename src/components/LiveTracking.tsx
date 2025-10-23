import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Printer, Package } from 'lucide-react';

interface TrackingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime?: string;
}

interface LiveTrackingProps {
  currentStep: number; // 0 = not started, 1 = submitted, 2 = under review, 3 = approved, 4 = ready
  printingActive?: boolean;
  readyForPickup?: boolean;
}

const LiveTracking: React.FC<LiveTrackingProps> = ({
  currentStep,
  printingActive,
  readyForPickup,
}) => {

  const trackingSteps: TrackingStep[] = [
    {
      id: 1,
      title: 'Request Submitted',
      description: 'Your ID card reissue request has been submitted',
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      id: 2,
      title: 'Under Review',
      description: 'Class teacher is reviewing your request',
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: 3,
      title: 'Approved & Printing',
      description: 'Request approved, ID card is being printed',
      icon: <Printer className="h-5 w-5" />,
    },
    {
      id: 4,
      title: 'Ready for Pickup',
      description: 'Your new ID card is ready for collection',
      icon: <Package className="h-5 w-5" />,
    },
  ];

  const getStepStatus = (stepId: number, stepTitle: string) => {
    if (readyForPickup) {
      if (stepTitle === 'Ready for Pickup') return 'active';
      if (
        stepTitle === 'Request Submitted' ||
        stepTitle === 'Under Review' ||
        stepTitle === 'Approved & Printing'
      )
        return 'completed';
      return 'pending';
    }

    if (printingActive) {
      if (stepTitle === 'Approved & Printing') return 'active';
      if (stepTitle === 'Request Submitted' || stepTitle === 'Under Review') return 'completed';
      return 'pending';
    }

    if (currentStep === 0) return 'pending';
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const getStepStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-green-500 text-white',
          line: 'bg-green-500',
          title: 'text-white',
          description: 'text-white',
        };
      case 'active':
        return {
          circle: 'bg-blue-500 text-white animate-pulse',
          line: 'bg-gradient-to-b from-green-500 to-gray-400',
          title: 'text-white',
          description: 'text-white',
        };
      case 'pending':
      default:
        return {
          circle: 'bg-gray-400 text-gray-600',
          line: 'bg-gray-400',
          title: 'text-black',
          description: 'text-black',
        };
    }
  };

  const getEffectiveCurrentStep = () => {
    if (readyForPickup) return 4;
    if (printingActive) return 3;
    return currentStep;
  };


  const showNoFormState = printingActive && currentStep === 0;

  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Live Tracking</CardTitle>
        <p className="text-white/70 text-sm">
          {readyForPickup
            ? '🎉 Your ID card is ready for pickup!'
            : printingActive
            ? showNoFormState
              ? 'Your ID card is being printed from a previous request! 🖨️'
              : 'Your ID card is currently being printed! 🖨️'
            : getEffectiveCurrentStep() === 0
            ? 'Submit your request to start tracking'
            : 'Track your current request progress'}
        </p>
      </CardHeader>

      <CardContent>
        {readyForPickup && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-200 font-medium">🎉 ID Card Ready for Pickup!</span>
            </div>
            <p className="text-green-100 text-sm mt-2 ml-6">
              Your ID card has been printed and is ready for collection. Please visit the
              administration office to collect your new ID card.
            </p>
          </div>
        )}

        {printingActive && !readyForPickup && (
          <div className="mb-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-200 font-medium">🖨️ ID Card Printing in Progress</span>
            </div>
            <p className="text-blue-100 text-sm mt-2 ml-6">
              {showNoFormState
                ? 'Your ID card is being printed from a previous request. You can submit a new request if needed.'
                : "Your ID card request has been approved and is currently being printed. You'll be notified when it's ready for pickup."}
            </p>
          </div>
        )}

        <div className="relative">
          {trackingSteps.map((step, index) => {
            const status = getStepStatus(step.id, step.title);
            const styles = getStepStyle(status);
            const isLastStep = index === trackingSteps.length - 1;

            return (
              <div key={step.id} className="relative flex items-start space-x-4 pb-8">
                {/* Vertical Line */}
                {!isLastStep && <div className={`absolute left-6 top-12 w-0.5 h-16 ${styles.line}`}></div>}

                {/* Step Circle with beeping effect for active status */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${styles.circle} transition-all duration-300`}>
                  {status === 'active' && !readyForPickup && (
                    <>
                      <div className="absolute inset-0 w-12 h-12 bg-blue-400/30 rounded-full animate-ping"></div>
                      <div className="absolute inset-1 w-10 h-10 bg-blue-400/20 rounded-full animate-pulse animation-delay-75"></div>
                    </>
                  )}
                  {status === 'active' && readyForPickup && (
                    <div className="absolute inset-0 w-12 h-12 bg-green-400/30 rounded-full animate-pulse"></div>
                  )}
                  {step.icon}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <h3 className={`font-semibold ${styles.title} transition-colors duration-300`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${styles.description} transition-colors duration-300`}>
                        {step.description}
                      </p>
                    </div>
                    {step.estimatedTime && status !== 'completed' && status !== 'pending' && (
                      <div className="mt-2 sm:mt-0 sm:ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.estimatedTime}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTracking;