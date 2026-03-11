import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { profileData } from '../data';

interface PhotographyPageProps {
  onBack: () => void;
}

const PhotographyPage: React.FC<PhotographyPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 min-h-[80vh]">
      <div className="text-center mt-32">
        <h1 className="heading-font text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-6">
          Photogra<span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>phy.</span>
        </h1>
        <p className="mono-font text-sm md:text-base uppercase tracking-widest text-white/50 mb-12">
          Coming Soon
        </p>

        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300"
        >
          <ArrowLeft size={16} />
          <span className="mono-font text-xs uppercase tracking-wider font-bold">Back to Portfolio</span>
        </a>
      </div>
    </main>
  );
};

export default PhotographyPage;
