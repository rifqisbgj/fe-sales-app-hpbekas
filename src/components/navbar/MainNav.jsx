import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

export default function MainNav() {
  return (
    <>
      <nav class="bg-white flex justify-between items-center z-50 w-full fixed py-5 px-5 shadow-md">
        <div class="flex items-center">
          <i class="fa-solid fa-bars"></i>
          <p class="invisible md:visible md:text-xl font-bold">BagjaCell</p>
        </div>
        {/* w-[400px] border border-gray-500 rounded flex items-center space-x-5 */}
        <div className="relative w-[600px] mt-1 shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full h-8 border-gray-300 rounded py-4 pl-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Cari di Bagja Cell"
          />
        </div>
        <div class="flex items-center space-x-5 text-base">
          <i class="fa-solid fa-user"></i>
          <h2 class="border border-gray-500 text-gray-300 rounded py-1 px-5">
            User name
          </h2>
        </div>
      </nav>
    </>
  );
}
