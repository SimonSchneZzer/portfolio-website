import React, { useEffect, useRef } from 'react';
import cloud from 'd3-cloud';
import * as d3 from 'd3';

// words: [{ text, value }], options: { fontSizes, fontFamily, colors, padding }
export default function D3WordCloud({ words, options }) {
  const svgRef = useRef(null);
  const width = 400;
  const height = 300;

  useEffect(() => {
    if (!words || words.length === 0) return;
    // d3-cloud expects [{text, size}]
    const fontSizes = options?.fontSizes || [14, 64];
    const min = Math.min(...words.map(w => w.value));
    const max = Math.max(...words.map(w => w.value));
    const scale = (val) => {
      if (max === min) return fontSizes[0];
      return fontSizes[0] + ((val - min) / (max - min)) * (fontSizes[1] - fontSizes[0]);
    };
    const layout = cloud()
      .size([width, height])
      .words(words.map(w => ({ text: w.text, size: scale(w.value) })))
      .padding(options?.padding ?? 20)
      .rotate(() => 0)
      .font(options?.fontFamily || 'Source Code Pro')
      .fontSize(d => d.size)
      .on('end', draw);
    layout.start();

    function draw(words) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      svg
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter().append('text')
        .style('font-family', options?.fontFamily || 'Source Code Pro')
        .style('font-size', d => `${d.size}px`)
        .style('fill', (d, i) => options?.colors?.[i % options.colors.length] || '#fff')
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }, [words, options]);

  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />;
} 