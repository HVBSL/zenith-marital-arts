import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClassCardProps {
  title: string;
  description: string;
  image: string;
  ageRange: string;
  schedule: string;
  index: number;
}

export const ClassCard = ({
  title,
  description,
  image,
  ageRange,
  schedule,
  index,
}: ClassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-accent-foreground font-heading text-xs font-semibold">
            {ageRange}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">
          {title}
        </h3>
        <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-heading">
            {schedule}
          </span>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/enquiry">
              Learn More
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
