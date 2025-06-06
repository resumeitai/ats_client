import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Upload, Zap, Crown, FileText, Loader2,
  Target, CheckCircle, AlertCircle
} from "lucide-react";
import { useResumes } from "@/hooks/useResumes";
import { useCreateATSScore } from "@/hooks/useATS";
import { useCurrentSubscription } from "@/hooks/useSubscription";
import { toast } from "@/hooks/use-toast";

const JobAnalysis = () => {
  const navigate = useNavigate();
  const { data: resumes, isLoading: resumesLoading } = useResumes();
  const { data: subscription } = useCurrentSubscription();
  const createATSScoreMutation = useCreateATSScore();

  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    jobDescription: '',
    resumeId: ''
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Read file content and set to jobDescription
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setFormData(prev => ({ ...prev, jobDescription: content }));
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.jobDescription || !formData.resumeId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if user has premium subscription for unlimited analyses
    const isPremium = subscription?.status === 'active';
    if (!isPremium) {
      // Check usage limits for free users
      // This would typically come from an API call to check current usage
    }

    setIsAnalyzing(true);

    try {
      const result = await createATSScoreMutation.mutateAsync({
        resume_id: parseInt(formData.resumeId),
        job_title: formData.jobTitle,
        job_description: formData.jobDescription
      });

      toast({
        title: "Analysis Complete",
        description: "Your ATS analysis is ready!"
      });

      // Navigate to results page with the analysis ID
      navigate(`/ats-optimization/results?id=${result.id}`);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const recentAnalyses = [
    { job: "Frontend Developer", score: 87, date: "2 days ago", company: "TechCorp" },
    { job: "Full Stack Engineer", score: 92, date: "1 week ago", company: "StartupXYZ" },
    { job: "Software Architect", score: 78, date: "2 weeks ago", company: "BigTech Inc" }
  ];

  if (resumesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-brand-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">ATS Score Analysis</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Analyze your resume against specific job requirements to get an ATS compatibility score and optimization suggestions
            </p>
            {subscription?.status !== 'active' && (
              <Badge className="mt-4 bg-warning-100 text-warning-700">
                <Crown className="h-3 w-3 mr-1" />
                Premium Feature - Limited to 5 analyses per month
              </Badge>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Information</CardTitle>
                  <CardDescription>
                    Enter the details of the job you're applying for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title *</Label>
                        <Input
                          id="jobTitle"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                          placeholder="e.g., Senior Software Engineer"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="e.g., Google, Microsoft"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobDescription">Job Description *</Label>
                      <Textarea
                        id="jobDescription"
                        value={formData.jobDescription}
                        onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                        placeholder="Paste the complete job description here..."
                        rows={8}
                        className="resize-none"
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                      <Upload className="h-6 w-6 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Upload Job Description</p>
                        <p className="text-xs text-gray-500">
                          Or upload a file (PDF, DOC, TXT)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm">
                          Choose File
                        </Button>
                      </Label>
                    </div>

                    {uploadedFile && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          File uploaded: {uploadedFile.name}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="resumeSelect">Select Resume to Analyze *</Label>
                      <Select
                        value={formData.resumeId}
                        onValueChange={(value) => handleInputChange('resumeId', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a resume to analyze" />
                        </SelectTrigger>
                        <SelectContent>
                          {resumes?.map((resume) => (
                            <SelectItem key={resume.id} value={resume.id.toString()}>
                              {resume.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {resumes?.length === 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          You need to create a resume first before running ATS analysis.
                          <Button variant="link" className="p-0 h-auto ml-1" asChild>
                            <a href="/resume-builder/templates">Create Resume</a>
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-lg"
                      disabled={isAnalyzing || resumes?.length === 0}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Analyzing Resume...
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2" />
                          Analyze ATS Compatibility
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How it Works */}
              <Card className="bg-gradient-to-br from-brand-50 to-brand-100 border-brand-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-brand-600" />
                    How ATS Analysis Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Keyword Matching</h4>
                      <p className="text-sm text-gray-600">
                        We analyze job requirements and match them with your resume content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Format Analysis</h4>
                      <p className="text-sm text-gray-600">
                        Check if your resume format is ATS-friendly and readable
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Optimization Tips</h4>
                      <p className="text-sm text-gray-600">
                        Get specific recommendations to improve your ATS score
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Analyses */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Analyses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAnalyses.map((analysis, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{analysis.job}</p>
                        <p className="text-xs text-gray-500">{analysis.company}</p>
                        <p className="text-xs text-gray-500">{analysis.date}</p>
                      </div>
                      <Badge
                        className={`${
                          analysis.score >= 90 ? 'bg-success-100 text-success-700' :
                          analysis.score >= 80 ? 'bg-warning-100 text-warning-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        {analysis.score}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upgrade Prompt */}
              {subscription?.status !== 'active' && (
                <Card className="bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-warning-800">
                      <Crown className="h-5 w-5 mr-2" />
                      Upgrade to Premium
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-warning-700">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Unlimited ATS analyses</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Advanced optimization suggestions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Priority support</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-warning-600 hover:bg-warning-700">
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAnalysis;