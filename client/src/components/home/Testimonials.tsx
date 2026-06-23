function Testimonials() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-8">

      <h2 className="text-4xl font-bold text-center mb-12">
        What Teams Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          "IntellMeet saves us hours every week."
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          "AI summaries are incredibly accurate."
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">
          "The best meeting platform we've used."
        </div>

      </div>

    </section>
  );
}

export default Testimonials;