// Mock Database Schema and Tables
const DB_DATA = {
  "students_mst": [
    {
      "student_id": 1,
      "student_name": "井田 和義",
      "student_name_kana": "イダ カズヨシ",
      "student_number": 20110401,
      "department_id": 13,
      "gender": 0,
      "age": 20,
      "test_score": 100,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": "2026-04-13 21:23:18"
    },
    {
      "student_id": 2,
      "student_name": "齋藤 綾子",
      "student_name_kana": "サイトウ アヤコ",
      "student_number": 20110402,
      "department_id": 2,
      "gender": 1,
      "age": 25,
      "test_score": 80,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 3,
      "student_name": "山田 太郎",
      "student_name_kana": "ヤマダ タロウ",
      "student_number": 20110403,
      "department_id": 3,
      "gender": 0,
      "age": 50,
      "test_score": 90,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 4,
      "student_name": "高橋 秀樹",
      "student_name_kana": "タハカシ ヒデキ",
      "student_number": 20110404,
      "department_id": 4,
      "gender": 0,
      "age": 60,
      "test_score": 70,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 5,
      "student_name": "山本 太郎",
      "student_name_kana": "ヤマモト タロウ",
      "student_number": 20110405,
      "department_id": 5,
      "gender": 0,
      "age": 60,
      "test_score": 80,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 6,
      "student_name": "品川 正二",
      "student_name_kana": "シナガワ ショウジ",
      "student_number": 20110406,
      "department_id": 6,
      "gender": 0,
      "age": 20,
      "test_score": 90,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 7,
      "student_name": "高木 義男",
      "student_name_kana": "タカギ ヨシオ",
      "student_number": 20110407,
      "department_id": 7,
      "gender": 0,
      "age": 50,
      "test_score": 80,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 8,
      "student_name": "新法 みどり",
      "student_name_kana": "シンポウ ミドリ",
      "student_number": 20110408,
      "department_id": 8,
      "gender": 1,
      "age": 60,
      "test_score": 60,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 9,
      "student_name": "山本 高之",
      "student_name_kana": "ヤマモト タカユキ",
      "student_number": 20110409,
      "department_id": 9,
      "gender": 0,
      "age": 10,
      "test_score": 58,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 10,
      "student_name": "山田 肇",
      "student_name_kana": "ヤマダ ハジメ",
      "student_number": 20110410,
      "department_id": 10,
      "gender": 0,
      "age": 15,
      "test_score": 60,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": "2026-04-13 21:23:18"
    },
    {
      "student_id": 11,
      "student_name": "新田 俊",
      "student_name_kana": "ニッタ シュン",
      "student_number": null,
      "department_id": 1,
      "gender": 0,
      "age": 24,
      "test_score": 44,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 12,
      "student_name": "飯田 香",
      "student_name_kana": "イイダ カオリ",
      "student_number": null,
      "department_id": 2,
      "gender": 1,
      "age": 29,
      "test_score": 56,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 13,
      "student_name": "山下 達郎",
      "student_name_kana": "ヤマシタ タツロウ",
      "student_number": 20110413,
      "department_id": 3,
      "gender": 0,
      "age": 47,
      "test_score": 99,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 14,
      "student_name": "新谷 順",
      "student_name_kana": "シンタニ ジュン",
      "student_number": 20110414,
      "department_id": 4,
      "gender": 0,
      "age": 45,
      "test_score": 10,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": "2026-04-13 21:23:18"
    },
    {
      "student_id": 15,
      "student_name": "山下 義則",
      "student_name_kana": "ヤマシタ ヨシノリ",
      "student_number": 20110415,
      "department_id": 5,
      "gender": 0,
      "age": 15,
      "test_score": 60,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 16,
      "student_name": "新山 千春",
      "student_name_kana": "ニイヤマ チハル",
      "student_number": 20110416,
      "department_id": 6,
      "gender": 1,
      "age": 65,
      "test_score": 0,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 17,
      "student_name": "斉藤 英明",
      "student_name_kana": "サイトウ ヒデアキ",
      "student_number": 20110417,
      "department_id": 7,
      "gender": 0,
      "age": 65,
      "test_score": 45,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 18,
      "student_name": "飯島 辰則",
      "student_name_kana": "イイジマ タツノリ",
      "student_number": 20110418,
      "department_id": 8,
      "gender": 0,
      "age": 55,
      "test_score": 65,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 19,
      "student_name": "谷原 正二",
      "student_name_kana": "タニハラ ショウジ",
      "student_number": 20110419,
      "department_id": 9,
      "gender": 0,
      "age": 15,
      "test_score": 65,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 20,
      "student_name": "福山 正春",
      "student_name_kana": "フクヤマ マサハル",
      "student_number": 20110420,
      "department_id": 10,
      "gender": 0,
      "age": 45,
      "test_score": 55,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": "2026-04-13 21:23:18"
    },
    {
      "student_id": 21,
      "student_name": "福田 高之",
      "student_name_kana": "フクダ タカユキ",
      "student_number": 20110421,
      "department_id": 1,
      "gender": 0,
      "age": 77,
      "test_score": 44,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 22,
      "student_name": "中曽根 登",
      "student_name_kana": "ナカソネ ノボル",
      "student_number": 20110422,
      "department_id": 2,
      "gender": 0,
      "age": 12,
      "test_score": 45,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 23,
      "student_name": "田中 武彦",
      "student_name_kana": "タナカ タケヒコ",
      "student_number": 20110423,
      "department_id": 3,
      "gender": 0,
      "age": 65,
      "test_score": 60,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 24,
      "student_name": "山本 山",
      "student_name_kana": "ヤマモト ヤマ",
      "student_number": 20110424,
      "department_id": 4,
      "gender": 0,
      "age": 32,
      "test_score": 64,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 25,
      "student_name": "飯山 一",
      "student_name_kana": "イイヤマ ハジメ",
      "student_number": 20110425,
      "department_id": 5,
      "gender": 0,
      "age": 22,
      "test_score": 51,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 26,
      "student_name": "栗橋 啓太",
      "student_name_kana": "クリハシ ケイタ",
      "student_number": 20110426,
      "department_id": 6,
      "gender": 0,
      "age": 44,
      "test_score": 11,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 27,
      "student_name": "栗林 順太",
      "student_name_kana": "クリバヤシ ジュンタ",
      "student_number": 20110427,
      "department_id": 7,
      "gender": 0,
      "age": 56,
      "test_score": 65,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 28,
      "student_name": "堀田 剛",
      "student_name_kana": null,
      "student_number": 20110428,
      "department_id": 8,
      "gender": 0,
      "age": 54,
      "test_score": 12,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 29,
      "student_name": "寺山 卓",
      "student_name_kana": "テラヤマ スグル",
      "student_number": 20110429,
      "department_id": 9,
      "gender": 0,
      "age": 24,
      "test_score": 34,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": null
    },
    {
      "student_id": 30,
      "student_name": "本田 宗一郎",
      "student_name_kana": "ホンダ ソウイチロウ",
      "student_number": 20110430,
      "department_id": 10,
      "gender": 0,
      "age": 24,
      "test_score": 55,
      "insert_at": "2026-04-13 21:23:18",
      "update_at": "2026-04-13 21:23:18",
      "delete_at": "2026-04-13 21:23:18"
    }
  ],
  "departments_mst": [
    {
      "department_id": 1,
      "department_name": "ペットビジネス学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 2,
      "department_name": "マスコミ・広報学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 3,
      "department_name": "経営学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 4,
      "department_name": "スポーツビジネス学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 5,
      "department_name": "ショップビジネス学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 6,
      "department_name": "ファッションビジネス学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 7,
      "department_name": "フラワービジネス学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 8,
      "department_name": "ＩＴビジネス学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 9,
      "department_name": "オフィスビジネス学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 10,
      "department_name": "ペットビジネス総合学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    },
    {
      "department_id": 11,
      "department_name": "経営総合学科",
      "insert_at": "2026-04-13 21:23:24",
      "update_at": "2026-04-13 21:23:24",
      "delete_at": null
    }
  ],

  // ===== 书店 / ブック店 / Bookshop (Small) =====
  // 小型书店规模：12本 / 5类 / 8会員 / 15注文
  "books": [
    { "book_id": 1,  "title": "SQL入門",       "author": "田中 学",        "price": 2800, "stock": 5,  "cat_id": 2 },
    { "book_id": 2,  "title": "Python基礎",    "author": "山田 優",        "price": 3200, "stock": 3,  "cat_id": 2 },
    { "book_id": 3,  "title": "三国志",         "author": "陳 寿",         "price": 1500, "stock": 8,  "cat_id": 3 },
    { "book_id": 4,  "title": "星の王子さま",  "author": "サン=テグジュペリ","price": 880,  "stock": 12, "cat_id": 1 },
    { "book_id": 5,  "title": "相対性理論",    "author": "アインシュタイン","price": 2400, "stock": 2,  "cat_id": 4 },
    { "book_id": 6,  "title": "坊っちゃん",    "author": "夏目 漱石",      "price": 600,  "stock": 20, "cat_id": 1 },
    { "book_id": 7,  "title": "DB設計入門",    "author": "田中 学",        "price": 4200, "stock": 2,  "cat_id": 2 },
    { "book_id": 8,  "title": "人間失格",       "author": "太宰 治",        "price": 550,  "stock": 15, "cat_id": 1 },
    { "book_id": 9,  "title": "宇宙の謎",      "author": "佐藤 理",        "price": 1800, "stock": 4,  "cat_id": 4 },
    { "book_id": 10, "title": "世界の歴史",    "author": "中村 史",        "price": 1980, "stock": 6,  "cat_id": 3 },
    { "book_id": 11, "title": "ゴッホの絵",    "author": "鈴木 芸",        "price": 3800, "stock": 1,  "cat_id": 5 },
    { "book_id": 12, "title": "経営学基礎",    "author": "山本 経",        "price": 2200, "stock": 4,  "cat_id": 3 }
  ],

  "cats": [
    { "cat_id": 1, "cat_name": "文学" },
    { "cat_id": 2, "cat_name": "技術" },
    { "cat_id": 3, "cat_name": "歴史" },
    { "cat_id": 4, "cat_name": "科学" },
    { "cat_id": 5, "cat_name": "芸術" }
  ],

  "members": [
    { "mem_id": 1, "name": "Alice",  "age": 22, "gender": "F", "city": "Tokyo"   },
    { "mem_id": 2, "name": "Bob",    "age": 30, "gender": "M", "city": "Osaka"   },
    { "mem_id": 3, "name": "Coco",   "age": 25, "gender": "F", "city": "Kyoto"   },
    { "mem_id": 4, "name": "David",  "age": 18, "gender": "M", "city": "Tokyo"   },
    { "mem_id": 5, "name": "Emma",   "age": 27, "gender": "F", "city": "Osaka"   },
    { "mem_id": 6, "name": "Frank",  "age": 35, "gender": "M", "city": "Nagoya"  },
    { "mem_id": 7, "name": "Grace",  "age": 20, "gender": "F", "city": "Tokyo"   },
    { "mem_id": 8, "name": "Hiro",   "age": 28, "gender": "M", "city": "Fukuoka" }
  ],

  "orders": [
    { "order_id": 1,  "mem_id": 1, "book_id": 1,  "qty": 1, "total": 2800 },
    { "order_id": 2,  "mem_id": 2, "book_id": 4,  "qty": 2, "total": 1760 },
    { "order_id": 3,  "mem_id": 3, "book_id": 6,  "qty": 1, "total": 600  },
    { "order_id": 4,  "mem_id": 4, "book_id": 2,  "qty": 1, "total": 3200 },
    { "order_id": 5,  "mem_id": 5, "book_id": 5,  "qty": 1, "total": 2400 },
    { "order_id": 6,  "mem_id": 1, "book_id": 7,  "qty": 1, "total": 4200 },
    { "order_id": 7,  "mem_id": 6, "book_id": 3,  "qty": 2, "total": 3000 },
    { "order_id": 8,  "mem_id": 7, "book_id": 8,  "qty": 3, "total": 1650 },
    { "order_id": 9,  "mem_id": 8, "book_id": 9,  "qty": 1, "total": 1800 },
    { "order_id": 10, "mem_id": 3, "book_id": 4,  "qty": 1, "total": 880  },
    { "order_id": 11, "mem_id": 5, "book_id": 10, "qty": 1, "total": 1980 },
    { "order_id": 12, "mem_id": 2, "book_id": 1,  "qty": 2, "total": 5600 },
    { "order_id": 13, "mem_id": 6, "book_id": 12, "qty": 1, "total": 2200 },
    { "order_id": 14, "mem_id": 4, "book_id": 11, "qty": 1, "total": 3800 },
    { "order_id": 15, "mem_id": 7, "book_id": 6,  "qty": 2, "total": 1200 }
  ]
};

// Database Schema Metadata for Visualizer
const DB_SCHEMA = {
  "students_mst": {
    "columns": [
      {
        "name": "student_id",
        "type": "INT",
        "desc": "学生ID (主キー)",
        "primary": true
      },
      {
        "name": "student_name",
        "type": "VARCHAR(255)",
        "desc": "氏名",
        "primary": false
      },
      {
        "name": "student_name_kana",
        "type": "VARCHAR(255)",
        "desc": "氏名カナ",
        "primary": false
      },
      {
        "name": "student_number",
        "type": "VARCHAR(20)",
        "desc": "学籍番号",
        "primary": false
      },
      {
        "name": "department_id",
        "type": "INT",
        "desc": "学科ID (外部キー -> departments_mst.department_id)",
        "primary": false
      },
      {
        "name": "gender",
        "type": "CHAR(1)",
        "desc": "性別 (0:男, 1:女)",
        "primary": false
      },
      {
        "name": "age",
        "type": "INT",
        "desc": "年齢",
        "primary": false
      },
      {
        "name": "test_score",
        "type": "INT",
        "desc": "得点",
        "primary": false
      },
      {
        "name": "insert_at",
        "type": "DATETIME",
        "desc": "登録日時",
        "primary": false
      },
      {
        "name": "update_at",
        "type": "DATETIME",
        "desc": "更新日時",
        "primary": false
      },
      {
        "name": "delete_at",
        "type": "DATETIME",
        "desc": "削除日時",
        "primary": false
      }
    ]
  },
  "departments_mst": {
    "columns": [
      {
        "name": "department_id",
        "type": "INT",
        "desc": "学科ID (主キー)",
        "primary": true
      },
      {
        "name": "department_name",
        "type": "VARCHAR(255)",
        "desc": "学科名",
        "primary": false
      },
      {
        "name": "insert_at",
        "type": "DATETIME",
        "desc": "登録日時",
        "primary": false
      },
      {
        "name": "update_at",
        "type": "DATETIME",
        "desc": "更新日時",
        "primary": false
      },
      {
        "name": "delete_at",
        "type": "DATETIME",
        "desc": "削除日時",
        "primary": false
      }
    ]
  },

  "books": {
    "columns": [
      { "name": "book_id", "type": "INT",          "desc": "书籍ID / 本ID (主键 PK)",        "primary": true  },
      { "name": "title",   "type": "VARCHAR(100)",  "desc": "书名 / タイトル / Title",         "primary": false },
      { "name": "author",  "type": "VARCHAR(50)",   "desc": "作者 / 著者 / Author",           "primary": false },
      { "name": "price",   "type": "INT",          "desc": "价格(円) / 価格 / Price (¥)",    "primary": false },
      { "name": "stock",   "type": "INT",          "desc": "库存数量 / 在庫数 / Stock qty",   "primary": false },
      { "name": "cat_id",  "type": "INT",          "desc": "分类ID (外键 -> cats.cat_id)",   "primary": false }
    ]
  },
  "cats": {
    "columns": [
      { "name": "cat_id",   "type": "INT",         "desc": "分类ID / カテゴリID (主键 PK)",   "primary": true  },
      { "name": "cat_name", "type": "VARCHAR(30)", "desc": "分类名 / カテゴリ名 / Category", "primary": false }
    ]
  },
  "members": {
    "columns": [
      { "name": "mem_id",  "type": "INT",         "desc": "会员ID / 会員ID (主键 PK)",         "primary": true  },
      { "name": "name",    "type": "VARCHAR(30)", "desc": "姓名 / 名前 / Name",                "primary": false },
      { "name": "age",     "type": "INT",         "desc": "年龄 / 年齢 / Age",                 "primary": false },
      { "name": "gender",  "type": "CHAR(1)",     "desc": "性别 / 性別 (M:男 / F:女)",        "primary": false },
      { "name": "city",    "type": "VARCHAR(20)", "desc": "城市 / 都市 / City",               "primary": false }
    ]
  },
  "orders": {
    "columns": [
      { "name": "order_id", "type": "INT", "desc": "订单ID / 注文ID (主键 PK)",                              "primary": true  },
      { "name": "mem_id",   "type": "INT", "desc": "会员ID (外键 -> members.mem_id)",                        "primary": false },
      { "name": "book_id",  "type": "INT", "desc": "书籍ID (外键 -> books.book_id)",                         "primary": false },
      { "name": "qty",      "type": "INT", "desc": "数量 / 数量 / Quantity",                                 "primary": false },
      { "name": "total",    "type": "INT", "desc": "金额(円) / 合計金額 / Total amount (¥)",                  "primary": false }
    ]
  }
};

// DB groups for the schema visualizer switcher
const DB_GROUPS = {
  school: ["students_mst", "departments_mst"],
  shop:   ["books", "cats", "members", "orders"]
};


class MockSQLEngine {
  constructor() {
    this.db = JSON.parse(JSON.stringify(DB_DATA));
  }

  reset() {
    this.db = JSON.parse(JSON.stringify(DB_DATA));
  }

  getTableData(tableName) {
    return this.db[tableName] || null;
  }

  cleanQuery(sql) {
    return sql
      .replace(/\s+/g, ' ')
      .replace(/;\s*$/, '')
      .trim();
  }

  execute(sql) {
    try {
      const cleanSql = this.cleanQuery(sql);
      const upperSql = cleanSql.toUpperCase();

      if (upperSql.startsWith("SELECT")) {
        return this.executeSelect(cleanSql);
      } else if (upperSql.startsWith("INSERT")) {
        return this.executeInsert(cleanSql);
      } else if (upperSql.startsWith("UPDATE")) {
        return this.executeUpdate(cleanSql);
      } else if (upperSql.startsWith("DELETE")) {
        return this.executeDelete(cleanSql);
      } else if (upperSql.startsWith("CREATE") || upperSql.startsWith("DROP") || upperSql.startsWith("ALTER")) {
        return {
          success: true,
          message: "DDL文の文法は正しいです！(学習シミュレータのため、スキーマ構造の永続変更は行われません)",
          columns: ["Status"],
          rows: [["Success / 構文確認OK"]]
        };
      } else {
        throw new Error("サポートされていないか、文法エラーのあるSQL文です。SELECT / INSERT / UPDATE / DELETE で始めてください。");
      }
    } catch (err) {
      return {
        success: false,
        error: err.message
      };
    }
  }

  executeSelect(sql) {
    const selectRegex = /^SELECT\s+(DISTINCT\s+)?([\w\s\*,\(\)\.\'\"]+)\s+FROM\s+(\w+)(?:\s+JOIN\s+(\w+)\s+ON\s+([\w\.]+)\s*=\s*([\w\.]+))?(?:\s+WHERE\s+(.+?))?(?:\s+GROUP\s+BY\s+([\w\.]+))?(?:\s+HAVING\s+(.+?))?(?:\s+ORDER\s+BY\s+([\w\.]+)(?:\s+(ASC|DESC))?)?(?:\s+LIMIT\s+(\d+)(?:\s*,\s*(\d+))?)?$/i;
    const match = sql.match(selectRegex);

    if (!match) {
      if (!sql.toUpperCase().includes("FROM")) {
        throw new Error("SELECT文に FROM 句がありません。");
      }
      throw new Error("SQLの構文エラーです。キーワードのスペルやスペース、カンマの位置を確認してください。(例: SELECT * FROM students_mst)");
    }

    const isDistinct = !!match[1];
    const fieldsStr = match[2].trim();
    const mainTable = match[3].trim().toLowerCase();
    const joinTable = match[4] ? match[4].trim().toLowerCase() : null;
    const joinLeft = match[5] ? match[5].trim() : null;
    const joinRight = match[6] ? match[6].trim() : null;
    const whereClause = match[7] ? match[7].trim() : null;
    const groupByClause = match[8] ? match[8].trim() : null;
    const havingClause = match[9] ? match[9].trim() : null;
    const orderByClause = match[10] ? match[10].trim() : null;
    const orderDir = match[11] ? match[11].trim().toUpperCase() : "ASC";
    const limitOffsetOrCount = match[12] ? parseInt(match[12], 10) : null;
    const limitCount = match[13] ? parseInt(match[13], 10) : null;

    if (!this.db[mainTable]) {
      throw new Error(`テーブル '${mainTable}' はデータベースに存在しません。`);
    }

    let rows = JSON.parse(JSON.stringify(this.db[mainTable]));

    if (joinTable) {
      if (!this.db[joinTable]) {
        throw new Error(`結合対象テーブル '${joinTable}' は存在しません。`);
      }
      const secondaryRows = JSON.parse(JSON.stringify(this.db[joinTable]));
      const joinedResult = [];

      const leftKey = joinLeft.includes('.') ? joinLeft.split('.')[1] : joinLeft;
      const rightKey = joinRight.includes('.') ? joinRight.split('.')[1] : joinRight;

      rows.forEach(r => {
        secondaryRows.forEach(sr => {
          if (r[leftKey] == sr[rightKey] || r[rightKey] == sr[leftKey] || r[leftKey] === sr[leftKey]) {
            const combined = {};
            Object.keys(r).forEach(k => {
              combined[`${mainTable}.${k}`] = r[k];
              combined[k] = r[k];
            });
            Object.keys(sr).forEach(k => {
              combined[`${joinTable}.${k}`] = sr[k];
              if (combined[k] === undefined) {
                combined[k] = sr[k];
              }
            });
            joinedResult.push(combined);
          }
        });
      });
      rows = joinedResult;
    } else {
      rows = rows.map(r => {
        const Namespaced = {};
        Object.keys(r).forEach(k => {
          Namespaced[`${mainTable}.${k}`] = r[k];
          Namespaced[k] = r[k];
        });
        return Namespaced;
      });
    }

    if (whereClause) {
      rows = rows.filter(row => this.evalWhere(row, whereClause));
    }

    let isAggregated = false;
    const aggMatches = fieldsStr.match(/(COUNT|SUM|AVG|MAX|MIN)\(([\w\.\*]+)\)/gi);
    if (aggMatches || groupByClause) {
      isAggregated = true;
      rows = this.handleAggregation(rows, fieldsStr, groupByClause, havingClause);
    }

    let columns = [];
    let finalRows = [];

    if (!isAggregated) {
      if (fieldsStr === "*") {
        if (joinTable) {
          columns = Object.keys(rows[0] || {}).filter(k => k.includes('.'));
        } else {
          columns = Object.keys(this.db[mainTable][0] || {});
        }
      } else {
        columns = fieldsStr.split(',').map(f => f.trim());
      }

      finalRows = rows.map(row => {
        return columns.map(col => {
          if (row[col] !== undefined) return row[col];
          const cleanCol = col.replace(/[\'\`\"\s]/g, '');
          if (row[cleanCol] !== undefined) return row[cleanCol];
          const matchingKey = Object.keys(row).find(k => k.endsWith(`.${cleanCol}`));
          if (matchingKey) return row[matchingKey];
          return null;
        });
      });

      if (isDistinct) {
        const seen = new Set();
        finalRows = finalRows.filter(r => {
          const key = JSON.stringify(r);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }
    } else {
      columns = rows.columns;
      finalRows = rows.rows;
    }

    if (orderByClause && !isAggregated) {
      const orderCol = orderByClause.trim();
      finalRows.sort((a, b) => {
        const colIdx = columns.indexOf(orderCol);
        let valA = colIdx !== -1 ? a[colIdx] : a;
        let valB = colIdx !== -1 ? b[colIdx] : b;

        const numA = Number(valA);
        const numB = Number(valB);
        if (!isNaN(numA) && !isNaN(numB)) {
          return orderDir === "ASC" ? numA - numB : numB - numA;
        }
        valA = String(valA || '');
        valB = String(valB || '');
        return orderDir === "ASC" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }

    if (limitOffsetOrCount !== null) {
      let offset = 0;
      let count = limitOffsetOrCount;
      if (limitCount !== null) {
        offset = limitOffsetOrCount;
        count = limitCount;
      }
      finalRows = finalRows.slice(offset, offset + count);
    }

    columns = columns.map(c => c.replace(/[\`\'\"]/g, ''));

    return {
      success: true,
      columns,
      rows: finalRows
    };
  }

  evalWhere(row, clause) {
    let cleanClause = clause.replace(/\s+AND\s+/gi, " && ").replace(/\s+OR\s+/gi, " || ");

    const evaluateCondition = (cond) => {
      cond = cond.trim();
      if (!cond) return true;

      if (/IS\s+NOT\s+NULL$/i.test(cond)) {
        const fieldName = cond.replace(/\s+IS\s+NOT\s+NULL$/i, '').trim().replace(/[\`\'\"]/g, '');
        return this.getFieldValue(row, fieldName) !== null && this.getFieldValue(row, fieldName) !== undefined;
      }
      if (/IS\s+NULL$/i.test(cond)) {
        const fieldName = cond.replace(/\s+IS\s+NULL$/i, '').trim().replace(/[\`\'\"]/g, '');
        const val = this.getFieldValue(row, fieldName);
        return val === null || val === undefined;
      }

      if (/\s+LIKE\s+/i.test(cond)) {
        const parts = cond.split(/\s+LIKE\s+/i);
        const fieldName = parts[0].trim().replace(/[\`\'\"]/g, '');
        let pattern = parts[1].trim().replace(/^[\'\"]|[\'\"]$/g, '');
        pattern = pattern.replace(/%/g, '.*').replace(/_/g, '.');
        const regex = new RegExp(`^${pattern}$`, 'i');
        const val = String(this.getFieldValue(row, fieldName) || '');
        return regex.test(val);
      }

      if (/\s+BETWEEN\s+/i.test(cond)) {
        const parts = cond.split(/\s+BETWEEN\s+/i);
        const fieldName = parts[0].trim().replace(/[\`\'\"]/g, '');
        const rangeParts = parts[1].split(/\s+AND\s+/i);
        const minVal = parseFloat(rangeParts[0].trim().replace(/[\'\"]/g, ''));
        const maxVal = parseFloat(rangeParts[1].trim().replace(/[\'\"]/g, ''));
        const val = parseFloat(this.getFieldValue(row, fieldName));
        return val >= minVal && val <= maxVal;
      }

      if (/\s+IN\s*\(/i.test(cond)) {
        const parts = cond.split(/\s+IN\s*\(/i);
        const fieldName = parts[0].trim().replace(/[\`\'\"]/g, '');
        const valuesList = parts[1].replace(/\)$/, '').split(',').map(v => v.trim().replace(/^[\'\"]|[\'\"]$/g, ''));
        const val = String(this.getFieldValue(row, fieldName));
        return valuesList.includes(val);
      }

      const compRegex = /([\w\.]+)\s*(=|!=|<>|>=|<=|>|<)\s*(.+)/i;
      const compMatch = cond.match(compRegex);
      if (compMatch) {
        const fieldName = compMatch[1].trim().replace(/[\`\'\"]/g, '');
        const op = compMatch[2].trim();
        let targetVal = compMatch[3].trim().replace(/^[\'\"]|[\'\"]$/g, '');

        const rowVal = this.getFieldValue(row, fieldName);

        const numRow = parseFloat(rowVal);
        const numTarget = parseFloat(targetVal);
        const isNumComparison = !isNaN(numRow) && !isNaN(numTarget);

        const a = isNumComparison ? numRow : String(rowVal || '').toLowerCase();
        const b = isNumComparison ? numTarget : String(targetVal).toLowerCase();

        switch (op) {
          case "=": return a == b;
          case "!=":
          case "<>": return a != b;
          case ">": return a > b;
          case "<": return a < b;
          case ">=": return a >= b;
          case "<=": return a <= b;
        }
      }

      return true;
    };

    if (cleanClause.includes(" || ")) {
      const orParts = cleanClause.split(" || ");
      return orParts.some(part => this.evalWhere(row, part));
    }
    if (cleanClause.includes(" && ")) {
      const andParts = cleanClause.split(" && ");
      return andParts.every(part => evaluateCondition(part));
    }

    return evaluateCondition(cleanClause);
  }

  getFieldValue(row, name) {
    if (row[name] !== undefined) return row[name];
    if (name.includes('.')) {
      const parts = name.split('.');
      const cleanKey = parts[1];
      if (row[cleanKey] !== undefined) return row[cleanKey];
    }
    const match = Object.keys(row).find(k => k.endsWith(`.${name}`));
    if (match) return row[match];
    return null;
  }

  handleAggregation(rows, fieldsStr, groupByField, havingClause) {
    const selectItems = fieldsStr.split(',').map(f => f.trim());
    const aggregations = [];
    const plainFields = [];

    selectItems.forEach(item => {
      const aggMatch = item.match(/(COUNT|SUM|AVG|MAX|MIN)\(([\w\.\*]+)\)/i);
      if (aggMatch) {
        aggregations.push({
          alias: item,
          func: aggMatch[1].toUpperCase(),
          field: aggMatch[2].replace(/[\`\'\"]/g, '')
        });
      } else {
        plainFields.push(item.replace(/[\`\'\"]/g, ''));
      }
    });

    const groups = {};
    const groupKeyName = groupByField ? groupByField.replace(/[\`\'\"]/g, '') : "all";

    rows.forEach(row => {
      const groupVal = groupByField ? String(this.getFieldValue(row, groupKeyName)) : "all";
      if (!groups[groupVal]) {
        groups[groupVal] = [];
      }
      groups[groupVal].push(row);
    });

    const resultColumns = selectItems.map(item => item.replace(/[\`\'\"]/g, ''));
    const resultRows = [];

    Object.keys(groups).forEach(key => {
      const groupRows = groups[key];
      const resultRow = [];

      selectItems.forEach(item => {
        const cleanItem = item.replace(/[\`\'\"]/g, '');
        const agg = aggregations.find(a => a.alias === item);
        if (agg) {
          const values = groupRows.map(r => {
            if (agg.field === "*") return 1;
            return parseFloat(this.getFieldValue(r, agg.field));
          }).filter(v => !isNaN(v) || agg.field === "*");

          let result = 0;
          switch (agg.func) {
            case "COUNT":
              result = agg.field === "*" ? groupRows.length : values.length;
              break;
            case "SUM":
              result = values.reduce((sum, v) => sum + v, 0);
              break;
            case "AVG":
              result = values.length ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(1) : 0;
              break;
            case "MAX":
              result = values.length ? Math.max(...values) : null;
              break;
            case "MIN":
              result = values.length ? Math.min(...values) : null;
              break;
          }
          resultRow.push(result);
        } else {
          const fieldVal = groupRows.length ? this.getFieldValue(groupRows[0], cleanItem) : null;
          resultRow.push(fieldVal);
        }
      });

      resultRows.push(resultRow);
    });

    let filteredResultRows = resultRows;
    if (havingClause) {
      filteredResultRows = resultRows.filter(row => {
        const compRegex = /([\w\.\(\)\*]+)\s*(=|!=|<>|>=|<=|>|<)\s*(.+)/i;
        const compMatch = havingClause.match(compRegex);
        if (compMatch) {
          const aggExpr = compMatch[1].trim();
          const op = compMatch[2].trim();
          const target = parseFloat(compMatch[3].trim());

          const colIdx = resultColumns.findIndex(c => c.toLowerCase() === aggExpr.toLowerCase());
          if (colIdx !== -1) {
            const val = parseFloat(row[colIdx]);
            switch (op) {
              case "=": return val == target;
              case ">": return val > target;
              case "<": return val < target;
              case ">=": return val >= target;
              case "<=": return val <= target;
              case "!=":
              case "<>": return val != target;
            }
          }
        }
        return true;
      });
    }

    return {
      columns: resultColumns,
      rows: filteredResultRows
    };
  }

  executeInsert(sql) {
    const insertRegex = /^INSERT\s+INTO\s+(\w+)\s*\(([\w\s,]+)\)\s*VALUES\s*\(([\w\s\',\.@\-\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]+)\)$/i;
    const match = sql.match(insertRegex);

    if (!match) {
      throw new Error("INSERT文の構文エラーです。(例: INSERT INTO students_mst (student_id, student_name, gender) VALUES (31, '名前', '0'))");
    }

    const tableName = match[1].trim().toLowerCase();
    const columns = match[2].split(',').map(c => c.trim().toLowerCase());
    const values = match[3].split(',').map(v => v.trim().replace(/^[\'\"]|[\'\"]$/g, ''));

    if (!this.db[tableName]) {
      throw new Error(`テーブル '${tableName}' は存在しません。`);
    }

    if (columns.length !== values.length) {
      throw new Error("列の数と值の数が一致しません。");
    }

    const newRow = {};
    columns.forEach((col, idx) => {
      let val = values[idx];
      const numVal = parseFloat(val);
      if (!isNaN(numVal) && String(numVal) === val) {
        newRow[col] = numVal;
      } else {
        newRow[col] = val === "NULL" || val === "null" ? null : val;
      }
    });

    // Dynamically find the primary key field for this table
    const schemaMeta = DB_SCHEMA[tableName];
    const pkCol = schemaMeta ? (schemaMeta.columns.find(c => c.primary) || {}).name : null;
    if (pkCol && newRow[pkCol] !== undefined && this.db[tableName].some(r => r[pkCol] == newRow[pkCol])) {
      throw new Error(`一意制約エラー: ${pkCol} = ${newRow[pkCol]} は既に存在します。`);
    }

    this.db[tableName].push(newRow);

    return {
      success: true,
      message: `テーブル '${tableName}' に1行挿入されました。`,
      columns: Object.keys(newRow),
      rows: [Object.values(newRow)]
    };
  }

  executeUpdate(sql) {
    const updateRegex = /^UPDATE\s+(\w+)\s+SET\s+([\w\s=\',\.\-\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF]+)\s+WHERE\s+(.+)$/i;
    const match = sql.match(updateRegex);

    if (!match) {
      throw new Error("UPDATE文の構文エラーです。(例: UPDATE students_mst SET age = 21 WHERE student_id = 1)");
    }

    const tableName = match[1].trim().toLowerCase();
    const setClause = match[2].trim();
    const whereClause = match[3].trim();

    if (!this.db[tableName]) {
      throw new Error(`テーブル '${tableName}' は存在しません。`);
    }

    const assignments = {};
    setClause.split(',').forEach(part => {
      const sides = part.split('=');
      if (sides.length === 2) {
        const col = sides[0].trim().toLowerCase();
        let val = sides[1].trim().replace(/^[\'\"]|[\'\"]$/g, '');
        const numVal = parseFloat(val);
        if (!isNaN(numVal) && String(numVal) === val) {
          assignments[col] = numVal;
        } else {
          assignments[col] = val === "NULL" || val === "null" ? null : val;
        }
      }
    });

    let updatedCount = 0;
    this.db[tableName] = this.db[tableName].map(row => {
      const tempNamespaced = {};
      Object.keys(row).forEach(k => { tempNamespaced[`${tableName}.${k}`] = row[k]; tempNamespaced[k] = row[k]; });

      if (this.evalWhere(tempNamespaced, whereClause)) {
        updatedCount++;
        return { ...row, ...assignments };
      }
      return row;
    });

    return {
      success: true,
      message: `${updatedCount} 行が更新されました。`,
      columns: ["Updated Count"],
      rows: [[updatedCount]]
    };
  }

  executeDelete(sql) {
    const deleteRegex = /^DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i;
    const match = sql.match(deleteRegex);

    if (!match) {
      throw new Error("DELETE文の構文エラーです。(例: DELETE FROM students_mst WHERE student_id = 1)");
    }

    const tableName = match[1].trim().toLowerCase();
    const whereClause = match[2] ? match[2].trim() : null;

    if (!this.db[tableName]) {
      throw new Error(`テーブル '${tableName}' は存在しません。`);
    }

    let deletedCount = 0;
    if (whereClause) {
      const initialCount = this.db[tableName].length;
      this.db[tableName] = this.db[tableName].filter(row => {
        const tempNamespaced = {};
        Object.keys(row).forEach(k => { tempNamespaced[`${tableName}.${k}`] = row[k]; tempNamespaced[k] = row[k]; });
        const shouldKeep = !this.evalWhere(tempNamespaced, whereClause);
        if (!shouldKeep) deletedCount++;
        return shouldKeep;
      });
    } else {
      deletedCount = this.db[tableName].length;
      this.db[tableName] = [];
    }

    return {
      success: true,
      message: `${deletedCount} 行が削除されました。`,
      columns: ["Deleted Count"],
      rows: [[deletedCount]]
    };
  }
}
