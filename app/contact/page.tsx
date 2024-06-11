import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Free Next.js Template for Startup and SaaS",
  description: "This is Contact Page for Startup Nextjs Template",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contactez-nous"
        description="Si vous avez des questions sur nos services de réparation d'appareils électroniques, n'hésitez pas à nous contacter. Nous sommes là pour vous aider."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
