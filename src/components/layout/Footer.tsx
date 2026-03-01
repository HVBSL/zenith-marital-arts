import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">Bushido Dojo</h3>
                <p className="text-sm opacity-70">Martial Arts Academy</p>
              </div>
            </div>
            <p className="font-body text-sm opacity-80 leading-relaxed">
              Building strength, discipline, and confidence through the art of Karate and Self-Defense.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link to="/events" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Events
              </Link>
              <Link to="/gallery" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Gallery
              </Link>
              <Link to="/enquiry" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Enquiry
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+919789017717" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4" />
                +91 9789017717, +91 9445698017
              </a>
              <a href="mailto:ellalanmartialartsfitnessmind@gmail.com" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4" />
                ellalanmartialartsfitnessmind@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm opacity-80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  Door No - 46/29, No. 3, Old, 8th St,<br /> NN Garden, Washermanpet, Chennai,<br /> Tamil Nadu 600021</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10">
          <p className="text-center text-sm opacity-60">
            © {new Date().getFullYear()} Bushido Dojo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
