
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, FileText, Video, ExternalLink, Share2, Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  size: string;
  free: boolean;
  date: string;
  url: string;
}

const MenteeResources = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedResources, setSavedResources] = useState<number[]>([]);
  const { toast } = useToast();

  // Sample data for resources
  const resources: Resource[] = [
    {
      id: 1,
      title: "Effective Career Transition Guide",
      description: "A comprehensive guide on how to navigate career transitions successfully",
      type: "PDF",
      size: "4.2 MB",
      free: true,
      date: "Apr 2, 2023",
      url: "https://example.com/effective-career-transition-guide.pdf"
    },
    {
      id: 2,
      title: "Technical Interview Preparation Kit",
      description: "Collection of resources to help you ace technical interviews",
      type: "ZIP",
      size: "15 MB",
      free: false,
      date: "Mar 15, 2023",
      url: "https://example.com/technical-interview-preparation-kit.zip"
    },
    {
      id: 3,
      title: "Mastering Product Management",
      description: "Learn essential product management skills from industry experts",
      type: "PDF",
      size: "6.8 MB",
      free: true,
      date: "Feb 28, 2023",
      url: "https://example.com/mastering-product-management.pdf"
    },
    {
      id: 4,
      title: "Building Your Personal Brand",
      description: "Workshop on developing and promoting your personal brand",
      type: "Video",
      size: "320 MB",
      free: false,
      date: "Feb 12, 2023",
      url: "https://example.com/building-personal-brand-workshop.mp4"
    },
    {
      id: 5,
      title: "Leadership Skills Assessment",
      description: "Self-assessment tools to evaluate your leadership capabilities",
      type: "XLSX",
      size: "2.1 MB",
      free: true,
      date: "Jan 30, 2023",
      url: "https://example.com/leadership-skills-assessment.xlsx"
    },
    {
      id: 6,
      title: "Networking for Introverts",
      description: "Strategies and tactics for effective networking for introverted personalities",
      type: "PDF",
      size: "3.5 MB",
      free: false,
      date: "Jan 18, 2023",
      url: "https://example.com/networking-for-introverts.pdf"
    },
  ];

  // Filter resources based on search query and active tab
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "free") return matchesSearch && resource.free;
    if (activeTab === "premium") return matchesSearch && !resource.free;
    if (activeTab === "saved") return matchesSearch && savedResources.includes(resource.id);
    
    return matchesSearch;
  });

  const handleSaveResource = (id: number) => {
    if (savedResources.includes(id)) {
      setSavedResources(savedResources.filter(resourceId => resourceId !== id));
      toast({
        title: "Resource removed from saved items",
        description: "The resource has been removed from your saved list",
      });
    } else {
      setSavedResources([...savedResources, id]);
      toast({
        title: "Resource saved successfully",
        description: "The resource has been added to your saved list",
      });
    }
  };

  const handleDownload = (resource: Resource) => {
    if (!resource.free) {
      toast({
        title: "Premium Content",
        description: "This is a premium resource. Please upgrade your plan to download.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would trigger the actual download
    toast({
      title: "Download started",
      description: `${resource.title} is being downloaded.`,
    });
    
    // Simulate download by opening in a new tab
    window.open(resource.url, "_blank");
  };

  const handleShare = (resource: Resource) => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: resource.url,
      }).then(() => {
        toast({
          title: "Shared successfully",
          description: "The resource has been shared.",
        });
      }).catch(() => {
        toast({
          title: "Share cancelled",
          description: "The share action was cancelled.",
        });
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast({
        title: "Share link copied",
        description: "The resource link has been copied to your clipboard.",
      });
      navigator.clipboard.writeText(resource.url);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'video':
        return <Video className="h-6 w-6 text-blue-500" />;
      case 'xlsx':
        return <FileText className="h-6 w-6 text-green-500" />;
      case 'zip':
        return <FileText className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout userType="mentee">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Access materials shared by your mentors and the EchoMentor community
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{activeTab === "all" ? "All Resources" : 
                           activeTab === "free" ? "Free Resources" : 
                           activeTab === "premium" ? "Premium Resources" : 
                           "Saved Resources"}</CardTitle>
                <CardDescription>
                  {activeTab === "all" ? "Browse all available resources" : 
                   activeTab === "free" ? "Free resources available for immediate download" : 
                   activeTab === "premium" ? "Premium resources (requires subscription)" : 
                   "Resources you've saved for later"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredResources.length > 0 ? (
                  <div className="space-y-4">
                    {filteredResources.map((resource) => (
                      <div 
                        key={resource.id} 
                        className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 md:p-6">
                          {getResourceIcon(resource.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3 className="font-semibold text-lg">{resource.title}</h3>
                            <div className="flex gap-2">
                              <Badge variant={resource.free ? "outline" : "secondary"} className="whitespace-nowrap">
                                {resource.free ? "Free" : "Premium"}
                              </Badge>
                              <Badge variant="outline">{resource.type}</Badge>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mt-1 mb-3">
                            {resource.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center justify-between mt-2">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <span>Size: {resource.size}</span>
                              <span className="mx-2">•</span>
                              <span>Added: {resource.date}</span>
                            </div>
                            
                            <div className="flex mt-3 md:mt-0 gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleSaveResource(resource.id)}
                                className="flex items-center gap-1"
                              >
                                {savedResources.includes(resource.id) ? 
                                  <BookmarkCheck className="h-4 w-4" /> : 
                                  <Bookmark className="h-4 w-4" />
                                }
                                {savedResources.includes(resource.id) ? "Saved" : "Save"}
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleShare(resource)}
                                className="flex items-center gap-1"
                              >
                                <Share2 className="h-4 w-4" />
                                Share
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(resource.url, "_blank")}
                                className="flex items-center gap-1"
                              >
                                <ExternalLink className="h-4 w-4" />
                                View
                              </Button>
                              
                              <Button 
                                variant={resource.free ? "default" : "secondary"} 
                                size="sm" 
                                onClick={() => handleDownload(resource)}
                                className="flex items-center gap-1"
                              >
                                <Download className="h-4 w-4" />
                                {resource.free ? "Download" : "Upgrade to Download"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium">No resources found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-md">
                      {activeTab === "all" ? "We couldn't find any resources matching your search query. Try adjusting your search." : 
                       activeTab === "free" ? "No free resources found. Try searching for something else." : 
                       activeTab === "premium" ? "No premium resources found. Try searching for something else." : 
                       "You haven't saved any resources yet. Browse resources and click the save button to add them here."}
                    </p>
                    {activeTab === "saved" && (
                      <Button className="mt-4" onClick={() => setActiveTab("all")}>
                        Browse Resources
                      </Button>
                    )}
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

export default MenteeResources;
