
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Upload, ExternalLink, Search, Filter, Plus, BookOpen, Share2, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ResourceUploadDialog from "@/components/ResourceUploadDialog";

// Sample data for resources
const sharedResources = [
  {
    id: 1,
    title: "Technical Interview Question Bank",
    description: "A comprehensive list of common technical interview questions and approaches to solving them.",
    type: "PDF",
    size: "2.4 MB",
    shared: 12,
    date: "Mar 15, 2023",
    url: "/resources/tech-interview-questions.pdf"
  },
  {
    id: 2,
    title: "Career Transition Guide",
    description: "Step-by-step guide for transitioning to a new tech role or specialization.",
    type: "Document",
    size: "1.8 MB",
    shared: 8,
    date: "Apr 2, 2023",
    url: "/resources/career-transition.docx"
  },
  {
    id: 3,
    title: "System Design Cheatsheet",
    description: "Quick reference for system design interview preparation.",
    type: "PDF",
    size: "3.2 MB",
    shared: 15,
    date: "Feb 28, 2023",
    url: "/resources/system-design.pdf"
  },
];

const personalResources = [
  {
    id: 4,
    title: "Mentoring Best Practices",
    description: "Personal notes on effective mentoring approaches.",
    type: "Document",
    size: "850 KB",
    date: "Jan 10, 2023",
    url: "/resources/mentoring-best-practices.docx"
  },
  {
    id: 5,
    title: "Leadership Workshop Slides",
    description: "Presentation slides for leadership development.",
    type: "Presentation",
    size: "4.1 MB",
    date: "Mar 25, 2023",
    url: "/resources/leadership-slides.pptx"
  }
];

// Sample data for recommended external resources
const externalResources = [
  {
    id: 1,
    title: "Effective Communication in Tech Teams",
    source: "Tech Leadership Journal",
    url: "https://techleadership.journal/articles/effective-communication",
    type: "Article",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    source: "Frontend Masters",
    url: "https://frontendmasters.com/courses/advanced-react-patterns",
    type: "Course",
  },
  {
    id: 3,
    title: "Building Resilient Systems",
    source: "System Design Conference",
    url: "https://systemdesignconf.io/videos/building-resilient-systems",
    type: "Video",
  },
];

