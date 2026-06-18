export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            © {new Date().getFullYear()} E-Commerce. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a className="hover:text-gray-900" href="#">
              Privacy
            </a>
            <a className="hover:text-gray-900" href="#">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
