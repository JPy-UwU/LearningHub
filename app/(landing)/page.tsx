import { LandingContent } from "./_components/landing-content";
import { LandingHero } from "./_components/landing-hero";
import { LandingNavbar } from "./_components/landing-navbar";

const LandingPage = () => {
  return (
    <div className="h-full pt-10 p-20">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  )
}

export default LandingPage;