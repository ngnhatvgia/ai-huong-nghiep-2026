import { GoogleGenAI, Type } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const MODEL_NAME = "gemini-3.1-pro-preview";

export interface UserProfile {
  name?: string;
  age?: string;
  grade?: string;
  favoriteSubjects?: string;
  hobbies?: string;
  strengths?: string;
  goals?: string;
  hollandScores?: Record<string, number>;
  topHollandTypes?: string[];
}

export interface CareerSuggestion {
  title: string;
  reason: string;
  skills: string[];
  income: string;
  trend: string;
}

export interface RoadmapStage {
  stage: string;
  actions: string[];
}

export interface AIAnalysisResult {
  hollandType: string;
  personalityDescription: string;
  strengths: string[];
  weaknesses: string[];
  environment: string;
  careers: CareerSuggestion[];
  roadmap: RoadmapStage[];
  advice: string;
  quote: string;
}

export const generateCareerAdvice = async (profile: UserProfile): Promise<AIAnalysisResult> => {
  const prompt = `
    Bạn là một chuyên gia tư vấn hướng nghiệp hàng đầu dành cho học sinh THPT tại Việt Nam.
    Dựa trên thông tin dưới đây, hãy phân tích và đưa ra lời khuyên nghề nghiệp chi tiết.

    THÔNG TIN HỌC SINH:
    - Tuổi: ${profile.age}
    - Lớp: ${profile.grade}
    - Môn học yêu thích: ${profile.favoriteSubjects}
    - Sở thích/Hoạt động: ${profile.hobbies}
    - Điểm mạnh tự nhận thấy: ${profile.strengths}
    - Mong muốn tương lai: ${profile.goals}
    - Kết quả trắc nghiệm Holland: ${JSON.stringify(profile.hollandScores)}
    - 2 Nhóm Holland nổi trội nhất: ${profile.topHollandTypes?.join(", ")}

    YÊU CẦU ĐẦU RA (JSON):
    Hãy trả về kết quả dưới dạng JSON tuân thủ schema sau.
    Nội dung phải bằng Tiếng Việt, giọng văn thân thiện, khích lệ, phù hợp với học sinh cấp 3.
    Dữ liệu về thu nhập và xu hướng phải thực tế với thị trường Việt Nam.
    Hãy bao gồm cả các ngành nghề hiện đại (AI, Digital, v.v.) nếu phù hợp.

    Cấu trúc JSON mong muốn:
    {
      "hollandType": "Tên 2 nhóm nổi trội (Ví dụ: Nghiệp vụ - Xã hội)",
      "personalityDescription": "Mô tả tính cách dựa trên Holland và thông tin cá nhân...",
      "strengths": ["Điểm mạnh 1", "Điểm mạnh 2", ...],
      "weaknesses": ["Điểm cần cải thiện 1", ...],
      "environment": "Môi trường làm việc phù hợp...",
      "careers": [
        {
          "title": "Tên nghề nghiệp",
          "reason": "Tại sao phù hợp...",
          "skills": ["Kỹ năng 1", "Kỹ năng 2"],
          "income": "Mức lương tham khảo (VNĐ)",
          "trend": "Xu hướng tương lai"
        }
        // 3-5 nghề
      ],
      "roadmap": [
        {
          "stage": "Giai đoạn THPT",
          "actions": ["Việc cần làm 1", "Việc cần làm 2"]
        },
        {
          "stage": "Kỹ năng cần học ngay",
          "actions": ["Kỹ năng 1", ...]
        },
        {
          "stage": "Đại học/Cao đẳng",
          "actions": ["Ngành học gợi ý 1", ...]
        }
      ],
      "advice": "Lời khuyên tâm huyết...",
      "quote": "Câu nói truyền cảm hứng..."
    }
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hollandType: { type: Type.STRING },
          personalityDescription: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          environment: { type: Type.STRING },
          careers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                reason: { type: Type.STRING },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                income: { type: Type.STRING },
                trend: { type: Type.STRING },
              },
            },
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stage: { type: Type.STRING },
                actions: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
          advice: { type: Type.STRING },
          quote: { type: Type.STRING },
        },
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  // Clean up markdown code blocks if present
  const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
  
  return JSON.parse(cleanText) as AIAnalysisResult;
};

export const chatWithCoach = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    // This is a simplified chat handler. In a real app, we'd manage the chat session more robustly.
    // For this demo, we'll just use generateContent with the history as context if needed,
    // or better, use the chat API.
    
    const chat = ai.chats.create({
        model: MODEL_NAME,
        history: history,
        config: {
            systemInstruction: "Bạn là AI Career Coach thân thiện, chuyên nghiệp. Hãy trả lời câu hỏi của học sinh ngắn gọn, súc tích, và mang tính định hướng. Giọng văn vui vẻ, emoji hợp lý."
        }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
}

export interface CareerSearchResult {
  title: string;
  description: string;
  requirements: string[];
  admissionInfo: string;
  universities: string[];
}

export const searchCareers = async (query: string): Promise<CareerSearchResult[]> => {
  const prompt = `
    Người dùng đang tìm kiếm thông tin nghề nghiệp với từ khóa: "${query}".
    Hãy đóng vai trò là một chuyên gia tư vấn hướng nghiệp tại Việt Nam.
    Tìm kiếm và trả về danh sách các ngành nghề liên quan nhất (tối đa 5 ngành).

    Với mỗi ngành nghề, hãy cung cấp:
    1. Tên ngành nghề (Tiếng Việt)
    2. Mô tả ngắn gọn về công việc.
    3. Yêu cầu công việc (kỹ năng, phẩm chất).
    4. Thông tin tuyển sinh (Khối thi phổ biến, điểm chuẩn tham khảo - ghi chung chung như "thường lấy điểm cao", "trung bình").
    5. Top 3-5 trường đại học/cao đẳng đào tạo tốt ngành này tại Việt Nam.

    YÊU CẦU ĐẦU RA (JSON):
    Trả về một mảng JSON (Array of Objects), không có markdown code block thừa.
    Schema:
    [
      {
        "title": "Tên ngành",
        "description": "Mô tả...",
        "requirements": ["Yêu cầu 1", "Yêu cầu 2"],
        "admissionInfo": "Khối A00, A01, D01...",
        "universities": ["Đại học Bách Khoa", "Đại học Kinh tế Quốc dân"]
      }
    ]
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
            admissionInfo: { type: Type.STRING },
            universities: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");

  // Clean up markdown code blocks if present
  const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();

  return JSON.parse(cleanText) as CareerSearchResult[];
};
