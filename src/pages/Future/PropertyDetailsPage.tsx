import React, { useState } from "react";


type RelatedProperty = {
  id: number;
  title: string;
  location: string;
  price: string;
  beds?: number;
  baths?: number;
  area?: string;
  image?: string;
};

const sampleRelated: RelatedProperty[] = [
  {
    id: 1,
    title: "Luxury Apartments in Thailand for Sale",
    location: "Pattaya, Thailand",
    price: "$918,000",
    beds: 2,
    baths: 2,
    area: "78 m²",
    image: "/images/Bangna.jpeg",
  },
  {
    id: 2,
    title: "Property For Sale, Johannesburg, South Africa",
    location: "Oakland, California",
    price: "$800,000",
    beds: 4,
    baths: 4,
    area: "800 m²",
    image: "/images/banner.jpeg",
  },
  {
    id: 3,
    title: "3 Beds Villa Calpe, Alicante",
    location: "Pattaya, Thailand",
    price: "$700,000",
    beds: 3,
    baths: 3,
    area: "600 m²",
    image: "/images/chiangmai.jpeg",
  },
];

export default function PropertyDetailsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroGallery />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <ProjectOverview />
            <ProjectFAQ />
            <ProjectMap />
            <ProjectVideo />
            <ProjectReview />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <ProjectContactForm />
            </div>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Properties For Sale</h3>
          <RelatedProperties items={sampleRelated} />
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Properties For Rent</h3>
          <RelatedProperties items={sampleRelated} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold">EP</div>
          <div className="font-semibold text-lg">Enlight</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a className="hover:text-gray-900">Buy</a>
          <a className="hover:text-gray-900">Rent</a>
          <a className="hover:text-gray-900">Sell</a>
          <a className="hover:text-gray-900">Projects</a>
        </nav>
        <button className="md:hidden p-2 rounded border">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

