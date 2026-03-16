export default function ProductCard({ item, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group p-8 bg-white rounded-xl transition-all duration-300 border
      ${
        isActive
          ? "border-black shadow-lg"
          : "border-gray-200 hover:shadow-md hover:scale-[1.03]"
      }`}
    >
      {/* Sketch Image */}
      <div className="flex justify-center mb-6">
        <img
          src={item.image}
          alt={item.name}
          className="h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>

      <p className="text-center text-sm font-medium tracking-wide group-hover:underline">
        {item.name}
      </p>

      {item.description && (
        <p className="mt-4 text-sm leading-7 text-slate-700 text-left">
          {item.description}
        </p>
      )}
    </div>
  );
}