import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourcePageProps {
  title: string;
  sections: {
    title: string;
    content: React.ReactNode;
  }[];
}

const ResourcePage: React.FC<ResourcePageProps> = ({ title, sections }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="text-lg">Back to Home</span>
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b-2 border-blue-500 pb-4">
          {title}
        </h1>

        {sections.map((section, index) => (
          <section key={index} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <span className="text-blue-500 mr-2">{index + 1}.</span>
              {section.title}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              {section.content}
            </div>
          </section>
        ))}

        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition-colors">
              Apply These Tips to Your Goals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
