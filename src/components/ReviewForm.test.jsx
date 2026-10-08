import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './ReviewForm';

test('พิมพ์ไม่ครบ 10 ตัวอักษร ปุ่มต้องถูก disable', async () => {
  const onSubmit = jest.fn();
  render(<ReviewForm onSubmit={onSubmit} isSubmitting={false} />);

  const input = screen.getByPlaceholderText(/ดูแล้วรู้สึกอย่างไร/i);
  const button = screen.getByRole('button', { name: /ส่งรีวิว/i });

  expect(button).toBeDisabled();

  await userEvent.type(input, 'สั้นไป');
  expect(button).toBeDisabled();

  await userEvent.type(input, ' ยาวพอแล้วนะ');
  expect(button).not.toBeDisabled();
});

test('พิมพ์ครบแล้วกดส่ง ต้องเรียก onSubmit พร้อมข้อความ และล้างช่องพิมพ์', async () => {
  const onSubmit = jest.fn().mockResolvedValue({});
  render(<ReviewForm onSubmit={onSubmit} isSubmitting={false} />);

  const input = screen.getByPlaceholderText(/ดูแล้วรู้สึกอย่างไร/i);
  const button = screen.getByRole('button', { name: /ส่งรีวิว/i });

  await userEvent.type(input, 'หนังเรื่องนี้สนุกดีมากครับ');
  await userEvent.click(button);

  expect(onSubmit).toHaveBeenCalledWith('หนังเรื่องนี้สนุกดีมากครับ');
  expect(input).toHaveValue('');
});

test('ถ้าส่งไม่สำเร็จ (onSubmit throw) ต้องขึ้นข้อความแจ้งเตือนสีแดง', async () => {
  const onSubmit = jest.fn().mockRejectedValue(new Error('ส่งไม่ผ่าน กรุณาลองใหม่'));
  render(<ReviewForm onSubmit={onSubmit} isSubmitting={false} />);

  const input = screen.getByPlaceholderText(/ดูแล้วรู้สึกอย่างไร/i);
  const button = screen.getByRole('button', { name: /ส่งรีวิว/i });

  await userEvent.type(input, 'หนังเรื่องนี้สนุกดีมากครับ');
  await userEvent.click(button);

  const errorAlert = await screen.findByText('ส่งไม่ผ่าน กรุณาลองใหม่');
  expect(errorAlert).toBeInTheDocument();
});