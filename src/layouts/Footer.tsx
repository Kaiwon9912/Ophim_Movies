

export default function Footer() {


  return (
    <footer className="bg-gray-900 text-white shadow-inner mt-12">

      {/* Footer note */}
      <div className="text-center text-gray-400 text-sm py-2 border-t border-gray-700">
        © {new Date().getFullYear()} PhimDex. All rights reserved.
      </div>
    </footer>
  );
}
