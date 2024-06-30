import React from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Trophy,
  LucideIcon,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Set Goals. Track Progress. Achieve More.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
            GoalQuest helps you turn your ambitions into accomplishments. Set,
            track, and conquer your goals with ease.
          </p>
          <SignedOut>
            <div className="space-x-4">
              <SignUpButton mode="modal">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full text-lg"
                >
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            Why Choose GoalQuest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="h-12 w-12 text-blue-500" />}
              title="Set Clear Goals"
              description="Define your objectives with clarity and purpose. Break down big dreams into actionable steps."
            />
            <FeatureCard
              icon={<CheckCircle className="h-12 w-12 text-green-500" />}
              title="Track Progress"
              description="Monitor your journey with intuitive tracking tools. Stay motivated by visualizing your progress."
            />
            <FeatureCard
              icon={<Trophy className="h-12 w-12 text-yellow-500" />}
              title="Celebrate Wins"
              description="Acknowledge your achievements, big and small. Build momentum through consistent progress."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
