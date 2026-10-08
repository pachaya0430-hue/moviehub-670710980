import { useState } from 'react';

export default function ReviewForm({ onSubmit, isSubmitting }) {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  // เงื่อนไข: ข้อความต้องมีอย่างน้อย 10 ตัวอักษร
  const isValid = text.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setError(null);
    try {
      await onSubmit(text);
      setText(''); // 👈 ล้างช่องพิมพ์เมื่อส่งสำเร็จ (แก้ข้อที่เคลียร์ input)
    } catch (err) {
      setError(err.message || 'ส่งไม่ผ่าน กรุณาลองใหม่');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="font-medium text-slate-900">เขียนรีวิว</h3>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ดูแล้วรู้สึกอย่างไร"
        rows="3"
        disabled={isSubmitting}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
      />

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={!isValid || isSubmitting} // 👈 ปิดใช้งานปุ่มถ้าพิมพ์ไม่ครบ 10 ตัวอักษร (แก้ข้อ toBeDisabled)
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:bg-slate-300"
        >
          {isSubmitting ? 'กำลังส่ง...' : 'ส่งรีวิว'}
        </button>
      </div>
    </form>
  );
}