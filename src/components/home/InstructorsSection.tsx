import { motion } from "framer-motion";
import { Award, Shield } from "lucide-react";
import instructorJayakumarImg from "@/assets/instructor1.jpeg";
import instructorJothiImg from "@/assets/Instructor2.jpeg";

const instructors = [
  {
    name: "A. Jayakumar",
    subtitle: "Founder & Chief Coach - Ellalan Martial Arts and Fitness Mind",
    icon: Award,
    image: instructorJayakumarImg,
    imageAlt: "Instructor A. Jayakumar in karate uniform",
    roles: [
      "Tamilnadu President - Shuko-Kai International Karate-Do",
      "Join Secretary - Chennai District Shitoryu Karate Association",
      "General Secretary - Tamilnadu MMA Sports Association",
      "General Secretary (South Chennai) - Tamilnadu MuayThai Association",
    ],
  },
  {
    name: "Sensei Jothi",
    subtitle:
      "President & Chief Female Instructor - Ellalan Martial Arts and Fitness Mind",
    icon: Shield,
    image: instructorJothiImg,
    imageAlt: "Sensei Jothi in karate uniform",
    roles: ["Chief Female Instructor - Shukokai International Karate-Do"],
  },
];

export const InstructorsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-heading text-sm font-semibold mb-4"
          >
            Meet Our Instructors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            Leadership and Experience You Can Trust
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-stretch">
          {instructors.map((instructor, index) => {
            const Icon = instructor.icon;

            return (
              <motion.article
                key={instructor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full max-w-sm bg-card rounded-2xl shadow-soft border border-border overflow-hidden"
              >
                <div className="relative aspect-[2/3] overflow-hidden" style={{ height: "350px", width: "100%" }}>
                  <img
                    src={instructor.image}
                    alt={instructor.imageAlt}
                    // height={"120px"}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-card-foreground">
                      {instructor.name}
                    </h3>
                  </div>

                  <p className="font-body text-card-foreground leading-relaxed mb-5">
                    {instructor.subtitle}
                  </p>

                  <ol className="space-y-3" style={{listStyle: "inherit", marginLeft: "20px"}}>
                    {instructor.roles.map((role) => (
                      <li
                        key={role}
                        className="font-body text-muted-foreground "
                      >
                        {role}
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
