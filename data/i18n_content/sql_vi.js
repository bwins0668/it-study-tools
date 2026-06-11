(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sql:1"] = window.CONTENT_I18N["sql:1"] || {};
  window.CONTENT_I18N["sql:1"].vi = {
    title: "01-SQL và Cơ sở dữ liệu là gì?",
    concept: "Một cơ sở dữ liệu (DB) là một tập hợp dữ liệu được tổ chức một cách có hệ thống.\n\nTrong hầu hết các hệ thống, dữ liệu được quản lý dưới dạng các bảng bằng cách sử dụng **Cơ sở dữ liệu quan hệ (RDB)**.\n\n**SQL** là ngôn ngữ chuyên dụng được sử dụng để ra lệnh cho cơ sở dữ liệu — yêu cầu nó \"truy xuất dữ liệu,\" \"chèn dữ liệu,\" v.v.\n\nTrong bài học này, bạn sẽ học lệnh truy xuất dữ liệu cơ bản nhất bằng cách lấy dữ liệu từ bảng thông tin học sinh (student master table) của trường học.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:1:en"
  };

  window.CONTENT_I18N["sql:2"] = window.CONTENT_I18N["sql:2"] || {};
  window.CONTENT_I18N["sql:2"].vi = {
    title: "02-Cấu trúc bảng, Kiểu dữ liệu và Khóa chính",
    concept: "Một bảng bao gồm các cột (columns) và các hàng (rows).\n\nMỗi cột được gán một **kiểu dữ liệu (data type)** (chẳng hạn như số, văn bản hoặc ngày tháng), và dữ liệu không khớp với kiểu này sẽ không thể chèn vào bảng.\n\nNgoài ra, một **khóa chính (Primary Key)** được thiết lập cho bảng như một định danh duy nhất để phân biệt từng hàng.\n\nTrong cơ sở dữ liệu của trường học, `department_id` đóng vai trò là khóa chính cho bảng `departments_mst`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:2:en"
  };

  window.CONTENT_I18N["sql:3"] = window.CONTENT_I18N["sql:3"] || {};
  window.CONTENT_I18N["sql:3"].vi = {
    title: "03-Cú pháp SELECT cơ bản",
    concept: "Cách cơ bản nhất để truy xuất dữ liệu là sử dụng cấu trúc: `SELECT column_name FROM table_name;`.\n\nNếu bạn muốn lấy tất cả các cột, hãy chỉ định ký tự `*` (dấu sao) thay vì tên các cột riêng lẻ.\n\nNếu bạn chỉ cần các cột cụ thể, hãy liệt kê tên của chúng cách nhau bằng dấu phẩy.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:3:en"
  };

  window.CONTENT_I18N["sql:4"] = window.CONTENT_I18N["sql:4"] || {};
  window.CONTENT_I18N["sql:4"].vi = {
    title: "04-Lọc các hàng bằng mệnh đề WHERE",
    concept: "Để lọc dữ liệu và chỉ lấy các hàng bạn cần, hãy sử dụng mệnh đề **WHERE**.\n\nBạn viết nó như sau: `SELECT column_name FROM table_name WHERE condition;`.\n\nVí dụ, để chỉ tìm các học sinh nữ (trong đó gender là '1'), bạn sẽ viết:\n\n```sql\nSELECT * FROM students_mst WHERE gender = '1';\n```\n\nKhi chỉ định văn bản, bạn phải đặt nó trong dấu nháy đơn `'`. Điều kiện có thể kiểm tra xem các cột có bằng, lớn hơn hoặc nhỏ hơn các giá trị nhất định hay không.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:4:en"
  };

  window.CONTENT_I18N["sql:5"] = window.CONTENT_I18N["sql:5"] || {};
  window.CONTENT_I18N["sql:5"].vi = {
    title: "05-Kết hợp các điều kiện bằng AND",
    concept: "Khi bạn cần **tất cả các điều kiện phải đúng cùng một lúc**, hãy sử dụng **AND**.\n\nVí dụ, để tìm học sinh 24 tuổi ở department 1:\n\n```sql\nSELECT * FROM students_mst\nWHERE age = 24 AND department_id = 1;\n```\n\nCả điều kiện age VÀ điều kiện department đều phải được thỏa mãn. Nếu một trong hai điều kiện sai, hàng đó sẽ bị loại khỏi kết quả.\n\n**AND** thu hẹp phạm vi tìm kiếm của bạn — bạn càng thêm nhiều điều kiện, bạn càng nhận được ít kết quả.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:5:en"
  };

  window.CONTENT_I18N["sql:6"] = window.CONTENT_I18N["sql:6"] || {};
  window.CONTENT_I18N["sql:6"].vi = {
    title: "06-Kết hợp các điều kiện bằng OR",
    concept: "Khi bạn cần **chỉ cần ít nhất một trong số nhiều điều kiện là đúng**, hãy sử dụng **OR**.\n\nVí dụ, để tìm học sinh thuộc department 1 HOẶC department 2:\n\n```sql\nSELECT * FROM students_mst\nWHERE department_id = 1 OR department_id = 2;\n```\n\nVới OR, chỉ cần có ít nhất một điều kiện đúng, hàng đó sẽ được đưa vào kết quả.\n\nKhác với AND giúp thu hẹp kết quả, **OR mở rộng** phạm vi tìm kiếm của bạn.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:6:en"
  };

  window.CONTENT_I18N["sql:7"] = window.CONTENT_I18N["sql:7"] || {};
  window.CONTENT_I18N["sql:7"].vi = {
    title: "07-Kết hợp các điều kiện AND và OR",
    concept: "Bạn có thể kết hợp cả **AND** và **OR** trong cùng một mệnh đề WHERE.\n\nTuy nhiên, AND và OR có độ ưu tiên khác nhau — **AND được đánh giá trước OR**, giống như phép nhân trước phép cộng trong toán học.\n\nĐể kiểm soát thứ tự đánh giá, hãy sử dụng dấu ngoặc đơn `()`:\n\n```sql\nSELECT * FROM students_mst\nWHERE (age = 20 OR age = 24) AND gender = '0';\n```\n\nLệnh này tìm các học sinh nam có tuổi là 20 HOẶC 24. Nếu không có dấu ngoặc đơn, AND sẽ chạy trước và kết quả sẽ khác.\n\nLuôn sử dụng dấu ngoặc đơn để làm cho logic truy vấn của bạn rõ ràng và chính xác.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:7:en"
  };

  window.CONTENT_I18N["sql:8"] = window.CONTENT_I18N["sql:8"] || {};
  window.CONTENT_I18N["sql:8"].vi = {
    title: "08-Sử dụng các toán tử so sánh",
    concept: "Ngoài dấu bằng (`=`), SQL hỗ trợ một số **toán tử so sánh** để tạo ra các điều kiện linh hoạt hơn:\n\n- `=` : Bằng\n- `<>` hoặc `!=` : Không bằng\n- `>` : Lớn hơn\n- `<` : Nhỏ hơn\n- `>=` : Lớn hơn hoặc bằng\n- `<=` : Nhỏ hơn hoặc bằng\n\nVí dụ, để tìm học sinh có điểm kiểm tra từ 90 trở lên:\n\n```sql\nSELECT * FROM students_mst WHERE test_score >= 90;\n```\n\nCác toán tử này hoạt động với số, ngày tháng và thậm chí cả văn bản trong một số trường hợp.\n\nHãy cẩn thận: `>= 90` bao gồm cả 90, trong khi `> 90` thì không.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:8:en"
  };

  window.CONTENT_I18N["sql:9"] = window.CONTENT_I18N["sql:9"] || {};
  window.CONTENT_I18N["sql:9"].vi = {
    title: "09-Kiểm tra NULL bằng IS NULL và IS NOT NULL",
    concept: "Khi một cột không có dữ liệu được nhập, giá trị của nó là **NULL**. NULL không phải là số không (0), không phải là một chuỗi rỗng — nó có nghĩa là \"hoàn toàn không có giá trị\".\n\nĐể kiểm tra NULL, bạn **không thể** sử dụng `= NULL` hoặc `<> NULL`. Thay vào đó, hãy sử dụng các toán tử đặc biệt:\n\n```sql\n-- Tìm học sinh có delete_at là NULL (chưa bị xóa)\nSELECT * FROM students_mst WHERE delete_at IS NULL;\n\n-- Tìm học sinh có delete_at khác NULL (đã bị xóa)\nSELECT * FROM students_mst WHERE delete_at IS NOT NULL;\n```\n\n**IS NULL** kiểm tra dữ liệu bị thiếu. **IS NOT NULL** kiểm tra dữ liệu hiện có.\n\nHãy nghĩ về nó giống như việc kiểm tra xem một chiếc túi có tồn tại hay không (IS NOT NULL) so với việc kiểm tra xem chiếc túi đó có trống rỗng hay không (đó là một khái niệm hoàn toàn khác).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:9:en"
  };

  window.CONTENT_I18N["sql:10"] = window.CONTENT_I18N["sql:10"] || {};
  window.CONTENT_I18N["sql:10"].vi = {
    title: "10-Tìm kiếm văn bản bằng LIKE",
    concept: "Khi bạn muốn tìm kiếm theo một **mẫu (pattern)** thay vì khớp chính xác, hãy sử dụng **LIKE** với các **ký tự đại diện (wildcard characters)**:\n\n- `%` : Khớp với bất kỳ chuỗi ký tự nào (không hoặc nhiều ký tự)\n- `_` : Khớp với chính xác một ký tự\n\nVí dụ, để tìm học sinh có tên kana bắt đầu bằng \"Yama\":\n\n```sql\nSELECT * FROM students_mst\nWHERE student_name_kana LIKE 'Yama%';\n```\n\nLệnh này sẽ tìm thấy 'Yamada', 'Yamamoto', 'Yamashita' — bất cứ thứ gì bắt đầu bằng 'Yama'.\n\nNếu bạn sử dụng `_ama%`, nó sẽ khớp với các tên có ký tự thứ hai là 'a', ký tự thứ ba là 'm', ký tự thứ tư là 'a', theo sau là bất kỳ thứ gì.\n\nLIKE mặc định không phân biệt chữ hoa chữ thường trong MySQL, nhưng hành vi này có thể thay đổi tùy thuộc vào hệ quản trị cơ sở dữ liệu khác.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:10:en"
  };

  window.CONTENT_I18N["sql:11"] = window.CONTENT_I18N["sql:11"] || {};
  window.CONTENT_I18N["sql:11"].vi = {
    title: "11-Lọc các phạm vi bằng BETWEEN",
    concept: "Để tìm các giá trị nằm **trong một phạm vi cụ thể**, hãy sử dụng **BETWEEN**.\n\nVí dụ, để tìm học sinh từ 20 đến 25 tuổi:\n\n```sql\nSELECT * FROM students_mst WHERE age BETWEEN 20 AND 25;\n```\n\nBETWEEN tính **bao gồm cả các điểm đầu cuối** — nó bao gồm cả giá trị bắt đầu và giá trị kết thúc. Do đó, `BETWEEN 20 AND 25` bao gồm cả các độ tuổi 20, 21, 22, 23, 24 và 25.\n\nBạn có thể sử dụng BETWEEN với số, ngày tháng và cả văn bản. Nó giúp các truy vấn phạm vi trở nên rõ ràng và ngắn gọn hơn so với việc sử dụng `>=` và `<=`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:11:en"
  };

  window.CONTENT_I18N["sql:12"] = window.CONTENT_I18N["sql:12"] || {};
  window.CONTENT_I18N["sql:12"].vi = {
    title: "12-Khớp nhiều giá trị bằng IN",
    concept: "Khi bạn muốn kiểm tra xem một giá trị có khớp với **bất kỳ một trong số nhiều giá trị cụ thể** hay không, hãy sử dụng **IN**.\n\nVí dụ, để tìm học sinh có tuổi là 20, 25 hoặc 30:\n\n```sql\nSELECT * FROM students_mst WHERE age IN (20, 25, 30);\n```\n\nCách này ngắn hơn nhiều so với việc viết:\n```sql\nWHERE age = 20 OR age = 25 OR age = 30\n```\n\nIN hoạt động với cả số và văn bản. Bạn cũng có thể sử dụng IN với một truy vấn con (một truy vấn bên trong một truy vấn khác).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:12:en"
  };

  window.CONTENT_I18N["sql:13"] = window.CONTENT_I18N["sql:13"] || {};
  window.CONTENT_I18N["sql:13"].vi = {
    title: "13-Sắp xếp các hàng bằng ORDER BY",
    concept: "Để hiển thị kết quả truy vấn của bạn theo một thứ tự cụ thể, hãy sử dụng **ORDER BY**.\n\nTheo mặc định, việc sắp xếp là **tăng dần** (từ nhỏ nhất đến lớn nhất, từ A đến Z). Để đảo ngược thứ tự, hãy thêm **DESC** (giảm dần):\n\n```sql\n-- Sắp xếp theo tuổi từ thấp đến cao (tăng dần)\nSELECT * FROM students_mst ORDER BY age;\n\n-- Sắp xếp theo tuổi từ cao đến thấp (giảm dần)\nSELECT * FROM students_mst ORDER BY age DESC;\n```\n\nBạn cũng có thể sắp xếp theo nhiều cột:\n\n```sql\nSELECT * FROM students_mst ORDER BY department_id, age DESC;\n```\n\nLệnh này sắp xếp trước hết theo department, sau đó sắp xếp theo tuổi giảm dần trong mỗi department.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:13:en"
  };

  window.CONTENT_I18N["sql:14"] = window.CONTENT_I18N["sql:14"] || {};
  window.CONTENT_I18N["sql:14"].vi = {
    title: "14-Giới hạn số lượng hàng bằng LIMIT",
    concept: "Khi bạn chỉ muốn lấy **một vài hàng đầu tiên** của kết quả, hãy sử dụng **LIMIT**.\n\nVí dụ, để tìm 3 học sinh có điểm kiểm tra cao nhất:\n\n```sql\nSELECT * FROM students_mst\nORDER BY test_score DESC\nLIMIT 3;\n```\n\nTruy vấn trước hết sắp xếp theo điểm giảm dần, sau đó LIMIT chỉ giữ lại 3 hàng đầu tiên.\n\nLIMIT được đặt ở cuối cùng của truy vấn, sau ORDER BY.\n\nĐiều này đặc biệt hữu ích khi bạn muốn xem trước dữ liệu hoặc cần triển khai phân trang.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:14:en"
  };

  window.CONTENT_I18N["sql:15"] = window.CONTENT_I18N["sql:15"] || {};
  window.CONTENT_I18N["sql:15"].vi = {
    title: "15-Loại bỏ các giá trị trùng lặp bằng DISTINCT",
    concept: "Khi một cột chứa các giá trị trùng lặp và bạn muốn **chỉ xem các giá trị duy nhất**, hãy thêm **DISTINCT** sau SELECT.\n\nVí dụ, để xem những độ tuổi nào tồn tại trong bảng học sinh của bạn (không lặp lại):\n\n```sql\nSELECT DISTINCT age FROM students_mst;\n```\n\nNếu không có DISTINCT, bạn sẽ nhận được cùng một độ tuổi được liệt kê nhiều lần — mỗi lần cho một học sinh.\n\nDISTINCT áp dụng cho tất cả các cột được chọn. Nếu bạn viết `SELECT DISTINCT age, name`, nó sẽ hiển thị các tổ hợp duy nhất của age VÀ name cùng nhau.\n\nDISTINCT rất hữu ích để khám phá những giá trị thực sự tồn tại trong dữ liệu của bạn.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:15:en"
  };

  window.CONTENT_I18N["sql:16"] = window.CONTENT_I18N["sql:16"] || {};
  window.CONTENT_I18N["sql:16"].vi = {
    title: "16-Sử dụng các hàm chuỗi và ngày tháng trong SQL",
    concept: "SQL cung cấp many built-in **hàm (functions)** để biến đổi, tính toán hoặc trích xuất các phần của dữ liệu.\n\nCác hàm chuỗi phổ biến:\n- `CHAR_LENGTH(str)` — số lượng ký tự trong một chuỗi\n- `CONCAT(a, b)` — nối hai chuỗi lại với nhau\n- `UPPER(str)` / `LOWER(str)` — thay đổi kiểu chữ (hoa/thường)\n\nCác hàm ngày tháng phổ biến:\n- `CURRENT_DATE` — ngày hôm nay\n- `YEAR(date)` / `MONTH(date)` — trích xuất một phần của ngày\n\nVí dụ:\n```sql\nSELECT student_name, CHAR_LENGTH(student_name) AS name_length\nFROM students_mst;\n```\n\nCác hàm không sửa đổi dữ liệu gốc — chúng chỉ biến đổi kết quả được hiển thị.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:16:en"
  };

  window.CONTENT_I18N["sql:17"] = window.CONTENT_I18N["sql:17"] || {};
  window.CONTENT_I18N["sql:17"].vi = {
    title: "17-Sử dụng biểu thức CASE cho logic điều kiện",
    concept: "**CASE** cho phép bạn thêm **logic if-then-else** trực tiếp vào bên trong truy vấn SQL của bạn.\n\nCú pháp cơ bản:\n```sql\nSELECT student_name, age,\n  CASE\n    WHEN age >= 20 THEN 'Adult'\n    ELSE 'Minor'\n  END AS age_group\nFROM students_mst;\n```\n\nCASE kiểm tra từng điều kiện WHEN theo thứ tự. Điều kiện khớp đầu tiên sẽ được chọn. Nếu không có điều kiện nào khớp, ELSE sẽ được sử dụng (hoặc NULL nếu không có ELSE).\n\nBạn cũng có thể sử dụng CASE với nhiều điều kiện:\n```sql\nCASE\n  WHEN score >= 80 THEN 'Excellent'\n  WHEN score >= 60 THEN 'Good'\n  ELSE 'Needs Improvement'\nEND\n```\n\nCASE được đánh giá cho từng hàng, làm cho nó trở thành một công cụ mạnh mẽ để tạo ra các cột tính toán.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:17:en"
  };

  window.CONTENT_I18N["sql:18"] = window.CONTENT_I18N["sql:18"] || {};
  window.CONTENT_I18N["sql:18"].vi = {
    title: "18-Các hàm gộp: SUM, AVG, COUNT, v.v.",
    concept: "Các hàm thực hiện tính toán trên nhiều hàng dữ liệu cùng nhau được gọi là **các hàm gộp (aggregate functions)**.\n\n- **COUNT(column)**: Đếm số lượng hàng.\n- **SUM(column)**: Tính tổng giá trị.\n- **AVG(column)**: Tính giá trị trung bình.\n- **MAX(column)** / **MIN(column)**: Tìm giá trị lớn nhất / nhỏ nhất.\n\nSử dụng các hàm gộp cho phép bạn có được các số liệu thống kê cho toàn bộ nhóm thay vì các hàng riêng lẻ.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:18:en"
  };

  window.CONTENT_I18N["sql:19"] = window.CONTENT_I18N["sql:19"] || {};
  window.CONTENT_I18N["sql:19"].vi = {
    title: "19-Nhóm dữ liệu: GROUP BY",
    concept: "Để chia dữ liệu thành các nhóm và thực hiện các phép gộp trên từng nhóm, hãy sử dụng mệnh đề **GROUP BY**.\n\nBạn viết nó như sau:\n\n```sql\nSELECT gender, AVG(age) FROM students GROUP BY gender;\n```\n\nĐiều này cho phép bạn tính toán các số liệu thống kê như \"tuổi trung bình của học sinh nam\" và \"tuổi trung bình của học sinh nữ\" cùng một lúc.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:19:en"
  };

  window.CONTENT_I18N["sql:20"] = window.CONTENT_I18N["sql:20"] || {};
  window.CONTENT_I18N["sql:20"].vi = {
    title: "20-Lọc các nhóm: HAVING",
    concept: "Nếu bạn muốn lọc kết quả **sau khi** chúng đã được gộp bởi GROUP BY, hãy sử dụng mệnh đề **HAVING** thay vì WHERE.\n\nMệnh đề WHERE lọc các hàng **trước khi** chúng được nhóm lại, trong khi mệnh đề HAVING lọc các nhóm **sau khi** chúng đã được nhóm lại.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:20:en"
  };

  window.CONTENT_I18N["sql:21"] = window.CONTENT_I18N["sql:21"] || {};
  window.CONTENT_I18N["sql:21"].vi = {
    title: "21-Thiết kế cơ sở dữ liệu và Chuẩn hóa",
    concept: "Trong thiết kế cơ sở dữ liệu, dữ liệu được chia nhỏ thành nhiều bảng để tránh trùng lặp không cần thiết và sự không nhất quán. Quá trình này được gọi là **chuẩn hóa (normalization)**.\n\nVí dụ, thay vị viết trực tiếp tên phòng ban (department name) trong bảng học sinh, bạn chỉ viết \"department ID\" và quản lý chi tiết trong một bảng phòng ban riêng biệt.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:21:en"
  };

  window.CONTENT_I18N["sql:22"] = window.CONTENT_I18N["sql:22"] || {};
  window.CONTENT_I18N["sql:22"].vi = {
    title: "22-Liên kết bảng: INNER JOIN",
    concept: "**JOIN** là quá trình liên kết các bảng riêng biệt lại với nhau để truy xuất thông tin kết hợp.\n\nMột **INNER JOIN (liên kết trong)** chỉ truy xuất các hàng nơi các khóa chung khớp nhau trong cả hai bảng.\n\nBạn viết nó như sau:\n\n```sql\nFROM table_A INNER JOIN table_B ON table_A.key = table_B.key\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:22:en"
  };

  window.CONTENT_I18N["sql:23"] = window.CONTENT_I18N["sql:23"] || {};
  window.CONTENT_I18N["sql:23"].vi = {
    title: "23-Liên kết bảng: LEFT/RIGHT JOIN",
    concept: "Một **OUTER JOIN** giữ lại tất cả dữ liệu từ một bảng trong khi liên kết dữ liệu khớp từ một bảng khác.\n\n- **LEFT JOIN**: Giữ lại tất cả dữ liệu từ bảng được viết ở bên trái của mệnh đề FROM.\n- **RIGHT JOIN**: Giữ lại tất cả dữ liệu từ bảng được viết ở bên phải.\n\nNếu không có bản ghi phù hợp trong bảng kia, nó sẽ được điền bằng `NULL`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:23:en"
  };

  window.CONTENT_I18N["sql:24"] = window.CONTENT_I18N["sql:24"] || {};
  window.CONTENT_I18N["sql:24"].vi = {
    title: "24-Tự liên kết và Nhiều liên kết",
    concept: "Liên kết một bảng với chính nó được gọi là **tự liên kết (self join)**.\n\nĐiều này hữu ích khi bạn muốn trích xuất các cặp có liên quan từ cùng một bảng.\n\nBạn chỉ định các bí danh (tên tạm thời) như `students_mst AS s1` và xử lý nó như thể nó là một bảng riêng biệt.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:24:en"
  };

  window.CONTENT_I18N["sql:25"] = window.CONTENT_I18N["sql:25"] || {};
  window.CONTENT_I18N["sql:25"].vi = {
    title: "25-Sử dụng truy vấn con",
    concept: "Một truy vấn SQL được lồng bên trong một truy vấn SQL khác được gọi là **truy vấn con (subquery)**.\n\nVí dụ: nếu bạn muốn \"danh sách các học sinh có điểm cao hơn điểm trung bình\", trước tiên bạn tính điểm trung bình bằng truy vấn con, sau đó sử dụng kết quả đó để lọc các hàng trong truy vấn SQL bên ngoài.\n\nBạn viết truy vấn SQL bên trong bên trong dấu ngoặc đơn `()`.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:25:en"
  };

  window.CONTENT_I18N["sql:26"] = window.CONTENT_I18N["sql:26"] || {};
  window.CONTENT_I18N["sql:26"].vi = {
    title: "26-Chèn hàng bằng INSERT",
    concept: "Để đăng ký dữ liệu mới vào bảng, hãy sử dụng câu lệnh **INSERT**.\n\nBạn viết nó như sau:\n\n```sql\nINSERT INTO table_name (column1, column2) VALUES (value1, value2);\n```\n\nThứ tự của các giá trị phải khớp với thứ tự của các cột được chỉ định.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:26:en"
  };

  window.CONTENT_I18N["sql:27"] = window.CONTENT_I18N["sql:27"] || {};
  window.CONTENT_I18N["sql:27"].vi = {
    title: "27-Cập nhật hàng bằng UPDATE",
    concept: "Để sửa đổi dữ liệu hiện có trong bảng, hãy sử dụng câu lệnh **UPDATE**.\n\nBạn viết nó như sau:\n\n```sql\nUPDATE table_name SET column_name = new_value WHERE condition;\n```\n\n> [!CAUTION]\n> **Cực kỳ quan trọng**: Nếu bạn quên viết mệnh đề WHERE, tất cả các hàng trong bảng sẽ bị cập nhật!",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:27:en"
  };

  window.CONTENT_I18N["sql:28"] = window.CONTENT_I18N["sql:28"] || {};
  window.CONTENT_I18N["sql:28"].vi = {
    title: "28-Xóa hàng bằng DELETE",
    concept: "Để xóa dữ liệu khỏi bảng, hãy sử dụng câu lệnh **DELETE**.\n\nBạn viết nó như sau:\n\n```sql\nDELETE FROM table_name WHERE condition;\n```\n\n> [!CAUTION]\n> **Cực kỳ quan trọng**: Tương tự như câu lệnh UPDATE, nếu không có mệnh đề WHERE, tất cả các hàng trong bảng sẽ bị xóa!",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:28:en"
  };

  window.CONTENT_I18N["sql:29"] = window.CONTENT_I18N["sql:29"] || {};
  window.CONTENT_I18N["sql:29"].vi = {
    title: "29-Tạo bảng bằng CREATE TABLE",
    concept: "Để tạo một bảng mới, hãy sử dụng câu lệnh **CREATE TABLE**.\n\nBạn định nghĩa nó như sau:\n\n```sql\nCREATE TABLE table_name (column_name data_type, column_name data_type, ...);\n```\n\nVí dụ: để đặt một cột làm khóa chính, hãy khai báo nó với ràng buộc \"PRIMARY KEY\".",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:29:en"
  };

  window.CONTENT_I18N["sql:30"] = window.CONTENT_I18N["sql:30"] || {};
  window.CONTENT_I18N["sql:30"].vi = {
    title: "30-Sử dụng ràng buộc: NOT NULL, UNIQUE và DEFAULT",
    concept: "Bạn có thể đặt các quy tắc (ràng buộc - constraints) trên các cột của bảng để duy trì chất lượng dữ liệu:\n\n- **NOT NULL**: Không cho phép khoảng trống (NULL).\n- **UNIQUE**: Không cho phép các giá trị trùng lặp.\n- **DEFAULT value**: Đặt giá trị tự động được nhập khi một giá trị bị bỏ qua.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:30:en"
  };

  window.CONTENT_I18N["sql:31"] = window.CONTENT_I18N["sql:31"] || {};
  window.CONTENT_I18N["sql:31"].vi = {
    title: "31-Khóa chính và Tự động tăng",
    concept: "Một bảng chỉ có thể có một khóa chính (PRIMARY KEY).\n\nTrong MySQL, việc chỉ định **AUTO_INCREMENT** cho khóa chính sẽ tự động gán các số thứ tự như \"1, 2, 3...\" khi dữ liệu mới được chèn.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:31:en"
  };

  window.CONTENT_I18N["sql:32"] = window.CONTENT_I18N["sql:32"] || {};
  window.CONTENT_I18N["sql:32"].vi = {
    title: "32-Ràng buộc khóa ngoại",
    concept: "Để đảm bảo mối quan hệ và tính nhất quán giữa các bảng, hãy sử dụng ràng buộc **khóa ngoại (FOREIGN KEY)**.\n\n- Ví dụ: bạn có thể thực thi quy tắc rằng \"department_id của học sinh phải tồn tại trong cột department_id của bảng departments_mst.\" Điều này ngăn chặn việc đăng ký các ID phòng ban không tồn tại.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:32:en"
  };

  window.CONTENT_I18N["sql:33"] = window.CONTENT_I18N["sql:33"] || {};
  window.CONTENT_I18N["sql:33"].vi = {
    title: "33-Sửa đổi và Xóa bảng bằng ALTER và DROP",
    concept: "Các thao tác này được thực hiện sau khi một bảng đã được tạo:\n\n- **ALTER TABLE**: Sửa đổi cấu trúc của bảng, chẳng hạn như thêm hoặc thay đổi cột.\n  - Thêm một cột: `ALTER TABLE table_name ADD column_name data_type;`\n- **DROP TABLE**: Xóa vĩnh viễn chính bảng đó.\n  - `DROP TABLE table_name;` (Lưu ý: Tất cả dữ liệu bên trong bảng cũng sẽ bị xóa.)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:33:en"
  };

  window.CONTENT_I18N["sql:34"] = window.CONTENT_I18N["sql:34"] || {};
  window.CONTENT_I18N["sql:34"].vi = {
    title: "34-Xử lý giao dịch",
    concept: "Một cơ chế nhóm nhiều thao tác và xử lý chúng như \"một đơn vị công việc duy nhất\" được gọi là **giao dịch (transaction)**.\n\n- **COMMIT**: Hoàn tất và lưu tất cả các thay đổi.\n- **ROLLBACK**: Hoàn tác tất cả các thao tác trở lại trạng thái trước khi giao dịch bắt đầu nếu xảy ra lỗi.\n\nĐiều này là cần thiết cho các quy trình không thể chấp nhận thất bại một phần, chẳng hạn như chuyển khoản ngân hàng (trừ tiền từ Tài khoản A và gửi vào Tài khoản B).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:34:en"
  };

  window.CONTENT_I18N["sql:35"] = window.CONTENT_I18N["sql:35"] || {};
  window.CONTENT_I18N["sql:35"].vi = {
    title: "35-Chỉ mục để tìm kiếm nhanh",
    concept: "Một danh mục được tạo ra để tăng tốc độ truy xuất dữ liệu trong bảng được gọi là \"chỉ mục (INDEX)\".\n\nTrên các bảng có lượng dữ liệu lớn, việc tạo chỉ mục trên các cột cụ thể có thể cải thiện đáng kể tốc độ tìm kiếm.\n\nTuy nhiên, việc có quá nhiều chỉ mục có nhược điểm là làm chậm quá trình chèn và cập nhật dữ liệu do chỉ mục phải được duy trì.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:35:en"
  };

  window.CONTENT_I18N["sql:36"] = window.CONTENT_I18N["sql:36"] || {};
  window.CONTENT_I18N["sql:36"].vi = {
    title: "36-Khung nhìn và Thủ tục lưu trữ",
    concept: "Đây là các cơ chế để tái sử dụng các truy vấn SQL và nâng cao hiệu quả vận hành:\n\n- **VIEW**: Một \"bảng ảo\" lưu trữ một câu lệnh SELECT phức tạp.\n- **Stored Routine (Stored Procedure)**: Một chương trình lưu trữ nhiều thao tác SQL và logic điều kiện trực tiếp trên phía cơ sở dữ liệu, cho phép chúng được thực thi bằng cách chỉ cần gọi chương trình.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:36:en"
  };
})();
