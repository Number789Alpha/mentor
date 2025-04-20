
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems: FaqItem[] = [
    {
      question: "What is EchoMentor?",
      answer:
        "EchoMentor is a platform connecting mentees with experienced Indian mentors across various fields. We provide a structured mentorship experience with features like session scheduling, goal tracking, resource sharing, and progress monitoring.",
      category: "general",
    },
    {
      question: "How does the mentorship process work?",
      answer:
        "After signing up, you can browse mentor profiles, schedule a free trial session, and if you find a good match, continue with regular paid sessions. Sessions are conducted via video calls (Google Meet or Zoom). You can set goals, track your progress, and access resources shared by your mentor.",
      category: "general",
    },
    {
      question: "Do I need to pay for mentorship?",
      answer:
        "EchoMentor offers a free trial session with any mentor. After that, we have various subscription plans, starting from ₹1,999/month for our Basic plan. You can view all our pricing details on the Pricing page.",
      category: "payment",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, net banking, and digital wallets for Indian users. International payments can be made via credit/debit cards and PayPal.",
      category: "payment",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. We don't offer prorated refunds for partial months.",
      category: "payment",
    },
    {
      question: "How are mentors verified?",
      answer:
        "All mentors undergo a thorough verification process including identity verification, professional background checks, and an interview with our team. We also collect and monitor feedback from mentees to ensure quality mentorship.",
      category: "mentors",
    },
    {
      question: "Can I change my mentor?",
      answer:
        "Absolutely! You can work with multiple mentors or switch mentors at any time. This is particularly useful if you need guidance in different areas or if you feel another mentor might be a better fit.",
      category: "mentors",
    },
    {
      question: "How long are mentorship sessions?",
      answer:
        "Standard mentorship sessions are 45-60 minutes long, depending on the mentor. Some mentors may offer extended sessions or shorter check-ins, which will be clearly indicated in their profiles.",
      category: "sessions",
    },
    {
      question: "What if I need to reschedule or cancel a session?",
      answer:
        "You can reschedule or cancel sessions through your dashboard. We request at least 24 hours notice for cancellations or rescheduling to respect the mentor's time. Late cancellations may count against your monthly session quota.",
      category: "sessions",
    },
    {
      question: "How do I prepare for my first session?",
      answer:
        "Before your first session, we recommend defining clear goals, preparing specific questions, and completing your profile with relevant information about your background and aspirations. This helps your mentor provide more targeted guidance.",
      category: "sessions",
    },
    {
      question: "What is the Crisis Mentor Match feature?",
      answer:
        "Crisis Mentor Match is a premium feature that connects you with an available mentor within 15 minutes for urgent guidance. This is available for emergency situations like academic stress, career confusion, or when you need immediate professional advice.",
      category: "features",
    },
    {
      question: "How does the XP and achievement system work?",
      answer:
        "You earn Experience Points (XP) for completing sessions, achieving milestones, providing feedback, and other engagement activities. These points help you level up and unlock achievements and badges that showcase your dedication to growth.",
      category: "features",
    },
    {
      question: "What types of resources are available on the platform?",
      answer:
        "EchoMentor offers a resource library with articles, videos, templates, worksheets, and guides across various professional fields. Some resources are available to all users, while premium content is exclusive to paid subscribers.",
      category: "features",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data privacy seriously. We use encryption for all sensitive data, never share your personal information with third parties without consent, and are compliant with data protection regulations. You can review our Privacy Policy for more details.",
      category: "privacy",
    },
    {
      question: "Can I become a mentor on EchoMentor?",
      answer:
        "Yes! If you have expertise and experience in your field, you can apply to become a mentor through our website. Our team will review your application, conduct an interview, and guide you through the onboarding process if approved.",
      category: "mentors",
    },
  ];

  const filteredFaqs = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  // Count FAQs by category
  const categoryCount = faqItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <PageLayout>
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Find answers to common questions about EchoMentor
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-3xl mx-auto">
          {searchQuery ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Search Results {filteredFaqs.length > 0 && `(${filteredFaqs.length})`}
                </h2>
                {filteredFaqs.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    No matching questions found. Try a different search term or browse all questions below.
                  </p>
                )}
              </div>

              <Accordion type="single" collapsible className="mb-8">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`search-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="text-center">
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            </>
          ) : (
            <Tabs defaultValue="general">
              <TabsList className="mb-8 flex flex-wrap justify-center">
                <TabsTrigger value="general">
                  General ({categoryCount["general"] || 0})
                </TabsTrigger>
                <TabsTrigger value="mentors">
                  Mentors ({categoryCount["mentors"] || 0})
                </TabsTrigger>
                <TabsTrigger value="sessions">
                  Sessions ({categoryCount["sessions"] || 0})
                </TabsTrigger>
                <TabsTrigger value="payment">
                  Payment ({categoryCount["payment"] || 0})
                </TabsTrigger>
                <TabsTrigger value="features">
                  Features ({categoryCount["features"] || 0})
                </TabsTrigger>
                <TabsTrigger value="privacy">
                  Privacy ({categoryCount["privacy"] || 0})
                </TabsTrigger>
              </TabsList>

              {["general", "mentors", "sessions", "payment", "features", "privacy"].map(
                (category) => (
                  <TabsContent key={category} value={category}>
                    <Accordion type="single" collapsible className="mb-8">
                      {faqItems
                        .filter((faq) => faq.category === category)
                        .map((faq, index) => (
                          <AccordionItem key={index} value={`${category}-${index}`}>
                            <AccordionTrigger className="text-left font-medium">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </TabsContent>
                )
              )}
            </Tabs>
          )}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
          <h2 className="text-xl font-semibold mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're here to help. Reach out to our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button>Contact Support</Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline">Learn How It Works</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Faq;
