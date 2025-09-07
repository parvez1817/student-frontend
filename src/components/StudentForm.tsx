import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, User, BookOpen, Calendar, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_URL } from '@/lib/utils';

interface StudentFormProps {
  onSubmit: () => void;
  disabled: boolean;
  buttonText?: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, disabled, buttonText = 'Submit Request' }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    registerNumber: '',
    department: '',
    year: '',
    section: '',
    reason: '',
    photo: null as File | null,
    dob: '',
    libraryCode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('registerNumber', formData.registerNumber);
    data.append('department', formData.department);
    data.append('year', formData.year);
    data.append('section', formData.section);
    data.append('reason', formData.reason);
    data.append('dob', formData.dob);
    data.append('libraryCode', formData.libraryCode);
    if (formData.photo) data.append('photo', formData.photo);

    try {
      const response = await fetch(`${API_URL}/api/idcards`, {
        method: 'POST',
        body: data
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();

      if (result.success) {
        toast({
          title: "Request Submitted Successfully!",
          description: "Your ID card reissue request has been submitted for approval. Inform your CC for further process.",
        });
        setIsLoading(false);
        onSubmit();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || 'There was an error submitting your request.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData(prev => ({ ...prev, photo: file }));
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>ID Card Reissue Request</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
                <User className="h-4 w-4" /> <span>Full Name</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300"
                required
              />
            </div>

            {/* Register Number */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
                <User className="h-4 w-4" /> <span>Register Number</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your register number"
                value={formData.registerNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, registerNumber: e.target.value }))}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
                <Calendar className="h-4 w-4" /> <span>Date of Birth</span>
              </label>
              <Input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300"
                required
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
                <BookOpen className="h-4 w-4" /> <span>Department</span>
              </label>
              <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                <SelectTrigger className="bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-blue-400">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-600">
                  <SelectItem className="text-white" value="Artificial Intelligence & Machine learning">Artificial Intelligence & Machine learning</SelectItem>
                  <SelectItem className="text-white" value="Artificial Intelligence & Data science">Artificial Intelligence & Data science</SelectItem>
                  <SelectItem className="text-white" value="Biomedical Engineering">Biomedical Engineering</SelectItem>
                  <SelectItem className="text-white" value="Civil Engineering">Civil Engineering</SelectItem>
                  <SelectItem className="text-white" value="Computer Science Engineering">Computer Science Engineering</SelectItem>
                  <SelectItem className="text-white" value="Control System Design">Control System Design</SelectItem>
                  <SelectItem className="text-white" value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</SelectItem>
                  <SelectItem className="text-white" value="Electronics & Communication Engineering">Electronics & Communication Engineering</SelectItem>
                  <SelectItem className="text-white"value="Fashion Technology">Fashion Technology</SelectItem>
                  <SelectItem className="text-white" value="Information Technology">Information Technology</SelectItem>
                  <SelectItem className="text-white" value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem className="text-white" value="Mechatronics Engineering">Mechatronics Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
                <Calendar className="h-4 w-4" /> <span>Year</span>
              </label>
              <Select value={formData.year} onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}>
                <SelectTrigger className="bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-blue-400">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-600">
                  <SelectItem className="text-white" value="1">1st Year</SelectItem>
                  <SelectItem className="text-white" value="2">2nd Year</SelectItem>
                  <SelectItem className="text-white" value="3">3rd Year</SelectItem>
                  <SelectItem className="text-white" value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Section */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
                <Calendar className="h-4 w-4" /> <span>Section</span>
              </label>
              <Select value={formData.section} onValueChange={(value) => setFormData(prev => ({ ...prev, section: value }))}>
                <SelectTrigger className="bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-blue-400">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-600">
                  <SelectItem className="text-white" value="a">A</SelectItem>
                  <SelectItem className="text-white" value="b">B</SelectItem>
                  <SelectItem className="text-white" value="c">C</SelectItem>
                  <SelectItem className="text-white" value="d">D</SelectItem>
                  <SelectItem className="text-white" value="e">E</SelectItem>
                  <SelectItem className="text-white" value="f">F</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Library Code */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
                <BookOpen className="h-4 w-4" /> <span>Library Code</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your library code"
                value={formData.libraryCode}
                onChange={(e) => setFormData(prev => ({ ...prev, libraryCode: e.target.value }))}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300"
                required
              />
            </div>

            {/* Signature Upload */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
                <Upload className="h-4 w-4" /> <span>Student signature photo</span>
              </label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                <div className="bg-white/10 border border-white/20 rounded-md p-3 text-center hover:bg-white/20 transition-colors duration-300 cursor-pointer">
                  <Upload className="h-6 w-6 mx-auto mb-2 text-white/60" />
                  <p className="text-white/80 text-sm">{formData.photo ? formData.photo.name : 'Click to upload photo'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <label className="text-white/90 text-sm font-medium flex items-center space-x-2">
              <FileText className="h-4 w-4" /> <span>Reason for Reissue</span>
            </label>
            <Textarea
              placeholder="Explain why you need a new ID card..."
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-blue-400 transition-all duration-300 min-h-24"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || disabled}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading
              ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>Submitting Request...</span>
                </div>
              )
              : buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;