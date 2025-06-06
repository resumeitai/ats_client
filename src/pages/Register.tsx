import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    phone_number: "",
    password: "",
    password2: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors: string[] = [];

    if (formData.password !== formData.password2) {
      errors.push("Passwords do not match");
    }

    if (formData.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!formData.agreeToTerms) {
      errors.push("You must agree to the Terms of Service and Privacy Policy");
    }

    if (
      formData.phone_number &&
      !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone_number)
    ) {
      errors.push("Please enter a valid phone number");
    }

    if (!formData.email.includes("@")) {
      errors.push("Please enter a valid email address");
    }

    if (formData.username.length < 3) {
      errors.push("Username must be at least 3 characters long");
    }

    if (formData.full_name.trim().length < 2) {
      errors.push("Please enter your full name");
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    setValidationErrors([]);

    try {
      await register({
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        full_name: formData.full_name.trim(),
        phone_number: formData.phone_number.trim(),
        password: formData.password,
        password2: formData.password2,
      }, navigate); // Pass navigate function to register
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-8 w-8 text-brand-600" />
            <span className="text-2xl font-bold text-gray-900">ResumeIt</span>
          </div>
        </div>

        <Card className="glass-effect shadow-soft">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Start building professional, ATS-optimized resumes today
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {validationErrors.length > 0 && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {validationErrors.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Enter your full name"
                  className="h-11"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username (min 3 characters)"
                  className="h-11"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  minLength={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="Enter your phone number (optional)"
                  className="h-11"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password (min 8 characters)"
                  className="h-11"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password2">Confirm Password *</Label>
                <Input
                  id="password2"
                  name="password2"
                  type="password"
                  placeholder="Confirm your password"
                  className="h-11"
                  value={formData.password2}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-start space-x-2 text-sm">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className="rounded mt-1"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
                <Label
                  htmlFor="agreeToTerms"
                  className="text-gray-600 cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-brand-600 hover:text-brand-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-brand-600 hover:text-brand-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-brand-600 hover:bg-brand-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <Separator className="my-4" />
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;