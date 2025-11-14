import { useNavigate } from "react-router-dom";
import Navbarx from "../../components/Navbarx";
import Footer from "../../components/Footer";

export type Post = {
  id: number;
  title: string;
  details: string;
  image: string;
};

// Replace these paths with your actual images in public/images/
export const samplePosts: Post[] = [
  { id: 1, title: "Modern Family Home", details: "A beautiful 3BHK house...", image: "/images/property1.jpeg" },
  { id: 2, title: "Luxury Apartment", details: "Spacious 2BHK apartment with a stunning city view.", image: "/images/property15.jpeg" },
  { id: 3, title: "Cozy Cottage", details: "A charming cottage in a quiet neighborhood.", image: "/images/property19.jpeg" },
  { id: 4, title: "Downtown Studio", details: "Compact studio apartment near metro station.", image: "/images/property2.jpeg" },
  { id: 5, title: "Beachside Villa", details: "4-bedroom villa right on the beach.", image: "/images/property22.jpeg" },
  { id: 6, title: "Urban Penthouse", details: "Modern penthouse with rooftop terrace.", image: "/images/property8.jpeg" },
  { id: 7, title: "Suburban House", details: "Peaceful 3-bedroom home in suburb.", image: "/images/property13.jpeg" },
  { id: 8, title: "Countryside Retreat", details: "Rustic home surrounded by nature.", image: "/images/property9.jpeg" },
  { id: 9, title: "Minimalist Loft", details: "Stylish loft apartment for modern living.", image: "/images/property9.jpeg" },
  { id: 10, title: "Historic Mansion", details: "Beautifully preserved mansion with charm.", image: "/images/property21.jpeg" },
  { id: 11, title: "Garden Villa", details: "Luxurious villa with lush gardens.", image: "/images/property25.jpeg" },
  { id: 12, title: "City Apartment", details: "Modern 1BHK apartment in city center.", image: "/images/property15.jpeg" },
];

// 🔹 Single blog card
function PhotoCard({ post }: { post: Post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
  <article
  className="group cursor-pointer bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative z-10"
  onClick={handleClick}
>
  <div className="relative w-full h-72">
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>
  <div className="p-4">
    <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
    <p className="mt-2 text-sm text-slate-600 line-clamp-3">{post.details}</p>
  </div>
</article>

  );
}

// 🔹 Blog-style grid front page
export default function PhotoCardGrid({ posts = samplePosts }: { posts?: Post[] }) {
  return (
    <>
      <Navbarx />
      <section className="container mx-auto px-4 sm:px-6 py-16 mt-20">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Properties Blogs</h2>
          <p className="mt-2 text-sm text-slate-600">
            Explore latest investments, builder updates, and location insights.
          </p>
        </header>

        {/* Grid: 3 cards per row, 4 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 12).map((post) => (
            <PhotoCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
