import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Plus, Settings, User, Crown, Share2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useResumes } from "@/hooks/useResumes";
import { useCurrentSubscription } from "@/hooks/useSubscription";
import { useATSScores } from "@/hooks/useATS";
import { useReferrals } from "@/hooks/useSubscription";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { data: resumes, isLoading: resumesLoading } = useResumes();
  const { data: subscription, isLoading: subscriptionLoading } = useCurrentSubscription();
  const { data: atsScores, isLoading: atsLoading } = useATSScores();
  const { data: referrals, isLoading: referralsLoading } = useReferrals();

  const latestATSScore = atsScores?.[0]?.score || 0;
  const referralCount = referrals?.length || 0;

  const handleLogout = () => {
    logout();
  };

  if (resumesLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-8 w-48" />
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-brand-600" />
            <span className="text-2xl font-bold text-gray-900">ResumeIt</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/subscription">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              {user?.full_name || user?.username}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.full_name?.split(' ')[0] || user?.username}!
          </h1>
          <p className="text-gray-600">Ready to build your next career-winning resume?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Resumes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {resumes?.length || 0}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Subscription</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${
                      subscription?.status === 'active' 
                        ? 'bg-success-100 text-success-700' 
                        : 'bg-warning-100 text-warning-700'
                    }`}>
                      {subscription?.plan?.name || 'Free'}
                    </Badge>
                    <Crown className="h-4 w-4 text-warning-600" />
                  </div>
                </div>
                <Link to="/subscription">
                  <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                    {subscription?.status === 'active' ? 'Manage' : 'Upgrade'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Latest ATS Score</p>
                  <p className={`text-2xl font-bold ${
                    latestATSScore >= 90 ? 'text-success-600' :
                    latestATSScore >= 80 ? 'text-warning-600' :
                    'text-red-600'
                  }`}>
                    {latestATSScore}%
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  latestATSScore >= 90 ? 'bg-success-100' :
                  latestATSScore >= 80 ? 'bg-warning-100' :
                  'bg-red-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    latestATSScore >= 90 ? 'text-success-600' :
                    latestATSScore >= 80 ? 'text-warning-600' :
                    'text-red-600'
                  }`}>
                    {latestATSScore >= 90 ? 'A' : latestATSScore >= 80 ? 'B' : 'C'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{referralCount}</p>
                </div>
                <Share2 className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Gallery */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Resumes</h2>
              <Link to="/resume-builder/templates">
                <Button className="bg-brand-600 hover:bg-brand-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Resume
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {resumes?.length === 0 ? (
                <Card className="md:col-span-2">
                  <CardContent className="p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
                    <p className="text-gray-600 mb-4">Create your first resume to get started</p>
                    <Link to="/resume-builder/templates">
                      <Button className="bg-brand-600 hover:bg-brand-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Resume
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                resumes?.map((resume) => (
                  <Card key={resume.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{resume.title}</CardTitle>
                          <CardDescription>
                            Updated {new Date(resume.updated_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className="bg-success-100 text-success-700">
                          Active
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Link to={`/resume-builder/editor?id=${resume.id}`}>
                          <Button size="sm" variant="outline">Edit</Button>
                        </Link>
                        <Button size="sm" variant="outline">Download</Button>
                        <Button size="sm" variant="outline">Duplicate</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Getting Started</CardTitle>
                <CardDescription>Complete your profile setup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Create your first resume</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    atsScores?.length ? 'bg-success-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-sm text-gray-600">Run ATS optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    referralCount > 0 ? 'bg-success-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-sm text-gray-600">Invite friends for bonus</span>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            {(!subscription || subscription.status !== 'active') && (
              <Card className="bg-gradient-to-br from-brand-50 to-brand-100 border-brand-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Crown className="h-5 w-5 mr-2 text-brand-600" />
                    Upgrade to Premium
                  </CardTitle>
                  <CardDescription>
                    Unlock advanced ATS optimization and unlimited resumes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/subscription">
                    <Button className="w-full bg-brand-600 hover:bg-brand-700">
                      View Plans
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;