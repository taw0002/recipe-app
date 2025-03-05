/**
 * Privacy Policy Page Component
 * 
 * This page outlines the privacy practices and data handling procedures for the Recipe Tracker application.
 * It explains how user data is collected, stored, and protected.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Privacy Policy
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl prose">
            <h2>Introduction</h2>
            <p>
              At Recipe Tracker, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our Recipe Tracker application and website 
              (collectively, the "Service").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using the Service, you 
              acknowledge that you have read, understood, and agree to be bound by all the terms 
              outlined in this Privacy Policy.
            </p>
            
            <h2>Information We Collect</h2>
            <p>We may collect several types of information from and about users of our Service, including:</p>
            <ul>
              <li><strong>Personal Data:</strong> Name, email address, and account credentials when you register.</li>
              <li><strong>Recipe Data:</strong> Recipes, cooking logs, and related information you choose to store.</li>
              <li><strong>Usage Data:</strong> Information about how you use the Service, including features accessed.</li>
              <li><strong>Device Data:</strong> Information about your device, browser, and connection.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our Service</li>
              <li>Process and complete transactions</li>
              <li>Send administrative information, updates, and promotional content</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Protect against unauthorized access and legal liability</li>
            </ul>

            <h2>Data Storage and Security</h2>
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of any 
              personal information we process. However, please note that no method of transmission over the Internet or method 
              of electronic storage is 100% secure.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              Our Service may contain links to third-party websites and services. We have no control over, and assume 
              no responsibility for, the content, privacy policies, or practices of any third-party sites or services.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our Service is not intended for use by children under the age of 13. We do not knowingly collect personally 
              identifiable information from children under 13.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              <a href="mailto:privacy@recipetracker.com">privacy@recipetracker.com</a>
            </p>
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/">
              <Button>Return to Homepage</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 