                    href="/tutors"
                    className="flex items-center justify-center gap-2 w-full bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3.5 rounded-xl hover:bg-[#DCEBFF] transition-colors"
                  >
                    Browse Tutors
                    <span>→</span>
                  </Link>

                </div>

                {/* =================================================
                    REQUEST CTA
                ================================================= */}

                <div className="bg-white border border-[#E5E7EB] rounded-[28px] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                    TutorWave
                  </p>

                  <h2 className="text-2xl font-bold text-[#0D1118]">
                    Interested in this tutor?
                  </h2>

                  <p className="text-sm text-[#6B7280] mt-3 leading-6">
                    Share your tuition requirement and
                    our team will help you proceed.
                  </p>

                  <a
                    href={tutorWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-4 rounded-xl hover:bg-[#0858c8] transition-colors mt-6"
                  >
                    Request This Tutor
                    <span>→</span>
                  </a>

                  <p className="text-xs text-center text-[#6B7280] mt-3">
                    No obligation to hire.
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="bg-[#F7F9FC] border-t border-[#E5E7EB] py-12 sm:py-16">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

          <p className="text-[#0A6FF7] text-sm font-bold uppercase tracking-[0.15em] mb-3">
            TutorWave
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1118]">
            Looking for the right tutor for your child?
          </h2>

          <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto leading-7">
            Tell us your child's class, subject, location
            and learning requirements. Our team will help
            you find a suitable tutor.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">

            <Link
              href="/find-a-tutor"
              className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors shadow-[0_10px_24px_rgba(10,111,247,0.25)]"
            >
              Find a Tutor
              <span>→</span>
            </Link>

            <Link
              href="/tutors"
              className="inline-flex items-center justify-center bg-white text-[#0D1118] font-bold px-7 py-3.5 rounded-xl hover:bg-[#F1F5F9] transition-colors border border-[#E5E7EB]"
            >
              Browse All Tutors
            </Link>

          </div>

        </div>

      </section>

      <Footer />

      <WhatsAppButton />

    </main>
  );
}
