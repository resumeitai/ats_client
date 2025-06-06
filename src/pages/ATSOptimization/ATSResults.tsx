import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle, XCircle, AlertCircle, Zap, Download,
  RefreshCw, TrendingUp, Target, FileText, Lightbulb
} from "lucide-react";
import { useATSScore, useApplySuggestion } from "@/hooks/useATS";
import { toast } from "@/hooks/use-toast";

const ATSResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scoreId = searchParams.get('id');

  const { data: atsScore, isLoading, error, refetch } = useATSScore(scoreId ? parseInt(scoreId) : 0);
  const applySuggestionMutation = useApplySuggestion();

  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<number>>(new Set());

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="text-center">
              <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-48 mx-auto" />
            </div>
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

  if (error || !atsScore) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load ATS analysis results. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const handleApplySuggestion = async (suggestionId: number) => {
    try {
      await applySuggestionMutation.mutateAsync({
        scoreId: atsScore.id,
        suggestionId
      });
      setAppliedSuggestions(prev => new Set([...prev, suggestionId]));
      toast({
        title: "Suggestion Applied",
        description: "The optimization suggestion has been applied to your resume"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply suggestion",
        variant: "destructive"
      });
    }
  };

  const handleReAnalyze = () => {
    refetch();
    toast({
      title: "Re-analyzing",
      description: "Running fresh analysis on your resume"
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 80) return 'text-warning-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'D';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'Excellent - Likely to Pass ATS';
    if (score >= 80) return 'Good - Should Pass ATS';
    if (score >= 70) return 'Fair - May Need Improvements';
    return 'Poor - Needs Significant Improvements';
  };

  const keywordMatches = atsScore.keyword_matches || [];
  const suggestions = atsScore.optimization_suggestions || [];

  // Mock data for demonstration
  const sectionScores = {
    keywords: 92,
    format: 85,
    skills: 90,
    experience: 82
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ATS Analysis Results</h1>
              <p className="text-gray-600 mt-1">
                Analysis for <span className="font-medium">{atsScore.job_title}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleReAnalyze}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Re-analyze
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                <FileText className="h-4 w-4 mr-2" />
                Edit Resume
              </Button>
            </div>
          </div>

          {/* Score Overview */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg mb-4 border-4 border-gray-100">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(atsScore.score)}`}>
                  {atsScore.score}
                </div>
                <div className="text-sm text-gray-500">ATS Score</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Grade: {getScoreGrade(atsScore.score)}
            </h2>
            <Badge className={`text-lg px-4 py-2 ${
              atsScore.score >= 90 ? 'bg-success-100 text-success-700' :
              atsScore.score >= 80 ? 'bg-warning-100 text-warning-700' :
              'bg-red-100 text-red-700'
            }`}>
              {getScoreBadge(atsScore.score)}
            </Badge>
          </div>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(sectionScores.keywords)}`}>
                  {sectionScores.keywords}%
                </div>
                <div className="text-sm text-gray-600 mb-2">Keyword Match</div>
                <Progress value={sectionScores.keywords} className="h-2" />
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(sectionScores.format)}`}>
                  {sectionScores.format}%
                </div>
                <div className="text-sm text-gray-600 mb-2">Format Score</div>
                <Progress value={sectionScores.format} className="h-2" />
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(sectionScores.skills)}`}>
                  {sectionScores.skills}%
                </div>
                <div className="text-sm text-gray-600 mb-2">Skills Match</div>
                <Progress value={sectionScores.skills} className="h-2" />
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(sectionScores.experience)}`}>
                  {sectionScores.experience}%
                </div>
                <div className="text-sm text-gray-600 mb-2">Experience</div>
                <Progress value={sectionScores.experience} className="h-2" />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="keywords" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="keywords">Keyword Analysis</TabsTrigger>
              <TabsTrigger value="suggestions">Optimization Tips</TabsTrigger>
              <TabsTrigger value="comparison">Before vs After</TabsTrigger>
            </TabsList>

            <TabsContent value="keywords" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Keyword Matching Results
                  </CardTitle>
                  <CardDescription>
                    Analysis of how well your resume matches the job requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keywordMatches.length > 0 ? keywordMatches.map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          {match.found ? (
                            <CheckCircle className="h-5 w-5 text-success-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <div>
                            <span className="font-medium">{match.keyword}</span>
                            <Badge
                              className={`ml-2 ${
                                match.importance === 'high' ? 'bg-red-100 text-red-700' :
                                match.importance === 'medium' ? 'bg-warning-100 text-warning-700' :
                                'bg-gray-100 text-gray-700'
                              }`}
                              variant="secondary"
                            >
                              {match.importance} priority
                            </Badge>
                            {match.context && (
                              <p className="text-sm text-gray-600 mt-1">
                                Context: {match.context}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {match.found ? 'Found in resume' : 'Missing from resume'}
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-gray-500">
                        <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No keyword analysis available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Optimization Suggestions
                  </CardTitle>
                  <CardDescription>
                    Specific recommendations to improve your ATS score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suggestions.length > 0 ? suggestions.map((suggestion) => (
                      <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <AlertCircle className={`h-5 w-5 ${
                              suggestion.applied ? 'text-success-500' :
                              'text-warning-500'
                            }`} />
                            <span className="font-medium">{suggestion.section}</span>
                          </div>
                          <Badge
                            className="bg-warning-100 text-warning-700"
                            variant="secondary"
                          >
                            High Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.reason}</p>
                        {suggestion.original_text && (
                          <div className="bg-red-50 p-3 rounded mb-2">
                            <p className="text-sm text-red-800">
                              <strong>Current:</strong> {suggestion.original_text}
                            </p>
                          </div>
                        )}
                        {suggestion.suggested_text && (
                          <div className="bg-success-50 p-3 rounded mb-3">
                            <p className="text-sm text-success-800">
                              <strong>Suggested:</strong> {suggestion.suggested_text}
                            </p>
                          </div>
                        )}
                        <div className="flex space-x-2">
                          {!suggestion.applied && !appliedSuggestions.has(suggestion.id) ? (
                            <>
                              <Button
                                size="sm"
                                className="bg-brand-600 hover:bg-brand-700"
                                onClick={() => handleApplySuggestion(suggestion.id)}
                                disabled={applySuggestionMutation.isPending}
                              >
                                Apply Suggestion
                              </Button>
                              <Button size="sm" variant="outline">
                                Ignore
                              </Button>
                            </>
                          ) : (
                            <Badge className="bg-success-100 text-success-700">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Applied
                            </Badge>
                          )}
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-gray-500">
                        <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No optimization suggestions available</p>
                        <p className="text-sm">Your resume is already well-optimized!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Before Optimization</CardTitle>
                    <CardDescription>Your current resume score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-2 ${getScoreColor(atsScore.score)}`}>
                        {atsScore.score}%
                      </div>
                      <div className="text-sm text-gray-600 mb-4">Current ATS Score</div>
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between text-sm">
                          <span>Keywords Found</span>
                          <span>{keywordMatches.filter(k => k.found).length}/{keywordMatches.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Format Score</span>
                          <span>{sectionScores.format}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Skills Match</span>
                          <span>{sectionScores.skills}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>After Optimization</CardTitle>
                    <CardDescription>Projected score with improvements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-success-600 mb-2">95%</div>
                      <div className="text-sm text-gray-600 mb-4">Projected ATS Score</div>
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between text-sm">
                          <span>Keywords Found</span>
                          <span>{keywordMatches.length}/{keywordMatches.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Format Score</span>
                          <span>95%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Skills Match</span>
                          <span>98%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-success-50 to-success-100 border-success-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-success-600" />
                  <h3 className="text-lg font-semibold text-success-800 mb-2">
                    Potential Improvement: +{95 - atsScore.score} points
                  </h3>
                  <p className="text-success-700 mb-4">
                    Implementing these suggestions could significantly improve your chances of passing ATS screening
                  </p>
                  <Button className="bg-success-600 hover:bg-success-700">
                    Apply All Suggestions
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ATSResults;