/* Study Tools Content I18n — Java Thai Derived Language Pack v1 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["java:1"] = window.CONTENT_I18N["java:1"] || {};
  window.CONTENT_I18N["java:1"].th = {
    title: "โปรแกรมคืออะไร",
    concept: "**Chương trình** là một tập hợp các hướng dẫn từng bước để máy tính thực hiện công việc. Cũng giống như công thức nấu ăn hướng dẫn bạn thứ tự thực hiện, máy tính sẽ thực thi các câu lệnh trong chương trình tuần tự từ trên xuống dưới.\n\nNgôn ngữ chuyên dụng để viết chương trình được gọi là **ngôn ngữ lập trình**, và Java là một trong những ngôn ngữ tiêu biểu nhất.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:1:en"
  };

  window.CONTENT_I18N["java:2"] = window.CONTENT_I18N["java:2"] || {};
  window.CONTENT_I18N["java:2"].th = {
    title: "คุณสมบัติของ Java",
    concept: "- **Độc lập nền tảng**: Chương trình viết bằng Java có thể chạy trên Windows, Mac và Linux (\"Write Once, Run Anywhere\")\n- **Hướng đối tượng**: Bạn có thể thiết kế chương trình bằng cách mô hình hóa các \"đối tượng\" trong thế giới thực\n- **Kiểu dữ liệu mạnh (Strongly Typed)**: Kiểu của biến được kiểm soát chặt chẽ, giúp giảm lỗi\n- **Thư viện chuẩn phong phú**: Nhiều tính năng có sẵn trong thư viện chuẩn, sử dụng được ngay",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:2:en"
  };

  window.CONTENT_I18N["java:3"] = window.CONTENT_I18N["java:3"] || {};
  window.CONTENT_I18N["java:3"].th = {
    title: "โครงสร้างพื้นฐานของโปรแกรม Java",
    concept: "Một chương trình Java tối thiểu có dạng như sau:\n\n```\nclass ClassName {\n    public static void main(String[] args) {\n        // Viết mã xử lý ở đây\n    }\n}\n```\n\nMọi chương trình Java đều phải đặt mã bên trong một **class**. Phương thức `main` là điểm vào — chương trình bắt đầu thực thi từ đây.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:3:en"
  };

  window.CONTENT_I18N["java:4"] = window.CONTENT_I18N["java:4"] || {};
  window.CONTENT_I18N["java:4"].th = {
    title: "คอมเมนต์ (Comment)",
    concept: "Mọi thứ từ `//` đến cuối dòng được gọi là **chú thích** (comment). Máy tính bỏ qua chúng khi thực thi, vì vậy bạn có thể dùng chúng làm ghi chú.\n\nChú thích nhiều dòng được đặt trong cặp `/*` và `*/`.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:4:en"
  };

  window.CONTENT_I18N["java:5"] = window.CONTENT_I18N["java:5"] || {};
  window.CONTENT_I18N["java:5"].th = {
    title: "บล็อกและการเยื้อง (Blocks and Indentation)",
    concept: "Một đoạn mã được đặt trong cặp `{` và `}` gọi là **khối lệnh** (block). Theo quy ước, mã bên trong khối lệnh được **thụt lề** (dịch sang phải) để dễ đọc hơn.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:5:en"
  };

  window.CONTENT_I18N["java:6"] = window.CONTENT_I18N["java:6"] || {};
  window.CONTENT_I18N["java:6"].th = {
    title: "แบบฝึกหัด: บทที่ 1",
    concept: "**【Đề bài】**\n\nViết chương trình in hai dòng lên màn hình:\n1. \"Start learning Java!\"\n2. Tên của bạn (ví dụ: \"Nguyen Van A\")\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:6:en"
  };

  window.CONTENT_I18N["java:7"] = window.CONTENT_I18N["java:7"] || {};
  window.CONTENT_I18N["java:7"].th = {
    title: "ตัวแปรคืออะไร",
    concept: "**Biến** (variable) giống như một chiếc hộp có nhãn dùng để lưu trữ giá trị tạm thời. Mỗi hộp có một tên (tên biến) và một kiểu dữ liệu xác định loại giá trị mà nó có thể chứa.\n\nBiến phải được **khai báo** trước khi sử dụng:\n\n```\ntypeName variableName;          // khai báo\ntypeName variableName = value; // khai báo kèm khởi tạo\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:7:en"
  };

  window.CONTENT_I18N["java:8"] = window.CONTENT_I18N["java:8"] || {};
  window.CONTENT_I18N["java:8"].th = {
    title: "ชนิดข้อมูลพื้นฐานใน Java",
    concept: "Java có một số kiểu dữ liệu cơ bản để lưu trữ các loại giá trị khác nhau:\n\n- **int** — Số nguyên (khoảng ±2.1 tỷ), ví dụ: `100`, `-5`, `0`\n- **double** — Số thập phân (độ chính xác kép), ví dụ: `3.14`, `-2.5`\n- **boolean** — Giá trị đúng/sai, ví dụ: `true`, `false`\n- **char** — Ký tự đơn, ví dụ: `'A'`, `'x'`\n- **long** — Số nguyên lớn, ví dụ: `1000000000L`\n- **String** — Chuỗi văn bản (kiểu class), ví dụ: `\"Hello\"`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:8:en"
  };

  window.CONTENT_I18N["java:9"] = window.CONTENT_I18N["java:9"] || {};
  window.CONTENT_I18N["java:9"].th = {
    title: "ตัวดำเนินการทางคณิตศาสตร์",
    concept: "- `+` Cộng, `-` Trừ, `*` Nhân, `/` Chia, `%` Chia lấy dư (modulo)\n- Phép chia số nguyên **bỏ qua** phần thập phân: `7 / 2 = 3`\n- `++` Tăng lên 1 (increment), `--` Giảm đi 1 (decrement)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:9:en"
  };

  window.CONTENT_I18N["java:10"] = window.CONTENT_I18N["java:10"] || {};
  window.CONTENT_I18N["java:10"].th = {
    title: "การแปลงชนิดข้อมูล (Cast)",
    concept: "Khi trộn các kiểu dữ liệu khác nhau trong một phép tính, Java tự động chuyển đổi sang kiểu lớn hơn (chuyển đổi ngầm định).\n\nĐể chuyển đổi tường minh, sử dụng **toán tử ép kiểu** (cast): `(int) 3.7` cho kết quả `3` (phần thập phân bị cắt bỏ).",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:10:en"
  };

  window.CONTENT_I18N["java:11"] = window.CONTENT_I18N["java:11"] || {};
  window.CONTENT_I18N["java:11"].th = {
    title: "คลาส String (ข้อความ)",
    concept: "**Lớp String (Chuỗi văn bản)**\n\n`String` là một kiểu class dùng để xử lý chuỗi văn bản. Bạn có thể nối chuỗi bằng toán tử `+`.\n\n```\nString name = \"Taro\";\nSystem.out.println(\"Hello, \" + name + \"-san\");\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:11:en"
  };

  window.CONTENT_I18N["java:12"] = window.CONTENT_I18N["java:12"] || {};
  window.CONTENT_I18N["java:12"].th = {
    title: " Escape Sequence (ลำดับเอสเคป)",
    concept: "**Chuỗi thoát (Escape Sequence)**\n\nCác ký tự đặc biệt trong chuỗi được biểu diễn bằng chuỗi thoát:\n\n- `\\n` — Xuống dòng (newline)\n- `\\t` — Tab\n- `\\\"` — Dấu nháy kép\n- `\\\\` — Dấu gạch chéo xuôi (backslash)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:12:en"
  };

  window.CONTENT_I18N["java:13"] = window.CONTENT_I18N["java:13"] || {};
  window.CONTENT_I18N["java:13"].th = {
    title: "แบบฝึกหัด: บทที่ 2",
    concept: "**【Đề bài】**\n\nSử dụng `Scanner` để đọc tuổi của bạn từ bàn phím, sau đó in ra thông báo \"Ban ○ tuoi\" dựa trên giá trị đó. (Đừng quên import Scanner nhé!)\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:13:en"
  };

  window.CONTENT_I18N["java:14"] = window.CONTENT_I18N["java:14"] || {};
  window.CONTENT_I18N["java:14"].th = {
    title: "การแยกเงื่อนไข (if)",
    concept: "**Rẽ nhánh có điều kiện (câu lệnh if)**\n\nRẽ nhánh thực thi dựa trên điều kiện:\n\n```\nif (condition) {\n    // Thực thi khi điều kiện đúng\n} else if (anotherCondition) {\n    // Thực thi khi điều kiện khác đúng\n} else {\n    // Thực thi khi không có điều kiện nào ở trên đúng\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:14:en"
  };

  window.CONTENT_I18N["java:15"] = window.CONTENT_I18N["java:15"] || {};
  window.CONTENT_I18N["java:15"].th = {
    title: "ตัวดำเนินการเปรียบเทียบและตรรกะ",
    concept: "**Toán tử quan hệ và logic**\n\n- `==` — Bằng nhau\n- `!=` — Khác nhau\n- `>`, `<` — Lớn hơn, Nhỏ hơn\n- `>=`, `<=` — Lớn hơn hoặc bằng, Nhỏ hơn hoặc bằng\n- `&&` — VÀ (AND)\n- `||` — HOẶC (OR)\n- `!` — PHỦ ĐỊNH (NOT)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:15:en"
  };

  window.CONTENT_I18N["java:16"] = window.CONTENT_I18N["java:16"] || {};
  window.CONTENT_I18N["java:16"].th = {
    title: "คำสั่ง switch",
    concept: "**Câu lệnh switch**\n\nRẽ nhánh thực thi dựa trên giá trị của một biến duy nhất:\n\n```\nswitch (variable) {\n    case value1: process1; break;\n    case value2: process2; break;\n    default: otherProcess;\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:16:en"
  };

  window.CONTENT_I18N["java:17"] = window.CONTENT_I18N["java:17"] || {};
  window.CONTENT_I18N["java:17"].th = {
    title: "ลูป (for)",
    concept: "**Vòng lặp (for)**\n\n```\nfor (initialization; condition; update) {\n    // Xử lý lặp lại\n}\n// Ví dụ: hiển thị 1 đến 5\nfor (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:17:en"
  };

  window.CONTENT_I18N["java:18"] = window.CONTENT_I18N["java:18"] || {};
  window.CONTENT_I18N["java:18"].th = {
    title: "ลูป (while และ do-while)",
    concept: "**Vòng lặp (while và do-while)**\n\n```\nwhile (condition) { process; }  // Lặp lại khi điều kiện đúng\ndo { process; } while (condition);  // Luôn thực thi ít nhất một lần\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:18:en"
  };

  window.CONTENT_I18N["java:19"] = window.CONTENT_I18N["java:19"] || {};
  window.CONTENT_I18N["java:19"].th = {
    title: "break และ continue",
    concept: "**break và continue**\n\n- `break` — Thoát khỏi vòng lặp ngay lập tức\n- `continue` — Bỏ qua lần lặp hiện tại và chuyển sang lần tiếp theo",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:19:en"
  };

  window.CONTENT_I18N["java:20"] = window.CONTENT_I18N["java:20"] || {};
  window.CONTENT_I18N["java:20"].th = {
    title: "อาร์เรย์ (Array)",
    concept: "**Mảng (Array)**\n\nQuản lý nhiều giá trị cùng kiểu với nhau:\n\n```\nint[] scores = {85, 90, 78, 95, 82};  // Mảng 5 phần tử\nSystem.out.println(scores[0]);  // Phần tử đầu tiên (chỉ mục bắt đầu từ 0)\nSystem.out.println(scores.length);  // Độ dài mảng = 5\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:20:en"
  };

  window.CONTENT_I18N["java:21"] = window.CONTENT_I18N["java:21"] || {};
  window.CONTENT_I18N["java:21"].th = {
    title: "แบบฝึกหัด: บทที่ 3",
    concept: "**【Đề bài】**\n\nSử dụng vòng lặp `for` để tạo một vòng lặp in ra các số nguyên từ 1 đến 10. Tuy nhiên, bỏ qua việc in khi số là bội số của 3 (dùng `continue`), và kết thúc vòng lặp khi đạt đến 8 (dùng `break`).\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:21:en"
  };

  window.CONTENT_I18N["java:22"] = window.CONTENT_I18N["java:22"] || {};
  window.CONTENT_I18N["java:22"].th = {
    title: "เมธอด (Method) คืออะไร",
    concept: "**Phương thức (Method) là gì?**\n\nPhương thức là một khối xử lý có tên, có thể được gọi bao nhiêu lần tùy ý. Nó giúp loại bỏ việc phải viết cùng một đoạn mã nhiều lần và giữ cho chương trình có tổ chức.\n\n```\nstatic returnType methodName(parameterType parameterName) {\n    process;\n    return returnValue;\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:22:en"
  };

  window.CONTENT_I18N["java:23"] = window.CONTENT_I18N["java:23"] || {};
  window.CONTENT_I18N["java:23"].th = {
    title: "พารามิเตอร์ (Parameter)",
    concept: "**Tham số (Parameter)**\n\nGiá trị được truyền vào phương thức. Bạn chỉ định chúng khi gọi phương thức:\n\n```\nstatic void greet(String name) {\n    System.out.println(\"Hello, \" + name + \"-san\");\n}\n// Gọi:\ngreet(\"Taro\");  // Hello, Taro-san\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:23:en"
  };

  window.CONTENT_I18N["java:24"] = window.CONTENT_I18N["java:24"] || {};
  window.CONTENT_I18N["java:24"].th = {
    title: "ค่าส่งกลับ (Return Value)",
    concept: "**Giá trị trả về (Return Value)**\n\nGiá trị mà phương thức trả về sau khi xử lý. Dùng `return` để gửi giá trị trở lại. Khi không có giá trị trả về, dùng `void`:\n\n```\nstatic int add(int a, int b) {\n    return a + b;\n}\nint result = add(3, 4);  // result = 7\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:24:en"
  };

  window.CONTENT_I18N["java:25"] = window.CONTENT_I18N["java:25"] || {};
  window.CONTENT_I18N["java:25"].th = {
    title: "การโอเวอร์โหลดเมธอด (Overloading)",
    concept: "**Nạp chồng phương thức (Method Overloading)**\n\nBạn có thể định nghĩa nhiều phương thức cùng tên nhưng khác kiểu hoặc số lượng tham số. Đây gọi là **nạp chồng** (overloading).\n\n```\nstatic int add(int a, int b) { return a + b; }\nstatic double add(double a, double b) { return a + b; }\nstatic int add(int a, int b, int c) { return a + b + c; }\n```\n\nKhi được gọi, phương thức phù hợp sẽ tự động được chọn dựa trên đối số.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:25:en"
  };

  window.CONTENT_I18N["java:26"] = window.CONTENT_I18N["java:26"] || {};
  window.CONTENT_I18N["java:26"].th = {
    title: "ขอบเขตของตัวแปร (Scope)",
    concept: "**Phạm vi của biến (Variable Scope)**\n\nPhạm vi (scope) mà một biến có thể được sử dụng bị giới hạn trong khối lệnh `{}` bao quanh nó. Biến được khai báo bên trong phương thức không thể được truy cập từ bên ngoài phương thức đó (gọi là **biến địa phương** - local variable).",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:26:en"
  };

  window.CONTENT_I18N["java:27"] = window.CONTENT_I18N["java:27"] || {};
  window.CONTENT_I18N["java:27"].th = {
    title: "แบบฝึกหัด: บทที่ 4",
    concept: "**【Đề bài】**\n\nĐịnh nghĩa phương thức `public static int getMax(int a, int b)` nhận hai số nguyên và trả về số lớn hơn. Gọi nó từ phương thức `main` và hiển thị kết quả.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:27:en"
  };

  window.CONTENT_I18N["java:28"] = window.CONTENT_I18N["java:28"] || {};
  window.CONTENT_I18N["java:28"].th = {
    title: "การเขียนโปรแกรมเชิงวัตถุคืออะไร",
    concept: "**Lập trình hướng đối tượng là gì?**\n\nLập trình hướng đối tượng (OOP) là cách mô hình hóa các \"thứ\" trong thế giới thực thành các **đối tượng** (object) trong chương trình. Ví dụ, một đối tượng \"Sinh viên\" (Student) có các **thuộc tính** (field) như tên và mã số sinh viên, và các **thao tác** (method) như học tập và thi cử.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:28:en"
  };

  window.CONTENT_I18N["java:29"] = window.CONTENT_I18N["java:29"] || {};
  window.CONTENT_I18N["java:29"].th = {
    title: "คลาส (Class) และออบเจกต์ (Instance)",
    concept: "**Lớp (Class) và Đối tượng (Instance)**\n\n- **Class** — Bản thiết kế (blueprint) cho một đối tượng (giống như một khuôn mẫu)\n- **Instance** — Đối tượng thực tế được tạo ra từ bản thiết kế\n\n```\n// Định nghĩa class (bản thiết kế)\nclass Student {\n    String name;    // Trường (thuộc tính)\n    int studentId;\n}\n\n// Tạo một instance\nStudent s = new Student();\ns.name = \"Tanaka\";\ns.studentId = 1001;\nSystem.out.println(s.name);\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:29:en"
  };

  window.CONTENT_I18N["java:30"] = window.CONTENT_I18N["java:30"] || {};
  window.CONTENT_I18N["java:30"].th = {
    title: "ชนิดอ้างอิง (Reference Type)",
    concept: "**Kiểu tham chiếu (Reference Type)**\n\nMột biến kiểu class chứa \"địa chỉ\" (tham chiếu) trong bộ nhớ nơi dữ liệu thực tế (đối tượng) được lưu trữ.\n\nKhi bạn viết `Student s2 = s;`, `s2` trỏ đến **cùng một** đối tượng với `s` (không phải bản sao!).",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:30:en"
  };

  window.CONTENT_I18N["java:31"] = window.CONTENT_I18N["java:31"] || {};
  window.CONTENT_I18N["java:31"].th = {
    title: "null",
    concept: "**null**\n\n`null` là một giá trị đặc biệt biểu thị \"không trỏ đến đối tượng nào cả.\" Truy cập vào trường hoặc phương thức trên một đối tượng null sẽ gây ra **NullPointerException**.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:31:en"
  };

  window.CONTENT_I18N["java:32"] = window.CONTENT_I18N["java:32"] || {};
  window.CONTENT_I18N["java:32"].th = {
    title: "อาร์เรย์ของการอ้างอิง",
    concept: "**Mảng tham chiếu**\n\nBạn cũng có thể tạo mảng cho các kiểu class:\n\n```\nStudent[] students = new Student[3];\nstudents[0] = new Student();\nstudents[0].name = \"Sato\";\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:32:en"
  };

  window.CONTENT_I18N["java:33"] = window.CONTENT_I18N["java:33"] || {};
  window.CONTENT_I18N["java:33"].th = {
    title: "แบบฝึกหัด: บทที่ 5",
    concept: "**【Đề bài】**\n\nTạo một class đại diện cho \"Sinh viên\" (Student), với các biến instance `String name` và `int age`. Viết một đoạn mã gán giá trị cho chúng và in kết quả ra màn hình.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:33:en"
  };

  window.CONTENT_I18N["java:34"] = window.CONTENT_I18N["java:34"] || {};
  window.CONTENT_I18N["java:34"].th = {
    title: "คอนสตรัคเตอร์ (Constructor)",
    concept: "**Hàm tạo (Constructor)**\n\nHàm tạo là một phương thức đặc biệt được tự động gọi khi một instance được tạo bằng `new`. Nó dùng để khởi tạo các trường (field).\n\n- Có tên giống với tên class\n- Không có kiểu trả về\n\n```\nclass Point {\n    int x, y;\n    Point(int x, int y) {  // Hàm tạo\n        this.x = x;\n        this.y = y;\n    }\n}\nPoint p = new Point(3, 5);  // Hàm tạo được gọi\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:34:en"
  };

  window.CONTENT_I18N["java:35"] = window.CONTENT_I18N["java:35"] || {};
  window.CONTENT_I18N["java:35"].th = {
    title: "คีย์เวิร์ด this",
    concept: "**Từ khóa this**\n\n`this` trỏ đến \"chính instance hiện tại.\" Khi tên tham số trùng với tên trường, bạn có thể dùng `this.fieldName` để chỉ định trường của instance.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:35:en"
  };

  window.CONTENT_I18N["java:36"] = window.CONTENT_I18N["java:36"] || {};
  window.CONTENT_I18N["java:36"].th = {
    title: "ตัวแปรคลาส (static field)",
    concept: "**Biến lớp (static field)**\n\nBiến được chia sẻ giữa tất cả các instance của một class. Khai báo chúng bằng từ khóa `static`:\n\n```\nclass Counter {\n    static int count = 0;  // Biến lớp (chia sẻ giữa mọi instance)\n    int id;\n    Counter() {\n        count++;\n        id = count;\n    }\n}\n// Có thể truy cập qua Counter.count\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:36:en"
  };

  window.CONTENT_I18N["java:37"] = window.CONTENT_I18N["java:37"] || {};
  window.CONTENT_I18N["java:37"].th = {
    title: "เมธอดคลาส (static method)",
    concept: "**Phương thức lớp (static method)**\n\nPhương thức có thể được gọi mà không cần tạo instance. Ví dụ: `Math.sqrt()` và `System.out.println()`:\n\n```\nclass MathHelper {\n    static double circle(double r) {\n        return Math.PI * r * r;  // Diện tích hình tròn\n    }\n}\ndouble area = MathHelper.circle(5.0);\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:37:en"
  };

  window.CONTENT_I18N["java:38"] = window.CONTENT_I18N["java:38"] || {};
  window.CONTENT_I18N["java:38"].th = {
    title: "แบบฝึกหัด: บทที่ 6",
    concept: "**【Đề bài】**\n\nĐịnh nghĩa hàm tạo `Student(String name, int age)` trong class `Student` để các đối tượng có thể được tạo với giá trị khởi tạo trong một bước bằng `new`. Viết chương trình tạo và hiển thị một đối tượng như vậy.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:38:en"
  };

  window.CONTENT_I18N["java:39"] = window.CONTENT_I18N["java:39"] || {};
  window.CONTENT_I18N["java:39"].th = {
    title: "การสืบทอด (Inheritance) คืออะไร",
    concept: "**Kế thừa (Inheritance) là gì?**\n\nKế thừa cho phép bạn tạo một class mới (**subclass**/**class con**) kế thừa chức năng từ một class hiện có (**superclass**/**class cha**). Điều này giúp tái sử dụng mã dễ dàng hơn.\n\n```\nclass Animal {\n    String name;\n    void eat() { System.out.println(name + \" is eating\"); }\n}\n\nclass Dog extends Animal {  // Kế thừa từ Animal\n    void bark() { System.out.println(name + \" is barking\"); }\n}\n// Dog có thể sử dụng cả eat() và bark()\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:39:en"
  };

  window.CONTENT_I18N["java:40"] = window.CONTENT_I18N["java:40"] || {};
  window.CONTENT_I18N["java:40"].th = {
    title: "การโอเวอร์ไรด์เมธอด (Overriding)",
    concept: "**Ghi đè phương thức (Method Overriding)**\n\nĐịnh nghĩa lại (ghi đè) phương thức của lớp cha trong lớp con:\n\n```\nclass Animal {\n    void speak() { System.out.println(\"...\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Woof!\"); }  // Ghi đè\n}\nclass Cat extends Animal {\n    @Override\n    void speak() { System.out.println(\"Meow!\"); }\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:40:en"
  };

  window.CONTENT_I18N["java:41"] = window.CONTENT_I18N["java:41"] || {};
  window.CONTENT_I18N["java:41"].th = {
    title: "พอลิมอร์ฟิซึม (Polymorphism)",
    concept: "**Đa hình (Polymorphism)**\n\nBiến kiểu lớp cha có thể chứa instance của lớp con. Phương thức nào được gọi phụ thuộc vào kiểu thực tế của instance tại thời điểm chạy:\n\n```\nAnimal a1 = new Dog();\nAnimal a2 = new Cat();\na1.speak();  // Woof!\na2.speak();  // Meow!\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:41:en"
  };

  window.CONTENT_I18N["java:42"] = window.CONTENT_I18N["java:42"] || {};
  window.CONTENT_I18N["java:42"].th = {
    title: "คีย์เวิร์ด super",
    concept: "**Từ khóa super**\n\nDùng để gọi hàm tạo hoặc phương thức của lớp cha:\n\n```\nclass Dog extends Animal {\n    Dog(String name) {\n        super(name);  // Gọi hàm tạo của lớp cha\n    }\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:42:en"
  };

  window.CONTENT_I18N["java:43"] = window.CONTENT_I18N["java:43"] || {};
  window.CONTENT_I18N["java:43"].th = {
    title: "คลาส Object",
    concept: "**Lớp Object**\n\nMọi class trong Java đều ngầm định kế thừa từ lớp `Object`.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:43:en"
  };

  window.CONTENT_I18N["java:44"] = window.CONTENT_I18N["java:44"] || {};
  window.CONTENT_I18N["java:44"].th = {
    title: "แบบฝึกหัด: บทที่ 7",
    concept: "**【Đề bài】**\n\nĐịnh nghĩa lớp cha `Animal` và lớp con `Dog` kế thừa từ nó. Triển khai phương thức `run()` trong `Animal` và phương thức `bark()` trong `Dog`. Tạo một instance của `Dog` và gọi cả hai phương thức.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:44:en"
  };

  window.CONTENT_I18N["java:45"] = window.CONTENT_I18N["java:45"] || {};
  window.CONTENT_I18N["java:45"].th = {
    title: "ตัวแก้ไขการเข้าถึง (Access Modifier)",
    concept: "**Bổ từ truy cập (Access Modifier)**\n\n- `public` — Có thể truy cập từ mọi nơi\n- `private` — Chỉ trong cùng class\n- `protected` — Cùng package + các lớp con\n- (không khai báo) — Trong cùng package\n\n**Encapsulation (Tính đóng gói)**: Một mẫu thiết kế trong đó các trường được khai báo `private` để ngăn truy cập trực tiếp từ bên ngoài, và được truy cập thông qua các phương thức **getter/setter**.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:45:en"
  };

  window.CONTENT_I18N["java:46"] = window.CONTENT_I18N["java:46"] || {};
  window.CONTENT_I18N["java:46"].th = {
    title: "ตัวแก้ไข final",
    concept: "**Bổ từ final**\n\n- Biến `final` — Giá trị không thể thay đổi (hằng số)\n- Phương thức `final` — Không thể bị ghi đè\n- Lớp `final` — Không thể bị kế thừa (ví dụ: lớp String)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:46:en"
  };

  window.CONTENT_I18N["java:47"] = window.CONTENT_I18N["java:47"] || {};
  window.CONTENT_I18N["java:47"].th = {
    title: "คลาส абстракт (abstract class)",
    concept: "**Lớp trừu tượng (abstract class)**\n\nLớp không thể được khởi tạo trực tiếp. Nó có thể có các **phương thức trừu tượng** (abstract method) - chỉ có khai báo, không có cài đặt - mà lớp con bắt buộc phải triển khai:\n\n```\nabstract class Animal {\n    abstract void speak();  // Lớp con phải cài đặt\n    void breathe() { System.out.println(\"Breathing...\"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Woof!\"); }\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:47:en"
  };

  window.CONTENT_I18N["java:48"] = window.CONTENT_I18N["java:48"] || {};
  window.CONTENT_I18N["java:48"].th = {
    title: "อินเทอร์เฟซ (Interface)",
    concept: "**Interface (Giao diện)**\n\nInterface là một \"hợp đồng\" chỉ khai báo chữ ký phương thức (method signature). Một class có thể triển khai nhiều interface bằng từ khóa `implements` (thay thế cho đa kế thừa):\n\n```\ninterface Flyable {\n    void fly();  // Không có cài đặt\n}\ninterface Swimmable {\n    void swim();\n}\nclass Duck extends Animal implements Flyable, Swimmable {\n    public void fly() { System.out.println(\"Flying\"); }\n    public void swim() { System.out.println(\"Swimming\"); }\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:48:en"
  };

  window.CONTENT_I18N["java:49"] = window.CONTENT_I18N["java:49"] || {};
  window.CONTENT_I18N["java:49"].th = {
    title: "แบบฝึกหัด: บทที่ 8",
    concept: "**【Đề bài】**\n\nĐịnh nghĩa một lớp trừu tượng `Shape` với phương thức trừu tượng `void draw()`. Sau đó tạo lớp `Circle` mở rộng `Shape` và ghi đè `draw()` để in \"Drawing a circle.\"\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:49:en"
  };

  window.CONTENT_I18N["java:50"] = window.CONTENT_I18N["java:50"] || {};
  window.CONTENT_I18N["java:50"].th = {
    title: "แพ็กเกจ (Package) คืออะไร",
    concept: "**Package là gì?**\n\nMột cơ chế nhóm các class liên quan lại với nhau. Hãy nghĩ nó như một thư mục.\n\nVí dụ: `java.util.ArrayList` là class `ArrayList` nằm trong package con `util` của package `java`.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:50:en"
  };

  window.CONTENT_I18N["java:51"] = window.CONTENT_I18N["java:51"] || {};
  window.CONTENT_I18N["java:51"].th = {
    title: "การประกาศ import",
    concept: "**Khai báo import**\n\nĐể sử dụng các class từ package khác, hãy import chúng bằng `import`. Package `java.lang` được tự động import.\n\n```\nimport java.util.ArrayList;     // Import một class cụ thể\nimport java.util.*;              // Import tất cả class trong package\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:51:en"
  };

  window.CONTENT_I18N["java:52"] = window.CONTENT_I18N["java:52"] || {};
  window.CONTENT_I18N["java:52"].th = {
    title: "เมธอดหลักของคลาส String",
    concept: "**Các phương thức chính của lớp String**\n\n- `length()` — Số ký tự, ví dụ: `\"Hello\".length()` → 5\n- `charAt(i)` — Ký tự tại vị trí i, ví dụ: `\"Hello\".charAt(1)` → 'e'\n- `substring(s,e)` — Chuỗi con, ví dụ: `\"Hello\".substring(1,3)` → \"el\"\n- `indexOf(s)` — Vị trí của chuỗi, ví dụ: `\"Hello\".indexOf(\"l\")` → 2\n- `equals(s)` — So sánh chuỗi, ví dụ: `\"abc\".equals(\"abc\")` → true\n- `toUpperCase()` — Chuyển thành chữ hoa, ví dụ: `\"hello\".toUpperCase()` → \"HELLO\"\n- `split(s)` — Tách chuỗi theo dấu phân cách, ví dụ: `\"a,b,c\".split(\",\")` → {\"a\",\"b\",\"c\"}",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:52:en"
  };

  window.CONTENT_I18N["java:53"] = window.CONTENT_I18N["java:53"] || {};
  window.CONTENT_I18N["java:53"].th = {
    title: "เมธอดหลักของคลาส Math",
    concept: "**Các phương thức chính của lớp Math**\n\n```\nMath.abs(-5)      // Giá trị tuyệt đối = 5\nMath.sqrt(16.0)   // Căn bậc hai = 4.0\nMath.pow(2, 10)   // Lũy thừa = 1024.0\nMath.max(3, 7)    // Giá trị lớn nhất = 7\nMath.random()     // Số ngẫu nhiên từ 0.0 đến 1.0\nMath.PI           // Số Pi ≈ 3.14159...\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:53:en"
  };

  window.CONTENT_I18N["java:54"] = window.CONTENT_I18N["java:54"] || {};
  window.CONTENT_I18N["java:54"].th = {
    title: "แบบฝึกหัด: บทที่ 1 (ส่วนที่ 2)",
    concept: "**【Đề bài】**\n\nSử dụng các phương thức chính của lớp String, viết chương trình nhận một chuỗi đầu vào từ bàn phím và hiển thị \"số ký tự\" và \"3 ký tự đầu tiên\" của chuỗi đó.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:54:en"
  };

  window.CONTENT_I18N["java:55"] = window.CONTENT_I18N["java:55"] || {};
  window.CONTENT_I18N["java:55"].th = {
    title: "ข้อยกเว้น (Exception) คืออะไร",
    concept: "**Ngoại lệ (Exception) là gì?**\n\nLà các lỗi xảy ra trong quá trình thực thi chương trình. Ví dụ: chia cho 0, truy cập chỉ mục mảng không tồn tại, gọi phương thức trên đối tượng null.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:55:en"
  };

  window.CONTENT_I18N["java:56"] = window.CONTENT_I18N["java:56"] || {};
  window.CONTENT_I18N["java:56"].th = {
    title: "คำสั่ง try-catch",
    concept: "**Câu lệnh try-catch**\n\nKhi ngoại lệ xảy ra, bạn có thể \"bắt\" nó để ngăn chương trình bị crash:\n\n```\ntry {\n    // Mã có thể ném ra ngoại lệ\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    // Xử lý ngoại lệ\n    System.out.println(\"Error: \" + e.getMessage());\n} finally {\n    // Luôn được thực thi, dù có hay không có ngoại lệ\n    System.out.println(\"Processing complete\");\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:56:en"
  };

  window.CONTENT_I18N["java:57"] = window.CONTENT_I18N["java:57"] || {};
  window.CONTENT_I18N["java:57"].th = {
    title: "คลาสข้อยกเว้นหลัก",
    concept: "**Các lớp ngoại lệ chính**\n\n- `ArithmeticException` — Khi chia cho 0, v.v.\n- `NullPointerException` — Thao tác trên đối tượng null\n- `ArrayIndexOutOfBoundsException` — Truy cập mảng ngoài phạm vi\n- `NumberFormatException` — Chuyển đổi số thất bại\n- `IOException` — Lỗi đầu vào/đầu ra",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:57:en"
  };

  window.CONTENT_I18N["java:58"] = window.CONTENT_I18N["java:58"] || {};
  window.CONTENT_I18N["java:58"].th = {
    title: "การโยนข้อยกเว้น (throw)",
    concept: "**Ném ngoại lệ (throw)**\n\n```\nthrow new IllegalArgumentException(\"Negative values not allowed: \" + value);\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:58:en"
  };

  window.CONTENT_I18N["java:59"] = window.CONTENT_I18N["java:59"] || {};
  window.CONTENT_I18N["java:59"].th = {
    title: "การประกาศข้อยกเว้น (throws)",
    concept: "**Khai báo ngoại lệ (throws)**\n\nDùng `throws` khi một phương thức không tự xử lý ngoại lệ mà để cho nơi gọi xử lý:\n\n```\nvoid readFile(String path) throws IOException {\n    // Mã có thể ném ra IOException\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:59:en"
  };

  window.CONTENT_I18N["java:60"] = window.CONTENT_I18N["java:60"] || {};
  window.CONTENT_I18N["java:60"].th = {
    title: "แบบฝึกหัด: บทที่ 2 (ส่วนที่ 2)",
    concept: "**【Đề bài】**\n\nViết chương trình bắt ngoại lệ `ArithmeticException` một cách an toàn khi xảy ra phép chia cho 0, hiển thị `'[Error] Cannot divide by zero.'` lên console và kết thúc bình thường.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:60:en"
  };

  window.CONTENT_I18N["java:61"] = window.CONTENT_I18N["java:61"] || {};
  window.CONTENT_I18N["java:61"].th = {
    title: " thread (เธรด) คืออะไร",
    concept: "**Thread (Luồng) là gì?**\n\nThread là một luồng thực thi chương trình. Các chương trình thông thường chạy trên một thread duy nhất (main thread), nhưng **đa luồng** (multithreading) cho phép nhiều tiến trình chạy đồng thời.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:61:en"
  };

  window.CONTENT_I18N["java:62"] = window.CONTENT_I18N["java:62"] || {};
  window.CONTENT_I18N["java:62"].th = {
    title: "สร้าง Thread วิธีที่ 1: สืบทอด Thread",
    concept: "**Tạo Thread Cách 1: Kế thừa lớp Thread**\n\n```\nclass MyThread extends Thread {\n    @Override\n    public void run() {\n        for (int i = 0; i < 5; i++) {\n            System.out.println(getName() + \": \" + i);\n        }\n    }\n}\nMyThread t = new MyThread();\nt.start();  // Chạy run() trong một thread riêng\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:62:en"
  };

  window.CONTENT_I18N["java:63"] = window.CONTENT_I18N["java:63"] || {};
  window.CONTENT_I18N["java:63"].th = {
    title: "สร้าง Thread วิธีที่ 2: ใช้ Runnable",
    concept: "**Tạo Thread Cách 2: Triển khai interface Runnable**\n\n```\nclass MyTask implements Runnable {\n    @Override\n    public void run() { /* xử lý */ }\n}\nThread t = new Thread(new MyTask());\nt.start();\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:63:en"
  };

  window.CONTENT_I18N["java:64"] = window.CONTENT_I18N["java:64"] || {};
  window.CONTENT_I18N["java:64"].th = {
    title: "เมธอด Thread ที่ใช้บ่อย",
    concept: "**Các phương thức Thread thường dùng**\n\n- `Thread.sleep(ms)` — Tạm dừng thread trong số mili giây chỉ định\n- `join()` — Chờ một thread kết thúc\n- `getName()` — Lấy tên thread",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:64:en"
  };

  window.CONTENT_I18N["java:65"] = window.CONTENT_I18N["java:65"] || {};
  window.CONTENT_I18N["java:65"].th = {
    title: "การซิงโครไนซ์ (synchronized)",
    concept: "**Đồng bộ hóa (synchronized)**\n\nKhi nhiều thread truy cập cùng một dữ liệu đồng thời, có thể xảy ra mâu thuẫn dữ liệu. Sử dụng từ khóa `synchronized` để kiểm soát độc quyền:\n\n```\nsynchronized void increment() {\n    count++;  // Chỉ một thread có thể thực thi phương thức này tại một thời điểm\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:65:en"
  };

  window.CONTENT_I18N["java:66"] = window.CONTENT_I18N["java:66"] || {};
  window.CONTENT_I18N["java:66"].th = {
    title: "แบบฝึกหัด: บทที่ 3 (ส่วนที่ 2)",
    concept: "**【Đề bài】**\n\nTạo một thread riêng biệt triển khai interface `Runnable`. Làm cho nó in ra \"Thread has started!\" ba lần với khoảng cách 1 giây, chạy song song với thread chính.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:66:en"
  };

  window.CONTENT_I18N["java:67"] = window.CONTENT_I18N["java:67"] || {};
  window.CONTENT_I18N["java:67"].th = {
    title: "ชนิดของหน่วยความจำ",
    concept: "**Các loại bộ nhớ**\n\n- **Stack (Ngăn xếp)** — Lưu trữ biến địa phương và thông tin gọi phương thức. Nhanh nhưng dung lượng nhỏ. Dùng cơ chế LIFO (Last In, First Out).\n- **Heap (Đống)** — Lưu trữ các đối tượng được tạo bằng `new`. Dung lượng lớn nhưng chậm hơn stack.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:67:en"
  };

  window.CONTENT_I18N["java:68"] = window.CONTENT_I18N["java:68"] || {};
  window.CONTENT_I18N["java:68"].th = {
    title: "Garbage Collection (GC)",
    concept: "**Garbage Collection (GC)**\n\nMột cơ chế tự động giải phóng bộ nhớ của các đối tượng không còn được sử dụng (không được tham chiếu từ bất kỳ đâu). Trong Java, lập trình viên không cần tự giải phóng bộ nhớ (khác với C hay C++).",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:68:en"
  };

  window.CONTENT_I18N["java:69"] = window.CONTENT_I18N["java:69"] || {};
  window.CONTENT_I18N["java:69"].th = {
    title: "GC ทำงานเมื่อไหร่",
    concept: "**Khi nào GC chạy?**\n\n- Khi bộ nhớ heap không đủ\n- Khi JVM xét thấy phù hợp (lập trình viên không thể điều khiển trực tiếp)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:69:en"
  };

  window.CONTENT_I18N["java:70"] = window.CONTENT_I18N["java:70"] || {};
  window.CONTENT_I18N["java:70"].th = {
    title: "เมื่อไหร่ที่ออบเจกต์กลายเป็นเป้าหมาย GC",
    concept: "**Khi nào đối tượng trở thành mục tiêu GC**\n\n```\nPoint p = new Point(1, 2);\np = new Point(3, 4);  // Point(1,2) đầu tiên trở thành mục tiêu GC\n// Hoặc:\np = null;  // Cắt tham chiếu khiến nó trở thành mục tiêu GC\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:70:en"
  };

  window.CONTENT_I18N["java:71"] = window.CONTENT_I18N["java:71"] || {};
  window.CONTENT_I18N["java:71"].th = {
    title: "ข้อควรระวังเกี่ยวกับหน่วยความจำ",
    concept: "**Lưu ý về bộ nhớ**\n\n- **OutOfMemoryError** — Xảy ra khi heap không đủ\n- **StackOverflowError** — Xảy ra khi đệ quy quá sâu",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:71:en"
  };

  window.CONTENT_I18N["java:72"] = window.CONTENT_I18N["java:72"] || {};
  window.CONTENT_I18N["java:72"].th = {
    title: "แบบฝึกหัด: บทที่ 4 (ส่วนที่ 2)",
    concept: "**【Đề bài】**\n\nSau khi tạo một số lượng lớn các instance không còn được sử dụng, thực thi `Runtime.getRuntime().gc()` và tạo chương trình kiểm tra theo dõi và hiển thị sự thay đổi của bộ nhớ trống trước và sau khi garbage collection.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:72:en"
  };

  window.CONTENT_I18N["java:73"] = window.CONTENT_I18N["java:73"] || {};
  window.CONTENT_I18N["java:73"].th = {
    title: "คอลเลกชัน (Collection) คืออะไร",
    concept: "**Collection là gì?**\n\nCác lớp Collection giúp quản lý nhiều đối tượng cùng nhau. Không giống mảng, kích thước của chúng thay đổi linh hoạt.\n\nCác interface Collection chính:\n- **List** — Có thứ tự, cho phép trùng lặp\n- **Set** — Không cho phép trùng lặp\n- **Map** — Lưu trữ theo cặp khóa-giá trị (key-value)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:73:en"
  };

  window.CONTENT_I18N["java:74"] = window.CONTENT_I18N["java:74"] || {};
  window.CONTENT_I18N["java:74"].th = {
    title: "ArrayList",
    concept: "**ArrayList**\n\n```\nimport java.util.ArrayList;\nArrayList<String> list = new ArrayList<>();\nlist.add(\"apple\");       // Thêm\nlist.add(\"banana\");\nlist.get(0);             // \"apple\" (truy cập theo chỉ mục)\nlist.size();             // 2\nlist.remove(0);          // Xóa chỉ mục 0\nlist.contains(\"banana\"); // true\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:74:en"
  };

  window.CONTENT_I18N["java:75"] = window.CONTENT_I18N["java:75"] || {};
  window.CONTENT_I18N["java:75"].th = {
    title: "HashMap",
    concept: "**HashMap**\n\n```\nimport java.util.HashMap;\nHashMap<String, Integer> map = new HashMap<>();\nmap.put(\"Tanaka\", 90);\nmap.put(\"Sato\", 85);\nmap.get(\"Tanaka\");        // 90\nmap.containsKey(\"Sato\");  // true\nmap.keySet();             // Tập hợp các key\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:75:en"
  };

  window.CONTENT_I18N["java:76"] = window.CONTENT_I18N["java:76"] || {};
  window.CONTENT_I18N["java:76"].th = {
    title: "HashSet",
    concept: "**HashSet**\n\n```\nimport java.util.HashSet;\nHashSet<String> set = new HashSet<>();\nset.add(\"apple\");\nset.add(\"apple\");  // Phần tử trùng bị bỏ qua\nset.size();        // 1\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:76:en"
  };

  window.CONTENT_I18N["java:77"] = window.CONTENT_I18N["java:77"] || {};
  window.CONTENT_I18N["java:77"].th = {
    title: "ลูป for-each (Enhanced for)",
    concept: "**Vòng lặp for-each (Enhanced for Loop)**\n\n```\nfor (String item : list) {\n    System.out.println(item);\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:77:en"
  };

  window.CONTENT_I18N["java:78"] = window.CONTENT_I18N["java:78"] || {};
  window.CONTENT_I18N["java:78"].th = {
    title: "เจเนริกส์ (Generics)",
    concept: "**Generics**\n\nBằng cách chỉ định tham số kiểu (type parameter) như `<String>`, bạn giới hạn kiểu đối tượng có thể lưu trong collection. Điều này đảm bảo an toàn kiểu dữ liệu và loại bỏ nhu cầu ép kiểu (casting).",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:78:en"
  };

  window.CONTENT_I18N["java:79"] = window.CONTENT_I18N["java:79"] || {};
  window.CONTENT_I18N["java:79"].th = {
    title: "แบบฝึกหัด: บทที่ 5 (ส่วนที่ 2)",
    concept: "**【Đề bài】**\n\nSử dụng `HashMap`, tạo một sổ điểm với key là \"tên sinh viên (String)\" và value là \"điểm số (Integer).\" Thêm dữ liệu cho 3 sinh viên, sau đó tìm kiếm và in ra điểm số của một sinh viên cụ thể.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:79:en"
  };

  window.CONTENT_I18N["java:80"] = window.CONTENT_I18N["java:80"] || {};
  window.CONTENT_I18N["java:80"].th = {
    title: "คลาสไม่ระบุชื่อ (Anonymous Class) คืออะไร",
    concept: "**Lớp ẩn danh (Anonymous Class) là gì?**\n\nBạn có thể định nghĩa và sử dụng một class không có tên ngay tại chỗ. Điều này thường được dùng khi triển khai interface.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:80:en"
  };

  window.CONTENT_I18N["java:81"] = window.CONTENT_I18N["java:81"] || {};
  window.CONTENT_I18N["java:81"].th = {
    title: "Functional Interface (อินเทอร์เฟซฟังก์ชัน)",
    concept: "**Functional Interface (Giao diện chức năng)**\n\nMột interface có chính xác một phương thức trừu tượng được gọi là **functional interface**. Biểu thức Lambda cung cấp cách viết ngắn gọn để triển khai chúng.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:81:en"
  };

  window.CONTENT_I18N["java:82"] = window.CONTENT_I18N["java:82"] || {};
  window.CONTENT_I18N["java:82"].th = {
    title: "ไวยากรณ์ Lambda Expression",
    concept: "**Cú pháp biểu thức Lambda**\n\n```\n// Lớp ẩn danh thông thường\nRunnable r = new Runnable() {\n    @Override\n    public void run() { System.out.println(\"Hello\"); }\n};\n\n// Biểu thức Lambda (ngắn gọn!)\nRunnable r = () -> System.out.println(\"Hello\");\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:82:en"
  };

  window.CONTENT_I18N["java:83"] = window.CONTENT_I18N["java:83"] || {};
  window.CONTENT_I18N["java:83"].th = {
    title: "รูปแบบย่อของ Lambda",
    concept: "**Dạng viết tắt của Lambda**\n\n```\n// Một tham số → có thể bỏ qua dấu ngoặc đơn\nx -> x * 2\n\n// Thân chỉ một dòng → có thể bỏ {} và return\n(a, b) -> a + b\n\n// Dạng đầy đủ\n(int a, int b) -> { return a + b; }\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:83:en"
  };

  window.CONTENT_I18N["java:84"] = window.CONTENT_I18N["java:84"] || {};
  window.CONTENT_I18N["java:84"].th = {
    title: "forEach กับ Lambda",
    concept: "**forEach với Lambda**\n\n```\nList<String> list = Arrays.asList(\"A\", \"B\", \"C\");\nlist.forEach(s -> System.out.println(s));\n// Hoặc:\nlist.forEach(System.out::println);  // Tham chiếu phương thức (method reference)\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:84:en"
  };

  window.CONTENT_I18N["java:85"] = window.CONTENT_I18N["java:85"] || {};
  window.CONTENT_I18N["java:85"].th = {
    title: "การเรียงลำดับด้วย Lambda",
    concept: "**Sắp xếp với biểu thức Lambda**\n\n```\nlist.sort((a, b) -> a.compareTo(b));  // Tăng dần\nlist.sort((a, b) -> b.compareTo(a));  // Giảm dần\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:85:en"
  };

  window.CONTENT_I18N["java:86"] = window.CONTENT_I18N["java:86"] || {};
  window.CONTENT_I18N["java:86"].th = {
    title: "แบบฝึกหัด: บทที่ 6 (ส่วนที่ 2)",
    concept: "**【Đề bài】**\n\nSử dụng biểu thức lambda và danh sách, nhân đôi mỗi phần tử của danh sách chứa 10, 20, 30 và in kết quả bằng `forEach` với biểu thức lambda.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:86:en"
  };

  window.CONTENT_I18N["java:87"] = window.CONTENT_I18N["java:87"] || {};
  window.CONTENT_I18N["java:87"].th = {
    title: "อินพุต/เอาต์พุตมาตรฐาน",
    concept: "**Đầu vào/Đầu ra chuẩn**\n\n- **Đầu ra chuẩn**: `System.out.println()` (hiển thị lên màn hình)\n- **Đầu vào chuẩn**: `Scanner scanner = new Scanner(System.in);` (nhập từ bàn phím)\n\n```\nimport java.util.Scanner;\nScanner sc = new Scanner(System.in);\nSystem.out.print(\"Enter name: \");\nString name = sc.nextLine();     // Đọc một dòng\nint age = sc.nextInt();          // Đọc số nguyên\nsc.close();\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:87:en"
  };

  window.CONTENT_I18N["java:88"] = window.CONTENT_I18N["java:88"] || {};
  window.CONTENT_I18N["java:88"].th = {
    title: "เขียนไฟล์",
    concept: "**Ghi vào file**\n\n```\nimport java.io.*;\n// Ghi cơ bản\nFileWriter fw = new FileWriter(\"test.txt\");\nfw.write(\"Hello, File!\");\nfw.close();\n\n// Ghi có đệm (nhanh hơn)\nBufferedWriter bw = new BufferedWriter(new FileWriter(\"test.txt\"));\nbw.write(\"Hello\");\nbw.newLine();\nbw.close();\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:88:en"
  };

  window.CONTENT_I18N["java:89"] = window.CONTENT_I18N["java:89"] || {};
  window.CONTENT_I18N["java:89"].th = {
    title: "อ่านไฟล์",
    concept: "**Đọc từ file**\n\n```\nBufferedReader br = new BufferedReader(new FileReader(\"test.txt\"));\nString line;\nwhile ((line = br.readLine()) != null) {\n    System.out.println(line);\n}\nbr.close();\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:89:en"
  };

  window.CONTENT_I18N["java:90"] = window.CONTENT_I18N["java:90"] || {};
  window.CONTENT_I18N["java:90"].th = {
    title: "try-with-resources",
    concept: "**try-with-resources**\n\nMột cú pháp tự động đóng các luồng (stream) (Java 7 trở lên):\n\n```\ntry (BufferedWriter bw = new BufferedWriter(new FileWriter(\"test.txt\"))) {\n    bw.write(\"Auto-close\");\n}  // close() được tự động gọi ở đây\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:90:en"
  };

  window.CONTENT_I18N["java:91"] = window.CONTENT_I18N["java:91"] || {};
  window.CONTENT_I18N["java:91"].th = {
    title: "Serialization (ซีเรียลไลเซชัน)",
    concept: "**Serialization (Tuần tự hóa)**\n\nMột cơ chế lưu và tải các đối tượng trực tiếp từ file. Class phải triển khai `Serializable`.\n\n```\nimport java.io.Serializable;\nclass Employee implements Serializable {\n    String name;\n    int id;\n}\n```\n\nGhi:\n\n```\nObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(\"emp.dat\"));\noos.writeObject(emp);\noos.close();\n```\n\nĐọc:\n\n```\nObjectInputStream ois = new ObjectInputStream(new FileInputStream(\"emp.dat\"));\nEmployee emp = (Employee) ois.readObject();\nois.close();\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:91:en"
  };

  window.CONTENT_I18N["java:92"] = window.CONTENT_I18N["java:92"] || {};
  window.CONTENT_I18N["java:92"].th = {
    title: "แบบฝึกหัด: บทที่ 7 (ส่วนที่ 2)",
    concept: "**【Đề bài】**\n\nSử dụng `ByteArrayOutputStream`, ghi chuỗi \"Java Advanced Learning Complete\" vào bộ nhớ, sau đó đọc lại từ mảng byte và in ra console.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:92:en"
  };

  window.CONTENT_I18N["java:93"] = window.CONTENT_I18N["java:93"] || {};
  window.CONTENT_I18N["java:93"].th = {
    title: "GUI คืออะไร",
    concept: "**GUI là gì?**\n\nGUI là viết tắt của Graphical User Interface (Giao diện người dùng đồ họa). Nó đề cập đến các ứng dụng sử dụng các thành phần trực quan như cửa sổ, nút bấm và trường văn bản.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:93:en"
  };

  window.CONTENT_I18N["java:94"] = window.CONTENT_I18N["java:94"] || {};
  window.CONTENT_I18N["java:94"].th = {
    title: "ไลบรารี Swing",
    concept: "**Thư viện Swing**\n\nThư viện chuẩn của Java để tạo GUI. Nó nằm trong package `javax.swing`.\n\nCác thành phần chính:\n\n- `JFrame` — Khung cửa sổ\n- `JButton` — Nút bấm\n- `JLabel` — Nhãn (hiển thị văn bản)\n- `JTextField` — Ô nhập văn bản một dòng\n- `JPanel` — Bảng để nhóm các thành phần",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:94:en"
  };

  window.CONTENT_I18N["java:95"] = window.CONTENT_I18N["java:95"] || {};
  window.CONTENT_I18N["java:95"].th = {
    title: "Layout Manager (ตัวจัดการเลย์เอาต์)",
    concept: "**Layout Manager (Trình quản lý bố cục)**\n\n- **FlowLayout** — Sắp xếp các thành phần theo chiều ngang (mặc định)\n- **BorderLayout** — Năm khu vực: trên, dưới, trái, phải, trung tâm\n- **GridLayout** — Sắp xếp theo dạng lưới",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:95:en"
  };

  window.CONTENT_I18N["java:96"] = window.CONTENT_I18N["java:96"] || {};
  window.CONTENT_I18N["java:96"].th = {
    title: "การจัดการเหตุการณ์ (Event Handling)",
    concept: "**Xử lý sự kiện (Event Handling)**\n\nCơ chế phản hồi các sự kiện như nhấn nút:\n\n```\nJButton btn = new JButton(\"Click\");\nbtn.addActionListener(e -> {\n    System.out.println(\"Button was pressed!\");\n});\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:96:en"
  };

  window.CONTENT_I18N["java:97"] = window.CONTENT_I18N["java:97"] || {};
  window.CONTENT_I18N["java:97"].th = {
    title: "หมายเหตุ",
    concept: "**Lưu ý**\n\nChương trình GUI yêu cầu cửa sổ Swing và không thể hiển thị trong môi trường sandbox này. Vui lòng chạy chúng trong IDE cục bộ của bạn.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:97:en"
  };

  window.CONTENT_I18N["java:98"] = window.CONTENT_I18N["java:98"] || {};
  window.CONTENT_I18N["java:98"].th = {
    title: "แบบฝึกหัด: บทที่ 8",
    concept: "**【Đề bài】**\n\nTổng kết kiến thức về GUI trong Swing. Tạo mã tạo và cấu hình các thành phần chính (`JFrame`, `JButton`) để xây dựng một GUI Java.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:98:en"
  };

  window.CONTENT_I18N["java:99"] = window.CONTENT_I18N["java:99"] || {};
  window.CONTENT_I18N["java:99"].th = {
    title: "กลไกการวาดรูปใน Java",
    concept: "**Cơ chế vẽ hình trong Java**\n\nViệc vẽ được thực hiện bằng cách kế thừa `JPanel` của Swing và ghi đè phương thức `paintComponent(Graphics g)`:\n\n```\nclass DrawPanel extends JPanel {\n    @Override\n    protected void paintComponent(Graphics g) {\n        super.paintComponent(g);\n        g.setColor(Color.RED);\n        g.fillRect(50, 50, 100, 80);  // Hình chữ nhật đặc\n        g.drawOval(200, 50, 80, 80);  // Hình ellipse (chỉ viền)\n        g.drawLine(0, 0, 300, 300);   // Đường thẳng\n    }\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:99:en"
  };

  window.CONTENT_I18N["java:100"] = window.CONTENT_I18N["java:100"] || {};
  window.CONTENT_I18N["java:100"].th = {
    title: "คลาส Graphics2D",
    concept: "**Lớp Graphics2D**\n\nBằng cách ép kiểu `Graphics` thành `Graphics2D`, bạn có thể sử dụng các tính năng vẽ nâng cao hơn:\n\n```\nGraphics2D g2 = (Graphics2D) g;\ng2.setStroke(new BasicStroke(3));  // Độ dày nét vẽ\ng2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,\n                    RenderingHints.VALUE_ANTIALIAS_ON);  // Khử răng cưa\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:100:en"
  };

  window.CONTENT_I18N["java:101"] = window.CONTENT_I18N["java:101"] || {};
  window.CONTENT_I18N["java:101"].th = {
    title: "ระบบพิกัด",
    concept: "**Hệ tọa độ**\n\nGóc trên cùng bên trái là (0, 0). Trục X tăng dần về bên phải, và trục Y tăng dần về phía dưới.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:101:en"
  };

  window.CONTENT_I18N["java:102"] = window.CONTENT_I18N["java:102"] || {};
  window.CONTENT_I18N["java:102"].th = {
    title: "เหตุการณ์เมาส์",
    concept: "**Sự kiện chuột**\n\nInterface `MouseListener` xử lý 5 loại sự kiện:\n\n- `mouseClicked` — Đã nhấp chuột\n- `mousePressed` — Nút chuột được nhấn xuống\n- `mouseReleased` — Nút chuột được thả ra\n- `mouseEntered` — Chuột đi vào thành phần\n- `mouseExited` — Chuột rời khỏi thành phần",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:102:en"
  };

  window.CONTENT_I18N["java:103"] = window.CONTENT_I18N["java:103"] || {};
  window.CONTENT_I18N["java:103"].th = {
    title: "หมายเหตุ",
    concept: "**Lưu ý**\n\nChương trình vẽ hình yêu cầu cửa sổ GUI và không thể thực thi trực tiếp trong môi trường sandbox này. Vui lòng sử dụng IDE cục bộ của bạn.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:103:en"
  };

  window.CONTENT_I18N["java:104"] = window.CONTENT_I18N["java:104"] || {};
  window.CONTENT_I18N["java:104"].th = {
    title: "แบบฝึกหัด: บทที่ 9",
    concept: "**【Đề bài】**\n\nSử dụng lớp `Graphics2D`, triển khai khung cho một phương thức vẽ hình chữ nhật bắt đầu tại vị trí (50, 50) với chiều rộng 200 và chiều cao 100.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:104:en"
  };

  window.CONTENT_I18N["java:105"] = window.CONTENT_I18N["java:105"] || {};
  window.CONTENT_I18N["java:105"].th = {
    title: "การเขียนโปรแกรมเครือข่ายใน Java",
    concept: "**Lập trình mạng trong Java**\n\nGiao tiếp TCP/IP có thể được triển khai bằng package `java.net`.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:105:en"
  };

  window.CONTENT_I18N["java:106"] = window.CONTENT_I18N["java:106"] || {};
  window.CONTENT_I18N["java:106"].th = {
    title: "แนวคิดพื้นฐาน",
    concept: "**Các khái niệm cơ bản**\n\n- **IP Address** — Địa chỉ của máy tính trên mạng\n- **Port Number** — Số xác định một ứng dụng trong máy tính (0 đến 65535)\n- **TCP** — Giao thức truyền thông tin cậy (đảm bảo dữ liệu được gửi đến)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:106:en"
  };

  window.CONTENT_I18N["java:107"] = window.CONTENT_I18N["java:107"] || {};
  window.CONTENT_I18N["java:107"].th = {
    title: "ฝั่ง Server",
    concept: "**Phía Server**\n\n```\nServerSocket serverSocket = new ServerSocket(8080);\nSocket socket = serverSocket.accept();  // Chờ kết nối từ client\n\n// Nhận dữ liệu\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString message = in.readLine();\n\n// Gửi dữ liệu\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"Hello!\");\n```\n\nĐóng tài nguyên khi hoàn tất:\n\n```\nin.close();\nout.close();\nsocket.close();\nserverSocket.close();\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:107:en"
  };

  window.CONTENT_I18N["java:108"] = window.CONTENT_I18N["java:108"] || {};
  window.CONTENT_I18N["java:108"].th = {
    title: "ฝั่ง Client",
    concept: "**Phía Client**\n\n```\nSocket socket = new Socket(\"localhost\", 8080);  // Kết nối đến server\n\nPrintWriter out = new PrintWriter(socket.getOutputStream(), true);\nout.println(\"Hello Server!\");  // Gửi\n\nBufferedReader in = new BufferedReader(\n    new InputStreamReader(socket.getInputStream()));\nString response = in.readLine();  // Nhận\n\nin.close();\nout.close();\nsocket.close();\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:108:en"
  };

  window.CONTENT_I18N["java:109"] = window.CONTENT_I18N["java:109"] || {};
  window.CONTENT_I18N["java:109"].th = {
    title: "หมายเหตุ",
    concept: "**Lưu ý**\n\nChương trình mạng yêu cầu cả chương trình server và client. Chúng không thể thực thi trực tiếp trong sandbox này, nhưng bạn có thể xem lại cấu trúc mã.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:109:en"
  };

  window.CONTENT_I18N["java:110"] = window.CONTENT_I18N["java:110"] || {};
  window.CONTENT_I18N["java:110"].th = {
    title: "แบบฝึกหัด: บทที่ 10",
    concept: "**【Đề bài】**\n\nSử dụng socket communication, tạo một bài kiểm tra kết nối phía client đơn giản gửi yêu cầu kết nối đến một cổng cụ thể trên localhost.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:110:en"
  };

  window.CONTENT_I18N["java:111"] = window.CONTENT_I18N["java:111"] || {};
  window.CONTENT_I18N["java:111"].th = {
    title: "Stream API (Java 8+)",
    concept: "**Stream API (Java 8+)**\n\nMột cơ chế mạnh mẽ để xử lý các phần tử collection theo phong cách hàm (functional):\n\n```\nimport java.util.stream.*;\n\nList<Integer> numbers = Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n\n// Lọc số chẵn, nhân đôi và tính tổng\nint result = numbers.stream()\n    .filter(n -> n % 2 == 0)     // Intermediate: lọc\n    .map(n -> n * 2)             // Intermediate: biến đổi\n    .reduce(0, Integer::sum);    // Terminal: tổng hợp\nSystem.out.println(result);  // 60\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:111:en"
  };

  window.CONTENT_I18N["java:112"] = window.CONTENT_I18N["java:112"] || {};
  window.CONTENT_I18N["java:112"].th = {
    title: "การดำเนินการ Stream หลัก",
    concept: "**Các thao tác Stream chính**\n\n- **Intermediate** `filter(predicate)` — Lọc theo điều kiện\n- **Intermediate** `map(function)` — Biến đổi phần tử\n- **Intermediate** `sorted()` — Sắp xếp\n- **Terminal** `collect()` — Chuyển đổi thành List, v.v.\n- **Terminal** `forEach()` — Xử lý từng phần tử\n- **Terminal** `count()` / `sum()` — Tổng hợp",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:112:en"
  };

  window.CONTENT_I18N["java:113"] = window.CONTENT_I18N["java:113"] || {};
  window.CONTENT_I18N["java:113"].th = {
    title: "Annotation (คำอธิบายประกอบ)",
    concept: "**Annotation (Chú thích)**\n\nMột cơ chế thêm metadata (thông tin bổ sung) vào mã:\n\n- `@Override` — Chỉ rõ phương thức đang ghi đè\n- `@Deprecated` — Đánh dấu phương thức không còn được khuyến khích sử dụng\n- `@SuppressWarnings` — Ẩn cảnh báo\n- `@FunctionalInterface` — Chỉ rõ đây là functional interface",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:113:en"
  };

  window.CONTENT_I18N["java:114"] = window.CONTENT_I18N["java:114"] || {};
  window.CONTENT_I18N["java:114"].th = {
    title: "enum (ชนิดแจงนับ)",
    concept: "**enum (Kiểu liệt kê)**\n\nMột kiểu dùng để biểu diễn một tập hợp các lựa chọn cố định:\n\n```\nenum Season { SPRING, SUMMER, AUTUMN, WINTER }\nSeason s = Season.SUMMER;\nSystem.out.println(s);  // SUMMER\n```\n\nEnum cũng có thể có trường và phương thức:\n\n```\nenum Color {\n    RED(\"#FF0000\"), GREEN(\"#00FF00\"), BLUE(\"#0000FF\");\n    \n    private String hexCode;\n    Color(String hexCode) { this.hexCode = hexCode; }\n    public String getHexCode() { return hexCode; }\n}\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:114:en"
  };

  window.CONTENT_I18N["java:115"] = window.CONTENT_I18N["java:115"] || {};
  window.CONTENT_I18N["java:115"].th = {
    title: "แบบฝึกหัด: บทที่ 11",
    concept: "**【Đề bài】**\n\nSử dụng Stream API, trích xuất các số chẵn từ danh sách số nguyên 1 đến 10, nhân ba mỗi số đó và tính tổng bằng cách triển khai chỉ trong gần một dòng.\n\nHãy xem mẫu class `Main` trong trình soạn thảo bên phải, sau đó hoàn thành chương trình để đáp ứng yêu cầu. Khi hoàn tất, nhấn nút \"Run\" để kiểm tra kết quả.",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/java_en.js:java:115:en"
  };

})();
