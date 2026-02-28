import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Layout } from "@/components/layout/Layout";
import { Calendar, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import eventTournamentImg from "@/assets/event-tournament.jpg";
import eventBeltCeremonyImg from "@/assets/event-belt-ceremony.jpg";

// Extract file ID from Google Drive URL
const getGoogleDriveFileId = (url: string): string | null => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: "upcoming" | "completed";
  active: boolean;
}

const defaultImage = eventTournamentImg;

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const isCompleted = event.status === "completed";
  const fileId = getGoogleDriveFileId(event.image);
  const isGoogleDriveFile = event.image.includes("drive.google.com");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 ${
        isCompleted ? "opacity-80" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="relative lg:w-80 h-48 lg:h-auto overflow-hidden bg-gray-200">
            {isGoogleDriveFile && fileId ? (
            <embed
              src={`https://drive.google.com/file/d/${fileId}/preview`}
              className="w-full h-full"
              type="application/pdf"
              title={event.title}
            />
            ) : (
            <img
              src={event.image || defaultImage}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
              (e.target as HTMLImageElement).src = defaultImage;
              }}
            />
            )}
          {isCompleted && (
            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-background font-heading text-sm font-semibold text-foreground">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Completed
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-heading font-bold text-xl text-card-foreground">
              {event.title}
            </h3>
            {!isCompleted && (
              <span className="shrink-0 px-3 py-1 rounded-full bg-accent/20 text-accent font-heading text-xs font-semibold">
                Upcoming
              </span>
            )}
          </div>

          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {event.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {event.time}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {event.location}
            </div>
          </div>

          {!isCompleted && (
            <Button variant="default" size="sm" asChild>
              <Link to="/enquiry">
                Register Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwG5H5kPqTthMqDK-avyHl-fgoyWyCpgooTw2wVHJTNlOAfjiRsNxP8bJQyl8OTYUms/exec",
          {
            method: "POST",
            body: JSON.stringify({
              "action": "getAllEvents"
            })
          }
        );
        console.log("Response:", response);
        var curDate = new Date().toLocaleDateString()
        
        const data = await response.json();
        console.log("Data:", data);
        
        if (data.status === "error") {
          throw new Error(data.message || "API returned an error");
        }
        
        // Handle the API response - map it to Event interface
        const formattedEvents = Array.isArray(data?.events) ? data?.events.map((event: any, index: number) => ({
          id: event.id || `${index}`,
          title: event.title || "",
          description: event.description || "",
          date: new Date(event.date).toLocaleDateString() || "",
          time: new Date(event.date).toLocaleTimeString() || "",
          location: event.description || "",
          image: event.imageUrl || defaultImage,
          status: new Date(event.date).toLocaleDateString() < curDate ? "completed" : "upcoming",
          active: event.createdAt == 1
        })) : [];

        const filteredEvents = formattedEvents.filter((event) => event.status !== 0 );
        console.log(filteredEvents);
        
        
        setEvents(filteredEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const completedEvents = events.filter((e) => e.status === "completed");

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
            Events & Tournaments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-background/80 max-w-2xl mx-auto"
          >
            Stay updated with our upcoming competitions, belt ceremonies, and special workshops.
          </motion.p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body">Loading events...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 font-body">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center mb-12">
                <TabsList className="bg-secondary p-1 rounded-xl">
                  <TabsTrigger
                    value="upcoming"
                    className="px-6 py-2.5 rounded-lg font-heading font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    Upcoming ({upcomingEvents.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="px-6 py-2.5 rounded-lg font-heading font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                  >
                    Completed ({completedEvents.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upcoming" className="space-y-6">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground font-body">No upcoming events at the moment.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-6">
                {completedEvents.length > 0 ? (
                  completedEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground font-body">No completed events yet.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
