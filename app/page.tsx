import React from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Trophy,
  LucideIcon,
  Quote,
  PlayCircle,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

interface ReviewCardProps {
  quote: string;
  author: string;
  role: string;
  imageSrc: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  quote,
  author,
  role,
  imageSrc,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <Quote className="h-6 w-6 text-blue-500 mb-2" />
        <p className="text-gray-700 italic">{quote}</p>
      </div>
      <div className="flex items-center mt-4">
        <Image
          src={imageSrc}
          alt={author}
          width={56}
          height={56}
          className="rounded-full mr-4"
        />
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
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
      <section className="py-20 bg-white">
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Discover How GoalQuest Works
              </h2>
              <p className="text-xl mb-6 text-gray-600">
                Watch our quick demo video to see how easy it is to set, track,
                and achieve your goals with GoalQuest.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg inline-flex items-center">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/demo-video-placeholder.jpg"
                  alt="GoalQuest Demo Video"
                  width={640}
                  height={360}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-900">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ReviewCard
              quote="GoalQuest has transformed how I approach my goals. It's intuitive and keeps me accountable. I've achieved more in the last month than I did all of last year!"
              author="Sarah J."
              role="Marketing Manager"
              imageSrc="/images/sarah.png"
            />
            <ReviewCard
              quote="The progress tracking is fantastic. It keeps me motivated and focused on achieving my objectives. I use it for both personal and professional goals."
              author="Michael C."
              role="Fitness Enthusiast"
              imageSrc="/images/michael-chen.png"
            />
            <ReviewCard
              quote="As a student, GoalQuest helps me balance academics and extracurriculars. It's a game-changer! I'm more organized and less stressed about deadlines."
              author="Emily R."
              role="University Student"
              imageSrc="/images/emily.png"
            />
            <ReviewCard
              quote="I've tried many goal-setting apps, but GoalQuest stands out. Its simplicity and effectiveness have made a real difference in my productivity."
              author="David L."
              role="Entrepreneur"
              imageSrc="/images/david.png"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
