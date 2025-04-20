
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Quote, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

interface SuccessStory {
  id: number;
  title: string;
  content: string;
  author: string;
  role: string;
  mentor: string;
  mentorRole: string;
  tags: string[];
  rating: number;
  featured: boolean;
  image: string;
  mentorImage: string;
}

const SuccessStories = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stories: SuccessStory[] = [
    {
      id: 1,
      title: "From Career Confusion to Tech Lead in 18 Months",
      content: "When I first connected with my mentor Rajat on EchoMentor, I was stuck in a role with limited growth opportunities. Through structured mentorship sessions, I gained clarity on my career path, improved my technical and leadership skills, and successfully transitioned to a Tech Lead role at a respected organization. The guidance I received was invaluable - from interview preparation to negotiation strategies. I'm now earning 40% more and feeling fulfilled in my new role.",
      author: "Vikram Desai",
      role: "Tech Lead at CloudTech",
      mentor: "Rajat Kumar",
      mentorRole: "Senior Engineering Manager",
      tags: ["Career Transition", "Leadership", "Technical Skills"],
      rating: 5,
      featured: true,
      image: "/placeholder.svg",
      mentorImage: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Launching My UX Career with Expert Guidance",
      content: "As someone transitioning from graphic design to UX, I felt overwhelmed by the learning curve. My mentor Neha provided practical guidance on building my portfolio, mastering key UX tools, and preparing for interviews. She helped me understand industry expectations and build confidence in my skills. Within 6 months, I secured my first UX role at a startup. The personalized mentorship made all the difference in my journey.",
      author: "Priya Sharma",
      role: "UX Designer at DesignFirst",
      mentor: "Neha Gupta",
      mentorRole: "Senior UX Designer",
      tags: ["Career Transition", "Portfolio Building", "UX Design"],
      rating: 5,
      featured: false,
      image: "/placeholder.svg",
      mentorImage: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Overcoming Imposter Syndrome in Tech Leadership",
      content: "After being promoted to a leadership position, I struggled with imposter syndrome and managing team dynamics. My mentor Arjun provided practical strategies for building confidence, handling difficult conversations, and developing my leadership style. Our sessions focused on real workplace scenarios, which I could immediately apply. His guidance helped me transform from an uncertain new manager to a confident leader with improved team performance metrics.",
      author: "Meera Singh",
      role: "Product Manager at TechInnovate",
      mentor: "Arjun Kapoor",
      mentorRole: "Director of Product",
      tags: ["Leadership", "Confidence Building", "Team Management"],
      rating: 5,
      featured: true,
      image: "/placeholder.svg",
      mentorImage: "/placeholder.svg",
    },
    {
      id: 4,
      title: "From Academia to Industry: A Successful Transition",
      content: "After completing my PhD, I wanted to transition from academia to industry but wasn't sure how to position my skills. My mentor Vikram helped me translate my research experience into marketable skills for data science roles. We worked on practical projects to build my portfolio, and he introduced me to industry professionals for informational interviews. Within three months, I landed a data scientist role at a healthcare analytics company.",
      author: "Dr. Ankit Shah",
      role: "Data Scientist at HealthAnalytics",
      mentor: "Vikram Mehta",
      mentorRole: "Lead Data Scientist",
      tags: ["Career Transition", "Data Science", "Networking"],
      rating: 4,
      featured: false,
      image: "/placeholder.svg",
      mentorImage: "/placeholder.svg",
    },
    {
      id: 5,
      title: "Finding My Path in Digital Marketing",
      content: "I was overwhelmed by the various specializations within digital marketing and unsure which direction to take. My mentor Meera helped me explore different areas through practical mini-projects, which helped me discover my passion for content strategy. She guided me in building specialized skills and a portfolio that showcased my abilities. With her support, I transitioned from a general marketing role to a specialized content strategist position with a 30% salary increase.",
      author: "Rohan Gupta",
      role: "Content Strategist at MarketingPro",
      mentor: "Meera Patel",
      mentorRole: "Marketing Director",
      tags: ["Career Development", "Digital Marketing", "Specialization"],
      rating: 5,
      featured: false,
      image: "/placeholder.svg",
      mentorImage: "/placeholder.svg",
    },
  ];

  const filteredStories = searchQuery
    ? stories.filter(
        (story) =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.mentor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : stories;

  const featuredStories = stories.filter((story) => story.featured);

  return (
    <PageLayout>
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Real journeys of transformation through mentorship
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search success stories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Stories */}
        {!searchQuery && (
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-2xl font-bold mb-8">Featured Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-full">
                      <img
                        src={story.image}
                        alt={story.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < story.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                        {story.content.substring(0, 120)}...
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center mb-4">
                        <img
                          src={story.mentorImage}
                          alt={story.mentor}
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                        <div>
                          <p className="text-xs font-medium">Mentored by</p>
                          <p className="text-sm font-semibold">{story.mentor}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Read Full Story
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Stories */}
        <div className="max-w-6xl mx-auto">
          {searchQuery && (
            <h2 className="text-xl font-semibold mb-6">
              Search Results {filteredStories.length > 0 && `(${filteredStories.length})`}
            </h2>
          )}

          {!searchQuery && <h2 className="text-2xl font-bold mb-8">All Success Stories</h2>}

          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <Quote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No stories found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                We couldn't find any success stories matching your search query.
              </p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4 flex flex-col items-center text-center">
                      <img
                        src={story.image}
                        alt={story.author}
                        className="w-24 h-24 rounded-full object-cover mb-4"
                      />
                      <h4 className="font-semibold">{story.author}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {story.role}
                      </p>
                      <div className="flex space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < story.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap justify-center gap-1 mb-4">
                        {story.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-xs font-medium mb-1">Mentored by</p>
                        <div className="flex items-center">
                          <img
                            src={story.mentorImage}
                            alt={story.mentor}
                            className="w-6 h-6 rounded-full mr-2 object-cover"
                          />
                          <p className="text-sm font-semibold">{story.mentor}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {story.mentorRole}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold mb-4">{story.title}</h3>
                      <div className="relative">
                        <Quote className="absolute top-0 left-0 h-6 w-6 text-gray-300 dark:text-gray-600 -translate-x-2 -translate-y-2" />
                        <p className="text-gray-600 dark:text-gray-400 pl-4">
                          {story.content.length > 300
                            ? `${story.content.substring(0, 300)}...`
                            : story.content}
                        </p>
                      </div>
                      <div className="mt-4 text-right">
                        <Button variant="ghost" size="sm">
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share Your Story CTA */}
        <div className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-r from-echopurple-600 to-echoblue-600 rounded-2xl text-white shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">
            Have a Success Story to Share?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            We'd love to hear how mentorship has transformed your career journey.
            Your story could inspire others to take the next step in their professional development.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-echopurple-600 hover:bg-white/90"
          >
            Share Your Story
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default SuccessStories;
