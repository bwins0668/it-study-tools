(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["itpass:1"] = window.CONTENT_I18N["itpass:1"] || {};
  window.CONTENT_I18N["itpass:1"].vi = {
    title: "1-01 Lý thuyết thông tin (Information Theory)",
    concept: "Thông tin được biểu diễn dưới hai dạng chính: **Analog** (tương tự), bao gồm các giá trị thay đổi liên tục (không có khoảng ngắt, như chiều cao của một máng trượt), và **Digital** (số), chia các giá trị liên tục thành các giá trị số rời rạc, không liên tục là 0 và 1. Dữ liệu số (Digital data) có ưu điểm là dễ xử lý và chỉnh sửa, khả năng chống nhiễu cao và ít bị suy giảm chất lượng.\n\n**Tại sao máy tính sử dụng kỹ thuật số (hệ nhị phân)?**\nCác mạch điện tử trong máy tính chỉ có thể phân biệt giữa hai trạng thái: \"ON (điện áp cao)\" và \"OFF (điện áp thấp)\". Do đó, biểu diễn tất cả thông tin dưới dạng kết hợp của các số 0 và 1 (kỹ thuật số) là phương pháp đáng tin cậy nhất và ít lỗi nhất.\n\nĐơn vị thông tin nhỏ nhất là **bit** (biểu thị 0 hoặc 1) và một nhóm 8 bit được gọi là một **Byte**. Các đơn vị bổ trợ để biểu thị dung lượng lớn bao gồm **KB** (10^3), **MB** (10^6), **GB** (10^9), **TB** (10^12) và **PB** (10^15). Để chuẩn bị cho kỳ thi, hãy đảm bảo bạn ghi nhớ thứ tự của các đơn vị này và quy tắc tính toán là 1 Byte bằng 8 bit.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:1:en"
  };

  window.CONTENT_I18N["itpass:2"] = window.CONTENT_I18N["itpass:2"] || {};
  window.CONTENT_I18N["itpass:2"].vi = {
    title: "1-02 Kiến trúc máy tính và CPU (Computer Architecture and CPU)",
    concept: "Máy tính bao gồm các thành phần cơ bản được gọi là **Five Core Devices** (Năm thiết bị cốt lõi):\n\n1. **Input Device** (Thiết bị đầu vào): Thiết bị dùng để nhập thông tin, như bàn phím và chuột.\n2. **Output Device** (Thiết bị đầu ra): Thiết bị dùng để xuất thông tin, như màn hình và máy in.\n3. **Memory/Storage Device** (Thiết bị nhớ/lưu trữ): Thiết bị dùng để lưu trữ chương trình và dữ liệu (chia thành bộ nhớ chính và bộ nhớ phụ).\n4. **Control Device** (Thiết bị điều khiển): Thiết bị diễn giải các lệnh và đưa ra lệnh cho các thành phần khác.\n5. **Arithmetic Logic Device** (Thiết bị logic số học): Thiết bị thực hiện các phép toán số học và logic.\n\nTrong số này, con chip tích hợp thiết bị điều khiển và thiết bị logic số học là **CPU (Central Processing Unit)**, đóng vai trò như \"bộ não\" của máy tính.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:2:en"
  };

  window.CONTENT_I18N["itpass:3"] = window.CONTENT_I18N["itpass:3"] || {};
  window.CONTENT_I18N["itpass:3"].vi = {
    title: "1-02-1 Chỉ số hiệu suất CPU (CPU Performance Metrics)",
    concept: "**Các chỉ số hiệu suất của CPU (CPU Performance Metrics):**\n- **Clock Frequency** (Tần số nhịp): Số lượng tín hiệu điện được tạo ra mỗi giây (Hz). Giá trị này càng cao thì tốc độ xử lý càng nhanh.\n- **CPI (Cycles Per Instruction)**: Số chu kỳ nhịp cần thiết để thực thi một lệnh duy nhất. Giá trị này càng thấp thì hiệu suất xử lý càng tốt.\n- **Multi-core Processor** (Bộ vi xử lý đa nhân): Một CPU chứa nhiều \"nhân\" (core) xử lý. Xử lý song song giúp cải thiện hiệu suất và khả năng tổng thể.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:3:en"
  };
})();
