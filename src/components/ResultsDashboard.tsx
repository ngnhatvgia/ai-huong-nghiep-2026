import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ChatInterface } from './ChatInterface';
import { Briefcase, Map, Target, Quote, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';

export const ResultsDashboard = () => {
  const { analysisResult, userProfile, setStep } = useApp();

  if (!analysisResult) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-8 px-4 space-y-8"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
          Hồ sơ hướng nghiệp của bạn
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-stone-900">
          Khám phá tiềm năng <span className="text-orange-600">{userProfile.topHollandTypes?.join(" & ")}</span>
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl mx-auto italic">
          "{analysisResult.quote}"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personality & Analysis */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              Phân tích tính cách
            </h3>
            <p className="text-stone-600 leading-relaxed mb-6">
              {analysisResult.personalityDescription}
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-emerald-600 text-sm uppercase mb-2">Điểm mạnh</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.strengths.map((s, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-amber-600 text-sm uppercase mb-2">Cần cải thiện</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.weaknesses.map((w, i) => (
                    <span key={i} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-amber-600 p-6 rounded-2xl text-white shadow-lg">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Quote className="w-5 h-5" />
              Lời khuyên từ AI Coach
            </h3>
            <p className="text-orange-50 leading-relaxed">
              {analysisResult.advice}
            </p>
          </div>
        </div>

        {/* Middle Column: Career Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-orange-600" />
            Top Nghề nghiệp phù hợp
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisResult.careers.map((career, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-bold text-stone-900 mb-2">{career.title}</h4>
                <p className="text-sm text-stone-500 mb-4 line-clamp-2">{career.reason}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-stone-700">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium">Thu nhập:</span> {career.income}
                  </div>
                  <div className="flex items-center gap-2 text-stone-700">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Xu hướng:</span> {career.trend}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-50">
                  <div className="flex flex-wrap gap-1">
                    {career.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {career.skills.length > 3 && (
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">+{career.skills.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Roadmap Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mt-8">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Map className="w-5 h-5 text-orange-500" />
              Lộ trình phát triển
            </h3>
            
            <div className="relative border-l-2 border-orange-100 ml-3 space-y-8 pl-8 py-2">
              {analysisResult.roadmap.map((stage, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-orange-600 border-4 border-white shadow-sm flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full" />
                  </span>
                  <h4 className="text-lg font-bold text-stone-900 mb-3">{stage.stage}</h4>
                  <ul className="space-y-2">
                    {stage.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="mt-12">
        <ChatInterface />
      </div>

      <div className="text-center py-8">
        <button
          onClick={() => setStep(0)}
          className="text-stone-400 hover:text-stone-600 text-sm underline"
        >
          Làm lại từ đầu
        </button>
      </div>
    </motion.div>
  );
};
