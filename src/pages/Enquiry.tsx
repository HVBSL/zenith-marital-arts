import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().min(10, "Please enter a valid phone number").max(20, "Phone number too long"),
  age: z.string().min(1, "Please select an age group"),
  classType: z.string().min(1, "Please select a class type"),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const Enquiry = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    toast.success("Thank you for your enquiry! We'll be in touch soon.");
    setIsSubmitted(true);
    reset();
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
            FREE Trial Classes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-background/80 max-w-2xl mx-auto"
          >
            Fill out the form below and we'll get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        Phone
                      </h3>
                      <a href="tel:+919789017717" className="text-muted-foreground hover:text-primary transition-colors">
                        +91 97890 17717, 
                      </a>
                      <a href="tel:+917825917717" className="text-muted-foreground hover:text-primary transition-colors">
                        +91 78259 17717
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <a href="mailto:ellalanmartialartsfitnessmind@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        ellalanmartialartsfitnessmind@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        Location
                      </h3>
                      <p className="text-muted-foreground">
                        Door No - 46/29, No. 3, Old, 8th St,<br /> NN Garden, Washermanpet, Chennai,<br /> Tamil Nadu 600021
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-secondary">
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Training Hours
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex justify-between">
                      <span>Monday - Saturday</span>
                      <span>5:00 AM - 10:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Sunday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-3"
              >
                {isSubmitted ? (
                  <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                      Thank You!
                    </h2>
                    <p className="font-body text-muted-foreground mb-6">
                      We've received your enquiry and will get back to you within 24 hours.
                    </p>
                    <Button variant="default" onClick={() => setIsSubmitted(false)}>
                      Submit Another Enquiry
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-card rounded-2xl p-8 shadow-soft"
                  >
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                      Enquiry Form
                    </h2>

                    <div className="space-y-6">
                      {/* Name */}
                      <div>
                        <Label htmlFor="name" className="font-heading font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="mt-2"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email & Phone */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="font-heading font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="mt-2"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="phone" className="font-heading font-medium">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (234) 567-890"
                            className="mt-2"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Age & Class Type */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="age" className="font-heading font-medium">
                            Age Group *
                          </Label>
                          <Select onValueChange={(value) => setValue("age", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select age group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5-8">5-8 years</SelectItem>
                              <SelectItem value="9-12">9-12 years</SelectItem>
                              <SelectItem value="13-17">13-17 years</SelectItem>
                              <SelectItem value="18+">18+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.age && (
                            <p className="text-destructive text-sm mt-1">{errors.age.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="classType" className="font-heading font-medium">
                            Class Type *
                          </Label>
                          <Select onValueChange={(value) => setValue("classType", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select class type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kids-karate">Kids Karate</SelectItem>
                              <SelectItem value="adult-karate">Adult Karate</SelectItem>
                              <SelectItem value="girls-self-defense">Girls Self-Defense</SelectItem>
                              <SelectItem value="private-lessons">Private Lessons</SelectItem>
                              <SelectItem value="muay-thai">Muay Thai</SelectItem>
                              <SelectItem value="MMA">MMA</SelectItem>
                              <SelectItem value="Judo">Judo</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.classType && (
                            <p className="text-destructive text-sm mt-1">{errors.classType.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message" className="font-heading font-medium">
                          Message (Optional)
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your goals or any questions you have..."
                          className="mt-2 min-h-[120px]"
                          {...register("message")}
                        />
                        {errors.message && (
                          <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Enquiry
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Enquiry;
