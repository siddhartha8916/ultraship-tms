export const HomePage = () => {
  return (
    <div className="h-full flex flex-col">
      <section className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to EmployeeHub 🚀</h2>
          <p className="text-lg mb-6">
            Manage your employees and users with ease using a powerful GraphQL
            backend.
          </p>
          <p className="text-sm">
            Created by{" "}
            <span className="font-semibold text-white">Siddhartha Kumar</span>{" "}
            💻
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Explore Dashboard
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl mb-4">👨‍💼</div>
            <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
            <p className="text-gray-600">
              Add, update, and organize employee records efficiently.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl mb-4">🧑‍💻</div>
            <h3 className="text-xl font-semibold mb-2">User Access</h3>
            <p className="text-gray-600">
              Handle user roles and permissions seamlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">GraphQL API</h3>
            <p className="text-gray-600">
              Query just the data you need, fast and flexibly.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm mt-auto">
        © 2025 Siddhartha Kumar. All rights reserved.
      </footer>
    </div>
  );
};
