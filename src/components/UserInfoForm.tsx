import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ArrowRight, User, BookOpen, Heart, Target } from 'lucide-react';

export const UserInfoForm = () => {
  const { setStep, updateUserProfile, userProfile } = useApp();
  const [formData, setFormData] = useState({
    age: userProfile.age || '',
    grade: userProfile.grade || '',
    favoriteSubjects: userProfile.favoriteSubjects || '',
    hobbies: userProfile.hobbies || '',
    strengths: userProfile.strengths || '',
    goals: userProfile.goals || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setStep(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto py-8 px-4"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Bước 1: Hiểu về bạn</h2>
        <p className="text-stone-600">Hãy chia sẻ một chút về bản thân để AI có thể tư vấn chính xác nhất nhé.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-700">Bạn bao nhiêu tuổi?</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
              <input
                type="number"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="Ví dụ: 16"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-700">Bạn đang học lớp mấy?</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
              <select
                name="grade"
                required
                value={formData.grade}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
              >
                <option value="">Chọn lớp</option>
                <option value="10">Lớp 10</option>
                <option value="11">Lớp 11</option>
                <option value="12">Lớp 12</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">Môn học bạn yêu thích nhất?</label>
          <input
            type="text"
            name="favoriteSubjects"
            required
            value={formData.favoriteSubjects}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            placeholder="Ví dụ: Toán, Văn, Tiếng Anh, Tin học..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">Sở thích & Hoạt động thường ngày?</label>
          <div className="relative">
            <Heart className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
            <textarea
              name="hobbies"
              required
              value={formData.hobbies}
              onChange={handleChange}
              rows={2}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              placeholder="Ví dụ: Chơi game, đọc sách, đá bóng, nấu ăn..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">Điểm mạnh lớn nhất của bạn là gì?</label>
          <textarea
            name="strengths"
            required
            value={formData.strengths}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            placeholder="Ví dụ: Giao tiếp tốt, tư duy logic, kiên nhẫn..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">Điều bạn mong muốn nhất ở công việc tương lai?</label>
          <div className="relative">
            <Target className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
            <textarea
              name="goals"
              required
              value={formData.goals}
              onChange={handleChange}
              rows={2}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              placeholder="Ví dụ: Thu nhập cao, ổn định, được sáng tạo, giúp đỡ mọi người..."
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg font-medium py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Tiếp tục: Trắc nghiệm Holland
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};
