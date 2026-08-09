import { useState } from "react";

type Collection = {
  label: string;
  items: string[];
};

const collections: Collection[] = [
  {
    label: "Category One",
    items: ["Item One", "Item Two", "Item Three", "Item Four", "Item Five", "Item Six"],
  },
  {
    label: "Category Two",
    items: ["Item One", "Item Two", "Item Three", "Item Four", "Item Five", "Item Six"],
  },
  {
    label: "Category Three",
    items: ["Item One", "Item Two", "Item Three", "Item Four", "Item Five", "Item Six"],
  },
];

const copy = [
  {
    heading: "Form starts\nwith a line.",
    note: "A concise index of shapes, systems, and visual rules.",
    detail: "Look closely. Every decision is an invitation to see the familiar with a little more intention.",
    number: "01",
  },
  {
    heading: "Make room\nfor contrast.",
    note: "A study in balance, material, rhythm, and restraint.",
    detail: "The most direct answer is rarely the loudest. Use scale, color, and whitespace to decide what matters.",
    number: "02",
  },
  {
    heading: "Order gives\nideas a voice.",
    note: "A living collection of visual approaches and points of view.",
    detail: "A considered system can make a complex thought feel immediate, tactile, and easy to enter.",
    number: "03",
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);
  const current = copy[activeCategory];
  const selectedCollection = collections[activeCategory];

  const selectCategory = (index: number) => {
    setActiveCategory(index);
    setActiveItem(0);
  };

  return (
    <main className="explorer-shell">
      <aside className="sidebar" aria-label="Design Explorer navigation">
        <div className="brand-lockup">
          <span className="brand-kicker">A visual index</span>
          <h1>
            Design
            <br />
            Explorer
          </h1>
        </div>

        <nav className="collection-nav" aria-label="Collections">
          {collections.map((collection, collectionIndex) => {
            const isOpen = activeCategory === collectionIndex;
            return (
              <section className="collection" key={collection.label}>
                <button
                  className={`collection-trigger ${isOpen ? "is-active" : ""}`}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => selectCategory(collectionIndex)}
                >
                  <span className="collection-number">0{collectionIndex + 1}</span>
                  <span>{collection.label}</span>
                  <span className="collection-mark" aria-hidden="true">{isOpen ? "-" : "+"}</span>
                </button>

                <div className={`collection-items ${isOpen ? "is-open" : ""}`}>
                  {collection.items.map((item, itemIndex) => (
                    <button
                      className={`item-button ${isOpen && activeItem === itemIndex ? "is-selected" : ""}`}
                      type="button"
                      key={item}
                      onClick={() => {
                        setActiveCategory(collectionIndex);
                        setActiveItem(itemIndex);
                      }}
                    >
                      <span>{item}</span>
                      <span className="item-index">{String(itemIndex + 1).padStart(2, "0")}</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </nav>

        <p className="sidebar-footnote">Selected / {String(activeItem + 1).padStart(2, "0")}</p>
      </aside>

      <section className="viewer" aria-live="polite">
        <header className="viewer-header">
          <p>Design Explorer</p>
          <p>{selectedCollection.label} / {selectedCollection.items[activeItem]}</p>
        </header>

        <div className="viewer-stage" key={`${activeCategory}-${activeItem}`}>
          <div className="stage-copy">
            <p className="stage-index">Index {current.number}</p>
            <h2>{current.heading}</h2>
            <p className="stage-note">{current.note}</p>
          </div>

          <div className="graphic-composition" aria-hidden="true">
            <div className="graphic-orbit" />
            <div className="graphic-block" />
            <div className="graphic-line graphic-line-one" />
            <div className="graphic-line graphic-line-two" />
            <span className="graphic-label">{String(activeItem + 1).padStart(2, "0")}</span>
          </div>

          <p className="stage-detail">{current.detail}</p>
        </div>

        <footer className="viewer-footer">
          <p>Scroll with intention</p>
          <span className="footer-rule" />
          <p>2024 / 25</p>
        </footer>
      </section>
    </main>
  );
}