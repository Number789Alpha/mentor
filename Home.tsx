
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, ArrowRight, BookOpen, Calendar, Award, Users, Target } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useState } from "react";
import CrisisDialog from "@/components/CrisisDialog";

const Home = () => {
  const [showCrisisDialog, setShowCrisisDialog] = useState(false);
  const featuredMentors = [
    {
      name: "Divyanshi Agarwal",
      role: "Frontend Development Expert",
      image: "/mentors/divyanshi-agarwal.svg",
      specialties: ["Frontend Development", "React", "UI/UX"],
    },
    {
      name: "Priyank Mishra",
      role: "Backend Development Lead",
      image: "/mentors/priyank-mishra.svg",
      specialties: ["Backend Development", "System Design", "Node.js"],
    },
    {
      name: "Arjun Singh",
      role: "Cloud Architecture Specialist",
      image: "/placeholder.svg",
      specialties: ["Cloud Infrastructure", "DevOps", "System Design"],
    },
    {
      name: "Priya Sharma",
      role: "Engineering Manager",
      image: "/placeholder.svg",
      specialties: ["Team Leadership", "Career Growth", "Technical Roadmaps"],
    },
  ];

  const testimonials = [
    {
      name: "Aarav Patel",
      role: "Software Engineer",
      image: "/placeholder.svg",
      content:
        "EchoMentor connected me with a senior tech leader who helped me navigate my career transition. The structured sessions and goal tracking made a real difference in my progress.",
      stars: 5,
    },
    {
      name: "Meera Singh",
      role: "Marketing Professional",
      image: "/placeholder.svg",
      content:
        "Finding a mentor who understood my specific challenges in digital marketing was game-changing. The platform made scheduling and communication seamless.",
      stars: 5,
    },
    {
      name: "Vikram Sharma",
      role: "MBA Student",
      image: "/placeholder.svg",
      content:
        "As a mentor on EchoMentor, I've been able to give back while also improving my own leadership skills. The platform's tools make mentoring effective and enjoyable.",
      stars: 4,
    },
  ];

  return (
    <PageLayout showBanner>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Where{" "}
                <span className="bg-gradient-to-r from-echopurple-600 to-echoblue-500 bg-clip-text text-transparent">
                  guidance today
                </span>{" "}
                meets{" "}
                <span className="bg-gradient-to-r from-echoblue-500 to-echopurple-600 bg-clip-text text-transparent">
                  tomorrow
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-400 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Connect with experienced mentors who can guide you on your
                journey to success. Personalized mentorship that transforms
                potential into achievement.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/find-mentors">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Browse Mentors
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Cpath d='M400 150c-30 0-54.6 24.6-54.6 54.6s24.6 54.6 54.6 54.6 54.6-24.6 54.6-54.6S430 150 400 150zm0 99.2c-24.6 0-44.6-20-44.6-44.6s20-44.6 44.6-44.6 44.6 20 44.6 44.6-20 44.6-44.6 44.6z' fill='%236366f1'/%3E%3Cpath d='M400 350c-66.2 0-120 53.8-120 120h10c0-60.7 49.3-110 110-110s110 49.3 110 110h10c0-66.2-53.8-120-120-120zm-150-150c-24.8 0-45 20.2-45 45s20.2 45 45 45 45-20.2 45-45-20.2-45-45-45zm300 0c-24.8 0-45 20.2-45 45s20.2 45 45 45 45-20.2 45-45-20.2-45-45-45z' fill='%236366f1'/%3E%3Cpath d='M250 350c-49.7 0-90 40.3-90 90h10c0-44.1 35.9-80 80-80s80 35.9 80 80h10c0-49.7-40.3-90-90-90zm300 0c-49.7 0-90 40.3-90 90h10c0-44.1 35.9-80 80-80s80 35.9 80 80h10c0-49.7-40.3-90-90-90z' fill='%236366f1'/%3E%3C/svg%3E"
                alt="Mentorship Illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-medium mb-1">Featured Mentor</p>
                  <h3 className="text-xl font-bold">Rajat Kumar</h3>
                  <p className="text-sm opacity-90">Tech Leadership | 10+ years experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Crisis Support Banner */}
      <section className="py-8 bg-gradient-to-r from-red-500 to-pink-500">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Need Immediate Support?</h2>
              <p className="text-white/90">Our crisis counsellors are available 24/7. Don't hesitate to reach out.</p>
            </div>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-red-500 hover:bg-white/90"
                onClick={() => setShowCrisisDialog(true)}
              >
                Get Help Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Dialog */}
      <CrisisDialog
        open={showCrisisDialog}
        onOpenChange={setShowCrisisDialog}
      />

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <p className="text-3xl md:text-4xl font-bold text-echopurple-600 dark:text-echopurple-400">
                500+
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Expert Mentors
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <p className="text-3xl md:text-4xl font-bold text-echopurple-600 dark:text-echopurple-400">
                5,000+
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Mentees Helped
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <p className="text-3xl md:text-4xl font-bold text-echopurple-600 dark:text-echopurple-400">
                15,000+
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Sessions Completed
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
              <p className="text-3xl md:text-4xl font-bold text-echopurple-600 dark:text-echopurple-400">
                98%
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredMentors.map((mentor, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-lg transition-shadow">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{mentor.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-echopurple-100 dark:bg-echopurple-900 text-echopurple-600 dark:text-echopurple-400 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose EchoMentor?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our platform offers everything you need for a transformative
              mentorship experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-echopurple-100 dark:bg-echopurple-900 text-echopurple-600 dark:text-echopurple-400 mb-4">
                <Users />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Mentors</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with verified professionals with real-world experience in
                your field of interest.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-echopurple-100 dark:bg-echopurple-900 text-echopurple-600 dark:text-echopurple-400 mb-4">
                <Calendar />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Book sessions based on your availability with an easy-to-use
                calendar system.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-echopurple-100 dark:bg-echopurple-900 text-echopurple-600 dark:text-echopurple-400 mb-4">
                <Target />
              </div>
              <h3 className="text-xl font-semibold mb-2">Goal Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set clear objectives and track your progress with our milestone
                system.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-echopurple-100 dark:bg-echopurple-900 text-echopurple-600 dark:text-echopurple-400 mb-4">
                <BookOpen />
              </div>
              <h3 className="text-xl font-semibold mb-2">Valuable Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access curated content, guides, and templates to supplement your
                mentorship journey.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-echopurple-100 dark:bg-echopurple-900 text-echopurple-600 dark:text-echopurple-400 mb-4">
                <Award />
              </div>
              <h3 className="text-xl font-semibold mb-2">XP & Achievements</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Stay motivated with our gamified experience points system and
                unlock badges as you progress.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-echopurple-100 dark:bg-echopurple-900 text-echopurple-600 dark:text-echopurple-400 mb-4">
                <CheckCircle />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Trial Session</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Test the waters with a complimentary session before committing to
                a paid plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How EchoMentor Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Getting started is easy - follow these simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-echopurple-600 text-white font-bold flex items-center justify-center">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 pt-2">
                Sign Up & Create a Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Create your account, specify your goals, and complete your
                profile with your skills and interests.
              </p>
              <Link to="/signup" className="text-echopurple-600 dark:text-echopurple-400 font-medium hover:underline inline-flex items-center">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-echopurple-600 text-white font-bold flex items-center justify-center">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 pt-2">
                Find Your Ideal Mentor
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Browse mentor profiles, read reviews, and select someone who
                aligns with your goals and aspirations.
              </p>
              <Link to="/find-mentors" className="text-echopurple-600 dark:text-echopurple-400 font-medium hover:underline inline-flex items-center">
                Browse Mentors <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-echopurple-600 text-white font-bold flex items-center justify-center">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 pt-2">
                Book Sessions & Grow
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Schedule your free trial, then continue with regular sessions.
                Track your progress and achieve your goals.
              </p>
              <Link to="/pricing" className="text-echopurple-600 dark:text-echopurple-400 font-medium hover:underline inline-flex items-center">
                View Plans <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Featured Mentors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Learn from the best minds across diverse fields
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMentors.map((mentor, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm bg-echopurple-100 dark:bg-echopurple-900 text-echopurple-600 dark:text-echopurple-400 px-3 py-1 rounded-full font-medium">
                      {mentor.specialties[0]}
                    </span>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < 4
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    {idx % 3 === 0
                      ? "Vikram Mehta"
                      : idx % 3 === 1
                      ? "Priya Sharma"
                      : "Arjun Kapoor"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {idx % 3 === 0
                      ? "Senior Software Engineer at TechCorp"
                      : idx % 3 === 1
                      ? "Marketing Director at BrandGrowth"
                      : "Career Coach & Former HR Executive"}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Leadership", idx % 3 === 0 ? "Coding" : idx % 3 === 1 ? "Strategy" : "Interview Prep", "Mentorship"].map(
                      (tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                  <Link to="/find-mentors">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/find-mentors">
              <Button size="lg">
                View All Mentors
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Echo Diaries
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Inspiring journeys from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < testimonial.stars
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/success-stories">
              <Button variant="outline" size="lg">
                Read More Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-echopurple-600 to-echoblue-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 text-white">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Transform Your Future?
                </h2>
                <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Start your mentorship journey today with a free trial session.
                  No commitment required.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/signup">
                    <Button size="lg" variant="secondary">
                      Get Started for Free
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