function HeroGallery() {
  return (
    <section className="bg-white rounded shadow-sm overflow-hidden">
      <div className="w-full h-56 md:h-72 lg:h-96 bg-gray-200 relative">
        {/* Big image placeholder */}
        <img src="/images/property1.jpeg" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />

        {/* small thumbnail strip */}
        <div className="absolute bottom-0 left-0 right-0 py-3 px-6">
          <div className="bg-black/70 rounded-md p-2 flex items-center gap-3 overflow-x-auto">
            {Array.from({ length: 7 }).map((_, i) => (
              <img
                key={i}
                src={`/images/property${i + 1}.jpeg`}
                alt={`thumb-${i}`}
                className="w-24 h-16 rounded object-cover border-2 border-white/40"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold">The Ville Jomtien</h1>
        <p className="text-sm text-gray-500 mt-1">Pattaya, Thailand · 270 views · Nov 18, 2019</p>
      </div>
    </section>
  );
}

function ProjectOverview() {
  return (
    <section className="bg-white mt-6 p-6 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">Status:</span> <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded ml-2 text-xs">Selling</span>
            </li>
            <li>
              <span className="font-semibold">Category:</span> Condo
            </li>
            <li>
              <span className="font-semibold">Investor:</span> Ping An
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">Number of blocks:</span> 2
            </li>
            <li>
              <span className="font-semibold">Number of floors:</span> 4
            </li>
            <li>
              <span className="font-semibold">Number of flats:</span> 125
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p>
          A profoundly special project amidst history and Istanbul. In the heart of the Historical Peninsula, Select
          Lifestyle Alternatives ranging from 1+1 to 6+1, in limited numbers... A timeless aesthetic enriched in perfect
          details.
        </p>

        <h3 className="mt-4 font-semibold">Why you should buy a house from this project?</h3>
        <ul className="list-disc list-inside mt-2 text-sm space-y-1">
          <li>Unique sea view with a historical texture of Istanbul.</li>
          <li>In the bustling city life, in the middle of all transportation possibilities.</li>
          <li>1+1 to 6+1 very special, suitable for all needs loft apartments.</li>
        </ul>
      </div>
    </section>
  );
}

function ProjectFAQ() {
  const faqs = [
    {
      q: "What steps are involved in buying a home?",
      a: "The home buying process involves several steps including getting pre-approved for a mortgage, finding a real estate agent, searching for homes, making an offer, getting a home inspection, and closing the deal.",
    },
    {
      q: "How can I increase the value of my home before selling?",
      a: "Keep the property well-maintained, update kitchens and bathrooms, improve curb appeal, and stage the home for showings.",
    },
    { q: "What should I look for in a rental property?", a: "Location, neighbourhood amenities, rental yield, and maintenance costs." },
  ];

  return (
    <section className="mt-6 bg-white p-6 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-4">FAQs</h3>
      <div className="space-y-2">
        {faqs.map((f, idx) => (
          <FAQItem {...f} key={idx} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded">
      <button className="w-full text-left px-4 py-3 flex justify-between items-center" onClick={() => setOpen(!open)}>
        <span className="font-medium">{q}</span>
        <span className="text-gray-500">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-gray-600">{a}</div>}
    </div>
  );
}

function ProjectContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  return (
    <div className="bg-white rounded shadow p-6 border">
      <h4 className="font-semibold mb-3">Contact</h4>
      <label className="text-sm text-gray-600">Name *</label>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border rounded px-3 py-2 text-sm mt-1 mb-3"
        placeholder="Johny Dane"
      />

      <label className="text-sm text-gray-600">Phone</label>
      <input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full border rounded px-3 py-2 text-sm mt-1 mb-3"
        placeholder="Ex 0123456789"
      />

      <label className="text-sm text-gray-600">Email *</label>
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border rounded px-3 py-2 text-sm mt-1 mb-3"
        placeholder="email@example.com"
      />

      <label className="text-sm text-gray-600">Message *</label>
      <textarea
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full border rounded px-3 py-2 text-sm mt-1 mb-4 h-28 resize-none"
        placeholder="Enter your message..."
      />

      <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">Send Message</button>
    </div>
  );
}

function ProjectMap() {
  return (
    <section className="mt-6 bg-white p-6 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Location</h3>
      <div className="w-full h-64 bg-[url('/your-map-placeholder.png')] bg-cover bg-center rounded border" />
      <p className="text-sm text-gray-500 mt-3">Thailand Island, Thailand</p>
    </section>
  );
}

function ProjectVideo() {
  return (
    <section className="mt-6 bg-white p-6 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Project video</h3>
      <div className="w-full aspect-video bg-black rounded overflow-hidden flex items-center justify-center">
        {/* Replace with your video or embed */}
        <video controls className="w-full h-full object-cover">
          <source src="/your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

function ProjectReview() {
  const [text, setText] = useState("");
  return (
    <section className="mt-6 bg-white p-6 rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Write a review</h3>
      <div className="flex items-center gap-2 text-amber-400 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.174L12 18.896l-7.336 3.876 1.402-8.174L.132 9.21l8.2-1.192z" />
          </svg>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm mt-1 mb-3 h-20"
        placeholder="Enter your message"
      />

      <button className="bg-gray-200 text-gray-700 px-3 py-2 rounded">Submit review</button>
    </section>
  );
}

function RelatedProperties({ items }: { items: RelatedProperty[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.id} className="bg-white rounded shadow-sm border overflow-hidden">
          <div className="w-full h-40 bg-gray-200">
            <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-sm">{it.title}</h4>
                <p className="text-xs text-gray-500">{it.location}</p>
              </div>
              <div className="text-sm font-semibold text-teal-600">{it.price}</div>
            </div>

            <div className="mt-3 text-xs text-gray-500 flex items-center gap-3">
              <div>🛏 {it.beds}</div>
              <div>🛁 {it.baths}</div>
              <div>📐 {it.area}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500">© 2025 Enlight — All rights reserved</div>
    </footer>
  );
}
