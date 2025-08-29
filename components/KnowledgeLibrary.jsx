// /components/KnowledgeLibrary.jsx
"use client";

import { useMemo, useState } from "react";
import {
  Shirt,
  Scissors,
  PenTool,
  Brush,
  Palette,
  Layers,
  Ruler,
  Search,
  X,
  Tag,
  Link as LinkIcon,
  Info,
  ChevronRight,
} from "lucide-react";
import { libraryData } from "../data/libraryData";

// Map icon names in the dataset -> actual Lucide components
const ICONS = {
  Shirt,
  Scissors,
  PenTool,
  Brush,
  Palette,
  Layers,
  Ruler,
};

const TAGS_ALL = [
  "natural",
  "synthetic",
  "knit",
  "woven",
  "stretch",
  "eco",
  "recycled",
  "performance",
  "breathable",
  "insulation",
  "waterproof",
  "summer",
  "winter",
  "luxury",
  "workwear",
];

export default function KnowledgeLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTags, setActiveTags] = useState([]);
  const [selected, setSelected] = useState(null);

  const categories = useMemo(
    () => ["All", ...libraryData.map((c) => c.category)],
    []
  );

  const flatItems = useMemo(() => {
    const items = [];
    for (const cat of libraryData) {
      for (const it of cat.items) {
        items.push({ ...it, _category: cat.category, _icon: cat.icon });
      }
    }
    return items;
  }, []);

  const filtered = useMemo(() => {
    // filter by category
    let list =
      category === "All"
        ? flatItems
        : flatItems.filter((i) => i._category === category);

    // filter by tags
    if (activeTags.length) {
      list = list.filter((i) => activeTags.every((t) => i.tags?.includes(t)));
    }

    // search (title, desc, tags)
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((i) => {
        const hay = (
          i.title +
          " " +
          i.shortDesc +
          " " +
          (i.fullDesc || "") +
          " " +
          (i.tags || []).join(" ")
        ).toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [flatItems, category, activeTags, query]);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function openRelated(id) {
    const next = flatItems.find((i) => i.id === id);
    if (next) setSelected(next);
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search fabrics, trims, stitches, finishes, standards…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Category */}
        <select
          className="w-full md:w-auto px-3 py-2 rounded-xl border border-gray-300 bg-white shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-2">
        {TAGS_ALL.map((t) => (
          <button
            key={t}
            onClick={() => toggleTag(t)}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm ${
              activeTags.includes(t)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
            aria-pressed={activeTags.includes(t)}
          >
            <Tag className="h-3.5 w-3.5" />
            {t}
          </button>
        ))}
        {activeTags.length > 0 && (
          <button
            onClick={() => setActiveTags([])}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            title="Clear tags"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium">{filtered.length}</span> topics
      </p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((it) => {
          const Icon = ICONS[it._icon] || Info;
          return (
            <button
              key={it.id}
              onClick={() => setSelected(it)}
              className="text-left p-4 border rounded-2xl bg-white shadow-sm hover:shadow-md transition relative group focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-haspopup="dialog"
              aria-controls={`topic-${it.id}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold">{it.title}</p>
                  <p className="text-xs text-gray-500">{it._category}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                {it.shortDesc}
              </p>
              {it.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-1">
                  {it.tags.slice(0, 4).map((tg) => (
                    <span
                      key={tg}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
                    >
                      {tg}
                    </span>
                  ))}
                  {it.tags.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">
                      +{it.tags.length - 4}
                    </span>
                  )}
                </div>
              ) : null}
              <span className="absolute right-3 bottom-3 inline-flex items-center text-blue-700 text-sm">
                Learn more <ChevronRight className="h-4 w-4 ml-0.5" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          id={`topic-${selected.id}`}
          className="fixed inset-0 z-50"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
          />
          {/* panel */}
          <div className="absolute inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[820px] max-h-[90vh] overflow-auto bg-white rounded-t-2xl md:rounded-2xl shadow-xl">
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {(ICONS[selected._icon] || Info) && (
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                      {(() => {
                        const Icon = ICONS[selected._icon] || Info;
                        return <Icon className="h-5 w-5 text-blue-700" />;
                      })()}
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{selected.title}</h3>
                    <p className="text-xs text-gray-500">
                      {selected._category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* media */}
              {selected.image ? (
                <img
                  src={selected.image}
                  alt=""
                  className="mt-4 w-full h-48 object-cover rounded-xl bg-gray-100"
                />
              ) : null}

              {/* description */}
              <div className="prose prose-sm max-w-none mt-5">
                {selected.fullDesc?.split("\n").map((p, idx) => (
                  <p key={idx} className="text-gray-700">
                    {p.trim()}
                  </p>
                ))}

                {/* pros/cons */}
                {(selected.pros?.length || selected.cons?.length) && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {selected.pros?.length ? (
                      <div>
                        <h4 className="font-semibold">Pros</h4>
                        <ul className="list-disc ml-5 text-gray-700">
                          {selected.pros.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {selected.cons?.length ? (
                      <div>
                        <h4 className="font-semibold">Cons</h4>
                        <ul className="list-disc ml-5 text-gray-700">
                          {selected.cons.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* care */}
                {selected.care?.length ? (
                  <div className="mt-4">
                    <h4 className="font-semibold">Care & Handling</h4>
                    <ul className="list-disc ml-5 text-gray-700">
                      {selected.care.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* related */}
                {selected.related?.length ? (
                  <div className="mt-4">
                    <h4 className="font-semibold">Related Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.related.map((rid) => (
                        <button
                          key={rid}
                          onClick={() => openRelated(rid)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                          title="Open related topic"
                        >
                          <LinkIcon className="h-3.5 w-3.5" />
                          {rid}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
