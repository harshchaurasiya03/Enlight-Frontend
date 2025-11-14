import { useParams, useNavigate } from "react-router-dom";
import { samplePosts } from "./Blog";

import Navbarx from "../../components/Navbarx";
import Footer from "../../components/Footer";

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = samplePosts.find((p) => p.id === Number(id));
  if (!post)
    return (
      <p className="text-center mt-20 text-lg text-red-600 font-semibold">
        Post not found!
      </p>
    );

  // 3 random related posts
  const otherPosts = samplePosts.filter((p) => p.id !== Number(id));
  const randomPosts = otherPosts.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <>
      <Navbarx />

      <main className="container mx-auto px-2 sm:px-6 py-16 sm:py-20">
        {/* Hero Image */}
        {/* <div className="w-full h-[60vh] lg:h-[70vh] overflow-hidden rounded-xl shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
        </div> */}

        {/* Post Title */}
        <article className="mt-10 lg:mt-16 max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
            {post.title}
          </h1>

          {/* Section 1: Introduction */}
          <p className="mt-6 text-lg text-slate-700 leading-relaxed">
            {post.details} Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Fusce vel sapien elit. In malesuada semper mi, nec lacinia
            sapien convallis ac. Pellentesque habitant morbi tristique senectus
            et netus et malesuada fames ac turpis egestas.
          </p>

          {/* Section 2: Full-width Image */}
          <div className="mt-8 w-full h-64 lg:h-96 overflow-hidden rounded-lg shadow-md">
            <img
              src={post.image}
              alt="Section visual"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Section 3: Quote / Highlight */}
          <blockquote className="mt-8 border-l-4 border-blue-500 pl-4 italic text-slate-800 text-lg">
            "Investing in property is more than buying a house — it's about
            securing your future and building wealth steadily over time."
          </blockquote>

          {/* Section 4: Detailed Paragraphs */}
          <p className="mt-8 text-lg text-slate-700 leading-relaxed">
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
            Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit
            amet ligula.
          </p>

          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in,
            elementum id enim. Vivamus suscipit tortor eget felis porttitor
            volutpat. Nulla porttitor accumsan tincidunt.
          </p>

          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            Pellentesque in ipsum id orci porta dapibus. Curabitur aliquet quam
            id dui posuere blandit. Vestibulum ac diam sit amet quam vehicula
            elementum sed sit amet dui. Donec rutrum congue leo eget malesuada.
          </p>
        </article>

        {/* Related Posts */}
        <section className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">
            You may also like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomPosts.map((p) => (
              <div
                key={p.id}
                className="cursor-pointer group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                onClick={() => navigate(`/blog/${p.id}`)}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                    {p.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
