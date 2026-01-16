'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [typingText, setTypingText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', course: '' });
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Typing animation
  useEffect(() => {
    const texts = [
      'Empowering Students with Real-World Skills',
      'Building Industry-Grade Projects',
      'Get Job-Ready with Expert Training',
      'Transform Your Career with Novantix'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        setTypingText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypingText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.course) {
      setFormMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    setFormMessage({ text: '', type: '' });

    // Simulate submission - replace with your actual API
    setTimeout(() => {
      setFormMessage({ text: '✅ Enrollment submitted successfully! We will contact you soon.', type: 'success' });
      setFormData({ name: '', email: '', mobile: '', course: '' });
      setIsSubmitting(false);
      setTimeout(() => {
        setIsModalOpen(false);
        setFormMessage({ text: '', type: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Novantix Innovation Technology
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Industry-Ready Skills • Real-World Projects</p>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-sm text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#courses" className="text-sm text-gray-300 hover:text-white transition-colors">Courses</a>
              <a href="#projects" className="text-sm text-gray-300 hover:text-white transition-colors">Projects</a>
              <a href="#reviews" className="text-sm text-gray-300 hover:text-white transition-colors">Reviews</a>
              <a href="#placements" className="text-sm text-gray-300 hover:text-white transition-colors">Placements</a>
              <a href="#contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a>
              <a
                href="https://student-portal-sooty-five.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-purple-500 text-purple-400 rounded-full text-sm font-medium hover:bg-purple-500/10 transition-colors"
              >
                Student Login
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Enroll Now
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-gray-900 to-indigo-900/40"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.3) 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              {typingText}
            </span>
            <span className="animate-pulse text-purple-400">|</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Learn. Build. Get Certified. Get Job-Ready with Novantix Innovation Technology.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#courses" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105">
              Get Started
            </a>
            <a href="#courses" className="px-8 py-4 border border-gray-600 rounded-full font-semibold hover:bg-gray-800/50 transition-all">
              Explore Courses
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[
              { icon: '📚', value: '6+', label: 'Courses' },
              { icon: '👨‍🎓', value: '40+', label: 'Students' },
              { icon: '🏆', value: '100%', label: 'Practical' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            About Novantix Innovation Technology
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Novantix Innovation Technology is an innovation-driven EdTech organization focused on empowering students with practical, industry-relevant skills. We specialize in hands-on mini and major projects, professional certification, and job-oriented technical training.
          </p>
          <p className="text-gray-400">
            Our mission is to bridge the gap between academic learning and real-world industry requirements through project-based education and modern technologies.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Courses We Offer
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎓', title: 'Mini & Major Academic Projects', desc: 'College-approved projects with documentation and presentation support.', duration: 'Flexible', level: 'All Levels', levelColor: 'bg-green-900/50 text-green-300' },
              { icon: '☕', title: 'Java Programming', desc: 'Master core Java concepts and object-oriented programming fundamentals.', duration: '8 Weeks', level: 'Beginner', levelColor: 'bg-green-900/50 text-green-300' },
              { icon: '🔢', title: 'Data Structures & Algorithms', desc: 'Learn essential DSA concepts for technical interviews and problem-solving.', duration: '10 Weeks', level: 'Intermediate', levelColor: 'bg-yellow-900/50 text-yellow-300' },
              { icon: '🗄️', title: 'MySQL & Database Management', desc: 'Comprehensive database design, queries, and optimization techniques.', duration: '6 Weeks', level: 'Beginner', levelColor: 'bg-green-900/50 text-green-300' },
              { icon: '🚀', title: 'Spring Boot', desc: 'Build robust backend applications with Spring Boot and REST APIs.', duration: '12 Weeks', level: 'Advanced', levelColor: 'bg-red-900/50 text-red-300' },
              { icon: '🔄', title: 'n8n Automation', desc: 'Master workflow automation and orchestration with n8n platform.', duration: '4 Weeks', level: 'Intermediate', levelColor: 'bg-yellow-900/50 text-yellow-300' },
            ].map((course, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{course.desc}</p>
                <div className="flex gap-2 text-sm">
                  <span className="px-3 py-1 bg-gray-700 rounded-full">{course.duration}</span>
                  <span className={`px-3 py-1 rounded-full ${course.levelColor}`}>{course.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Mini & Major Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📝', title: 'Engineering Mini Projects', desc: 'Focused projects for semester requirements' },
              { icon: '🎯', title: 'Final Year Major Projects', desc: 'Comprehensive capstone projects' },
              { icon: '🏢', title: 'Real-time Industry Use Cases', desc: 'Practical, market-relevant applications' },
              { icon: '📚', title: 'Project Documentation', desc: 'Complete documentation support' },
              { icon: '🎤', title: 'Viva & Interview Guidance', desc: 'Preparation for project defense' },
              { icon: '🌐', title: 'GitHub + Deployment Support', desc: 'Version control and live deployment' },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20 rounded-2xl p-6 text-center hover:border-purple-500/40 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-full">✨ 100% Practical</span>
            <span className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-full">🎓 College-Approved</span>
            <span className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-full">🏢 Industry-Relevant</span>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section id="certification" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Professional Certification
          </h2>
          <p className="text-gray-300 mb-10">
            Students receive verified certificates from Novantix Innovation Technology upon successful completion of courses and projects.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🆔', title: 'Unique Certificate ID' },
              { icon: '📱', title: 'QR Code Verification' },
              { icon: '📋', title: 'Course / Project Details' },
              { icon: '✍️', title: 'Authorized Signatory' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-4">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="text-sm font-medium">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placements Section */}
      <section id="placements" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Placements & Career Support
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📄', title: 'Resume Building', desc: 'ATS-friendly resume creation' },
              { icon: '💼', title: 'Portfolio Development', desc: 'Showcase your best work professionally' },
              { icon: '🎭', title: 'Mock Interviews', desc: 'Practice with industry experts' },
              { icon: '🤝', title: 'Internship Assistance', desc: 'Connect with top companies' },
              { icon: '🎯', title: 'Job Opportunity Guidance', desc: 'Career path consultation' },
              { icon: '👨‍🏫', title: 'Career Mentorship', desc: 'One-on-one mentorship sessions' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-colors">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 rounded-2xl px-12 py-8">
              <div className="text-5xl font-bold text-white mb-2">40+</div>
              <div className="text-gray-300">Students Trained</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            What Our Students Say
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { avatar: '👨‍💻', name: 'Rajesh Kumar', college: 'Anna University', course: 'Full-Stack Development', review: '"The hands-on project approach helped me land my first job. The mentors are amazing and always available to help!"' },
              { avatar: '👩‍💻', name: 'Priya Sharma', college: 'VIT Chennai', course: 'Spring Boot Training', review: '"Best decision I made! The curriculum is industry-focused and the projects are real-world scenarios. Highly recommended!"' },
              { avatar: '👨‍🎓', name: 'Arun Prakash', college: 'SRM Institute', course: 'Major Project Support', review: '"Got excellent support for my final year project. Documentation, deployment, everything was covered. Scored 95+ marks!"' },
              { avatar: '👩‍🎓', name: 'Divya Menon', college: 'PSG College', course: 'DSA & Interview Prep', review: '"The DSA course and mock interviews helped me crack product-based company interviews. Thank you Novantix!"' },
              { avatar: '👨‍💼', name: 'Karthik Reddy', college: 'NIT Trichy', course: 'Java & Spring Boot', review: '"Industry-ready training with practical examples. Landed a backend developer role in 3 months. Awesome experience!"' },
              { avatar: '👩‍💼', name: 'Sneha Patel', college: 'Amrita University', course: 'Full-Stack Project', review: '"Complete project guidance from start to finish. The team is professional and supportive. Worth every penny!"' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-colors">
                <div className="text-4xl mb-4">{item.avatar}</div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-400 text-sm">{item.college}</p>
                <p className="text-purple-400 text-sm mb-3">{item.course}</p>
                <p className="text-gray-300 text-sm italic">{item.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Learning Journey with Novantix Innovation Technology
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105"
            >
              Enroll Now
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            💬 Have questions? Chat with our AI Course Advisor using the chat button below!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Novantix Innovation Technology</h3>
              <p className="text-gray-400 text-sm">Empowering students with practical, industry-relevant skills through project-based education and modern technologies.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400 text-sm mb-2">📧 Email: info@novantix.tech</p>
              <p className="text-gray-400 text-sm mb-2">📞 Phone: +91 XXX XXX XXXX</p>
              <p className="text-gray-400 text-sm">📍 Chennai, Tamil Nadu, India</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-8">
            <p>© 2026 Novantix Innovation Technology. All Rights Reserved.</p>
            <p className="mt-2">Developed by <a href="https://nspcreativehub.info" target="_blank" className="text-purple-400 hover:underline">NSP Creative Hub</a></p>
          </div>
        </div>
      </footer>

      {/* Enrollment Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Enroll in a Course</h2>
              <p className="text-gray-400 text-sm mb-6">Fill in your details and we&apos;ll get back to you soon!</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Select Course *</label>
                  <select
                    value={formData.course}
                    onChange={e => setFormData({ ...formData, course: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">-- Choose a course --</option>
                    <option value="Mini & Major Academic Projects">Mini & Major Academic Projects</option>
                    <option value="Java Programming">Java Programming</option>
                    <option value="Data Structures & Algorithms (DSA)">Data Structures & Algorithms (DSA)</option>
                    <option value="MySQL & Database Management">MySQL & Database Management</option>
                    <option value="Spring Boot">Spring Boot</option>
                    <option value="n8n Automation">n8n Automation</option>
                  </select>
                </div>

                {formMessage.text && (
                  <div className={`p-3 rounded-lg text-sm ${formMessage.type === 'error' ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                    {formMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '⏳ Submitting...' : 'Submit Enrollment'}
                </button>
              </form>
            </div>
          </div>
        )
      }
    </main >
  );
}
