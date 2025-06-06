import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Target, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-brand-600" />
            <span className="text-2xl font-bold text-gray-900">ResumeIt</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-brand-600 hover:bg-brand-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Badge className="mb-6 bg-brand-100 text-brand-700 hover:bg-brand-200">
            ATS-Optimized Resume Builder
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Resumes That Get You
            <span className="text-brand-600 block">Hired</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create ATS-friendly resumes with AI-powered optimization. 
            Get past applicant tracking systems and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-lg px-8 py-6">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ResumeIt?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform ensures your resume gets noticed by both ATS systems and hiring managers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="glass-effect shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-brand-600" />
              </div>
              <CardTitle>ATS Optimization</CardTitle>
              <CardDescription>
                Get real-time ATS scores and optimization suggestions to ensure your resume passes automated screening.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-effect shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-brand-600" />
              </div>
              <CardTitle>AI-Powered Suggestions</CardTitle>
              <CardDescription>
                Leverage AI to improve your resume content, optimize keywords, and highlight your best achievements.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-effect shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-brand-600" />
              </div>
              <CardTitle>Professional Templates</CardTitle>
              <CardDescription>
                Choose from industry-specific templates designed by HR professionals and career experts.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Beat the ATS, Impress the Hiring Manager
              </h2>
              <div className="space-y-4">
                {[
                  "Real-time ATS compatibility scoring",
                  "Keyword optimization for job descriptions",
                  "Professional formatting that stands out",
                  "Multiple export formats (PDF, Word, etc.)",
                  "Version control and resume history"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/register">
                  <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                    Get Started Today
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-brand-600 mb-2">95%</div>
              <div className="text-gray-700 mb-4">ATS Pass Rate</div>
              <div className="text-sm text-gray-600">
                Our users see a 95% improvement in getting past ATS systems
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-bold">ResumeIt</span>
          </div>
          <p className="text-gray-400 mb-4">
            Build professional, ATS-optimized resumes that get you hired.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;