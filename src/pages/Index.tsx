import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ClassesSection } from "@/components/home/ClassesSection";
import { InstructorsSection } from "@/components/home/InstructorsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <InstructorsSection />
      <ClassesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
