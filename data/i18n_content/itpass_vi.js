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

  window.CONTENT_I18N["itpass:4"] = window.CONTENT_I18N["itpass:4"] || {};
  window.CONTENT_I18N["itpass:4"].vi = {
    title: "1-03 Main Memory và Auxiliary Storage",
    concept: "Thiết bị lưu trữ được phân loại thành **Main Memory** (RAM), nơi CPU đọc và ghi trực tiếp, và **Auxiliary Storage** (như HDD và SSD), nơi lưu trữ vĩnh viễn lượng dữ liệu lớn.\n\n**Sự khác biệt giữa Main Memory và Auxiliary Storage (Cho người mới bắt đầu):**\nMain memory giống như \"không gian bàn làm việc\" của bạn. Bàn càng lớn, bạn càng có thể mở và làm việc với nhiều tài liệu cùng một lúc, nhưng khi bạn tắt nguồn, bàn làm việc sẽ bị dọn sạch (volatile - dễ bay hơi). Auxiliary storage giống như một \"tủ hồ sơ hoặc giá sách\". Mất nhiều thời gian hơn để lấy sách, nhưng nội dung vẫn còn ngay cả khi đã tắt nguồn (non-volatile - không bay hơi).\n\n**Vai trò của Cache Memory:**\nTốc độ xử lý của CPU cực kỳ nhanh, nhưng tốc độ đọc/ghi của main memory tương đối chậm, khiến CPU phải chờ đợi (idle loss). Do đó, **Cache Memory** dung lượng nhỏ nhưng siêu nhanh được đặt giữa CPU và main memory. Bằng cách sao chép dữ liệu thường xuyên sử dụng vào đây, nó giúp giảm thiểu việc truy cập vào main memory và tăng tốc toàn bộ hệ thống.\n\nXác suất dữ liệu mà CPU yêu cầu tồn tại trong cache memory được gọi là **Hit Rate**. Hit rate càng cao thì thời gian truy cập hiệu dụng (effective access time) càng ngắn.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:4:en"
  };

  window.CONTENT_I18N["itpass:5"] = window.CONTENT_I18N["itpass:5"] || {};
  window.CONTENT_I18N["itpass:5"].vi = {
    title: "1-04 Bộ nhớ bán dẫn (Semiconductor Memory)",
    concept: "Semiconductor memory được phân loại thành **Volatile Memory** (bộ nhớ dễ bay hơi), nơi dữ liệu đã lưu sẽ bị mất khi tắt nguồn, và **Non-volatile Memory** (bộ nhớ không bay hơi), vẫn lưu giữ nội dung ngay cả khi không có nguồn điện.\n\n**1. RAM (Random Access Memory) - Volatile:**\n- **DRAM (Dynamic RAM)**: Lưu trữ thông tin bằng cách tích lũy điện tích trong các tụ điện. Vì điện tích bị rò rỉ theo thời gian, một **Refresh Operation** (hoạt động làm tươi) để cấp lại năng lượng cho bộ nhớ là rất cần thiết để duy trì dữ liệu. Nó rẻ và có thể được sản xuất với dung lượng lớn, vì vậy nó được sử dụng làm **Main Memory** của PC.\n- **SRAM (Static RAM)**: Lưu trữ thông tin bằng cách sử dụng các mạch điện gọi là flip-flop. Nó không yêu cầu refresh operations và nhanh hơn đáng kể so với DRAM, nhưng có cấu trúc phức tạp, đắt tiền và dung lượng nhỏ. Nó được dùng cho **Cache Memory**.\n\n**2. ROM (Read Only Memory) - Non-volatile:**\n- **Flash Memory**: Một loại non-volatile memory có thể ghi lại bằng điện. Vì nó không có bộ phận chuyển động và có khả năng chống va đập vật lý, nó được sử dụng rộng rãi trong SSD, USB flash drive, thẻ SD và bộ nhớ điện thoại thông minh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:5:en"
  };

  window.CONTENT_I18N["itpass:6"] = window.CONTENT_I18N["itpass:6"] || {};
  window.CONTENT_I18N["itpass:6"].vi = {
    title: "1-05 Thiết bị vào/ra (Input/Output Devices)",
    concept: "Thiết bị đầu vào và đầu ra là các giao diện phần cứng được sử dụng để trao đổi thông tin giữa bộ máy tính chính và thế giới bên ngoài.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:6:en"
  };

  window.CONTENT_I18N["itpass:7"] = window.CONTENT_I18N["itpass:7"] || {};
  window.CONTENT_I18N["itpass:7"].vi = {
    title: "1-05-1 1. Thiết bị đầu vào (Input Devices)",
    concept: "**1. Input Devices:**\nNgoài bàn phím và chuột, các thiết bị này bao gồm **Scanners** để đọc hình ảnh, **Touch Panels** để xác định vị trí bằng ngón tay và **Barcode Readers** để đọc mã sản phẩm.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:7:en"
  };

  window.CONTENT_I18N["itpass:8"] = window.CONTENT_I18N["itpass:8"] || {};
  window.CONTENT_I18N["itpass:8"].vi = {
    title: "1-05-2 2. Thiết bị đầu ra (Output Devices)",
    concept: "**2. Output Devices:**\n- **Liquid Crystal Display (LCD)**: Hiển thị màn hình bằng cách chặn hoặc truyền ánh sáng từ đèn nền bằng cách sử dụng các phần tử tinh thể lỏng.\n- **Organic EL Display (OLED)**: Sử dụng các hợp chất hữu cơ đặc biệt (phần tử) tự phát sáng khi có điện áp tác dụng. Vì không cần đèn nền nên nó có thể được chế tạo **mỏng hơn (Thinner)** rất nhiều so với LCD, cho phép hiển thị màu đen trung thực (tỷ lệ tương phản cao) và tốc độ phản hồi nhanh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:8:en"
  };

  window.CONTENT_I18N["itpass:9"] = window.CONTENT_I18N["itpass:9"] || {};
  window.CONTENT_I18N["itpass:9"].vi = {
    title: "1-05-3 3. Đơn vị độ phân giải (Resolution Units)",
    concept: "**3. Resolution Units:**\n**dpi** (dots per inch) được sử dụng như một chỉ số để thể hiện độ phân giải của màn hình và bản in. Nó biểu thị số lượng chấm (điểm) được sắp xếp trên mỗi inch (khoảng 2.54 cm). Giá trị càng lớn, độ phân giải càng cao và màn hình hiển thị càng đẹp mắt.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:9:en"
  };

  window.CONTENT_I18N["itpass:10"] = window.CONTENT_I18N["itpass:10"] || {};
  window.CONTENT_I18N["itpass:10"].vi = {
    title: "1-06 Giao diện vào/ra (Input/Output Interfaces)",
    concept: "Giao diện đầu vào/đầu ra là thuật ngữ chung cho các tiêu chuẩn và đầu nối được sử dụng để kết nối bộ máy tính với các thiết bị ngoại vi (chẳng hạn như bàn phím, máy in và HDD gắn ngoài).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:10:en"
  };

  window.CONTENT_I18N["itpass:11"] = window.CONTENT_I18N["itpass:11"] || {};
  window.CONTENT_I18N["itpass:11"].vi = {
    title: "1-06-1 1. Giao diện có dây (Wired Interfaces)",
    concept: "**1. Wired interface:**\n- **USB (Universal Serial Bus)**: Giao diện truyền dẫn nối tiếp (phương pháp gửi dữ liệu từng bit một trên một làn truyền) điển hình nhất. Có thể kết nối tối đa **127 units** thông qua một USB hub, và nó có tính năng **Hot Plug** cho phép bạn kết nối và tháo cáp khi PC đang bật, và tính năng **Bus Power** cung cấp nguồn điện cho các thiết bị ngoại vi thông qua cáp.\n- **HDMI (High-Definition Multimedia Interface)**: Tiêu chuẩn truyền cả tín hiệu video kỹ thuật số và tín hiệu âm thanh kỹ thuật số cùng nhau qua một sợi cáp duy nhất. Được sử dụng rộng rãi trong TV và màn hình PC.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:11:en"
  };

  window.CONTENT_I18N["itpass:12"] = window.CONTENT_I18N["itpass:12"] || {};
  window.CONTENT_I18N["itpass:12"].vi = {
    title: "1-06-2 2. Giao diện không dây (Wireless Interfaces)",
    concept: "**2. Wireless interface:**\n- **Bluetooth**: Tiêu chuẩn giao tiếp không dây phạm vi ngắn kết nối các thiết bị ngoại vi như bàn phím, chuột và tai nghe không cần dây trong phạm vi hẹp từ vài mét đến vài chục mét bán kính.\n- **Wi-Fi**: Tiêu chuẩn truyền thông để kết nối PC và điện thoại thông minh với Internet (LAN) một cách không dây.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:12:en"
  };

  window.CONTENT_I18N["itpass:13"] = window.CONTENT_I18N["itpass:13"] || {};
  window.CONTENT_I18N["itpass:13"].vi = {
    title: "1-07 Trí tuệ nhân tạo (AI)",
    concept: "Machine learning và deep learning là các công nghệ hỗ trợ sự phát triển của trí tuệ nhân tạo (AI).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:13:en"
  };

  window.CONTENT_I18N["itpass:14"] = window.CONTENT_I18N["itpass:14"] || {};
  window.CONTENT_I18N["itpass:14"].vi = {
    title: "1-07-1 1. Học máy (Machine Learning)",
    concept: "**1. Machine Learning:**\nĐây là phương pháp cung cấp một lượng lớn dữ liệu (big data) cho máy tính và để nó tự động học các mẫu và quy tắc ẩn trong dữ liệu đó. Có ba phương pháp học:\n- **Supervised learning**: Dữ liệu đầu vào và \"câu trả lời đúng (nhãn/label)\" được cung cấp dưới dạng một cặp để học. Ví dụ, chúng ta thêm thẻ đúng \"mèo\" vào một hình ảnh (**annotation**) và để AI học từ đó. Nó được sử dụng để tự động phân loại thư rác, v.v.\n- **Unsupervised learning**: Phân tích các đặc điểm của chính dữ liệu đó và chia dữ liệu thành các nhóm (phân cụm/clustering) mà không cần cung cấp câu trả lời đúng. Nó được sử dụng để phân tích mô hình hành vi mua hàng của khách hàng.\n- **Reinforcement learning**: Bản thân AI lặp lại quá trình thử và sai (trial and error), và bằng cách đưa ra \"phần thưởng (điểm số)/reward\" cho hành vi tốt nhất, nó sẽ học được mô hình hành vi tối ưu. Nó được sử dụng trong AI chơi cờ vây và cờ Shogi, và trong tự lái (autonomous driving).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:14:en"
  };

  window.CONTENT_I18N["itpass:15"] = window.CONTENT_I18N["itpass:15"] || {};
  window.CONTENT_I18N["itpass:15"].vi = {
    title: "1-07-2 2. Học sâu (Deep learning)",
    concept: "**2. Deep learning:**\nĐây là công nghệ machine learning tiên tiến, trong đó máy tính tự phân tích sâu sắc và tìm hiểu các đặc điểm của dữ liệu bằng cách xếp nhiều lớp (sâu) các mạng nơ-ron (**neural networks**) mô phỏng cấu trúc của tế bào thần kinh (neuron) trong brain người.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:15:en"
  };

  window.CONTENT_I18N["itpass:16"] = window.CONTENT_I18N["itpass:16"] || {};
  window.CONTENT_I18N["itpass:16"].vi = {
    title: "1-08 Xác suất và Thống kê (Probability and Statistics)",
    concept: "Đây là các chỉ số về giá trị đại diện và mức độ phân tán làm cơ sở cho phân tích dữ liệu và ra quyết định quản lý.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:16:en"
  };

  window.CONTENT_I18N["itpass:17"] = window.CONTENT_I18N["itpass:17"] || {};
  window.CONTENT_I18N["itpass:17"].vi = {
    title: "1-08-1 1. Giá trị đại diện (Representative Values)",
    concept: "**1. Representative value indicating the center of data:**\n- **Average value** (Giá trị trung bình): Giá trị nhận được bằng cách chia tổng của tất cả các giá trị số cho số lượng mục dữ liệu. Có một điểm yếu là dễ bị ảnh hưởng bởi các giá trị cực lớn hoặc cực nhỏ (outliers - các giá trị ngoại lai).\n- **Median** (Trung vị): Giá trị nằm chính giữa khi dữ liệu được sắp xếp theo thứ tự kích thước. Nếu có số lượng chẵn dữ liệu, giá trị trung bình của hai giá trị trung tâm sẽ được sử dụng. Điểm mạnh của nó là ít bị ảnh hưởng bởi các outliers.\n- **Mode** (Yếu vị): Giá trị xuất hiện thường xuyên nhất trong dữ liệu.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:17:en"
  };

  window.CONTENT_I18N["itpass:18"] = window.CONTENT_I18N["itpass:18"] || {};
  window.CONTENT_I18N["itpass:18"].vi = {
    title: "1-08-2 2. Độ phân tán (Measures of Dispersion)",
    concept: "**2. Indicator showing data dispersion (dispersion):**\n- **Dispersion** (Phương sai): Giá trị trung bình của khoảng cách giữa mỗi phần dữ liệu so với giá trị trung bình. Giá trị này càng cao thì dữ liệu càng có độ phân tán lớn.\n- **Standard deviation** (Độ lệch chuẩn): Căn bậc hai của phương sai. Nó dễ xử lý vì có cùng đơn vị với dữ liệu ban đầu, và cũng được sử dụng để tính \"điểm số độ lệch\" (deviation value) cho các kỳ thi tuyển sinh.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:18:en"
  };

  window.CONTENT_I18N["itpass:19"] = window.CONTENT_I18N["itpass:19"] || {};
  window.CONTENT_I18N["itpass:19"].vi = {
    title: "1-09 Chuyển đổi cơ số (Radix Conversion)",
    concept: "Bên trong máy tính, tất cả các số đều được xử lý dưới dạng số nhị phân (binary numbers), gồm 0 và 1, nhưng để con người dễ hiểu hơn, các số thập phân (decimal numbers) và số thập lục phân (hexadecimal numbers) - vốn là các phiên bản rút gọn của số nhị phân - được sử dụng.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:19:en"
  };

  window.CONTENT_I18N["itpass:20"] = window.CONTENT_I18N["itpass:20"] || {};
  window.CONTENT_I18N["itpass:20"].vi = {
    title: "1-09-1 1. Đặc điểm của các hệ số (Characteristics of Number Systems)",
    concept: "**1. Characteristics of each number system:**\n- **Decimal number** (Số thập phân): Hệ số chúng ta sử dụng hàng ngày, dùng 10 ký tự từ 0 đến 9, và tăng theo cơ số 10.\n- **Binary number** (Số nhị phân): Hệ số chỉ sử dụng hai ký tự, 0 và 1, và tăng theo cơ số 2. Bắt đầu từ phía bên phải ngoài cùng, chúng là \"hàng 2^0 (hàng của số 1)\", \"hàng 2^1 (hàng của số 2)\", \"hàng 2^2 (hàng của số 4)\", \"hàng 2^3 (hàng của số 8)\".\n- **Hexadecimal number** (Số thập lục phân): Hệ số sử dụng tổng cộng 16 ký tự, từ 0 đến 9 và từ A đến F (A=10, B=11, C=12, D=13, E=14, F=15) đại diện cho các số từ 10 đến 15, và tăng theo cơ số 16. Bốn chữ số nhị phân có thể được biểu diễn bằng một chữ số thập lục phân, vì vậy nó thường được dùng để biểu thị bộ nhớ máy tính.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:20:en"
  };

  window.CONTENT_I18N["itpass:21"] = window.CONTENT_I18N["itpass:21"] || {};
  window.CONTENT_I18N["itpass:21"].vi = {
    title: "1-09-2 2. Chuyển đổi thập phân sang nhị phân (Decimal to Binary Conversion)",
    concept: "**2. Conversion from decimal to binary (Sudare calculation):**\nTiếp tục chia số thập phân cho \"2\" và sắp xếp các số dư theo thứ tự từ dưới lên. Để chuẩn bị cho kỳ thi, hãy luyện tập làm nhanh các phép tính ngược từ số nhị phân sang số thập phân (nhân và cộng trọng số của mỗi hàng số).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:21:en"
  };

  window.CONTENT_I18N["itpass:22"] = window.CONTENT_I18N["itpass:22"] || {};
  window.CONTENT_I18N["itpass:22"].vi = {
    title: "2-01 Phần mềm (Software)",
    concept: "Phần mềm được chia rộng rãi thành \"System Software (OS),\" \"Application Software,\" và \"middleware\" (phần mềm trung gian) nằm ở giữa, tùy thuộc vào vai trò của nó.\n\n**1. Basic software (OS - Operating System):**\nLà phần mềm vận hành phần cứng và là nền tảng của tất cả các phần mềm khác, chẳng hạn như nhập từ bàn phím, xuất ra màn hình và quản lý bộ nhớ. Ví dụ: Windows, macOS, Linux, iOS, Android, v.v.\n\n**2. Applied software (application):**\nPhần mềm cho phép người dùng thực hiện các mục đích cụ thể (công việc hoặc giải trí), chẳng hạn như soạn thảo văn bản (Word), bảng tính (Excel) và trình duyệt web.\n\n**3. OSS (Open Source Software):**\nLà phần mềm có mã nguồn (bản thiết kế chương trình) được công khai miễn phí, và bất kỳ ai cũng có thể tự do sử dụng, cải tiến và phân phối lại. Việc sử dụng thương mại là khả thi miễn là bạn tuân thủ các quy tắc giấy phép.\n- **OSS tiêu biểu**: Linux (OS), Apache (web server), MySQL/PostgreSQL (database), Android (mobile OS), v.v.\n- **Non-OSS**: Windows, Microsoft Office (giấy phép thương mại với mã nguồn không được tiết lộ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:22:en"
  };

  window.CONTENT_I18N["itpass:23"] = window.CONTENT_I18N["itpass:23"] || {};
  window.CONTENT_I18N["itpass:23"].vi = {
    title: "2-02 Quản lý tệp và Đường dẫn (File Management and Paths)",
    concept: "Hệ điều hành OS quản lý dữ liệu theo các đơn vị gọi là **files**, và các thư mục dùng để phân loại files được gọi là **directories**. Thư mục có cấu trúc phân tầng (cấu trúc hình cây).\n\nCó hai cách diễn đạt để chỉ ra vị trí của một tệp:\n1. **Absolute path** (Đường dẫn tuyệt đối): Phương pháp viết toàn bộ đường dẫn bắt đầu từ thư mục gốc (root directory) ở tầng cao nhất.\n2. **Relative path** (Đường dẫn tương đối): Phương pháp viết bắt đầu từ thư mục hiện tại (current directory) (thư mục ở cấp cao hơn một bậc được biểu thị bằng \"..\").\n\n**Points for IT beginners:**\nLĩnh vực này được hỏi rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa mà còn phải sắp xếp các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:23:en"
  };

  window.CONTENT_I18N["itpass:24"] = window.CONTENT_I18N["itpass:24"] || {};
  window.CONTENT_I18N["itpass:24"].vi = {
    title: "2-03 Chiến lược sao lưu (Backup Strategies)",
    concept: "Sao lưu dữ liệu là việc lưu trữ dữ liệu dự phòng để phòng trường hợp lỗi thiết bị hoặc hỏng dữ liệu.\n\n1. **Full Backup**: Sao lưu toàn bộ dữ liệu mục tiêu trong mỗi lần. Quá trình phục hồi (recovery) là nhanh nhất, nhưng tốn nhiều thời gian sao lưu.\n2. **Differential backup**: Sao lưu phần dữ liệu đã thay đổi kể từ lần full backup đầu tiên.\n3. **Incremental backup**: Chỉ sao lưu phần dữ liệu tăng thêm kể từ lần sao lưu trước đó (bất kể loại sao lưu nào). Mặc dù thời gian sao lưu ngắn, nhưng phục hồi lại khá phức tạp.\n\n**Points for IT beginners:**\nLĩnh vực này được hỏi rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa mà còn phải sắp xếp các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:24:en"
  };

  window.CONTENT_I18N["itpass:25"] = window.CONTENT_I18N["itpass:25"] || {};
  window.CONTENT_I18N["itpass:25"].vi = {
    title: "2-04 Bảng tính: Tham chiếu tương đối và tuyệt đối (Relative and Absolute References)",
    concept: "Khi sao chép (kéo) công thức sang các ô khác trong phần mềm bảng tính (Excel, v.v.), hãy chỉ định các quy tắc để dịch chuyển các ô được tham chiếu.\n\n1. **Relative reference**: Vị trí của ô được tham chiếu sẽ tự động di chuyển theo hướng mà công thức được sao chép (ví dụ: `A1`).\n2. **Absolute Reference**: Luôn tham chiếu đến một ô cụ thể bất kể bạn sao chép công thức đi đâu. Thêm ký tự `$` trước số hàng hoặc tên cột (ví dụ: `$A$1`).\n\n**Points for IT beginners:**\nLĩnh vực này được hỏi rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa mà còn phải sắp xếp các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:25:en"
  };

  window.CONTENT_I18N["itpass:26"] = window.CONTENT_I18N["itpass:26"] || {};
  window.CONTENT_I18N["itpass:26"].vi = {
    title: "2-05 Bảng tính: Các hàm cơ bản (Basic Functions)",
    concept: "Tính năng này cho phép bạn dễ dàng thực hiện các phép tính phức tạp bằng phần mềm bảng tính. Các hàm cơ bản thường xuyên xuất hiện trong kỳ thi IT Passport như sau.\n\n- **SUM**: Tính tổng các số trong phạm vi chỉ định.\n- **AVERAGE**: Tính giá trị trung bình của các giá trị số trong phạm vi chỉ định.\n- **MAX / MIN**: Tìm giá trị lớn nhất / nhỏ nhất trong phạm vi chỉ định.\n- **IF**: \"IF (điều kiện, nếu đúng, nếu sai)\" thay đổi giá trị đầu ra tùy thuộc vào việc điều kiện có được đáp ứng hay không.\n\n**Points for IT beginners:**\nLĩnh vực này được hỏi rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa mà còn phải sắp xếp các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:26:en"
  };

  window.CONTENT_I18N["itpass:27"] = window.CONTENT_I18N["itpass:27"] || {};
  window.CONTENT_I18N["itpass:27"].vi = {
    title: "2-06 Bảng tính: Các hàm nâng cao (Advanced Functions)",
    concept: "Đây là các hàm ứng dụng được sử dụng để trích xuất dữ liệu thực tế.\n\n- **VLOOKUP**: Tìm kiếm dọc một bảng khác dựa trên khóa được chỉ định và truy xuất dữ liệu được chỉ định của hàng khớp. Chỉ định công thức như \"VLOOKUP(giá trị tìm kiếm, phạm vi, số cột, phương pháp tìm kiếm)\".\n- **HLOOKUP**: Tìm kiếm ngang một bảng khác.\n- **CONCAT (CONCATENATE)**: Kết hợp nhiều chuỗi ký tự thành một chuỗi duy nhất.\n\n**Points for IT beginners:**\nLĩnh vực này được hỏi rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa mà còn phải sắp xếp các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:27:en"
  };

  window.CONTENT_I18N["itpass:28"] = window.CONTENT_I18N["itpass:28"] || {};
  window.CONTENT_I18N["itpass:28"].vi = {
    title: "2-08 Giao diện người dùng (UI/UX)",
    concept: "Hệ thống để trao đổi thông tin giữa người dùng và máy tính.\n\n1. **GUI**: Màn hình vận hành trực quan cho phép bạn thao tác bằng hình ảnh trực quan sử dụng các biểu tượng và chuột.\n2. **CUI**: Màn hình được vận hành bằng cách nhập các lệnh văn bản từ bàn phím.\n3. **Related indicators**: **Usability** (Tính khả dụng) đề cập đến mức độ dễ sử dụng, **UX (User Experience)** (Trải nghiệm người dùng) đề cập đến giá trị trải nghiệm có được thông qua sản phẩm, và **Universal Design** (Thiết kế phổ quát) đề cập đến việc thiết kế các sản phẩm dễ sử dụng cho bất kỳ ai bất kể tuổi tác hay tình trạng khuyết tật.\n\n**Points for IT beginners:**\nLĩnh vực này được hỏi rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa mà còn phải sắp xếp các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:28:en"
  };

  window.CONTENT_I18N["itpass:29"] = window.CONTENT_I18N["itpass:29"] || {};
  window.CONTENT_I18N["itpass:29"].vi = {
    title: "2-08 Đa phương tiện (Multimedia)",
    concept: "Công nghệ xử lý nhiều loại phương tiện truyền thông như hình ảnh, âm thanh và video dưới dạng dữ liệu kỹ thuật số.\n\n1. **Still image format**: **JPEG** (dành cho ảnh chụp, nén có hao hao - lossy compression), **PNG** (dành cho hình minh họa, hỗ trợ trong suốt, nén không hao hao - lossless compression), **GIF** (256 màu, có thể làm ảnh động).\n2. **Video format**: **MP4** (phổ biến rộng rãi cho phân phối qua Internet).\n3. **Audio format**: **MP3** (được nén bằng cách loại bỏ những phần âm thanh khó nghe đối với tai người), **MIDI** (tiêu chuẩn ghi lại thông tin biểu diễn và dữ liệu nhạc phổ, nhưng không tự chứa âm thanh thực tế).\n\n**Points for IT beginners:**\nLĩnh vực này được hỏi rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa mà còn phải sắp xếp các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:29:en"
  };

  window.CONTENT_I18N["itpass:30"] = window.CONTENT_I18N["itpass:30"] || {};
  window.CONTENT_I18N["itpass:30"].vi = {
    title: "3-01 Kiến trúc hệ thống (System Architectures)",
    concept: "Đây là hình thức cài đặt và vận hành hệ thống.\n\n1. **Client-server system**: Cấu hình được chia thành \"client\" (máy khách) yêu cầu xử lý và \"server\" (máy chủ) cung cấp dịch vụ xử lý.\n2. **Cloud computing** (Điện toán đám mây): Hình thức sử dụng các tài nguyên như máy chủ ảo chỉ khi cần thiết thông qua Internet. Các mô hình cung cấp dịch vụ bao gồm **SaaS** (cung cấp ứng dụng), **PaaS** (nền tảng phát triển) và **IaaS** (cơ sở hạ tầng ảo).\n3. **Grid computing** (Điện toán lưới): Hình thức kết nối một số lượng lớn máy tính trên mạng và chạy chúng như một máy tính ảo có hiệu suất siêu cao.\n\n**Points for IT beginners:**\nLĩnh vực này được hỏi rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa mà còn phải sắp xếp các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:30:en"
  };

  window.CONTENT_I18N["itpass:31"] = window.CONTENT_I18N["itpass:31"] || {};
  window.CONTENT_I18N["itpass:31"].vi = {
    title: "3-02 High Availability Configurations",
    concept: "Đây là công nghệ cấu hình giúp tăng khả năng fault tolerance (dung sai lỗi) của hệ thống.\n\n1. **Duplex system**: Chuẩn bị một máy sản xuất (production) và một máy dự phòng. Trạng thái thiết bị dự phòng có thể được kích hoạt ngay lập tức (standby) được gọi là **Hot Standby**, và trạng thái chuẩn bị như tắt nguồn được gọi là **Cold Standby**.\n2. **Dual System**: Hai máy tính luôn thực hiện cùng một quy trình tại cùng một thời điểm và đối chiếu kết quả. An toàn nhất, nhưng tốn kém.\n3. **RAID**: Công nghệ kết hợp nhiều đĩa (disk). **RAID 0** (striping: tốc độ nhanh hơn với việc ghi phân tán, không có fault tolerance), **RAID 1** (mirroring: ghi kép cùng một dữ liệu), **RAID 5** (ghi phân tán chẵn lẻ - parity).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:31:en"
  };

  window.CONTENT_I18N["itpass:32"] = window.CONTENT_I18N["itpass:32"] || {};
  window.CONTENT_I18N["itpass:32"].vi = {
    title: "3-03 System Reliability (Availability)",
    concept: "Đây là chỉ số đánh giá thể hiện tỷ lệ phần trăm hệ thống tiếp tục hoạt động mà không gặp sự cố.\n\n- **MTBF**: Thời gian trung bình giữa các lần hỏng hóc (thời gian hoạt động giữa các sự cố. Càng dài càng tốt).\n- **MTTR**: Thời gian sửa chữa trung bình (thời gian cần thiết để sửa chữa. Càng ngắn càng tốt).\n- **Operating rate (availability)**: Xác suất hệ thống hoạt động bình thường. Công thức là:\n  `Operating rate = MTBF / (MTBF + MTTR)`\n- **Series connection**: Cả hai thiết bị đều phải hoạt động. Tỷ lệ sử dụng tổng thể = `R1 × R2`\n- **Parallel connection**: Chỉ cần một thiết bị hoạt động. Tỷ lệ sử dụng tổng thể = `1 - (1 - R1) × (1 - R2)`\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:32:en"
  };

  window.CONTENT_I18N["itpass:33"] = window.CONTENT_I18N["itpass:33"] || {};
  window.CONTENT_I18N["itpass:33"].vi = {
    title: "3-04 System Performance Evaluation",
    concept: "Đây là tiêu chuẩn để đánh giá khách quan hiệu suất hệ thống.\n\n1. **Response time**: Thời gian kể từ khi người dùng gửi lệnh cho đến khi hệ thống trả về phản hồi đầu tiên.\n2. **Throughput**: Lượng công việc mà hệ thống có thể xử lý trong một đơn vị thời gian (năng lực xử lý).\n3. **Benchmark test**: Bài kiểm tra đo lường và so sánh tốc độ hiệu quả của hệ thống bằng cách chạy chương trình đo lường chuẩn.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:33:en"
  };

  window.CONTENT_I18N["itpass:34"] = window.CONTENT_I18N["itpass:34"] || {};
  window.CONTENT_I18N["itpass:34"].vi = {
    title: "3-05 IoT and Embedded Systems",
    concept: "1. **Embedded system**: Một hệ thống máy tính chuyên dụng được tích hợp vào các thiết bị gia dụng, ô tô, v.v. để thực hiện các điều khiển cụ thể. Yêu cầu hiệu suất thời gian thực (real-time).\n2. **IoT system**: Công nghệ kết nối vạn vật với Internet. Nó bao gồm một **sensor** để phát hiện thông tin vật lý, và một **actuator** để hoạt động vật lý phản hồi lại tín hiệu điều khiển.\nCấu hình giúp giảm thiểu độ trễ giao tiếp bằng cách thực hiện xử lý sơ bộ gần thiết bị đầu cuối được gọi là **edge computing**.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:34:en"
  };

  window.CONTENT_I18N["itpass:35"] = window.CONTENT_I18N["itpass:35"] || {};
  window.CONTENT_I18N["itpass:35"].vi = {
    title: "3-06 IT Solutions and Outsourcing",
    concept: "Đây là một dạng dịch vụ IT giúp giải quyết các vấn đề quản lý doanh nghiệp.\n\n1. **ASP (SaaS)**: Nhà cung cấp dịch vụ cho phép sử dụng phần mềm ứng dụng qua mạng.\n2. **System Integration (SI)**: Dịch vụ đảm nhận tập thể việc lập kế hoạch, phát triển, triển khai và bảo trì hệ thống.\n3. **Housing (colocation)**: Dịch vụ trong đó một công ty cho thuê đường truyền liên lạc và không gian tòa nhà của mình để lưu trữ thiết bị của khách hàng. Khách hàng sở hữu thiết bị (trong khi hosting thì cho thuê cả thiết bị).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:35:en"
  };

  window.CONTENT_I18N["itpass:36"] = window.CONTENT_I18N["itpass:36"] || {};
  window.CONTENT_I18N["itpass:36"].vi = {
    title: "4-01 Network Devices and Topologies",
    concept: "Đây là vai trò của các thiết bị phần cứng kết nối mạng.\n\n1. **LAN / WAN**: Mạng giới hạn trong phạm vi nội bộ (LAN) và mạng diện rộng (WAN) sử dụng đường truyền công cộng.\n2. **Hub (L2 switch)**: Thiết bị chuyển tiếp dữ liệu dựa trên địa chỉ MAC trong cùng một mạng.\n3. **Router**: Thiết bị kết nối các mạng khác nhau (ví dụ: LAN và Internet) và chuyển tiếp (**routing**) dữ liệu đến tuyến đường tốt nhất dựa trên địa chỉ IP.\n4. **Gateway**: Thiết bị kết nối các mạng có giao thức truyền thông khác nhau và chuyển đổi dữ liệu lẫn nhau.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:36:en"
  };

  window.CONTENT_I18N["itpass:37"] = window.CONTENT_I18N["itpass:37"] || {};
  window.CONTENT_I18N["itpass:37"].vi = {
    title: "4-02 Wireless LAN (Wi-Fi)",
    concept: "Mạng LAN sử dụng sóng vô tuyến để kết nối mà không cần sử dụng cáp. Tên tiêu chuẩn là IEEE 802.11, thường được gọi là **Wi-Fi**.\n\n1. **SSID**: Tên để nhận dạng điểm truy cập không dây cần kết nối.\n2. **Encryption Standard**: Giao tiếp được mã hóa để ngăn rò rỉ dữ liệu do bị chặn sóng vô tuyến. Tiêu chuẩn WEP yếu hiện đang được thay thế bằng **WPA2** và tiêu chuẩn mới nhất **WPA3**.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:37:en"
  };

  window.CONTENT_I18N["itpass:38"] = window.CONTENT_I18N["itpass:38"] || {};
  window.CONTENT_I18N["itpass:38"].vi = {
    title: "4-03 Communication Protocols",
    concept: "Đây là những \"quy tắc chung\" để các máy tính giao tiếp với nhau qua mạng. Tiêu chuẩn đại diện là **TCP/IP**.\n\n1. **TCP**: Giao thức hướng kết nối (\"connection-oriented\") đáng tin cậy giúp xác minh việc đến của dữ liệu và truyền lại các gói bị mất.\n2. **UDP**: Giao thức không liên kết (\"connectionless\") chú trọng tốc độ và tiếp tục gửi dữ liệu đơn phương mà không xác nhận việc đến (được sử dụng để phân phối video thời gian thực, v.v.).\n3. **Port number**: Số để xác định loại ứng dụng (HTTP: số 80, HTTPS: số 443, v.v.).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:38:en"
  };

  window.CONTENT_I18N["itpass:39"] = window.CONTENT_I18N["itpass:39"] || {};
  window.CONTENT_I18N["itpass:39"].vi = {
    title: "4-04 How the Internet Works",
    concept: "Cơ chế phân bổ địa chỉ và phân giải tên trên Internet.\n\n1. **IP Address**: Địa chỉ Internet của máy tính của bạn. Có **IPv4** 32-bit (với các vấn đề cạn kiệt) và **IPv6** 128-bit.\n2. **DNS**: Hệ thống chuyển đổi lẫn nhau (phân giải tên) giữa các tên miền như \"www.ipa.go.jp\" và địa chỉ IP được xử lý bằng máy như \"210.146.x.x\".\n3. **DHCP**: Giao thức tự động gán địa chỉ IP cho thiết bị khi kết nối mạng.\n4. **NAT (NAPT)**: Công nghệ chuyển đổi lẫn nhau giữa địa chỉ IP riêng (private IP) và địa chỉ IP chung (global IP), đồng thời kết nối nhiều thiết bị với Internet bằng một địa chỉ toàn cầu duy nhất.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:39:en"
  };

  window.CONTENT_I18N["itpass:40"] = window.CONTENT_I18N["itpass:40"] || {};
  window.CONTENT_I18N["itpass:40"].vi = {
    title: "4-05 Network Communication Services",
    concept: "Đây là dịch vụ đường truyền hạ tầng để kết nối Internet.\n\n1. **FTTH**: Truyền thông có dây tốc độ cực cao đưa cáp quang trực tiếp vào nhà bạn.\n2. **VPN (Virtual Private Network)**: Công nghệ sử dụng mã hóa và các công nghệ khác để tạo một đường hầm an toàn trên đường truyền Internet công cộng, làm cho nó hoạt động như thể là đường truyền riêng cho công ty của bạn.\n3. **MVNO**: Nhà mạng không có mạng lưới đường truyền riêng và thuê đường truyền từ các công ty khác (các nhà mạng lớn) để cung cấp dịch vụ viễn thông SIM giá rẻ.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:40:en"
  };

  window.CONTENT_I18N["itpass:41"] = window.CONTENT_I18N["itpass:41"] || {};
  window.CONTENT_I18N["itpass:41"].vi = {
    title: "4-06 Web Page Technologies",
    concept: "Công nghệ xem và tạo trang web.\n\n1. **HTML**: Ngôn ngữ đánh dấu mô tả cấu trúc cơ bản của một trang web.\n2. **HTTP / HTTPS**: Giao thức trao đổi dữ liệu giữa trình duyệt web và máy chủ web. HTTPS mã hóa nội dung truyền thông (SSL/TLS) để ngăn nghe lén.\n3. **Cookie**: Dữ liệu văn bản mà trang web lưu trữ tạm thời phía trình duyệt nhằm lưu thông tin nhận dạng người dùng, trạng thái đăng nhập, thông tin giỏ hàng, v.v.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:41:en"
  };

  window.CONTENT_I18N["itpass:42"] = window.CONTENT_I18N["itpass:42"] || {};
  window.CONTENT_I18N["itpass:42"].vi = {
    title: "4-07 Email Protocols",
    concept: "Tập hợp các giao thức để gửi và nhận email qua Internet.\n\n1. **SMTP**: Giao thức gửi và chuyển tiếp email giữa các máy chủ email.\n2. **POP3**: Giao thức tải xuống và quản lý các email gửi đến bạn trên máy chủ email về PC hoặc thiết bị đầu cuối khác của bạn (theo mặc định, chúng bị xóa khỏi máy chủ sau khi tải xuống).\n3. **IMAP**: Giao thức cho phép bạn đọc, viết và quản lý các thư mục trực tiếp trên máy chủ thư mà không cần tải email về thiết bị của riêng bạn (có thể đồng bộ hóa trên nhiều thiết bị).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:42:en"
  };

  window.CONTENT_I18N["itpass:43"] = window.CONTENT_I18N["itpass:43"] || {};
  window.CONTENT_I18N["itpass:43"].vi = {
    title: "5-01 Security Triad and Threats",
    concept: "1. **Ba yếu tố của An toàn thông tin (CIA)**:\n   - **Confidentiality** (Tính bảo mật): Chỉ những người được ủy quyền mới có thể truy cập thông tin.\n   - **Integrity** (Tính toàn vẹn): Thông tin không bị giả mạo và chính xác.\n   - **Availability** (Tính khả dụng): Thông tin luôn sẵn sàng bất cứ khi nào cần thiết.\n2. **Malware chính**:\n   - **Ransomware**: Mã hóa dữ liệu không được phép và yêu cầu tiền chuộc.\n   - **Trojan Horse**: Kẻ mạo danh một ứng dụng hữu ích và làm những việc độc hại sau hậu trường.\n   - **Worm**: Tự nhân bản và lây lan qua mạng.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:43:en"
  };

  window.CONTENT_I18N["itpass:44"] = window.CONTENT_I18N["itpass:44"] || {};
  window.CONTENT_I18N["itpass:44"].vi = {
    title: "5-02 Common Cyberattacks",
    concept: "Đây là các phương thức tấn công mạng được sử dụng bởi bên thứ ba độc hại.\n\n1. **DoS (DDoS) attack**: Cuộc tấn công gửi một lượng lớn yêu cầu để làm quá tải máy chủ và đưa máy chủ đó ngừng hoạt động.\n2. **SQL injection**: Cuộc tấn công thao túng cơ sở dữ liệu (database) một cách gian lận bằng cách chèn mã SQL độc hại vào trường nhập liệu của một trang web.\n3. **Cross-site scripting (XSS)**: Cuộc tấn công nhúng một đoạn mã script độc hại vào một trang web dễ bị tổn thương và thực thi nó trên trình duyệt của bên thứ ba truy cập trang web đó để lấy cắp cookie và thông tin khác.\n4. **Phishing**: Hành vi gửi email giả mạo giả vờ từ ngân hàng, v.v., dẫn bạn đến trang web giả trông giống hệt thật và lừa bạn cung cấp thông tin cá nhân.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:44:en"
  };

  window.CONTENT_I18N["itpass:45"] = window.CONTENT_I18N["itpass:45"] || {};
  window.CONTENT_I18N["itpass:45"].vi = {
    title: "5-03 Information Security Management",
    concept: "Hệ thống qua đó một tổ chức duy trì và cải thiện an toàn thông tin theo kế hoạch. Tiêu chuẩn đại diện được gọi là **ISMS (Information Security Management System)**.\n\nChúng tôi xây dựng **Information Security Policy** (Chính sách an toàn thông tin), là tiêu chuẩn bảo mật cao nhất trong tổ chức, và xác định \"Tiêu chuẩn biện pháp an toàn thông tin\" là các quy tắc ứng xử cụ thể. Các hoạt động quản lý sẽ được cải tiến liên tục theo chu trình PDCA (Plan -> Do -> Check -> Act).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:45:en"
  };

  window.CONTENT_I18N["itpass:46"] = window.CONTENT_I18N["itpass:46"] || {};
  window.CONTENT_I18N["itpass:46"].vi = {
    title: "5-04 Risk Management",
    concept: "Đây là quá trình xác định, phân tích rủi ro và lựa chọn các biện pháp đối phó thích hợp.\n\n1. **Risk avoidance** (Tránh rủi ro): Loại bỏ chính các hoạt động có rủi ro.\n2. **Risk reduction** (Giảm thiểu rủi ro): Giảm xác suất xảy ra và tác động thông qua việc giới thiệu phần mềm bảo mật và đào tạo.\n3. **Risk Transfer** (Chuyển giao rủi ro): Chuyển rủi ro cho người khác (ví dụ: mua bảo hiểm, thuê ngoài hệ thống).\n4. **Risk acceptance (retention)** (Chấp nhận rủi ro): Chi phí của các biện pháp đối phó cao hơn, vì vậy rủi ro được chấp nhận như hiện tại.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:46:en"
  };

  window.CONTENT_I18N["itpass:47"] = window.CONTENT_I18N["itpass:47"] || {};
  window.CONTENT_I18N["itpass:47"].vi = {
    title: "5-05 User Authentication",
    concept: "Đây là công nghệ xác minh người đang cố gắng đăng nhập vào hệ thống chính là người mà họ tự nhận.\n\n1. **Ba yếu tố xác thực**: **Knowledge** (điều người đó biết: mật khẩu), **Possession** (thứ người đó có: thẻ IC, token mật khẩu dùng một lần), **Biometric information** (thông tin sinh trắc học, đặc điểm vật lý của người đó: vân tay, khuôn mặt, tĩnh mạch). Kết hợp hai hoặc nhiều yếu tố này được gọi là **multi-factor authentication** (xác thực đa yếu tố).\n2. **Single Sign-On (SSO)**: Cơ chế cho phép bạn tự động đăng nhập vào nhiều hệ thống và dịch vụ được liên kết chỉ bằng một lần xác thực duy nhất.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:47:en"
  };

  window.CONTENT_I18N["itpass:48"] = window.CONTENT_I18N["itpass:48"] || {};
  window.CONTENT_I18N["itpass:48"].vi = {
    title: "5-06 Network Security",
    concept: "Đây là biện pháp phòng thủ nhằm ngăn chặn các cuộc tấn công từ mạng bên ngoài.\n\n1. **Firewall**: Bức tường kiểm tra địa chỉ IP và số cổng (port number) của các gói tin truyền thông và chặn các truyền thông không phù hợp.\n2. **DMZ (Demilitarized Zone)**: Vùng bị cô lập ngăn cách với mạng LAN nội bộ (an toàn) và Internet (nguy hiểm) để đặt các máy chủ phục vụ xuất bản ra bên ngoài (web, email, v.v.).\n3. **WAF**: Tường lửa kiểm tra nội dung của các gói tin (phần dữ liệu HTTP) để ngăn chặn các cuộc tấn công lỗ hổng bảo mật như SQL injection vào các ứng dụng web.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:48:en"
  };

  window.CONTENT_I18N["itpass:49"] = window.CONTENT_I18N["itpass:49"] || {};
  window.CONTENT_I18N["itpass:49"].vi = {
    title: "5-07 Encryption Technologies",
    concept: "Đây là công nghệ chuyển đổi dữ liệu để bên thứ ba không thể giải mã được ngay cả khi bị chặn.\n\n1. **Common key cryptography** (Mã hóa khóa chung): Sử dụng cùng một khóa để mã hóa và giải mã. Mặc dù nhanh, nhưng có vấn đề về phân phối khóa (khó khăn trong việc chuyển khóa an toàn đến đối tác truyền thông) (ví dụ điển hình: **AES**).\n2. **Public key cryptography** (Mã hóa khóa công khai): Sử dụng một cặp khóa gồm \"khóa công khai\" mà bất kỳ ai cũng có thể sử dụng và \"khóa riêng tư\" chỉ người dùng mới có. Không có vấn đề về phân phối khóa, nhưng quá trình xử lý chậm. Mã hóa bằng **khóa công khai của người nhận** và giải mã bằng **khóa riêng tư của người nhận** (ví dụ điển hình: **RSA**).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:49:en"
  };

  window.CONTENT_I18N["itpass:50"] = window.CONTENT_I18N["itpass:50"] || {};
  window.CONTENT_I18N["itpass:50"].vi = {
    title: "5-08 Digital Signatures and Certificate Authorities",
    concept: "Đây là công nghệ chứng minh người gửi và ngăn chặn giả mạo.\n\n1. **Electronic signature (digital signature)**: Người gửi tính toán giá trị hash từ dữ liệu và mã hóa (ký) nó bằng **khóa riêng tư của người gửi**. Người nhận giải mã và xác minh nó bằng khóa công khai của người gửi. Điều này cho phép \"ngăn chặn mạo danh người gửi\" và \"phát hiện giả mạo dữ liệu (chứng minh tính toàn vẹn - integrity)\".\n2. **Certificate Authority (CA)**: Tổ chức bên thứ ba cấp \"chứng thư số\" chứng nhận khóa công khai thuộc về chủ thể.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:50:en"
  };

  window.CONTENT_I18N["itpass:51"] = window.CONTENT_I18N["itpass:51"] || {};
  window.CONTENT_I18N["itpass:51"].vi = {
    title: "6-01 Databases and SQL Basics",
    concept: "Hệ thống sắp xếp và quản lý hiệu quả lượng dữ liệu lớn mà không bị trùng lặp gọi là **DBMS (database management system)**, và hiện nay xu hướng chủ đạo là **relational database (RDB)**, xử lý dữ liệu dưới dạng bảng (table).\n\n**SQL**, ngôn ngữ chuẩn để thao tác dữ liệu, có cú pháp chính như sau:\n- **SELECT**: Trích xuất dữ liệu (tham chiếu)\n- **INSERT**: Thêm dữ liệu\n- **UPDATE**: Cập nhật dữ liệu\n- **DELETE**: Xóa dữ liệu\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:51:en"
  };

  window.CONTENT_I18N["itpass:52"] = window.CONTENT_I18N["itpass:52"] || {};
  window.CONTENT_I18N["itpass:52"].vi = {
    title: "6-02 Database Design and ER Models",
    concept: "Đây là quy trình thiết kế để xây dựng cơ sở dữ liệu (database). **E-R diagram** được sử dụng như một phương pháp để tổ chức cấu trúc dữ liệu trong thế giới thực.\n\n1. **Entity** (Thực thể): Thực thể được quản lý (ví dụ: \"customer\", \"product\"). Được biểu diễn bằng hình chữ nhật.\n2. **Relationship** (Mối quan hệ): Sự liên kết giữa các thực thể (ví dụ: \"buy\"). Kết nối chúng bằng một đường thẳng để chỉ ra mối quan hệ một-nhiều (cardinality).\n3. **Key** (Khóa): Xác định **Primary Key** (Khóa chính) để nhận dạng duy nhất bản ghi và **Foreign Key** (Khóa ngoại) để liên kết với các bảng khác.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:52:en"
  };

  window.CONTENT_I18N["itpass:53"] = window.CONTENT_I18N["itpass:53"] || {};
  window.CONTENT_I18N["itpass:53"].vi = {
    title: "6-03 Database Normalization",
    concept: "Đây là quá trình phân chia các bảng (table) và loại bỏ việc trùng lặp dữ liệu để ngăn lỗi nhất quán (inconsistencies).\n\n1. **First normalization** (Chuẩn hóa lần 1): Loại bỏ nhiều giá trị trong các ô của bảng và giảm chúng xuống còn một giá trị duy nhất (giá trị nguyên tử).\n2. **Second normalization** (Chuẩn hóa lần 2): Khi khóa chính có nhiều cột (composite key), tách các mục chỉ phụ thuộc vào một phần của khóa chính thành một bảng riêng biệt (loại bỏ các phụ thuộc hàm riêng phần).\n3. **Third normalization** (Chuẩn hóa lần 3): Tách các mục phụ thuộc vào các mục khác ngoài khóa chính thành một bảng riêng biệt (loại bỏ các phụ thuộc hàm bắc cầu).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:53:en"
  };

  window.CONTENT_I18N["itpass:54"] = window.CONTENT_I18N["itpass:54"] || {};
  window.CONTENT_I18N["itpass:54"].vi = {
    title: "6-04 SQL Data Filtering and Logic",
    concept: "Sử dụng mệnh đề `WHERE` trong SQL để lọc dữ liệu với các điều kiện phức tạp.\n\n- **AND**: Được trích xuất khi cả hai điều kiện bên trái và bên phải đều là \"true\" (đúng).\n- **OR**: Được trích xuất khi một trong hai điều kiện bên trái hoặc bên phải là \"true\" (đúng).\n- **NOT**: Đảo ngược giá trị \"true\" và \"false\" của điều kiện đã chỉ định.\nThứ tự ưu tiên của các hoạt động là `NOT` > `AND` > `OR`. Việc sử dụng dấu ngoặc đơn `( )` sẽ giúp hoạt động bên trong dấu ngoặc có độ ưu tiên cao nhất.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:54:en"
  };

  window.CONTENT_I18N["itpass:55"] = window.CONTENT_I18N["itpass:55"] || {};
  window.CONTENT_I18N["itpass:55"].vi = {
    title: "6-05 SQL Sorting and Aggregation",
    concept: "Đây là cú pháp để sắp xếp kết quả nhận được và tổng hợp chúng theo nhóm.\n\n1. **ORDER BY**: Sắp xếp kết quả. Chỉ định **ASC** (thứ tự tăng dần: nhỏ nhất trước) hoặc **DESC** (thứ tự giảm dần: lớn nhất trước).\n2. **GROUP BY**: Nhóm các bản ghi có cùng giá trị trong một cột cụ thể.\n3. **Aggregation functions** (Hàm tổng hợp): Sử dụng kết hợp các hàm **SUM** (tổng), **AVG** (trung bình), **COUNT** (số lượng dòng), **MAX** / **MIN**, v.v.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:55:en"
  };

  window.CONTENT_I18N["itpass:56"] = window.CONTENT_I18N["itpass:56"] || {};
  window.CONTENT_I18N["itpass:56"].vi = {
    title: "6-06 Transaction Processing and ACID",
    concept: "Một chuỗi các đơn vị xử lý nguyên tử trong cơ sở dữ liệu (database) được gọi là một transaction. Các đặc tính mà các transaction phải đáp ứng là **đặc tính ACID**.\n\n- **A (Atomic)**: Quá trình xử lý kết thúc bằng việc \"thực thi tất cả\" hoặc \"không thực thi gì cả\".\n- **C (Consistency)**: Không xảy ra tình trạng mất nhất quán dữ liệu trước và sau khi xử lý.\n- **I (Independence/Isolation)**: Ngay cả khi nhiều tiến trình được thực hiện cùng một lúc, chúng sẽ không bị can thiệp bởi những tiến trình khác.\n- **D (Durability)**: Kết quả xử lý đã hoàn thành không bị mất đi ngay cả khi có sự cố xảy ra.\n**Lock** (kiểm soát độc quyền) được thực hiện để ngăn chặn va chạm dữ liệu trong quá trình thực thi đồng thời.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:56:en"
  };

  window.CONTENT_I18N["itpass:57"] = window.CONTENT_I18N["itpass:57"] || {};
  window.CONTENT_I18N["itpass:57"].vi = {
    title: "7-01 Algorithms and Data Structures",
    concept: "1. **Algorithm**: Một quy trình rõ ràng để giải quyết một bài toán cụ thể. Sơ đồ khối (**Flowchart**), v.v. được sử dụng để mô tả. Các ví dụ điển hình bao gồm **linear search** (tìm kiếm tuyến tính), **binary search** (tìm kiếm nhị phân) và **bubble sort** (sắp xếp nổi bọt).\n2. **Data structure**: Cấu trúc giúp xử lý dữ liệu hiệu quả trong bộ nhớ. Có hai loại phổ biến: **Stack** (ngăn xếp - LIFO: vào sau ra trước; hình ảnh xếp đĩa chồng lên nhau) và **Queue** (hàng đợi - FIFO: vào trước ra trước; hình ảnh xếp hàng chờ thanh toán).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:57:en"
  };

  window.CONTENT_I18N["itpass:58"] = window.CONTENT_I18N["itpass:58"] || {};
  window.CONTENT_I18N["itpass:58"].vi = {
    title: "7-02 Pseudo-language",
    concept: "Đây là một tiêu chuẩn ký hiệu chung cho các chương trình xuất hiện trong kỳ thi IT Passport. Nó kết hợp ba cấu trúc điều khiển cơ bản (tuần tự, lựa chọn và lặp).\n\n- **Variable** (Biến): Một hộp để lưu trữ dữ liệu tạm thời.\n- **Array** (Mảng): Nhiều mẩu dữ liệu được sắp xếp liên tiếp nhau (được xác định bằng số chỉ mục - index). Hãy cẩn thận về điểm bắt đầu của chỉ số phụ (xem nó bắt đầu từ 0 hay 1).\n- **Iteration** (Vòng lặp): Thoát khỏi vòng lặp khi điều kiện kết thúc vòng lặp được đáp ứng.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:58:en"
  };

  window.CONTENT_I18N["itpass:59"] = window.CONTENT_I18N["itpass:59"] || {};
  window.CONTENT_I18N["itpass:59"].vi = {
    title: "7-03 Programming and Markup Languages",
    concept: "Đây là ngôn ngữ dùng để tạo hệ thống và các trang web.\n\n1. **Programming languages** (Ngôn ngữ lập trình): **Java** (hoạt động độc lập với hệ điều hành OS), **Python** (xu hướng chủ đạo cho phát triển AI và phân tích dữ liệu, cú pháp đơn giản), **ngôn ngữ C** (tốc độ cao, có thể điều khiển phần cứng).\n2. **Compiler and interpreter** (Trình biên dịch và trình thông dịch): Phương pháp chuyển đổi mã nguồn sang ngôn ngữ máy rồi mới thực thi (compiler), và phương pháp thực thi trong khi diễn dịch từng dòng một (interpreter).\n3. **Markup language** (Ngôn ngữ đánh dấu): Ngôn ngữ cấu trúc hóa dữ liệu bằng cách bao bọc nó bằng các thẻ (tags). **HTML** (để hiển thị web), **XML** (người dùng có thể tự định nghĩa các thẻ riêng của mình và được sử dụng để trao đổi dữ liệu).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:59:en"
  };

  window.CONTENT_I18N["itpass:60"] = window.CONTENT_I18N["itpass:60"] || {};
  window.CONTENT_I18N["itpass:60"].vi = {
    title: "8-01 Planning and Requirements Definition",
    concept: "Đây là giai đoạn đầu tiên của quá trình phát triển hệ thống.\n\n1. **System planning process** (Quy trình lập kế hoạch hệ thống): Phát triển khái niệm hệ thống hóa dựa trên chiến lược quản lý.\n2. **Requirements definition process** (Quy trình xác định yêu cầu): Quy trình làm rõ các chức năng, hiệu suất và tiêu chuẩn bảo mật được yêu cầu cho hệ thống và thống nhất với người dùng (quan trọng nhất).\n3. **RFP (Request for Proposal)**: Tài liệu mà bên đặt hàng (doanh nghiệp) yêu cầu nhà cung cấp phát triển (công ty IT) tạo đề xuất xây dựng hệ thống cụ thể. Bằng cách trình bày RFP, có thể lựa chọn nhà cung cấp một cách công bằng và chính xác.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này rất thường xuyên xuất hiện trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa, mà còn là tổ chức các thuật ngữ liên quan cùng với các kịch bản sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:60:en"
  };

  window.CONTENT_I18N["itpass:61"] = window.CONTENT_I18N["itpass:61"] || {};
  window.CONTENT_I18N["itpass:61"].vi = {
    title: "8-02 Quy trình phát triển (Development Process)",
    concept: "Đây là quy trình xây dựng và xác thực hệ thống (SLCP).\n\n1. **Design**: Quyết định giao diện màn hình và định dạng dữ liệu dựa trên các yêu cầu. Có \"external design\" xác định những gì người dùng nhìn thấy và \"internal design\" dành cho các nhà phát triển.\n2. **Các loại và thứ tự Test**:\n   - **Unit test**: Một bài kiểm tra được thực hiện trên đơn vị thành phần nhỏ nhất (module) của chương trình.\n   - **Integration test**: Một bài kiểm tra xác thực giao diện (interface) bằng cách liên kết nhiều thành phần.\n   - **System testing**: Một bài kiểm tra trong đó nhà phát triển tích hợp tất cả các chức năng và xác nhận toàn bộ hệ thống hoạt động như yêu cầu.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:61:en"
  };

  window.CONTENT_I18N["itpass:62"] = window.CONTENT_I18N["itpass:62"] || {};
  window.CONTENT_I18N["itpass:62"].vi = {
    title: "8-03 Phương pháp kiểm thử, Vận hành và Bảo trì (Test Methods, Operation and Maintenance)",
    concept: "Đây là phương pháp kiểm thử cho việc vận hành/bảo trì sau khi hệ thống hoạt động và cho các hoạt động sửa chữa.\n\n1. **Regression test**: Một bài kiểm thử \"ngăn ngừa lỗi lũy tiến\" nhằm xác minh rằng khi một phần của hệ thống thay đổi, không có lỗi (bugs) ngoài ý muốn nào xảy ra ở các phần khác không liên quan.\n2. **Acceptings test**: Một bài kiểm thử cuối cùng trong đó người dùng (khách hàng) đã đặt hàng hệ thống trực tiếp vận hành hệ thống đã phát triển để xác nhận rằng nó hoạt động đúng như hợp đồng.\n3. **Maintenance**: Công việc liên tục để sửa lỗi (bugs) và phản hồi với những thay đổi về môi trường (nâng cấp phiên bản OS, v.v.).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:62:en"
  };

  window.CONTENT_I18N["itpass:63"] = window.CONTENT_I18N["itpass:63"] || {};
  window.CONTENT_I18N["itpass:63"].vi = {
    title: "8-04 Phương pháp phát triển phần mềm (Software Development Methodologies)",
    concept: "Đây là một cách tiếp cận để tiến hành phát triển phần mềm.\n\n1. **Waterfall model**: Một phương pháp vững chắc tiến triển từ định nghĩa yêu cầu đến thiết kế và kiểm thử theo thứ tự như một dòng sông, và không cho phép bất kỳ việc quay lại các bước trước đó. Thích hợp cho phát triển quy mô lớn với các thông số kỹ thuật được xác định rõ ràng.\n2. **Agile model**: Chia giai đoạn phát triển thành các đơn vị ngắn (**iterations** hoặc sprints) và lặp lại các đợt phát hành theo các đơn vị chức năng nhỏ. Một phương pháp có thể phản hồi linh hoạt với những thay đổi trong thông số kỹ thuật.\n3. **DevOps**: Một nền văn hóa và các hoạt động trong đó bộ phận phát triển (development) và vận hành (operations) hợp tác chặt chẽ với nhau để đạt được cả việc phát hành hệ thống nhanh chóng và vận hành ổn định.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:63:en"
  };

  window.CONTENT_I18N["itpass:64"] = window.CONTENT_I18N["itpass:64"] || {};
  window.CONTENT_I18N["itpass:64"].vi = {
    title: "8-05 Quản trị dự án (Project Management)",
    concept: "Đây là một phương pháp quản lý (PMBOK, v.v.) để hoàn thành một dự án đúng hạn, trong ngân sách và với chất lượng theo yêu cầu.\n\n- **WBS (Work Breakdown Structure)**: Một sơ đồ cấu trúc phân chia công việc của toàn bộ dự án theo cấp bậc. Nó ngăn ngừa việc bỏ sót công việc và làm cơ sở cho việc lập kế hoạch tiến độ và ước tính ngân sách. Đơn vị công việc tối thiểu trong WBS được gọi là **work package**.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:64:en"
  };

  window.CONTENT_I18N["itpass:65"] = window.CONTENT_I18N["itpass:65"] || {};
  window.CONTENT_I18N["itpass:65"].vi = {
    title: "8-06 Quản lý thời gian (Time Management)",
    concept: "Một phương pháp quản lý tiến độ.\n\n1. **Arrow diagram (PERT diagram)**: Sơ đồ mạng lưới kết nối trình tự các tác vụ bằng mũi tên. Hãy ghi lại thời gian cần thiết cho mỗi tác vụ.\n2. **Critical path**: Trong sơ đồ mũi tên, đường có số ngày kéo dài nhất từ khi bắt đầu đến khi kết thúc. Sự chậm trễ ở bất kỳ công việc nào trên đường này cũng sẽ làm chậm tiến độ hoàn thành của toàn bộ dự án.\n3. **Gantt chart**: Biểu đồ đại diện trực quan cho trạng thái tiến độ dưới dạng thanh, với thời gian ở trục ngang và các hạng mục công việc ở trục dọc.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:65:en"
  };

  window.CONTENT_I18N["itpass:66"] = window.CONTENT_I18N["itpass:66"] || {};
  window.CONTENT_I18N["itpass:66"].vi = {
    title: "8-07 Quản lý dịch vụ IT (IT Service Management)",
    concept: "Đây là phương pháp quản lý vận hành để cung cấp dịch vụ IT ổn định và chất lượng cao cho khách hàng sau khi hệ thống đi vào hoạt động (có một tập hợp các thực hành tốt nhất được gọi là **ITIL**).\n\n- **SLA (Service Level Agreement)**: Tài liệu xác định mức độ chất lượng dịch vụ (thời gian hoạt động uptime, v.v.) được thống nhất giữa nhà cung cấp dịch vụ và khách hàng.\n- **Service Desk**: Điểm tiếp nhận liên hệ đầu tiên (single point of contact) cho các rắc rối và yêu cầu từ người dùng.\n- **Incident management**: Các hoạt động nhằm mục đích \"khôi phục dịch vụ nhanh nhất có thể\" bằng cách sử dụng các giải pháp tạm thời khi xảy ra lỗi (việc điều tra nguyên nhân gốc rễ là vai trò của quản lý vấn đề - problem management).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:66:en"
  };

  window.CONTENT_I18N["itpass:67"] = window.CONTENT_I18N["itpass:67"] || {};
  window.CONTENT_I18N["itpass:67"].vi = {
    title: "8-08 Kiểm toán hệ thống (System Audits)",
    concept: "Đây là một hoạt động trong đó bên thứ ba khách quan (system auditor) đánh giá và xác minh toàn diện từ lập trường độc lập xem hệ thống thông tin có tuân thủ các chính sách quản lý và đang được quản lý, vận hành một cách an toàn, phù hợp hay không.\n\nKiểm toán viên sẽ nộp báo cáo kiểm toán cho bộ phận được kiểm toán và đưa ra khuyến nghị cải tiến nếu có bất kỳ vấn đề nào. Để duy trì tính độc lập, kiểm toán viên không được chịu trách nhiệm về hoạt động của bộ phận đang được kiểm toán.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:67:en"
  };

  window.CONTENT_I18N["itpass:68"] = window.CONTENT_I18N["itpass:68"] || {};
  window.CONTENT_I18N["itpass:68"].vi = {
    title: "9-01 Báo cáo tài chính (Financial Statements)",
    concept: "Đây là báo cáo tài chính để công bố tình hình tài chính và kết quả hoạt động của công ty ra thế giới bên ngoài.\n\n1. **Balance Sheet (B/S)**: Bảng thể hiện tình hình tài chính của một công ty tại một thời điểm nhất định. Đặt **assets** (tiền mặt và tiền gửi, các khoản phải thu, v.v.) ở bên trái, và **liabilities** (khoản vay, các khoản phải trả, v.v.) cùng với **net assets** (vốn, lợi nhuận giữ lại, v.v.) ở bên phải. Công thức \"Assets = Liabilities + Net Assets\" luôn luôn đúng.\n2. **P/L - Profit and Loss statement**: Bảng thể hiện kết quả kinh doanh (lợi nhuận) trong một khoảng thời gian nhất định. Trừ đi các chi phí khác nhau từ doanh số để tìm ra \"net income\" cuối cùng.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:68:en"
  };

  window.CONTENT_I18N["itpass:69"] = window.CONTENT_I18N["itpass:69"] || {};
  window.CONTENT_I18N["itpass:69"].vi = {
    title: "9-02 Điểm hòa vốn và Quản lý tài sản (Break-Even Point and Asset Management)",
    concept: "Đây là một chỉ số phục vụ cho việc lập kế hoạch kinh doanh và tính toán chi phí.\n\n1. **Break-even point**: Doanh thu mà tại đó doanh số và tổng chi phí hoàn toàn bằng nhau, lợi nhuận bằng không. Nếu vượt qua mức này, bạn sẽ có lãi.\n   - **Fixed costs**: Các khoản chi phí cố định không thay đổi bất kể doanh số (tiền thuê nhà, lương cơ bản, v.v.).\n   - **Variable costs**: Các chi phí biến đổi tăng hoặc giảm tỷ lệ thuận với doanh số (chi phí nguyên liệu thô, chi phí mua hàng, v.v.).\n   - **Công thức**: `Break-even sales = fixed costs / (1 - variable cost rate)` (trong đó variable cost rate = variable costs / sales)\n2. **Depreciation**: Một quy trình trong đó chi phí mua sắm tài sản cố định như máy tính được phân bổ thành chi phí hoạt động theo thời gian sử dụng hữu ích của chúng.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:69:en"
  };

  window.CONTENT_I18N["itpass:70"] = window.CONTENT_I18N["itpass:70"] || {};
  window.CONTENT_I18N["itpass:70"].vi = {
    title: "9-03 Quyền sở hữu trí tuệ (Intellectual Property Rights)",
    concept: "Quyền đối với các sản phẩm là kết quả từ các hoạt động sáng tạo trí tuệ.\n\n1. **Quyền sở hữu công nghiệp (yêu cầu nộp đơn và đăng ký với Cục Sở hữu Trí tuệ)**:\n   - **Patent rights** (Quyền sáng chế): Bảo hộ công nghệ và phát minh (ý tưởng tiên tiến, bằng sáng chế kinh doanh, v.v.). Thời hạn là 20 năm kể từ ngày nộp đơn.\n   - **Utility model right** (Quyền giải pháp hữu ích): Phát minh về hình dáng của một vật phẩm (phát minh nhỏ). Thời hạn là 10 năm kể từ ngày nộp đơn.\n   - **Design Rights** (Quyền kiểu dáng công nghiệp): Thiết kế thẩm mỹ của một sản phẩm. Thời hạn là 25 năm kể từ khi đăng ký.\n   - **Trademark rights** (Quyền nhãn hiệu): Tên thương hiệu và biểu tượng logo. Có thể gia hạn sau mỗi 10 năm.\n2. **Copyright** (Bản quyền): Bảo vệ sự thể hiện sáng tạo của suy nghĩ và cảm xúc (cũng áp dụng cho mã chương trình). **Không yêu cầu đăng ký nộp đơn**, nó sẽ tự động phát sinh khi tác phẩm hoàn thành (**hệ thống phi hình thức - non-formal system**). Các thuật toán (algorithms) và ngôn ngữ lập trình (programming languages) không được bảo hộ.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:70:en"
  };

  window.CONTENT_I18N["itpass:71"] = window.CONTENT_I18N["itpass:71"] || {};
  window.CONTENT_I18N["itpass:71"].vi = {
    title: "9-04 Quy định về Bảo mật và Thông tin cá nhân (Security and Personal Information Regulations)",
    concept: "Đây là luật cho các hoạt động IT an toàn và phù hợp.\n\n1. **Unauthorized Access Prohibition Act** (Đạo luật cấm truy cập trái phép): Luật nghiêm cấm hành vi đăng nhập bằng ID và mật khẩu của người khác mà không có sự cho phép, và hành vi cung cấp thông tin ID một cách bất hợp pháp cho người khác.\n2. **Personal Information Protection Act** (Đạo luật bảo vệ thông tin cá nhân): Luật quy định việc xử lý phù hợp các thông tin có thể nhận dạng cá nhân. Thông tin về **các cá nhân đang sống** sẽ được áp dụng (người đã khuất không thuộc phạm vi điều chỉnh). Về nguyên tắc, nghiêm cấm cung cấp thông tin cá nhân cho bên thứ ba mà không có sự đồng ý của cá nhân đó.\n3. **Unfair Competition Prevention Act** (Đạo luật phòng chống cạnh tranh không lành mạnh): Luật nghiêm cấm việc thu thập và sử dụng bất hợp pháp các **trade secrets** (bí mật kinh doanh) như công nghệ và danh sách khách hàng của công ty. Để được công nhận là bí mật kinh doanh, thông tin phải đáp ứng ba yêu cầu: \"secrecy controllability\" (khả năng kiểm soát tính bảo mật), \"usefulness\" (tính hữu ích), và \"non-public knowledge\" (tính không công khai).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:71:en"
  };

  window.CONTENT_I18N["itpass:72"] = window.CONTENT_I18N["itpass:72"] || {};
  window.CONTENT_I18N["itpass:72"].vi = {
    title: "9-05 Quy định về Lao động và Giao dịch (Labor and Transaction Regulations)",
    concept: "Luật lao động và hợp đồng là quan trọng nhất trong phát triển hệ thống.\n\n1. **Contract** (Hợp đồng dịch vụ/thầu phụ): Một hợp đồng trong đó công ty phát triển (nhà thầu phụ) cam kết hoàn thành hệ thống (bàn giao sản phẩm). **Công ty được ủy thác** có quyền chỉ huy và điều hành người lao động. Bên đặt hàng không được đưa ra chỉ thị trực tiếp cho người lao động của nhà thầu phụ (làm như vậy sẽ dẫn đến hành vi bất hợp pháp \"**double dispatch (disguised contracting)**\" - phái cử kép/thầu phụ trá hình).\n2. **Worker dispatch contract** (Hợp đồng phái cử lao động): Một hợp đồng phái cử nguồn nhân lực. Quyền chỉ huy và điều hành người lao động thuộc về công ty tiếp nhận phái cử (bên đặt hàng).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:72:en"
  };

  window.CONTENT_I18N["itpass:73"] = window.CONTENT_I18N["itpass:73"] || {};
  window.CONTENT_I18N["itpass:73"].vi = {
    title: "9-06 Phân tích doanh nghiệp (Business Analysis)",
    concept: "Đây là một công cụ trực quan hóa tình hình hiện tại và các vấn đề chất lượng của một công ty.\n\n1. **SWOT analysis**: Phương pháp phân tích môi trường của công ty theo 4 trục: **Strengths (S)** (Điểm mạnh), **Weaknesses (W)** (Điểm yếu) (môi trường nội bộ), và **Opportunities (O)** (Cơ hội), **Threats (T)** (Thách thức) (môi trường bên ngoài).\n2. **3C analysis**: Phương pháp phân tích môi trường thị trường từ 3 góc độ: **Customer** (Khách hàng), **Competitor** (Đối thủ cạnh tranh), và **Company** (Doanh nghiệp) khi hoạch định chiến lược kinh doanh.\n3. **7 công cụ quản lý chất lượng (7 Quality Control (QC) Tools)**:\n   - **Pareto Chart** (Biểu đồ Pareto): Sơ đồ kết hợp giữa biểu đồ cột sắp xếp dữ liệu theo thứ tự giảm dần theo từng mục và biểu đồ đường kết nối tỷ lệ tích lũy. Được sử dụng để thu hẹp các mục quản lý quan trọng (quy tắc 80:20).\n   - **Cause-effect diagram** (Biểu đồ nhân quả): Biểu đồ có hình dạng xương cá thể hiện mối quan hệ giữa kết quả (sự cố, v.v.) và nguyên nhân (yếu tố).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:73:en"
  };

  window.CONTENT_I18N["itpass:74"] = window.CONTENT_I18N["itpass:74"] || {};
  window.CONTENT_I18N["itpass:74"].vi = {
    title: "9-07 Khai thác dữ liệu và Giải quyết vấn đề (Data Utilization and Problem Solving)",
    concept: "Đây là một phương pháp trích xuất kiến thức hữu ích cho việc quản lý từ dữ liệu lớn (big data).\n\n1. **Regression analysis** (Phân tích hồi quy): Phương pháp dự báo tương lai bằng cách biểu diễn mối quan hệ nhân quả giữa một biến số (ví dụ: nhiệt độ) và một biến số khác (ví dụ: doanh số bán bia) trong công thức toán học dựa trên dữ liệu quá khứ.\n2. **Correlation** (Sự tương quan): Mối quan hệ trong đó hai nhóm dữ liệu có liên quan đến nhau (ví dụ: nếu một nhóm tăng, nhóm kia cũng tăng). Tuy nhiên, sự tương quan không đồng nghĩa với mối quan hệ nhân quả.\n3. **Data mining** (Khai phá dữ liệu): Công nghệ sử dụng các phương pháp thống kê và học máy (machine learning) để \"khai phá\" các quy luật và mối tương quan ẩn giấu từ một lượng dữ liệu lớn.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:74:en"
  };

  window.CONTENT_I18N["itpass:75"] = window.CONTENT_I18N["itpass:75"] || {};
  window.CONTENT_I18N["itpass:75"].vi = {
    title: "9-08 Tiêu chuẩn hóa (Standardization)",
    concept: "Đây là hoạt động nhằm thống nhất các sản phẩm và tiêu chuẩn giao tiếp để tăng tính tương thích và tiện lợi.\n\n1. **Các tổ chức tiêu chuẩn hóa**:\n   - **ISO**: Tổ chức Tiêu chuẩn hóa Quốc tế.\n   - **IEC**: Các tiêu chuẩn quốc tế trong lĩnh vực điện.\n   - **IEEE**: Các tiêu chuẩn hiệp hội kỹ thuật điện và điện tử, bao gồm cả tiêu chuẩn LAN.\n   - **JIS**: Tiêu chuẩn Công nghiệp Nhật Bản.\n2. **Các tiêu chuẩn mã hóa**:\n   - **JAN code**: Mã vạch sản phẩm phổ biến của Nhật Bản.\n   - **QR code**: Mã hai chiều. Nó có dữ liệu ở cả chiều dọc và chiều ngang, có thể ghi lại nhiều thông tin hơn mã JAN code, và có thể khôi phục một phần ngay cả khi bị hư hỏng.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:75:en"
  };

  window.CONTENT_I18N["itpass:76"] = window.CONTENT_I18N["itpass:76"] || {};
  window.CONTENT_I18N["itpass:76"].vi = {
    title: "10-01 Cuộc cách mạng công nghiệp lần thứ tư và Dữ liệu lớn (The Fourth Industrial Revolution and Big Data)",
    concept: "Chúng ta đang sống trong kỷ nguyên đổi mới kỹ thuật số, nơi sẽ thay đổi đáng kể cấu trúc công nghiệp và phong cách sống bằng cách sử dụng IoT, AI, và dữ liệu lớn (big data).\n\n- **Big Data**: Các nhóm dữ liệu có khối lượng lớn, đa dạng và tần suất cao (thời gian thực - real-time) mà các hệ thống truyền thống không thể xử lý được.\n- **Sharing Economy** (Nền kinh tế chia sẻ): Một hệ thống trong đó các tài sản như phòng trống và ô tô được cho thuê giữa các cá nhân thông qua một nền tảng Internet (ví dụ: chia sẻ xe, lưu trú tư nhân).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:76:en"
  };

  window.CONTENT_I18N["itpass:77"] = window.CONTENT_I18N["itpass:77"] || {};
  window.CONTENT_I18N["itpass:77"].vi = {
    title: "10-02 Hoạt động của doanh nghiệp (Corporate Activities)",
    concept: "Đây là vai trò mà các công ty nên thực hiện nhằm hướng tới một xã hội phát triển bền vững.\n\n1. **CSR (Corporate Social Responsibility)**: Ý tưởng cho rằng các công ty không chỉ nên theo đuổi lợi nhuận mà còn phải thực hiện các trách nhiệm xã hội của mình dưới góc độ bảo vệ môi trường, đóng góp xã hội và tuân thủ pháp luật.\n2. **SDGs (Sustainable Development Goals)**: Các mục tiêu phát triển bền vững do Liên Hợp Quốc đề ra, bao gồm 17 mục tiêu cần đạt được vào năm 2030.\n3. **Green IT**: Những nỗ lực nhằm giảm thiểu tác động môi trường bằng cách giảm mức tiêu thụ điện năng và làm cho các hệ thống không cần dùng giấy tờ.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:77:en"
  };

  window.CONTENT_I18N["itpass:78"] = window.CONTENT_I18N["itpass:78"] || {};
  window.CONTENT_I18N["itpass:78"].vi = {
    title: "10-03 Quản trị doanh nghiệp và Kiểm soát nội bộ (Corporate Governance and Internal Control)",
    concept: "Đây là hệ thống nhằm ngăn ngừa gian lận doanh nghiệp và đảm bảo quản lý lành mạnh.\n\n1. **Corporate Governance** (Quản trị doanh nghiệp): Một hệ thống trong đó các cổ đông và giám đốc bên ngoài giám sát ban quản lý, ngăn ngừa các bê bối và nâng cao hiệu quả quản lý.\n2. **Internal Control** (Kiểm soát nội bộ): Các quy tắc và quy trình được thiết lập trong một công ty để đảm bảo hoạt động kinh doanh diễn ra đúng đắn. Mục đích là đảm bảo tính tin cậy của báo cáo tài chính và tuân thủ pháp luật.\n3. **Compliance** (Sự tuân thủ): Tuân thủ không chỉ luật pháp và quy định, mà còn cả các quy tắc bao gồm đạo đức doanh nghiệp và các chuẩn mực xã hội.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:78:en"
  };

  window.CONTENT_I18N["itpass:79"] = window.CONTENT_I18N["itpass:79"] || {};
  window.CONTENT_I18N["itpass:79"].vi = {
    title: "10-04 Chiến lược quản lý (Management Strategy)",
    concept: "Đây là phương pháp quản lý để tồn tại trong cạnh tranh và tối đa hóa sự tăng trưởng.\n\n1. **Core Competence** (Năng lực cốt lõi): Các điểm mạnh cốt lõi độc đáo (công nghệ và bí quyết) chỉ duy nhất có ở công ty bạn và không thể bị sao chép bởi các công ty khác.\n2. **M&A** (Mua bán và Sáp nhập): Mua bán và sáp nhập các công ty. Thời gian để tham gia vào một hoạt động kinh doanh mới có thể được rút ngắn đáng kể.\n3. **Alliance** (Liên minh): Một liên minh trong đó nhiều công ty bổ sung cho nhau về công nghệ và kênh bán hàng trên cơ sở bình đẳng.\n4. **OEM**: Sản xuất sản phẩm dưới tên thương hiệu của thiết bị gốc. Nhà sản xuất có thể tăng tỷ lệ sử dụng nhà máy, và bên mua có thể bán sản phẩm mà không cần sở hữu nhà máy.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:79:en"
  };

  window.CONTENT_I18N["itpass:80"] = window.CONTENT_I18N["itpass:80"] || {};
  window.CONTENT_I18N["itpass:80"].vi = {
    title: "10-05 Chiến lược hệ thống thông tin và Quy trình kinh doanh (Information System Strategy and Business Processes)",
    concept: "Đây là chiến lược hệ thống hóa tận dụng IT để tối ưu hóa và chuyển đổi kinh doanh.\n\n1. **EA (Enterprise Architecture)**: Phương pháp mô hình hóa bức tranh tổng thể về tổ chức, quy trình kinh doanh, hệ thống và dữ liệu của một công ty lớn, nhằm đạt được sự tối ưu hóa tổng thể.\n2. **BPR (Business Process Redesign)**: **Xem xét lại một cách cơ bản, thiết kế lại triệt để và xây dựng lại** các tổ chức và quy trình kinh doanh hiện tại để đạt được những kết quả đáng kể.\n3. **BPM (Business Process Management)**: Các hoạt động nhằm liên tục giám sát và cải thiện quy trình hoạt động kinh doanh.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:80:en"
  };

  window.CONTENT_I18N["itpass:81"] = window.CONTENT_I18N["itpass:81"] || {};
  window.CONTENT_I18N["itpass:81"].vi = {
    title: "10-06 Chiến lược tiếp thị (Marketing Strategy)",
    concept: "Đây là phương pháp tối đa hóa doanh số bằng cách khuyến khích khách hàng lựa chọn một sản phẩm.\n\n1. **STP**: Phương pháp phân tích để phân khúc thị trường (**S**egment), thu hẹp mục tiêu (**T**arget), và thiết lập vị thế của công ty bạn (**P**osition).\n2. **4P**: Một sự phối hợp tiếp thị (marketing mix) kết hợp 4 yếu tố **Product** (Sản phẩm), **Price** (Giá cả), **Place** (Địa điểm/Phân phối), và **Promotion** (Khuyến mãi/Xúc tiến bán hàng) dưới góc nhìn của người bán.\n3. **Upselling/Cross-selling** (Bán thêm/Bán chéo): Đề xuất một sản phẩm có giá cao hơn (up)/Khuyến khích mọi người mua các sản phẩm liên quan cùng nhau (cross).\n4. **RFM analysis**: Phương pháp đánh giá chất lượng khách hàng theo 3 trục: **Recency** (ngày mua hàng gần nhất), **Frequency** (tần suất mua hàng), và **Monetary** (số tiền mua hàng).\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:81:en"
  };

  window.CONTENT_I18N["itpass:82"] = window.CONTENT_I18N["itpass:82"] || {};
  window.CONTENT_I18N["itpass:82"].vi = {
    title: "10-07 Chiến lược công nghệ (Technology Strategy)",
    concept: "Đây là chiến lược để đạt được lợi thế cạnh tranh bền vững với công nghệ là cốt lõi.\n\n1. **MOT (Management of Technology)**: Chiến lược quản lý kết nối hiệu quả kết quả phát triển công nghệ với hoạt động kinh doanh và gia tăng giá trị tạo ra của doanh nghiệp.\n2. **Technology roadmap** (Lộ trình công nghệ): Sơ đồ tiến độ biểu diễn các dự báo và mục tiêu đối với sự phát triển công nghệ và phát triển sản phẩm mới, với thời gian ở trục ngang và các yếu tố công nghệ cùng dòng sản phẩm ở trục dọc.\n3. **Innovation Dilemma** (Tiến thoái lưỡng nan của sự đổi mới): Hiện tượng các công ty thành công hiện tại biết lắng nghe khách hàng và tiếp tục duy trì các sản phẩm truyền thống chất lượng cao, nhưng lại đánh mất thị trường vào tay các công ty mới tạo ra các đổi mới mang tính đột phá nhưng lại có chi phí thấp và công nghệ thấp hơn.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:82:en"
  };

  window.CONTENT_I18N["itpass:83"] = window.CONTENT_I18N["itpass:83"] || {};
  window.CONTENT_I18N["itpass:83"].vi = {
    title: "10-08 Hệ thống Đánh giá và Quản lý Hiệu suất (Performance Evaluation and Management Systems)",
    concept: "Một công cụ quản lý trực quan hóa hiệu suất của công ty và tập trung hóa các nguồn lực.\n\n1. **BSC (Balanced Scorecard)** (Thẻ điểm cân bằng): Phương pháp thực hiện đánh giá hiệu suất và triển khai chiến lược một cách cân bằng không chỉ từ các chỉ số tài chính mà còn từ 4 khía cạnh: \"tài chính,\" \"khách hàng,\" \"quy trình kinh doanh,\" và \"học hỏi và phát triển.\"\n2. **KPI**: Chỉ số hiệu suất cốt lõi (Key performance indicator). Giá trị mục tiêu trung gian (CSF là yếu tố thành công then chốt - key success factor) để đo lường tiến độ đạt được chiến lược.\n3. **Các hệ thống quản lý doanh nghiệp chính**:\n   - **ERP**: Hệ thống thông tin tích hợp quản lý tập trung con người, hàng hóa, tài chính và thông tin của công ty để tối ưu hóa tổng thể.\n   - **SCM**: Kết nối chuỗi cung ứng từ mua sắm nguyên liệu thô đến bán hàng và giảm thiểu hàng tồn kho.\n   - **CRM**: Quản lý tập trung thông tin khách hàng, thắt chặt mối quan hệ và tăng tỷ lệ khách hàng quay lại.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:83:en"
  };

  window.CONTENT_I18N["itpass:84"] = window.CONTENT_I18N["itpass:84"] || {};
  window.CONTENT_I18N["itpass:84"].vi = {
    title: "10-09 Hệ thống Kinh doanh và Kỹ thuật (Business Systems and Engineering)",
    concept: "Đây là hệ thống IT nhằm nâng cao hiệu suất sản xuất trong ngành sản xuất công nghiệp.\n\n1. **CAD / CAM**: Thiết kế hỗ trợ bằng máy tính (CAD) và hỗ trợ sản xuất (CAM) sử dụng dữ kế thiết kế để điều khiển các máy công cụ và tự động sản xuất.\n2. **Concurrent Engineering** (Kỹ thuật đồng thời): Trong phát triển sản phẩm, một phương pháp rút ngắn đáng kể thời gian phát triển bằng cách **tiến hành song song** thay vì thực hiện từng quy trình như thiết kế, tạo mẫu và sản xuất một cách độc lập.\n3. **JIT (Just in Time)** (Vừa đúng lúc): Phương pháp đặc trưng của Toyota nhằm sản xuất và cung cấp những gì cần thiết, khi cần thiết và với số lượng cần thiết. Giảm lượng bán thành phẩm và hàng tồn kho xuống mức tối thiểu.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:84:en"
  };

  window.CONTENT_I18N["itpass:85"] = window.CONTENT_I18N["itpass:85"] || {};
  window.CONTENT_I18N["itpass:85"].vi = {
    title: "10-10 Kinh doanh điện tử (E-Business)",
    concept: "Đây là một hình thức kinh doanh tận dụng Internet.\n\n1. **Transaction type** (Loại hình giao dịch): **B2C** (doanh nghiệp với cá nhân, trung tâm thương mại điện tử, v.v.), **B2B** (giao dịch giữa doanh nghiệp với doanh nghiệp), **C2C** (ứng dụng chợ điện tử/mua bán cá nhân, v.v.).\n2. **O2O (Online to Offline)**: Phương pháp khuyến khích khách hàng ghé thăm và mua hàng từ các cửa hàng vật lý (offline) thông qua các hoạt động trực tuyến (phát mã giảm giá, v.v.).\n3. **Smart contract** (Hợp đồng thông minh): Cơ chế tự động thực hiện các hợp đồng theo quy tắc định trước trên blockchain. Các giao dịch an toàn và cực kỳ khó giả mạo sẽ khả thi mà không cần qua trung gian.\n\n**Điểm lưu ý cho người mới bắt đầu IT:**\nLĩnh vực này xuất hiện rất thường xuyên trong kỳ thi IT Passport, vì vậy lối tắt để vượt qua kỳ thi không chỉ là định nghĩa các từ khóa (keywords) mà còn là tổ chức các thuật ngữ liên quan cùng với các tình huống sử dụng thực tế (ví dụ).",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:85:en"
  };
})();
