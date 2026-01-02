
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { METHOD_GRID } from '../constants';

const BlueLine: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG content to handle re-renders correctly
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 30, right: 60, bottom: 40, left: 40 };
    // Make the diagram tall enough to fit all 40 rows comfortably
    const width = 240 - margin.left - margin.right;
    const height = 900 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([1, 5]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, METHOD_GRID.length - 1]).range([0, height]);

    // Grid lines for rows
    svg.selectAll('.grid-row')
      .data(METHOD_GRID)
      .enter()
      .append('line')
      .attr('class', 'grid-line stroke-slate-100')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d, i) => yScale(i))
      .attr('y2', (d, i) => yScale(i));

    // Grid lines for places
    svg.selectAll('.grid-place')
      .data([1, 2, 3, 4, 5])
      .enter()
      .append('line')
      .attr('class', 'grid-line stroke-slate-100')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', 0)
      .attr('y2', height);

    // Labels for places (1 2 3 4 5) at top
    svg.selectAll('.place-label-top')
      .data([1, 2, 3, 4, 5])
      .enter()
      .append('text')
      .attr('x', d => xScale(d))
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-[10px] font-bold fill-slate-400')
      .text(d => d);

    // The Treble (Bell 1) - Red Path
    const trebleLine = d3.line<number[]>()
      .x((d) => xScale(d.indexOf(1) + 1))
      .y((d, i) => yScale(i))
      .curve(d3.curveLinear);

    svg.append('path')
      .datum(METHOD_GRID)
      .attr('d', trebleLine)
      .attr('fill', 'none')
      .attr('stroke', '#ef4444')
      .attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '3,2')
      .attr('opacity', 0.6);

    // The Blue Line (Bell 2)
    const bell2Line = d3.line<number[]>()
      .x((d) => xScale(d.indexOf(2) + 1))
      .y((d, i) => yScale(i))
      .curve(d3.curveLinear);

    svg.append('path')
      .datum(METHOD_GRID)
      .attr('d', bell2Line)
      .attr('fill', 'none')
      .attr('stroke', '#2563eb')
      .attr('stroke-width', 3);

    // Dots for Bell 2
    svg.selectAll('.bell-dot')
      .data(METHOD_GRID)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.indexOf(2) + 1))
      .attr('cy', (d, i) => yScale(i))
      .attr('r', 2)
      .attr('class', 'fill-blue-800');

    // Highlight labels for Lead Ends every 10 rows
    const leadEnds = [9, 19, 29, 39];
    leadEnds.forEach((idx, i) => {
       // Horizontal line at lead end
       svg.append('line')
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', yScale(idx + 1))
          .attr('y2', yScale(idx + 1))
          .attr('stroke', '#cbd5e1')
          .attr('stroke-width', 1.5);

       svg.append('text')
          .attr('x', width + 8)
          .attr('y', yScale(idx + 1))
          .attr('dominant-baseline', 'middle')
          .attr('class', 'text-[9px] fill-red-600 font-bold uppercase tracking-tighter')
          .text(`End Lead ${i + 1}`);
    });

    // Start/End rounds marking
    svg.append('text')
      .attr('x', -8)
      .attr('y', yScale(0))
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('class', 'text-[9px] font-bold fill-slate-400 uppercase')
      .text('Start');

    svg.append('text')
      .attr('x', -8)
      .attr('y', yScale(METHOD_GRID.length - 1))
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('class', 'text-[9px] font-bold fill-slate-400 uppercase')
      .text('Course');

  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold">The Full Plain Course</h3>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Bell 2 Path (40 Rows)</p>
      </div>
      
      <div className="bg-slate-50/50 rounded-lg p-2 flex justify-center w-full max-h-[800px] overflow-y-auto scrollbar-thin">
        <svg ref={svgRef} className="max-w-full h-auto"></svg>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-tight text-slate-500">
        <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-blue-600"></span>
            <span>Blue Line (Bell 2)</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-b border-dashed border-red-500"></span>
            <span>Treble Path</span>
        </div>
      </div>
    </div>
  );
};

export default BlueLine;
