import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { samplePosts, Post } from "./Blog";

import Navbarx from "../../components/Navbarx"
import Footer from "../../components/Footer";

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = samplePosts.find((p) => p.id === Number(id));
  if (!post)
    return <p className="text-center mt-20 text-lg">Post not found!</p>;

  // 2 random other posts
  const otherPosts = samplePosts.filter((p) => p.id !== Number(id));
  const randomPosts = otherPosts.sort(() => 0.2 - Math.random()).slice(0, 3);

  return (
    <>
   <Navbarx/>
    <div className="container px-4 sm:px-6 py-16 mx-auto sm:py-12 mt-20">
      {/* Main Post */}
      <div className="w-full h-[50vh] lg:h-[60vh] overflow-hidden rounded-lg shadow-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-4xl lg:text-5xl font-bold mt-8 text-slate-900">
        {post.title}
      </h1>

      <p className="mt-4 text-lg text-slate-700 leading-relaxed">
        {post.details}
      </p>

      <p className="mt-4 text-lg text-slate-700 leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non enim libero
        dolores illo porro vitae iusto amet quae expedita! Tempore quod
        provident repudiandae, quae dolorum error numquam magni inventore
        reiciendis! Laboriosam quam incidunt nobis eaque id tempora perspiciatis
        et temporibus, odio animi officiis culpa possimus consequuntur iusto eum
        omnis suscipit. Aut distinctio eaque soluta corrupti aliquid nesciunt
        voluptate nobis voluptatibus. Dolorem odio fuga voluptas tenetur
        possimus, rerum id fugiat molestiae. Incidunt tempora praesentium
        explicabo consequuntur ut esse in ipsa. Quidem ad esse corporis cumque
        in iste placeat consequuntur eligendi deleniti. Doloremque dolor,
        obcaecati amet iste atque cupiditate. Eveniet quas iure numquam sapiente
        aspernatur laborum dignissimos ut, fuga quo dolorum praesentium quod
        modi doloribus consectetur minus quidem rem aliquid vel illo! Cum natus
        autem distinctio suscipit ratione libero repudiandae aperiam expedita
        fugiat dolorum atque, eligendi reiciendis temporibus sapiente excepturi?
        Modi, eveniet. Esse officiis molestiae sed minima natus totam nisi.
        Vitae, excepturi!
      </p>

      {/* Random Posts */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">You may also like</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

          {randomPosts.map((p) => (
            <div
              key={p.id}
              className="cursor-pointer rounded-lg shadow-md overflow-hidden"
              onClick={() => navigate(`/blog/${p.id}`)}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {p.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
     </>
  );
}
