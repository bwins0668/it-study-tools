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
})();
