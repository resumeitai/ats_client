import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Crown, Eye, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TemplateSelection = () => {
  const templates = [
    { id: 1, name: "Modern Professional", category: "Technology", isPremium: false, thumbnail: "/placeholder.svg" },
    { id: 2, name: "Executive Classic", category: "Business", isPremium: true, thumbnail: "/placeholder.svg" },
    { id: 3, name: "Creative Designer", category: "Design", isPremium: false, thumbnail: "/placeholder.svg" },
    { id: 4, name: "Academic Scholar", category: "Education", isPremium: true, thumbnail: "/placeholder.svg" },
    { id: 5, name: "Sales Professional", category: "Sales", isPremium: false, thumbnail: "/placeholder.svg" },
    { id: 6, name: "Healthcare Expert", category: "Healthcare", isPremium: true, thumbnail: "/placeholder.svg" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center text-brand-600 hover:text-brand-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-brand-600" />
              <span className="text-xl font-bold text-gray-900">Template Selection</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our collection of ATS-optimized templates designed by career experts
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search templates..." 
              className="pl-10 h-11"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-48 h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-48 h-11">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Templates</SelectItem>
              <SelectItem value="free">Free Templates</SelectItem>
              <SelectItem value="premium">Premium Templates</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-lg bg-gray-100"
                />
                {template.isPremium && (
                  <Badge className="absolute top-3 right-3 bg-warning-100 text-warning-700">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100">
                  <Button size="sm" variant="secondary">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to="/resume-builder/editor">
                  <Button className="w-full bg-brand-600 hover:bg-brand-700">
                    Use This Template
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;