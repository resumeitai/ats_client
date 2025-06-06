import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Save, Download, Eye, Plus, Trash2, Zap,
  GripVertical, User, Briefcase, GraduationCap,
  Code, FolderOpen, Award
} from "lucide-react";
import { useResume, useUpdateResume, useCreateResume } from "@/hooks/useResumes";
import { toast } from "@/hooks/use-toast";

interface ResumeSection {
  id: string;
  type: 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';
  title: string;
  content: any;
  order: number;
}

interface ResumeData {
  title: string;
  sections: ResumeSection[];
}

const ResumeEditor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resumeId = searchParams.get('id');

  const { data: resume, isLoading, error } = useResume(resumeId ? parseInt(resumeId) : 0);
  const updateResumeMutation = useUpdateResume();
  const createResumeMutation = useCreateResume();

  const [resumeData, setResumeData] = useState<ResumeData>({
    title: '',
    sections: []
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // Initialize resume data
  useEffect(() => {
    if (resume) {
      setResumeData({
        title: resume.title,
        sections: resume.content?.sections || getDefaultSections()
      });
    } else if (!resumeId) {
      // New resume
      setResumeData({
        title: 'Untitled Resume',
        sections: getDefaultSections()
      });
    }
  }, [resume, resumeId]);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (resumeData.title && resumeData.sections.length > 0) {
        handleSave(true);
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [resumeData]);

  const getDefaultSections = (): ResumeSection[] => [
    {
      id: 'personal',
      type: 'personal',
      title: 'Personal Information',
      order: 1,
      content: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        summary: ''
      }
    },
    {
      id: 'experience',
      type: 'experience',
      title: 'Work Experience',
      order: 2,
      content: []
    },
    {
      id: 'education',
      type: 'education',
      title: 'Education',
      order: 3,
      content: []
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      order: 4,
      content: {
        technical: '',
        soft: ''
      }
    }
  ];

  const handleSave = async (isAutoSave = false) => {
    if (!isAutoSave) setAutoSaveStatus('saving');

    const saveData = {
      title: resumeData.title,
      content: { sections: resumeData.sections },
      is_active: true
    };

    try {
      if (resumeId) {
        await updateResumeMutation.mutateAsync({
          id: parseInt(resumeId),
          data: saveData
        });
      } else {
        const newResume = await createResumeMutation.mutateAsync(saveData);
        navigate(`/resume-builder/editor?id=${newResume.id}`, { replace: true });
      }
      setAutoSaveStatus('saved');
      if (!isAutoSave) {
        toast({
          title: "Success",
          description: "Resume saved successfully"
        });
      }
    } catch (error) {
      setAutoSaveStatus('error');
      if (!isAutoSave) {
        toast({
          title: "Error",
          description: "Failed to save resume",
          variant: "destructive"
        });
      }
    }
  };

  const updateSection = (sectionId: string, content: any) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, content } : section
      )
    }));
  };

  const addExperienceItem = () => {
    const experienceSection = resumeData.sections.find(s => s.type === 'experience');
    if (experienceSection) {
      const newItem = {
        id: Date.now().toString(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      };
      updateSection('experience', [...experienceSection.content, newItem]);
    }
  };

  const addEducationItem = () => {
    const educationSection = resumeData.sections.find(s => s.type === 'education');
    if (educationSection) {
      const newItem = {
        id: Date.now().toString(),
        degree: '',
        field: '',
        institution: '',
        location: '',
        graduationYear: '',
        gpa: ''
      };
      updateSection('education', [...educationSection.content, newItem]);
    }
  };

  const removeItem = (sectionType: string, itemId: string) => {
    const section = resumeData.sections.find(s => s.type === sectionType);
    if (section) {
      updateSection(sectionType, section.content.filter((item: any) => item.id !== itemId));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-96" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load resume. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const personalSection = resumeData.sections.find(s => s.type === 'personal');
  const experienceSection = resumeData.sections.find(s => s.type === 'experience');
  const educationSection = resumeData.sections.find(s => s.type === 'education');
  const skillsSection = resumeData.sections.find(s => s.type === 'skills');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Editor</h1>
            <div className="flex items-center space-x-3 mt-2">
              <Badge className={`${
                autoSaveStatus === 'saved' ? 'bg-success-100 text-success-700' :
                autoSaveStatus === 'saving' ? 'bg-warning-100 text-warning-700' :
                'bg-red-100 text-red-700'
              }`}>
                {autoSaveStatus === 'saved' ? 'Auto-saved' :
                 autoSaveStatus === 'saving' ? 'Saving...' : 'Save failed'}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button size="sm" onClick={() => handleSave()} disabled={updateResumeMutation.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {updateResumeMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
            <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
              <Zap className="h-4 w-4 mr-2" />
              Optimize ATS
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="resumeTitle">Resume Title</Label>
                  <Input
                    id="resumeTitle"
                    value={resumeData.title}
                    onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Software Engineer Resume"
                  />
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">
                  <User className="h-4 w-4 mr-2" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="experience">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="skills">
                  <Code className="h-4 w-4 mr-2" />
                  Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                          value={personalSection?.content?.firstName || ''}
                          onChange={(e) => updateSection('personal', {
                            ...personalSection?.content,
                            firstName: e.target.value
                          })}
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                          value={personalSection?.content?.lastName || ''}
                          onChange={(e) => updateSection('personal', {
                            ...personalSection?.content,
                            lastName: e.target.value
                          })}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={personalSection?.content?.email || ''}
                          onChange={(e) => updateSection('personal', {
                            ...personalSection?.content,
                            email: e.target.value
                          })}
                          placeholder="john.doe@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={personalSection?.content?.phone || ''}
                          onChange={(e) => updateSection('personal', {
                            ...personalSection?.content,
                            phone: e.target.value
                          })}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={personalSection?.content?.location || ''}
                        onChange={(e) => updateSection('personal', {
                          ...personalSection?.content,
                          location: e.target.value
                        })}
                        placeholder="City, State"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Professional Summary</Label>
                      <Textarea
                        value={personalSection?.content?.summary || ''}
                        onChange={(e) => updateSection('personal', {
                          ...personalSection?.content,
                          summary: e.target.value
                        })}
                        placeholder="Write a compelling professional summary..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Work Experience</CardTitle>
                    <Button size="sm" variant="outline" onClick={addExperienceItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experienceSection?.content?.map((exp: any, index: number) => (
                      <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Experience #{index + 1}</h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem('experience', exp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Job Title</Label>
                            <Input
                              value={exp.jobTitle}
                              onChange={(e) => {
                                const updated = experienceSection.content.map((item: any) =>
                                  item.id === exp.id ? { ...item, jobTitle: e.target.value } : item
                                );
                                updateSection('experience', updated);
                              }}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const updated = experienceSection.content.map((item: any) =>
                                  item.id === exp.id ? { ...item, company: e.target.value } : item
                                );
                                updateSection('experience', updated);
                              }}
                              placeholder="Tech Company Inc."
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => {
                                const updated = experienceSection.content.map((item: any) =>
                                  item.id === exp.id ? { ...item, startDate: e.target.value } : item
                                );
                                updateSection('experience', updated);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => {
                                const updated = experienceSection.content.map((item: any) =>
                                  item.id === exp.id ? { ...item, endDate: e.target.value } : item
                                );
                                updateSection('experience', updated);
                              }}
                              placeholder="Present"
                              disabled={exp.current}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => {
                              const updated = experienceSection.content.map((item: any) =>
                                item.id === exp.id ? { ...item, current: e.target.checked } : item
                              );
                              updateSection('experience', updated);
                            }}
                          />
                          <Label>I currently work here</Label>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => {
                              const updated = experienceSection.content.map((item: any) =>
                                item.id === exp.id ? { ...item, description: e.target.value } : item
                              );
                              updateSection('experience', updated);
                            }}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                    {(!experienceSection?.content || experienceSection.content.length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No work experience added yet</p>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={addExperienceItem}
                        >
                          Add Your First Experience
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Education</CardTitle>
                    <Button size="sm" variant="outline" onClick={addEducationItem}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {educationSection?.content?.map((edu: any, index: number) => (
                      <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Education #{index + 1}</h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem('education', edu.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => {
                                const updated = educationSection.content.map((item: any) =>
                                  item.id === edu.id ? { ...item, degree: e.target.value } : item
                                );
                                updateSection('education', updated);
                              }}
                              placeholder="Bachelor of Science"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => {
                                const updated = educationSection.content.map((item: any) =>
                                  item.id === edu.id ? { ...item, field: e.target.value } : item
                                );
                                updateSection('education', updated);
                              }}
                              placeholder="Computer Science"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => {
                                const updated = educationSection.content.map((item: any) =>
                                  item.id === edu.id ? { ...item, institution: e.target.value } : item
                                );
                                updateSection('education', updated);
                              }}
                              placeholder="University Name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Graduation Year</Label>
                            <Input
                              type="number"
                              value={edu.graduationYear}
                              onChange={(e) => {
                                const updated = educationSection.content.map((item: any) =>
                                  item.id === edu.id ? { ...item, graduationYear: e.target.value } : item
                                );
                                updateSection('education', updated);
                              }}
                              placeholder="2023"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!educationSection?.content || educationSection.content.length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No education added yet</p>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={addEducationItem}
                        >
                          Add Your Education
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Technical Skills</Label>
                      <Textarea
                        value={skillsSection?.content?.technical || ''}
                        onChange={(e) => updateSection('skills', {
                          ...skillsSection?.content,
                          technical: e.target.value
                        })}
                        placeholder="JavaScript, React, Node.js, Python, SQL..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Soft Skills</Label>
                      <Textarea
                        value={skillsSection?.content?.soft || ''}
                        onChange={(e) => updateSection('skills', {
                          ...skillsSection?.content,
                          soft: e.target.value
                        })}
                        placeholder="Leadership, Communication, Problem Solving..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 shadow-sm min-h-[600px] max-h-[800px] overflow-y-auto">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {personalSection?.content?.firstName} {personalSection?.content?.lastName}
                    </h2>
                    <div className="text-gray-600 space-y-1">
                      {personalSection?.content?.email && (
                        <p>{personalSection.content.email}</p>
                      )}
                      <div className="flex justify-center space-x-4 text-sm">
                        {personalSection?.content?.phone && (
                          <span>{personalSection.content.phone}</span>
                        )}
                        {personalSection?.content?.location && (
                          <span>{personalSection.content.location}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  {personalSection?.content?.summary && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
                        Professional Summary
                      </h3>
                      <p className="text-sm text-gray-700">
                        {personalSection.content.summary}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {experienceSection?.content?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
                        Experience
                      </h3>
                      <div className="space-y-4">
                        {experienceSection.content.map((exp: any) => (
                          <div key={exp.id} className="text-sm">
                            <div className="font-medium text-gray-900">
                              {exp.jobTitle} - {exp.company}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </div>
                            {exp.description && (
                              <p className="text-gray-700 mt-1">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {educationSection?.content?.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
                        Education
                      </h3>
                      <div className="space-y-2">
                        {educationSection.content.map((edu: any) => (
                          <div key={edu.id} className="text-sm">
                            <div className="font-medium text-gray-900">
                              {edu.degree} in {edu.field}
                            </div>
                            <div className="text-gray-600">
                              {edu.institution} • {edu.graduationYear}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {(skillsSection?.content?.technical || skillsSection?.content?.soft) && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-1 mb-2">
                        Skills
                      </h3>
                      {skillsSection.content.technical && (
                        <div className="mb-2">
                          <span className="font-medium text-sm">Technical: </span>
                          <span className="text-sm text-gray-700">
                            {skillsSection.content.technical}
                          </span>
                        </div>
                      )}
                      {skillsSection.content.soft && (
                        <div>
                          <span className="font-medium text-sm">Soft Skills: </span>
                          <span className="text-sm text-gray-700">
                            {skillsSection.content.soft}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;