// 1. Import DOM Matchers (ทำให้ใช้ .toBeInTheDocument(), .toBeDisabled() ได้)
import '@testing-library/jest-dom';

// 2. ปิด Warning ของ React Router v6 เพื่อให้ Terminal สะอาด อ่านผลทดสอบง่าย
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('React Router Future Flag Warning')
  ) {
    return;
  }
  originalWarn(...args);
};