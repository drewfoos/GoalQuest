"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
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
  Lightbulb,
  Book,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const LoggedInHomePage: React.FC = () => {
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);

  if (!user) return null;

  const motivationalTips = [
    "Break big goals into smaller, manageable tasks.",
    "Celebrate small wins along the way to stay motivated.",
    "Write down your goals to make them more tangible.",
    "Share your goals with others for accountability.",
    "Review and adjust your goals regularly to stay on track.",
  ];

  const randomTip =
    motivationalTips[Math.floor(Math.random() * motivationalTips.length)];

  const goalCategories = [
    {
      icon: <Target className="h-6 w-6" />,
      name: "Career",
      href: "/dashboard?category=career",
    },
    {
      icon: <Book className="h-6 w-6" />,
      name: "Education",
      href: "/dashboard?category=education",
    },
    {
      icon: <Star className="h-6 w-6" />,
      name: "Personal Growth",
      href: "/dashboard?category=personal",
    },
  ];

  const quickStartSteps = [
    { text: "Navigate to your dashboard", action: () => {} },
    { text: "Click on Create New Goal", action: () => {} },
    { text: "Define your goal and set a deadline", action: () => {} },
    { text: "Break it down into actionable steps", action: () => {} },
    { text: "Start working towards your goal!", action: () => {} },
  ];

  const resources = [
    {
      title: "Guide to Effective Goal Setting",
      href: "/resources/effective-goal-setting",
    },
    {
      title: "Tips for Staying Motivated",
      href: "/resources/staying-motivated",
    },
    {
      title: "How to Track Your Progress",
      href: "/resources/tracking-progress",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Welcome, {user.firstName}!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Let's make today count towards your goals.
        </p>

        <Card className="mb-8 border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start">
              <Lightbulb className="h-8 w-8 text-blue-500 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Goal-Setting Tip
                </h2>
                <p className="text-gray-700">{randomTip}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Quick Start Guide
            </h2>
            <ol className="space-y-2 text-gray-700">
              {quickStartSteps.map((step, index) => (
                <li
                  key={index}
                  className={`flex items-center p-2 rounded ${
                    currentStep === index ? "bg-blue-100" : ""
                  } cursor-pointer transition-colors`}
                  onClick={() => setCurrentStep(index)}
                >
                  <span
                    className={`mr-2 ${
                      currentStep >= index ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {currentStep > index ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      `${index + 1}.`
                    )}
                  </span>
                  {step.text}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="text-center mb-12">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
              Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Explore Goal Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {goalCategories.map((category, index) => (
            <Link href={category.href} key={index}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    {category.icon}
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    {category.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Resources
            </h2>
            <ul className="space-y-2 text-gray-700">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link
                    href={resource.href}
                    className="text-blue-600 hover:underline"
                  >
                    {resource.title}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <SignedIn>
        <LoggedInHomePage />
      </SignedIn>
      <SignedOut>
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

        {/* How it Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Discover How GoalQuest Works
                </h2>
                <p className="text-xl mb-6 text-gray-600">
                  Watch our quick demo video to see how easy it is to set,
                  track, and achieve your goals with GoalQuest.
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

        {/* Testimonials Section */}
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
      </SignedOut>
    </div>
  );
}
