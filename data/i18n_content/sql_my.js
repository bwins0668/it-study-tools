(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sql:1"] = window.CONTENT_I18N["sql:1"] || {};
  window.CONTENT_I18N["sql:1"].my = {
    title: "01-SQL နှင့် Database များဆိုသည်မှာ အဘယ်နည်း။",
    concept: "Database (DB) ဆိုသည်မှာ စနစ်တကျ စုစည်းထားသော အချက်အလက်များ (data) ဖြစ်သည်။\n\nစနစ်အများစုတွင် အချက်အလက်များကို **Relational Database (RDB)** ကို အသုံးပြု၍ ဇယားများ (tables) အဖြစ် စီမံခန့်ခွဲသည်။\n\n**SQL** သည် database ကို အမိန့်ပေးရန် အသုံးပြုသည့် သီးသန့်ဘာသာစကား ဖြစ်သည် — database အား \"data များ ရှာဖွေထုတ်ယူရန်\"၊ \"data များ ထည့်သွင်းရန်\" စသည်ဖြင့် ညွှန်ကြားသည်။\n\nယခုသင်ခန်းစာတွင် ကျောင်း၏ ကျောင်းသားပင်မဇယား (student master table) မှ data များကို ရှာဖွေထုတ်ယူခြင်းဖြင့် အခြေခံအကျဆုံး data ရှာဖွေထုတ်ယူသည့် command ကို လေ့လာရပါမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:1:en"
  };

  window.CONTENT_I18N["sql:2"] = window.CONTENT_I18N["sql:2"] || {};
  window.CONTENT_I18N["sql:2"].my = {
    title: "02-ဇယားတည်ဆောက်ပုံ၊ Data Type များနှင့် Primary Key",
    concept: "ဇယား (table) တစ်ခုတွင် ကော်လံများ (columns) နှင့် အတန်းများ (rows) ပါဝင်သည်။\n\nကော်လံတစ်ခုစီတွင် **data type** တစ်ခု (ဥပမာ- ကိန်းဂဏန်း၊ စာသား သို့မဟုတ် ရက်စွဲ) သတ်မှတ်ထားပြီး ၎င်းအမျိုးအစားနှင့် မကိုက်ညီသော data များကို ထည့်သွင်း၍မရပါ။\n\nထို့အပြင် အတန်းတစ်ခုစီကို သီးခြားခွဲခြားဖော်ပြရန်အတွက် ဇယားတစ်ခုတွင် **primary key (Primary Key)** ကို ထူးခြားသော သတ်မှတ်ချက်အဖြစ် ထားရှိသည်။\n\nသင့်ကျောင်း၏ database တွင် `department_id` သည် `departments_mst` ဇယားအတွက် primary key အဖြစ် ဆောင်ရွက်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:2:en"
  };

  window.CONTENT_I18N["sql:3"] = window.CONTENT_I18N["sql:3"] || {};
  window.CONTENT_I18N["sql:3"].my = {
    title: "03-အခြေခံ SELECT Syntax",
    concept: "Data ရှာဖွေထုတ်ယူရန် အခြေခံအကျဆုံးနည်းလမ်းမှာ `SELECT column_name FROM table_name;` ပုံစံကို အသုံးပြုခြင်းဖြစ်သည်။\n\nအကယ်၍ ကော်လံအားလုံးကို ထုတ်ယူလိုပါက ကော်လံအမည်များအစား `*` (asterisk) ကို သတ်မှတ်ပေးပါ။\n\nသီးခြားကော်လံအချို့ကိုသာ လိုအပ်ပါက ၎င်းတို့၏အမည်များကို ကော်မာ (comma) ခြား၍ ရေးသားပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:3:en"
  };

  window.CONTENT_I18N["sql:4"] = window.CONTENT_I18N["sql:4"] || {};
  window.CONTENT_I18N["sql:4"].my = {
    title: "04-WHERE Clause ဖြင့် အတန်းများကို စစ်ထုတ်ခြင်း",
    concept: "ဒေတာများကို စစ်ထုတ်ပြီး သင်လိုအပ်သော အတန်းများကိုသာ ရယူရန် **WHERE** clause ကို အသုံးပြုပါ။\n\n၎င်းကို ရေးသားပုံမှာ- `SELECT column_name FROM table_name WHERE condition;` ဖြစ်သည်။\n\nဥပမာအားဖြင့်၊ ကျောင်းသူများ (လိင်အမျိုးအစားမှာ '1' ဖြစ်သောသူများ) ကိုသာ ရှာဖွေရန် အောက်ပါအတိုင်း ရေးသားနိုင်သည်-\n\n```sql\nSELECT * FROM students_mst WHERE gender = '1';\n```\n\nစာသားကို သတ်မှတ်သည့်အခါ single quote `'` အတွင်း ထည့်သွင်းရပါမည်။ သတ်မှတ်ချက်သည် ကော်လံများရှိ တန်ဖိုးများနှင့် ညီမျှခြင်း၊ ပိုကြီးခြင်း သို့မဟုတ် ပိုငယ်ခြင်း ရှိမရှိကို စစ်ဆေးပေးနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:4:en"
  };

  window.CONTENT_I18N["sql:5"] = window.CONTENT_I18N["sql:5"] || {};
  window.CONTENT_I18N["sql:5"].my = {
    title: "05-AND ဖြင့် သတ်မှတ်ချက်များကို ပေါင်းစပ်ခြင်း",
    concept: "**သတ်မှတ်ချက်အားလုံး တစ်ပြိုင်နက် ကိုက်ညီရန်** လိုအပ်သည့်အခါ **AND** ကို အသုံးပြုပါ။\n\nဥပမာအားဖြင့်၊ department 1 ရှိ အသက် ၂၄ နှစ်ရှိသော ကျောင်းသားကို ရှာဖွေရန်-\n\n```sql\nSELECT * FROM students_mst\nWHERE age = 24 AND department_id = 1;\n```\n\nအသက်သတ်မှတ်ချက်ရော department သတ်မှတ်ချက်ပါ နှစ်ခုလုံး ကိုက်ညီရပါမည်။ တစ်ခုခု မကိုက်ညီပါက ၎င်းအတန်းကို ရလဒ်မှ ဖယ်ထုတ်ပါမည်။\n\n**AND** သည် သင်၏ရှာဖွေမှုကို ကျဉ်းမြောင်းစေသည် — သတ်မှတ်ချက်များ ပိုမိုထည့်သွင်းလေ၊ ရလဒ်များ ပိုမိုနည်းပါးလေ ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:5:en"
  };

  window.CONTENT_I18N["sql:6"] = window.CONTENT_I18N["sql:6"] || {};
  window.CONTENT_I18N["sql:6"].my = {
    title: "06-OR ဖြင့် သတ်မှတ်ချက်များကို ပေါင်းစပ်ခြင်း",
    concept: "**သတ်မှတ်ချက်များအနက် အနည်းဆုံး တစ်ခုကိုက်ညီရန်** လိုအပ်သည့်အခါ **OR** ကို အသုံးပြုပါ။\n\nဥပမာအားဖြင့်၊ department 1 သို့မဟုတ် department 2 ရှိ ကျောင်းသားများကို ရှာဖွေရန်-\n\n```sql\nSELECT * FROM students_mst\nWHERE department_id = 1 OR department_id = 2;\n```\n\nOR တွင် အနည်းဆုံး သတ်မှတ်ချက်တစ်ခု ကိုက်ညီပါက ၎င်းအတန်းကို ထည့်သွင်းပါမည်။\n\nရှာဖွေမှုကို ကျဉ်းမြောင်းစေသော AND နှင့်မတူဘဲ **OR သည် ရှာဖွေမှုကို ပိုမိုကျယ်ပြန့်စေသည်**။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:6:en"
  };

  window.CONTENT_I18N["sql:7"] = window.CONTENT_I18N["sql:7"] || {};
  window.CONTENT_I18N["sql:7"].my = {
    title: "07-AND နှင့် OR သတ်မှတ်ချက်များကို ပေါင်းစပ်ခြင်း",
    concept: "**AND** နှင့် **OR** ကို WHERE clause တစ်ခုတည်းတွင် ပေါင်းစပ်အသုံးပြုနိုင်သည်။\n\nသို့သော် AND နှင့် OR တွင် လုပ်ဆောင်ပုံ ဦးစားပေးမှု ကွာခြားသည် — သင်္ချာတွင် အပေါင်းထက် အမြှောက်ကို ဦးစွာ တွက်ချက်သကဲ့သို့ **AND ကို OR ထက် ဦးစွာ လုပ်ဆောင်သည်**။\n\nလုပ်ဆောင်မည့် အစီအစဉ်ကို ထိန်းချုပ်ရန် လက်သည်းကွင်း `()` ကို အသုံးပြုပါ-\n\n```sql\nSELECT * FROM students_mst\nWHERE (age = 20 OR age = 24) AND gender = '0';\n```\n\n၎င်းသည် အသက် ၂၀ သို့မဟုတ် ၂၄ နှစ်ရှိသော ကျောင်းသား (ကျောင်းသားများကိုသာ) ရှာဖွေပေးသည်။ လက်သည်းကွင်း မပါပါက AND ကို ဦးစွာ လုပ်ဆောင်မည်ဖြစ်သဖြင့် ရလဒ် ကွဲပြားသွားပါမည်။\n\nသင်၏ query logic ရှင်းလင်းမှန်ကန်စေရန် အမြဲတမ်း လက်သည်းကွင်းကို အသုံးပြုပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:7:en"
  };

  window.CONTENT_I18N["sql:8"] = window.CONTENT_I18N["sql:8"] || {};
  window.CONTENT_I18N["sql:8"].my = {
    title: "08-နှိုင်းယှဉ်မှု Operator များကို အသုံးပြုခြင်း",
    concept: "ညီမျှခြင်း (`=`) အပြင် ပိုမိုပြောင်းလွယ်ပြင်လွယ်ရှိသော သတ်မှတ်ချက်များအတွက် SQL တွင် **နှိုင်းယှဉ်မှု operator များ** ကို ထောက်ပံ့ပေးထားသည်-\n\n- `=` : ညီမျှသည်\n- `<>` သို့မဟုတ် `!=` : မညီမျှပါ\n- `>` : ပိုကြီးသည်\n- `<` : ပိုငယ်သည်\n- `>=` : ပိုကြီး သို့မဟုတ် ညီမျှသည်\n- `<=` : ပိုငယ် သို့မဟုတ် ညီမျှသည်\n\nဥပမာအားဖြင့်၊ စာမေးပွဲရမှတ် ၉၀ နှင့်အထက် ရရှိသော ကျောင်းသားများကို ရှာဖွေရန်-\n\n```sql\nSELECT * FROM students_mst WHERE test_score >= 90;\n```\n\nဤ operator များသည် ကိန်းဂဏန်းများ၊ ရက်စွဲများနှင့် အချို့သောစာသားများတွင် လုပ်ဆောင်နိုင်သည်။\n\nသတိပြုရန်- `>= 90` တွင် ၉၀ ပါဝင်ပြီး `> 90` တွင် ၉၀ မပါဝင်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:8:en"
  };

  window.CONTENT_I18N["sql:9"] = window.CONTENT_I18N["sql:9"] || {};
  window.CONTENT_I18N["sql:9"].my = {
    title: "09-IS NULL နှင့် IS NOT NULL ဖြင့် NULL ကို စစ်ဆေးခြင်း",
    concept: "ကော်လံတစ်ခုတွင် မည်သည့်ဒေတာမျှ ထည့်သွင်းမထားသောအခါ ၎င်း၏တန်ဖိုးသည် **NULL** ဖြစ်သည်။ NULL သည် သုည (0) မဟုတ်ပါ၊ အလွတ်စာသား မဟုတ်ပါ — \"မည်သည့်တန်ဖိုးမျှ မရှိခြင်း\" ဟု အဓိပ္ပာယ်ရသည်။\n\nNULL ကို စစ်ဆေးရန် `= NULL` သို့မဟုတ် `<> NULL` ကို **အသုံးပြု၍မရပါ**။ အစား သီးသန့် operator များကို အသုံးပြုရပါမည်-\n\n```sql\n-- delete_at တန်ဖိုး NULL ဖြစ်သော (မဖျက်ရသေးသော) ကျောင်းသားများကို ရှာဖွေရန်\nSELECT * FROM students_mst WHERE delete_at IS NULL;\n\n-- delete_at တန်ဖိုး NULL မဟုတ်သော (ဖျက်ပြီးသား) ကျောင်းသားများကို ရှာဖွေရန်\nSELECT * FROM students_mst WHERE delete_at IS NOT NULL;\n```\n\n**IS NULL** သည် ပျောက်ဆုံးနေသော ดေတာများကို စစ်ဆေးသည်။ **IS NOT NULL** သည် ရှိပြီးသား ဒေတာများကို စစ်ဆေးသည်။\n\n၎င်းကို အိတ်တစ်လုံး ရှိမရှိ စစ်ဆေးခြင်း (IS NOT NULL) နှင့် အိတ်အတွင်း၌ ဘာမျှမရှိခြင်းကို စစ်ဆေးခြင်း (ခြားနားသော သဘောတရား) ကဲ့သို့ နှိုင်းယှဉ်စဉ်းစားနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:9:en"
  };

  window.CONTENT_I18N["sql:10"] = window.CONTENT_I18N["sql:10"] || {};
  window.CONTENT_I18N["sql:10"].my = {
    title: "10-LIKE ဖြင့် စာသားများ ရှာဖွေခြင်း",
    concept: "အချက်အလက်ကို အတိအကျတိုက်ဆိုင်မှုထက် **ပုံစံ (pattern)** အလိုက် ရှာဖွေလိုသောအခါ **LIKE** ကို **wildcard character များ** နှင့် တွဲဖက်အသုံးပြုပါ-\n\n- `%` : မည်သည့်စာသားမဆို ကိုက်ညီသည် (လုံးဝမရှိခြင်း သို့မဟုတ် အများအပြား)\n- `_` : စာလုံးတစ်လုံးတည်းနှင့်သာ ကိုက်ညီသည်\n\nဥပမာအားဖြင့်၊ ကာနအမည် (kana name) \"Yama\" ဖြင့် စတင်သော ကျောင်းသားများကို ရှာဖွေရန်-\n\n```sql\nSELECT * FROM students_mst\nWHERE student_name_kana LIKE 'Yama%';\n```\n\n၎င်းသည် 'Yamada', 'Yamamoto', 'Yamashita' စသည့် 'Yama' ဖြင့် စတင်သည့် မည်သည့်အရာကိုမဆို ရှာဖွေပေးသည်။\n\nအကယ်၍ `_ama%` ဟု အသုံးပြုပါက ဒုတိယစာလုံးမှာ 'a'၊ တတိယမှာ 'm'၊ စတုတ္ถမှာ 'a' ဖြစ်ပြီး ၎င်းနောက်တွင် မည်သည့်စာသားမဆို ပါရှိသော အမည်များနှင့် ကိုက်ညီမည်ဖြစ်သည်။\n\nMySQL တွင် LIKE သည် ပုံမှန်အားဖြင့် စာလုံးအကြီးအသေး ခွဲခြားမှုမရှိပါ (case-insensitive)။ သို့သော် အခြား database စနစ်များတွင် ကွဲပြားနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:10:en"
  };

  window.CONTENT_I18N["sql:11"] = window.CONTENT_I18N["sql:11"] || {};
  window.CONTENT_I18N["sql:11"].my = {
    title: "11-BETWEEN ဖြင့် အတိုင်းအတာအတွင်း စစ်ထုတ်ခြင်း",
    concept: "**သတ်မှတ်ထားသော အတိုင်းအတာအတွင်း** ရှိသော တန်ဖိုးများကို ရှာဖွေရန် **BETWEEN** ကို အသုံးပြုပါ။\n\nဥပမာအားဖြင့်၊ အသက် ၂၀ မှ ၂၅ နှစ်ကြားရှိ ကျောင်းသားများကို ရှာဖွေရန်-\n\n```sql\nSELECT * FROM students_mst WHERE age BETWEEN 20 AND 25;\n```\n\nBETWEEN သည် **နှစ်ဖက်လုံးအကျုံးဝင်သည် (inclusive)** — စတင်တန်ဖိုးနှင့် အဆုံးတန်ဖိုး နှစ်ခုလုံး ပါဝင်သည်။ ထို့ကြောင့် `BETWEEN 20 AND 25` တွင် အသက် ၂၀၊ ၂၁၊ ၂၂၊ ၂၃၊ ၂၄ နှင့် ၂၅ တို့ ပါဝင်သည်။\n\nBETWEEN ကို ကိန်းဂဏန်းများ၊ ရက်စွဲများနှင့် စာသားများတွင် အသုံးပြုနိုင်သည်။ ၎င်းသည် `>=` နှင့် `<=` တို့ကို အသုံးပြုခြင်းထက် range queries များကို ပိုမိုရှင်းလင်းစေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:11:en"
  };

  window.CONTENT_I18N["sql:12"] = window.CONTENT_I18N["sql:12"] || {};
  window.CONTENT_I18N["sql:12"].my = {
    title: "12-IN ဖြင့် တန်ဖိုးအများအပြား တိုက်ဆိုင်စစ်ဆေးခြင်း",
    concept: "တန်ဖိုးတစ်ခုသည် **သတ်မှတ်ထားသော တန်ဖိုးအများအပြားအနက် တစ်ခုခုနှင့် ကိုက်ညီမှု ရှိမရှိ** စစ်ဆေးလိုလျှင် **IN** ကို အသုံးပြုပါ။\n\nဥပမာအားဖြင့်၊ အသက် ၂၀၊ ၂၅ သို့မဟုတ် ၃၀ ရှိသော ကျောင်းသားများကို ရှာဖွေရန်-\n\n```sql\nSELECT * FROM students_mst WHERE age IN (20, 25, 30);\n```\n\n၎င်းသည် အောက်ပါအတိုင်း ရေးသားခြင်းထက် များစွာ တိုတောင်းပါသည်-\n```sql\nWHERE age = 20 OR age = 25 OR age = 30\n```\n\nIN ကို ကိန်းဂဏန်းများနှင့် စာသားများတွင် အသုံးပြုနိုင်သည်။ IN ကို subquery (အခြား query တစ်ခုအတွင်း ထည့်သွင်းထားသော query) နှင့်လည်း တွဲဖက်အသုံးပြုနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:12:en"
  };

  window.CONTENT_I18N["sql:13"] = window.CONTENT_I18N["sql:13"] || {};
  window.CONTENT_I18N["sql:13"].my = {
    title: "13-ORDER BY ဖြင့် စီခြင်း",
    concept: "Query ရလဒ်များကို သတ်မှတ်ထားသော အစီအစဉ်အတိုင်း ပြသရန် **ORDER BY** ကို အသုံးပြုပါ။\n\nပုံမှန်အားဖြင့် **ငယ်စဉ်ကြီးလိုက်** (အသေးဆုံးမှ အကြီးဆုံး、A မှ Z) စီပေးသည်။ ပြောင်းပြန်စီလိုပါက **DESC** (ကြီးစဉ်ငယ်လိုက်) ကို ထည့်သွင်းပေးပါ-\n\n```sql\n-- အသက် ငယ်ရာမှ ကြီးရာသို့ စီရန် (ငယ်စဉ်ကြီးလိုက်)\nSELECT * FROM students_mst ORDER BY age;\n\n-- အသက် ကြီးရာမှ ငယ်ရာသို့ စီရန် (ကြီးစဉ်ငယ်လိုက်)\nSELECT * FROM students_mst ORDER BY age DESC;\n```\n\nကော်လံအများအပြားဖြင့်လည်း စီနိုင်ပါသည်-\n\n```sql\nSELECT * FROM students_mst ORDER BY department_id, age DESC;\n```\n\n၎င်းသည် ပထမဦးစွာ department အလိုက်စီပြီး၊ department တူပါက အသက်ကြီးစဉ်ငယ်လိုက် ထပ်မံစီပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:13:en"
  };

  window.CONTENT_I18N["sql:14"] = window.CONTENT_I18N["sql:14"] || {};
  window.CONTENT_I18N["sql:14"].my = {
    title: "14-LIMIT ဖြင့် ရလဒ်အတန်းအရေအတွက်ကို ကန့်သတ်ခြင်း",
    concept: "ရလဒ်၏ **ပထမဆုံး အတန်းအနည်းငယ်** ကိုသာ လိုချင်သောအခါ **LIMIT** ကို အသုံးပြုပါ။\n\nဥပသာအားဖြင့်၊ စာမေးပွဲရမှတ် အများဆုံးရရှိသူ ၃ ဦးကို ရှာဖွေရန်-\n\n```sql\nSELECT * FROM students_mst\nORDER BY test_score DESC\nLIMIT 3;\n```\n\nQuery သည် ပထမဦးစွာ ရမှတ်အများဆုံးမှ အနည်းဆုံးသို့ စီပြီးနောက် LIMIT က ပထမဆုံး ၃ တန်းကိုသာ ပြသပေးသည်။\n\nLIMIT ကို query ၏ နောက်ဆုံးတွင် (ORDER BY ၏ နောက်ကွယ်၌) ထားရှိရမည်။\n\n၎င်းသည် ဒေတာများကို နမူနာကြည့်လိုသည့်အခါ သို့မဟုတ် pagination (စာမျက်နှာခွဲခြင်း) ပြုလုပ်လိုသည့်အခါ အထူးအသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:14:en"
  };

  window.CONTENT_I18N["sql:15"] = window.CONTENT_I18N["sql:15"] || {};
  window.CONTENT_I18N["sql:15"].my = {
    title: "15-DISTINCT ဖြင့် ထပ်နေသောဒေတာများကို ဖယ်ထုတ်ခြင်း",
    concept: "ကော်လံတစ်ခုတွင် ထပ်နေသောတန်ဖိုးများ ပါဝင်နေပြီး **ထူးခြားသောတန်ဖိုးများကိုသာ သီးသန့်ကြည့်လိုလျှင်** SELECT ၏နောက်တွင် **DISTINCT** ကို ထည့်သွင်းပါ။\n\nဥပမာအားဖြင့်၊ ကျောင်းသားဇယားတွင် မည်သည့်အသက်အရွယ်များ ရှိသည်ကို ကြည့်ရန် (မထပ်ဘဲ)-\n\n```sql\nSELECT DISTINCT age FROM students_mst;\n```\n\nDISTINCT မပါပါက ကျောင်းသားတစ်ဦးစီအတွက် တူညီသောအသက်များကို ထပ်ခါတလဲလဲ ပြသနေမည်ဖြစ်သည်။\n\nDISTINCT သည် ရွေးချယ်ထားသော ကော်လံအားလုံးနှင့် သက်ဆိုင်သည်။ အကယ်၍ `SELECT DISTINCT age, name` ဟု ရေးသားပါက age နှင့် name ပေါင်းစပ်မှု မထပ်သော ရလဒ်များကို ပြသပေးမည်ဖြစ်သည်။\n\nDISTINCT သည် ဒေတာများအတွင်း မည်သည့်တန်ဖိုးများ အမှန်တကယ်ရှိသည်ကို ရှာဖွေဖော်ထုတ်ရာတွင် အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:15:en"
  };

  window.CONTENT_I18N["sql:16"] = window.CONTENT_I18N["sql:16"] || {};
  window.CONTENT_I18N["sql:16"].my = {
    title: "16-SQL String နှင့် Date Function များကို အသုံးပြုခြင်း",
    concept: "SQL တွင် ဒေတာများကို ပြောင်းလဲရန်၊ တွက်ချက်ရန် သို့မဟုတ် တစ်စိတ်တစ်ပိုင်း ထုတ်ယူရန် Built-in **function များ** စွာ ထောက်ပံ့ပေးထားသည်။\n\nအသုံးများသော string function များ-\n- `CHAR_LENGTH(str)` — စာသား၏ စာလုံးအရေအတွက်\n- `CONCAT(a, b)` — စာသားနှစ်ခုကို ပေါင်းစပ်ခြင်း\n- `UPPER(str)` / `LOWER(str)` — စာလုံးအကြီးအသေး ပြောင်းလဲခြင်း\n\nအသုံးများသော date function များ-\n- `CURRENT_DATE` — ယနေ့ရက်စွဲ\n- `YEAR(date)` / `MONTH(date)` — ရက်စွဲမှ နှစ် သို့မဟုတ် လ ကို ထုတ်ယူခြင်း\n\nဥပမာ-\n```sql\nSELECT student_name, CHAR_LENGTH(student_name) AS name_length\nFROM students_mst;\n```\n\nFunction များသည် မူရင်းဒေတာများကို ပြောင်းလဲခြင်းမရှိပါ — ပြသသောရလဒ်ကိုသာ ပြောင်းလဲပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:16:en"
  };

  window.CONTENT_I18N["sql:17"] = window.CONTENT_I18N["sql:17"] || {};
  window.CONTENT_I18N["sql:17"].my = {
    title: "17-CASE Expressions ဖြင့် သတ်မှတ်ချက်အလိုက် လုပ်ဆောင်ခြင်း",
    concept: "**CASE** သည် SQL query အတွင်း တိုက်ရိုက် **if-then-else logic** ကို ထည့်သွင်းနိုင်စေသည်။\n\nအခြေခံပုံစံ-\n```sql\nSELECT student_name, age,\n  CASE\n    WHEN age >= 20 THEN 'Adult'\n    ELSE 'Minor'\n  END AS age_group\nFROM students_mst;\n```\n\nCASE သည် WHEN သတ်မှတ်ချက်တစ်ခုစီကို အစီအစဉ်အလိုက် စစ်ဆေးသည်။ ပထမဆုံးကိုက်ညီသော သတ်မှတ်ချက်ကို လုပ်ဆောင်သည်။ ကိုက်ညီမှုမရှိပါက ELSE ကို လုပ်ဆောင်သည် (ELSE မပါပါက NULL ဖြစ်မည်)။\n\nCASE ကို သတ်မှတ်ချက်အများအပြားနှင့်လည်း အသုံးပြုနိုင်ပါသည်-\n```sql\nCASE\n  WHEN score >= 80 THEN 'Excellent'\n  WHEN score >= 60 THEN 'Good'\n  ELSE 'Needs Improvement'\nEND\n```\n\nCASE ကို အတန်းတစ်ခုစီအတွက် တွက်ချက်ပေးသဖြင့် တွက်ချက်မှုဆိုင်ရာ ကော်လံများ ဖန်တီးရာတွင် အားကောင်းသော ကိရိယာတစ်ခု ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:17:en"
  };

  window.CONTENT_I18N["sql:18"] = window.CONTENT_I18N["sql:18"] || {};
  window.CONTENT_I18N["sql:18"].my = {
    title: "18-Aggregate Function များ: SUM, AVG, COUNT စသည်",
    concept: "ဒေတာအတန်းအများအပြားပေါ်တွင် ပေါင်းစပ်တွက်ချက်မှုများ ပြုလုပ်ပေးသော function များကို **aggregate function များ** ဟု ခေါ်သည်။\n\n- **COUNT(column)**: အတန်းအရေအတွက်ကို ရေတွက်သည်။\n- **SUM(column)**: စုစုပေါင်းတန်ဖိုးကို တွက်ချက်သည်။\n- **AVG(column)**: ပျမ်းမျှတန်ဖိုးကို တွက်ချက်သည်။\n- **MAX(column)** / **MIN(column)**: အများဆုံး / အနည်းဆုံး တန်ဖိုးကို ရှာဖွေသည်။\n\nAggregate function များကို အသုံးပြုခြင်းဖြင့် တစ်ဦးချင်းဒေတာထက် တစ်စုတစ်ဖွဲ့လုံး၏ စာရင်းအင်းအချက်အလက်များကို ရရှိနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:18:en"
  };

  window.CONTENT_I18N["sql:19"] = window.CONTENT_I18N["sql:19"] || {};
  window.CONTENT_I18N["sql:19"].my = {
    title: "19-ဒေတာများကို အုပ်စုဖွဲ့ခြင်း: GROUP BY",
    concept: "ဒေတာများကို အုပ်စုများခွဲပြီး အုပ်စုတစ်ခုစီအလိုက် aggregate တွက်ချက်မှုများ ပြုလုပ်ရန် **GROUP BY** clause ကို အသုံးပြုပါ။\n\nရေးသားပုံမှာ-\n\n```sql\nSELECT gender, AVG(age) FROM students GROUP BY gender;\n```\n\n၎င်းသည် \"ကျောင်းသားများ၏ ပျမ်းမျှအသက်\" နှင့် \"ကျောင်းသူများ၏ ပျမ်းမျှအသက်\" ကဲ့သို့သော စာရင်းအင်းများကို တစ်ပြိုင်နက်တည်း တွက်ချက်နိုင်စေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:19:en"
  };

  window.CONTENT_I18N["sql:20"] = window.CONTENT_I18N["sql:20"] || {};
  window.CONTENT_I18N["sql:20"].my = {
    title: "20-အုပ်စုများကို စစ်ထုတ်ခြင်း: HAVING",
    concept: "GROUP BY ဖြင့် အုပ်စုဖွဲ့ပြီးနောက် ရലဒ်များကို စစ်ထုတ်လိုပါက WHERE အစား **HAVING** clause ကို အသုံးပြုပါ။\n\nWHERE clause သည် အုပ်စုမဖွဲ့မီ ဒေတာအတန်းများကို စစ်ထုတ်ပြီး၊ HAVING clause သည် အုပ်စုဖွဲ့ပြီးနောက် အုပ်စုများကို စစ်ထုတ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:20:en"
  };

  window.CONTENT_I18N["sql:21"] = window.CONTENT_I18N["sql:21"] || {};
  window.CONTENT_I18N["sql:21"].my = {
    title: "21-Database Design နှင့် Normalization",
    concept: "Database ဒီဇိုင်းဆွဲရာတွင် မလိုအပ်ဘဲ ดေတာများ ထပ်နေခြင်းနှင့် မကိုက်ညီမှုများကို ရှောင်ရှားရန် ဒေတာများကို ဇယားအများအပြားသို့ ခွဲထုတ်သည်။ ဤလုပ်ငန်းစဉ်ကို **normalization** ဟု ခေါ်သည်။\n\nဥပမာအားဖြင့်၊ ကျောင်းသားဇယားတွင် ဌာနအမည် (department name) ကို တိုက်ရိုက်ရေးမည့်အစား \"department ID\" ကိုသာ ရေးသားပြီး အသေးစိတ်ကို သီးခြားဌာနဇယားတွင် စီမံခန့်ခွဲသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:21:en"
  };

  window.CONTENT_I18N["sql:22"] = window.CONTENT_I18N["sql:22"] || {};
  window.CONTENT_I18N["sql:22"].my = {
    title: "22-ဇယားများ ချိတ်ဆက်ခြင်း: INNER JOIN",
    concept: "**JOIN** သည် ပေါင်းစပ်အချက်အလက်များကို ရှာဖွေရန် သီးခြားဇယားများကို ချိတ်ဆက်သည့် လုပ်ငန်းစဉ်ဖြစ်သည်။\n\n**INNER JOIN (အတွင်းပိုင်းချိတ်ဆက်မှု)** သည် ဇယားနှစ်ခုလုံးတွင် တူညီသော key များ ကိုက်ညီသည့် အတန်းများကိုသာ ရှာဖွေဖော်ပြသည်။\n\nရေးသားပုံမှာ-\n\n```sql\nFROM table_A INNER JOIN table_B ON table_A.key = table_B.key\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:22:en"
  };

  window.CONTENT_I18N["sql:23"] = window.CONTENT_I18N["sql:23"] || {};
  window.CONTENT_I18N["sql:23"].my = {
    title: "23-ဇယားများ ချိတ်ဆက်ခြင်း: LEFT/RIGHT JOIN",
    concept: "**OUTER JOIN** သည် ဇယားတစ်ခုမှ ဒေတာအားလုံးကို ထိန်းသိမ်းထားပြီး အခြားဇယားတစ်ခုမှ ကိုက်ညီသော ဒေတာများကို ချိတ်ဆက်သည်။\n\n- **LEFT JOIN**: FROM clause ၏ ဘယ်ဘက်တွင် ရေးသားထားသော ဇယားမှ ဒေတာအားလုံးကို ထိန်းသိမ်းထားသည်။\n- **RIGHT JOIN**: ညာဘက်တွင် ရေးသားထားသော ဇယားမှ ဒေတာအားလုံးကို ထိန်းသိမ်းထားသည်။\n\nအခြားဇယားတွင် ကိုက်ညီသော အချက်အလက်မရှိပါက `NULL` ဖြင့် ဖြည့်စွက်ပါမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:23:en"
  };

  window.CONTENT_I18N["sql:24"] = window.CONTENT_I18N["sql:24"] || {};
  window.CONTENT_I18N["sql:24"].my = {
    title: "24-Self Join နှင့် ဇယားအများအပြား ချိတ်ဆက်ခြင်း",
    concept: "ဇယားတစ်ခုကို ၎င်းကိုယ်တိုင်နှင့် ပြန်လည်ချိတ်ဆက်ခြင်းကို **self join** ဟု ခေါ်သည်။\n\n၎င်းသည် တူညီသောဇယားမှ ဆက်စပ်နေသော အတွဲများကို ထုတ်ယူလိုသည့်အခါ အသုံးဝင်သည်။\n\n`students_mst AS s1` ကဲ့သို့သော alias (ယာယီအမည်များ) သတ်မှတ်ပြီး သီးခြားဇယားတစ်ခုကဲ့သို့ လုပ်ဆောင်စေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:24:en"
  };

  window.CONTENT_I18N["sql:25"] = window.CONTENT_I18N["sql:25"] || {};
  window.CONTENT_I18N["sql:25"].my = {
    title: "25-Subquery များကို အသုံးပြုခြင်း",
    concept: "SQL query တစ်ခုအတွင်း ထည့်သွင်းထားသော အခြား SQL query တစ်ခုကို **subquery** ဟု ခေါ်သည်။\n\nဥပမာအားဖြင့်၊ \"ပျမ်းမျှရမှတ်ထက် ပိုမိုရရှိသော ကျောင်းသားစာရင်း\" ကို လိုချင်ပါက၊ ပထမဦးစွာ subquery ကို အသုံးပြု၍ ပျမ်းမျှရမှတ်ကို တွက်ချက်ပြီးနောက် ၎င်းရလဒ်ကို အသုံးပြု၍ ပြင်ပ SQL query ရှိ အတန်းများကို စစ်ထုတ်သည်။\n\nအတွင်းပိုင်း SQL query ကို လက်သည်းကွင်း `()` အတွင်း ရေးသားရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:25:en"
  };

  window.CONTENT_I18N["sql:26"] = window.CONTENT_I18N["sql:26"] || {};
  window.CONTENT_I18N["sql:26"].my = {
    title: "26-INSERT ဖြင့် အတန်းအသစ်များ ထည့်သွင်းခြင်း",
    concept: "ဇယားအတွင်းသို့ ဒေတာအသစ်များ ထည့်သွင်းရန် **INSERT** statement ကို အသုံးပြုပါ။\n\nရေးသားပုံမှာ-\n\n```sql\nINSERT INTO table_name (column1, column2) VALUES (value1, value2);\n```\n\nတန်ဖိုးများ၏ အစီအစဉ်သည် သတ်မှတ်ထားသော ကော်လံများ၏ အစီအစဉ်နှင့် ကိုက်ညီရပါမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:26:en"
  };

  window.CONTENT_I18N["sql:27"] = window.CONTENT_I18N["sql:27"] || {};
  window.CONTENT_I18N["sql:27"].my = {
    title: "27-UPDATE ဖြင့် အတန်းများကို ပြင်ဆင်ခြင်း",
    concept: "ဇယားရှိ ရှိပြီးသား ဒေတာများကို ပြင်ဆင်ရန် **UPDATE** statement ကို အသုံးပြုပါ။\n\nရေးသားပုံမှာ-\n\n```sql\nUPDATE table_name SET column_name = new_value WHERE condition;\n```\n\n> [!CAUTION]\n> **အထူးအရေးကြီးသည်**: WHERE clause ရေးသားရန် မေ့လျော့ပါက ဇယားရှိ အတန်းအားလုံး ပြင်ဆင်ခြင်း ခံရပါမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:27:en"
  };

  window.CONTENT_I18N["sql:28"] = window.CONTENT_I18N["sql:28"] || {};
  window.CONTENT_I18N["sql:28"].my = {
    title: "28-DELETE ဖြင့် အတန်းများကို ဖျက်ခြင်း",
    concept: "ဇယားမှ ဒေတာများကို ဖျက်ရန် **DELETE** statement ကို အသုံးပြုပါ။\n\nရေးသားပုံမှာ-\n\n```sql\nDELETE FROM table_name WHERE condition;\n```\n\n> [!CAUTION]\n> **အထူးအရေးကြီးသည်**: UPDATE statement ကဲ့သို့ပင် WHERE clause မပါရှိပါက ဇယားရှိ အတန်းအားလုံး ဖျက်ဆီးခြင်း ခံရပါမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:28:en"
  };

  window.CONTENT_I18N["sql:29"] = window.CONTENT_I18N["sql:29"] || {};
  window.CONTENT_I18N["sql:29"].my = {
    title: "29-CREATE TABLE ဖြင့် ဇယားအသစ်များ ဖန်တီးခြင်း",
    concept: "ဇယားအသစ်တစ်ခု ဖန်တီးရန် **CREATE TABLE** statement ကို အသုံးပြုပါ။\n\nသတ်မှတ်ပုံမှာ-\n\n```sql\nCREATE TABLE table_name (column_name data_type, column_name data_type, ...);\n```\n\nဥပမာအားဖြင့်၊ ကော်လံတစ်ခုအား primary key အဖြစ် သတ်မှတ်လိုပါက \"PRIMARY KEY\" constraint ဖြင့် ကြေညာပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:29:en"
  };

  window.CONTENT_I18N["sql:30"] = window.CONTENT_I18N["sql:30"] || {};
  window.CONTENT_I18N["sql:30"].my = {
    title: "30-Constraint များကို အသုံးပြုခြင်း: NOT NULL၊ UNIQUE နှင့် DEFAULT",
    concept: "ဒေတာအရည်အသွေးကို ထိန်းသိမ်းရန် ဇယားကော်လံများတွင် စည်းမျဉ်းများ (constraints) သတ်မှတ်နိုင်သည်-\n\n- **NOT NULL**: အလွတ်တန်ဖိုး (NULL) လက်မခံပါ။\n- **UNIQUE**: ထပ်နေသောတန်ဖိုးများ လက်မခံပါ။\n- **DEFAULT တန်ဖိုး**: တန်ဖိုးတစ်ခု ထည့်သွင်းရန် ချန်လှပ်ထားခဲ့ပါက အလိုအလျောက် သတ်မှတ်ပေးမည့် တန်ဖိုးကို သတ်မှတ်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:30:en"
  };

  window.CONTENT_I18N["sql:31"] = window.CONTENT_I18N["sql:31"] || {};
  window.CONTENT_I18N["sql:31"].my = {
    title: "31-Primary Key နှင့် Auto-Increment",
    concept: "ဇယားတစ်ခုတွင် primary key (PRIMARY KEY) တစ်ခုသာ ရှိနိုင်သည်။\n\nMySQL တွင် primary key အတွက် **AUTO_INCREMENT** ကို သတ်မှတ်ပါက ဒေတာအသစ်ထည့်သည့်အခါ \"1, 2, 3...\" စသည့် အစဉ်လိုက်နံပါတ်များကို အလိုအလျောက် သတ်မှတ်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:31:en"
  };

  window.CONTENT_I18N["sql:32"] = window.CONTENT_I18N["sql:32"] || {};
  window.CONTENT_I18N["sql:32"].my = {
    title: "32-Foreign Key Constraints",
    concept: "ဇယားများအကြား ဆက်စပ်မှုနှင့် ကိုက်ညီမှုကို သေချာစေရန် **foreign key (FOREIGN KEY)** constraint ကို အသုံးပြုပါ။\n\n- ဥပမာအားဖြင့်၊ \"ကျောင်းသားတစ်ဦး၏ department_id သည် departments_mst ဇယား၏ department_id ကော်လံတွင် ရှိပြီးသားဖြစ်ရမည်\" ဟူသော စည်းမျဉ်းကို သတ်မှတ်နိုင်သည်။ ၎င်းသည် မရှိသောဌာန ID များကို ထည့်သွင်းခြင်းမှ ကာကွယ်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:32:en"
  };

  window.CONTENT_I18N["sql:33"] = window.CONTENT_I18N["sql:33"] || {};
  window.CONTENT_I18N["sql:33"].my = {
    title: "33-ALTER နှင့် DROP ဖြင့် ဇယားများကို ပြင်ဆင်ခြင်းနှင့် ဖျက်ခြင်း",
    concept: "ဇယားတစ်ခု ဖန်တီးပြီးနောက် အောက်ပါလုပ်ဆောင်ချက်များကို ပြုလုပ်နိုင်သည်-\n\n- **ALTER TABLE**: ကော်လံများ ထည့်ခြင်း သို့မဟုတ် ပြောင်းလဲခြင်းကဲ့သို့သော ဇယားတည်ဆောက်ပုံကို ပြင်ဆင်သည်။\n  - ကော်လံအသစ်ထည့်ရန်- `ALTER TABLE table_name ADD column_name data_type;`\n- **DROP TABLE**: ဇယားတစ်ခုလုံးကို အပြီးတိုင် ဖျက်ပစ်သည်။\n  - `DROP TABLE table_name;` (သတိပြုရန်- ဇယားအတွင်းရှိ ဒေတာအားလုံးလည်း ပျက်ပြယ်သွားပါမည်။)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:33:en"
  };

  window.CONTENT_I18N["sql:34"] = window.CONTENT_I18N["sql:34"] || {};
  window.CONTENT_I18N["sql:34"].my = {
    title: "34-Transaction လုပ်ဆောင်ချက်များ",
    concept: "လုပ်ဆောင်ချက်အများအပြားကို စုစည်းပြီး \"လုပ်ငန်းတစ်ခုတည်း\" အဖြစ် လုပ်ဆောင်သော ယန္တရားကို **transaction** ဟု ခေါ်သည်။\n\n- **COMMIT**: ပြောင်းလဲမှုအားလုံးကို အတည်ပြုပြီး သိမ်းဆည်းသည်။\n- **ROLLBACK**: အမှားတစ်ခုခု ဖြစ်ပေါ်ပါက လုပ်ဆောင်ချက်အားလုံးကို transaction မစတင်မီ အခြေအနေသို့ ပြန်လည်ရောက်ရှိစေသည်။\n\n၎င်းသည် ဘဏ်ငွေလွှဲခြင်း (အကောင့် A မှ ငွေနှုတ်ပြီး အကောင့် B သို့ ငွေထည့်ခြင်း) ကဲ့သို့သော တစ်စိတ်တစ်ပိုင်း ပျက်ကွက်မှု လက်မခံနိုင်သော လုပ်ငန်းစဉ်များအတွက် မရှိမဖြစ်လိုအပ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:34:en"
  };

  window.CONTENT_I18N["sql:35"] = window.CONTENT_I18N["sql:35"] || {};
  window.CONTENT_I18N["sql:35"].my = {
    title: "35-မြန်ဆန်စွာ ရှာဖွေနိုင်ရန် Index များ ထားရှိခြင်း",
    concept: "ဇယားအတွင်း ဒေတာရှာဖွေမှုကို မြန်ဆန်စေရန် ဖန်တီးထားသော လမ်းညွှန်ကို \"index (INDEX)\" ဟု ခေါ်သည်။\n\nဒေတာပမာဏ အလွန်များပြားသော ဇယားများတွင် သီးခြားကော်လံများပေါ်၌ index ဖန်တီးခြင်းဖြင့် ရှာဖွေမှုနှုန်းကို သိသိသာသာ မြှင့်တင်နိုင်သည်။\n\nသို့သော် index အလွန်များပြားပါက ဒေတာအသစ်ထည့်ခြင်းနှင့် ပြင်ဆင်ခြင်းများကို နှေးကွေးစေနိုင်သည့် အားနည်းချက်ရှိသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:35:en"
  };

  window.CONTENT_I18N["sql:36"] = window.CONTENT_I18N["sql:36"] || {};
  window.CONTENT_I18N["sql:36"].my = {
    title: "36-View များနှင့် Stored Procedure များ",
    concept: "SQL query များကို ပြန်လည်အသုံးပြုနိုင်ရန်နှင့် လုပ်ဆောင်မှု ပိုမိုထိရောက်စေရန် အောက်ပါယန္တရားများကို အသုံးပြုသည်-\n\n- **VIEW**: ရှုပ်ထွေးသော SELECT statement ကို သိမ်းဆည်းထားသည့် \"ယာယီဇယား (virtual table)\" ဖြစ်သည်။\n- **Stored Routine (Stored Procedure)**: SQL လုပ်ဆောင်ချက်အများအပြားနှင့် သတ်မှတ်ချက် logic များကို database ဘက်တွင် တိုက်ရိုက်သိမ်းဆည်းထားသော program ဖြစ်ပြီး ၎င်းကို လွယ်ကူစွာ ခေါ်ယူအသုံးပြုသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/sql_en.js:sql:36:en"
  };
})();
