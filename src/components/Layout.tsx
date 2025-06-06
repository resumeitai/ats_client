import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { FileText, Settings, User, LogOut, Crown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 backdrop-blur-sm bg-white/80">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-brand-600" />
              <span className="text-2xl font-bold text-gray-900">ResumeIt</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Link to="/resume-builder/templates">
                   <Button variant="ghost" size="sm">Resume Builder</Button>
                </Link>
                 <Link to="/ats-optimization">
                   <Button variant="ghost" size="sm">ATS Optimization</Button>
                </Link>
                 <Link to="/subscription">
                   <Button variant="ghost" size="sm">Subscription</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                     <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="User Avatar" />
                      <AvatarFallback>
                        {user?.full_name ? user.full_name.split(' ').map(n => n[0]).join('') : user?.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.full_name || user?.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                       <User className="mr-2 h-4 w-4" />
                       <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subscription">
                       <Settings className="mr-2 h-4 w-4" />
                       <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                    <Link to="/subscription">
                       <Crown className="mr-2 h-4 w-4" />
                       <span>Subscription</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brand-600 hover:bg-brand-700">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6" />
                <span className="text-xl font-bold">ResumeIt</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Build professional, ATS-optimized resumes that get you hired. 
                Join thousands of job seekers who trust ResumeIt for their career success.
              </p>
              <div className="flex space-x-4">
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <Link to="/resume-builder/templates" className="block text-gray-400 hover:text-white transition-colors">
                  Resume Builder
                </Link>
                <Link to="/ats-optimization" className="block text-gray-400 hover:text-white transition-colors">
                  ATS Optimization
                </Link>
                <Link to="/subscription" className="block text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
                <a href="mailto:support@resumeit.com" className="block text-gray-400 hover:text-white transition-colors">
                  Email Support
                </a>
                <a href="tel:+15551234567" className="block text-gray-400 hover:text-white transition-colors">
                  Phone Support
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResumeIt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;