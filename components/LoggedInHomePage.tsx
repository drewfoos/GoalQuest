"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Lightbulb,
  Target,
  Book,
  Star,
  CheckCircle,
} from "lucide-react";

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
          Let&apos;s make today count towards your goals.
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

export default LoggedInHomePage;
