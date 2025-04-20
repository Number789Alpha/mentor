
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Star, ArrowUpRight } from "lucide-react";
import BookingDialog from "@/components/BookingDialog";
import MentorProfileView from "@/components/MentorProfileView";
import FiltersDialog from "@/components/FiltersDialog";

// Updated mentors with Indian names and more diverse expertise fields
const mentors = [
  {
    id: 7,
    name: "Divyanshi Agarwal",
    title: "Senior Counselor & Tech Lead at MindfulTech, Noida, India",
    bio: "Specialized in crisis support and mental health in tech. Based in Noida, providing both in-person and online consultations.",
    expertise: ["Crisis Support", "Mental Health", "Career Guidance", "Work-Life Balance", "Stress Management"],
    experience: "8+ years",
    rating: 4.9,
    reviews: 56,
    pricing: "₹2,000/session",
    availability: "Available Now",
    image: "/mentors/divyanshi-agarwal.svg",
    languages: ["English", "Hindi"],
    isUrgentAvailable: true
  },
  {
    id: 8,
    name: "Priyank Mishra",
    title: "Tech Crisis Counselor & Senior Developer at TechSolutions, Noida, India",
    bio: "Emergency tech support and crisis intervention specialist based in Noida. Available for both on-site and remote consultations.",
    expertise: ["Crisis Management", "Technical Debugging", "System Recovery", "Emergency Support", "Team Leadership"],
    experience: "10+ years",
    rating: 4.8,
    reviews: 48,
    pricing: "₹2,200/session",
    availability: "Available Now",
    image: "/mentors/priyank-mishra.jpg",
    languages: ["English", "Hindi"],
    isUrgentAvailable: true
  },
  {
    id: 1,
    name: "Rajat Kumar",
    title: "Senior Product Manager at TechCorp",
    bio: "10+ years of experience in Product Management. Passionate about helping others grow in their tech careers.",
    expertise: ["Product Strategy", "UX Research", "User Interviews", "Roadmap Planning", "Data-Driven Decisions"],
    experience: "10+ years",
    rating: 4.9,
    reviews: 42,
    pricing: "₹1,800/session",
    availability: "Next available: Today",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    languages: ["English", "Hindi"]
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Engineering Manager at InnoTech",
    bio: "Tech leader with expertise in scaling engineering teams and building robust systems.",
    expertise: ["Engineering Leadership", "System Design", "Career Growth", "Technical Roadmaps", "Team Building"],
    experience: "8+ years",
    rating: 4.8,
    reviews: 35,
    pricing: "₹1,600/session",
    availability: "Next available: Tomorrow",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    languages: ["English", "Hindi", "Punjabi"]
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    title: "Director of Product at StartupHub",
    bio: "Previously founded two startups. Now helping others navigate the complex journey of product development.",
    expertise: ["Startup Strategy", "Product-Market Fit", "MVP Development", "Fundraising", "Growth Hacking"],
    experience: "12+ years",
    rating: 4.7,
    reviews: 29,
    pricing: "₹2,000/session",
    availability: "Next available: Thursday",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    languages: ["English", "Hindi"]
  },
  {
    id: 4,
    name: "Neha Patel",
    title: "UX Lead at DesignFirst",
    bio: "Passionate about creating user-centric products. Expertise in design thinking and user research.",
    expertise: ["UX/UI Design", "Design Systems", "User Research", "Usability Testing", "Interaction Design"],
    experience: "7+ years",
    rating: 4.8,
    reviews: 31,
    pricing: "₹1,700/session",
    availability: "Next available: Friday",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    languages: ["English", "Hindi", "Gujarati"]
  },
  {
    id: 5,
    name: "Arjun Singh",
    title: "CTO at TechSolutions",
    bio: "Engineering leader with a focus on scalable architecture and building high-performing teams.",
    expertise: ["System Architecture", "Microservices", "Cloud Infrastructure", "Team Leadership", "Technical Hiring"],
    experience: "15+ years",
    rating: 4.9,
    reviews: 47,
    pricing: "₹2,200/session",
    availability: "Next available: Monday",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    languages: ["English", "Hindi", "Punjabi"]
  },
  {
    id: 6,
    name: "Divya Kapoor",
    title: "Senior Data Scientist at DataTech",
    bio: "Helping professionals transition into data science. Expertise in machine learning and AI.",
    expertise: ["Data Science", "Machine Learning", "Python", "Career Transition", "Interview Preparation"],
    experience: "9+ years",
    rating: 4.7,
    reviews: 33,
    pricing: "₹1,900/session",
    availability: "Next available: Wednesday",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    languages: ["English", "Hindi"]
  }
];

// Expanded categories to include more expertise fields
const categories = [
  "All Categories",
  "Product Management",
  "UX/UI Design",
  "Software Development",
  "Data Science",
  "Career Transition",
  "Leadership",
  "Marketing",
  "Startup Strategy",
  "System Design",
  "Technical Interview Prep",
  "Machine Learning",
  "Cloud Infrastructure",
  "Mobile Development",
  "DevOps",
  "Web Development"
];

const FindMentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showFiltersDialog, setShowFiltersDialog] = useState(false);

  // Filter mentors based on search query and selected category
  const filteredMentors = mentors.filter((mentor) => {
    // Case-insensitive search across multiple fields
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = searchLower === "" || 
      mentor.name.toLowerCase().includes(searchLower) ||
      mentor.title.toLowerCase().includes(searchLower) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchLower));

    // Exact category matching
    const matchesCategory = category === "All Categories" || 
      mentor.expertise.some(skill => skill === category);

    return matchesSearch && matchesCategory;
  });

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
    setShowProfileDialog(true);
  };

  const handleApplyFilters = () => {
    // In a real app, this would apply the filter values
    // For now, we'll just close the dialog
  };

  return (
    <PageLayout>
      <div className="container max-w-6xl py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Find Your Perfect Mentor</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with industry experts who can guide you through your career journey 
            and help you achieve your professional goals.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search by name, expertise, or role..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[240px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            className="flex gap-2 w-full md:w-auto"
            onClick={() => setShowFiltersDialog(true)}
          >
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <Card 
              key={mentor.id} 
              className={`overflow-hidden hover:shadow-md transition-shadow ${mentor.isUrgentAvailable ? 'border-green-500 border-2 animate-pulse' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/10">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{mentor.name}</CardTitle>
                    <CardDescription>{mentor.title}</CardDescription>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium text-sm">{mentor.rating}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        ({mentor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">{mentor.bio}</p>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Experience:</span>
                    <p>{mentor.experience}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Languages:</span>
                    <p>{mentor.languages.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Pricing:</span>
                    <p className="font-medium">{mentor.pricing}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Availability:</span>
                    <p>{mentor.availability}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center gap-1"
                  onClick={() => handleViewProfile(mentor)}
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Profile
                </Button>
                <BookingDialog
                  mentorName={mentor.name}
                  trigger={
                    <Button className="flex-1">Book Free Trial</Button>
                  }
                />
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No mentors found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </div>

      {selectedMentor && (
        <MentorProfileView 
          open={showProfileDialog} 
          onOpenChange={setShowProfileDialog} 
          mentor={selectedMentor} 
        />
      )}

      <FiltersDialog 
        open={showFiltersDialog} 
        onOpenChange={setShowFiltersDialog}
        onApplyFilters={handleApplyFilters}
      />
    </PageLayout>
  );
};

export default FindMentors;
