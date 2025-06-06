import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Crown, Calendar, CreditCard, Users, Gift, 
  Bell, Shield, Download, Clock, CheckCircle,
  Copy, Share2, AlertTriangle, Trash2
} from "lucide-react";
import { 
  useCurrentSubscription, 
  useSubscriptionPlans, 
  useCreateSubscription,
  useCancelSubscription,
  useTransactions,
  useReferrals,
  useCreateReferral
} from "@/hooks/useSubscription";
import { toast } from "@/hooks/use-toast";

const SubscriptionDashboard = () => {
  const { data: subscription, isLoading: subscriptionLoading } = useCurrentSubscription();
  const { data: plans, isLoading: plansLoading } = useSubscriptionPlans();
  const { data: transactions, isLoading: transactionsLoading } = useTransactions();
  const { data: referrals, isLoading: referralsLoading } = useReferrals();
  
  const createSubscriptionMutation = useCreateSubscription();
  const cancelSubscriptionMutation = useCancelSubscription();
  const createReferralMutation = useCreateReferral();

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [referralEmail, setReferralEmail] = useState('');
  const [autoRenew, setAutoRenew] = useState(subscription?.is_auto_renew || false);

  const handleUpgrade = async (planId: number) => {
    try {
      await createSubscriptionMutation.mutateAsync({ planId, autoRenew: true });
      toast({
        title: "Subscription Updated",
        description: "Your subscription has been upgraded successfully"
      });
    } catch (error) {
      toast({
        title: "Upgrade Failed",
        description: "Failed to upgrade subscription. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    try {
      await cancelSubscriptionMutation.mutateAsync(subscription.id);
      setShowCancelConfirm(false);
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription will remain active until the end of the billing period"
      });
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSendReferral = async () => {
    if (!referralEmail) return;
    
    try {
      const referralCode = `REF${Date.now()}`;
      await createReferralMutation.mutateAsync({
        email: referralEmail,
        code: referralCode
      });
      setReferralEmail('');
      toast({
        title: "Referral Sent",
        description: "Referral invitation has been sent successfully"
      });
    } catch (error) {
      toast({
        title: "Referral Failed",
        description: "Failed to send referral. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyReferralLink = () => {
    const referralLink = `https://resumeit.com/ref/user123`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied",
      description: "Referral link copied to clipboard"
    });
  };

  if (subscriptionLoading || plansLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-64" />
            </div>
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  const currentPlan = subscription?.plan;
  const isActive = subscription?.status === 'active';
  const daysUntilRenewal = subscription?.end_date ? 
    Math.ceil((new Date(subscription.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage your subscription, billing, and account preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Current Plan Overview */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="border-b bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center text-2xl">
                      <Crown className="h-6 w-6 mr-2 text-warning-600" />
                      Current Plan: {currentPlan?.name || 'Free'}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {subscription ? `Started on ${new Date(subscription.created_at).toLocaleDateString()}` : 'Free plan with limited features'}
                    </CardDescription>
                  </div>
                  <Badge className={`px-3 py-1 ${
                    isActive ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                  }`}>
                    {subscription?.status || 'Free'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Monthly Usage</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">17/20 ATS analyses used</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">Next Billing</p>
                          <p className="text-sm text-blue-700">
                            {subscription?.end_date ? 
                              `${daysUntilRenewal} days remaining` : 
                              'No active subscription'
                            }
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">
                        ₹{currentPlan?.price || '0'}/month
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-success-500" />
                      <span>Unlimited resume creation</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-success-500" />
                      <span>Premium templates access</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-success-500" />
                      <span>Priority customer support</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Shield className="h-4 w-4 text-brand-600" />
                      <span>Advanced ATS optimization</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {!isActive ? (
                    <Button className="flex-1 bg-brand-600 hover:bg-brand-700">
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1">
                      <Crown className="h-4 w-4 mr-2" />
                      Change Plan
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="plans" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-12">
                <TabsTrigger value="plans">Plans & Pricing</TabsTrigger>
                <TabsTrigger value="billing">Billing History</TabsTrigger>
                <TabsTrigger value="referrals">Referral Program</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="plans" className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {plans?.map((plan) => (
                      <Card key={plan.id} className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                        plan.name === 'Premium' ? 'border-brand-200 ring-2 ring-brand-100' : ''
                      }`}>
                        {plan.name === 'Premium' && (
                          <>
                            <div className="absolute inset-x-0 h-2 bg-brand-600 top-0" />
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <Badge className="bg-brand-600 text-white">Most Popular</Badge>
                            </div>
                          </>
                        )}
                        <CardHeader className="text-center">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">₹{plan.price}</span>
                            <span className="text-gray-500 ml-1">/month</span>
                          </div>
                          <CardDescription className="mt-2">
                            {plan.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            {Object.entries(plan.features || {}).map(([feature, included]) => (
                              <div key={feature} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-success-500 flex-shrink-0" />
                                <span className="capitalize">{feature.replace('_', ' ')}</span>
                              </div>
                            ))}
                          </div>
                          <Button 
                            className={`w-full ${
                              currentPlan?.id === plan.id 
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                : plan.name === 'Premium' 
                                  ? 'bg-brand-600 hover:bg-brand-700' 
                                  : ''
                            }`}
                            disabled={currentPlan?.id === plan.id || createSubscriptionMutation.isPending}
                            onClick={() => handleUpgrade(plan.id)}
                          >
                            {currentPlan?.id === plan.id ? 'Current Plan' : 
                             createSubscriptionMutation.isPending ? 'Processing...' : 
                             `Upgrade to ${plan.name}`}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                  <Card>
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            Billing History
                          </CardTitle>
                          <CardDescription className="mt-1">
                            View your past transactions and download invoices
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {transactionsLoading ? (
                        <div className="p-6 space-y-3">
                          {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                          ))}
                        </div>
                      ) : transactions?.length === 0 ? (
                        <div className="text-center py-12">
                          <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-gray-600 font-medium">No billing history available</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Your transactions will appear here once you upgrade
                          </p>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {transactions?.map((transaction) => (
                            <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">
                                    {subscription?.plan?.name} Subscription
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(transaction.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">₹{transaction.amount}</p>
                                  <Badge className={`${
                                    transaction.status === 'completed' ? 'bg-success-100 text-success-700' :
                                    transaction.status === 'pending' ? 'bg-warning-100 text-warning-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {transaction.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="referrals" className="space-y-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                      <CardHeader className="border-b">
                        <CardTitle className="flex items-center">
                          <Gift className="h-5 w-5 mr-2" />
                          Referral Program
                        </CardTitle>
                        <CardDescription>
                          Share ResumeIt and earn free premium months
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        <div className="bg-gradient-to-r from-brand-50 to-brand-100 p-6 rounded-lg">
                          <h3 className="font-semibold text-brand-900 mb-4">How it works</h3>
                          <div className="space-y-3">
                            {[
                              "Share your unique referral link with friends",
                              "They sign up and subscribe to any paid plan", 
                              "You both get 1 month of Premium for free!"
                            ].map((step, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <p className="text-sm text-brand-800">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Your Referral Link</Label>
                          <div className="flex">
                            <Input 
                              value="https://resumeit.com/ref/user123" 
                              readOnly 
                              className="rounded-r-none"
                            />
                            <Button 
                              className="rounded-l-none bg-brand-600 hover:bg-brand-700"
                              onClick={copyReferralLink}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Send Referral Invitation</Label>
                          <div className="flex space-x-2">
                            <Input 
                              type="email"
                              placeholder="friend@example.com"
                              value={referralEmail}
                              onChange={(e) => setReferralEmail(e.target.value)}
                            />
                            <Button 
                              onClick={handleSendReferral}
                              disabled={!referralEmail || createReferralMutation.isPending}
                            >
                              <Share2 className="h-4 w-4 mr-2" />
                              Send
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-6">
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-brand-600" />
                            </div>
                            <Badge className="bg-success-100 text-success-700">Active</Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-brand-600">
                              {referrals?.length || 0}
                            </div>
                            <div className="text-sm text-gray-600">Successful Referrals</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                              <Gift className="h-6 w-6 text-success-600" />
                            </div>
                            <Badge className="bg-brand-100 text-brand-700">Premium</Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-success-600">
                              {referrals?.filter(r => r.is_successful).length || 0}
                            </div>
                            <div className="text-sm text-gray-600">Free Months Earned</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader className="border-b">
                      <CardTitle>Subscription Settings</CardTitle>
                      <CardDescription>
                        Manage your subscription preferences and notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="space-y-0.5">
                            <div className="font-medium">Auto-renewal</div>
                            <div className="text-sm text-gray-500">
                              Automatically renew your subscription
                            </div>
                          </div>
                          <Switch 
                            checked={autoRenew}
                            onCheckedChange={setAutoRenew}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="space-y-0.5">
                            <div className="font-medium">Email notifications</div>
                            <div className="text-sm text-gray-500">
                              Receive billing and renewal reminders
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="space-y-0.5">
                            <div className="font-medium">Usage reports</div>
                            <div className="text-sm text-gray-500">
                              Get monthly usage statistics
                            </div>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="font-medium text-red-600 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Danger Zone
                        </h3>
                        <div className="flex items-center justify-between p-4 border-2 border-red-100 rounded-lg">
                          <div className="space-y-0.5">
                            <div className="font-medium">Cancel Subscription</div>
                            <div className="text-sm text-gray-500">
                              This will cancel your subscription at the end of the billing period
                            </div>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setShowCancelConfirm(true)}
                            disabled={!isActive}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel Plan
                          </Button>
                        </div>
                        
                        {showCancelConfirm && (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="flex items-center justify-between">
                              <span>Are you sure you want to cancel your subscription?</span>
                              <div className="flex space-x-2 ml-4">
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={handleCancelSubscription}
                                  disabled={cancelSubscriptionMutation.isPending}
                                >
                                  {cancelSubscriptionMutation.isPending ? 'Cancelling...' : 'Confirm'}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setShowCancelConfirm(false)}
                                >
                                  Keep Plan
                                </Button>
                              </div>
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-brand-50 to-brand-100 border-brand-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-brand-800">
                  <Gift className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="secondary" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoices
                </Button>
                <Button variant="secondary" className="w-full justify-start" onClick={copyReferralLink}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Referral Link
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Manage Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Usage Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month's Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ATS Analyses</span>
                    <span>17/20</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resume Downloads</span>
                    <span>45/∞</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Template Access</span>
                    <span>12/∞</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;