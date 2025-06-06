import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRequestPasswordReset } from "@/hooks/usePassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const requestPasswordResetMutation = useRequestPasswordReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await requestPasswordResetMutation.mutateAsync(email);
      setIsSubmitted(true);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleResendEmail = async () => {
    try {
      await requestPasswordResetMutation.mutateAsync(email);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-brand-600" />
              <span className="text-2xl font-bold text-gray-900">ResumeIt</span>
            </div>
          </div>

          <Card className="glass-effect shadow-soft">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success-600" />
              </div>
              <CardTitle className="text-2xl">Check Your Email</CardTitle>
              <CardDescription>
                We've sent password reset instructions to {email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-sm text-gray-600">
                Please check your email and follow the instructions to reset your password. 
                The link will expire in 24 hours for security reasons.
              </p>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-brand-600 hover:bg-brand-700" 
                  onClick={handleResendEmail}
                  disabled={requestPasswordResetMutation.isPending}
                >
                  {requestPasswordResetMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Resend Email'
                  )}
                </Button>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-gray-500">
                Didn't receive the email? Check your spam folder or try a different email address.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-8 w-8 text-brand-600" />
            <span className="text-2xl font-bold text-gray-900">ResumeIt</span>
          </div>
        </div>

        <Card className="glass-effect shadow-soft">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-brand-600" />
            </div>
            <CardTitle className="text-2xl">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address"
                  className="h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 bg-brand-600 hover:bg-brand-700"
                disabled={requestPasswordResetMutation.isPending || !email}
              >
                {requestPasswordResetMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Reset Instructions
                  </>
                )}
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-600 mt-4">
              Remember your password?{" "}
              <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;