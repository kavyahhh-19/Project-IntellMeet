import { motion } from "framer-motion";

import Navbar from "../components/common/Navbar";

import TrustedCompanies from "../components/home/TrustedCompanies";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";

import {
  FiFileText,
  FiCheckSquare,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <section
        className="
        min-h-screen
        flex
        items-center
        bg-gradient-to-br
        from-slate-50
        via-blue-50
        to-indigo-100
        "
      >
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span
              className="
              bg-blue-100
              text-blue-700
              px-4
              py-2
              rounded-full
              w-fit
              font-medium
              "
            >
              AI Powered Collaboration Platform
            </span>

            <h1
              className="
              text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              mt-6
              leading-tight
              "
            >
              Smarter Meetings

              <br />

              <span
                className="
                bg-gradient-to-r
                from-blue-600
                via-indigo-600
                to-purple-600
                bg-clip-text
                text-transparent
                "
              >
                Powered by AI
              </span>
            </h1>

            <p
              className="
              text-gray-600
              text-xl
              mt-6
              max-w-xl
              "
            >
              Generate AI summaries, extract action items,
              collaborate in real time and transform
              productivity with IntellMeet.
            </p>

            <div className="flex gap-4 mt-10 flex-wrap">

              <button
                className="
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                text-white
                px-8
                py-4
                rounded-xl
                font-semibold
                shadow-lg
                hover:scale-105
                transition
                "
              >
                Start Free
              </button>

              <button
                className="
                bg-white
                border
                border-gray-300
                px-8
                py-4
                rounded-xl
                font-semibold
                hover:shadow-md
                transition
                "
              >
                Watch Demo
              </button>

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center"
          >
            <div
              className="
              bg-white
              rounded-3xl
              shadow-2xl
              p-8
              w-full
              max-w-xl
              border
              border-gray-100
              "
            >
              <div className="mb-6">

                <h3 className="text-2xl font-bold">
                  Meeting Intelligence
                </h3>

                <p className="text-gray-500 mt-2">
                  Real-time AI insights and collaboration analytics
                </p>

              </div>

              <div className="space-y-4">

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  bg-blue-50
                  border
                  border-blue-100
                  p-4
                  rounded-2xl
                  "
                >
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <FiFileText
                      size={24}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-700">
                      AI Summary Generated
                    </h4>

                    <p className="text-sm text-gray-600">
                      Key insights extracted automatically
                    </p>
                  </div>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  bg-green-50
                  border
                  border-green-100
                  p-4
                  rounded-2xl
                  "
                >
                  <div className="bg-green-100 p-3 rounded-xl">
                    <FiCheckSquare
                      size={24}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-700">
                      12 Action Items Detected
                    </h4>

                    <p className="text-sm text-gray-600">
                      Tasks assigned automatically
                    </p>
                  </div>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  bg-purple-50
                  border
                  border-purple-100
                  p-4
                  rounded-2xl
                  "
                >
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <FiTrendingUp
                      size={24}
                      className="text-purple-600"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-purple-700">
                      Productivity +24%
                    </h4>

                    <p className="text-sm text-gray-600">
                      Improved team efficiency this month
                    </p>
                  </div>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-4
                  bg-orange-50
                  border
                  border-orange-100
                  p-4
                  rounded-2xl
                  "
                >
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <FiUsers
                      size={24}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-700">
                      18 Active Members
                    </h4>

                    <p className="text-sm text-gray-600">
                      Collaborating across projects
                    </p>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-600">
                    500+
                  </h3>

                  <p className="text-sm text-gray-500">
                    Meetings
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-indigo-600">
                    98%
                  </h3>

                  <p className="text-sm text-gray-500">
                    Accuracy
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-600">
                    24/7
                  </h3>

                  <p className="text-sm text-gray-500">
                    AI Support
                  </p>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      <TrustedCompanies />

      <FeaturesSection />

      <HowItWorks />

      <Testimonials />

      <CTASection />

      {/* Footer */}

      <footer className="bg-slate-950 text-white py-14">

        <div className="max-w-7xl mx-auto px-8">

          <div className="flex flex-col md:flex-row justify-between items-center">

            <div>

              <h2 className="text-3xl font-bold">
                IntellMeet
              </h2>

              <p className="text-gray-400 mt-2">
                AI Powered Enterprise Meeting Platform
              </p>

            </div>

            <div className="flex gap-8 mt-8 md:mt-0">

              <a href="#" className="hover:text-blue-400">
                Features
              </a>

              <a href="#" className="hover:text-blue-400">
                Pricing
              </a>

              <a href="#" className="hover:text-blue-400">
                Contact
              </a>

              <a href="#" className="hover:text-blue-400">
                Privacy
              </a>

            </div>

          </div>

        </div>

      </footer>
    </>
  );
}

export default Home;