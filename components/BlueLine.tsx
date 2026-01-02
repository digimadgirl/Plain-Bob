
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { METHOD_GRID } from '../constants';

const BlueLine: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedBell, setSelectedBell] = useState<number>(2);

  const bells = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 40, right: 120, bottom: 40, left: 60 };
    const width = 320 - margin.left - margin.right;
    const height = 1400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([1, 5]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, METHOD_GRID.length - 1]).range([0, height]);

    // Grid lines (horizontal for rows)
    svg.selectAll('.grid-row')
      .data(METHOD_GRID)
      .enter()
      .append('line')
      .attr('class', 'grid-line stroke-slate-100')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d, i) => yScale(i))
      .attr('y2', (d, i) => yScale(i));

    // Place lines (vertical)
    svg.selectAll('.grid-place')
      .data([1, 2, 3, 4, 5])
      .enter()
      .append('line')
      .attr('class', 'grid-line stroke-slate-100')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', 0)
      .attr('y2', height);

    // Render paths for all bells
    bells.forEach(bellNum => {
      const isSelected = bellNum === selectedBell;
      const isTreble = bellNum === 1;

      const lineGenerator = d3.line<number[]>()
        .x((d) => xScale(d.indexOf(bellNum) + 1))
        .y((d, i) => yScale(i))
        .curve(d3.curveLinear);

      const path = svg.append('path')
        .datum(METHOD_GRID)
        .attr('d', lineGenerator)
        .attr('fill', 'none');

      if (isSelected) {
        path.attr('stroke', isTreble ? '#ef4444' : '#2563eb')
            .attr('stroke-width', 5)
            .attr('stroke-linecap', 'round');
            
        // Dots on the selected path for emphasis
        svg.selectAll(`.bell-dot-${bellNum}`)
          .data(METHOD_GRID)
          .enter()
          .append('circle')
          .attr('cx', d => xScale(d.indexOf(bellNum) + 1))
          .attr('cy', (d, i) => yScale(i))
          .attr('r', 3)
          .attr('class', isTreble ? 'fill-red-800' : 'fill-blue-800');
      } else {
        path.attr('stroke', isTreble ? '#ef4444' : '#cbd5e1')
            .attr('stroke-width', 1.5)
            .attr('opacity', isTreble ? 0.7 : 0.3);
      }
    });

    // Lead End Labels and Dividers
    const leadEnds = [10, 20, 30, 40];
    leadEnds.forEach((rowIdx, i) => {
      svg.append('line')
         .attr('x1', -20)
         .attr('x2', width + 20)
         .attr('y1', yScale(rowIdx))
         .attr('y2', yScale(rowIdx))
         .attr('stroke', '#94a3b8')
         .attr('stroke-width', 2)
         .attr('stroke-dasharray', '4,4');

      svg.append('text')
         .attr('x', width + 25)
         .attr('y', yScale(rowIdx))
         .attr('dominant-baseline', 'middle')
         .attr('class', 'text-[10px] fill-slate-500 font-black uppercase tracking-widest')
         .text(`Lead ${i + 1} End`);
         
      // Place bell identifiers at the lead end
      const row = METHOD_GRID[rowIdx];
      row.forEach((bellAtPlace, placeZeroIdx) => {
        if (bellAtPlace > 1) { // Only working bells
            svg.append('text')
               .attr('x', xScale(placeZeroIdx + 1))
               .attr('y', yScale(rowIdx) + 12)
               .attr('text-anchor', 'middle')
               .attr('class', 'text-[8px] fill-slate-400 font-bold')
               .text(`${placeZeroIdx + 1}pb`);
        }
      });
    });

    // Start label
    svg.append('text')
       .attr('x', xScale(selectedBell))
       .attr('y', -15)
       .attr('text-anchor', 'middle')
       .attr('class', 'text-[10px] fill-slate-900 font-black uppercase')
       .text('Start');

  }, [selectedBell]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col items-center">
      <div className="w-full mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">Interactive Method Explorer</label>
            <h3 className="text-xl font-bold text-slate-900">The Blue Line Path</h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Bell</span>
            <div className="text-2xl font-black text-blue-600">Bell {selectedBell}</div>
          </div>
        </div>
        <select 
          value={selectedBell}
          onChange={(e) => setSelectedBell(parseInt(e.target.value))}
          className="w-full bg-slate-100 border-2 border-slate-200 rounded-2xl px-5 py-4 text-base font-black text-slate-700 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.25rem' }}
        >
          <option value={1}>1 (The Treble - Plain Hunt)</option>
          <option value={2}>2 (The 2nds Place Bell)</option>
          <option value={3}>3 (The 3rds Place Bell)</option>
          <option value={4}>4 (The 4ths Place Bell)</option>
          <option value={5}>5 (The 5ths Place Bell)</option>
        </select>
      </div>
      <div className="bg-slate-50 rounded-[2rem] p-6 flex justify-center w-full max-h-[700px] overflow-y-auto border border-slate-200/50 shadow-inner scrollbar-hide">
        <svg ref={svgRef} className="drop-shadow-sm"></svg>
      </div>
      <p className="mt-6 text-xs text-slate-400 text-center font-medium max-w-xs">
        Scroll down to follow the path through all 4 leads of the plain course.
      </p>
    </div>
  );
};

export default BlueLine;
