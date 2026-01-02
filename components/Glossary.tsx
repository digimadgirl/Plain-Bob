
import React, { useState } from 'react';
import { GLOSSARY } from '../constants';

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = GLOSSARY.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Glossary of Terms</h2>
          <p className="text-slate-500">Essential terminology for the budding ringer.</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGlossary.map((item) => (
          <div key={item.term} className="group p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-600 mb-2 group-hover:scale-105 origin-left transition-transform">
              {item.term}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
        {filteredGlossary.length === 0 && (
          <div className="col-span-full py-10 text-center text-slate-400 italic">
            No terms found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;
