import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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

interface Gallery {
  id: number;
  title: string;
  images: GalleryImage[];
}

// Extract file ID from Google Drive URL
const getGoogleDriveFileId = (url: string): string | null => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

const defaultGalleryImages: GalleryImage[] = [
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

const GalleryBlockCard = ({ gallery, index, onClick }: { gallery: Gallery; index: number; onClick: () => void }) => {
  if (!gallery.images || gallery.images.length === 0) return null;

  const firstImage = gallery.images[0];
  const fileId = getGoogleDriveFileId(firstImage.src);
  const isGoogleDriveFile = firstImage.src.includes("drive.google.com");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-200">
        {isGoogleDriveFile && fileId ? (
          <iframe
            src={`https://drive.google.com/file/d/${fileId}/preview`}
            className="w-full h-full border-0 pointer-events-none"
            allow="autoplay"
            title={firstImage.title}
          />
        ) : (
          <img
            src={firstImage.src}
            alt={firstImage.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Overlay Content */}
      <div className="absolute bottom-5 left-5 right-0 ">
        <h3 className="font-heading font-bold text-background text-lg">
          {gallery.title}
        </h3>
        <p className="font-body text-xs text-background/80 mt-1">
          {gallery.images.length} {gallery.images.length === 1 ? 'image' : 'images'}
        </p>
      </div>

      {/* Always visible label */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm font-heading text-xs font-semibold text-foreground">
          {gallery.images.length}
        </span>
      </div>
    </motion.div>
  );
};

// Keep the old GalleryCard for reference (can be removed later)
const GalleryCard = ({ image, index, onClick }: { image: GalleryImage; index: number; onClick: () => void }) => {
  const fileId = getGoogleDriveFileId(image.src);
  const isGoogleDriveFile = image.src.includes("drive.google.com");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-200">
        {isGoogleDriveFile && fileId ? (
          <iframe
            src={`https://drive.google.com/file/d/${fileId}/preview`}
            className="w-full h-full border-0 pointer-events-none"
            allow="autoplay"
            title={image.title}
          />
        ) : (
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
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

// Carousel Modal Component
const CarouselModal = ({
  images,
  initialIndex = 0,
  onClose
}: {
  images: GalleryImage[];
  initialIndex?: number;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentImage = images[currentIndex];
  const fileId = getGoogleDriveFileId(currentImage.src);
  const isGoogleDriveFile = currentImage.src.includes("drive.google.com");

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl relative bg-card rounded-3xl p-6 overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-foreground hover:text-accent transition-colors z-10 bg-background/80 hover:bg-background rounded-full p-2"
            aria-label="Close carousel"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="relative w-full bg-gray-200 rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {isGoogleDriveFile && fileId ? (
                  <iframe
                    src={`https://drive.google.com/file/d/${fileId}/preview`}
                    className="w-full h-full border-0"
                    allow="autoplay"
                    title={currentImage.title}
                  />
                ) : (
                  <img
                    src={currentImage.src}
                    alt={currentImage.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-accent-foreground p-2 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent/90 text-accent-foreground p-2 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Image Info and Counter */}
          <div className="mt-6 text-center text-background">
            <h3 className="font-heading font-bold text-lg mb-2">{currentImage.title}</h3>
            <p className="font-body text-sm text-background/80">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentIndex ? "border-accent scale-105" : "border-background/30 opacity-60"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                >
                  {img.src.includes("drive.google.com") ? (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                      {idx + 1}
                    </div>
                  ) : (
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Gallery = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedGallery = galleries.find((g) => g.id === selectedGalleryId);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycby5knzIRCfb8eGMYgIK6O3CiuPLPp-ad3WjL4o5ec3BIvVObY3w_oBufhBJX-SHtKSS/exec",
          {
            method: "POST",
            body: JSON.stringify({
              action: "getGalleries"
            })
          }
        );

        const data = await response.json();
        console.log("Gallery data:", data);

        if (data.status === "success" && Array.isArray(data.galleries)) {
          // Group images by gallery
          const galleriesData: Gallery[] = data.galleries
            .filter((gallery: any) => gallery.status === 1)
            .map((gallery: any) => {
              const images: GalleryImage[] = (gallery.images || [])
                .filter((img: any) => img.status === 1 && img.url)
                .map((img: any) => ({
                  id: `${img.id}`,
                  src: img.url,
                  title: gallery.title,
                  category: gallery.title
                }));

              return {
                id: gallery.id,
                title: gallery.title,
                images
              };
            });

          console.log("Galleries with grouped images:", galleriesData);
          setGalleries(galleriesData);
        } else {
          // Create default galleries
          const defaultGalleries: Gallery[] = [
            {
              id: 1,
              title: "Default",
              images: defaultGalleryImages
            }
          ];
          setGalleries(defaultGalleries);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching galleries:", err);
        setError("Failed to load galleries");
        const defaultGalleries: Gallery[] = [
          {
            id: 1,
            title: "Default",
            images: defaultGalleryImages
          }
        ];
        setGalleries(defaultGalleries);
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const handleImageClick = (galleryId: number, imageIndex: number) => {
    setSelectedGalleryId(galleryId);
    setSelectedImageIndex(imageIndex);
  };

  const handleCloseCarousel = () => {
    setSelectedGalleryId(null);
    setSelectedImageIndex(0);
  };

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
          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body">Loading gallery...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 font-body">{error}</p>
              <p className="text-muted-foreground font-body mt-2">Showing default gallery images</p>
            </div>
          )}

          {!loading && galleries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery, index) => (
                <GalleryBlockCard
                  key={gallery.id}
                  gallery={gallery}
                  index={index}
                  onClick={() => handleImageClick(gallery.id, 0)}
                />
              ))}
            </div>
          )}

          {!loading && galleries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body">No galleries available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Carousel Modal */}
      {selectedGallery && selectedGallery.images.length > 0 && (
        <CarouselModal
          images={selectedGallery.images}
          initialIndex={selectedImageIndex}
          onClose={handleCloseCarousel}
        />
      )}
    </Layout>
  );
};

export default Gallery;
