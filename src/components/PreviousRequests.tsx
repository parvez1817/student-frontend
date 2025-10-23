import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { API_URL } from '@/lib/utils';

interface Request {
  _id: string;
  registerNumber: string;
  name: string;
  reason: string;
  createdAt: string;
  type?: 'accepted' | 'rejected';
  sourceCollection?: string;
}

interface HistoryRequest extends Request {}

interface PreviousRequestsProps {
  registerNumber: string | null;
  historyData: HistoryRequest[]; // New prop for historical data
}

const PreviousRequests: React.FC<PreviousRequestsProps> = ({ registerNumber, historyData }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!registerNumber) {
        setRequests([]);
        setLoading(false);
        return;
      }

      try {
<<<<<<< HEAD
        const [acceptedRes, rejectedRes] = await Promise.all([
          fetch(`${API_URL}/api/acceptedidcards/user/${registerNumber}`),
          fetch(`${API_URL}/api/rejhistoryids/user/${registerNumber}`)
        ]);

        const [acceptedData, rejectedData] = await Promise.all([
          acceptedRes.json(),
          rejectedRes.json()
        ]);

        const acceptedRequests = Array.isArray(acceptedData) ? acceptedData : [];
        const rejectedRequests = Array.isArray(rejectedData) ? rejectedData : [];

        const acceptedWithType = acceptedRequests.map(req => ({ ...req, type: 'accepted' as const }));
        const rejectedWithType = rejectedRequests.map(req => ({ ...req, type: 'rejected' as const }));

        setRequests([...acceptedWithType, ...historyData, ...rejectedWithType]);
=======
        console.log('Fetching accepted ID cards for register number:', registerNumber);
        const acceptedRes = await fetch(`${API_URL}/api/acceptedidcards/user/${registerNumber}`);
        const acceptedData = await acceptedRes.json();
        console.log('Accepted ID cards response:', acceptedData);

        let acceptedRequests: Request[] = [];
        if (Array.isArray(acceptedData)) {
          acceptedRequests = acceptedData;
        } else if (Array.isArray(acceptedData.requests)) {
          acceptedRequests = acceptedData.requests;
        }

        // Add a type field to distinguish accepted requests
        const acceptedWithType = acceptedRequests.map(req => ({ ...req, type: 'accepted' as const }));

        // Set accepted requests first combined with historical data
        setRequests([...acceptedWithType, ...historyData]);

        console.log('Fetching rejected history ID cards for register number:', registerNumber);
        const rejectedRes = await fetch(`${API_URL}/api/rejhistoryids/user/${registerNumber}`);
        const rejectedData = await rejectedRes.json();
        console.log('Rejected history ID cards response:', rejectedData);

        let rejectedRequests: Request[] = [];
        if (Array.isArray(rejectedData)) {
          rejectedRequests = rejectedData;
        } else if (Array.isArray(rejectedData.requests)) {
          rejectedRequests = rejectedData.requests;
        }

        // Add a type field to distinguish rejected requests
        const rejectedWithType = rejectedRequests.map(req => ({ ...req, type: 'rejected' as const }));

        // Append rejected requests to existing requests
        setRequests(prev => [...prev, ...rejectedWithType]);
>>>>>>> e966d431c7eec10e26604160d92118c357e40555
      } catch (err) {
        console.error('Error fetching ID cards:', err);
        setError('Failed to load previous requests.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [registerNumber, historyData]);

  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Previous IDCards Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <p className="text-white/70 text-center py-8">Loading...</p>
          ) : error ? (
            <p className="text-red-400 text-center py-8">{error}</p>
          ) : requests.length === 0 ? (
            <p className="text-white/70 text-center py-8">No ID cards found.</p>
          ) : (
            requests.map((request) => (
          <div
            key={request._id}
            className={`bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200 ${
              request.type === 'rejected' ? 'bg-red-600/20 border-red-600/30' : ''
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-white font-medium">{request.name}</span>
                {request.sourceCollection === 'rejectedidcards' ? (
                  <span className="text-red-400 text-xs bg-red-500/20 px-2 py-1 rounded-full">✗ Rejected</span>
                ) : (
                  <span className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full">✓ Accepted</span>
                )}
              </div>
              <p className="text-white/80 text-sm">Register Number: {request.registerNumber}</p>
              {request.reason && <p className="text-white/80 text-sm">Reason: {request.reason}</p>}
              <p className="text-white/60 text-xs">
                {request.sourceCollection === 'rejectedidcards' ? 'Rejected on' : 'Accepted on'} {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviousRequests;