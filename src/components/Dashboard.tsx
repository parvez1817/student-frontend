import React, { useState, useEffect } from 'react';
import Navigation, { Footer } from './Navigation';
import StudentForm from './StudentForm';
import PreviousRequests from './PreviousRequests';
import LiveTracking from './LiveTracking';
import { API_URL } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardProps {
  onLogout: () => void;
  registerNumber: string | null;
  onLogin: (registerNumber: string, historyData?: HistoryRequest[]) => void;
  historyData: HistoryRequest[];
}

interface StatusResponse {
  success: boolean;
  status: 'none' | 'under-review' | 'approved-printing' | 'ready-pickup' | 'rejected';
  formEnabled: boolean;
  buttonText: string;
  details: {
    hasIdCardRequest: boolean;
    isPrinting: boolean;
    isReadyForPickup: boolean;
    isRejected: boolean;
  };
}

interface HistoryRequest {
  _id: string;
  registerNumber: string;
  name: string;
  reason: string;
  createdAt: string;
}

interface TransferResponse {
  success: boolean;
  message: string;
  transferredCount: number;
}

interface RejectedCardResponse {
  found: boolean;
  rejectedCard?: {
    registerNumber: string;
    name: string;
    rejectionReason: string;
    createdAt: string;
  };
  error?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, registerNumber, onLogin, historyData }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = not started, 1 = submitted, 2 = under review, 3 = approved, 4 = ready
  const [isPrintingActive, setIsPrintingActive] = useState(false);
  const [isReadyForPickup, setIsReadyForPickup] = useState(false);
  const [formEnabled, setFormEnabled] = useState(false); // Initially disabled
  const [buttonText, setButtonText] = useState('Submit Request');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferMessage, setTransferMessage] = useState<string | null>(null);
  const [showRejectedPopup, setShowRejectedPopup] = useState(false);
  const [showReadyPopup, setShowReadyPopup] = useState(false);
  const [rejectedCardData, setRejectedCardData] = useState<{
    registerNumber: string;
    name: string;
    createdAt: string;
  } | null>(null);
  const [isTransferringRejected, setIsTransferringRejected] = useState(false);

  const { data: statusData, isLoading: statusLoading } = useQuery({
    queryKey: ['status', registerNumber],
    queryFn: () => fetch(`${API_URL}/api/status/${registerNumber}`).then(res => res.ok ? res.json() : { success: false }),
    enabled: !!registerNumber,
  });

  const { data: rejectedData, isLoading: rejectedLoading } = useQuery({
    queryKey: ['rejected', registerNumber],
    queryFn: () => fetch(`${API_URL}/api/rejectedidcards/${registerNumber}`).then(res => res.ok ? res.json() : { found: false }),
    enabled: !!registerNumber,
  });

  useEffect(() => {
    if (statusData?.success) {
<<<<<<< HEAD
=======
      console.log('Comprehensive status response:', statusData);
>>>>>>> e966d431c7eec10e26604160d92118c357e40555
      const { status, formEnabled, buttonText, details } = statusData;

      setIsPrintingActive(details.isPrinting);
      setIsReadyForPickup(details.isReadyForPickup);
      if (details.isReadyForPickup) {
        setShowReadyPopup(true);
      }
      setFormEnabled(formEnabled);
      setButtonText(buttonText);

<<<<<<< HEAD
      const stepMap = {
        'under-review': 2,
        'approved-printing': 3,
        'ready-pickup': 4,
        'none': 0
      };
      setCurrentStep(stepMap[status] || 0);
    } else if (statusData && !statusData.success) {
=======
      // Map status to currentStep
      switch (status) {
        case 'under-review':
          setCurrentStep(2); // "Under Review"
          console.log('Setting current step to 2 (Under Review)');
          break;
        case 'approved-printing':
          setCurrentStep(3); // "Approved & Printing"
          console.log('Setting current step to 3 (Approved & Printing)');
          break;
        case 'ready-pickup':
          setCurrentStep(4); // "Ready for Pickup"
          console.log('Setting current step to 4 (Ready for Pickup)');
          break;
        case 'none':
        default:
          setCurrentStep(0); // No request submitted
          console.log('Setting current step to 0 (No request)');
          break;
      }
    } else if (statusData && !statusData.success) {
      // Fallback to default state if API fails
>>>>>>> e966d431c7eec10e26604160d92118c357e40555
      setIsPrintingActive(false);
      setIsReadyForPickup(false);
      setFormEnabled(true);
      setButtonText('Submit Request');
      setCurrentStep(0);
    }
  }, [statusData]);

  useEffect(() => {
    if (rejectedData?.found && rejectedData.rejectedCard) {
<<<<<<< HEAD
=======
      console.log('Rejected ID card check response:', rejectedData);
>>>>>>> e966d431c7eec10e26604160d92118c357e40555
      setRejectedCardData(rejectedData.rejectedCard);
      setShowRejectedPopup(true);
    }
  }, [rejectedData]);

  const isLoading = statusLoading || rejectedLoading;

  const handleFormSubmit = () => {
<<<<<<< HEAD
    if (isPrintingActive) return;

    setCurrentStep(1);
    setTimeout(() => {
      if (!isPrintingActive) setCurrentStep(2);
    }, 2000);
=======
    // If already in printing status, don't change the step
    if (isPrintingActive) {
      console.log('User is already in printing status, keeping current step');
      return;
    }

    setCurrentStep(1); // Move to "Request Submitted"
    console.log('Form submitted, moving to step 1 (Request Submitted)');

    // Simulate progression through steps
    setTimeout(() => {
      if (!isPrintingActive) {
        setCurrentStep(2); // Move to "Under Review"
        console.log('Moving to step 2 (Under Review)');
      }
    }, 2000);

    // Note: Steps 3 and 4 would be triggered by teacher/admin actions in a real app
>>>>>>> e966d431c7eec10e26604160d92118c357e40555
  };

  const handleTransferToHistory = async () => {
    if (!registerNumber) return;

    setIsTransferring(true);
    setTransferMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/acceptedidcards/transfer-to-history/${registerNumber}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data: TransferResponse = await response.json();

      if (data.success) {
        setTransferMessage(data.message);
        setFormEnabled(true); // Enable the form when transfer is successful
        setShowReadyPopup(false); // Close the popup
        // Refresh the status after successful transfer
        fetch(`${API_URL}/api/status/${registerNumber}`)
          .then(res => res.ok ? res.json() : { success: false })
          .then((data: StatusResponse) => {
            if (data.success) {
              setIsReadyForPickup(data.details.isReadyForPickup);
            }
          });
      } else {
        setTransferMessage(data.message || 'Transfer failed');
      }
    } catch (error) {
      console.error('Error transferring to history:', error);
      setTransferMessage('Error transferring ID cards to history');
    } finally {
      setIsTransferring(false);
    }
  };

  const handleTransferRejectedToHistory = async () => {
    if (!registerNumber) return;

    setIsTransferringRejected(true);

    try {
      const response = await fetch(`${API_URL}/api/rejectedidcards/transfer-to-history/${registerNumber}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data: TransferResponse = await response.json();

      if (data.success) {
        // Close the popup and reset the state
        setShowRejectedPopup(false);
        setRejectedCardData(null);
        // Refresh the status after successful transfer
        fetch(`${API_URL}/api/status/${registerNumber}`)
          .then(res => res.ok ? res.json() : { success: false })
          .then((data: StatusResponse) => {
            if (data.success) {
              setFormEnabled(data.formEnabled);
              setButtonText(data.buttonText);
            }
          });
      } else {
        console.error('Failed to transfer rejected card:', data.message);
      }
    } catch (error) {
      console.error('Error transferring rejected card to history:', error);
    } finally {
      setIsTransferringRejected(false);
    }
  };

  // Determine if form should be disabled
  const isFormDisabled = currentStep > 0;

  return (
    <div className="min-h-screen bg-blue-gradient flex">
      {/* Rejected Card Popup */}
      {showRejectedPopup && rejectedCardData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Rejected</h3>
              <p className="text-gray-600 text-sm">
                The ID card request has been rejected. Try again.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">The ID card request has been rejected. Try again.</p>
            </div>

              <p className="text-gray-500 text-xs text-center mb-4">
                Rejected on: {new Date(rejectedCardData.createdAt).toLocaleDateString()}
              </p>

            <button
              onClick={handleTransferRejectedToHistory}
              disabled={isTransferringRejected}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTransferringRejected ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'OK'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Ready for Pickup Popup */}
      {showReadyPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ID Card Ready for Pickup!</h3>
              <p className="text-gray-600 text-sm">
                Pay the bill and get your ID card in the Sona versity.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-sm">Lost your ID? We'll fix it speedily.</p>
            </div>

            <button
              onClick={handleTransferToHistory}
              disabled={isTransferring}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTransferring ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'OK'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${showRejectedPopup || showReadyPopup ? 'blur-sm' : ''}`}>
        <Navigation onLogout={onLogout} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
            <p className="text-white/80">Manage your ID card reissue requests</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column Skeleton */}
              <div className="space-y-8" id="form">
                <Skeleton className="h-64 w-full" />
                <div className="block lg:hidden" id="tracking">
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>

              {/* Right Column Skeleton */}
              <div className="space-y-8" id="requests">
                <Skeleton className="h-64 w-full" />
                <div className="hidden lg:block">
                  <Skeleton className="h-32 w-full" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8" id="form">
                <StudentForm
                  onSubmit={handleFormSubmit}
                  disabled={!formEnabled}
                  buttonText={buttonText}
                />

                <div className="block lg:hidden" id="tracking">
                  <LiveTracking
                    currentStep={currentStep}
                    printingActive={isPrintingActive}
                    readyForPickup={isReadyForPickup}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8" id="requests">
                <PreviousRequests registerNumber={registerNumber} historyData={historyData} />

                <div className="hidden lg:block">
                  <LiveTracking
                    currentStep={currentStep}
                    printingActive={isPrintingActive}
                    readyForPickup={isReadyForPickup}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;