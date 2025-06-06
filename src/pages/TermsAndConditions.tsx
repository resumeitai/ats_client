import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, AlertTriangle, CreditCard, Users, Shield } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scale className="h-8 w-8 text-brand-600" />
            <FileText className="h-8 w-8 text-brand-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-600 text-lg">
            Please read these terms carefully before using our services.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Badge className="bg-brand-100 text-brand-700">Effective: January 2024</Badge>
            <Badge variant="outline">Version 2.1</Badge>
          </div>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-brand-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                By accessing and using ResumeIt ("the Service"), you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                ResumeIt is an online platform that provides resume building and ATS optimization services. 
                Our services include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">• Resume creation and editing tools</p>
                  <p className="text-sm text-gray-700">• Professional resume templates</p>
                  <p className="text-sm text-gray-700">• ATS compatibility analysis</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">• Resume optimization suggestions</p>
                  <p className="text-sm text-gray-700">• PDF export functionality</p>
                  <p className="text-sm text-gray-700">• Customer support services</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-brand-600" />
                User Accounts and Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Account Creation</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  You must provide accurate and complete information when creating an account. You are 
                  responsible for maintaining the confidentiality of your account credentials.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Acceptable Use</h3>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800 mb-2">You agree NOT to:</p>
                  <div className="space-y-1">
                    <p className="text-xs text-red-700">• Use the service for illegal or unauthorized purposes</p>
                    <p className="text-xs text-red-700">• Share false or misleading information</p>
                    <p className="text-xs text-red-700">• Attempt to gain unauthorized access to our systems</p>
                    <p className="text-xs text-red-700">• Interfere with or disrupt the service</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription and Billing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-brand-600" />
                Subscription and Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Subscription Plans</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We offer both free and paid subscription plans. Paid subscriptions provide access to 
                  premium features and are billed on a recurring basis.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Payment Terms</h3>
                <div className="bg-brand-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm text-brand-800">• Payments are processed securely through third-party providers</p>
                  <p className="text-sm text-brand-800">• Subscriptions auto-renew unless cancelled</p>
                  <p className="text-sm text-brand-800">• Refunds are subject to our refund policy</p>
                  <p className="text-sm text-brand-800">• Price changes will be communicated in advance</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cancellation</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  You may cancel your subscription at any time. Cancellation will take effect at the end 
                  of your current billing period.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Our Content</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The Service and its original content, features, and functionality are owned by ResumeIt 
                  and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Your Content</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  You retain ownership of the content you create using our service. By using our service, 
                  you grant us a limited license to process and store your content to provide our services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-brand-600" />
                Privacy and Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed 
                by our Privacy Policy, which is incorporated into these Terms by reference. Please review 
                our Privacy Policy to understand our practices.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-warning-600" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-warning-50 p-4 rounded-lg">
                <h3 className="font-semibold text-warning-800 mb-2">Service Availability</h3>
                <p className="text-sm text-warning-700">
                  We strive to maintain high service availability but cannot guarantee uninterrupted access. 
                  The service is provided "as is" without warranties of any kind.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  In no event shall ResumeIt be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                  or other intangible losses.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without 
                prior notice or liability, under our sole discretion, for any reason whatsoever, including 
                without limitation if you breach the Terms.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-brand-50 p-4 rounded-lg">
                <p className="text-sm text-brand-800">Email: legal@resumeit.com</p>
                <p className="text-sm text-brand-800">Address: 123 Business Street, Tech City, TC 12345</p>
                <p className="text-sm text-brand-800">Phone: +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-gray-500">
          <p>These terms and conditions are effective as of January 1, 2024.</p>
          <p className="mt-1">By using ResumeIt, you acknowledge that you have read and understood these terms.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;