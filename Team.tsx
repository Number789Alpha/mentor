import { Github, Linkedin, Twitter } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const Team = () => {
  const founders: TeamMember[] = [
    {
      name: "Priyank Mishra",
      role: "Co-Founder & CEO",
      bio: "Priyank brings extensive experience in educational technology and has a passion for connecting talented mentors with eager mentees. He leads the strategic vision and growth of EchoMentor.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      name: "Karan Singh",
      role: "Co-Founder & CTO",
      bio: "Karan is a technology enthusiast with a strong background in software development. He's passionate about building scalable platforms that create meaningful connections. He oversees all technical aspects of EchoMentor.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
    {
      name: "Harsh Shukla",
      role: "Co-Founder & COO",
      bio: "Harsh brings operational excellence and strategic planning to EchoMentor. With his extensive experience in business operations, he ensures smooth execution of our platform's initiatives and growth strategies.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
      },
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Vikram Mehta",
      role: "Head of Mentor Relations",
      bio: "Vikram ensures our mentors provide the highest quality guidance. He manages mentor onboarding, training, and quality assurance across the platform.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
      },
    },
    {
      name: "Priya Sharma",
      role: "User Experience Lead",
      bio: "Priya leads our user experience initiatives, making sure both mentors and mentees have a seamless journey on the platform.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Arjun Kapoor",
      role: "Content & Community Manager",
      bio: "Arjun oversees our resource library and ensures our community guidelines foster positive and productive mentorships.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Neha Gupta",
      role: "Marketing Director",
      bio: "Neha drives our marketing strategies, helping connect more mentees with the right mentors for their professional development.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
      },
    },
  ];

  const advisors: TeamMember[] = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Education Advisor",
      bio: "Dr. Kumar brings 20+ years of experience in higher education and career development, ensuring our mentorship approach follows best practices.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
      },
    },
    {
      name: "Sunita Patel",
      role: "Industry Expert",
      bio: "With extensive corporate leadership experience, Sunita advises on industry trends and ensures our platform meets evolving professional needs.",
      image: "/placeholder.svg",
      social: {
        linkedin: "#",
      },
    },
  ];

  const renderSocialLinks = (social: TeamMember["social"]) => {
    return (
      <div className="flex space-x-3 mt-4">
        {social.linkedin && (
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        )}
        {social.twitter && (
          <a
            href={social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
        )}
        {social.github && (
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-echopurple-600 dark:text-gray-400 dark:hover:text-echopurple-400 transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        )}
      </div>
    );
  };

  const renderTeamMember = (member: TeamMember, index: number) => {
    return (
      <div
        key={index}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-echopurple-600 dark:text-echopurple-400 mb-3">
            {member.role}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            {member.bio}
          </p>
          {renderSocialLinks(member.social)}
        </div>
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The passionate people behind EchoMentor, dedicated to transforming mentorship
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                At EchoMentor, we believe everyone deserves access to quality mentorship to reach their full potential. Our mission is to democratize mentorship by connecting talented individuals with experienced mentors who can guide them on their professional journey.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to creating a platform that fosters meaningful connections, facilitates knowledge transfer, and helps build the next generation of Indian professionals across all fields.
              </p>
            </div>
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="EchoMentor Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Founders Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Our Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {founders.map((founder, index) => renderTeamMember(founder, index))}
          </div>
        </div>

        {/* Core Team Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Core Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => renderTeamMember(member, index))}
          </div>
        </div>

        {/* Advisors Section */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Advisory Board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => renderTeamMember(advisor, index))}
          </div>
        </div>

        {/* Join Our Team Section */}
        <div className="max-w-4xl mx-auto pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-echopurple-600 to-echoblue-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-white">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Join Our Team
                </h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  We're always looking for passionate people to join our mission of transforming
                  mentorship in India. Check out our open positions.
                </p>
                <a
                  href="/careers"
                  className="inline-block bg-white text-echopurple-600 font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
                >
                  View Open Positions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Team;
