
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Skill } from '../types';

interface SkillChartProps {
  skills: Skill[];
}

const SkillChart: React.FC<SkillChartProps> = ({ skills }) => {
  const data = skills.slice(0, 6).map(s => ({
    subject: s.name,
    A: s.level,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333333" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#888888', fontSize: 9, fontWeight: 500, fontFamily: 'JetBrains Mono' }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#ffffff"
            strokeWidth={1}
            fill="#ffffff"
            fillOpacity={0.05}
            animationDuration={2000}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