const MentorResources = () => {
  const [activeTab, setActiveTab] = useState("shared");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Function to handle resource actions
  const handleResourceAction = (resource: any, action: 'view' | 'share' | 'download') => {
    switch(action) {
      case 'view':
        // In a real app, this would open a detailed view
        toast({
          title: "Opening resource",
          description: `Opening ${resource.title} for viewing.`,
        });
        if (resource.url) {
          window.open(resource.url, '_blank');
        }
        break;
      case 'share':
        toast({
          title: "Share with mentees",
          description: `${resource.title} has been shared with selected mentees.`,
        });
        break;
      case 'download':
        toast({
          title: "Download started",
          description: `${resource.title} is being downloaded.`,
        });
        if (resource.url) {
          window.open(resource.url, '_blank');
        }
        break;
    }
  };

  // Handle external resource visit
  const handleExternalResourceVisit = (resource: any) => {
    toast({
      title: "Visiting external resource",
      description: `Opening ${resource.title} from ${resource.source}.`,
    });
    window.open(resource.url, '_blank');
  };

  // Handle upload
  const handleUpload = async (resourceData: any) => {
    try {
      // Here you would implement the actual file upload logic
      // For now, we'll just show a success message
      console.log('Resource data:', resourceData);
      
      // Update the resources list (in a real app, this would come from the backend)
      if (resourceData.visibility === 'shared') {
        const newResource = {
          id: sharedResources.length + 1,
          title: resourceData.title,
          description: resourceData.description,
          type: resourceData.type,
          size: `${Math.round(resourceData.file.size / 1024)} KB`,
          shared: 0,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          url: URL.createObjectURL(resourceData.file)
        };
        sharedResources.unshift(newResource);
      } else {
        const newResource = {
          id: personalResources.length + 1,
          title: resourceData.title,
          description: resourceData.description,
          type: resourceData.type,
          size: `${Math.round(resourceData.file.size / 1024)} KB`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          url: URL.createObjectURL(resourceData.file)
        };
        personalResources.unshift(newResource);
      }
    } catch (error) {
      console.error('Error uploading resource:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter resources based on search query
  const filteredShared = sharedResources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPersonal = personalResources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExternal = externalResources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout userType="mentor">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage and share resources with your mentees
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => setUploadDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload New Resource
            </Button>
            <ResourceUploadDialog
              open={uploadDialogOpen}
              onOpenChange={setUploadDialogOpen}
              onUpload={handleUpload}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search resources..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="shared" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="shared">Shared Resources</TabsTrigger>
            <TabsTrigger value="personal">Personal Resources</TabsTrigger>
            <TabsTrigger value="external">External Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="shared">
            <Card>
              <CardHeader>
                <CardTitle>Shared Resources</CardTitle>
                <CardDescription>Resources you've shared with your mentees</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredShared.length > 0 ? (
                  <div className="space-y-4">
                    {filteredShared.map((resource) => (
                      <div key={resource.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-start">
                          <div className="bg-echopurple-100 dark:bg-echopurple-900 p-2 rounded-md mr-4">
                            <FileText className="h-6 w-6 text-echopurple-600 dark:text-echopurple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium">{resource.title}</h3>
                              <div className="flex gap-2">
                                <Badge variant="outline">{resource.type}</Badge>
                                <Badge variant="secondary">{resource.size}</Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {resource.description}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Shared with {resource.shared} mentees • Uploaded on {resource.date}
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleResourceAction(resource, 'share')}
                                >
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleResourceAction(resource, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Shared Resources</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You haven't shared any resources with your mentees yet.
                    </p>
                    <Button className="mt-4" onClick={handleUpload}>
                      Upload Resource
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Resources</CardTitle>
                <CardDescription>Private resources for your own reference</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredPersonal.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPersonal.map((resource) => (
                      <div key={resource.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-start">
                          <div className="bg-echopurple-100 dark:bg-echopurple-900 p-2 rounded-md mr-4">
                            <FileText className="h-6 w-6 text-echopurple-600 dark:text-echopurple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium">{resource.title}</h3>
                              <div className="flex gap-2">
                                <Badge variant="outline">{resource.type}</Badge>
                                <Badge variant="secondary">{resource.size}</Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {resource.description}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Uploaded on {resource.date}
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleResourceAction(resource, 'share')}
                                >
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleResourceAction(resource, 'view')}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Personal Resources</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You haven't uploaded any personal resources yet.
                    </p>
                    <Button className="mt-4" onClick={handleUpload}>
                      Upload Resource
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="external">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>External Resources</CardTitle>
                  <CardDescription>Recommended external resources for mentees</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add External Resource
                </Button>
              </CardHeader>
              <CardContent>
                {filteredExternal.length > 0 ? (
                  <div className="space-y-4">
                    {filteredExternal.map((resource) => (
                      <div key={resource.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-start">
                          <div className="bg-echopurple-100 dark:bg-echopurple-900 p-2 rounded-md mr-4">
                            <ExternalLink className="h-6 w-6 text-echopurple-600 dark:text-echopurple-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h3 className="font-medium">{resource.title}</h3>
                              <Badge variant="outline">{resource.type}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              From: {resource.source}
                            </p>
                            <div className="flex items-center justify-end mt-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleExternalResourceVisit(resource)}
                              >
                                <ExternalLink className="h-4 w-4 mr-1" /> Visit Resource
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No External Resources</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You haven't added any external resource links yet.
                    </p>
                    <Button className="mt-4">
                      Add External Resource
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MentorResources;
