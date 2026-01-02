
import React from 'react';
import { RESOURCES } from '../constants';

const ResourceHub: React.FC = () => {
  return (
    <div className="bg-slate-100 rounded-2xl p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Resource Library</h2>
        <p className="text-slate-600 mb-10">A curated collection of the best guides and PDFs from around the bell ringing world.</p>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {RESOURCES.map((res) => (
            <a
              key={res.id}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:translate-x-1 transition-all group flex items-start gap-4"
            >
              <div className={`p-2 rounded-lg ${
                res.category === 'PDF' ? 'bg-red-50 text-red-600' : 
                res.category === 'Interactive' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {res.category === 'PDF' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {res.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{res.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceHub;
