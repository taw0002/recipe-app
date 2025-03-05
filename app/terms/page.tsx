/**
 * Terms of Service Page Component
 * 
 * This page outlines the terms and conditions for using the Recipe Tracker application.
 * It covers user responsibilities, ownership, and legal implications of using the service.
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Terms of Service
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl prose">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using the Recipe Tracker service, website, and applications 
              (collectively, the "Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to all the terms and conditions, you may not access or use the Service.
            </p>
            
            <h2>Description of Service</h2>
            <p>
              Recipe Tracker provides users with tools to create, store, and organize recipes, 
              track cooking logs, and generate recipe images. Features may vary based on the subscription plan.
            </p>
            
            <h2>User Accounts</h2>
            <p>
              To access certain features of the Service, you may be required to register for an account. 
              You are responsible for maintaining the confidentiality of your account credentials 
              and for all activities that occur under your account.
            </p>
            <p>
              You agree to provide accurate and complete information when creating an account and to 
              promptly update your account information as necessary.
            </p>

            <h2>User Content</h2>
            <p>
              The Service allows you to create, upload, and share content such as recipes, images, and cooking logs 
              ("User Content"). You retain all rights to your User Content, but grant Recipe Tracker 
              a non-exclusive, worldwide, royalty-free license to use, reproduce, and display your User Content 
              solely for the purpose of providing the Service.
            </p>
            <p>
              You are solely responsible for your User Content and represent that you have all necessary 
              rights to grant the above license.
            </p>

            <h2>Subscription and Billing</h2>
            <p>
              Recipe Tracker offers both free and paid subscription plans. By selecting a paid subscription, 
              you agree to pay the subscription fees indicated for your selected plan. Subscription fees 
              are billed in advance on a monthly or annual basis.
            </p>
            <p>
              You may cancel your subscription at any time, but no refunds will be provided for any unused 
              portion of your current billing period.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are owned by Recipe Tracker 
              and are protected by international copyright, trademark, patent, trade secret, and other 
              intellectual property laws.
            </p>

            <h2>Limitations of Liability</h2>
            <p>
              In no event shall Recipe Tracker be liable for any indirect, incidental, special, consequential, 
              or punitive damages arising out of or relating to your use of the Service.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will provide notice 
              of significant changes by updating the "Last Updated" date at the top of this page. Your 
              continued use of the Service after any changes constitutes acceptance of the modified terms.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately, without prior 
              notice, if you violate these Terms of Service or for any other reason at our sole discretion.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, 
              without regard to its conflict of law provisions.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <a href="mailto:terms@recipetracker.com">terms@recipetracker.com</a>
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