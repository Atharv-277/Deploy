import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";

export default function ProductSection({ section, items, isAdmin = false, onProductContentSaved }) {
  const [activeProduct, setActiveProduct] = useState(items?.[0]?.name || null);
  const selectedProduct = items?.find((item) => item.name === activeProduct) || null;

  // Update active product when items change (e.g., switching tabs)
  useEffect(() => {
    if (items && items.length > 0) {
      setActiveProduct(items[0].name);
    }
  }, [items]);

  return (
    <>
      {/* Sketch Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10">
        {items?.map((item, index) => (
          <ProductCard
            key={index}
            item={item}
            isActive={activeProduct === item.name}
            onClick={() => setActiveProduct(item.name)}
          />
        ))}
      </div>

      {/* Detail Panel */}
      {activeProduct && (
        <ProductDetails
          section={section}
          product={selectedProduct}
          title={selectedProduct?.name || activeProduct}
          heroImage={selectedProduct?.heroImage || selectedProduct?.image}
          lineupItems={items}
          onSelectLineupItem={setActiveProduct}
          isAdmin={isAdmin}
          onProductContentSaved={onProductContentSaved}
        />
      )}
    </>
  );
}