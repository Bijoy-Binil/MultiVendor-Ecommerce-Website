import React from 'react'

const Footer = () => {
  return (
    <footer class="bg-black rounded-lg shadow-sm dark:bg-white m-4">
        <div class="w-full max-w-screen-2xl mx-auto p-4 md:py-8">
          <div class="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-8"
                alt="Flowbite Logo"
              />
              <div className="text-white text-2xl font-bold">
                <span className="text-blue-500">Multi</span>
                <span className="text-black">Vendor</span>
              </div>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">
                  <i class="fa-brands fa-facebook ml-10 text-2xl"></i>
                  {/* You can change text-xl to text-2xl, text-3xl, etc. */}
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline me-4 md:me-6"></a>
              </li>
              <li>
                <a href="#" class="hover:underline me-4 md:me-6">
                  <i class="fa-brands fa-twitter text-2xl "></i>
                </a>
              </li>
              <li>
                <a href="#" class="hover:underline">
                  <i class="fa-brands fa-instagram text-2xl"></i>
                </a>
              </li>
            </ul>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                  {/* Footer */}
        <footer className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>

        </div>
      </footer>
  )
}

export default Footer