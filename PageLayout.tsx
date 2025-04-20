
import Navbar from "../Navbar";
import Footer from "../Footer";
import ChatbotButton from "../ChatbotButton";
import Banner from "../Banner";

interface PageLayoutProps {
  children: React.ReactNode;
  showBanner?: boolean;
  bannerText?: string;
  bannerLinkText?: string;
  bannerLinkUrl?: string;
}

const PageLayout = ({ 
  children, 
  showBanner = false,
  bannerText = "Get started with a free trial mentoring session today!",
  bannerLinkText = "Sign up now",
  bannerLinkUrl = "/signup"
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showBanner && (
        <Banner 
          text={bannerText} 
          linkText={bannerLinkText} 
          linkUrl={bannerLinkUrl} 
        />
      )}
      <Navbar />
      <div className="flex-grow pt-16">
        {children}
      </div>
      <ChatbotButton />
      <Footer />
    </div>
  );
};

export default PageLayout;
