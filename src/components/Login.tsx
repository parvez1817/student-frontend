import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_URL } from '@/lib/utils';

interface HistoryRequest {
  _id: string;
  registerNumber: string;
  name: string;
  reason: string;
  createdAt: string;
}

interface LoginProps {
  onLogin: (registerNumber: string, historyData?: HistoryRequest[]) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { toast } = useToast();
  const [registerNumber, setRegisterNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerNumber.trim()) return;

    setIsLoading(true);
    try {
<<<<<<< HEAD
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

=======
      // Parallelize login and history fetches
>>>>>>> e966d431c7eec10e26604160d92118c357e40555
      const [loginResponse, historyResponse] = await Promise.all([
        fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ registerNumber }),
<<<<<<< HEAD
          signal: controller.signal,
        }),
        fetch(`${API_URL}/api/acchistoryids/user/${registerNumber}`, {
          signal: controller.signal,
        })
      ]);

      clearTimeout(timeoutId);

=======
        }),
        fetch(`${API_URL}/api/acchistoryids/user/${registerNumber}`)
      ]);

>>>>>>> e966d431c7eec10e26604160d92118c357e40555
      const loginData = await loginResponse.json();
      const historyData = await historyResponse.json();

      if (loginData.success) {
        toast({
          title: "Login Successful!",
          description: "Welcome to the ID Card Portal.",
        });
        onLogin(registerNumber, historyData);
      } else {
        toast({
          title: "Login Failed",
          description: loginData.message || "Register number not found.",
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
<<<<<<< HEAD
      if (error instanceof Error && error.name === 'AbortError') {
        toast({
          title: "Request Timeout",
          description: "Login request took too long. Please check your connection.",
          variant: 'destructive',
        });
      } else {
        toast({
          title: "Login Error",
          description: "Something went wrong. Please try again.",
          variant: 'destructive',
        });
      }
=======
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: 'destructive',
      });
>>>>>>> e966d431c7eec10e26604160d92118c357e40555
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-gradient flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <Card className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl animate-fade-in">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">ID</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Sona College of Technology
          </CardTitle>
          <p className="text-white/80 text-sm">ID Card Reissue Portal</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium">Register Number</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enter your register number"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  className="pl-10 bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !registerNumber.trim()}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;