import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: gallery1,
    title: "Team Photo 2024",
    category: "Team",
  },
  {
    id: "2",
    src: gallery2,
    title: "High Kick Practice",
    category: "Training",
  },
  {
    id: "3",
    src: gallery3,
    title: "Meditation Session",
    category: "Mindfulness",
  },
  {
    id: "4",
    src: gallery4,
    title: "Sparring Practice",
    category: "Training",
  },
  {
    id: "5",
    src: gallery5,
    title: "Technique Demonstration",
    category: "Training",
  },
  {
    id: "6",
    src: gallery6,
    title: "Awards Ceremony",
    category: "Events",
  },
];

const GalleryCard = ({ image, index }: { image: GalleryImage; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Overlay Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground font-heading text-xs font-semibold mb-2">
          {image.category}
        </span>
        <h3 className="font-heading font-bold text-background text-lg">
          {image.title}
        </h3>
      </div>

      {/* Always visible label */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm font-heading text-xs font-semibold text-foreground">
          {image.category}
        </span>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl lg:text-5xl font-bold text-background mb-4"
          >
            Photo Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-background/80 max-w-2xl mx-auto"
          >
            Explore moments from our training sessions, events, and tournaments.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <GalleryCard key={image.id} image={image} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
