import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { LogOut, Plus, ChevronDown, X, Upload } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAdmin } from "@/contexts/AdminContext";

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAdmin();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("events");

  // Form state for adding new event
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modifiedEvents, setModifiedEvents] = useState<Set<string>>(new Set());
  const [selectedEventImage, setSelectedEventImage] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Check if admin is logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }

    // Fetch events
    fetchEvents();
  }, [isLoggedIn, navigate]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbypi30aqxCQL35F6KkhsYzlxPm16P4YUgHNQkDHRH7dcnZq7XmT9-D_wm8mhgL1pnk/exec"
      );
      const data = await response.json();

      const curDate = new Date().toLocaleDateString();
      const formattedEvents = Array.isArray(data?.events)
        ? data?.events.map((event: any, index: number) => ({
            id: event.id || `${index}`,
            title: event.title || event.name || "",
            description: event.description || "",
            date: new Date(event.date).toLocaleDateString() || "",
            time: new Date(event.date).toLocaleTimeString() || "",
            location: event.location || "",
            image: event.image || "",
            status:
              new Date(event.date).toLocaleDateString() < curDate
                ? "completed"
                : "upcoming",
            active: event.status == "0",
          }))
        : [];

      setEvents(formattedEvents);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching events:", err);
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image file");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const base64String = event.target?.result?.toString().split(",")[1]; // Remove data:image/jpeg;base64, prefix

        const payload = {
          title: formData.title,
          description: formData.description,
          date: formData.date,
          status: "1", // Default to active
          fileType: imageFile.type,
          imageBase64: base64String,
        };

        try {
          const response = await fetch(
            "https://script.google.com/macros/s/AKfycbxNjfkPWYSoEh1tlpsgKVcn_pGIVCG7_Dd0XgtYJ4vXEqIa62FESDs0UXd12tmdzlrF/exec",
            {
              method: "POST",
              body: JSON.stringify(payload),
            }
          );

          const result = await response.json();
          console.log("API Response:", result);

          // Add the event locally as well
          const newEvent: Event = {
            id: Date.now().toString(),
            title: formData.title,
            description: formData.description,
            date: new Date(formData.date).toLocaleDateString(),
            time: formData.time,
            location: formData.location,
            image: imagePreview || "",
            status: "upcoming",
            active: true,
          };

          setEvents([newEvent, ...events]);
          setFormData({ title: "", description: "", date: "", time: "", location: "" });
          setImageFile(null);
          setImagePreview(null);
          setIsSubmitting(false);

          alert("Event added successfully!");
        } catch (err) {
          console.error("Error uploading event:", err);
          alert("Failed to add event. Please try again.");
          setIsSubmitting(false);
        }
      };
      reader.readAsDataURL(imageFile);
    } catch (err) {
      console.error("Error processing image:", err);
      alert("Error processing image");
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, active: !event.active } : event
      )
    );
    // Mark this event as modified
    setModifiedEvents((prev) => new Set(prev).add(eventId));
  };

  const handleUpdateEvent = async (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    setIsUpdating(eventId);

    try {
      const payload = {
        id: eventId,
        status: event.active ? "0" : "1",
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzTIAs2JyfCmMilDXfNM13Ol65NH3vDymcn99gYmKW3zgBuwI3N5Vo5ZxoKny_IfzJj/exec",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("Update API Response:", result);

      // Reload events from API
      await fetchEvents();
      
      // Clear modified status
      setModifiedEvents((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });

      alert("Event updated successfully!");
      setIsUpdating(null);
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event. Please try again.");
      setIsUpdating(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearForm = () => {
    setFormData({ title: "", description: "", date: "", time: "", location: "" });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-12">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl font-bold text-background">Admin Dashboard</h1>
            <p className="text-background/80 mt-2">Manage events and tournaments</p>
          </motion.div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-background/10 hover:bg-background/20 text-background border-background/30"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-start mb-8">
              <TabsList className="bg-secondary p-1 rounded-xl">
                <TabsTrigger
                  value="events"
                  className="px-6 py-2.5 rounded-lg font-heading font-semibold"
                >
                  Manage Events
                </TabsTrigger>
                <TabsTrigger
                  value="add"
                  className="px-6 py-2.5 rounded-lg font-heading font-semibold"
                >
                  Add New Event
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Manage Events Tab */}
            <TabsContent value="events">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground font-body">Loading events...</p>
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                      <div
                        className="p-6 cursor-pointer hover:bg-secondary/30 transition-colors flex items-center justify-between relative"
                        onClick={() =>
                          setExpandedEvent(expandedEvent === event.id ? null : event.id)
                        }
                      >
                        <div className="flex-1">
                          <h3 className="font-heading font-semibold text-lg text-card-foreground">
                            {event.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                        </div>

                        {/* Image Preview - Top Right Corner */}
                        {event.image && (
                          <div
                            className="absolute top-4 right-16 w-16 h-16 rounded-lg overflow-hidden border-2 border-border cursor-pointer hover:border-primary transition-all hover:scale-110 shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEventImage(event.image);
                            }}
                          >
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform ${
                            expandedEvent === event.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {expandedEvent === event.id && (
                        <div className="px-6 py-4 bg-secondary/20 border-t border-border space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-heading font-semibold text-card-foreground mb-1">
                                Date
                              </p>
                              <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                            <div>
                              <p className="text-sm font-heading font-semibold text-card-foreground mb-1">
                                Time
                              </p>
                              <p className="text-sm text-muted-foreground">{event.time}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-heading font-semibold text-card-foreground mb-1">
                              Description
                            </p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>

                          {/* Status Toggle */}
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div>
                              <p className="font-heading font-semibold text-card-foreground">
                                Active Status
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Toggle to {event.active ? "deactivate" : "activate"} this event
                              </p>
                            </div>
                            <Switch
                              checked={event.active}
                              onCheckedChange={() => handleToggleStatus(event.id)}
                              className="h-6 w-11"
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              size="sm"
                              onClick={() => handleUpdateEvent(event.id)}
                              className="flex-1"
                              disabled={!modifiedEvents.has(event.id) || isUpdating === event.id}
                            >
                              {isUpdating === event.id ? (
                                "Updating..."
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 mr-2" />
                                  {modifiedEvents.has(event.id) ? "Update Event" : "No Changes"}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground font-body">No events found.</p>
                </div>
              )}
            </TabsContent>

            {/* Add New Event Tab */}
            <TabsContent value="add">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8">
                  <form onSubmit={handleAddEvent} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-heading font-semibold text-card-foreground">
                          Event Title *
                        </label>
                        <Input
                          type="text"
                          name="title"
                          placeholder="e.g., Spring Championship 2025"
                          value={formData.title}
                          onChange={handleFormChange}
                          required
                          className="py-2.5"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-heading font-semibold text-card-foreground">
                          Location *
                        </label>
                        <Input
                          type="text"
                          name="location"
                          placeholder="e.g., City Arena"
                          value={formData.location}
                          onChange={handleFormChange}
                          required
                          className="py-2.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-heading font-semibold text-card-foreground">
                          Date *
                        </label>
                        <Input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleFormChange}
                          required
                          className="py-2.5"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-heading font-semibold text-card-foreground">
                          Time *
                        </label>
                        <Input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleFormChange}
                          required
                          className="py-2.5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-heading font-semibold text-card-foreground">
                        Event Image *
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="block w-full text-sm text-muted-foreground
                          file:mr-4 file:py-2.5 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-heading file:font-semibold
                          file:bg-primary file:text-primary-foreground
                          hover:file:bg-primary/90 cursor-pointer"
                      />
                      {imagePreview && (
                        <div className="mt-4">
                          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {imageFile?.name}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-heading font-semibold text-card-foreground">
                        Description *
                      </label>
                      <Textarea
                        name="description"
                        placeholder="Enter event description..."
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                        rows={5}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Adding Event..."
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Event
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={handleClearForm}
                        disabled={isSubmitting}
                      >
                        Clear
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Image Maximize Modal */}
          <Dialog open={!!selectedEventImage} onOpenChange={(open) => !open && setSelectedEventImage(null)}>
            <DialogContent className="max-w-3xl p-0">
              <div className="relative w-full bg-background rounded-lg overflow-hidden">
                <button
                  onClick={() => setSelectedEventImage(null)}
                  className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5 text-card-foreground" />
                </button>
                {selectedEventImage && (
                  <img
                    src={selectedEventImage}
                    alt="Event"
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
