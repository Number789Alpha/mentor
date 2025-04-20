
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface BannerProps {
  text: string;
  linkText?: string;
  linkUrl?: string;
}

const Banner = ({ text, linkText, linkUrl }: BannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-echopurple-600 to-echoblue-600 text-white py-2 px-4 text-center relative">
      <p className="text-sm font-medium">
        {text}{" "}
        {linkText && linkUrl && (
          <Link to={linkUrl} className="underline font-bold hover:text-white/90">
            {linkText}
          </Link>
        )}
      </p>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Banner;
