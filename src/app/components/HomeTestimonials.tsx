import React from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Dwarka, Delhi',
    text: 'Within 2 days of submitting my requirement, TutorWave matched us with an excellent Maths tutor for my daughter in Class 10 CBSE. Her marks improved from 62 to 84 in one term.',
    subject: 'Mathematics · Class 10 CBSE',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_186b140f0-1764664898796.png',
    stars: 5,
  },
  {
    name: 'Rajiv Mehta',
    location: 'Noida Sector 62',
    text: 'The tutor they found for my son\'s IIT-JEE preparation is genuinely knowledgeable. The verification process gave me confidence that we were getting a qualified professional.',
    subject: 'Physics & Chemistry · IIT-JEE',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1694be8c8-1778487567939.png',
    stars: 5,
  },
  {
    name: 'Sunita Agarwal',
    location: 'Gurugram Sector 49',
    text: 'My younger one needed help with Hindi and English both. TutorWave found a single tutor who handles both subjects. Very convenient and the tutor comes on time every day.',
    subject: 'Hindi & English · Class 6 ICSE',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_152ed782c-1774873611952.png',
    stars: 5,
  },
  {
    name: 'Amit Chaudhary',
    location: 'Rohini, Delhi',
    text: 'Fast response, professional approach. The tutor they sent for NEET coaching has a strong track record. Highly recommend TutorWave to any parent in Delhi.',
    subject: 'Biology · NEET Preparation',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1760e7716-1785730607805.png',
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#F8AD03" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function HomeTestimonials() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
            Testimonials
          </span>
          <h2
            className="font-sans font-bold text-[#0D1118] leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.025em' }}
          >
            What Parents &amp; Students Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-4 ${i % 2 === 1 ? 'lg:mt-5' : ''}`}
            >
              <Stars count={t.stars} />
              <p className="text-sm text-[#374151] leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="text-[10px] font-semibold text-[#0A6FF7] bg-[#EBF4FF] px-3 py-1.5 rounded-full self-start">
                {t.subject}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E7EB]">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-[#F8FAFC]">
                  <AppImage
                    src={t.image}
                    alt={`${t.name}, parent from ${t.location}`}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0D1118]">{t.name}</div>
                  <div className="text-[10px] text-[#6B7280]">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
