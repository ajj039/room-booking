import React from "react";

const Heading = ({ title }) => {
  return (
    <section className="bg-gradient-to-r from-teal-500 to-blue-800 mb-5 shadow px-4 py-4">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
    </section>
  );
};

export default Heading;
