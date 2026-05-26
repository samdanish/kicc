import { Navbar } from "../../components/shared/Navbar";
import { Footer } from "../../components/shared/Footer";

export default function PrivacyPage() {
  const effectiveDate = "May 26, 2026"; // Added current date as effective date

  return (
    <>
      <Navbar />
      <main className="pt-40 pb-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
            <h1 className="text-3xl md:text-4xl font-black text-brand-dark mb-4">Privacy Policy</h1>
            <p className="text-slate-400 font-bold mb-8">Effective Date: {effectiveDate}</p>
            
            <p className="text-slate-500 font-medium mb-8">
              Welcome to Kashmir International Career Consultancy (KICC). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you use our website and consultancy services.
            </p>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">We may collect the following information from users:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Full Name</li>
              <li>Phone Number</li>
              <li>Email Address</li>
              <li>Academic Details (12th marks, NEET score, qualifications)</li>
              <li>Preferred Course or Country for study</li>
              <li>Uploaded documents or records shared for counselling purposes</li>
              <li>WhatsApp inquiries and contact form details</li>
              <li>Device information, browser type, and IP address for website analytics</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">2. Purpose of Information Collection</h2>
            <p className="text-slate-600 mb-4">Collected information may be used to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Provide education counselling and career guidance</li>
              <li>Assist with MBBS abroad admissions and other educational programs</li>
              <li>Recommend universities, countries, and courses</li>
              <li>Contact students regarding admissions, scholarships, and updates</li>
              <li>Process applications and documentation support</li>
              <li>Improve website performance and user experience</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">3. Cookies & Analytics</h2>
            <p className="text-slate-600 mb-6">Our website may use cookies, analytics tools, and advertising technologies to understand visitor behavior and improve services. Users can disable cookies through browser settings.</p>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">4. Data Sharing</h2>
            <p className="text-slate-600 mb-4">We do not sell personal information. Information may be shared only with:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Universities or educational institutions (when required for admission processes)</li>
              <li>Admission partners involved in application processing</li>
              <li>Legal authorities if required by law</li>
            </ul>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">5. Data Security</h2>
            <p className="text-slate-600 mb-6">We take reasonable measures to protect personal information from unauthorized access, misuse, or disclosure. However, no online system is completely secure.</p>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">6. User Rights</h2>
            <p className="text-slate-600 mb-4">Users may request to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li>Access their information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of personal data</li>
              <li>Stop receiving promotional communication</li>
            </ul>
            <p className="text-slate-600 mb-6">Requests can be made using the contact details below.</p>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">7. Third-Party Links</h2>
            <p className="text-slate-600 mb-6">Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.</p>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">8. Student Privacy</h2>
            <p className="text-slate-600 mb-6">Our services are intended for students and parents seeking educational guidance. Information shared will be handled responsibly and only for consultancy purposes.</p>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">9. Changes to Privacy Policy</h2>
            <p className="text-slate-600 mb-6">We may update this Privacy Policy from time to time. Updated versions will be published on this page.</p>

            <h2 className="text-xl font-bold text-brand-dark mt-8 mb-4">10. Contact Us</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-slate-600">
              <p className="font-bold text-brand-dark mb-2">Kashmir International Career Consultancy (KICC)</p>
              <p><strong>Office:</strong> 2nd Floor, Baghat Chowk, Al Harim Complex, Near Old Cottage Inn, Baghat, Srinagar, J&K – 190005</p>
              <p><strong>Phone:</strong> +91 9622618773</p>
              <p><strong>Email:</strong>Kashmirinternational@kicc.co.in</p>
              <p><strong>Website:</strong> kicc.co.in</p>
            </div>

            <p className="text-slate-500 text-sm mt-8 italic">
              By using our website, you agree to this Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}