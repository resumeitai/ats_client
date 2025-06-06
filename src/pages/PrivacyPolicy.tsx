import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Shield, Eye, Database, Cookie, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-brand-600" />
            <FileText className="h-8 w-8 text-brand-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2024</p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-brand-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us. This includes your name, email address, phone number, 
                  and resume content.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Usage Information</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We automatically collect information about how you use our services, including your 
                  interactions with features, pages visited, and time spent on our platform.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Device Information</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We collect information about the device you use to access our services, including 
                  hardware model, operating system, browser type, and IP address.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-brand-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Provide, maintain, and improve our services</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Process transactions and send related information</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Send technical notices, updates, and support messages</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Respond to your comments and questions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">Analyze usage patterns to improve user experience</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-gray-700">• With service providers who assist in our operations</p>
                <p className="text-sm text-gray-700">• When required by law or to protect our rights</p>
                <p className="text-sm text-gray-700">• In connection with a business transfer or merger</p>
                <p className="text-sm text-gray-700">• With your explicit consent</p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-brand-600" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. This includes 
                encryption, secure servers, and regular security assessments.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="h-5 w-5 mr-2 text-brand-600" />
                Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage, 
                and assist in our marketing efforts. You can control cookie settings through your browser 
                preferences.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                You have the right to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">• Access your personal information</p>
                  <p className="text-sm text-gray-700">• Correct inaccurate information</p>
                  <p className="text-sm text-gray-700">• Delete your account and data</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">• Export your data</p>
                  <p className="text-sm text-gray-700">• Opt-out of marketing communications</p>
                  <p className="text-sm text-gray-700">• Restrict data processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-brand-600" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-brand-50 p-4 rounded-lg">
                <p className="text-sm text-brand-800">Email: privacy@resumeit.com</p>
                <p className="text-sm text-brand-800">Address: 123 Business Street, Tech City, TC 12345</p>
                <p className="text-sm text-brand-800">Phone: +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-gray-500">
          <p>This privacy policy is effective as of January 1, 2024 and will remain in effect except with respect to any changes in its provisions in the future.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;