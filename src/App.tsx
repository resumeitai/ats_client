import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Contact from "./pages/Contact";
import NotFound from '@/pages/NotFound';

// Protected pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TemplateSelection from "./pages/ResumeBuilder/TemplateSelection";
import ResumeEditor from "./pages/ResumeBuilder/ResumeEditor";
import JobAnalysis from "./pages/ATSOptimization/JobAnalysis";
import ATSResults from "./pages/ATSOptimization/ATSResults";
import SubscriptionDashboard from "./pages/Subscription/SubscriptionDashboard";
import VerifyEmail from "./pages/VerifyEmail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on 401 errors
        if (error?.response?.status === 401) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Create a separate AppRoutes component to ensure proper context usage
const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Email verification routes */}
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password-form" element={<ResetPasswordForm />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    <Route path="/contact" element={<Contact />} />

    {/* Protected routes wrapped with Layout */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/resume-builder/templates"
      element={
        <ProtectedRoute>
          <Layout>
            <TemplateSelection />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/resume-builder/editor"
      element={
        <ProtectedRoute>
          <Layout>
            <ResumeEditor />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/ats-optimization"
      element={
        <ProtectedRoute>
          <Layout>
            <JobAnalysis />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/ats-optimization/results"
      element={
        <ProtectedRoute>
          <Layout>
            <ATSResults />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/subscription"
      element={
        <ProtectedRoute>
          <Layout>
            <SubscriptionDashboard />
          </Layout>
        </ProtectedRoute>
      }
    />

    {/* 404 route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;