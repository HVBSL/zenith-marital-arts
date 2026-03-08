import { motion } from "framer-motion";
import { ClassCard } from "./ClassCard";
import kidsKarateImg from "@/assets/kids-karate.jpg";
import adultKarateImg from "@/assets/adult-karate.jpg";
import girlsSelfDefenseImg from "@/assets/girls-self-defense.jpg";
import muayThaiImg from "@/assets/muay_thai_panel.jpg";
import mmaImg from "@/assets/mma_panel.jpg";
import judoImg from "@/assets/judo_panel.jpg";

const classes = [
  {
    title: "Kids Karate",
    description:
      "Build confidence, discipline, and physical fitness in a fun and supportive environment designed specifically for children.",
    image: kidsKarateImg,
    ageRange: "Ages 5-12",
    schedule: "Everyday 5AM - 10PM",
  },
  {
    title: "Adult Karate",
    description:
      "Master traditional karate techniques while improving strength, flexibility, and mental focus in our adult program.",
    image: adultKarateImg,
    ageRange: "Ages 18+",
    schedule: "Everyday 5AM - 10PM",
  },
  {
    title: "Girls Self-Defense",
    description:
      "Empowering women and girls with practical self-defense skills, situational awareness, and personal safety techniques.",
    image: girlsSelfDefenseImg,
    ageRange: "All Ages",
    schedule: "Everyday 5AM - 10PM",
  },
  {
    title: "Muay Thai",
    description:
      "Learn the art of Muay Thai with our experienced instructors and build incredible strength and endurance.",
    image: muayThaiImg,
    ageRange: "Ages 10+",
    schedule: "Everyday 5AM - 10PM",
  },
  {
    title: "MMA",
    description:
      "Train in mixed martial arts with our expert instructors and develop comprehensive fighting skills.",
    image: mmaImg,
    ageRange: "Ages 10+",
    schedule: "Everyday 5AM - 10PM",
  },
  {
    title: "Judo",
    description:
      "Develop discipline, respect, and physical strength through the practice of judo.",
    image: judoImg,
    ageRange: "Ages 10+",
    schedule: "Everyday 5AM - 10PM",
  },
];

export const ClassesSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-heading text-sm font-semibold mb-4"
          >
            Our Programs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Classes for Every Age
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="font-body text-muted-foreground leading-relaxed"
          >
            From young beginners to seasoned adults, we offer specialized programs
            tailored to each age group and skill level.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <ClassCard key={classItem.title} {...classItem} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
