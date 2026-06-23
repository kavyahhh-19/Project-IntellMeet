function HowItWorks() {
  const steps = [
    "Create or Join Meeting",
    "Collaborate in Real Time",
    "AI Generates Summary",
    "Track Action Items",
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {steps.map((step, index) => (
            <div
              key={step}
              className="bg-white rounded-3xl p-6 shadow-lg text-center"
            >
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>

              <h3 className="font-semibold">
                {step}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;