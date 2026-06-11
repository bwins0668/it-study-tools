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
})();
