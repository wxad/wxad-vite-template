import clsx from 'clsx';
import Header from '@/components/Header';
import { useStore } from '@/stores';
import { useRef } from 'react';
import { preload } from 'react-dom';

const TechItem = ({ tech }: { tech: string }) => {
  // preload resources https://react.dev/blog/2024/12/05/react-19#support-for-preloading-resources
  preload('https://wxa.wxs.qq.com/wxad-design/fonts/gilroy-semibold-webfont.ttf', { as: 'font' });
  return (
    <div className="flex items-center px-2 h-7 bg-neutral-100 rounded-md font-[gilroysemibold]">
      {tech}
    </div>
  );
};

function App() {
  const techs = useStore((s) => s.techs);
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={clsx('min-h-screen', 'bg-neutral-100', 'border-x border-solid border-neutral-200')}
    >
      {/* ref as prop https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop */}
      <Header ref={headerRef} />
      <div className="px-6 pb-8">
        {Object.entries(techs).map(([key, value]) => (
          <div key={key} className="mt-8">
            <div className="mb-3 text-base font-semibold">{key}</div>
            <div className="p-5 bg-white rounded-lg">
              <div className="grid grid-cols-2 gap-y-3">
                {Object.entries(value).map(([k, val]) => (
                  <div key={k}>
                    <div className="mb-1 text-sm font-medium">{k}</div>
                    <div className="flex flex-wrap gap-1 text-xs text-neutral-800">
                      {val.map((tech) => (
                        <TechItem key={tech} tech={tech} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
