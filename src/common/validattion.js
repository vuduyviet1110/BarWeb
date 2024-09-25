export const isValidEmail = (email) => {
  // Biểu thức chính quy để kiểm tra email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
export function isvalidTime(userInput) {
  // Regular expression for matching the format "HH:MM:SS"
  const timeFormatRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

  // Check if the input matches the regular expression
  const isValidFormat = timeFormatRegex.test(userInput);

  return isValidFormat;
}
export const isValidDate = (dateString) => {
  // Biểu thức chính quy để kiểm tra định dạng YYYY-MM-DD
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(dateString)) {
    return false;
  }
  // Kiểm tra xem ngày có hợp lệ không (ví dụ: 2024-02-30 là ngày không hợp lệ)
  const date = new Date(dateString);
  const [year, month, day] = dateString.split("-").map(Number);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};
export function isValidPhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^0\d{9}$/; // Bắt đầu bằng 0 và có đúng 10 chữ số
  return phoneNumberRegex.test(phoneNumber);
}
export const isAllFieldFilledExcept = (object, fieldsToIgnore = []) => {
  return Object.keys(object).every((key) => {
    // Nếu trường nằm trong danh sách cần bỏ qua, không kiểm tra nó
    if (fieldsToIgnore.includes(key)) {
      return true;
    }
    // Kiểm tra các giá trị khác xem có được điền đầy đủ không
    const value = object[key];
    return value !== "" && value !== null && value !== undefined;
  });
};

export const isAllFieldFilled = (object) => {
  return Object.values(object).every(
    (value) => value !== "" && value !== null && value !== undefined
  );
};

export const isValidAge = (DOB) => {
  const dateOfBirth = typeof DOB === "string" ? new Date(DOB) : DOB;

  if (isNaN(dateOfBirth)) {
    throw new Error("Ngày sinh không hợp lệ");
  }

  const localDOB = new Date(
    dateOfBirth.getFullYear(),
    dateOfBirth.getMonth(),
    dateOfBirth.getDate()
  );

  const today = new Date();
  const age = today.getFullYear() - localDOB.getFullYear();
  const monthDifference = today.getMonth() - localDOB.getMonth();
  const dayDifference = today.getDate() - localDOB.getDate();

  // Nếu tuổi lớn hơn 18
  if (age > 18) {
    return true;
  }

  // Nếu tuổi bằng 18, kiểm tra tháng và ngày
  if (age === 18) {
    if (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)) {
      return true;
    }
  }

  // Nếu không thỏa mãn các điều kiện trên, chưa đủ 18 tuổi
  return false;
};

export function convertToNormalDateTime(isoString) {
  // Tạo một đối tượng Date từ chuỗi ISO
  const date = new Date(isoString);

  // Lấy các phần ngày, tháng, năm
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() trả về giá trị từ 0-11
  const year = date.getFullYear();

  // Lấy các phần giờ, phút, giây
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Trả về chuỗi ngày giờ theo định dạng dd-mm-yyyy hh:mm:ss
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
