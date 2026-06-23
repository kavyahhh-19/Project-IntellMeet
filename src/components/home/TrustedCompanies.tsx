function TrustedCompanies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Netflix",
    "Spotify",
  ];

  return (
    <section className="py-16">
      <h2 className="text-center text-gray-500 font-medium mb-8">
        Trusted by innovative teams worldwide
      </h2>

      <div className="flex flex-wrap justify-center gap-10 text-2xl font-bold text-gray-400">
        {companies.map((company) => (
          <span key={company}>{company}</span>
        ))}
      </div>
    </section>
  );
}

export default TrustedCompanies;