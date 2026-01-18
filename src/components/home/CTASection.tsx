import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-hero text-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl lg:text-5xl font-bold mb-6"
          >
            Ready to Begin Your
            <span className="text-gradient-gold"> Martial Arts Journey?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-body text-lg text-background/80 mb-8 leading-relaxed"
          >
            Join hundreds of students who have transformed their lives through
            discipline, strength, and the art of Karate. Your first class is free.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/enquiry">
                Enroll Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/gallery">View Gallery</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
