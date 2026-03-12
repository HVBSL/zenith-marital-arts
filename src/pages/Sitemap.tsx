import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const sitemapLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Enquiry", path: "/enquiry" },
  { name: "Admin Login", path: "/admin/login" },
  { name: "Admin Dashboard", path: "/admin/dashboard" },
];

const Sitemap = () => {
  return (
    <Layout>
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Sitemap
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              A simple list of pages on this site.
            </p>
          </div>

          <ul className="grid gap-3 max-w-2xl">
            {sitemapLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
                >
                  {link.name}
                </Link>
                <span className="ml-2 text-sm text-muted-foreground">
                  {link.path}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Sitemap;
