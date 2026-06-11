/* Study Tools Content I18n — Python Vietnamese Derived Language Pack POC v1 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["python:1"] = window.CONTENT_I18N["python:1"] || {};
  window.CONTENT_I18N["python:1"].vi = {
    title: "Cách máy tính hoạt động",
    concept: "Máy tính hoạt động thông qua sự phối hợp của các thành phần phần cứng chính:\n\n- **CPU (Bộ xử lý trung tâm)** — \"Bộ não\" của máy tính, thực hiện các phép tính ở tốc độ cao\n- **Bộ nhớ (RAM)** — Lưu trữ tạm thời dữ liệu chương trình đang chạy (bị xóa khi tắt nguồn)\n- **Ổ cứng (SSD/HDD)** — Lưu trữ tệp tin vĩnh viễn, kể cả khi tắt máy",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:1:en"
  };

  window.CONTENT_I18N["python:2"] = window.CONTENT_I18N["python:2"] || {};
  window.CONTENT_I18N["python:2"].vi = {
    title: "Ngôn ngữ con người và ngôn ngữ máy tính",
    concept: "Con người giao tiếp bằng ngôn ngữ tự nhiên, nhưng máy tính chỉ hiểu được **nhị phân** (0 và 1), gọi là **ngôn ngữ máy**. Mã do con người viết phải được dịch sang ngôn ngữ máy bởi một **trình thông dịch (interpreter)** hoặc **trình biên dịch (compiler)**. Python sử dụng trình thông dịch để dịch mã từng dòng một.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:2:en"
  };

  window.CONTENT_I18N["python:3"] = window.CONTENT_I18N["python:3"] || {};
  window.CONTENT_I18N["python:3"].vi = {
    title: "Các ngôn ngữ lập trình khác nhau",
    concept: "Có rất nhiều ngôn ngữ lập trình trên thế giới, mỗi ngôn ngữ phù hợp với các mục đích khác nhau:\n\n- **Python** — Cú pháp đơn giản, tuyệt vời cho AI, phân tích dữ liệu và tự động hóa\n- **Java** — Ổn định và được sử dụng rộng rãi trong các hệ thống doanh nghiệp và ứng dụng Android\n- **C++** — Hiệu suất cao, được sử dụng trong game engine và lập trình hệ thống\n\nKhông có ngôn ngữ nào là tốt nhất; hãy chọn công cụ phù hợp cho công việc phù hợp.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:3:en"
  };

  window.CONTENT_I18N["python:4"] = window.CONTENT_I18N["python:4"] || {};
  window.CONTENT_I18N["python:4"].vi = {
    title: "Khởi động Command Prompt",
    concept: "**CUI (Giao diện người dùng dạng ký tự)** cho phép bạn vận hành máy tính bằng cách gõ lệnh thay vì dùng chuột. Trên Windows, bạn có thể sử dụng **Command Prompt** hoặc **PowerShell**. Điều này rất cần thiết để chạy chương trình Python từ dòng lệnh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:4:en"
  };

  window.CONTENT_I18N["python:5"] = window.CONTENT_I18N["python:5"] || {};
  window.CONTENT_I18N["python:5"].vi = {
    title: "Đường dẫn tệp (Tuyệt đối và Tương đối)",
    concept: "**Đường dẫn** là \"địa chỉ\" cho biết vị trí của một tệp hoặc thư mục:\n\n- **Đường dẫn tuyệt đối** — Đường dẫn đầy đủ bắt đầu từ thư mục gốc (ví dụ: `C:/Users/Coco/main.py`). Nó hoạt động bất kể bạn đang ở đâu.\n- **Đường dẫn tương đối** — Đường dẫn tương đối so với thư mục làm việc hiện tại (ví dụ: `./main.py` hoặc `../data.txt`)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:5:en"
  };

  window.CONTENT_I18N["python:6"] = window.CONTENT_I18N["python:6"] || {};
  window.CONTENT_I18N["python:6"].vi = {
    title: "Sử dụng lệnh dòng lệnh",
    concept: "Các lệnh phổ biến cho dòng lệnh:\n\n- `dir` — Liệt kê tệp và thư mục (Windows)\n- `ls` — Liệt kê tệp và thư mục (Mac/Linux)\n- `cd folderName` — Chuyển đến thư mục con\n- `cd ..` — Quay lại thư mục cha\n- `python --version` — Kiểm tra phiên bản Python đã cài đặt",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:6:en"
  };

  window.CONTENT_I18N["python:7"] = window.CONTENT_I18N["python:7"] || {};
  window.CONTENT_I18N["python:7"].vi = {
    title: "Chuẩn bị trước khi cài đặt",
    concept: "Trước khi cài đặt Python, hãy kiểm tra thông tin hệ thống máy tính của bạn:\n\n- Máy tính là **Windows** hay **macOS**?\n- Nếu là Windows, đó là bản **64-bit** hay **32-bit**? (Hầu hết máy tính hiện đại là 64-bit)\n- Đảm bảo bạn có quyền quản trị viên",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:7:en"
  };

  window.CONTENT_I18N["python:8"] = window.CONTENT_I18N["python:8"] || {};
  window.CONTENT_I18N["python:8"].vi = {
    title: "Các ứng dụng cần thiết",
    concept: "Để bắt đầu học Python, bạn cần ba công cụ cốt lõi:\n\n1. **Trình thông dịch Python** — Công cụ chạy mã của bạn\n2. **Trình soạn thảo văn bản (VS Code, Atom, v.v.)** — Để viết tệp `.py` với tô màu cú pháp\n3. **Terminal/Console** — Để chạy tập lệnh và xem kết quả",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:8:en"
  };

  window.CONTENT_I18N["python:9"] = window.CONTENT_I18N["python:9"] || {};
  window.CONTENT_I18N["python:9"].vi = {
    title: "Cài đặt Python",
    concept: "Khi cài đặt Python trên Windows, có một bước quan trọng:\n\n⚠️ **Hãy đánh dấu \"Add python.exe to PATH\" trong trình cài đặt!**\n\nThao tác này đăng ký vị trí của Python vào biến môi trường PATH của hệ thống, cho phép bạn chạy `python` từ bất kỳ thư mục nào trong dòng lệnh. Nếu không làm vậy, gõ `python` sẽ báo lỗi \"command not found\".",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:9:en"
  };

  window.CONTENT_I18N["python:10"] = window.CONTENT_I18N["python:10"] || {};
  window.CONTENT_I18N["python:10"].vi = {
    title: "Cài đặt trình soạn thảo mã nguồn",
    concept: "Sau khi cài đặt trình soạn thảo mã nguồn (như VS Code hoặc Atom), hãy thực hiện các bước sau:\n\n1. Tạo một tệp mới\n2. Lưu với phần mở rộng `.py` (ví dụ: `hello.py`)\n3. Trình soạn thảo sẽ nhận dạng đó là mã Python và bật tô màu cú pháp (văn bản được tô màu)\n\nPhần mở rộng `.py` hoạt động như một thẻ căn cước — nó báo cho trình soạn thảo bắt đầu phân tích Python, tô sáng từ khóa và thậm chí gắn cờ các lỗi tiềm ẩn.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:10:en"
  };

  window.CONTENT_I18N["python:11"] = window.CONTENT_I18N["python:11"] || {};
  window.CONTENT_I18N["python:11"].vi = {
    title: "Bài tập ôn tập Chương 1",
    concept: "Đây là bài kiểm tra ôn tập bao gồm những gì bạn đã học trong Chương 1: cách máy tính hoạt động, thao tác dòng lệnh và thiết lập môi trường Python.\n\nCác câu hỏi kiểm tra sự hiểu biết của bạn về:\n- Cách CPU, bộ nhớ và ổ cứng phối hợp hoạt động\n- Cách điều hướng thư mục và liệt kê tệp trong dòng lệnh\n- Bước quan trọng là đánh dấu \"Add python.exe to PATH\" khi cài đặt Python",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:11:en"
  };

  window.CONTENT_I18N["python:12"] = window.CONTENT_I18N["python:12"] || {};
  window.CONTENT_I18N["python:12"].vi = {
    title: "Chế độ tương tác và Chương trình đầu tiên (hello.py)",
    concept: "Để hiển thị văn bản trên màn hình trong Python, hãy sử dụng hàm `print()`.\n\nĐặt văn bản bạn muốn hiển thị trong dấu nháy đơn (`'`) hoặc dấu nháy kép (`\"`) và viết như `print('Hello')`.\n\n**Lỗi thường gặp cho người mới bắt đầu:** Python phân biệt chữ hoa chữ thường. `print` phải được viết bằng chữ thường — `Print` sẽ gây ra lỗi `NameError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:12:en"
  };

  window.CONTENT_I18N["python:13"] = window.CONTENT_I18N["python:13"] || {};
  window.CONTENT_I18N["python:13"].vi = {
    title: "Chạy tệp tập lệnh (hello2.py)",
    concept: "Sử dụng hàm `print()` để hiển thị văn bản trên màn hình. Đặt văn bản trong dấu nháy đơn (`'`) hoặc dấu nháy kép (`\"`), ví dụ `print('Hello')`.\n\nMột tệp tập lệnh có thể chứa nhiều câu lệnh `print()` và mỗi câu lệnh sẽ xuất ra một dòng theo thứ tự. Bạn có thể in chuỗi, số và thậm chí cả kết quả tính toán như `print(3+4)`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:13:en"
  };

  window.CONTENT_I18N["python:14"] = window.CONTENT_I18N["python:14"] || {};
  window.CONTENT_I18N["python:14"].vi = {
    title: "Khái niệm cơ bản về chú thích (comment.py)",
    concept: "**Chú thích** là một ghi chú trong mã nguồn không ảnh hưởng đến cách chương trình chạy. Viết chú thích một dòng bằng cách đặt `#` ở đầu dòng. Bạn cũng có thể sử dụng dấu nháy ba (`'''`) cho chú thích nhiều dòng.\n\nChú thích bị trình thông dịch Python bỏ qua và chỉ dành cho người đọc.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:14:en"
  };

  window.CONTENT_I18N["python:15"] = window.CONTENT_I18N["python:15"] || {};
  window.CONTENT_I18N["python:15"].vi = {
    title: "Chú thích nhiều dòng (comment2.py)",
    concept: "Ngoài chú thích một dòng với `#`, bạn có thể viết **chú thích nhiều dòng** bằng cách đặt văn bản trong dấu nháy ba (`'''`).\n\nMọi thứ giữa `'''` mở đầu và `'''` kết thúc được coi là chú thích và sẽ không được Python thực thi.\n\nĐiều này hữu ích cho các giải thích dài hơn hoặc tạm thời vô hiệu hóa các khối mã.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:15:en"
  };

  window.CONTENT_I18N["python:16"] = window.CONTENT_I18N["python:16"] || {};
  window.CONTENT_I18N["python:16"].vi = {
    title: "Lỗi thụt lề với dấu nháy ba (comment_A1.py)",
    concept: "Python kiểm tra nghiêm ngặt **thụt lề** (khoảng trắng ở đầu dòng) như một phần của quy tắc cú pháp. Ngay cả các dòng chú thích cũng có thể gây ra lỗi `IndentationError` nếu chúng có khoảng trắng đầu dòng không phù hợp.\n\nNếu một khối chú thích dùng dấu nháy ba bắt đầu với thụt lề không mong đợi, Python có thể báo lỗi `IndentationError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:16:en"
  };

  window.CONTENT_I18N["python:17"] = window.CONTENT_I18N["python:17"] || {};
  window.CONTENT_I18N["python:17"].vi = {
    title: "Lỗi thụt lề chú thích (comment_A2.py)",
    concept: "Python kiểm tra nghiêm ngặt **thụt lề** (khoảng trắng ở đầu dòng). Ngay cả một dòng chú thích `#` với khoảng trắng đầu dòng không phù hợp cũng sẽ báo lỗi `IndentationError`.\n\nHãy đảm bảo thụt lề của bạn nhất quán, ngay cả trên những dòng mà Python sẽ bỏ qua (như chú thích).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:17:en"
  };

  window.CONTENT_I18N["python:18"] = window.CONTENT_I18N["python:18"] || {};
  window.CONTENT_I18N["python:18"].vi = {
    title: "Bài tập: Tính toán và xuất không dùng biến (script01.py)",
    concept: "**Bài tập thực hành — Chương 2 (script01.py)**\n\nNhiệm vụ: Thực hiện các phép tính và xuất kết quả mà không sử dụng biến.\n\nXem mã mẫu trong trình soạn thảo và điền vào các phần còn thiếu để hoàn thành chương trình. Nhấn nút Run bên phải để kiểm tra kết quả.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:18:en"
  };

  window.CONTENT_I18N["python:19"] = window.CONTENT_I18N["python:19"] || {};
  window.CONTENT_I18N["python:19"].vi = {
    title: "Tìm hiểu về kiểu dữ liệu",
    concept: "**Kiểu dữ liệu** định nghĩa loại dữ liệu mà một giá trị thuộc về. Python có một số kiểu cơ bản:\n\n- **int** — Số nguyên (không có phần thập phân), như `10` hoặc `-5`\n- **float** — Số thực dấu phẩy động (có phần thập phân), như `3.14` hoặc `2.0`\n- **str** — Chuỗi văn bản được đặt trong dấu nháy, như `'Hello'`\n- **bool** — Giá trị logic, hoặc `True` hoặc `False`\n\nSử dụng `type()` để kiểm tra kiểu dữ liệu của bất kỳ giá trị nào.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:19:en"
  };

  window.CONTENT_I18N["python:20"] = window.CONTENT_I18N["python:20"] || {};
  window.CONTENT_I18N["python:20"].vi = {
    title: "Dữ liệu số (int và float)",
    concept: "Dữ liệu số có hai loại chính:\n\n- **int (integer)** — Số nguyên không có phần thập phân, ví dụ: `10`, `-5`, `0`\n- **float (floating-point)** — Số có phần thập phân, ví dụ: `3.14`, `2.0`, `-0.5`\n\nPython tự động chuyển đổi kiểu trong quá trình tính toán. Ví dụ, chia hai số nguyên với `/` luôn trả về float (ví dụ: `5 / 2` cho kết quả `2.5`).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:20:en"
  };

  window.CONTENT_I18N["python:21"] = window.CONTENT_I18N["python:21"] || {};
  window.CONTENT_I18N["python:21"].vi = {
    title: "Dữ liệu chuỗi (str)",
    concept: "**Chuỗi (str)** là dữ liệu biểu diễn văn bản. Chuỗi phải được đặt trong dấu nháy đơn (`'`) hoặc dấu nháy kép (`\"`).\n\nVí dụ: `'Hello'` hoặc `\"Python\"`.\n\nNếu bạn quên dấu nháy, Python sẽ cố gắng hiểu văn bản đó là tên biến hoặc từ khóa, điều này sẽ gây ra lỗi `NameError` hoặc `SyntaxError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:21:en"
  };

  window.CONTENT_I18N["python:22"] = window.CONTENT_I18N["python:22"] || {};
  window.CONTENT_I18N["python:22"].vi = {
    title: "Dữ liệu Boolean (bool)",
    concept: "Kiểu **bool (boolean)** chỉ có hai giá trị khả dĩ: `True` (đúng/có) hoặc `False` (sai/không). Boolean đóng vai trò quan trọng trong việc rẽ nhánh có điều kiện (câu lệnh if).\n\n**Quan trọng:** `True` và `False` phải được viết hoa chữ cái đầu. Viết `true` hoặc `false` (chữ thường) sẽ gây ra lỗi `NameError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:22:en"
  };

  window.CONTENT_I18N["python:23"] = window.CONTENT_I18N["python:23"] || {};
  window.CONTENT_I18N["python:23"].vi = {
    title: "Số học cơ bản (enzanshi01.py)",
    concept: "Python hỗ trợ một số toán tử số học: `+` (cộng), `-` (trừ), `*` (nhân), `/` (chia), `//` (chia lấy phần nguyên), `%` (chia lấy phần dư) và `**` (lũy thừa).\n\nHãy cẩn thận: cộng trực tiếp một số và một chuỗi sẽ gây ra lỗi `TypeError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:23:en"
  };

  window.CONTENT_I18N["python:24"] = window.CONTENT_I18N["python:24"] || {};
  window.CONTENT_I18N["python:24"].vi = {
    title: "Nối chuỗi (enzanshi02.py)",
    concept: "Bạn có thể nối (ghép) các chuỗi lại với nhau bằng toán tử `+`. Ví dụ: `'Hello!' + 'Python'` tạo ra `'Hello!Python'`.\n\nSử dụng dấu nháy ba (`'''`) cho phép bạn tạo chuỗi nhiều dòng bao gồm cả ngắt dòng.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:24:en"
  };

  window.CONTENT_I18N["python:25"] = window.CONTENT_I18N["python:25"] || {};
  window.CONTENT_I18N["python:25"].vi = {
    title: "Lỗi kiểu (Chuỗi và Số) (enzanshi03.py)",
    concept: "Python sử dụng `+`, `-`, `*`, `/`, `//`, `%` và `**` cho các phép tính số học. Nếu bạn cố gắng cộng một số và một chuỗi trực tiếp (ví dụ: `'Số: ' + 5`), Python sẽ báo lỗi `TypeError` vì bạn không thể kết hợp các kiểu dữ liệu khác nhau mà không chuyển đổi tường minh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:25:en"
  };

  window.CONTENT_I18N["python:26"] = window.CONTENT_I18N["python:26"] || {};
  window.CONTENT_I18N["python:26"].vi = {
    title: "Chuyển đổi kiểu với str() (enzanshi04.py)",
    concept: "Để kết hợp một số với một chuỗi, hãy chuyển đổi số thành chuỗi bằng `str()`. Ví dụ: `'Giá trị: ' + str(5)` hoạt động chính xác.\n\nThứ tự ưu tiên toán tử: phép nhân `*` và phép chia `/` được tính trước phép cộng `+` và phép trừ `-`. Sử dụng dấu ngoặc đơn `()` để thay đổi thứ tự tính toán.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:26:en"
  };

  window.CONTENT_I18N["python:27"] = window.CONTENT_I18N["python:27"] || {};
  window.CONTENT_I18N["python:27"].vi = {
    title: "Chuyển đổi kiểu với int() (enzanshi05.py)",
    concept: "Sử dụng `int()` để chuyển đổi chuỗi thành số nguyên. Ví dụ: `5 + int('3')` cho kết quả `8`.\n\nPhép nhân `*` và phép chia `/` có độ ưu tiên cao hơn phép cộng `+` và phép trừ `-`. Sử dụng dấu ngoặc đơn `()` để kiểm soát thứ tự các phép tính.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:27:en"
  };

  window.CONTENT_I18N["python:28"] = window.CONTENT_I18N["python:28"] || {};
  window.CONTENT_I18N["python:28"].vi = {
    title: "Chuyển đổi kiểu với float() (enzanshi06.py)",
    concept: "Sử dụng `float()` để chuyển đổi chuỗi thành số thực dấu phẩy động. Ví dụ: `5 + float('3.000')` cho kết quả `8.0`.\n\nBạn có thể xâu chuỗi các chuyển đổi: `int(float('3.000'))` đầu tiên chuyển đổi chuỗi thành float, sau đó thành số nguyên, cho kết quả `3`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:28:en"
  };

  window.CONTENT_I18N["python:29"] = window.CONTENT_I18N["python:29"] || {};
  window.CONTENT_I18N["python:29"].vi = {
    title: "Định nghĩa và sử dụng biến (hensu01.py)",
    concept: "**Biến** là một vùng chứa có tên để lưu trữ giá trị. Sử dụng `=` để gán giá trị, như `x = 10`. Biến có thể được gán lại với giá trị mới.\n\n**Quy tắc đặt tên biến:** Phải bắt đầu bằng chữ cái hoặc dấu gạch dưới, không được bắt đầu bằng chữ số. Ví dụ: `1num` là không hợp lệ.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:29:en"
  };

  window.CONTENT_I18N["python:30"] = window.CONTENT_I18N["python:30"] || {};
  window.CONTENT_I18N["python:30"].vi = {
    title: "Gán giá trị cho biến (hensu02.py)",
    concept: "**Biến** lưu trữ một giá trị và có thể được gán lại. Sử dụng `tên_biến = giá_trị` để lưu trữ dữ liệu. Giá trị ở bên phải của `=` được lưu vào biến ở bên trái.\n\nBiến có thể chứa các kiểu dữ liệu khác nhau và có thể được gán lại với một kiểu hoàn toàn khác (ví dụ: từ số thành chuỗi).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:30:en"
  };

  window.CONTENT_I18N["python:31"] = window.CONTENT_I18N["python:31"] || {};
  window.CONTENT_I18N["python:31"].vi = {
    title: "Tính toán sử dụng biến (hensu03.py)",
    concept: "**Biến** là một vùng chứa có tên để lưu trữ giá trị. Gán giá trị bằng `x = 10`. Giá trị có thể được thay đổi thông qua việc gán lại.\n\nBiến có thể được sử dụng trong các biểu thức số học. Ví dụ: nếu `num1 = 5` và `num2 = 3`, bạn có thể viết `result = num1 + num2` để tính và lưu tổng. Sử dụng `type()` để kiểm tra kiểu dữ liệu của một biến.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:31:en"
  };

  window.CONTENT_I18N["python:32"] = window.CONTENT_I18N["python:32"] || {};
  window.CONTENT_I18N["python:32"].vi = {
    title: "Xuất biến và văn bản cùng nhau (hensu04.py)",
    concept: "Python hỗ trợ **toán tử gán kết hợp** kết hợp một phép tính với phép gán. Ví dụ: `a = a + 1` có thể được viết ngắn gọn hơn là `a += 1`.\n\nBạn cũng có thể gán cùng một giá trị cho nhiều biến cùng lúc: `a = b = c = 0`.\n\nSử dụng dấu phẩy trong `print()` để xuất nhiều mục: `print(msg, num1)`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:32:en"
  };

  window.CONTENT_I18N["python:33"] = window.CONTENT_I18N["python:33"] || {};
  window.CONTENT_I18N["python:33"].vi = {
    title: "Ghi đè giá trị biến (hensu06.py)",
    concept: "Sử dụng toán tử gán kết hợp như `+=` để cập nhật giá trị biến một cách ngắn gọn. Ví dụ: `num1 += 3` cộng thêm 3 vào `num1`.\n\nBạn cũng có thể gán cùng một giá trị ban đầu cho nhiều biến: `a = b = c = 0`.\n\nKhi một biến được gán từ một biến khác (`num2 = num1`), `num2` nhận một bản sao của giá trị. Thay đổi `num1` sau đó KHÔNG ảnh hưởng đến `num2`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:33:en"
  };

  window.CONTENT_I18N["python:34"] = window.CONTENT_I18N["python:34"] || {};
  window.CONTENT_I18N["python:34"].vi = {
    title: "Gán biến này cho biến khác (hensu05.py)",
    concept: "Để nối một số với một chuỗi, hãy chuyển đổi số thành chuỗi bằng `str()` (ép kiểu). Hoặc, sử dụng **f-string**: `f'Giá trị là {val}'` cho phép bạn nhúng biến trực tiếp vào bên trong chuỗi bằng dấu ngoặc nhọn `{}`.\n\nKhi bạn gán biến này cho biến khác (`num2 = num1`), `num2` sao chép giá trị hiện tại của `num1`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:34:en"
  };

  window.CONTENT_I18N["python:35"] = window.CONTENT_I18N["python:35"] || {};
  window.CONTENT_I18N["python:35"].vi = {
    title: "Cập nhật giá trị của chính biến (hensu07.py)",
    concept: "Để nối một số với một chuỗi, hãy sử dụng `str()` để ép kiểu số thành chuỗi. Một cách tiếp cận khác là sử dụng f-strings: `f'Giá trị là {val}'` để nhúng biến trực tiếp.\n\nMột biến có thể được cập nhật bằng cách sử dụng giá trị hiện tại của chính nó: `num1 = num1 + 3` đọc giá trị cũ, cộng thêm 3 và lưu kết quả trở lại vào `num1`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:35:en"
  };

  window.CONTENT_I18N["python:36"] = window.CONTENT_I18N["python:36"] || {};
  window.CONTENT_I18N["python:36"].vi = {
    title: "Toán tử gán kết hợp (+=) (hensu08.py)",
    concept: "Toán tử gán kết hợp rút ngắn mã khi cập nhật biến. Ví dụ:\n- `num1 += 3` là cách viết ngắn của `num1 = num1 + 3`\n- `num1 -= 3` là cách viết ngắn của `num1 = num1 - 3`\n- `num1 *= 3` là cách viết ngắn của `num1 = num1 * 3`",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:36:en"
  };

  window.CONTENT_I18N["python:37"] = window.CONTENT_I18N["python:37"] || {};
  window.CONTENT_I18N["python:37"].vi = {
    title: "Toán tử gán kết hợp chuỗi (hensu09.py)",
    concept: "Toán tử gán kết hợp cũng hoạt động với chuỗi:\n- `str1 += 'def'` thêm 'def' vào cuối chuỗi hiện tại (tương đương với `str1 = str1 + 'def'`)\n- `str1 *= 3` lặp lại chuỗi 3 lần (tương đương với `str1 = str1 * 3`)\n\nSử dụng `str()` để chuyển đổi số thành chuỗi và f-strings (`f'văn bản {var}'`) để nhúng biến một cách gọn gàng hơn.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:37:en"
  };

  window.CONTENT_I18N["python:38"] = window.CONTENT_I18N["python:38"] || {};
  window.CONTENT_I18N["python:38"].vi = {
    title: "Nhập dữ liệu từ bàn phím (input01.py)",
    concept: "Sử dụng `input()` để lấy dữ liệu nhập từ người dùng qua bàn phím. Giá trị trả về bởi `input()` **luôn là chuỗi (str)**, ngay cả khi người dùng gõ một số.\n\nĐể sử dụng dữ liệu nhập trong tính toán số, bạn phải chuyển đổi nó bằng `int()` hoặc `float()`, ví dụ `int(input())`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:38:en"
  };

  window.CONTENT_I18N["python:39"] = window.CONTENT_I18N["python:39"] || {};
  window.CONTENT_I18N["python:39"].vi = {
    title: "Nối các giá trị nhập vào (input02.py)",
    concept: "Sử dụng `input()` để nhận dữ liệu từ bàn phím. Giá trị trả về **luôn là chuỗi (str)**.\n\nNếu bạn yêu cầu người dùng nhập hai số và sử dụng `+` trực tiếp, nó sẽ **nối chúng dưới dạng chuỗi** thay vì cộng số học. Ví dụ: nhập 5 và 3 cho kết quả `'5' + '3' = '53'`, không phải `8`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:39:en"
  };

  window.CONTENT_I18N["python:40"] = window.CONTENT_I18N["python:40"] || {};
  window.CONTENT_I18N["python:40"].vi = {
    title: "Chuyển đổi đầu vào thành số và tính toán (input03.py)",
    concept: "Sử dụng `input()` để nhận dữ liệu từ bàn phím. Vì `input()` luôn trả về chuỗi, bạn phải ép kiểu bằng `int()` hoặc `float()` trước khi sử dụng trong các phép tính số.\n\nVí dụ:\n```\nstr1 = input('Nhập số thứ 1: ')\nnum1 = int(str1)\nstr2 = input('Nhập số thứ 2: ')\nnum2 = int(str2)\nprint(num1 + num2)\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:40:en"
  };

  window.CONTENT_I18N["python:41"] = window.CONTENT_I18N["python:41"] || {};
  window.CONTENT_I18N["python:41"].vi = {
    title: "Nhap va Chuyen doi Dong thoi (input04.py)",
    concept: "Ban co the ket hop `input()` va `int()` tren mot dong cho ngan gon:\n```\nnum1 = int(input('Nhap so thu 1: '))\nnum2 = int(input('Nhap so thu 2: '))\nprint(num1 + num2)\n```\n\nHay nho: `input()` luon tra ve chuoi. Ban phai chuyen doi no bang `int()` hoac `float()` truoc khi thuc hien cac phep tinh so hoc.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:41:en"
  };

  window.CONTENT_I18N["python:42"] = window.CONTENT_I18N["python:42"] || {};
  window.CONTENT_I18N["python:42"].vi = {
    title: "Bai tap: Xac dinh va Xac nhan Kieu du lieu Bieu thuc (script3-1.py)",
    concept: "**Bai tap Thuc hanh - Chuong 3 (script3-1.py)**\n\nNhiem vu: Xac dinh va xac nhan kieu du lieu cua cac bieu thuc khac nhau.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu. Su dung `type()` ben trong `print()` de hien thi kieu du lieu cua moi bieu thuc, vi du `print(type(1 + 2))`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:42:en"
  };

  window.CONTENT_I18N["python:43"] = window.CONTENT_I18N["python:43"] || {};
  window.CONTENT_I18N["python:43"].vi = {
    title: "Bai tap: Nhap chuoi va Noi chuoi (script3-2.py)",
    concept: "**Bai tap Thuc hanh - Chuong 3 (script3-2.py)**\n\nNhiem vu: Nhap ho va ten, sau do noi chung va xuat ket qua.\n\nKiem tra ma mau va dien vao cac phan con thieu. Su dung `input()` de doc ho va ten cua nguoi dung, sau do ket hop chung bang `+` va in ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:43:en"
  };

  window.CONTENT_I18N["python:44"] = window.CONTENT_I18N["python:44"] || {};
  window.CONTENT_I18N["python:44"].vi = {
    title: "Bai tap: Nhap so va Phep tinh So hoc (script3-3.py)",
    concept: "**Bai tap Thuc hanh - Chuong 3 (script3-3.py)**\n\nNhiem vu: Nhap hai so nguyen va tinh tich cua chung.\n\nKiem tra ma mau va dien vao cac phan con thieu. Su dung `int()` de chuyen doi chuoi nhap thanh so nguyen, sau do thuc hien phep cong, phep tru va hien thi ket qua da dinh dang bang cach noi chuoi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:44:en"
  };

  window.CONTENT_I18N["python:45"] = window.CONTENT_I18N["python:45"] || {};
  window.CONTENT_I18N["python:45"].vi = {
    title: "So sanh Bang nhau Gia tri (hikaku01.py)",
    concept: "**Toan tu so sanh** so sanh hai gia tri va tra ve ket qua boolean (`True` hoac `False`):\n- `==` - Bang nhau\n- `!=` - Khong bang nhau\n- `>` - Lon hon\n- `<` - Nho hon\n- `>=` - Lon hon hoac bang\n- `<=` - Nho hon hoac bang\n\n**Loi thuong gap:** Su dung `==` de so sanh (hai dau bang). Mot dau `=` la de gan va se gay loi ben trong dieu kien `if`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:45:en"
  };

  window.CONTENT_I18N["python:46"] = window.CONTENT_I18N["python:46"] || {};
  window.CONTENT_I18N["python:46"].vi = {
    title: "So sanh Lon nho So (hikaku02.py)",
    concept: "Cac toan tu so sanh so sanh hai gia tri va tra ve `True` hoac `False`. Cac toan tu co san: `==`, `!=`, `>`, `<`, `>=`, `<=`.\n\n**Loi thuong gap:**\n- Luon dat dau hai cham `:` o cuoi cau lenh `if`\n- Luon thut le khoi lenh ben trong voi 4 khoang trang\n- Thieu dau hai cham hoac thut le sai gay ra `IndentationError` hoac `SyntaxError`",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:46:en"
  };

  window.CONTENT_I18N["python:47"] = window.CONTENT_I18N["python:47"] || {};
  window.CONTENT_I18N["python:47"].vi = {
    title: "So sanh Chuoi (hikaku03.py)",
    concept: "Cac toan tu so sanh cung hoat dong voi chuoi. Python so sanh chuoi theo thu tu tu dien (thu tu bang chu cai dua tren ma ky tu Unicode).\n\nVi du, `'a' < 'c'` cho ket qua `True` boi vi 'a' dung truoc 'c' theo bang chu cai.\n\nLuon bao gom dau hai cham `:` sau `if`, va thut le than voi 4 khoang trang.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:47:en"
  };

  window.CONTENT_I18N["python:48"] = window.CONTENT_I18N["python:48"] || {};
  window.CONTENT_I18N["python:48"].vi = {
    title: "So sanh Chuoi Tieng Nhat (hikaku04.py)",
    concept: "Cac toan tu so sanh cung hoat dong voi cac ky tu khong phai tieng Anh nhu chu Han. Python so sanh chung dua tren diem ma Unicode cua chung.\n\nVi du nay su dung cau truc `if-else`:\n- Khoi `if` chay khi dieu kien la `True`\n- Khoi `else` chay khi dieu kien la `False`\n\nLuon nho dau hai cham `:` va thut le dung!",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:48:en"
  };

  window.CONTENT_I18N["python:49"] = window.CONTENT_I18N["python:49"] || {};
  window.CONTENT_I18N["python:49"].vi = {
    title: "So sanh Gia tri voi Bien (hikaku05.py)",
    concept: "Cac toan tu so sanh co the so sanh bien va gia tri. Vi du:\n```\na = 10\nb = 10\nif a >= b:\n    print('a lon hon hoac bang b')\n```\n\n**Loi thuong gap:**\n- Su dung `==` de so sanh bang nhau, khong phai `=`\n- Luon dat `:` o cuoi dong `if`\n- Thut le khoi if voi 4 khoang trang",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:49:en"
  };

  window.CONTENT_I18N["python:50"] = window.CONTENT_I18N["python:50"] || {};
  window.CONTENT_I18N["python:50"].vi = {
    title: "Xet dieu kien voi Gia tri Boolean (hikaku06.py)",
    concept: "Ban co the su dung mot bien boolean truc tiep trong dieu kien `if`. Vi du:\n```\nb = True\nif b:\n    print('b la True')\n```\n\nKhong can viet `if b == True` - chi can `if b:` la du.\n\n**Loi thuong gap:** Dung quen dau hai cham `:` va thut le 4 khoang trang.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:50:en"
  };

  window.CONTENT_I18N["python:51"] = window.CONTENT_I18N["python:51"] || {};
  window.CONTENT_I18N["python:51"].vi = {
    title: "Nhanh if Don gian (if01.py)",
    concept: "Su dung cau lenh `if` de re nhanh dua tren mot dieu kien. Khi dieu kien la `True`, khoi lenh duoc thut le (4 khoang trang) se duoc thuc thi.\n\n```\nif condition:\n    # ma chay khi True\n```\n\nNeu dieu kien la `False`, khoi lenh duoc thut le se duoc bo qua va viec thuc thi tiep tuc sau khoi if.\n\n**Loi thuong gap:** Dung quen dau hai cham `:` va thut le 4 khoang trang.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:51:en"
  };

  window.CONTENT_I18N["python:52"] = window.CONTENT_I18N["python:52"] || {};
  window.CONTENT_I18N["python:52"].vi = {
    title: "Nhanh Ba chieu voi if-elif (ifelif01.py)",
    concept: "De tao ba nhanh hoac nhieu hon, su dung `elif` (viet tat cua \"else if\"). Cac dieu kien duoc danh gia tu tren xuong duoi, va chi khoi dau tien co dieu kien `True` moi duoc thuc thi.\n\n```\nif condition1:\n    # chay neu condition1 la True\nelif condition2:\n    # chay neu condition2 la True (va condition1 la False)\nelse:\n    # chay neu khong co dieu kien nao la True\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:52:en"
  };

  window.CONTENT_I18N["python:53"] = window.CONTENT_I18N["python:53"] || {};
  window.CONTENT_I18N["python:53"].vi = {
    title: "Nhanh Hai chieu voi if-else (ifelse01.py)",
    concept: "Su dung `if-else` de xu ly ca hai kha nang: mot khoi thuc thi khi dieu kien la `True`, va mot khoi khac thuc thi khi no la `False`.\n\n```\nif condition:\n    # chay khi True\nelse:\n    # chay khi False\n```\n\n**Loi thuong gap:** Dung quen dau hai cham `:` sau ca `if` va `else`. Su dung thut le 4 khoang trang cho ca hai khoi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:53:en"
  };

  window.CONTENT_I18N["python:54"] = window.CONTENT_I18N["python:54"] || {};
  window.CONTENT_I18N["python:54"].vi = {
    title: "Su dung Nhieu cau lenh elif (ifelif02.py)",
    concept: "Ban co the xich nhieu cau lenh `elif` de xu ly nhieu dieu kien co the xay ra. Python danh gia chung tu tren xuong duoi va chi thuc thi khoi phu hop dau tien.\n\n```\nif condition1:\n    ...\nelif condition2:\n    ...\nelif condition3:\n    ...\nelse:\n    # chay neu khong co dieu kien nao o tren dung\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:54:en"
  };

  window.CONTENT_I18N["python:55"] = window.CONTENT_I18N["python:55"] || {};
  window.CONTENT_I18N["python:55"].vi = {
    title: "Cau lenh if Long nhau (ifnest01.py)",
    concept: "Ban co the dat mot cau lenh `if` ben trong mot cau lenh `if` khac. Day duoc goi la **long nhau**. Moi cap do long them 4 khoang trang thut le.\n\n```\nif outer_condition:\n    # +4 spaces\n    if inner_condition:\n        # +8 spaces\n        print('Ca hai dieu kien deu dung')\n```\n\nLong nhau cho phep ban kiem tra nhieu dieu kien theo trinh tu, giong nhu mo khoa truoc khi mo hop ben trong.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:55:en"
  };

  window.CONTENT_I18N["python:56"] = window.CONTENT_I18N["python:56"] || {};
  window.CONTENT_I18N["python:56"].vi = {
    title: "Phep AND Logic (and01.py)",
    concept: "Toan tu `and` ket hop nhieu dieu kien. Ket qua tong the la `True` chi khi **ca hai** dieu kien deu la `True`.\n\n```\nif a < 10 and a >= 0:\n    print('a nam giua 0 va 9')\n```\n\nDieu nay tuong duong voi viec viet hai cau lenh `if` long nhau, nhung ngan gon hon.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:56:en"
  };

  window.CONTENT_I18N["python:57"] = window.CONTENT_I18N["python:57"] || {};
  window.CONTENT_I18N["python:57"].vi = {
    title: "So sanh Xich (and02.py)",
    concept: "Python cho phep **so sanh xich** de viet ma gon hon. Thay vi `if a < 10 and a >= 0`, ban co the viet:\n\n```\nif 0 <= a < 10:\n    print('a nam giua 0 va 9')\n```\n\nCach viet nay doc tu nhien nhu mot bat dang thuc toan hoc va de doc hon so voi dung `and`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:57:en"
  };

  window.CONTENT_I18N["python:58"] = window.CONTENT_I18N["python:58"] || {};
  window.CONTENT_I18N["python:58"].vi = {
    title: "Phep OR Logic (or01.py)",
    concept: "Toan tu `or` ket hop nhieu dieu kien. Ket qua tong the la `True` neu **it nhat mot** trong cac dieu kien la `True`.\n\n```\nif a > 10 or a <= 0:\n    print('a nam ngoai pham vi 0-10')\n```\n\n`or` la `True` khi mot trong hai ben (hoac ca hai) la `True`. No la `False` chi khi ca hai ben deu la `False`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:58:en"
  };

  window.CONTENT_I18N["python:59"] = window.CONTENT_I18N["python:59"] || {};
  window.CONTENT_I18N["python:59"].vi = {
    title: "Phep NOT Logic (not01.py)",
    concept: "Toan tu `not` **dao nguoc** mot gia tri boolean. `not True` tro thanh `False`, va `not False` tro thanh `True`.\n\n```\nif not a < 10:\n    print('a KHONG nho hon 10')\n```\n\n`not` la toan tu mot ngoi - no hoat dong tren mot dieu kien hoac gia tri duy nhat, dao nguoc gia tri chan ly cua no.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:59:en"
  };

  window.CONTENT_I18N["python:60"] = window.CONTENT_I18N["python:60"] || {};
  window.CONTENT_I18N["python:60"].vi = {
    title: "Dao nguoc Boolean (not02.py)",
    concept: "Su dung `not` de dao nguoc mot gia tri boolean duoc luu trong bien:\n\n```\nb = False\nif not b:\n    print('b khong phai la True')\n```\n\nVi `not False` bang `True`, khoi `if` se thuc thi.\n\n**Loi thuong gap:** Dung quen dau hai cham `:` sau dong `if`, va su dung thut le 4 khoang trang cho khoi lenh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:60:en"
  };

  window.CONTENT_I18N["python:61"] = window.CONTENT_I18N["python:61"] || {};
  window.CONTENT_I18N["python:61"].vi = {
    title: "Cot: Kiem tra Ton tai Gia tri (column01.py)",
    concept: "Toan tu `not` dao nguoc ket qua cua mot dieu kien. `not True` tro thanh `False`, va `not False` tro thanh `True`. Cot nay cung de cap den tinh dung sai (truthiness) cua cac gia tri so trong bieu thuc dieu kien.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:61:en"
  };

  window.CONTENT_I18N["python:62"] = window.CONTENT_I18N["python:62"] || {};
  window.CONTENT_I18N["python:62"].vi = {
    title: "Cot: Toan tu Ba ngoi (Bieu thuc Dieu kien) (column02.py)",
    concept: "Toan tu `not` dao nguoc ket qua cua mot dieu kien. `not True` tro thanh `False`, va `not False` tro thanh `True`. Cot nay de cap den viec su dung bieu thuc dieu kien (toan tu ba ngoi) de gan gia tri mot cach ngan gon dua tren mot dieu kien.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:62:en"
  };

  window.CONTENT_I18N["python:63"] = window.CONTENT_I18N["python:63"] || {};
  window.CONTENT_I18N["python:63"].vi = {
    title: "Bai tap: So Duong, So Am, hoac So Khong (script4-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 4 (script4-1.py)**\n\nNhiem vu: Xac dinh mot so nguyen la so duong, so am, hay so khong.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:63:en"
  };

  window.CONTENT_I18N["python:64"] = window.CONTENT_I18N["python:64"] || {};
  window.CONTENT_I18N["python:64"].vi = {
    title: "Bai tap: So sanh Hai So (script4-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 4 (script4-2.py)**\n\nNhiem vu: Nhap hai so thuc va so sanh do lon cua chung.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:64:en"
  };

  window.CONTENT_I18N["python:65"] = window.CONTENT_I18N["python:65"] || {};
  window.CONTENT_I18N["python:65"].vi = {
    title: "Bai tap: Loi Chao Tu Dong Theo Thoi Gian (script4-3.py)",
    concept: "**Bai tap Thuc hanh Chuong 4 (script4-3.py)**\n\nNhiem vu: In mot loi chao dua tren thoi gian nhap vao theo dinh dang 24 gio.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu. Su dung so sanh xich va `or` de kiem tra nhieu khung thoi gian.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:65:en"
  };

  window.CONTENT_I18N["python:66"] = window.CONTENT_I18N["python:66"] || {};
  window.CONTENT_I18N["python:66"].vi = {
    title: "Tao va Xuat Danh sach (list01.py)",
    concept: "**Danh sach (list)** la mot tap hop luu tru nhieu gia tri cung nhau, giong nhu mot mang. Tao danh sach bang dau ngoac vuong `[]` voi cac phan tu cach nhau bang dau phay. Truy cap phan tu bang `list[index]`. Hay nho rang **chi so bat dau tu 0**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:66:en"
  };

  window.CONTENT_I18N["python:67"] = window.CONTENT_I18N["python:67"] || {};
  window.CONTENT_I18N["python:67"].vi = {
    title: "Danh sach Long nhau (list02.py)",
    concept: "**Danh sach (list)** la mot tap hop luu tru nhieu gia tri cung nhau. Danh sach co the **long nhau** - mot danh sach co the chua mot danh sach khac nhu mot phan tu. Tao danh sach bang dau ngoac vuong `[]`. Cac phan tu duoc truy cap bang `list[index]`, va **chi so bat dau tu 0**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:67:en"
  };

  window.CONTENT_I18N["python:68"] = window.CONTENT_I18N["python:68"] || {};
  window.CONTENT_I18N["python:68"].vi = {
    title: "Truy cap Phan tu bang Chi so (list03.py)",
    concept: "**Danh sach (list)** luu tru nhieu gia tri trong dau ngoac vuong `[]`. Truy cap tung phan tu bang `list[index]`. **Chi so bat dau tu 0**, vi vay `list[0]` cho phan tu dau tien, `list[1]` cho phan tu thu hai, v.v.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:68:en"
  };

  window.CONTENT_I18N["python:69"] = window.CONTENT_I18N["python:69"] || {};
  window.CONTENT_I18N["python:69"].vi = {
    title: "Su dung Chi so Am (list04.py)",
    concept: "**Danh sach (list)** luu tru nhieu gia tri trong dau ngoac vuong `[]`. Python ho tro **chi so am**: `list[-1]` tra ve phan tu cuoi cung, `list[-2]` tra ve phan tu ke cuoi, v.v. Day la mot cach thuan tien de truy cap cac phan tu tu cuoi danh sach.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:69:en"
  };

  window.CONTENT_I18N["python:70"] = window.CONTENT_I18N["python:70"] || {};
  window.CONTENT_I18N["python:70"].vi = {
    title: "Cat: Lay mot Pham vi Phan tu (list05.py)",
    concept: "**Danh sach (list)** luu tru nhieu gia tri trong dau ngoac vuong `[]`. Su dung **cat (slicing)** (`list[start:end]`) de trich xuat mot danh sach con. Chi so bat dau duoc bao gom, nhung chi so ket thuc **bi loai tru**. Vi du, `lst[1:3]` tra ve cac phan tu tai vi tri 1 va 2.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:70:en"
  };

  window.CONTENT_I18N["python:71"] = window.CONTENT_I18N["python:71"] || {};
  window.CONTENT_I18N["python:71"].vi = {
    title: "Luoc bo Diem Bat dau va Ket thuc Cat (list06.py)",
    concept: "**Danh sach (list)** luu tru nhieu gia tri trong dau ngoac vuong `[]`. Trong mot phep cat `list[start:end]`, ban co the **luoc bo** chi so bat dau hoac ket thuc. `lst[:2]` lay cac phan tu tu dau den (nhung khong bao gom) chi so 2. `lst[1:]` lay cac phan tu tu chi so 1 den cuoi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:71:en"
  };

  window.CONTENT_I18N["python:72"] = window.CONTENT_I18N["python:72"] || {};
  window.CONTENT_I18N["python:72"].vi = {
    title: "Giai nen Danh sach (list07.py)",
    concept: "Cac thao tac danh sach pho bien bao gom:\n\n- `append(value)` - Them vao cuoi\n- `insert(position, value)` - Chen vao vi tri cu the\n- `pop(position)` - Xoa va tra ve phan tu tai mot vi tri\n- `remove(value)` - Xoa phan tu dau tien trung khop\n- `del list[position]` - Xoa theo vi tri\n\n**Giai nen (unpacking)** gan moi phan tu danh sach cho mot bien: `a, b, c = lst`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:72:en"
  };

  window.CONTENT_I18N["python:73"] = window.CONTENT_I18N["python:73"] || {};
  window.CONTENT_I18N["python:73"].vi = {
    title: "Loi Khong khop So luong Phan tu Giai nen (list08.py)",
    concept: "Cac thao tac danh sach pho bien bao gom `append()`, `insert()`, `pop()`, `remove()`, va `del`. Khi giai nen mot danh sach vao cac bien, so luong bien **phai khop** voi so luong phan tu. Neu ban viet `a, b = lst` nhung `lst` co 3 phan tu, Python se bao loi **ValueError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:73:en"
  };

  window.CONTENT_I18N["python:74"] = window.CONTENT_I18N["python:74"] || {};
  window.CONTENT_I18N["python:74"].vi = {
    title: "Kiem tra Ton tai voi `in` (list09.py)",
    concept: "Cac thao tac danh sach pho bien bao gom `append()`, `insert()`, `pop()`, `remove()`, va `del`. Su dung toan tu `in` de kiem tra xem mot gia tri co ton tai trong danh sach khong: `'abc' in lst` tra ve `True` hoac `False`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:74:en"
  };

  window.CONTENT_I18N["python:75"] = window.CONTENT_I18N["python:75"] || {};
  window.CONTENT_I18N["python:75"].vi = {
    title: "Tim Vi tri Phan tu voi index() (list10.py)",
    concept: "Cac thao tac danh sach pho bien bao gom `append()`, `insert()`, `pop()`, `remove()`, va `del`. Su dung `list.index(value)` de tim vi tri chi so cua mot phan tu cu the. Neu phan tu khong ton tai, Python se bao loi **ValueError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:75:en"
  };

  window.CONTENT_I18N["python:76"] = window.CONTENT_I18N["python:76"] || {};
  window.CONTENT_I18N["python:76"].vi = {
    title: "Sua doi Phan tu theo Chi so (list11.py)",
    concept: "Cac thao tac danh sach pho bien bao gom `append()`, `insert()`, `pop()`, `remove()`, va `del`. Ban co the sua doi mot phan tu danh sach bang cach gan gia tri moi cho mot chi so: `lst[1] = 6.2`. Danh sach co the **thay doi duoc (mutable)**, nghia la noi dung cua chung co the thay doi sau khi tao.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:76:en"
  };

  window.CONTENT_I18N["python:77"] = window.CONTENT_I18N["python:77"] || {};
  window.CONTENT_I18N["python:77"].vi = {
    title: "Noi Danh sach voi += (list12.py)",
    concept: "Cac thao tac danh sach pho bien bao gom `append()`, `insert()`, `pop()`, `remove()`, va `del`. Su dung toan tu `+=` de mo rong danh sach voi cac phan tu tu danh sach khac: `lst += [20]` them 20 vao cuoi `lst`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:77:en"
  };

  window.CONTENT_I18N["python:78"] = window.CONTENT_I18N["python:78"] || {};
  window.CONTENT_I18N["python:78"].vi = {
    title: "Them Phan tu voi append() (list13.py)",
    concept: "Cac thao tac danh sach pho bien bao gom `append()`, `insert()`, `pop()`, `remove()`, va `del`. Su dung `list.append(value)` de them mot phan tu vao **cuoi** danh sach. Day la cach pho bien nhat de mo rong danh sach mot cach dong.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:78:en"
  };

  window.CONTENT_I18N["python:79"] = window.CONTENT_I18N["python:79"] || {};
  window.CONTENT_I18N["python:79"].vi = {
    title: "Chen Phan tu tai Vi tri voi insert() (list14.py)",
    concept: "Cac thao tac danh sach nang cao bao gom tim kiem, sap xep, va sao chep:\n\n- `index(value)` - Lay chi so cua mot gia tri\n- `count(value)` - Dem cac phan tu trung khop\n- `sort()` - Sap xep theo thu tu tang dan\n- `reverse()` - Dao nguoc thu tu\n- `copy()` - Tao mot ban sao nong\n\nSu dung `insert(position, value)` de chen tai mot chi so cu the.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:79:en"
  };

  window.CONTENT_I18N["python:80"] = window.CONTENT_I18N["python:80"] || {};
  window.CONTENT_I18N["python:80"].vi = {
    title: "Xoa Phan tu voi del (list15.py)",
    concept: "Cac thao tac danh sach nang cao bao gom `index()`, `count()`, `sort()`, `reverse()`, va `copy()`. Su dung `del list[index]` de xoa vinh vien mot phan tu tai mot vi tri cu the tu danh sach hoac tu dien.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:80:en"
  };

  window.CONTENT_I18N["python:81"] = window.CONTENT_I18N["python:81"] || {};
  window.CONTENT_I18N["python:81"].vi = {
    title: "Lay va Xoa Phan tu voi pop() (list16.py)",
    concept: "Cac thao tac danh sach nang cao bao gom `index()`, `count()`, `sort()`, `reverse()`, va `copy()`. Su dung `list.pop(index)` de **xoa va tra ve** mot phan tu tai mot vi tri nhat dinh. Neu khong co chi so duoc cung cap, `pop()` se xoa va tra ve phan tu **cuoi cung**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:81:en"
  };

  window.CONTENT_I18N["python:82"] = window.CONTENT_I18N["python:82"] || {};
  window.CONTENT_I18N["python:82"].vi = {
    title: "Xoa theo Gia tri voi remove() (list17.py)",
    concept: "Cac thao tac danh sach nang cao bao gom `index()`, `count()`, `sort()`, `reverse()`, va `copy()`. Su dung `list.remove(value)` de xoa **lan xuat hien dau tien** cua mot gia tri cu the khoi danh sach. Neu khong tim thay gia tri, Python se bao loi **ValueError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:82:en"
  };

  window.CONTENT_I18N["python:83"] = window.CONTENT_I18N["python:83"] || {};
  window.CONTENT_I18N["python:83"].vi = {
    title: "Xoa An toan bang cach Kiem tra Ton tai Truoc (list18.py)",
    concept: "Cac thao tac danh sach nang cao bao gom `index()`, `count()`, `sort()`, `reverse()`, va `copy()`. De tranh loi khi xoa, truoc tien hay kiem tra gia tri co ton tai bang `in`: `if 'XYZ' in lst:` truoc khi goi `lst.remove('XYZ')`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:83:en"
  };

  window.CONTENT_I18N["python:84"] = window.CONTENT_I18N["python:84"] || {};
  window.CONTENT_I18N["python:84"].vi = {
    title: "Lay Do dai Danh sach voi len() (list19.py)",
    concept: "Cac thao tac danh sach nang cao bao gom `index()`, `count()`, `sort()`, `reverse()`, va `copy()`. Su dung `len(list)` de lay so luong phan tu trong danh sach. `len()` la mot ham built-in cua Python hoat dong tren list, tuple, string va cac collection khac.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:84:en"
  };

  window.CONTENT_I18N["python:85"] = window.CONTENT_I18N["python:85"] || {};
  window.CONTENT_I18N["python:85"].vi = {
    title: "Lay Phan tu Cuoi cung Mot cach An toan (list20.py)",
    concept: "Cac thao tac danh sach nang cao bao gom `index()`, `count()`, `sort()`, `reverse()`, va `copy()`. De lay phan tu cuoi cung mot cach an toan, hay su dung `list[len(list) - 1]`. Ban cung co the dung chi so am: `list[-1]` don gian va pho bien hon.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:85:en"
  };

  window.CONTENT_I18N["python:86"] = window.CONTENT_I18N["python:86"] || {};
  window.CONTENT_I18N["python:86"].vi = {
    title: "Cot: min() va max() (listcolumn01.py)",
    concept: "Cac thao tac danh sach nang cao bao gom `index()`, `count()`, `sort()`, `reverse()`, va `copy()`. Su dung `min(list)` de lay gia tri nho nhat va `max(list)` de lay gia tri lon nhat. Cac ham built-in nay hoat dong tren bat ky iterable nao chua cac phan tu co the so sanh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:86:en"
  };

  window.CONTENT_I18N["python:87"] = window.CONTENT_I18N["python:87"] || {};
  window.CONTENT_I18N["python:87"].vi = {
    title: "Cot: Loi Cuc tri voi Kieu du lieu Hon hop (listcolumn02.py)",
    concept: "Cac thao tac danh sach nang cao bao gom `index()`, `count()`, `sort()`, `reverse()`, va `copy()`. `min()` va `max()` **khong** hoat dong tren cac danh sach chua nhieu kieu du lieu khac nhau (vi du, so va chuoi). Co gang so sanh cac kieu khong tuong thich se gay ra **TypeError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:87:en"
  };

  window.CONTENT_I18N["python:88"] = window.CONTENT_I18N["python:88"] || {};
  window.CONTENT_I18N["python:88"].vi = {
    title: "Loi Thay doi Tuple (tuple01.py)",
    concept: "**Tuple** tuong tu nhu list, nhung cac phan tu cua no **khong the bi thay doi, them hoac xoa** sau khi tao. Tao tuple bang dau ngoac don `()`. Su dung tuple khi ban muon bao ve du lieu khoi viec vo tinh thay doi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:88:en"
  };

  window.CONTENT_I18N["python:89"] = window.CONTENT_I18N["python:89"] || {};
  window.CONTENT_I18N["python:89"].vi = {
    title: "Tao va Su dung Tuple (tuple02.py)",
    concept: "**Tuple** tuong tu nhu list, nhung cac phan tu cua no **khong the bi thay doi, them hoac xoa** sau khi tao. Tao tuple bang dau ngoac don `()`. Tuple la **bat bien (immutable)** — hay su dung chung khi du lieu can duoc giu nguyen trong suot chuong trinh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:89:en"
  };

  window.CONTENT_I18N["python:90"] = window.CONTENT_I18N["python:90"] || {};
  window.CONTENT_I18N["python:90"].vi = {
    title: "Tao Tuple Mot Phan tu (tuple03.py)",
    concept: "**Tuple** la mot collection bat bien duoc tao bang dau ngoac don `()`. De tao tuple voi mot phan tu, ban **phai** them dau phay o cuoi: `(10,)`. Viet `(10)` ma khong co dau phay se tao ra mot so nguyen, khong phai tuple.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:90:en"
  };

  window.CONTENT_I18N["python:91"] = window.CONTENT_I18N["python:91"] || {};
  window.CONTENT_I18N["python:91"].vi = {
    title: "Truy cap va Cat Tuple (tuple04.py)",
    concept: "**Tuple** la mot collection bat bien duoc tao bang dau ngoac don `()`. Mac du tuple khong the bi thay doi, ban **co the** doc cac phan tu bang chi so (`tpl[1]`) va cat (`tpl[1:3]`) — giong nhu list.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:91:en"
  };

  window.CONTENT_I18N["python:92"] = window.CONTENT_I18N["python:92"] || {};
  window.CONTENT_I18N["python:92"].vi = {
    title: "Lay Do dai Tuple voi len() (tuple05.py)",
    concept: "**Tuple** la mot collection bat bien duoc tao bang dau ngoac don `()`. Su dung `len(tuple)` de lay so luong phan tu. Toan tu `in` cung hoat dong voi tuple: `3.14 in tpl` tra ve `True` hoac `False`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:92:en"
  };

  window.CONTENT_I18N["python:93"] = window.CONTENT_I18N["python:93"] || {};
  window.CONTENT_I18N["python:93"].vi = {
    title: "Cot: Chuyen doi giua List va Tuple (tuplecolumun.py)",
    concept: "**Tuple** la mot collection bat bien. Chuyen tuple thanh list bang `list(tuple)` de co the thay doi. Chuyen list thanh tuple bang `tuple(list)` de lam cho no bat bien. Vice chuyen doi nay huu ich khi ban can tam thoi thay doi du lieu tuple.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:93:en"
  };

  window.CONTENT_I18N["python:94"] = window.CONTENT_I18N["python:94"] || {};
  window.CONTENT_I18N["python:94"].vi = {
    title: "Tao va Xuat Tu dien (jisho01.py)",
    concept: "**Tu dien (dict)** luu tru cac cap key-value. Tao tu dien bang dau ngoac nhon `{}` voi cu phap `{key: value}`. Truy cap phan tu bang key cua chung qua `dict[key]`, khong phai bang chi so. Cac key la duy nhat va cung cap kha nang tra cuu nhanh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:94:en"
  };

  window.CONTENT_I18N["python:95"] = window.CONTENT_I18N["python:95"] || {};
  window.CONTENT_I18N["python:95"].vi = {
    title: "Hanh vi khi Key Bi Trung (jisho02.py)",
    concept: "**Tu dien (dict)** luu tru cac cap key-value bang dau ngoac nhon `{}`. Cac key cua tu dien phai **duy nhat**. Neu ban chi dinh cung mot key hai lan, **gia tri sau cung se ghi de** len gia tri truoc do. Khong co loi nao duoc bao ra — gia tri cua key bi trung don gian la bi thay the.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:95:en"
  };

  window.CONTENT_I18N["python:96"] = window.CONTENT_I18N["python:96"] || {};
  window.CONTENT_I18N["python:96"].vi = {
    title: "Lay Gia tri theo Key (jisho03.py)",
    concept: "**Tu dien (dict)** luu tru cac cap key-value. Truy xuat gia tri bang key cua no qua cu phap ngoac vuong: `dct[key]`. Neu key khong ton tai, Python se bao loi **KeyError**. Khong giong list, tu dien khong su dung chi so.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:96:en"
  };

  window.CONTENT_I18N["python:97"] = window.CONTENT_I18N["python:97"] || {};
  window.CONTENT_I18N["python:97"].vi = {
    title: "Loi Tu dien Khong ho tro Cat (jisho04.py)",
    concept: "**Tu dien (dict)** luu tru cac cap key-value. Tu dien **khong ho tro cat** nhu list. Co gang su dung cu phap cat nhu `dct[:2]` tren tu dien se gay ra **TypeError**, boi vi tu dien khong co thu tu va duoc truy cap bang key, khong phai vi tri.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:97:en"
  };

  window.CONTENT_I18N["python:98"] = window.CONTENT_I18N["python:98"] || {};
  window.CONTENT_I18N["python:98"].vi = {
    title: "Lay Gia tri An toan voi get() (jisho05.py)",
    concept: "**Tu dien (dict)** luu tru cac cap key-value. Su dung `dict.get(key)` de truy cap an toan — no tra ve `None` (hoac gia tri mac dinh) neu key khong ton tai, thay vi gay ra **KeyError**. Vi du, `dct.get(999, 'khong tim thay')` tra ve `'khong tim thay'` neu key 999 bi thieu.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:98:en"
  };

  window.CONTENT_I18N["python:99"] = window.CONTENT_I18N["python:99"] || {};
  window.CONTENT_I18N["python:99"].vi = {
    title: "Cap nhat Gia tri theo Key (jisho06.py)",
    concept: "Cac thao tac tu dien bao gom:\n\n- `d[new_key] = value` — Them mot cap key-value moi\n- `d[existing_key] = value` — Cap nhat mot gia tri hien co\n- `d.get(key)` — Lay gia tri mot cach an toan\n- `d.pop(key)` — Xoa mot key va tra ve gia tri cua no\n- `d.keys()` — Lay tat ca key, `d.values()` — Lay tat ca gia tri",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:99:en"
  };

  window.CONTENT_I18N["python:100"] = window.CONTENT_I18N["python:100"] || {};
  window.CONTENT_I18N["python:100"].vi = {
    title: "Them Cap Key-Value Moi (jisho07.py)",
    concept: "Cac thao tac tu dien bao gom them, cap nhat va xoa cac muc. De them mot cap key-value moi, gan gia tri cho mot key moi: `dct[201] = 'ABC'`. Neu key da ton tai, gia tri se bi **cap nhat** thay vi them moi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:100:en"
  };

  window.CONTENT_I18N["python:101"] = window.CONTENT_I18N["python:101"] || {};
  window.CONTENT_I18N["python:101"].vi = {
    title: "Xoa Phan tu Tu dien voi del (jisho08.py)",
    concept: "Cac thao tac tu dien bao gom them, cap nhat va xoa cac muc. Su dung `del dict[key]` de xoa mot cap key-value cu the. Neu key khong ton tai, Python se bao loi **KeyError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:101:en"
  };

  window.CONTENT_I18N["python:102"] = window.CONTENT_I18N["python:102"] || {};
  window.CONTENT_I18N["python:102"].vi = {
    title: "Loi khi Xoa Key Khong Ton tai (jisho09.py)",
    concept: "Cac thao tac tu dien bao gom them, cap nhat va xoa cac muc. Su dung `del dict[key]` tren mot key **khong ton tai** se gay ra **KeyError**. Luon kiem tra su ton tai bang `in` hoac su dung phuong thuc `pop()` de xu ly key bi thieu mot cach an toan.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:102:en"
  };

  window.CONTENT_I18N["python:103"] = window.CONTENT_I18N["python:103"] || {};
  window.CONTENT_I18N["python:103"].vi = {
    title: "Xoa An toan bang cach Kiem tra Ton tai Truoc (jisho10.py)",
    concept: "Cac thao tac tu dien bao gom them, cap nhat va xoa cac muc. De xoa mot cach an toan, truoc tien hay kiem tra key co ton tai bang `in`: `if 999 in dct:` truoc khi goi `del dct[999]`. Dieu nay ngan chan **KeyError**.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:103:en"
  };

  window.CONTENT_I18N["python:104"] = window.CONTENT_I18N["python:104"] || {};
  window.CONTENT_I18N["python:104"].vi = {
    title: "Lay Danh sach Tat ca Key voi keys() (jisho11.py)",
    concept: "Cac thao tac tu dien bao gom them, cap nhat va xoa cac muc. Su dung `dict.keys()` de lay mot view dong cua tat ca key. Cac thay doi doi voi tu dien duoc phan anh trong keys view. Su dung `list(dict.keys())` de chuyen doi no thanh list.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:104:en"
  };

  window.CONTENT_I18N["python:105"] = window.CONTENT_I18N["python:105"] || {};
  window.CONTENT_I18N["python:105"].vi = {
    title: "Lay Cap Key-Value voi items() (jisho12.py)",
    concept: "Cac thao tac tu dien bao gom them, cap nhat va xoa cac muc. Su dung `dict.items()` de lay mot view dong cua tat ca cap key-value duoi dang tuple. Cac thay doi doi voi tu dien duoc phan anh trong items view.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:105:en"
  };

  window.CONTENT_I18N["python:106"] = window.CONTENT_I18N["python:106"] || {};
  window.CONTENT_I18N["python:106"].vi = {
    title: "Kiem tra Ton tai Gia tri voi values() (jisho_values01.py)",
    concept: "Cac thao tac tu dien bao gom them, cap nhat va xoa cac muc. Su dung `dict.values()` de lay view cua tat ca gia tri. Ket hop voi `in`, ban co the kiem tra xem mot gia tri co ton tai khong: `if 'xyz' in dct.values():`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:106:en"
  };

  window.CONTENT_I18N["python:107"] = window.CONTENT_I18N["python:107"] || {};
  window.CONTENT_I18N["python:107"].vi = {
    title: "Tao Tap hop voi set() (shugou01.py)",
    concept: "**Tap hop (set)** la mot collection **khong chua phan tu trung lap** va **khong co thu tu xac dinh**. Tao set bang dau ngoac nhon `{}` hoac ham `set()`. Set ho tro cac phep toan toan hoc nhu **giao** (`&`) va **hop** (`|`).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:107:en"
  };

  window.CONTENT_I18N["python:108"] = window.CONTENT_I18N["python:108"] || {};
  window.CONTENT_I18N["python:108"].vi = {
    title: "Tao Set bang Literal va Khu trung (shugou02.py)",
    concept: "**Tap hop (set)** **khong chua phan tu trung lap** va **khong co thu tu xac dinh**. Tao set truc tiep bang dau ngoac nhon: `{10, 3.14, 'abc', 10}`. Cac gia tri trung lap nhu 10 tu dong bi loai bo — set tu khu trung chung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:108:en"
  };

  window.CONTENT_I18N["python:109"] = window.CONTENT_I18N["python:109"] || {};
  window.CONTENT_I18N["python:109"].vi = {
    title: "Kiem tra Phan tu Ton tai trong Set (shugou03.py)",
    concept: "**Tap hop (set)** **khong chua phan tu trung lap** va **khong co thu tu xac dinh**. Su dung toan tu `in` de kiem tra xem mot gia tri co ton tai trong set khong: `if 3.14 in st:`. Kiem tra thanh vien trong set rat nhanh (trung binh O(1)).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:109:en"
  };

  window.CONTENT_I18N["python:110"] = window.CONTENT_I18N["python:110"] || {};
  window.CONTENT_I18N["python:110"].vi = {
    title: "Xoa Phan tu voi remove() (shugou04.py)",
    concept: "**Tap hop (set)** **khong chua phan tu trung lap** va **khong co thu tu xac dinh**. Su dung `set.remove(value)` de xoa mot phan tu. Neu phan tu khong ton tai, `remove()` se bao loi **KeyError**. Su dung `set.discard(value)` de xoa an toan ma khong gay loi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:110:en"
  };

  window.CONTENT_I18N["python:111"] = window.CONTENT_I18N["python:111"] || {};
  window.CONTENT_I18N["python:111"].vi = {
    title: "Them Phan tu voi add() (shugou05.py)",
    concept: "Set la mot collection khong chua phan tu trung lap va khong co thu tu xac dinh. Tao set bang dau ngoac nhon `{}` hoac ham `set()`. Set ho tro cac phep toan toan hoc nhu giao (`&`) va hop (`|`). De them mot phan tu vao set, su dung `set.add(value)`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:111:en"
  };

  window.CONTENT_I18N["python:112"] = window.CONTENT_I18N["python:112"] || {};
  window.CONTENT_I18N["python:112"].vi = {
    title: "Khu trung List bang Set (set_list.py)",
    concept: "De loai bo cac phan tu trung lap khoi mot list, mot ky thuat Python pho bien la chuyen doi list thanh set bang `set()` (set tu dong loai bo trung lap), sau do chuyen lai thanh list bang `list()`. Day la mot cach nhanh gon de khu trung du lieu.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:112:en"
  };

  window.CONTENT_I18N["python:113"] = window.CONTENT_I18N["python:113"] || {};
  window.CONTENT_I18N["python:113"].vi = {
    title: "Bai tap: Tao va Hien thi Danh sach Diem (script5-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 5 (script5-1.py)**\n\nNhiem vu: Tao mot danh sach diem va hien thi no.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:113:en"
  };

  window.CONTENT_I18N["python:114"] = window.CONTENT_I18N["python:114"] || {};
  window.CONTENT_I18N["python:114"].vi = {
    title: "Bai tap: Tinh Tong va Trung binh bang Chi so List (script5-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 5 (script5-2.py)**\n\nNhiem vu: Tinh tong va diem trung binh bang cach truy cap cac phan tu list theo chi so.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:114:en"
  };

  window.CONTENT_I18N["python:115"] = window.CONTENT_I18N["python:115"] || {};
  window.CONTENT_I18N["python:115"].vi = {
    title: "Bai tap: Xoa Phan tu List An toan (script5-3.py)",
    concept: "**Bai tap Thuc hanh Chuong 5 (script5-3.py)**\n\nNhiem vu: Xoa cac phan tu khoi mot list mot cach an toan.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:115:en"
  };

  window.CONTENT_I18N["python:116"] = window.CONTENT_I18N["python:116"] || {};
  window.CONTENT_I18N["python:116"].vi = {
    title: "Bai tap: Dinh nghia Tu dien Ten va Diem Hoc sinh (script5-4.py)",
    concept: "**Bai tap Thuc hanh Chuong 5 (script5-4.py)**\n\nNhiem vu: Dinh nghia mot tu dien luu tru ten hoc sinh va diem so cua ho.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:116:en"
  };

  window.CONTENT_I18N["python:117"] = window.CONTENT_I18N["python:117"] || {};
  window.CONTENT_I18N["python:117"].vi = {
    title: "Bai tap: Dinh nghia Tu dien Long nhau cho Nhieu Mon hoc (script5-5.py)",
    concept: "**Bai tap Thuc hanh Chuong 5 (script5-5.py)**\n\nNhiem vu: Dinh nghia mot tu dien long nhau luu tru diem so hoc sinh qua nhieu mon hoc.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:117:en"
  };

  window.CONTENT_I18N["python:118"] = window.CONTENT_I18N["python:118"] || {};
  window.CONTENT_I18N["python:118"].vi = {
    title: "Bai tap: Tra cuu An toan trong Tu dien Long nhau (script5-6.py)",
    concept: "**Bai tap Thuc hanh Chuong 5 (script5-6.py)**\n\nNhiem vu: Nhap ten hoc sinh de tra cuu diem so mon hoc cua ho trong tu dien long nhau.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu. Su dung `in` de kiem tra key ton tai truoc khi truy cap tu dien de tranh KeyError.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:118:en"
  };

  window.CONTENT_I18N["python:119"] = window.CONTENT_I18N["python:119"] || {};
  window.CONTENT_I18N["python:119"].vi = {
    title: "Tao Gia tri Lien tiep voi range() (kurikaeshi01.py)",
    concept: "Su dung vong lap `for` de lap lai mot qua trinh mot so lan chi dinh. `for i in range(5):` gan cac so nguyen tu 0 den 4 cho bien `i` va lap lai 5 lan. `range(start, stop)` dinh nghia diem bat dau va ket thuc (loai tru). `range(start, stop, step)` them gia tri buoc nhay.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:119:en"
  };

  window.CONTENT_I18N["python:120"] = window.CONTENT_I18N["python:120"] || {};
  window.CONTENT_I18N["python:120"].vi = {
    title: "Chi dinh Diem Bat dau va Ket thuc cua range() (kurikaeshi02.py)",
    concept: "Su dung vong lap `for` de lap lai mot qua trinh mot so lan chi dinh. `for i in range(5):` gan cac so nguyen tu 0 den 4 cho bien `i`. `range(3, 5)` tao ra 3 den 4 (gia tri ket thuc bi loai tru). Su dung `range(start, stop)` de kiem soat diem bat dau va ket thuc.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:120:en"
  };

  window.CONTENT_I18N["python:121"] = window.CONTENT_I18N["python:121"] || {};
  window.CONTENT_I18N["python:121"].vi = {
    title: "Chi dinh Buoc nhay Duong trong range() (kurikaeshi03.py)",
    concept: "Su dung vong lap `for` de lap lai mot qua trinh mot so lan chi dinh. `range(1, 5, 2)` tao ra 1, 3 — doi so thu ba (buoc nhay) kiem soat muc tang giua cac gia tri. `range(start, stop, step)` tao mot cap so cong.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:121:en"
  };

  window.CONTENT_I18N["python:122"] = window.CONTENT_I18N["python:122"] || {};
  window.CONTENT_I18N["python:122"].vi = {
    title: "Chi dinh Buoc nhay Am trong range() (kurikaeshi04.py)",
    concept: "Su dung vong lap `for` de lap lai mot qua trinh mot so lan chi dinh. `range(10, 4, -2)` tao ra 10, 8, 6 — buoc nhay am tao ra mot day giam dan. Gia tri bat dau phai lon hon gia tri ket thuc khi su dung buoc nhay am.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:122:en"
  };

  window.CONTENT_I18N["python:123"] = window.CONTENT_I18N["python:123"] || {};
  window.CONTENT_I18N["python:123"].vi = {
    title: "Lap lai voi Vong lap for (kurikaeshi05.py)",
    concept: "Su dung vong lap `for` de lap lai mot qua trinh mot so lan chi dinh. `for i in range(3):` gan 0, 1, 2 cho bien `i` theo thu tu, chay khoi lenh duoc thut le moi lan. Luon bao gom dau hai cham `:` va thut le 4 khoang trang.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:123:en"
  };

  window.CONTENT_I18N["python:124"] = window.CONTENT_I18N["python:124"] || {};
  window.CONTENT_I18N["python:124"].vi = {
    title: "Vong lap voi Gia tri Giam dan (kurikaeshi06.py)",
    concept: "Su dung vong lap `for`, ban co the duyet qua mot collection bang cach trich xuat cac phan tu tu dau den cuoi. `for item in list:` xu ly tung phan tu. Khi ap dung cho tu dien, vong lap trich xuat key theo mac dinh. Mot buoc nhay am trong `range()` tao vong lap giam dan.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:124:en"
  };

  window.CONTENT_I18N["python:125"] = window.CONTENT_I18N["python:125"] || {};
  window.CONTENT_I18N["python:125"].vi = {
    title: "Duyet List theo Chi so (kurikaeshi07.py)",
    concept: "Su dung vong lap `for`, ban co the duyet qua mot collection bang cach trich xuat cac phan tu tu dau den cuoi. `for i in range(len(lst)):` cho phep ban duyet list bang chi so cua no, truy cap tung phan tu voi `lst[i]`. Dau hai cham `:` va thut le 4 khoang trang la bat buoc.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:125:en"
  };

  window.CONTENT_I18N["python:126"] = window.CONTENT_I18N["python:126"] || {};
  window.CONTENT_I18N["python:126"].vi = {
    title: "Duyet List Truc tiep voi for...in (kurikaeshi08.py)",
    concept: "Su dung vong lap `for`, ban co the duyet qua mot collection bang cach trich xuat cac phan tu tu dau den cuoi. `for v in lst:` truc tiep lay tung phan tu trong list ma khong can chi so. Khi ap dung cho tu dien, vong lap trich xuat key theo mac dinh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:126:en"
  };

  window.CONTENT_I18N["python:127"] = window.CONTENT_I18N["python:127"] || {};
  window.CONTENT_I18N["python:127"].vi = {
    title: "Duyet Tap hop (set) voi Vong lap for (kurikaeshi09.py)",
    concept: "Su dung vong lap `for`, ban co the duyet qua mot collection bang cach trich xuat cac phan tu tu dau den cuoi. `for v in st:` cung hoat dong voi set, duyet qua tung phan tu. Hay nho rang set khong co thu tu, vi vay thu tu duyet khong duoc dam bao. Luon bao gom dau hai cham `:` va thut le dung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:127:en"
  };

  window.CONTENT_I18N["python:128"] = window.CONTENT_I18N["python:128"] || {};
  window.CONTENT_I18N["python:128"].vi = {
    title: "Duyet Key cua Tu dien (kurikaeshi10.py)",
    concept: "Su dung vong lap `for`, ban co the duyet qua mot collection bang cach trich xuat cac phan tu tu dau den cuoi. `for k in dct:` duyet qua cac key cua tu dien theo mac dinh. Su dung `dct[k]` ben trong vong lap de truy cap cac gia tri tuong ung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:128:en"
  };

  window.CONTENT_I18N["python:129"] = window.CONTENT_I18N["python:129"] || {};
  window.CONTENT_I18N["python:129"].vi = {
    title: "Doc Gia tri Tu dien theo Key trong Vong lap (kurikaeshi11.py)",
    concept: "Vong lap `while` lap lai mien la dieu kien van con `True`. Khi dieu kien tro thanh `False`, vong lap thoat ra. Hay can than cap nhat dieu kien ben trong vong lap, neu khong no se tro thanh vong lap vo han khong bao gio ket thuc.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:129:en"
  };

  window.CONTENT_I18N["python:130"] = window.CONTENT_I18N["python:130"] || {};
  window.CONTENT_I18N["python:130"].vi = {
    title: "Duyet Tu dien voi items() bang Tuple (kurikaeshi12.py)",
    concept: "Vong lap `while` lap lai mien la dieu kien van con `True`. Su dung `dict.items()` de lay view cua cac cap key-value duoi dang tuple. `for kv in dct.items():` duyet qua tung tuple key-value, sau do co the duoc giai nen hoac truy cap bang chi so.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:130:en"
  };

  window.CONTENT_I18N["python:131"] = window.CONTENT_I18N["python:131"] || {};
  window.CONTENT_I18N["python:131"].vi = {
    title: "Duyet Key va Gia tri Tu dien voi Giai nen (kurikaeshi13.py)",
    concept: "Vong lap `while` lap lai mien la dieu kien van con `True`. Su dung giai nen tuple trong vong lap `for`: `for k, v in dct.items():` gan tung key va gia tri truc tiep vao cac bien `k` va `v`, lam cho ma nguon gon gang va de doc hon.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:131:en"
  };

  window.CONTENT_I18N["python:132"] = window.CONTENT_I18N["python:132"] || {};
  window.CONTENT_I18N["python:132"].vi = {
    title: "Vong lap Co dieu kien voi while (kurikaeshi14.py)",
    concept: "Khi cau lenh `break` duoc thuc thi ben trong vong lap, no ket thuc vong lap ngay lap tuc, va viec thuc thi tiep tuc voi ma sau vong lap. `break` thuong duoc ket hop voi cau lenh `if` de thoat khoi vong lap khi mot dieu kien duoc dap ung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:132:en"
  };

  window.CONTENT_I18N["python:133"] = window.CONTENT_I18N["python:133"] || {};
  window.CONTENT_I18N["python:133"].vi = {
    title: "Xu ly Dem voi while (kurikaeshi15.py)",
    concept: "Khi cau lenh `break` duoc thuc thi ben trong vong lap, no ket thuc vong lap ngay lap tuc. Vong lap `while` voi bien dem la mot mau pho bien: cap nhat bien dem ben trong vong lap de dieu kien cuoi cung tro thanh `False` va vong lap ket thuc tu nhien.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:133:en"
  };

  window.CONTENT_I18N["python:134"] = window.CONTENT_I18N["python:134"] || {};
  window.CONTENT_I18N["python:134"].vi = {
    title: "Vong lap Vo han voi while True (kurikaeshi16.py)",
    concept: "Khi cau lenh `continue` duoc thuc thi, phan con lai cua ma trong vong lap hien tai bi bo qua, va viec thuc thi nhay len vong lap tiep theo (dau vong lap). Can hieu su khac biet: `break` thoat khoi toan bo vong lap, trong khi `continue` chi bo qua vong hien tai.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:134:en"
  };

  window.CONTENT_I18N["python:135"] = window.CONTENT_I18N["python:135"] || {};
  window.CONTENT_I18N["python:135"].vi = {
    title: "Thoat khoi Vong lap Vo han voi break (kurikaeshi17.py)",
    concept: "Khi cau lenh `continue` duoc thuc thi, phan con lai cua ma trong vong lap hien tai bi bo qua. Su dung `break` ben trong vong lap `while True` vo han de thoat khi mot dieu kien nhat dinh duoc dap ung. Mau nay pho bien cho cac chuong trinh menu ma nguoi dung quyet dinh khi nao thoat.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:135:en"
  };

  window.CONTENT_I18N["python:136"] = window.CONTENT_I18N["python:136"] || {};
  window.CONTENT_I18N["python:136"].vi = {
    title: "Bo qua Vong Lap voi continue (kurikaeshi18.py)",
    concept: "Khi cau lenh `continue` duoc thuc thi, phan con lai cua ma trong vong lap hien tai bi bo qua, va viec thuc thi nhay len dau vong lap cho vong lap tiep theo. `continue` huu ich de bo qua cac gia tri khong mong muon trong khi van giu vong lap chay.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:136:en"
  };

  window.CONTENT_I18N["python:137"] = window.CONTENT_I18N["python:137"] || {};
  window.CONTENT_I18N["python:137"].vi = {
    title: "Bai tap: Dung vong lap for de Tinh Tong Diem List (script6-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 6 (script6-1.py)**\n\nNhiem vu: Tinh tong va trung binh cua diem duoc luu trong list bang vong lap `for`.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:137:en"
  };

  window.CONTENT_I18N["python:138"] = window.CONTENT_I18N["python:138"] || {};
  window.CONTENT_I18N["python:138"].vi = {
    title: "Bai tap: In Tat ca Diem Hoc sinh voi Vong lap Tu dien (script6-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 6 (script6-2.py)**\n\nNhiem vu: Su dung vong lap `for` voi `items()` de duyet qua tu dien va in tat ca ten hoc sinh va diem so cua ho.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:138:en"
  };

  window.CONTENT_I18N["python:139"] = window.CONTENT_I18N["python:139"] || {};
  window.CONTENT_I18N["python:139"].vi = {
    title: "Bai tap: Tra cuu Diem Tuong tac voi Vong lap while Vo han (script6-3.py)",
    concept: "**Bai tap Thuc hanh Chuong 6 (script6-3.py)**\n\nNhiem vu: Trien khai tra cuu diem hoc sinh tuong tac bang vong lap `while True` vo han voi `break`.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:139:en"
  };

  window.CONTENT_I18N["python:140"] = window.CONTENT_I18N["python:140"] || {};
  window.CONTENT_I18N["python:140"].vi = {
    title: "Dinh nghia va Goi Ham Khong Co Tham so (kansu01.py)",
    concept: "**Ham (function)** la mot don vi chuong trinh doc lap tap hop nhieu cau lenh lai voi nhau. Dinh nghia ham voi `def ten_ham():`, thut le than ham, va goi no bang `ten_ham()`. Ham giup tranh lap lai cung mot ma.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:140:en"
  };

  window.CONTENT_I18N["python:141"] = window.CONTENT_I18N["python:141"] || {};
  window.CONTENT_I18N["python:141"].vi = {
    title: "Thu tu Dinh nghia Ham va Loi (kansu02.py)",
    concept: "**Ham (function)** la mot don vi chuong trinh doc lap tap hop nhieu cau lenh lai voi nhau. Trong Python, mot ham phai duoc **dinh nghia truoc khi duoc goi**. Neu ban goi mot ham truoc khi dinh nghia no, Python se bao loi `NameError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:141:en"
  };

  window.CONTENT_I18N["python:142"] = window.CONTENT_I18N["python:142"] || {};
  window.CONTENT_I18N["python:142"].vi = {
    title: "Goi Cung mot Ham Nhieu Lan (kansu03.py)",
    concept: "**Ham (function)** la mot don vi chuong trinh doc lap tap hop nhieu cau lenh lai voi nhau. Ban co the goi cung mot ham nhieu lan, bao gom ca ben trong vong lap. Moi lan goi thuc thi than ham tu dau, lam cho ma co the tai su dung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:142:en"
  };

  window.CONTENT_I18N["python:143"] = window.CONTENT_I18N["python:143"] || {};
  window.CONTENT_I18N["python:143"].vi = {
    title: "Dinh nghia Ham voi Mot Tham so (kansu04.py)",
    concept: "**Ham (function)** la mot don vi chuong trinh doc lap tap hop nhieu cau lenh lai voi nhau. Dinh nghia ham voi tham so ben trong dau ngoac don: `def ten_ham(param):`. Tham so dong vai tro nhu mot bien nhan gia tri duoc truyen vao khi ham duoc goi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:143:en"
  };

  window.CONTENT_I18N["python:144"] = window.CONTENT_I18N["python:144"] || {};
  window.CONTENT_I18N["python:144"].vi = {
    title: "Truyen Cac Kieu Du lieu Khac nhau lam Doi so (kansu05.py)",
    concept: "**Ham (function)** la mot don vi chuong trinh doc lap tap hop nhieu cau lenh lai voi nhau. Tham so co the chap nhan doi so voi cac kieu du lieu khac nhau. Ham xu ly bat ky gia tri nao duoc truyen vao, mien la cac thao tac ben trong tuong thich voi kieu du lieu do.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:144:en"
  };

  window.CONTENT_I18N["python:145"] = window.CONTENT_I18N["python:145"] || {};
  window.CONTENT_I18N["python:145"].vi = {
    title: "Dinh nghia Ham voi Nhieu Tham so (kansu06.py)",
    concept: "**Tham so (parameter)** la thong tin duoc truyen vao ham tu ben ngoai khi goi no. Dinh nghia no ben trong dau ngoac don nhu `def nau(food):`. Ham co the co nhieu tham so cach nhau bang dau phay. Thu tu cua doi so phai khop voi thu tu tham so.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:145:en"
  };

  window.CONTENT_I18N["python:146"] = window.CONTENT_I18N["python:146"] || {};
  window.CONTENT_I18N["python:146"].vi = {
    title: "Thu tu Truyen Doi so va Khop Kieu Du lieu (kansu07.py)",
    concept: "**Tham so (parameter)** la thong tin duoc truyen vao ham tu ben ngoai khi goi no. Doi so duoc gan cho tham so theo vi tri — doi so dau tien di vao tham so dau tien, v.v. Su dung bien lam doi so cung hoat dong tuong tu.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:146:en"
  };

  window.CONTENT_I18N["python:147"] = window.CONTENT_I18N["python:147"] || {};
  window.CONTENT_I18N["python:147"].vi = {
    title: "Tham so Ham voi Gia tri Mac dinh (kansu09.py)",
    concept: "**Tham so (parameter)** la thong tin duoc truyen vao ham tu ben ngoai khi goi no. Tham so co the co gia tri mac dinh duoc gan bang `=`, nhu `def nau(ten='Curry'):`. Khi bo qua doi so, gia tri mac dinh se duoc su dung tu dong.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:147:en"
  };

  window.CONTENT_I18N["python:148"] = window.CONTENT_I18N["python:148"] || {};
  window.CONTENT_I18N["python:148"].vi = {
    title: "Bo qua Doi so Mac dinh (kansu10.py)",
    concept: "**Tham so (parameter)** la thong tin duoc truyen vao ham tu ben ngoai khi goi no. Neu mot tham so co gia tri mac dinh, ban co the bo qua doi so do khi goi ham. Ban van co the ghi de gia tri mac dinh bang cach truyen mot gia tri khac mot cach tuong minh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:148:en"
  };

  window.CONTENT_I18N["python:149"] = window.CONTENT_I18N["python:149"] || {};
  window.CONTENT_I18N["python:149"].vi = {
    title: "Su dung Doi so Tu khoa (kansu11.py)",
    concept: "**Gia tri tra ve (return value)** la ket qua ma ham gui lai cho noi goi bang `return value`. Khi `return` duoc thuc thi, ham thoat ra ngay lap tuc va gui gia tri tro ve. Doi so tu khoa cho phep ban chi dinh tham so nao nhan gia tri nao bang ten.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:149:en"
  };

  window.CONTENT_I18N["python:150"] = window.CONTENT_I18N["python:150"] || {};
  window.CONTENT_I18N["python:150"].vi = {
    title: "Tham so Mac dinh Phai Dat Sau Tham so Khong Mac dinh (kansu12.py)",
    concept: "**Gia tri tra ve (return value)** la ket qua ma ham gui lai cho noi goi bang `return value`. Trong Python, tham so co gia tri mac dinh phai duoc dinh nghia **sau** tat ca cac tham so khong co gia tri mac dinh. Neu khong, `SyntaxError` se duoc bao.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:150:en"
  };

  window.CONTENT_I18N["python:151"] = window.CONTENT_I18N["python:151"] || {};
  window.CONTENT_I18N["python:151"].vi = {
    title: "Doi so Do dai Thay doi (*args) (kansu13.py)",
    concept: "**Gia tri tra ve (return value)** la ket qua ma ham gui lai cho noi goi bang `return value`. Su dung `*args` de chap nhan so luong doi so vi tri thay doi. `args` tro thanh mot tuple ben trong ham. Dieu nay huu ich khi ban khong biet co bao nhieu doi so se duoc truyen.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:151:en"
  };

  window.CONTENT_I18N["python:152"] = window.CONTENT_I18N["python:152"] || {};
  window.CONTENT_I18N["python:152"].vi = {
    title: "Doi so Tu khoa Do dai Thay doi (**kwargs) (kansu14.py)",
    concept: "**Gia tri tra ve (return value)** la ket qua ma ham gui lai cho noi goi bang `return value`. Su dung `**kwargs` de chap nhan so luong doi so tu khoa thay doi. `kwargs` tro thanh mot tu dien ben trong ham, voi ten tham so lam key va gia tri duoc truyen lam value.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:152:en"
  };

  window.CONTENT_I18N["python:153"] = window.CONTENT_I18N["python:153"] || {};
  window.CONTENT_I18N["python:153"].vi = {
    title: "Ket hop Doi so Thuong va Doi so Do dai Thay doi (kansu15.py)",
    concept: "**Gia tri tra ve (return value)** la ket qua ma ham gui lai cho noi goi bang `return value`. Ban co the ket hop tham so thuong, `*args`, va `**kwargs` trong mot dinh nghia ham. Tham so thuong dung truoc, sau do `*args`, roi `**kwargs`. Doi so tu khoa co the duoc truyen theo bat ky thu tu nao.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:153:en"
  };

  window.CONTENT_I18N["python:154"] = window.CONTENT_I18N["python:154"] || {};
  window.CONTENT_I18N["python:154"].vi = {
    title: "Su dung Tham so Mac dinh Nang cao (kansu16.py)",
    concept: "Khi dinh nghia mot ham, ban co the dat gia tri mac dinh cho tham so nhu `def chao(ten='Khach'):`. Neu bo qua doi so khi goi, gia tri mac dinh se duoc su dung. Ban co the tron tham so mac dinh va khong mac dinh, nhung tat ca tham so mac dinh phai dung sau tham so khong mac dinh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:154:en"
  };

  window.CONTENT_I18N["python:155"] = window.CONTENT_I18N["python:155"] || {};
  window.CONTENT_I18N["python:155"].vi = {
    title: "Tra ve Gia tri voi return (kansu17.py)",
    concept: "Khi dinh nghia mot ham, ban co the dat gia tri mac dinh cho tham so nhu `def chao(ten='Khach'):`. Cau lenh `return` gui mot gia tri tro ve tu ham cho noi goi. Khi `return` duoc thuc thi, ham thoat ra ngay lap tuc. Gia tri duoc tra ve co the duoc luu trong mot bien.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:155:en"
  };

  window.CONTENT_I18N["python:156"] = window.CONTENT_I18N["python:156"] || {};
  window.CONTENT_I18N["python:156"].vi = {
    title: "Bai tap: Ham In Tong va Trung binh Diem (script7-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 7 (script7-1.py)**\n\nNhiem vu: Dinh nghia mot ham nhan ba diem so va in ra tong va trung binh cua chung.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:156:en"
  };

  window.CONTENT_I18N["python:157"] = window.CONTENT_I18N["python:157"] || {};
  window.CONTENT_I18N["python:157"].vi = {
    title: "Nhan Gia tri Tra ve trong Mot Bien (kansu18.py)",
    concept: "Khi dinh nghia mot ham, ban co the dat gia tri mac dinh cho tham so nhu `def chao(ten='Khach'):`. Mot ham co the tra ve mot gia tri duoc noi goi tiep nhan. Ma duoc viet sau `return` ben trong ham khong bao gio duoc thuc thi vi `return` thoat khoi ham ngay lap tuc.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:157:en"
  };

  window.CONTENT_I18N["python:158"] = window.CONTENT_I18N["python:158"] || {};
  window.CONTENT_I18N["python:158"].vi = {
    title: "Ket thuc Som Ham voi return (kansu19.py)",
    concept: "Khi dinh nghia mot ham, ban co the dat gia tri mac dinh cho tham so nhu `def chao(ten='Khach'):`. Cau lenh `return` co the duoc su dung de thoat khoi ham som. Bat ky ma nao sau `return` deu bi bo qua. Dieu nay huu ich cho cac menh de bao ve (guard clause) xac thuc dau vao o dau ham.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:158:en"
  };

  window.CONTENT_I18N["python:159"] = window.CONTENT_I18N["python:159"] || {};
  window.CONTENT_I18N["python:159"].vi = {
    title: "Tra ve Nhieu Gia tri tu Mot Ham (Giai nen Tuple) (kansu20.py)",
    concept: "Khi dinh nghia mot ham, ban co the dat gia tri mac dinh cho tham so nhu `def chao(ten='Khach'):`. Python cho phep tra ve nhieu gia tri bang cach phan tach chung bang dau phay trong cau lenh `return`. Chung duoc tra ve duoi dang mot tuple, co the duoc giai nen vao cac bien rieng biet.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:159:en"
  };

  window.CONTENT_I18N["python:160"] = window.CONTENT_I18N["python:160"] || {};
  window.CONTENT_I18N["python:160"].vi = {
    title: "Bien Cuc bo va Bien Toan cuc (kansu_a1.py)",
    concept: "Mot bien duoc dinh nghia ben trong ham la **bien cuc bo (local variable)** — no chi co the duoc truy cap trong ham do. Co gang su dung bien cuc bo ben ngoai ham cua no se gay ra loi `NameError`. Bien duoc dinh nghia ben ngoai bat ky ham nao la **bien toan cuc (global variable)** va co the duoc truy cap tu bat ky dau.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:160:en"
  };

  window.CONTENT_I18N["python:161"] = window.CONTENT_I18N["python:161"] || {};
  window.CONTENT_I18N["python:161"].vi = {
    title: "Bai tap: Ham voi Gia tri Tra ve cho Tinh toan va Truy xuat (script7-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 7 (script7-2.py)**\n\nNhiem vu: Dinh nghia mot ham co gia tri tra ve thuc hien tinh toan va truy xuat ket qua.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:161:en"
  };

  window.CONTENT_I18N["python:162"] = window.CONTENT_I18N["python:162"] || {};
  window.CONTENT_I18N["python:162"].vi = {
    title: "Bai tap: Ham Xu ly Diem voi Gia tri Mac dinh va Gia tri Tra ve (script7-3.py)",
    concept: "**Bai tap Thuc hanh Chuong 7 (script7-3.py)**\n\nNhiem vu: Dinh nghia mot ham xu ly diem voi tham so mac dinh va gia tri tra ve.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:162:en"
  };

  window.CONTENT_I18N["python:163"] = window.CONTENT_I18N["python:163"] || {};
  window.CONTENT_I18N["python:163"].vi = {
    title: "Dinh nghia Lop Co ban va The hien Rong (class01.py)",
    concept: "**Lop (class)** la mot ban thiet ke (blueprint) de tao cac doi tuong. Dinh nghia lop voi `class TenLop:` va dinh nghia **bien the hien (thuoc tinh)** ben trong no de luu tru du lieu. Mot the hien duoc tao bang cach goi lop nhu mot ham: `stu1 = Student()`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:163:en"
  };

  window.CONTENT_I18N["python:164"] = window.CONTENT_I18N["python:164"] || {};
  window.CONTENT_I18N["python:164"].vi = {
    title: "Thiet lap Gia tri Khoi tao trong Constructor (class02.py)",
    concept: "**Constructor** (phuong thuc `__init__` trong Python) tu dong duoc thuc thi khi tao mot doi tuong tu mot lop. Tham so dau tien luon la `self`, dai dien cho chinh the hien do. Tham so cua `__init__` co the thiet lap cac gia tri thuoc tinh ban dau.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:164:en"
  };

  window.CONTENT_I18N["python:165"] = window.CONTENT_I18N["python:165"] || {};
  window.CONTENT_I18N["python:165"].vi = {
    title: "Dinh nghia Phuong thuc va Tu khoa self (class03.py)",
    concept: "Cac ham duoc dinh nghia ben trong mot lop duoc goi la **phuong thuc (method)**. Tham so dau tien cua moi phuong thuc la `self`, dai dien cho the hien hien tai. Truy cap bien the hien bang `self.ten_bien`. Phuong thuc co the truy cap va thay doi du lieu cua doi tuong.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:165:en"
  };

  window.CONTENT_I18N["python:166"] = window.CONTENT_I18N["python:166"] || {};
  window.CONTENT_I18N["python:166"].vi = {
    title: "Bien Lop va Bien The hien (class04.py)",
    concept: "**Bien lop (class variable)** duoc chia se giua tat ca cac the hien cua mot lop (duoc dinh nghia truc tiep trong than lop). **Bien the hien (instance variable)** la duy nhat cho moi the hien (duoc dinh nghia trong `__init__` bang `self`). Mot lop co the chua nhieu phuong thuc: mot so hien thi du lieu, mot so tra ve gia tri tinh toan, va mot so sua doi thuoc tinh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:166:en"
  };

  window.CONTENT_I18N["python:167"] = window.CONTENT_I18N["python:167"] || {};
  window.CONTENT_I18N["python:167"].vi = {
    title: "Bai tap: Dinh nghia Lop Student Luu tru Diem (script8-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 8 (script8-1.py)**\n\nNhiem vu: Dinh nghia mot lop Student luu tru ten hoc sinh va diem so mon hoc.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:167:en"
  };

  window.CONTENT_I18N["python:168"] = window.CONTENT_I18N["python:168"] || {};
  window.CONTENT_I18N["python:168"].vi = {
    title: "Bai tap: Tinh Tong va Trung binh voi Phuong thuc Lop (script8-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 8 (script8-2.py)**\n\nNhiem vu: Them phuong thuc vao lop Student de tinh tong va diem trung binh.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:168:en"
  };

  window.CONTENT_I18N["python:169"] = window.CONTENT_I18N["python:169"] || {};
  window.CONTENT_I18N["python:169"].vi = {
    title: "Bai tap: Duyet Danh sach The hien va In Diem (script8-3.py)",
    concept: "**Bai tap Thuc hanh Chuong 8 (script8-3.py)**\n\nNhiem vu: Tao mot danh sach cac doi tuong sinh vien va in diem bang vong lap.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:169:en"
  };

  window.CONTENT_I18N["python:170"] = window.CONTENT_I18N["python:170"] || {};
  window.CONTENT_I18N["python:170"].vi = {
    title: "Tao Module Ham (my_func.py)",
    concept: "Mot tep `.py` doc lap chua ma Python duoc goi la **module**. Su dung `import ten_module` de dua cac ham va lop duoc dinh nghia trong cac tep khac vao ma cua ban de tai su dung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:170:en"
  };

  window.CONTENT_I18N["python:171"] = window.CONTENT_I18N["python:171"] || {};
  window.CONTENT_I18N["python:171"].vi = {
    title: "Tao Module Lop (my_class.py)",
    concept: "Mot tep `.py` doc lap chua ma Python duoc goi la **module**. Su dung `import ten_module` de dua cac ham va lop duoc dinh nghia trong cac tep khac vao ma cua ban de tai su dung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:171:en"
  };

  window.CONTENT_I18N["python:172"] = window.CONTENT_I18N["python:172"] || {};
  window.CONTENT_I18N["python:172"].vi = {
    title: "Tap lenh Module Tong hop (calc_account.py)",
    concept: "Mot tep `.py` doc lap chua ma Python duoc goi la **module**. Su dung `import ten_module` de dua cac ham va lop duoc dinh nghia trong cac tep khac vao ma cua ban de tai su dung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:172:en"
  };

  window.CONTENT_I18N["python:173"] = window.CONTENT_I18N["python:173"] || {};
  window.CONTENT_I18N["python:173"].vi = {
    title: "Dinh nghia Lop Ben trong Goi (my_class.py)",
    concept: "Mot thu muc chua nhieu module (tep) duoc goi la **goi (package)**. Mot thu muc goi phai chua mot tep dac biet `__init__.py` chay khi goi duoc khoi tao.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:173:en"
  };

  window.CONTENT_I18N["python:174"] = window.CONTENT_I18N["python:174"] || {};
  window.CONTENT_I18N["python:174"].vi = {
    title: "Dinh nghia Ham Ben trong Goi (my_func.py)",
    concept: "Mot thu muc chua nhieu module (tep) duoc goi la **goi (package)**. Mot thu muc goi phai chua mot tep dac biet `__init__.py` chay khi goi duoc khoi tao.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:174:en"
  };

  window.CONTENT_I18N["python:175"] = window.CONTENT_I18N["python:175"] || {};
  window.CONTENT_I18N["python:175"].vi = {
    title: "Dinh nghia Ham Ben trong Goi con Long nhau (my_func.py)",
    concept: "Khi viet `ten_module.ten_ham` qua dai, su dung `from ten_module import ten_ham` de bo qua ten module. Ban cung co the su dung `as` de tao biet danh: `import thu_vien as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:175:en"
  };

  window.CONTENT_I18N["python:176"] = window.CONTENT_I18N["python:176"] || {};
  window.CONTENT_I18N["python:176"].vi = {
    title: "Nap Module voi import (script.py)",
    concept: "Mot tep `.py` doc lap chua ma Python duoc goi la **module**. Su dung `import ten_module` de dua cac ham va lop duoc dinh nghia trong cac tep khac vao ma cua ban de tai su dung.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:176:en"
  };

  window.CONTENT_I18N["python:177"] = window.CONTENT_I18N["python:177"] || {};
  window.CONTENT_I18N["python:177"].vi = {
    title: "Nhap Module tu Goi (script_package01.py)",
    concept: "Mot thu muc chua nhieu module (tep) duoc goi la **goi (package)**. Mot thu muc goi phai chua mot tep dac biet `__init__.py` chay khi goi duoc khoi tao.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:177:en"
  };

  window.CONTENT_I18N["python:178"] = window.CONTENT_I18N["python:178"] || {};
  window.CONTENT_I18N["python:178"].vi = {
    title: "Nhap tu Goi Long nhau (script_package02.py)",
    concept: "Mot thu muc chua nhieu module (tep) duoc goi la **goi (package)**. Mot thu muc goi phai chua mot tep dac biet `__init__.py` chay khi goi duoc khoi tao.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:178:en"
  };

  window.CONTENT_I18N["python:179"] = window.CONTENT_I18N["python:179"] || {};
  window.CONTENT_I18N["python:179"].vi = {
    title: "Tep Khoi tao Goi (__init__.py)",
    concept: "Mot thu muc chua nhieu module (tep) duoc goi la **goi (package)**. Mot thu muc goi phai chua mot tep dac biet `__init__.py` chay khi goi duoc khoi tao.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:179:en"
  };

  window.CONTENT_I18N["python:180"] = window.CONTENT_I18N["python:180"] || {};
  window.CONTENT_I18N["python:180"].vi = {
    title: "Nhap Module Cu the voi from (script_package03.py)",
    concept: "Khi viet `ten_module.ten_ham` qua dai, su dung `from ten_module import ten_ham` de bo qua ten module. Ban cung co the su dung `as` de tao biet danh: `import thu_vien as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:180:en"
  };

  window.CONTENT_I18N["python:181"] = window.CONTENT_I18N["python:181"] || {};
  window.CONTENT_I18N["python:181"].vi = {
    title: "Nhap Truc tiep Ham Cu the voi from (script_package04.py)",
    concept: "Khi viet `ten_module.ten_ham` qua dai, su dung `from ten_module import ten_ham` de bo qua ten module. Ban cung co the su dung `as` de tao biet danh: `import thu_vien as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:181:en"
  };

  window.CONTENT_I18N["python:182"] = window.CONTENT_I18N["python:182"] || {};
  window.CONTENT_I18N["python:182"].vi = {
    title: "Tao Biet danh Module voi as (script_package05.py)",
    concept: "Khi viet `ten_module.ten_ham` qua dai, su dung `from ten_module import ten_ham` de bo qua ten module. Ban cung co the su dung `as` de tao biet danh: `import thu_vien as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:182:en"
  };

  window.CONTENT_I18N["python:183"] = window.CONTENT_I18N["python:183"] || {};
  window.CONTENT_I18N["python:183"].vi = {
    title: "Khoi tao Goi con Long nhau (__init__.py)",
    concept: "Khi viet `ten_module.ten_ham` qua dai, su dung `from ten_module import ten_ham` de bo qua ten module. Ban cung co the su dung `as` de tao biet danh: `import thu_vien as lib`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:183:en"
  };

  window.CONTENT_I18N["python:184"] = window.CONTENT_I18N["python:184"] || {};
  window.CONTENT_I18N["python:184"].vi = {
    title: "Bai tap: Nhap va Su dung Lop Dinh nghia trong Module Khac (script9-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 9 (script9-2.py)**\n\nNhiem vu: Nhap mot lop tuy chinh va ham tim kiem tu cac module ben ngoai de tra cuu hoc sinh.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:184:en"
  };

  window.CONTENT_I18N["python:185"] = window.CONTENT_I18N["python:185"] || {};
  window.CONTENT_I18N["python:185"].vi = {
    title: "Lay Ngay va Gio Hien tai (hiduke01.py)",
    concept: "De xu ly ngay va gio trong Python, su dung thu vien chuan `datetime`. Goi `datetime.now()` de nhanh chong lay doi tuong ngay-gio hien tai.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:185:en"
  };

  window.CONTENT_I18N["python:186"] = window.CONTENT_I18N["python:186"] || {};
  window.CONTENT_I18N["python:186"].vi = {
    title: "Tao datetime voi Ngay va Gio Cu the (hiduke02.py)",
    concept: "De xu ly ngay va gio trong Python, su dung thu vien chuan `datetime`. Goi `datetime.now()` de nhanh chong lay doi tuong ngay-gio hien tai.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:186:en"
  };

  window.CONTENT_I18N["python:187"] = window.CONTENT_I18N["python:187"] || {};
  window.CONTENT_I18N["python:187"].vi = {
    title: "Tao Doi tuong Ngay Khong Co Gio (hiduke03.py)",
    concept: "De xu ly ngay va gio trong Python, su dung thu vien chuan `datetime`. Goi `datetime.now()` de nhanh chong lay doi tuong ngay-gio hien tai.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:187:en"
  };

  window.CONTENT_I18N["python:188"] = window.CONTENT_I18N["python:188"] || {};
  window.CONTENT_I18N["python:188"].vi = {
    title: "Loi Chi dinh Ngay Khong hop le (hiduke04.py)",
    concept: "De xu ly ngay va gio trong Python, su dung thu vien chuan `datetime`. Truyen mot ngay khong hop le (vi du, thang 2 ngay 30) se gay ra loi `ValueError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:188:en"
  };

  window.CONTENT_I18N["python:189"] = window.CONTENT_I18N["python:189"] || {};
  window.CONTENT_I18N["python:189"].vi = {
    title: "Lay Ngay Hom nay voi date.today() (hiduke05.py)",
    concept: "De xu ly ngay va gio trong Python, su dung thu vien chuan `datetime`. Goi `date.today()` de lay ngay hien tai.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:189:en"
  };

  window.CONTENT_I18N["python:190"] = window.CONTENT_I18N["python:190"] || {};
  window.CONTENT_I18N["python:190"].vi = {
    title: "Tao Ngay Tuong lai (hiduke06.py)",
    concept: "De xu ly ngay va gio trong Python, su dung thu vien chuan `datetime`. Ban co the tao mot ngay tuong lai bang cach truyen nam, thang va ngay cho `date()`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:190:en"
  };

  window.CONTENT_I18N["python:191"] = window.CONTENT_I18N["python:191"] || {};
  window.CONTENT_I18N["python:191"].vi = {
    title: "So sanh Ngay (hiduke07.py)",
    concept: "Tru hai ngay tao ra mot doi tuong `timedelta` dai dien cho su chenh lech thoi gian. De xuat doi tuong ngay-gio theo dinh dang chuoi tuy y (vi du, `2026/06/04`), su dung phuong thuc `strftime()`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:191:en"
  };

  window.CONTENT_I18N["python:192"] = window.CONTENT_I18N["python:192"] || {};
  window.CONTENT_I18N["python:192"].vi = {
    title: "Cong va Tru Ngay voi timedelta (hiduke08.py)",
    concept: "Tru hai ngay tao ra mot doi tuong `timedelta` dai dien cho su chenh lech thoi gian. Su dung `timedelta(days=N)` de cong hoac tru ngay. Truy cap su chenh lech bang ngay voi `.days` hoac bang giay voi `.seconds`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:192:en"
  };

  window.CONTENT_I18N["python:193"] = window.CONTENT_I18N["python:193"] || {};
  window.CONTENT_I18N["python:193"].vi = {
    title: "Chuyen doi Chenh lech datetime sang Giay (hiduke09.py)",
    concept: "Su dung `strptime()` de phan tich mot chuoi ngay gio thanh doi tuong `datetime`. Chi dinh dinh dang voi cac chi thi nhu `%Y`, `%m`, `%d`. Truy cap su chenh lech bang ngay voi `.days` hoac bang giay voi `.seconds`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:193:en"
  };

  window.CONTENT_I18N["python:194"] = window.CONTENT_I18N["python:194"] || {};
  window.CONTENT_I18N["python:194"].vi = {
    title: "Lay Thu trong Tuan voi weekday() (hiduke10.py)",
    concept: "Tru hai ngay tao ra mot doi tuong `timedelta` dai dien cho su chenh lech thoi gian. Su dung `date.weekday()` de lay thu trong tuan duoi dang so nguyen (Thu Hai la 0, Chu Nhat la 6).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:194:en"
  };

  window.CONTENT_I18N["python:195"] = window.CONTENT_I18N["python:195"] || {};
  window.CONTENT_I18N["python:195"].vi = {
    title: "Phan tich Chuoi Ngay voi strptime (hiduke11.py)",
    concept: "Tru hai ngay tao ra mot doi tuong `timedelta`. Su dung `datetime.strptime(chuoi, dinh_dang)` de chuyen doi chuoi ngay thanh doi tuong `datetime` bang cach chi dinh dinh dang voi cac chi thi nhu `%Y`, `%m`, `%d`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:195:en"
  };

  window.CONTENT_I18N["python:196"] = window.CONTENT_I18N["python:196"] || {};
  window.CONTENT_I18N["python:196"].vi = {
    title: "Dinh dang datetime voi strftime (hiduke12.py)",
    concept: "Tru hai ngay tao ra mot doi tuong `timedelta`. Su dung `datetime.strftime(dinh_dang)` de xuat doi tuong ngay-gio duoi dang chuoi da dinh dang. Cac ma dinh dang pho bien: `%Y` (nam), `%m` (thang), `%d` (ngay), `%H` (gio), `%M` (phut).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:196:en"
  };

  window.CONTENT_I18N["python:197"] = window.CONTENT_I18N["python:197"] || {};
  window.CONTENT_I18N["python:197"].vi = {
    title: "Tao So ngau nhien Float 0-1 voi random() (ransu01.py)",
    concept: "Su dung module `random` de tao cac gia tri ngau nhien:\n- `random.random()` — Mot float giua 0.0 va 1.0\n- `random.randint(a, b)` — Mot so nguyen giua a va b (bao gom)\n- `random.shuffle(list)` — Tron ngau nhien mot list tai cho",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:197:en"
  };

  window.CONTENT_I18N["python:198"] = window.CONTENT_I18N["python:198"] || {};
  window.CONTENT_I18N["python:198"].vi = {
    title: "Tao So nguyen Ngau nhien trong Pham vi voi randint() (ransu02.py)",
    concept: "Su dung module `random` de tao cac gia tri ngau nhien:\n- `random.random()` — Mot float giua 0.0 va 1.0\n- `random.randint(a, b)` — Mot so nguyen giua a va b (bao gom)\n- `random.shuffle(list)` — Tron ngau nhien mot list tai cho",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:198:en"
  };

  window.CONTENT_I18N["python:199"] = window.CONTENT_I18N["python:199"] || {};
  window.CONTENT_I18N["python:199"].vi = {
    title: "Chon Ngau nhien Mot Phan tu tu Chuoi voi choice() (ransu03.py)",
    concept: "Su dung module `random` de tao cac gia tri ngau nhien. `random.choice(chuoi)` chon ngau nhien va tra ve mot phan tu tu mot list hoac chuoi khac.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:199:en"
  };

  window.CONTENT_I18N["python:200"] = window.CONTENT_I18N["python:200"] || {};
  window.CONTENT_I18N["python:200"].vi = {
    title: "Bai tap: Phan tich Chuoi Ngay Nguoi dung Nhap (script10-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 10 (script10-1.py)**\n\nNhiem vu: Phan tich mot chuoi ngay do nguoi dung nhap vao thanh doi tuong datetime.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:200:en"
  };

  window.CONTENT_I18N["python:201"] = window.CONTENT_I18N["python:201"] || {};
  window.CONTENT_I18N["python:201"].vi = {
    title: "Bai tap: Tinh So ngay Chenh lech Giua Hai Ngay (script10-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 10 (script10-2.py)**\n\nNhiem vu: Nhap hai ngay va tinh so ngay giua chung.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:201:en"
  };

  window.CONTENT_I18N["python:202"] = window.CONTENT_I18N["python:202"] || {};
  window.CONTENT_I18N["python:202"].vi = {
    title: "Bai tap: Mo phong Tro choi Tung Xuc xac (script10-3.py)",
    concept: "**Bai tap Thuc hanh Chuong 10 (script10-3.py)**\n\nNhiem vu: Mo phong tung xuc xac va kiem tra tong cua chung la chan hay le.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:202:en"
  };

  window.CONTENT_I18N["python:203"] = window.CONTENT_I18N["python:203"] || {};
  window.CONTENT_I18N["python:203"].vi = {
    title: "Tu dong Dong File voi Cau lenh with (sample.txt)",
    concept: "Neu co loi xay ra trong qua trinh xu ly file, `close()` co the khong duoc thuc thi, de file bi mo. Su dung `with open(...) as f:` **tu dong dong file** khi khoi lenh thoat (ngay ca khi co loi xay ra), lam cho ma an toan hon va ngan gon hon.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:203:en"
  };

  window.CONTENT_I18N["python:204"] = window.CONTENT_I18N["python:204"] || {};
  window.CONTENT_I18N["python:204"].vi = {
    title: "Kiem tra Su ton tai File voi os.path.exists (arunashi01.py)",
    concept: "De ghi du lieu vao file, mo no bang `open('filename', 'w', encoding='utf-8')`. Su dung `write()` de ghi van ban, va luon goi `close()` khi xong. Su dung `os.path.exists()` de kiem tra xem file co ton tai truoc khi thao tac tren no.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:204:en"
  };

  window.CONTENT_I18N["python:205"] = window.CONTENT_I18N["python:205"] || {};
  window.CONTENT_I18N["python:205"].vi = {
    title: "Doc Toan bo Noi dung File voi read() (yomikomi01.py)",
    concept: "De doc mot file, mo no o che do `'r'` (doc). `read()` doc toan bo file thanh mot chuoi duy nhat. `readlines()` doc tat ca dong vao mot list, moi dong la mot phan tu.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:205:en"
  };

  window.CONTENT_I18N["python:206"] = window.CONTENT_I18N["python:206"] || {};
  window.CONTENT_I18N["python:206"].vi = {
    title: "Mo File An toan voi Cau lenh with (yomikomi01_with.py)",
    concept: "Neu co loi xay ra trong qua trinh xu ly file, `close()` co the khong duoc thuc thi, de file bi mo. Su dung `with open(...) as f:` **tu dong dong file** khi khoi lenh thoat (ngay ca khi co loi xay ra), lam cho ma an toan hon va ngan gon hon.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:206:en"
  };

  window.CONTENT_I18N["python:207"] = window.CONTENT_I18N["python:207"] || {};
  window.CONTENT_I18N["python:207"].vi = {
    title: "Doc File Tung dong voi readline() (yomikomi02.py)",
    concept: "De doc mot file, mo no o che do `'r'` (doc). `read()` doc toan bo file thanh mot chuoi duy nhat. `readlines()` doc tat ca dong vao mot list. Su dung `readline()` trong vong lap de doc tung dong mot cho den khi ket thuc file.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:207:en"
  };

  window.CONTENT_I18N["python:208"] = window.CONTENT_I18N["python:208"] || {};
  window.CONTENT_I18N["python:208"].vi = {
    title: "Doc Tat ca Dong vao List voi readlines() (yomikomi03.py)",
    concept: "De doc mot file, mo no o che do `'r'` (doc). `read()` doc toan bo file thanh mot chuoi duy nhat. `readlines()` doc tat ca dong vao mot list, moi dong la mot phan tu (bao gom ca ky tu xuong dong).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:208:en"
  };

  window.CONTENT_I18N["python:209"] = window.CONTENT_I18N["python:209"] || {};
  window.CONTENT_I18N["python:209"].vi = {
    title: "Tao va Ghi File voi Che do w (kakikomi01.py)",
    concept: "De ghi du lieu vao file, mo no bang `open('filename', 'w', encoding='utf-8')`. Su dung `write()` de ghi van ban, va luon goi `close()` khi xong. Su dung `os.path.exists()` de kiem tra xem file co ton tai truoc khi thao tac tren no.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:209:en"
  };

  window.CONTENT_I18N["python:210"] = window.CONTENT_I18N["python:210"] || {};
  window.CONTENT_I18N["python:210"].vi = {
    title: "Bai tap: Doc va Hien thi Toan bo Noi dung students.txt (script11-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 11 (script11-1.py)**\n\nNhiem vu: Mo, doc va in tat ca dong tu students.txt.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:210:en"
  };

  window.CONTENT_I18N["python:211"] = window.CONTENT_I18N["python:211"] || {};
  window.CONTENT_I18N["python:211"].vi = {
    title: "Ghi Nhieu Dong tu List voi writelines() (kakikomi02.py)",
    concept: "De ghi du lieu vao file, mo no bang `open('filename', 'w', encoding='utf-8')`. Su dung `write()` de ghi mot chuoi, va luon goi `close()` khi xong. De ghi nhieu dong tu mot list cung mot luc, su dung `f.writelines(list)`. Su dung `os.path.exists()` de kiem tra xem file co ton tai truoc khi thao tac tren no.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:211:en"
  };

  window.CONTENT_I18N["python:212"] = window.CONTENT_I18N["python:212"] || {};
  window.CONTENT_I18N["python:212"].vi = {
    title: "Bai tap: Luu Du lieu Hoc sinh Nhap vao File (script11-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 11 (script11-2.py)**\n\nNhiem vu: Luu du lieu hoc sinh do nguoi dung nhap vao mot file.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:212:en"
  };

  window.CONTENT_I18N["python:213"] = window.CONTENT_I18N["python:213"] || {};
  window.CONTENT_I18N["python:213"].vi = {
    title: "Ghi Them vao File Hien co voi Che do a (kakikomi03.py)",
    concept: "De ghi du lieu vao file, mo no bang `open('filename', 'w', encoding='utf-8')`. Su dung `write()` de ghi mot chuoi, va luon goi `close()` khi xong. De them noi dung vao file hien co ma khong ghi de, mo no o che do ghi them `'a'`. Su dung `os.path.exists()` de kiem tra xem file co ton tai.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:213:en"
  };

  window.CONTENT_I18N["python:214"] = window.CONTENT_I18N["python:214"] || {};
  window.CONTENT_I18N["python:214"].vi = {
    title: "Mo File Theo Duong dan Tuong doi voi Goi (openfile.py)",
    concept: "Khi doc mot file tu mot chuong trinh, vi tri tuong doi (duong dan) giua thu muc thuc thi va file dich la quan trong. Cung mot duong dan tuong doi co the bi loi neu chuong trinh duoc chay tu mot thu muc lam viec khac, gay ra `FileNotFoundError`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:214:en"
  };

  window.CONTENT_I18N["python:215"] = window.CONTENT_I18N["python:215"] || {};
  window.CONTENT_I18N["python:215"].vi = {
    title: "Bai tap: Doc File va Luu Cac Dong vao List (script11-3.py)",
    concept: "**Bai tap Thuc hanh Chuong 11 (script11-3.py)**\n\nNhiem vu: Doc mot file va luu noi dung cua no vao mot list.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:215:en"
  };

  window.CONTENT_I18N["python:216"] = window.CONTENT_I18N["python:216"] || {};
  window.CONTENT_I18N["python:216"].vi = {
    title: "Bai tap: Tao Cac The hien Student tu Du lieu File (script11-4.py)",
    concept: "**Bai tap Thuc hanh Chuong 11 (script11-4.py)**\n\nNhiem vu: Tao cac doi tuong Student tu du lieu file.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:216:en"
  };

  window.CONTENT_I18N["python:217"] = window.CONTENT_I18N["python:217"] || {};
  window.CONTENT_I18N["python:217"].vi = {
    title: "Khop Bieu thuc Chinh quy Hang loat tren Noi dung File (aaa.txt)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:217:en"
  };

  window.CONTENT_I18N["python:218"] = window.CONTENT_I18N["python:218"] || {};
  window.CONTENT_I18N["python:218"].vi = {
    title: "Khop Bieu thuc Chinh quy Hang loat tren Noi dung File (bbb.txt)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:218:en"
  };

  window.CONTENT_I18N["python:219"] = window.CONTENT_I18N["python:219"] || {};
  window.CONTENT_I18N["python:219"].vi = {
    title: "Khop Bieu thuc Chinh quy Hang loat tren Noi dung File (ccc.txt)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:219:en"
  };

  window.CONTENT_I18N["python:220"] = window.CONTENT_I18N["python:220"] || {};
  window.CONTENT_I18N["python:220"].vi = {
    title: "Khop Bieu thuc Chinh quy Hang loat tren Noi dung File (test-result.txt)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:220:en"
  };

  window.CONTENT_I18N["python:221"] = window.CONTENT_I18N["python:221"] || {};
  window.CONTENT_I18N["python:221"].vi = {
    title: "Tim Kiem Khop Mot Phan voi re.search (seiki01.py)",
    concept: "**Bieu thuc chinh quy (regular expression)** la mot co che de chi dinh cac mau chuoi phuc tap (vi du, 3 chu so theo sau boi dau gach ngang va 4 chu so) de tim kiem trong van ban. Trong Python, nhap module `re` va su dung `re.search(pattern, string)`. Cac ky tu dac biet pho bien gom `^` cho bat dau chuoi va `$` cho ket thuc chuoi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:221:en"
  };

  window.CONTENT_I18N["python:222"] = window.CONTENT_I18N["python:222"] || {};
  window.CONTENT_I18N["python:222"].vi = {
    title: "Kiem tra Doi tuong Ket qua cua re.search (seiki02.py)",
    concept: "**Bieu thuc chinh quy (regular expression)** la mot co che de chi dinh cac mau chuoi phuc tap. Trong Python, nhap module `re` va su dung `re.search(pattern, string)`. Cac ky tu dac biet pho bien gom `^` cho bat dau chuoi va `$` cho ket thuc chuoi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:222:en"
  };

  window.CONTENT_I18N["python:223"] = window.CONTENT_I18N["python:223"] || {};
  window.CONTENT_I18N["python:223"].vi = {
    title: "Neo Dau Dong (^) (seiki03.py)",
    concept: "**Bieu thuc chinh quy (regular expression)** la mot co che de chi dinh cac mau chuoi phuc tap. Trong Python, nhap module `re` va su dung `re.search(pattern, string)`. Cac ky tu dac biet pho bien gom `^` cho bat dau chuoi va `$` cho ket thuc chuoi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:223:en"
  };

  window.CONTENT_I18N["python:224"] = window.CONTENT_I18N["python:224"] || {};
  window.CONTENT_I18N["python:224"].vi = {
    title: "Neo Cuoi Dong ($) (seiki04.py)",
    concept: "**Bieu thuc chinh quy (regular expression)** la mot co che de chi dinh cac mau chuoi phuc tap. Trong Python, nhap module `re` va su dung `re.search(pattern, string)`. Cac ky tu dac biet pho bien gom `^` cho bat dau chuoi va `$` cho ket thuc chuoi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:224:en"
  };

  window.CONTENT_I18N["python:225"] = window.CONTENT_I18N["python:225"] || {};
  window.CONTENT_I18N["python:225"].vi = {
    title: "Khop Chinh xac Su dung ^ va $ Cung nhau (seiki05.py)",
    concept: "**Bieu thuc chinh quy (regular expression)** la mot co che de chi dinh cac mau chuoi phuc tap. Trong Python, nhap module `re` va su dung `re.search(pattern, string)`. Cac ky tu dac biet pho bien gom `^` cho bat dau chuoi va `$` cho ket thuc chuoi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:225:en"
  };

  window.CONTENT_I18N["python:226"] = window.CONTENT_I18N["python:226"] || {};
  window.CONTENT_I18N["python:226"].vi = {
    title: "Ky tu Dai dien: Bat ky Mot Ky tu (.) (seiki06.py)",
    concept: "Cac ky tu dac biet va bo luong tu regex pho bien:\n- `.` — Bat ky mot ky tu nao\n- `*` — Khong hoac nhieu lan lap lai cua mau truoc do\n- `+` — Mot hoac nhieu lan lap lai cua mau truoc do\n- `[a-z]` — Bat ky mot chu thuong nao tu a den z\n- `\\d` — Bat ky mot chu so nao (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:226:en"
  };

  window.CONTENT_I18N["python:227"] = window.CONTENT_I18N["python:227"] || {};
  window.CONTENT_I18N["python:227"].vi = {
    title: "Khong hoac Nhieu Lan Lap lai (*) (seiki07.py)",
    concept: "Cac ky tu dac biet va bo luong tu regex pho bien:\n- `.` — Bat ky mot ky tu nao\n- `*` — Khong hoac nhieu lan lap lai cua mau truoc do\n- `+` — Mot hoac nhieu lan lap lai cua mau truoc do\n- `[a-z]` — Bat ky mot chu thuong nao tu a den z\n- `\\d` — Bat ky mot chu so nao (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:227:en"
  };

  window.CONTENT_I18N["python:228"] = window.CONTENT_I18N["python:228"] || {};
  window.CONTENT_I18N["python:228"].vi = {
    title: "Mot hoac Nhieu Lan Lap lai (+) (seiki08.py)",
    concept: "Cac ky tu dac biet va bo luong tu regex pho bien:\n- `.` — Bat ky mot ky tu nao\n- `*` — Khong hoac nhieu lan lap lai cua mau truoc do\n- `+` — Mot hoac nhieu lan lap lai cua mau truoc do\n- `[a-z]` — Bat ky mot chu thuong nao tu a den z\n- `\\d` — Bat ky mot chu so nao (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:228:en"
  };

  window.CONTENT_I18N["python:229"] = window.CONTENT_I18N["python:229"] || {};
  window.CONTENT_I18N["python:229"].vi = {
    title: "Khong hoac Mot Lan Xuat hien (Tu chon) (?) (seiki09.py)",
    concept: "Cac ky tu dac biet va bo luong tu regex pho bien:\n- `.` — Bat ky mot ky tu nao\n- `*` — Khong hoac nhieu lan lap lai cua mau truoc do\n- `+` — Mot hoac nhieu lan lap lai cua mau truoc do\n- `[a-z]` — Bat ky mot chu thuong nao tu a den z\n- `\\d` — Bat ky mot chu so nao (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:229:en"
  };

  window.CONTENT_I18N["python:230"] = window.CONTENT_I18N["python:230"] || {};
  window.CONTENT_I18N["python:230"].vi = {
    title: "Khop Pham vi Lop Ky tu [a-z] va [0-9] (seiki10.py)",
    concept: "Cac ky tu dac biet va bo luong tu regex pho bien:\n- `.` — Bat ky mot ky tu nao\n- `*` — Khong hoac nhieu lan lap lai cua mau truoc do\n- `+` — Mot hoac nhieu lan lap lai cua mau truoc do\n- `[a-z]` — Bat ky mot chu thuong nao tu a den z\n- `\\d` — Bat ky mot chu so nao (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:230:en"
  };

  window.CONTENT_I18N["python:231"] = window.CONTENT_I18N["python:231"] || {};
  window.CONTENT_I18N["python:231"].vi = {
    title: "Bo Ky tu Dinh san \\d cho Chu so (seiki11.py)",
    concept: "Cac mau xac thuc thuc te pho bien:\n- Ma buu dien (3-4 chu so): `^\\d{3}-\\d{4}$`\n- So dien thoai: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- De chi dinh truc tiep so lan lap lai, su dung `{count}` hoac `{min, max}`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:231:en"
  };

  window.CONTENT_I18N["python:232"] = window.CONTENT_I18N["python:232"] || {};
  window.CONTENT_I18N["python:232"].vi = {
    title: "Chi dinh So lan Lap lai bang Dau Ngoac nhon {m,n} (seiki12.py)",
    concept: "Cac mau xac thuc thuc te pho bien:\n- Ma buu dien (3-4 chu so): `^\\d{3}-\\d{4}$`\n- So dien thoai: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- De chi dinh truc tiep so lan lap lai, su dung `{count}` hoac `{min, max}`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:232:en"
  };

  window.CONTENT_I18N["python:233"] = window.CONTENT_I18N["python:233"] || {};
  window.CONTENT_I18N["python:233"].vi = {
    title: "Nhom Regex va Trich xuat Phan Khop voi Dau ngoac Don (seiki13.py)",
    concept: "Cac mau xac thuc thuc te pho bien:\n- Ma buu dien (3-4 chu so): `^\\d{3}-\\d{4}$`\n- So dien thoai: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- De chi dinh truc tiep so lan lap lai, su dung `{count}` hoac `{min, max}`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:233:en"
  };

  window.CONTENT_I18N["python:234"] = window.CONTENT_I18N["python:234"] || {};
  window.CONTENT_I18N["python:234"].vi = {
    title: "Quet File voi Bieu thuc Chinh quy (seiki14.py)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:234:en"
  };

  window.CONTENT_I18N["python:235"] = window.CONTENT_I18N["python:235"] || {};
  window.CONTENT_I18N["python:235"].vi = {
    title: "Quet File Regex voi Trich xuat Nhom (seiki14_sep.py)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:235:en"
  };

  window.CONTENT_I18N["python:236"] = window.CONTENT_I18N["python:236"] || {};
  window.CONTENT_I18N["python:236"].vi = {
    title: "Trich xuat Ten Nguoi dung voi Regex (seiki15.py)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:236:en"
  };

  window.CONTENT_I18N["python:237"] = window.CONTENT_I18N["python:237"] || {};
  window.CONTENT_I18N["python:237"].vi = {
    title: "Trich xuat Ten Nguoi dung Regex Phan rieng (seiki15_sep.py)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:237:en"
  };

  window.CONTENT_I18N["python:238"] = window.CONTENT_I18N["python:238"] || {};
  window.CONTENT_I18N["python:238"].vi = {
    title: "Trich xuat Du lieu Diem voi Nhom Regex (seiki16.py)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:238:en"
  };

  window.CONTENT_I18N["python:239"] = window.CONTENT_I18N["python:239"] || {};
  window.CONTENT_I18N["python:239"].vi = {
    title: "Trich xuat Du lieu Diem Regex Phan rieng (seiki16_sep.py)",
    concept: "Sau khi doc mot file, ban co the ap dung `re.search()` tung dong mot de trich xuat chi nhung dong khop voi mot mau cu the. Dieu nay huu ich cho viec loc cac file log hoac du lieu van ban co cau truc su dung bieu thuc chinh quy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:239:en"
  };

  window.CONTENT_I18N["python:240"] = window.CONTENT_I18N["python:240"] || {};
  window.CONTENT_I18N["python:240"].vi = {
    title: "Bai tap: Xac thuc Dinh dang So Dien thoai Di dong voi Regex (script12-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 12 (script12-1.py)**\n\nNhiem vu: Xac thuc dinh dang cua so dien thoai di dong su dung bieu thuc chinh quy.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:240:en"
  };

  window.CONTENT_I18N["python:241"] = window.CONTENT_I18N["python:241"] || {};
  window.CONTENT_I18N["python:241"].vi = {
    title: "Bai tap: Trich xuat Du lieu Hoc sinh tu File Bang Regex (script12-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 12 (script12-2.py)**\n\nNhiem vu: Trich xuat du lieu hoc sinh tu mot file su dung bieu thuc chinh quy.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:241:en"
  };

  window.CONTENT_I18N["python:242"] = window.CONTENT_I18N["python:242"] || {};
  window.CONTENT_I18N["python:242"].vi = {
    title: "Bai tap: Phan tich Du lieu Diem Phuc tap Bang Nhom Regex (script12-3.py)",
    concept: "**Bai tap Thuc hanh Chuong 12 (script12-3.py)**\n\nNhiem vu: Phan tich du lieu diem phuc tap su dung cac nhom bat regex.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:242:en"
  };

  window.CONTENT_I18N["python:243"] = window.CONTENT_I18N["python:243"] || {};
  window.CONTENT_I18N["python:243"].vi = {
    title: "Ngoai le Runtime: Chia cho Khong (ZeroDivisionError) (reigai01.py)",
    concept: "Cac loi xay ra trong qua trinh thuc thi chuong trinh duoc goi la **ngoai le (exception)**. Khi mot ngoai le xay ra, chuong trinh thuong ket thuc bat buoc. De xu ly loi mot cach an toan, dat ma binh thuong trong khoi `try` va ma xu ly loi trong khoi `except`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:243:en"
  };

  window.CONTENT_I18N["python:244"] = window.CONTENT_I18N["python:244"] || {};
  window.CONTENT_I18N["python:244"].vi = {
    title: "Ngoai le Runtime: Chi so Vuot qua Pham vi (IndexError) (reigai02.py)",
    concept: "Cac loi xay ra trong qua trinh thuc thi chuong trinh duoc goi la **ngoai le (exception)**. Khi mot ngoai le xay ra, chuong trinh thuong ket thuc bat buoc. De xu ly loi mot cach an toan, dat ma binh thuong trong khoi `try` va ma xu ly loi trong khoi `except`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:244:en"
  };

  window.CONTENT_I18N["python:245"] = window.CONTENT_I18N["python:245"] || {};
  window.CONTENT_I18N["python:245"].vi = {
    title: "Bat Ngoai le voi try-except (reigai03.py)",
    concept: "Cac loi xay ra trong qua trinh thuc thi chuong trinh duoc goi la **ngoai le (exception)**. Khi mot ngoai le xay ra, chuong trinh thuong ket thuc bat buoc. De xu ly loi mot cach an toan, dat ma binh thuong trong khoi `try` va ma xu ly loi trong khoi `except`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:245:en"
  };

  window.CONTENT_I18N["python:246"] = window.CONTENT_I18N["python:246"] || {};
  window.CONTENT_I18N["python:246"].vi = {
    title: "Lay Thong tin Chi tiet Ngoai le trong Khoi except (reigai04.py)",
    concept: "Cac loi xay ra trong qua trinh thuc thi chuong trinh duoc goi la **ngoai le (exception)**. Khi mot ngoai le xay ra, chuong trinh thuong ket thuc bat buoc. De xu ly loi mot cach an toan, dat ma binh thuong trong khoi `try` va ma xu ly loi trong khoi `except`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:246:en"
  };

  window.CONTENT_I18N["python:247"] = window.CONTENT_I18N["python:247"] || {};
  window.CONTENT_I18N["python:247"].vi = {
    title: "Su dung Khoi else (Khong co Ngoai le) (reigai07.py)",
    concept: "Cac loi co kieu cu the nhu `ZeroDivisionError` (chia cho khong), `ValueError` (chuyen doi so khong hop le), va `IndexError` (chi so list vuot pham vi). Bang cach chi dinh kieu nhu `except ValueError:`, ban co the viet xu ly khac nhau cho tung loai loi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:247:en"
  };

  window.CONTENT_I18N["python:248"] = window.CONTENT_I18N["python:248"] || {};
  window.CONTENT_I18N["python:248"].vi = {
    title: "Xu ly Nhieu Loai Ngoai le (reigai05.py)",
    concept: "Cac loi co kieu cu the nhu `ZeroDivisionError` (chia cho khong), `ValueError` (chuyen doi so khong hop le), va `IndexError` (chi so list vuot pham vi). Bang cach chi dinh kieu nhu `except ValueError:`, ban co the viet xu ly khac nhau cho tung loai loi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:248:en"
  };

  window.CONTENT_I18N["python:249"] = window.CONTENT_I18N["python:249"] || {};
  window.CONTENT_I18N["python:249"].vi = {
    title: "Bat Tat ca Ngoai le voi Lop Exception Cha (reigai06.py)",
    concept: "Cac loi co kieu cu the nhu `ZeroDivisionError` (chia cho khong), `ValueError` (chuyen doi so khong hop le), va `IndexError` (chi so list vuot pham vi). Bang cach chi dinh kieu nhu `except ValueError:`, ban co the viet xu ly khac nhau cho tung loai loi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:249:en"
  };

  window.CONTENT_I18N["python:250"] = window.CONTENT_I18N["python:250"] || {};
  window.CONTENT_I18N["python:250"].vi = {
    title: "Lan truyen Ngoai le den Noi Goi (reigai08.py)",
    concept: "Cac loi co kieu cu the nhu `ZeroDivisionError` (chia cho khong), `ValueError` (chuyen doi so khong hop le), va `IndexError` (chi so list vuot pham vi). Bang cach chi dinh kieu nhu `except ValueError:`, ban co the viet xu ly khac nhau cho tung loai loi.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:250:en"
  };

  window.CONTENT_I18N["python:251"] = window.CONTENT_I18N["python:251"] || {};
  window.CONTENT_I18N["python:251"].vi = {
    title: "Don Dep Bat buoc voi Khoi finally (reigai09.py)",
    concept: "Su dung khoi `finally:` cho ma **nhat dinh phai thuc thi** bat ke co ngoai le xay ra hay khong. Dieu nay huu ich cho cac thao tac dong file. Ngoai ra, su dung tu khoa `raise` de chu dong nem ra mot ngoai le.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:251:en"
  };

  window.CONTENT_I18N["python:252"] = window.CONTENT_I18N["python:252"] || {};
  window.CONTENT_I18N["python:252"].vi = {
    title: "Bai tap: Ham Kiem tra Doi so va Nem Ngoai le (script13-1.py)",
    concept: "**Bai tap Thuc hanh Chuong 13 (script13-1.py)**\n\nNhiem vu: Tao mot ham kiem tra doi so va nem ra ngoai le.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:252:en"
  };

  window.CONTENT_I18N["python:253"] = window.CONTENT_I18N["python:253"] || {};
  window.CONTENT_I18N["python:253"].vi = {
    title: "Bai tap: Bat Ngoai le Cu the va Xu ly Phuc hoi (script13-2.py)",
    concept: "**Bai tap Thuc hanh Chuong 13 (script13-2.py)**\n\nNhiem vu: Bat cac ngoai le cu the va thuc hien xu ly phuc hoi.\n\nKiem tra ma mau trong trinh soan thao va dien vao cac phan con thieu de hoan thanh chuong trinh. Nhan nut Run ben phai de xac minh ket qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:253:en"
  };

  window.CONTENT_I18N["python:254"] = window.CONTENT_I18N["python:254"] || {};
  window.CONTENT_I18N["python:254"].vi = {
    title: "Chu dong Nem Ngoai le voi raise (reigai10.py)",
    concept: "Su dung khoi `finally:` cho ma **nhat dinh phai thuc thi** bat ke co ngoai le xay ra hay khong. Dieu nay huu ich cho cac thao tac dong file. Ngoai ra, su dung tu khoa `raise` de chu dong nem ra mot ngoai le.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:254:en"
  };

  window.CONTENT_I18N["python:255"] = window.CONTENT_I18N["python:255"] || {};
  window.CONTENT_I18N["python:255"].vi = {
    title: "Dinh nghia va Nem Lop Ngoai le Tu dinh nghia (reigai11.py)",
    concept: "Su dung khoi `finally:` cho ma **nhat dinh phai thuc thi** bat ke co ngoai le xay ra hay khong. Dieu nay huu ich cho cac thao tac dong file. Ngoai ra, su dung tu khoa `raise` de chu dong nem ra mot ngoai le.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:255:en"
  };

})();
