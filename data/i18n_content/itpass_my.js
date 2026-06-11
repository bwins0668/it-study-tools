(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["itpass:1"] = window.CONTENT_I18N["itpass:1"] || {};
  window.CONTENT_I18N["itpass:1"].my = {
    title: "1-01 သတင်းအချက်အလက်သီအိုရီ (Information Theory)",
    concept: "အချက်အလက်များကို အဓိကနည်းလမ်းနှစ်မျိုးဖြင့် ကိုယ်စားပြုသည်- **Analog** (အဆက်မပြတ်ပြောင်းလဲနေသော တန်ဖိုးများဖြစ်ပြီး လျှောစောက်တစ်ခု၏ အမြင့်ကဲ့သို့ ကြားဖြတ်မှုမရှိပါ) နှင့် **Digital** (အဆက်မပြတ်ရှိနေသော တန်ဖိုးများကို ၀ နှင့် ၁ ကဲ့သို့ မဆက်စပ်သော ကိန်းဂဏန်းတန်ဖိုးများအဖြစ် ခွဲခြားထားခြင်း)။ Digital data များသည် လုပ်ဆောင်ရန်နှင့် ပြင်ဆင်ရန် လွယ်ကူခြင်း၊ noise (ဆူညံသံနှောင့်ယှက်မှု) ကို ကောင်းစွာခုခံနိုင်ခြင်းနှင့် အရည်အသွေးကျဆင်းမှု နည်းပါးခြင်း စသည့် အားသာချက်များရှိသည်။\n\n**ကွန်ပျူတာများက digital (binary) ကို ဘာကြောင့် သုံးတာလဲ။**\nကွန်ပျူတာရှိ လျှပ်စစ်ပတ်လမ်းများသည် \"ON (ဗို့အားမြင့်)\" နှင့် \"OFF (ဗို့အားနိမ့်)\" ဟူသော အခြေအနေနှစ်ခုကိုသာ ခွဲခြားနိုင်သည်။ ထို့ကြောင့် အချက်အလက်အားလုံးကို ၀ နှင့် ၁ ပေါင်းစပ်မှု (digital) အဖြစ် ကိုယ်စားပြုခြင်းသည် အမှားအယွင်းအနည်းဆုံးနှင့် စိတ်ချရဆုံးသော နည်းလမ်းဖြစ်သည်။\n\nသတင်းအချက်အလက်၏ အသေးငယ်ဆုံးယူနစ်မှာ **bit** (၀ သို့မဟုတ် ၁ ကို ကိုယ်စားပြုသည်) ဖြစ်ပြီး ၈ bit အုပ်စုကို **Byte** ဟု ခေါ်သည်။ ပမာဏအမြောက်အမြားကို ကိုယ်စားပြုရန် အကူအညီပေးသော ယူနစ်များတွင် **KB** (10^3)၊ **MB** (10^6)၊ **GB** (10^9)၊ **TB** (10^12) နှင့် **PB** (10^15) တို့ ပါဝင်သည်။ စာမေးပွဲအတွက် ပြင်ဆင်ရန် ဤယူနစ်များ၏ အစဉ်လိုက်နှင့် ၁ Byte သည် ၈ bit နှင့် ညီမျှသည်ဟူသော တွက်ချက်မှုစည်းမျဉ်းကို အလွတ်မှတ်မိပါစေ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:1:en"
  };

  window.CONTENT_I18N["itpass:2"] = window.CONTENT_I18N["itpass:2"] || {};
  window.CONTENT_I18N["itpass:2"].my = {
    title: "1-02 ကွန်ပျူတာဗိသုကာနှင့် CPU (Computer Architecture and CPU)",
    concept: "ကွန်ပျူတာများကို **Five Core Devices** (အဓိကစက်ပစ္စည်း ၅ မျိုး) ဟုခေါ်သော အခြေခံအစိတ်အပိုင်းများဖြင့် ဖွဲ့စည်းထားသည်-\n\n1. **Input Device** (အချက်အလက်သွင်းစက်)- ကီးဘုတ်နှင့် မောက်စ်ကဲ့သို့ အချက်အလက်များထည့်သွင်းရန် အသုံးပြုသော စက်ပစ္စည်းများ။\n2. **Output Device** (အချက်အလက်ထုတ်စက်)- မော်နီတာနှင့် ပရင်တာကဲ့သို့ အချက်အလက်များထုတ်ရန် အသုံးပြုသော စက်ပစ္စည်းများ။\n3. **Memory/Storage Device** (မှတ်ဉာဏ်/သိုလှောင်မှုစက်)- ပရိုဂရမ်များနှင့် အချက်အလက်များကို သိမ်းဆည်းရန် အသုံးပြုသော စက်ပစ္စည်းများ (main memory နှင့် auxiliary storage ဟူ၍ ခွဲခြားထားသည်)။\n4. **Control Device** (ထိန်းချုပ်မှုစက်)- ညွှန်ကြားချက်များကို အဓိပ္ပာယ်ဖွင့်ဆိုပြီး အခြားအစိတ်အပိုင်းများသို့ အမိန့်ပေးစေခိုင်းသော စက်ပစ္စည်းများ။\n5. **Arithmetic Logic Device** (သင်္ချာနှင့်ယုတ္တိဗေဒစက်)- သင်္ချာနှင့် ယုတ္တိဗေဒဆိုင်ရာ လုပ်ငန်းစဉ်များကို လုပ်ဆောင်သော စက်ပစ္စည်းများ။\n\n၎င်းတို့အနက် ထိန်းချုပ်မှုစက်နှင့် သင်္ချာယုတ္တိဗေဒစက်တို့ကို စုစည်းထားသော chip မှာ ကွန်ပျူတာ၏ \"ဦးနှောက်\" ဖြစ်သည့် **CPU (Central Processing Unit)** ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:2:en"
  };

  window.CONTENT_I18N["itpass:3"] = window.CONTENT_I18N["itpass:3"] || {};
  window.CONTENT_I18N["itpass:3"].my = {
    title: "1-02-1 CPU စွမ်းဆောင်ရည်သတ်မှတ်ချက်များ (CPU Performance Metrics)",
    concept: "**CPU စွမ်းဆောင်ရည်သတ်မှတ်ချက်များ (CPU Performance Metrics):**\n- **Clock Frequency** (နာရီကြိမ်နှုန်း)- တစ်စက္ကန့်လျှင် ထွက်ပေါ်လာသော လျှပ်စစ်အချက်ပြလှိုင်း အရေအတွက် (Hz) ဖြစ်သည်။ တန်ဖိုးပိုမြင့်လေ လုပ်ဆောင်မှုအရှိန် ပိုမြန်လေဖြစ်သည်။\n- **CPI (Cycles Per Instruction)**- ညွှန်ကြားချက်တစ်ခုကို လုပ်ဆောင်ရန် လိုအပ်သော နာရီစက်ဝန်း အရေအတွက် ဖြစ်သည်။ တန်ဖိုးပိုနိမ့်လေ လုပ်ဆောင်မှုစွမ်းရည် ပိုကောင်းလေဖြစ်သည်။\n- **Multi-core Processor** (processing core အများအပြားပါဝင်သော ပရိုဆက်ဆာ)- CPU တစ်ခုတည်းတွင် လုပ်ဆောင်ချက်များကို ဆောင်ရွက်သည့် \"core\" အများအပြား ပါဝင်ခြင်းဖြစ်သည်။ ပြိုင်တူလုပ်ဆောင်ခြင်း (parallel processing) က အလုံးစုံသော စွမ်းဆောင်ရည်နှင့် စွမ်းရည်များကို မြှင့်တင်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:3:en"
  };

  window.CONTENT_I18N["itpass:4"] = window.CONTENT_I18N["itpass:4"] || {};
  window.CONTENT_I18N["itpass:4"].my = {
    title: "1-03 Main Memory နှင့် Auxiliary Storage",
    concept: "သိုလှောင်မှုစနစ်များကို CPU မှ တိုက်ရိုက်ဖတ်ပြီး ရေးနိုင်သော **Main Memory** (RAM) နှင့် ပမာဏကြီးမားသော ဒေတာများကို ရေရှည်သိုလှောင်ပေးသော **Auxiliary Storage** (ဥပမာ HDDs နှင့် SSDs) ဟူ၍ ခွဲခြားထားသည်။\n\n**Main Memory နှင့် Auxiliary Storage တို့၏ ခြားနားချက် (အစပြုသူများအတွက်):**\nMain memory သည် သင်၏ \"စာရေးခုံမျက်နှာပြင်\" နှင့် တူသည်။ စာရေးခုံ ပိုကျယ်လေ၊ စာရွက်စာတမ်းများ ပိုမိုဖွင့်လှစ်ပြီး တစ်ပြိုင်နက် လုပ်ဆောင်နိုင်လေဖြစ်သော်လည်း လျှပ်စစ်ပါဝါ ပိတ်လိုက်လျှင် ခုံပေါ်ရှိအရာများ အားလုံးပျောက်ပျက်သွားမည် (volatile)။ Auxiliary storage သည် \"ဖိုင်တွဲဗီရို သို့မဟုတ် စာအုပ်စင်\" နှင့် တူသည်။ စာအုပ်တစ်အုပ်ကို ထုတ်ယူရန် အချိန်ပိုပေးရသော်လည်း လျှပ်စစ်ပါဝါ ပိတ်သွားပါကလည်း ပါရှိသောအရာများ မပျောက်ပျက်ဘဲ ကျန်ရှိနေမည်ဖြစ်သည် (non-volatile)။\n\n**Cache Memory ၏ အခန်းကဏ္ဍ:**\nCPU ၏ လုပ်ဆောင်ချက်အမြန်နှုန်းသည် အလွန်မြန်ဆန်သော်လည်း main memory ၏ ဖတ်/ရေးနှုန်းသည် နှိုင်းယှဉ်ချက်အရ နှေးကွေးသဖြင့် CPU ကို စောင့်ဆိုင်းစေသည် (idle loss)။ ထို့ကြောင့် ပမာဏနည်းသော်လည်း အလွန်မြန်ဆန်သော **Cache Memory** ကို CPU နှင့် main memory ကြားတွင် ထားရှိသည်။ မကြာခဏ အသုံးပြုလေ့ရှိသော ဒေတာများကို ဤနေရာသို့ ကူးယူထားခြင်းဖြင့် main memory သို့ သွားရောက်ဖတ်ရှုမှုကို လျှော့ချပေးပြီး စနစ်တစ်ခုလုံးကို မြန်ဆန်စေသည်။\n\nCPU က လိုအပ်သော ဒေတာသည် cache memory ထဲတွင် ရှိနေနိုင်သည့် အလားအလာကို **Hit Rate** ဟု ခေါ်သည်။ Hit rate ပိုမိုမြင့်မားလေ၊ ထိရောက်သော ဝင်ရောက်ကြည့်ရှုချိန် (effective access time) ပိုမိုတိုတောင်းလေဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:4:en"
  };

  window.CONTENT_I18N["itpass:5"] = window.CONTENT_I18N["itpass:5"] || {};
  window.CONTENT_I18N["itpass:5"].my = {
    title: "1-04 Semiconductor Memory",
    concept: "Semiconductor memory ကို ပါဝါပိတ်လိုက်လျှင် သိမ်းဆည်းထားသော ဒေတာများ ပျောက်ဆုံးသွားမည့် **Volatile Memory** နှင့် ပါဝါမရှိလျှင်ပင် ၎င်း၏ အချက်အလက်များကို ဆက်လက်ထိန်းသိမ်းထားမည့် **Non-volatile Memory** ဟူ၍ အမျိုးအစားခွဲခြားထားသည်။\n\n**1. RAM (Random Access Memory) - Volatile:**\n- **DRAM (Dynamic RAM)**: ကာပက်စီတာ (capacitors) များထဲတွင် လျှပ်စစ်ဓာတ်အားများ စုဆောင်းခြင်းဖြင့် အချက်အလက်များကို သိုလှောင်သည်။ လျှပ်စစ်ဓာတ်အားသည် အချိန်ကြာလာသည်နှင့်အမျှ ယိုစိမ့်သွားတတ်သောကြောင့် ဒေတာကို ထိန်းသိမ်းရန် မန်မိုရီကို ပြန်လည်အားဖြည့်ပေးသည့် **Refresh Operation** လုပ်ဆောင်ချက်ကို မဖြစ်မနေ လုပ်ဆောင်ရသည်။ ဈေးနှုန်းချိုသာပြီး ပမာဏကြီးမားစွာ ထုတ်လုပ်နိုင်သောကြောင့် PC များ၏ **Main Memory** အဖြစ် အသုံးပြုသည်။\n- **SRAM (Static RAM)**: ဖလစ်ဖလော့ပ် (flip-flops) ဟုခေါ်သော လျှပ်စစ်ပတ်လမ်းများကို အသုံးပြု၍ အချက်အလက်များကို သိုလှောင်သည်။ ၎င်းသည် refresh operations လုပ်ဆောင်ရန် မလိုအပ်ဘဲ DRAM ထက် သိသိသာသာ ပိုမိုမြန်ဆန်သော်လည်း တည်ဆောက်ပုံ ရှုပ်ထွေးခြင်း၊ ဈေးကြီးခြင်းနှင့် ပမာဏနည်းပါးခြင်းတို့ရှိသည်။ ၎င်းကို **Cache Memory** အဖြစ် အသုံးပြုသည်။\n\n**2. ROM (Read Only Memory) - Non-volatile:**\n- **Flash Memory**: လျှပ်စစ်နည်းဖြင့် ပြန်လည်ရေးသားနိုင်သော non-volatile memory အမျိုးအစားတစ်ခုဖြစ်သည်။ ၎င်းတွင် ရွေ့လျားနိုင်သော အစိတ်အပိုင်းများ မပါဝင်ဘဲ ရုပ်ပိုင်းဆိုင်ရာ ထိခိုက်မှုများကို ခံနိုင်ရည်ရှိသောကြောင့် SSD များ၊ USB flash drives များ၊ SD ကတ်များနှင့် စမတ်ဖုန်း သိုလှောင်မှုစနစ်များတွင် တွင်ကျယ်စွာ အသုံးပြုကြသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:5:en"
  };

  window.CONTENT_I18N["itpass:6"] = window.CONTENT_I18N["itpass:6"] || {};
  window.CONTENT_I18N["itpass:6"].my = {
    title: "1-05 Input/Output Devices",
    concept: "Input နှင့် output devices များသည် ကွန်ပျူတာ၏ ပင်မအစိတ်အပိုင်းနှင့် ပြင်ပကမ္ဘာတို့အကြား အချက်အလက်များ ဖလှယ်ရန်အတွက် အသုံးပြုသည့် ဟာ့ဒ်ဝဲ အင်တာဖေ့စ် (hardware interfaces) များဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:6:en"
  };

  window.CONTENT_I18N["itpass:7"] = window.CONTENT_I18N["itpass:7"] || {};
  window.CONTENT_I18N["itpass:7"].my = {
    title: "1-05-1 1. Input Devices",
    concept: "**1. Input Devices:**\nကီးဘုတ်နှင့် မောက်စ်များအပြင်၊ ပုံရိပ်များကို ဖတ်ရန် **Scanners**၊ လက်ညှိုးဖြင့် တည်နေရာများကို သတ်မှတ်ရန် **Touch Panels** နှင့် ကုန်ပစ္စည်းကုဒ်များကို ဖတ်ရန် **Barcode Readers** တို့ ပါဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:7:en"
  };

  window.CONTENT_I18N["itpass:8"] = window.CONTENT_I18N["itpass:8"] || {};
  window.CONTENT_I18N["itpass:8"].my = {
    title: "1-05-2 2. Output Devices",
    concept: "**2. Output Devices:**\n- **Liquid Crystal Display (LCD)**: အရည်ပုံဆောင်ခဲ အစိတ်အပိုင်းများ (liquid crystal elements) ကို အသုံးပြု၍ နောက်ခံအလင်း (backlight) မှ အလင်းကို ပိတ်ဆို့ခြင်း သို့မဟုတ် ဖြတ်သန်းစေခြင်းဖြင့် မျက်နှာပြင်များကို ပြသသည်။\n- **Organic EL Display (OLED)**: ဗို့အားပေးသောအခါ အလင်းထုတ်လွှတ်သည့် အထူးအော်ဂဲနစ်ဒြပ်ပေါင်းများ (organic compounds) ကို အသုံးပြုသည်။ နောက်ခံအလင်း မလိုအပ်သောကြောင့် ၎င်းကို LCD များထက် ပိုမို **ပါးလွှာစွာ (Thinner)** ပြုလုပ်နိုင်ပြီး စစ်မှန်သော အနက်ရောင်ကို ဖော်ပြနိုင်ခြင်း (high contrast ratio) နှင့် တုံ့ပြန်မှုနှုန်း မြန်ဆန်ခြင်းတို့ကို ရရှိစေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:8:en"
  };

  window.CONTENT_I18N["itpass:9"] = window.CONTENT_I18N["itpass:9"] || {};
  window.CONTENT_I18N["itpass:9"].my = {
    title: "1-05-3 3. Resolution Units",
    concept: "**3. Resolution Units:**\n**dpi** (dots per inch) ကို မျက်နှာပြင်များနှင့် ပုံနှိပ်ခြင်း၏ ရုပ်ထွက်ကြည်လင်ပြတ်သားမှု (resolution) ကို ဖော်ပြရန် ညွှန်းကိန်းတစ်ခုအဖြစ် အသုံးပြုသည်။ ၎င်းသည် တစ်လက်မ (inch - ၂.၅၄ စင်တီမီတာခန့်) တွင် စီစဉ်ထားသော စက်ပြောက် (dots) အရေအတွက်ကို ဖော်ပြသည်။ တန်ဖိုး ပိုမိုကြီးမားလေ၊ ရုပ်ထွက်ကြည်လင်မှု ပိုမိုမြင့်မားပြီး ပိုမိုလှပသော ပြသမှုကို ရရှိလေဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:9:en"
  };

  window.CONTENT_I18N["itpass:10"] = window.CONTENT_I18N["itpass:10"] || {};
  window.CONTENT_I18N["itpass:10"].my = {
    title: "1-06 Input/Output Interfaces",
    concept: "Input/Output interfaces ဆိုသည်မှာ ကွန်ပျူတာပင်မစက်နှင့် ပြင်ပဆက်စပ်ပစ္စည်းများ (ဥပမာ ကီးဘုတ်၊ ပရင်တာနှင့် ပြင်ပ HDDs များ) ကို ချိတ်ဆက်ရန် အသုံးပြုသည့် စံနှုန်းများနှင့် ချိတ်ဆက်ကိရိယာများ (connectors) ကို ခေါ်ဆိုသော ယေဘုယျအသုံးအနှုန်းဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:10:en"
  };

  window.CONTENT_I18N["itpass:11"] = window.CONTENT_I18N["itpass:11"] || {};
  window.CONTENT_I18N["itpass:11"].my = {
    title: "1-06-1 1. Wired Interfaces",
    concept: "**1. Wired interface:**\n- **USB (Universal Serial Bus)**: အသုံးအများဆုံး စီးရီးရယ်လ်ထုတ်လွှင့်မှု (ဒေတာများကို လမ်းကြောင်းတစ်ခုတည်းတွင် တစ်ကြိမ်လျှင် တစ်ဘစ်နှုန်း ပို့လွှတ်သည့် စနစ်) အင်တာဖေ့စ် ဖြစ်သည်။ USB hub တစ်ခုမှတစ်ဆင့် ကိရိယာပေါင်း **127 units** အထိ ချိတ်ဆက်နိုင်ပြီး၊ PC ဖွင့်ထားစဉ် ကေဘယ်ကြိုးများကို ချိတ်ဆက်ခြင်းနှင့် ဖြုတ်ခြင်းတို့ ပြုလုပ်နိုင်သည့် **Hot Plug** လုပ်ဆောင်ချက်နှင့် ကေဘယ်ကြိုးမှတစ်ဆင့် ဆက်စပ်ပစ္စည်းများထံ လျှပ်စစ်ပါဝါ ပေးပို့နိုင်သည့် **Bus Power** လုပ်ဆောင်ချက်တို့ ပါရှိသည်။\n- **HDMI (High-Definition Multimedia Interface)**: ဒစ်ဂျစ်တယ် ဗီဒီယို အချက်ပြလှိုင်းများနှင့် ဒစ်ဂျစ်တယ် အော်ဒီယို အချက်ပြလှိုင်းများကို ကေဘယ်ကြိုးတစ်ချောင်းတည်းဖြင့် အတူတူ ပို့လွှတ်ပေးသည့် စံနှုန်းတစ်ခုဖြစ်သည်။ တီဗီများနှင့် PC မော်နီတာများတွင် တွင်ကျယ်စွာ အသုံးပြုသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:11:en"
  };

  window.CONTENT_I18N["itpass:12"] = window.CONTENT_I18N["itpass:12"] || {};
  window.CONTENT_I18N["itpass:12"].my = {
    title: "1-06-2 2. Wireless Interfaces",
    concept: "**2. Wireless interface:**\n- **Bluetooth**: အချင်းဝက် မီတာအနည်းငယ်မှ မီတာအနည်းငယ်ဆယ်ဂဏန်းအတွင်းရှိ ကျဉ်းမြောင်းသော အကွာအဝေးအတွင်း ကီးဘုတ်၊ မောက်စ်နှင့် နားကြပ်များကဲ့သို့သော ပြင်ပဆက်စပ်ပစ္စည်းများကို ကြိုးမဲ့ချိတ်ဆက်ပေးသည့် အကွာအဝေးတို ကြိုးမဲ့ဆက်သွယ်ရေးစံနှုန်းတစ်ခုဖြစ်သည်။\n- **Wi-Fi**: PC များနှင့် စမတ်ဖုန်းများကို အင်တာနက် (LAN) သို့ ကြိုးမဲ့ချိတ်ဆက်ရန် အသုံးပြုသော ဆက်သွယ်ရေးစံနှုန်းတစ်ခုဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:12:en"
  };

  window.CONTENT_I18N["itpass:13"] = window.CONTENT_I18N["itpass:13"] || {};
  window.CONTENT_I18N["itpass:13"].my = {
    title: "1-07 AI",
    concept: "Machine learning နှင့် deep learning တို့သည် ဉာဏ်ရည်တု (AI) ဖွံ့ဖြိုးတိုးတက်မှုကို အထောက်အကူပြုသော နည်းပညာများ ဖြစ်ကြသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:13:en"
  };

  window.CONTENT_I18N["itpass:14"] = window.CONTENT_I18N["itpass:14"] || {};
  window.CONTENT_I18N["itpass:14"].my = {
    title: "1-07-1 1. Machine Learning",
    concept: "**1. Machine Learning:**\n၎င်းသည် ကွန်ပျူတာထံသို့ ဒေတာပမာဏအမြောက်အမြား (big data) ကို ပေးသွင်းပြီး ၎င်းဒေတာထဲရှိ ဖုံးကွယ်နေသော ပုံစံများနှင့် စည်းမျဉ်းများကို ကွန်ပျူတာက ကိုယ်တိုင်လေ့လာသင်ယူစေသည့် နည်းလမ်းဖြစ်သည်။ သင်ယူမှုနည်းလမ်း သုံးမျိုးရှိသည်-\n- **Supervised learning**: ထည့်သွင်းဒေတာ (input data) နှင့် \"မှန်ကန်သောအဖြေ (label)\" ကို သင်ယူရန်အတွက် တွဲလျက်ပေးထားသည်။ ဥပမာအားဖြင့်၊ ပုံရိပ်တစ်ခုတွင် မှန်ကန်သော တဂ် \"cat\" ကို ထည့်သွင်းပေးပြီး (**annotation**) AI ကို ၎င်းမှတစ်ဆင့် လေ့လာသင်ယူစေသည်။ ၎င်းကို စပမ်အီးမေးလ်များ (spam emails) အလိုအလျောက် ခွဲခြားခြင်း စသည်တို့တွင် အသုံးပြုသည်။\n- **Unsupervised learning**: အဖြေမှန်ကို မပေးဘဲ ဒေတာ၏ ထူးခြားချက်များကို ကိုယ်တိုင်ခွဲခြမ်းစိတ်ဖြာပြီး ဒေတာများကို အုပ်စုများခွဲခြားသည် (clustering)။ ၎င်းကို သုံးစွဲသူများ၏ ဝယ်ယူမှုအပြုအမူပုံစံများကို ခွဲခြမ်းစိတ်ဖြာရန် အသုံးပြုသည်။\n- **Reinforcement learning**: AI ကိုယ်တိုင်က အမှားအယွင်းကို ထပ်ခါတလဲလဲ စမ်းသပ်လုပ်ဆောင်ပြီး (trial and error) အကောင်းဆုံးလုပ်ဆောင်မှုအတွက် \"ဆုလာဘ် (reward)\" ပေးခြင်းဖြင့် အကောင်းဆုံးအပြုအမူပုံစံကို လေ့လာသင်ယူစေသည်။ ၎င်းကို Go နှင့် Shogi ကစားသည့် AI များတွင်လည်းကောင်း၊ အလိုအလျောက်မောင်းနှင်စနစ်များ (autonomous driving) တွင်လည်းကောင်း အသုံးပြုသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:14:en"
  };

  window.CONTENT_I18N["itpass:15"] = window.CONTENT_I18N["itpass:15"] || {};
  window.CONTENT_I18N["itpass:15"].my = {
    title: "1-07-2 2. Deep learning",
    concept: "**2. Deep learning:**\n၎င်းသည် လူ့ဦးနှောက်အတွင်းရှိ အာရုံကြောဆဲလ်များ (neurons) ၏ ဖွဲ့စည်းပုံကို တုပထားသော **neural networks** များကို အလွှာပေါင်းများစွာ ထပ်ဆင့်တည်ဆောက်ပြီး၊ ကွန်ပျူတာက ဒေတာများ၏ ထူးခြားချက်များကို ကိုယ်တိုင် နက်နက်ရှိုင်းရှိုင်း ခွဲခြမ်းစိတ်ဖြာကာ လေ့လာသင်ယူသည့် အဆင့်မြင့် machine learning နည်းပညာတစ်ခု ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:15:en"
  };

  window.CONTENT_I18N["itpass:16"] = window.CONTENT_I18N["itpass:16"] || {};
  window.CONTENT_I18N["itpass:16"].my = {
    title: "1-08 Probability and Statistics",
    concept: "ဒေတာခွဲခြမ်းစိတ်ဖြာခြင်းနှင့် စီမံခန့်ခွဲမှုဆိုင်ရာ ဆုံးဖြတ်ချက်ချခြင်းတို့၏ အခြေခံအုတ်မြစ်ဖြစ်သော ကိုယ်စားပြုတန်ဖိုးများ (representative values) နှင့် ကွဲလွဲပျံ့နှံ့မှု (dispersion) ဆိုင်ရာ ညွှန်းကိန်းများ ဖြစ်ကြသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:16:en"
  };

  window.CONTENT_I18N["itpass:17"] = window.CONTENT_I18N["itpass:17"] || {};
  window.CONTENT_I18N["itpass:17"].my = {
    title: "1-08-1 1. Representative Values",
    concept: "**1. Representative value indicating the center of data:**\n- **Average value**: ကိန်းဂဏန်းတန်ဖိုးအားလုံး၏ ပေါင်းလဒ်ကို ဒေတာအရေအတွက်ဖြင့် စား၍ ရရှိသော တန်ဖိုးဖြစ်သည်။ အလွန်ကြီးမားသော သို့မဟုတ် သေးငယ်သော တန်ဖိုးများ (outliers) ၏ သက်ရောက်မှုကို လွယ်ကူစွာ ခံရနိုင်သည့် အားနည်းချက် ရှိသည်။\n- **Median**: ဒေတာများကို တန်ဖိုးအလိုက် အစဉ်လိုက်စီထားသောအခါ အလယ်တည့်တည့်တွင် တည်ရှိသော တန်ဖိုးဖြစ်သည်။ ဒေတာအရေအတွက်သည် စုံကိန်းဖြစ်ပါက အလယ်ရှိ တန်ဖိုးနှစ်ခု၏ ပျမ်းမျှတန်ဖိုးကို ယူသည်။ ၎င်း၏ အားသာချက်မှာ outliers များ၏ သက်ရောက်မှုကို ခံရနိုင်ခြေ နည်းပါးခြင်းဖြစ်သည်။\n- **Mode**: ဒေတာများထဲတွင် အကြိမ်ရေအများဆုံး ပေါ်ထွက်လာသော တန်ဖိုးဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:17:en"
  };

  window.CONTENT_I18N["itpass:18"] = window.CONTENT_I18N["itpass:18"] || {};
  window.CONTENT_I18N["itpass:18"].my = {
    title: "1-08-2 2. Measures of Dispersion",
    concept: "**2. Indicator showing data dispersion (dispersion):**\n- **Dispersion**: ဒေတာတစ်ခုစီသည် ပျမ်းမျှတန်ဖိုးမှ မည်မျှကွာလှမ်းသည်ကို ဖော်ပြသော ပျမ်းမျှတန်ဖိုးဖြစ်သည်။ တန်ဖိုး ပိုမိုမြင့်မားလေ၊ ဒေတာများ ပိုမိုပျံ့နှံ့နေလေဖြစ်သည်။\n- **Standard deviation**: ဗေရီယန့်စ်၏ စကွဲယားရု(တ်) (square root) ဖြစ်သည်။ ယူနစ်များသည် မူရင်းဒေတာနှင့် ကိုက်ညီသောကြောင့် ကိုင်တွယ်ရ လွယ်ကူပြီး ဝင်ခွင့်စာမေးပွဲများအတွက် \"သွေဖည်မှုတန်ဖိုး (deviation value)\" ကို တွက်ချက်ရန်လည်း အသုံးပြုသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:18:en"
  };

  window.CONTENT_I18N["itpass:19"] = window.CONTENT_I18N["itpass:19"] || {};
  window.CONTENT_I18N["itpass:19"].my = {
    title: "1-09 Radix Conversion (Base Conversion)",
    concept: "ကွန်ပျူတာအတွင်းပိုင်းတွင် ကိန်းဂဏန်းအားလုံးကို binary numbers ဖြစ်သော 0 နှင့် 1 များဖြင့် လုပ်ဆောင်သော်လည်း၊ လူသားများ နားလည်ရလွယ်ကူစေရန်အတွက် binary numbers ကို အတိုချုံ့ထားသော ပုံစံများဖြစ်သည့် decimal numbers နှင့် hexadecimal numbers များကို အသုံးပြုကြသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:19:en"
  };

  window.CONTENT_I18N["itpass:20"] = window.CONTENT_I18N["itpass:20"] || {};
  window.CONTENT_I18N["itpass:20"].my = {
    title: "1-09-1 1. Characteristics of Number Systems",
    concept: "**1. Characteristics of each number system:**\n- **Decimal number**: ကျွန်ုပ်တို့ နေ့စဉ်အသုံးပြုနေသော ကိန်းစနစ်ဖြစ်ပြီး 0 မှ 9 အထိ သင်္ကေတ ၁၀ ခုကို အသုံးပြုကာ တန်ဖိုး ၁၀ တိုးတိုင်း နေရာတိုးသည်။\n- **Binary number**: 0 နှင့် 1 သင်္ေတနှစ်ခုတည်းကိုသာ အသုံးပြုပြီး တန်ဖိုး ၂ တိုးတိုင်း နေရာတိုးသည့် စနစ်ဖြစ်သည်။ ညာဘက်အစွန်းဆုံးမှ စတင်၍ \"2^0 နေရာ (1's digit)\"၊ \"2^1 နေရာ (2's digit)\"၊ \"2^2 နေရာ (4's digit)\"၊ \"2^3 နေရာ (8's digit)\" စသည်ဖြင့် ဖြစ်သည်။\n- **Hexadecimal number**: 0 မှ 9 အထိ ကိန်းဂဏန်းများနှင့် ၁၀ မှ ၁၅ ကို ကိုယ်စားပြုသော A မှ F အထိ (A=10, B=11, C=12, D=13, E=14, F=15) စုစုပေါင်း သင်္ကေတ ၁၆ ခုကို အသုံးပြုကာ တန်ဖိုး ၁၆ တိုးတိုင်း နေရာတိုးသည့် စနစ်ဖြစ်သည်။ Binary တွင် ဂဏန်း ၄ လုံးကို Hexadecimal တွင် ဂဏန်း ၁ လုံးတည်းဖြင့် ပြသနိုင်သောကြောင့် ကွန်ပျူတာ၏ memory ကို ဖော်ပြရန် မကြာခဏ အသုံးပြုသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:20:en"
  };

  window.CONTENT_I18N["itpass:21"] = window.CONTENT_I18N["itpass:21"] || {};
  window.CONTENT_I18N["itpass:21"].my = {
    title: "1-09-2 2. Decimal to Binary Conversion",
    concept: "**2. Conversion from decimal to binary (Sudare calculation):**\nDecimal ကိန်းကို \"2\" ဖြင့် ဆက်တိုက်စားပြီး ရရှိလာသော အကြွင်းများကို အောက်ခြေမှစတင်၍ အစဉ်လိုက် ပြန်လည်စီစဉ်ပေးသည်။ စာမေးပွဲအတွက် ပြင်ဆင်ရန် binary numbers မှ decimal numbers သို့ ပြန်လည်တွက်ချက်ခြင်း (နေရာတစ်ခုစီ၏ တန်ဖိုးအလိုက် မြှောက်ပြီး ပေါင်းခြင်း) ကို လျင်မြန်စွာ လုပ်ဆောင်နိုင်ရန် လေ့ကျင့်ထားကြပါစို့။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:21:en"
  };

  window.CONTENT_I18N["itpass:22"] = window.CONTENT_I18N["itpass:22"] || {};
  window.CONTENT_I18N["itpass:22"].my = {
    title: "2-01 Software",
    concept: "Software ကို ၎င်း၏ အခန်းကဏ္ဍအပေါ် မူတည်၍ \"System Software (OS)\"၊ \"Application Software\" နှင့် ၎င်းတို့နှစ်ခုကြားတွင် တည်ရှိသော \"middleware\" ဟူ၍ ကျယ်ပြန့်စွာ ခွဲခြားထားသည်။\n\n**1. Basic software (OS - Operating System):**\nဟာ့ဒ်ဝဲကို မောင်းနှင်ပေးပြီး ဆော့ဖ်ဝဲအားလုံး၏ အခြေခံအုတ်မြစ်ဖြစ်သည်။ ကီးဘုတ်မှ ရိုက်သွင်းမှု၊ မျက်နှာပြင်သို့ ထုတ်လွှတ်မှုနှင့် မန်မိုရီစီမံခန့်ခွဲမှု စသည်တို့ကို လုပ်ဆောင်သည်။ Windows, macOS, Linux, iOS, Android စသည်တို့ ဖြစ်သည်။\n\n**2. Applied software (application):**\nစာရွက်စာတမ်း ဖန်တီးခြင်း (Word)၊ ဇယားတွက်ချက်ခြင်း (Excel) နှင့် ဝက်ဘ်ဘရောက်ဇာများကဲ့သို့ သုံးစွဲသူများအတွက် သီးခြားရည်ရွယ်ချက်များ (အလုပ် သို့မဟုတ် ဖျော်ဖြေရေး) ကို ဆောင်ရွက်ပေးသည့် ဆော့ဖ်ဝဲဖြစ်သည်။\n\n**3. OSS (Open Source Software):**\n၎င်း၏ မူရင်းကုဒ် (source code) ကို အခမဲ့ လူသိရှင်ကြား ဖွင့်လှစ်ပေးထားပြီး မည်သူမဆို လွတ်လပ်စွာ အသုံးပြုခြင်း၊ မြှင့်တင်ခြင်းနှင့် ပြန်လည်ဖြန့်ဝေခြင်းတို့ ပြုလုပ်နိုင်သော ဆော့ဖ်ဝဲဖြစ်သည်။ လိုင်စင်စည်းမျဉ်းများကို လိုက်နာပါက စီးပွားရေးလုပ်ငန်းသုံးအဖြစ် အသုံးပြုနိုင်သည်။\n- **ထင်ရှားသော OSS များ**: Linux (OS), Apache (web server), MySQL/PostgreSQL (database), Android (mobile OS) စသည်တို့ ဖြစ်သည်။\n- **Non-OSS**: Windows, Microsoft Office (မူရင်းကုဒ်ကို ထုတ်ဖော်မပြထားသော စီးပွားဖြစ်လိုင်စင်သုံး ဆော့ဖ်ဝဲ)။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:22:en"
  };

  window.CONTENT_I18N["itpass:23"] = window.CONTENT_I18N["itpass:23"] || {};
  window.CONTENT_I18N["itpass:23"].my = {
    title: "2-02 File Management and Paths",
    concept: "OS သည် ဒေတာများကို **files** ဟုခေါ်သော ယူနစ်များဖြင့် စီမံခန့်ခွဲပြီး ဖိုင်များကို ခွဲခြားပေးသည့် ဖိုင်တွဲများကို **directories** ဟု ခေါ်သည်။ Directory တွင် အဆင့်ဆင့်ဖွဲ့စည်းပုံ (သစ်ပင်ပုံစံဖွဲ့စည်းပုံ - tree structure) ရှိသည်။\n\nဖိုင်တစ်ခု၏ တည်နေရာကို ပြသရန် ဖော်ပြချက် နှစ်မျိုး ရှိသည်-\n1. **Absolute path**: ထိပ်ဆုံးအလွှာရှိ root directory မှ စတင်၍ အားလုံးကို ရေးသားသည့် နည်းလမ်းဖြစ်သည်။\n2. **Relative path**: လက်ရှိ directory (current directory) မှ စတင်၍ ရေးသားသည့် နည်းလမ်းဖြစ်သည် (အဆင့်တစ်ဆင့် ပိုမြင့်သော လမ်းကြောင်းကို \"..\" ဖြင့် ပြသသည်)။\n\n**Points for IT beginners:**\nဤအပိုင်းသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ သော့ချက်စာလုံးများကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက ဆက်စပ်အသုံးအနှုန်းများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (ဥပမာများ) နှင့်အတူ စုစည်းမှတ်သားထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:23:en"
  };

  window.CONTENT_I18N["itpass:24"] = window.CONTENT_I18N["itpass:24"] || {};
  window.CONTENT_I18N["itpass:24"].my = {
    title: "2-03 Backup Strategies",
    concept: "ဒေတာများကို backup ပြုလုပ်ခြင်းဆိုသည်မှာ စက်ပစ္စည်းချို့ယွင်းခြင်း သို့မဟုတ် ဒေတာပျက်စီးခြင်းများ ဖြစ်ပေါ်လာပါက အသုံးပြုနိုင်ရန် ဒေတာကို နှစ်ထပ်သိုလှောင်ထားခြင်း ဖြစ်သည်။\n\n1. **Full Backup**: တစ်ကြိမ်ချင်းစီတွင် သတ်မှတ်ထားသော ဒေတာအားလုံးကို backup ပြုလုပ်သည်။ ပြန်လည်ဆယ်တင်မှု (recovery) သည် အမြန်ဆုံးဖြစ်သော်လည်း backup ပြုလုပ်ရန် အချိန်ယူရသည်။\n2. **Differential backup**: ပထမဆုံးအကြိမ် full backup ပြုလုပ်ပြီးနောက်ပိုင်း ပြောင်းလဲသွားသော ဒေတာများကိုသာ အမြဲတမ်း backup ပြုလုပ်သည်။\n3. **Incremental backup**: ယခင် backup ပြုလုပ်ခဲ့ပြီးနောက်ပိုင်း တိုးလာသော ဒေတာများကိုသာ backup ပြုလုပ်သည် (မည်သည့်အမျိုးအစား ဖြစ်စေကာမူ)။ Backup ပြုလုပ်ချိန် တိုတောင်းသော်လည်း ပြန်လည်ဆယ်တင်မှု (recovery) လုပ်ဆောင်ရန် ရှုပ်ထွေးသည်။\n\n**Points for IT beginners:**\nဤအပိုင်းသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ သော့ချက်စာလုံးများကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက ဆက်စပ်အသုံးအနှုန်းများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (ဥပမာများ) နှင့်အတူ စုစည်းမှတ်သားထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:24:en"
  };

  window.CONTENT_I18N["itpass:25"] = window.CONTENT_I18N["itpass:25"] || {};
  window.CONTENT_I18N["itpass:25"].my = {
    title: "2-04 Spreadsheets: Relative and Absolute References",
    concept: "Spreadsheet ဆော့ဖ်ဝဲများ (Excel စသည်) တွင် ပုံသေနည်းများကို အခြားဆဲလ် (cells) များသို့ ကူးယူသောအခါ (ဆွဲယူသည့်အခါ) ကိုးကားထားသော ဆဲလ်များ ရွေ့လျားမှုဆိုင်ရာ စည်းမျဉ်းများကို သတ်မှတ်သည်။\n\n1. **Relative reference**: ပုံသေနည်းကို ကူးယူသည့် လမ်းကြောင်းအတိုင်း ကိုးကားထားသော ဆဲလ်၏ တည်နေရာသည် အလိုအလျောက် လိုက်ပါရွေ့လျားသွားသည် (ဥပမာ `A1`)။\n2. **Absolute Reference**: ပုံသေနည်းကို မည်သည့်နေရာသို့ ကူးယူစေကာမူ သတ်မှတ်ထားသော ဆဲလ်တစ်ခုကိုသာ အမြဲတမ်း ကိုးကားသည်။ ကော်လံအမည် သို့မဟုတ် ရို(ဝ်)နံပါတ်၏ ရှေ့တွင် `$` ကို ထည့်သွင်းပေးရသည် (ဥပမာ `$A$1`)။\n\n**Points for IT beginners:**\nဤအပိုင်းသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ သော့ချက်စာလုံးများကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက ဆက်စပ်အသုံးအနှုန်းများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (ဥပမာများ) နှင့်အတူ စုစည်းမှတ်သားထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:25:en"
  };

  window.CONTENT_I18N["itpass:26"] = window.CONTENT_I18N["itpass:26"] || {};
  window.CONTENT_I18N["itpass:26"].my = {
    title: "2-05 Spreadsheets: Basic Functions",
    concept: "ဤလုပ်ဆောင်ချက် (functions) များသည် spreadsheet ဆော့ဖ်ဝဲကို အသုံးပြု၍ ရှုပ်ထွေးသော တွက်ချက်မှုများကို လည်ပတ်လုပ်ဆောင်နိုင်စေသည်။ IT Passport စာမေးပွဲတွင် မကြာခဏ ပါဝင်လေ့ရှိသော အခြေခံ functions များမှာ အောက်ပါအတိုင်း ဖြစ်သည်။\n\n- **SUM**: သတ်မှတ်ထားသော အကွာအဝေးအတွင်းရှိ ကိန်းဂဏန်းများ၏ ပေါင်းလဒ်ကို တွက်ချက်သည်။\n- **AVERAGE**: သတ်မှတ်ထားသော အကွာအဝေးအတွင်းရှိ ကိန်းဂဏန်းများ၏ ပျမ်းမျှတန်ဖိုးကို တွက်ချက်သည်။\n- **MAX / MIN**: သတ်မှတ်ထားသော အကွာအဝေးအတွင်း အကြီးဆုံးတန်ဖိုး / အငယ်ဆုံးတန်ဖိုးကို ရှာဖွေသည်။\n- **IF**: \"IF (အခြေအနေ၊ မှันကန်ပါက ရလဒ်၊ မှားယွင်းပါက ရလဒ်)\" သည် သတ်မှတ်ထားသော အခြေအနေနှင့် ကိုက်ညီခြင်း ရှိ/မရှိ အပေါ် မူတည်၍ ထုတ်ပေးမည့် ရလဒ်တန်ဖိုးကို ပြောင်းလဲပေးသည်။\n\n**Points for IT beginners:**\nဤအပိုင်းသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ သော့ချက်စာလုံးများကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက ဆက်စပ်အသုံးအနှုန်းများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (ဥပမာများ) နှင့်အတူ စုစည်းမှတ်သားထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:26:en"
  };

  window.CONTENT_I18N["itpass:27"] = window.CONTENT_I18N["itpass:27"] || {};
  window.CONTENT_I18N["itpass:27"].my = {
    title: "2-06 Spreadsheets: Advanced Functions",
    concept: "ဒေတာများကို လက်တွေ့ကျကျ ထုတ်ယူရန် အသုံးပြုသော အသုံးချလုပ်ဆောင်ချက် (functions) များ ဖြစ်ကြသည်။\n\n- **VLOOKUP**: သတ်မှတ်ထားသော ကီး (key) အပေါ် အခြေခံ၍ အခြားဇယားတစ်ခုကို ဒေါင်လိုက်ရှာဖွေပြီး ကိုက်ညီသော ရို(ဝ်)ရှိ သတ်မှတ်ဒေတာကို ထုတ်ယူသည်။ \"VLOOKUP(ရှာဖွေမည့်တန်ဖိုး၊ အကွာအဝေး၊ ကော်လံနံပါတ်၊ ရှာဖွေမှုစနစ်)\" စသည်ဖြင့် သတ်မှတ်သည်။\n- **HLOOKUP**: အခြားဇယားတစ်ခုကို အလျားလိုက် ရှာဖွေသည်။\n- **CONCAT (CONCATENATE)**: စာသားတန်း (strings) အများအပြားကို တစ်ခုတည်းအဖြစ် ပေါင်းစပ်သည်။\n\n**Points for IT beginners:**\nဤအပိုင်းသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ သော့ချက်စာလုံးများကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက ဆက်စပ်အသုံးအနှုန်းများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (ဥပမာများ) နှင့်အတူ စုစည်းမှတ်သားထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:27:en"
  };

  window.CONTENT_I18N["itpass:28"] = window.CONTENT_I18N["itpass:28"] || {};
  window.CONTENT_I18N["itpass:28"].my = {
    title: "2-08 User Interfaces (UI/UX)",
    concept: "အသုံးပြုသူ (user) နှင့် ကွန်ပျူတာအကြား အချက်အလက်များ ဖလှယ်ရန် စနစ်ဖြစ်သည်။\n\n1. **GUI**: အိုင်ကွန်များနှင့် မောက်စ်တို့ကို အသုံးပြု၍ မြင်ကွင်းအားဖြင့် လွယ်ကူစွာ လုပ်ဆောင်နိုင်သော အလိုလိုသိမြင်နိုင်သော လုပ်ငန်းခွင်မျက်နှာပြင် ဖြစ်သည်။\n2. **CUI**: ကီးဘုတ်မှတစ်ဆင့် စာသားညွှန်ကြားချက်များ (commands) ကို ရိုက်သွင်း၍ လုပ်ဆောင်သော မျက်နှာပြင် ဖြစ်သည်။\n3. **Related indicators**: **Usability** သည် အသုံးပြုရလွယ်ကူမှုကို ရည်ညွှန်းပြီး၊ **UX (User Experience)** သည် ထုတ်ကုန်တစ်ခုမှတစ်ဆင့် ရရှိလာသော အတွေ့အကြုံဆိုင်ရာ တန်ဖိုးကို ရည်ညွှန်းကာ၊ **Universal Design** သည် အသက်အရွယ် သို့မဟုတ် မသန်စွမ်းမှု ရှိ/မရှိ မရွေး မည်သူမဆို အသုံးပြုရလွယ်ကူစေရန် ဒီဇိုင်းဆွဲခြင်းကို ရည်ညွှန်းသည်။\n\n**Points for IT beginners:**\nဤအပိုင်းသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ သော့ချက်စာလုံးများကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက ဆက်စပ်အသုံးအနှုန်းများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (ဥပမာများ) နှင့်အတူ စုစည်းမှတ်သားထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:28:en"
  };

  window.CONTENT_I18N["itpass:29"] = window.CONTENT_I18N["itpass:29"] || {};
  window.CONTENT_I18N["itpass:29"].my = {
    title: "2-08 Multimedia",
    concept: "ပုံရိပ်များ၊ အော်ဒီယိုများနှင့် ဗီဒီယိုများကဲ့သို့သော မီဒီယာအမျိုးမျိုးကို ဒစ်ဂျစ်တယ်ဒေတာအဖြစ် ကိုင်တွယ်ဆောင်ရွက်သည့် နည်းပညာဖြစ်သည်။\n\n1. **Still image format**: **JPEG** (ဓာတ်ပုံများအတွက်၊ lossy compression - ဒေတာအချို့ဆုံးရှုံးသော ချုံ့စနစ်)၊ **PNG** (ပုံဖော်မှုများအတွက်၊ နောက်ခံအလင်းပေါက်နိုင်သော၊ lossless compression - ဒေတာမဆုံးရှုံးသော ချုံ့စနစ်)၊ **GIF** (အရောင် ၂၅၆ ရောင်၊ လှုပ်ရှားသက်ဝင်ပုံရိပ်များ ပြုလုပ်နိုင်သည်)။\n2. **Video format**: **MP4** (အင်တာနက်ဖြန့်ဝေမှုအတွက် ကျယ်ပြန့်စွာ လူကြိုက်များသည်)။\n3. **Audio format**: **MP3** (လူ့နားဖြင့် ကြားနိုင်ရန် ခက်ခဲသော အစိတ်အပိုင်းများကို ဖယ်ထုတ်၍ ချုံ့ထားသည်)၊ **MIDI** (တီးခတ်မှုအချက်အလက်နှင့် တေးသွားမှတ်စုဒေတာများကိုသာ မှတ်တမ်းတင်ထားပြီး အသံကိုယ်တိုင် ပါဝင်ခြင်းမရှိသော စံနှုန်းဖြစ်သည်)။\n\n**Points for IT beginners:**\nဤအပိုင်းသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ သော့ချက်စာလုံးများကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက ဆက်စပ်အသုံးအနှုန်းများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (ဥပမာများ) နှင့်အတူ စုစည်းမှတ်သားထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:29:en"
  };

  window.CONTENT_I18N["itpass:30"] = window.CONTENT_I18N["itpass:30"] || {};
  window.CONTENT_I18N["itpass:30"].my = {
    title: "3-01 System Architectures",
    concept: "၎င်းသည် စနစ်တစ်ခုကို တည်ဆောက် တပ်ဆင်ခြင်းနှင့် လည်ပတ်ခြင်းဆိုင်ရာ ပုံစံဖြစ်သည်။\n\n1. **Client-server system**: လုပ်ဆောင်ချက်ကို တောင်းဆိုသော \"client\" နှင့် လုပ်ဆောင်ချက်ကို ပံ့ပိုးပေးသော \"server\" ဟူ၍ ခွဲခြားထားသော စနစ်ဖွဲ့စည်းပုံ ဖြစ်သည်။\n2. **Cloud computing**: အင်တာနက်မှတစ်ဆင့် လိုအပ်သည့်အခါတွင်သာ virtual servers ကဲ့သို့သော အရင်းအမြစ်များကို အသုံးပြုသည့် ပုံစံဖြစ်သည်။ ဝန်ဆောင်မှုပေးသည့် ပုံစံများတွင် **SaaS** (ဆော့ဖ်ဝဲအက်ပ် ပံ့ပိုးမှု)၊ **PaaS** (ရေးဆွဲထုတ်လုပ်ရေး ပလက်ဖောင်း) နှင့် **IaaS** (virtual အခြေခံအဆောက်အအုံ) တို့ ပါဝင်သည်။\n3. **Grid computing**: ကွန်ရက်ပေါ်ရှိ ကွန်ပျူတာအမြောက်အမြားကို ချိတ်ဆက်ပြီး ၎င်းတို့ကို စွမ်းဆောင်ရည်အလွန်မြင့်မားသော virtual ကွန်ပျူတာတစ်ခုအနေဖြင့် လည်ပတ်စေသည့် ပုံစံဖြစ်သည်။\n\n**Points for IT beginners:**\nဤအပိုင်းသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ သော့ချက်စာလုံးများကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက ဆက်စပ်အသုံးအနှုန်းများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (ဥပမာများ) နှင့်အတူ စုစည်းမှတ်သားထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:30:en"
  };

  window.CONTENT_I18N["itpass:31"] = window.CONTENT_I18N["itpass:31"] || {};
  window.CONTENT_I18N["itpass:31"].my = {
    title: "3-02 High Availability Configurations",
    concept: "ယခုစနစ်သည် စနစ်၏ fault tolerance (အမှားဒဏ်ခံနိုင်ရည်) ကို တိုးမြှင့်ပေးသည့် configuration နည်းပညာဖြစ်သည်။\n\n1. **Duplex system**: လုပ်ငန်းသုံး production machine တစ်လုံးနှင့် အပို spare machine တစ်လုံးကို ပြင်ဆင်ထားခြင်း။ အရန် standby device ကို ချက်ချင်းအသုံးပြုနိုင်သည့် (standby) အခြေအနေကို **Hot Standby** ဟုခေါ်ပြီး၊ ပါဝါပိတ်ထားခြင်းကဲ့သို့သော ပြင်ဆင်မှုအခြေအနေကို **Cold Standby** ဟုခေါ်သည်။\n2. **Dual System**: ကွန်ပျူတာနှစ်လုံးသည် လုပ်ငန်းစဉ်တစ်ခုတည်းကို တစ်ချိန်တည်းတွင် အမြဲလုပ်ဆောင်ပြီး ရလဒ်များကို နှိုင်းယှဉ်စစ်ဆေးခြင်း။ ဘေးအကင်းဆုံးဖြစ်သော်လည်း ကုန်ကျစရိတ်များသည်။\n3. **RAID**: disk အမြောက်အမြား ပေါင်းစပ်သည့်နည်းပညာ။ **RAID 0** (striping - distributed writing ဖြင့် ပိုမိုမြန်ဆန်သော နှုန်းကိုရရှိစေပြီး fault tolerance မရှိပါ)၊ **RAID 1** (mirroring - ဒေတာတစ်ခုတည်းကို နှစ်ခါထပ်တူရေးသားခြင်း)၊ **RAID 5** (parity distributed recording စနစ်ဖြင့် မှတ်တမ်းတင်ခြင်း)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:31:en"
  };

  window.CONTENT_I18N["itpass:32"] = window.CONTENT_I18N["itpass:32"] || {};
  window.CONTENT_I18N["itpass:32"].my = {
    title: "3-03 System Reliability (Availability)",
    concept: "ယခုစနစ်သည် စနစ်များ ပြတ်တောက်မှုမရှိဘဲ ဆက်လက်လည်ပတ်နိုင်သည့် ရာခိုင်နှုန်းကို ပြသသည့် အကဲဖြတ်ညွှန်းကိန်းတစ်ခု ဖြစ်သည်။\n\n- **MTBF**: ပျမ်းမျှ ပျက်စီးမှုမရှိဘဲ လည်ပတ်ချိန် (ပျက်စီးမှုများအကြား လည်ပတ်ချိန်။ ပိုရှည်လေ ပိုကောင်းလေဖြစ်သည်)။\n- **MTTR**: ပျမ်းမျှ ပြင်ဆင်ချိန် (ပြင်ဆင်ရန် ကြာမြင့်ချိန်။ ပိုတိုလေ ပိုကောင်းလေဖြစ်သည်)။\n- **Operating rate (availability)**: စနစ်ပုံမှန်လည်ပတ်နေမည့် ဖြစ်နိုင်ခြေ။ ပုံသေနည်းမှာ -\n  `Operating rate = MTBF / (MTBF + MTTR)`\n- **Series connection**: device နှစ်ခုစလုံး အလုပ်လုပ်ရမည်။ စုစုပေါင်း utilization rate = `R1 × R2`\n- **Parallel connection**: တစ်ခုသာ အလုပ်လုပ်ရန် လိုအပ်သည်။ စုစုပေါင်း utilization = `1 - (1 - R1) × (1 - R2)`\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:32:en"
  };

  window.CONTENT_I18N["itpass:33"] = window.CONTENT_I18N["itpass:33"] || {};
  window.CONTENT_I18N["itpass:33"].my = {
    title: "3-04 System Performance Evaluation",
    concept: "ယခုစနစ်သည် စနစ်စွမ်းဆောင်ရည်ကို ဓမ္မဓိဋ္ဌာန်ကျကျ အကဲဖြတ်ရန် စံသတ်မှတ်ချက်တစ်ခု ဖြစ်သည်။\n\n1. **Response time**: အသုံးပြုသူမှ ညွှန်ကြားချက် ပေးပို့ချိန်မှစ၍ စနစ်မှ ပထမဆုံး တုံ့ပြန်မှု ပြန်လည်ပေးပို့ချိန်အထိ ကြာမြင့်ချိန်။\n2. **Throughput**: စနစ်တစ်ခုမှ standard unit time အတွင်း ပြီးမြောက်အောင် လုပ်ဆောင်နိုင်သည့် အလုပ်ပမာဏ (လုပ်ဆောင်နိုင်စွမ်းရည်)။\n3. **Benchmark test**: standard measurement program ကို run ပြီး စနစ်တစ်ခု၏ ထိရောက်သော အမြန်နှုန်းကို တိုင်းတာနှိုင်းယှဉ်သည့် စမ်းသပ်မှု။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:33:en"
  };

  window.CONTENT_I18N["itpass:34"] = window.CONTENT_I18N["itpass:34"] || {};
  window.CONTENT_I18N["itpass:34"].my = {
    title: "3-05 IoT and Embedded Systems",
    concept: "1. **Embedded system**: သတ်မှတ်ထားသော ထိန်းချုပ်မှုများကို လုပ်ဆောင်ရန် အိမ်သုံးလျှပ်စစ်ပစ္စည်းများ၊ မော်တော်ကားများ စသည်တို့တွင် ထည့်သွင်းတည်ဆောက်ထားသည့် သီးသန့်ကွန်ပျူတာစနစ်။ Real-time လုပ်ဆောင်နိုင်စွမ်း လိုအပ်သည်။\n2. **IoT system**: ပစ္စည်းများကို အင်တာနက်နှင့် ချိတ်ဆက်ပေးသည့် နည်းပညာ။ ၎င်းတွင် ရုပ်ပိုင်းဆိုင်ရာအချက်အလက်များကို ရှာဖွေဖော်ထုတ်ပေးသည့် **sensor** နှင့် ထိန်းချုပ်မှု signal ကို တုံ့ပြန်ရန် ရုပ်ပိုင်းဆိုင်ရာအရ အလုပ်လုပ်ဆောင်ပေးသည့် **actuator** တို့ ပါဝင်သည်။\nTerminal အနီးတွင် အခြေခံလုပ်ဆောင်မှုများကို လုပ်ဆောင်ခြင်းဖြင့် ဆက်သွယ်ရေးနှောင့်နှေးမှုများကို လျှော့ချပေးသည့် စနစ်ဖွဲ့စည်းပုံကို **edge computing** ဟုခေါ်သည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:34:en"
  };

  window.CONTENT_I18N["itpass:35"] = window.CONTENT_I18N["itpass:35"] || {};
  window.CONTENT_I18N["itpass:35"].my = {
    title: "3-06 IT Solutions and Outsourcing",
    concept: "ယခုစနစ်သည် လုပ်ငန်းပိုင်းဆိုင်ရာ စီမံခန့်ခွဲမှုပြဿနာများကို ဖြေရှင်းပေးသည့် IT ဝန်ဆောင်မှု ပုံစံတစ်ခု ဖြစ်သည်။\n\n1. **ASP (SaaS)**: Network မှတစ်ဆင့် application software များကို အသုံးပြုခွင့်ပေးသည့် ဝန်ဆောင်မှုပေးသူ။\n2. **System Integration (SI)**: စနစ်စီမံကိန်းရေးဆွဲခြင်း၊ တည်ဆောက်ခြင်း၊ အကောင်အထည်ဖော်ခြင်းနှင့် ထိန်းသိမ်းခြင်းတို့ကို စုပေါင်းလုပ်ဆောင်ပေးသည့် ဝန်ဆောင်မှု။\n3. **Housing (colocation)**: ကုမ္ပဏီတစ်ခုမှ ၎င်း၏ကိုယ်ပိုင် ဆက်သွယ်ရေးလိုင်းများနှင့် အဆောက်အဦးနေရာကို ငှားရမ်းပေးပြီး ဖောက်သည်များ၏ စက်ပစ္စည်းများကို ထားရှိပေးသည့် ဝန်ဆောင်မှု။ ဖောက်သည်သည် စက်ပစ္စည်းများကို ပိုင်ဆိုင်သည် (hosting တွင်မူ စက်ပစ္စည်းများကိုပါ ငှားရမ်းပေးခြင်းဖြစ်သည်)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:35:en"
  };

  window.CONTENT_I18N["itpass:36"] = window.CONTENT_I18N["itpass:36"] || {};
  window.CONTENT_I18N["itpass:36"].my = {
    title: "4-01 Network Devices and Topologies",
    concept: "ယခုစနစ်သည် ကွန်ရက်များကို ချိတ်ဆက်ပေးသည့် hardware စက်ပစ္စည်းများ၏ အခန်းကဏ္ဍ ဖြစ်သည်။\n\n1. **LAN / WAN**: သတ်မှတ်ထားသော နယ်မြေအတွင်းရှိ ကွန်ရက် (LAN) နှင့် အများသုံးလိုင်းများကို အသုံးပြုသည့် ကျယ်ပြန့်သော ကွန်ရက် (WAN)။\n2. **Hub (L2 switch)**: တူညီသော ကွန်ရက်အတွင်း MAC address အပေါ် အခြေခံ၍ ဒေတာများကို လက်ဆင့်ကမ်းပေးသည့် စက်ပစ္စည်း။\n3. **Router**: မတူညီသော ကွန်ရက်များကို (ဥပမာ - LAN နှင့် အင်တာနက်) ချိတ်ဆက်ပေးပြီး IP address အပေါ် အခြေခံ၍ အကောင်းဆုံးလမ်းကြောင်းသို့ ဒေတာများကို လက်ဆင့်ကမ်း (**routing**) ပေးသည့် စက်ပစ္စည်း။\n4. **Gateway**: မတူညီသော ဆက်သွယ်ရေး protocols များရှိသည့် ကွန်ရက်များကို ချိတ်ဆက်ပေးပြီး ดေတာများကို အပြန်အလှန် ပြောင်းလဲပေးသည့် စက်ပစ္စည်း။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:36:en"
  };

  window.CONTENT_I18N["itpass:37"] = window.CONTENT_I18N["itpass:37"] || {};
  window.CONTENT_I18N["itpass:37"].my = {
    title: "4-02 Wireless LAN (Wi-Fi)",
    concept: "ကြိုးများအသုံးမပြုဘဲ ချိတ်ဆက်ရန် ရေဒီယိုလှိုင်းများကို အသုံးပြုသည့် LAN။ Standard အမည်မှာ IEEE 802.11 ဖြစ်ပြီး၊ အများအားဖြင့် **Wi-Fi** ဟု သိကြသည်။\n\n1. **SSID**: ချိတ်ဆက်ရန် wireless access point ကို ခွဲခြားသတ်မှတ်သည့် အမည်။\n2. **Encryption Standard**: ရေဒီယိုလှိုင်းများ ဖြတ်တောက်ခံရမှုကြောင့် ဒေတာပေါက်ကြားမှုကို ကာကွယ်ရန် ဆက်သွယ်ရေးကို encryption ပြုလုပ်ထားခြင်း။ အားနည်းသော WEP ကို ယခုအခါ **WPA2** နှင့် နောက်ဆုံးပေါ် **WPA3** တို့ဖြင့် အစားထိုးလျက်ရှိသည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:37:en"
  };

  window.CONTENT_I18N["itpass:38"] = window.CONTENT_I18N["itpass:38"] || {};
  window.CONTENT_I18N["itpass:38"].my = {
    title: "4-03 Communication Protocols",
    concept: "ဤသည်မှာ ကွန်ပျူတာများ ကွန်ရက်မှတစ်ဆင့် အပြန်အလှန် ဆက်သွယ်ရန် \"ဘုံစည်းမျဉ်းများ\" ဖြစ်သည်။ ကိုယ်စားပြု standard မှာ **TCP/IP** ဖြစ်သည်။\n\n1. **TCP**: ဒေတာရောက်ရှိမှုကို စစ်ဆေးပြီး ပျောက်ဆုံးသွားသော packets များကို ပြန်လည်ပေးပို့သည့် ယုံကြည်စိတ်ချရသော \"connection-oriented\" protocol။\n2. **UDP**: အမြန်နှုန်းကို ဦးစားပေးပြီး ရောက်ရှိမှုကို အတည်မပြုဘဲ ဒေတာများကို တစ်ဖက်သတ် ဆက်တိုက်ပေးပို့သည့် \"connectionless\" protocol (real-time ဗီဒီယိုဖြန့်ဝေခြင်း စသည်တို့တွင် အသုံးပြုသည်)။\n3. **Port number**: application အမျိုးအစားကို ခွဲခြားသတ်မှတ်ရန် နံပါတ် (HTTP - နံပါတ် 80၊ HTTPS - နံပါတ် 443 စသည်)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:38:en"
  };

  window.CONTENT_I18N["itpass:39"] = window.CONTENT_I18N["itpass:39"] || {};
  window.CONTENT_I18N["itpass:39"].my = {
    title: "4-04 How the Internet Works",
    concept: "အင်တာနက်ပေါ်တွင် address သတ်မှတ်ခြင်းနှင့် name resolution (အမည်ဖြေရှင်းခြင်း) အတွက် ယန္တရား။\n\n1. **IP Address**: သင့်ကွန်ပျူတာ၏ အင်တာနက်လိပ်စာ။ 32-bit **IPv4** (လိပ်စာပြတ်လပ်မှုပြဿနာရှိသည်) နှင့် 128-bit **IPv6** တို့ရှိသည်။\n2. **DNS**: \"www.ipa.go.jp\" ကဲ့သို့သော domain name များနှင့် စက်များမှလုပ်ဆောင်သော \"210.146.x.x\" ကဲ့သို့သော IP address များကို အပြန်အလှန်ပြောင်းလဲပေးသည့် (name resolution) စနစ်။\n3. **DHCP**: ကွန်ရက်သို့ ချိတ်ဆက်သည့်အခါ စက်ပစ္စည်းတစ်ခုအား IP address တစ်ခု အလိုအလျောက် သတ်မှတ်ပေးသည့် protocol။\n4. **NAT (NAPT)**: private IP addresses နှင့် global IP addresses များကို အပြန်အလှန်ပြောင်းလဲပေးပြီး global address တစ်ခုတည်းဖြင့် စက်ပစ္စည်းအမြောက်အမြားကို အင်တာနက်သို့ ချိတ်ဆက်ပေးသည့် နည်းပညာ။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:39:en"
  };

  window.CONTENT_I18N["itpass:40"] = window.CONTENT_I18N["itpass:40"] || {};
  window.CONTENT_I18N["itpass:40"].my = {
    title: "4-05 Network Communication Services",
    concept: "ဤသည်မှာ အင်တာနက်သို့ ချိတ်ဆက်ရန် အခြေခံအဆောက်အအုံ လိုင်းဝန်ဆောင်မှု ဖြစ်သည်။\n\n1. **FTTH**: ဖိုင်ဘာအော့ပတစ်ကြိုးကို သင့်အိမ်အရောက် တိုက်ရိုက်သွယ်တန်းပေးသည့် အလွန်မြန်ဆန်သော ကြိုးဖုန်းဆက်သွယ်ရေးစနစ်။\n2. **VPN (Virtual Private Network)**: အများသုံး အင်တာနက်လိုင်းပေါ်တွင် လုံခြုံသောဥမင်လှိုင်ခေါင်း (tunnel) တစ်ခုပြုလုပ်ရန် encryption စသည့် နည်းပညာများကို အသုံးပြုပြီး သင့်ကုမ္ပဏီအတွက် သီးသန့်လိုင်းတစ်ခုကဲ့သို့ အသုံးပြုနိုင်အောင် ပြုလုပ်ပေးသည့် နည်းပညာ။\n3. **MVNO**: ကိုယ်ပိုင်လိုင်းကွန်ရက်မရှိဘဲ အခြားကုမ္ပဏီများထံမှ (major carriers) လိုင်းများကို ငှားရမ်း၍ သက်သာသော SIM ဆက်သွယ်ရေးဝန်ဆောင်မှုများကို ပေးဆောင်သည့် လုပ်ငန်းရှင်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:40:en"
  };

  window.CONTENT_I18N["itpass:41"] = window.CONTENT_I18N["itpass:41"] || {};
  window.CONTENT_I18N["itpass:41"].my = {
    title: "4-06 Web Page Technologies",
    concept: "Website များကို ကြည့်ရှုရန်နှင့် ဖန်တီးရန် နည်းပညာ။\n\n1. **HTML**: web page တစ်ခု၏ အခြေခံဖွဲ့စည်းပုံကို ဖော်ပြသည့် markup language။\n2. **HTTP / HTTPS**: web browser နှင့် web server အကြား ဒေတာဖလှယ်ရန် protocol။ HTTPS သည် ကြားဖြတ်နားထောင်ခြင်းကို ကာကွယ်ရန် ဆက်သွယ်ရေးပါဝင်ပစ္စည်းများကို (SSL/TLS ဖြင့်) encrypt လုပ်ပေးသည်။\n3. **Cookie**: အသုံးပြုသူကို ခွဲခြားသတ်မှတ်ခြင်း၊ login အခြေအနေ၊ ဈေးဝယ်ခြင်းလှည်း (cart) အချက်အလက် စသည်တို့ကို သိမ်းဆည်းရန် ဝဘ်ဆိုက်က browser ဘက်တွင် ယာယီသိမ်းဆည်းထားသည့် စာသားဒေတာ (text data)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:41:en"
  };

  window.CONTENT_I18N["itpass:42"] = window.CONTENT_I18N["itpass:42"] || {};
  window.CONTENT_I18N["itpass:42"].my = {
    title: "4-07 Email Protocols",
    concept: "အင်တာနက်ပေါ်တွင် အီးမေးလ်များ ပေးပို့ရန်နှင့် လက်ခံရန် protocols အုပ်စု။\n\n1. **SMTP**: email servers အချင်းချင်းအကြား အီးမေးလ် ပေးပို့ရန်နှင့် လွှဲပြောင်းရန် protocol။\n2. **POP3**: email server သို့ ရောက်ရှိလာသော သင့်ထံလိပ်စာတပ်ထားသည့် အီးမေးလ်များကို သင့် PC သို့မဟုတ် အခြား terminal သို့ download ပြုလုပ်ပြီး စီမံခန့်ခွဲသည့် protocol (ပုံမှန်အားဖြင့်၊ ၎င်းတို့ကို download လုပ်ပြီးနောက် server မှ ဖျက်ပစ်ပါသည်)။\n3. **IMAP**: အီးမေးလ်များကို သင့်ကိုယ်ပိုင် device သို့ download လုပ်ရန်မလိုဘဲ mail server ပေါ်တွင် တိုက်ရိုက်ဖတ်ရှုခြင်း၊ ရေးသားခြင်းနှင့် folders များကို စီမံခန့်ခွဲခြင်းပြုနိုင်သည့် protocol (devices အမြောက်အမြားတွင် တပြိုင်တည်း synchronized လုပ်နိုင်သည်)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:42:en"
  };

  window.CONTENT_I18N["itpass:43"] = window.CONTENT_I18N["itpass:43"] || {};
  window.CONTENT_I18N["itpass:43"].my = {
    title: "5-01 Security Triad and Threats",
    concept: "1. **Information Security ၏ အခြေခံအချက် ၃ ချက် (CIA)**:\n   - **Confidentiality**: ခွင့်ပြုချက်ရရှိထားသူများသာ အချက်အလက်များကို ဝင်ရောက်ကြည့်ရှုနိုင်သည်။\n   - **Integrity**: အချက်အလက်များ ပြုပြင်မွမ်းမံခံရခြင်းမရှိဘဲ တိကျမှန်ကန်မှုရှိသည်။\n   - **Availability**: အချက်အလက်များ လိုအပ်သည့်အချိန်တိုင်း အသုံးပြုနိုင်သည်။\n2. **အဓိက Malware များ**:\n   - **Ransomware**: ခွင့်ပြုချက်မရှိဘဲ ဒေတာများကို encrypt လုပ်ပြီး ငွေညှစ်ခြင်း။\n   - **Trojan Horse**: အသုံးဝင်သော app တစ်ခုအဖြစ် ဟန်ဆောင်ပြီး နောက်ကွယ်မှ မသမာမှုများ လုပ်ဆောင်ခြင်း။\n   - **Worm**: network မှတစ်ဆင့် ကိုယ်တိုင်ပွားများပြီး ပျံ့နှံ့စေခြင်း။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:43:en"
  };

  window.CONTENT_I18N["itpass:44"] = window.CONTENT_I18N["itpass:44"] || {};
  window.CONTENT_I18N["itpass:44"].my = {
    title: "5-02 Common Cyberattacks",
    concept: "ဤသည်မှာ မသမာသူ တတိယလူတစ်ဦးမှ အသုံးပြုသည့် ကွန်ရက်တိုက်ခိုက်မှု နည်းလမ်းဖြစ်သည်။\n\n1. **DoS (DDoS) attack**: server တစ်ခုအား overload ဖြစ်စေရန်နှင့် ဝန်ဆောင်မှုမပေးနိုင်အောင် ပြုလုပ်ရန် တောင်းဆိုမှု (requests) အမြောက်အမြား ပေးပို့တိုက်ခိုက်ခြင်း။\n2. **SQL injection**: website တစ်ခု၏ input field တွင် မသမာသော SQL code ကို ရေးသွင်းခြင်းဖြင့် database ကို မသမာသောနည်းလမ်းဖြင့် လှည့်ဖြားထိန်းချုပ်တိုက်ခိုက်ခြင်း။\n3. **Cross-site scripting (XSS)**: အားနည်းချက်ရှိသော website တစ်ခုတွင် မသမာသော script တစ်ခုကို ထည့်သွင်းပြီး၊ ၎င်းကို ကြည့်ရှုသည့် တတိယလူ၏ browser ပေါ်တွင် cookies နှင့် အခြားအချက်အလက်များကို ခိုးယူရန် run စေသည့် တိုက်ခိုက်မှု။\n4. **Phishing**: ဘဏ်စသည်တို့မှ ဖြစ်ဟန်ဆောင်ကာ အီးမေးလ်အတုများ ပေးပို့ပြီး တကယ့် website နှင့် တထပ်တည်းတူသော website အတုသို့ လမ်းညွှန်ကာ ကိုယ်ရေးအချက်အလက်များကို လှည့်ဖြားတောင်းယူခြင်း။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:44:en"
  };

  window.CONTENT_I18N["itpass:45"] = window.CONTENT_I18N["itpass:45"] || {};
  window.CONTENT_I18N["itpass:45"].my = {
    title: "5-03 Information Security Management",
    concept: "အဖွဲ့အစည်းတစ်ခုမှ အချက်အလက်လုံခြုံရေးကို စနစ်တကျ ထိန်းသိမ်းမြှင့်တင်ပေးသည့် စနစ်။ ကိုယ်စားပြု standard ကို **ISMS (Information Security Management System)** ဟုခေါ်သည်။\n\nကျွန်ုပ်တို့သည် အဖွဲ့အစည်းအတွင်း အမြင့်ဆုံးလုံခြုံရေးစံဖြစ်သည့် **Information Security Policy** ကို ရေးဆွဲပြီး၊ တိကျသော ကျင့်ဝတ်စည်းကမ်းများဖြစ်သည့် \"Information Security Measures Standards\" ကို သတ်မှတ်ကြသည်။ စီမံခန့်ခွဲမှုလုပ်ငန်းများကို PDCA cycle (Plan -> Do -> Check -> Act) အရ အမြဲမပြတ် မြှင့်တင်သွားမည်ဖြစ်သည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:45:en"
  };

  window.CONTENT_I18N["itpass:46"] = window.CONTENT_I18N["itpass:46"] || {};
  window.CONTENT_I18N["itpass:46"].my = {
    title: "5-04 Risk Management",
    concept: "ဤသည်မှာ စွန့်စားရမှု (risks) များကို ရှာဖွေဖော်ထုတ်ခြင်း၊ ခွဲခြမ်းစိတ်ဖြာခြင်းနှင့် သင့်လျော်သော တုံ့ပြန်ဆောင်ရွက်မှုများကို ရွေးချယ်ခြင်း လုပ်ငန်းစဉ်ဖြစ်သည်။\n\n1. **Risk avoidance**: စွန့်စားရမှုရှိသော လုပ်ငန်းဆောင်ရွက်မှုများကို ကိုယ်တိုင်လုံးဝ ရှောင်ရှားခြင်း။\n2. **Risk reduction**: security software များအသုံးပြုခြင်းနှင့် ပညာပေးခြင်းတို့မှတစ်ဆင့် ပျက်စီးနိုင်ခြေနှင့် သက်ရောက်မှုများကို လျှော့ချခြင်း။\n3. **Risk Transfer**: စွန့်စားရမှုကို အခြားသူထံ လွှဲပြောင်းခြင်း (ဥပမာ - အာမခံထားရှိခြင်း၊ စနစ်ကို အပြင်သို့ အပ်နှံလုပ်ဆောင်စေခြင်း)။\n4. **Risk acceptance (retention)**: တုံ့ပြန်ဆောင်ရွက်မှုစရိတ်သည် ပိုမိုမြင့်မားနေသောကြောင့် စွန့်စားရမှုကို ရှိရင်းစွဲအတိုင်း လက်ခံထားခြင်း။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:46:en"
  };

  window.CONTENT_I18N["itpass:47"] = window.CONTENT_I18N["itpass:47"] || {};
  window.CONTENT_I18N["itpass:47"].my = {
    title: "5-05 User Authentication",
    concept: "ဤသည်မှာ စနစ်အတွင်းသို့ ဝင်ရောက်ရန် ကြိုးပမ်းနေသူသည် ၎င်းပြောကြားသည့်လူ စစ်မှန်ကြောင်း အတည်ပြုပေးသည့် နည်းပညာဖြစ်သည်။\n\n1. **Authentication ၏ အချက် ၃ ချက်**: **Knowledge** (လူကိုယ်တိုင်သိရှိသောအရာ - password)၊ **Possession** (လူကိုယ်တိုင်ပိုင်ဆိုင်သောအရာ - IC card၊ one-time password token)၊ **Biometric information** (လူ၏ ရုပ်ပိုင်းဆိုင်ရာ အင်္ဂါရပ်များ - လက်ဗွေ၊ မျက်နှာ၊ သွေးကြောလှိုင်း)။ ၎င်းတို့အနက် နှစ်ခု သို့မဟုတ် နှစ်ခုထက်ပို၍ ပေါင်းစပ်အသုံးပြုခြင်းကို **multi-factor authentication** ဟုခေါ်သည်။\n2. **Single Sign-On (SSO)**: စနစ်တစ်ခုတည်းတွင် authentication လုပ်ရုံဖြင့် ဆက်စပ်နေသော စနစ်များနှင့် ဝန်ဆောင်မှုအမြောက်အမြားသို့ အလိုအလျောက် ဝင်ရောက်နိုင်စေသည့် ယန္တရား။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:47:en"
  };

  window.CONTENT_I18N["itpass:48"] = window.CONTENT_I18N["itpass:48"] || {};
  window.CONTENT_I18N["itpass:48"].my = {
    title: "5-06 Network Security",
    concept: "ဤသည်မှာ ပြင်ပကွန်ရက်များမှ တိုက်ခိုက်မှုများကို ကာကွယ်ရန် ခုခံကာကွယ်မှု လုပ်ဆောင်ချက် ဖြစ်သည်။\n\n1. **Firewall**: ဆက်သွယ်ရေး packets များ၏ IP address နှင့် port number ကို စစ်ဆေးပြီး မသင့်လျော်သော ဆက်သွယ်ရေးများကို တားဆီးပေးသည့် အတားအဆီး။\n2. **DMZ (Demilitarized Zone)**: ပြင်ပသို့ ထုတ်ပြန်ပေးမည့် server များ (web, email စသည်) ကို ထားရှိရန် အတွင်း LAN (လုံခြုံမှုရှိသည်) နှင့် အင်တာနက် (အန္တရာယ်ရှိသည်) တို့အကြား သီးခြားခွဲထုတ်ထားသည့် နယ်မြေ။\n3. **WAF**: web applications များအတွင်းသို့ SQL injection ကဲ့သို့သော အားနည်းချက်တိုက်ခိုက်မှုများကို ကာကွယ်ရန် packets များ၏ (HTTP data အပိုင်း) ပါဝင်ပစ္စည်းများကို စစ်ဆေးသည့် firewall တစ်မျိုး။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:48:en"
  };

  window.CONTENT_I18N["itpass:49"] = window.CONTENT_I18N["itpass:49"] || {};
  window.CONTENT_I18N["itpass:49"].my = {
    title: "5-07 Encryption Technologies",
    concept: "ဤသည်မှာ တတိယလူတစ်ဦးမှ ကြားဖြတ်ဖမ်းယူခဲ့လျှင်ပင် ဒေတာများကို ဖတ်ရှု၍မရနိုင်စေရန် ပြောင်းလဲပေးသည့် နည်းပညာဖြစ်သည်။\n\n1. **Common key cryptography**: encrypt လုပ်ရန်နှင့် decrypt လုပ်ရန် တူညီသော သော့ (key) ကို အသုံးပြုသည်။ လုပ်ဆောင်မှုမြန်ဆန်သော်လည်း key ဖြန့်ဝေမှု ပြဿနာရှိသည် (ဆက်သွယ်ဖက်ထံသို့ key ကို လုံခြုံစွာ ပေးပို့ရန် ခက်ခဲခြင်း) (အဓိက ဥပမာ - **AES**)။\n2. **Public key cryptography**: မည်သူမဆို အသုံးပြုနိုင်သော \"public key\" နှင့် အသုံးပြုသူကိုယ်တိုင်သာ ပိုင်ဆိုင်သော \"private key\" အတွဲကို အသုံးပြုသည်။ key ဖြန့်ဝေမှု ပြဿနာမရှိသော်လည်း လုပ်ဆောင်မှု နှေးကွေးသည်။ **လက်ခံမည့်သူ၏ public key** ဖြင့် encrypt လုပ်ပြီး၊ **လက်ခံမည့်သူ၏ private key** ဖြင့် decrypt လုပ်သည် (အဓိက ဥပမာ - **RSA**)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:49:en"
  };

  window.CONTENT_I18N["itpass:50"] = window.CONTENT_I18N["itpass:50"] || {};
  window.CONTENT_I18N["itpass:50"].my = {
    title: "5-08 Digital Signatures and Certificate Authorities",
    concept: "ဤသည်မှာ ပေးပို့သူကို သက်သေပြပြီး အချက်အလက်ပြင်ဆင်မှုကို ကာကွယ်သည့် နည်းပညာဖြစ်သည်။\n\n1. **Electronic signature (digital signature)**: ပေးပို့သူသည် ဒေတာမှ hash တန်ဖိုးကို တွက်ချက်ပြီး **ပေးပို့သူ၏ private key** ဖြင့် encrypt လုပ် (လက်မှတ်ထိုး) သည် ။ လက်ခံသူသည် ပေးပို့သူ၏ public key ဖြင့် decrypt လုပ်ပြီး စစ်ဆေးသည်။ ၎င်းသည် \"ပေးပို့သူအတုအယောင်ဖြစ်ခြင်းကို ကာကွယ်ခြင်း\" နှင့် \"ဒေတာပြင်ဆင်မှုအား သိရှိခြင်း (integrity သက်သေပြချက်)\" တို့ကို ဖြစ်စေသည်။\n2. **Certificate Authority (CA)**: public key သည် သက်ဆိုင်ရာပုဂ္ဂိုလ်၏ ပိုင်ဆိုင်မှုဖြစ်ကြောင်း အတည်ပြုပေးသည့် \"digital certificate\" ကို ထုတ်ပေးသော တတိယအဖွဲ့အစည်း။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:50:en"
  };

  window.CONTENT_I18N["itpass:51"] = window.CONTENT_I18N["itpass:51"] || {};
  window.CONTENT_I18N["itpass:51"].my = {
    title: "6-01 Databases and SQL Basics",
    concept: "အချက်အလက်အမြောက်အမြားကို ထပ်နေခြင်းမရှိဘဲ စနစ်တကျနှင့် ထိရောက်စွာ စီမံခန့်ခွဲပေးသည့် စနစ်ကို **DBMS (database management system)** ဟုခေါ်ပြီး၊ လက်ရှိတွင် table ပုံစံဖြင့် ဒေတာများကို ကိုင်တွယ်သည့် **relational database (RDB)** သည် အဓိကဖြစ်သည် ။\n\nဒေတာများ ကိုင်တွယ်အသုံးပြုရန် standard language ဖြစ်သော **SQL** တွင် အောက်ပါအဓိက syntax များရှိသည် -\n- **SELECT**: ဒေတာများကို ထုတ်ယူခြင်း (ကိုးကားခြင်း)\n- **INSERT**: ဒေတာအသစ်ထည့်ခြင်း\n- **UPDATE**: ဒေတာပြင်ဆင်ခြင်း\n- **DELETE**: ဒေတာဖျက်ခြင်း\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:51:en"
  };

  window.CONTENT_I18N["itpass:52"] = window.CONTENT_I18N["itpass:52"] || {};
  window.CONTENT_I18N["itpass:52"].my = {
    title: "6-02 Database Design and ER Models",
    concept: "ဤသည်မှာ database တည်ဆောက်ရန် ဒီဇိုင်းရေးဆွဲခြင်း လုပ်ငန်းစဉ် ဖြစ်သည်။ လက်တွေ့ကမ္ဘာရှိ ဒေတာဖွဲ့စည်းပုံများကို စနစ်တကျစုစည်းရန် နည်းလမ်းတစ်ခုအဖြစ် **E-R diagram** ကို အသုံးပြုသည်။\n\n1. **Entity**: စီမံခန့်ခွဲမည့်အရာ (ဥပမာ - \"customer\", \"product\")။ စတုဂံပုံဖြင့် ဖော်ပြသည်။\n2. **Relationship**: entity များအကြား ဆက်စပ်မှု (ဥပမာ - \"buy\")။ ၎င်းတို့ကို lines များဖြင့် ချိတ်ဆက်ပြီး one-to-many relationship (cardinality) ကို ပြသသည်။\n3. **Key**: record တစ်ခုစီကို သီးခြားခွဲခြားသတ်မှတ်နိုင်သော **Primary Key** နှင့် အခြား tables များနှင့် ချိတ်ဆက်ပေးသော **Foreign Key** ကို သတ်မှတ်သည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:52:en"
  };

  window.CONTENT_I18N["itpass:53"] = window.CONTENT_I18N["itpass:53"] || {};
  window.CONTENT_I18N["itpass:53"].my = {
    title: "6-03 Database Normalization",
    concept: "ဒေတာညီညွတ်မှုမရှိသော အမှားများ (inconsistencies) ကို ကာကွယ်ရန် tables များကို ခွဲခြားခြင်းနှင့် ဒေတာထပ်နေမှုများကို ဖယ်ရှားခြင်း လုပ်ငန်းစဉ် ဖြစ်သည်။\n\n1. **First normalization**: table ၏ cells များအတွင်းရှိ တန်ဖိုးအမြောက်အမြားရှိနေခြင်းကို ဖယ်ရှားပြီး တန်ဖိုးတစ်ခုတည်း (atomic value) သို့ လျှော့ချခြင်း။\n2. **Second normalization**: primary key တွင် columns အမြောက်အမြားရှိနေသည့်အခါ (composite key)၊ primary key ၏ တစ်စိတ်တစ်ပိုင်းအပေါ်၌သာ မှီခိုနေသော အရာများကို သီးခြား table တစ်ခုအဖြစ် ခွဲထုတ်ခြင်း (partial function dependencies ကို ဖယ်ရှားခြင်း)။\n3. **Third normalization**: primary key မဟုတ်သော အခြားအရာများအပေါ် မှီခိုနေသော အရာများကို သီးခြား table တစ်ခုအဖြစ် ခွဲထုတ်ခြင်း (transitive function dependencies ကို ဖယ်ရှားခြင်း)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:53:en"
  };

  window.CONTENT_I18N["itpass:54"] = window.CONTENT_I18N["itpass:54"] || {};
  window.CONTENT_I18N["itpass:54"].my = {
    title: "6-04 SQL Data Filtering and Logic",
    concept: "ရှုပ်ထွေးသော သတ်မှတ်ချက်များဖြင့် ဒေတာများကို စစ်ထုတ်ရန် SQL ၏ `WHERE` clause ကို အသုံးပြုသည်။\n\n- **AND**: ဘယ်နှင့်ညာ သတ်မှတ်ချက်နှစ်ခုစလုံး \"true\" (မှန်ကန်) သည့်အခါမှသာ ဒေတာများကို ထုတ်ယူသည်။\n- **OR**: ဘယ် သို့မဟုတ် ညာ သတ်မှတ်ချက်တစ်ခုခု \"true\" (မှန်ကန်) သည့်အခါ ဒေတာများကို ထုတ်ယူသည်။\n- **NOT**: သတ်မှတ်ထားသော အခြေအနေ၏ \"true\" နှင့် \"false\" ကို ပြောင်းပြန်လှန်သည်။\nဦးစားပေးလုပ်ဆောင်မှု အစီအစဉ်မှာ `NOT` > `AND` > `OR` ဖြစ်သည်။ လက်သည်းကွင်း `( )` ကို အသုံးပြုခြင်းသည် ကွင်းအတွင်းရှိ လုပ်ဆောင်မှုကို ဦးစားပေးအဆင့် အမြင့်ဆုံး ဖြစ်စေသည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:54:en"
  };

  window.CONTENT_I18N["itpass:55"] = window.CONTENT_I18N["itpass:55"] || {};
  window.CONTENT_I18N["itpass:55"].my = {
    title: "6-05 SQL Sorting and Aggregation",
    concept: "ဤသည်မှာ ရရှိလာသော ရလဒ်များကို စီရန်နှင့် ၎င်းတို့ကို အုပ်စုအလိုက် ပေါင်းစည်းရန် syntax ဖြစ်သည်။\n\n1. **ORDER BY**: ရလဒ်များကို စီရန်။ **ASC** (အသေးဆုံးမှ အကြီးသို့ စီခြင်း) သို့မဟုတ် **DESC** (အကြီးဆုံးမှ အသေးသို့ စီခြင်း) ကို သတ်မှတ်သည်။\n2. **GROUP BY**: သတ်မှတ်ထားသော column တွင် တူညီသောတန်ဖိုးရှိသည့် records များကို စုစည်းပေးသည်။\n3. **Aggregation functions**: **SUM** (စုစုပေါင်း)၊ **AVG** (ပျမ်းမျှ)၊ **COUNT** (row အရေအတွက်)၊ **MAX** / **MIN** စသည်တို့ကို ပေါင်းစပ်အသုံးပြုသည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:55:en"
  };

  window.CONTENT_I18N["itpass:56"] = window.CONTENT_I18N["itpass:56"] || {};
  window.CONTENT_I18N["itpass:56"].my = {
    title: "6-06 Transaction Processing and ACID",
    concept: "database တစ်ခုအတွင်းရှိ တစ်ပြိုင်နက်တည်း လုပ်ဆောင်သော လုပ်ငန်းစဉ်အတွဲများကို transaction ဟုခေါ်သည်။ transaction များ လိုက်နာရမည့် ဂုဏ်သတ္တိများမှာ **ACID characteristics** ဖြစ်သည်။\n\n- **A (Atomic)**: လုပ်ဆောင်ချက်အားလုံး ပြီးမြောက်ခြင်း သို့မဟုတ် လုံးဝမလုပ်ဆောင်ခြင်း နှစ်မျိုးထဲမှ တစ်ခုဖြင့်သာ ပြီးဆုံးသည်။\n- **C (Consistency)**: လုပ်ဆောင်ချက်မတိုင်မီနှင့် လုပ်ဆောင်ပြီးနောက်တွင် ဒေတာညီညွတ်မှုမရှိခြင်း (data inconsistency) ဖြစ်ပေါ်ခြင်းမရှိပါ။\n- **I (Independence/Isolation)**: လုပ်ငန်းစဉ်အမြောက်အမြားကို တစ်ချိန်တည်းတွင် လုပ်ဆောင်လျှင်ပင် ၎င်းတို့သည် အချင်းချင်း နှောင့်ယှက်မှုမရှိစေပါ။\n- **D (Durability)**: စနစ်ချို့ယွင်းမှု ဖြစ်ပေါ်ခဲ့လျှင်ပင် ပြီးမြောက်သွားသော လုပ်ဆောင်ချက်ရလဒ်များ ပျောက်ဆုံးသွားခြင်း မရှိပါ။\nတစ်ပြိုင်နက် လုပ်ဆောင်စဉ်အတွင်း ဒေတာတိုက်မိမှုများကို တားဆီးရန် **Lock** (exclusive control) ကို လုပ်ဆောင်သည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:56:en"
  };

  window.CONTENT_I18N["itpass:57"] = window.CONTENT_I18N["itpass:57"] || {};
  window.CONTENT_I18N["itpass:57"].my = {
    title: "7-01 Algorithms and Data Structures",
    concept: "1. **Algorithm**: သတ်မှတ်ထားသော ပြဿနာတစ်ခုကို ဖြေရှင်းရန် ရှင်းလင်းသော လုပ်ငန်းစဉ်။ ဖော်ပြရန် **Flowchart** စသည်တို့ကို အသုံးပြုသည်။ အဓိကဥပမာများတွင် **linear search**၊ **binary search** နှင့် **bubble sort** တို့ ပါဝင်သည်။\n2. **Data structure**: memory ထဲတွင် ဒေတာများကို ထိရောက်စွာ ကိုင်တွယ်အသုံးပြုနိုင်သည့် ဖွဲ့စည်းပုံ။ အမျိုးအစား နှစ်ခုရှိသည် - **Stack** (LIFO - last in, first out; ပန်းကန်များ ထပ်ထားသည့် ပုံရိပ်) နှင့် **Queue** (FIFO - first in, first out; ငွေရှင်းကောင်တာတွင် တန်းစီနေသည့် ပုံရိပ်)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:57:en"
  };

  window.CONTENT_I18N["itpass:58"] = window.CONTENT_I18N["itpass:58"] || {};
  window.CONTENT_I18N["itpass:58"].my = {
    title: "7-02 Pseudo-language",
    concept: "ဤသည်မှာ IT Passport စာမေးပွဲတွင် တွေ့ရလေ့ရှိသော ပရိုဂရမ်များအတွက် ဘုံသင်္ကေတစံတစ်ခု ဖြစ်သည်။ ၎င်းသည် အခြေခံ control structures ၃ ခု (sequential၊ selection နှင့် repetition) ကို ပေါင်းစပ်ထားသည်။\n\n- **Variable**: ဒေတာများကို ယာယီသိမ်းဆည်းရန် ဘူးတစ်ခု။\n- **Array**: ဆက်တိုက် စီစဉ်ထားသော ဒေတာအမြောက်အမြား (index နံပါတ်ဖြင့် သတ်မှတ်သည်)။ subscript စတင်ပုံကို သတိပြုပါ (0 မှ စတင်သလား သို့မဟုတ် 1 မှ စတင်သလား)။\n- **Iteration**: loop ပြီးဆုံးမည့် သတ်မှတ်ချက် ပြည့်မီသောအခါ loop မှ ထွက်သည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:58:en"
  };

  window.CONTENT_I18N["itpass:59"] = window.CONTENT_I18N["itpass:59"] || {};
  window.CONTENT_I18N["itpass:59"].my = {
    title: "7-03 Programming and Markup Languages",
    concept: "၎င်းသည် စနစ်များနှင့် ဝက်ဘ်စာမျက်နှာများကို ဖန်တီးရန် ဘာသာစကား ဖြစ်သည်။\n\n1. **Programming languages**: **Java** (OS ပေါ်တွင် မှီခိုမှုမရှိဘဲ လည်ပတ်သည်)၊ **Python** (AI တည်ဆောက်ရေးနှင့် data analysis အတွက် အဓိကအသုံးပြုပြီး syntax ရိုးရှင်းသည်)၊ **C language** (အမြန်နှုန်းမြင့်မားပြီး hardware ကို ထိန်းချုပ်နိုင်သည်)။\n2. **Compiler and interpreter**: source ကို စက်ဘာသာစကား (machine language) သို့ ပြောင်းလဲပြီးမှ run သည့်စနစ် (compiler) နှင့် တစ်ကြောင်းချင်း ဘာသာပြန်ရင်း run သည့်စနစ် (interpreter)။\n3. **Markup language**: tags များဖြင့် ဝန်းရံခြင်းဖြင့် ဒေတာများကို ဖွဲ့စည်းတည်ဆောက်ပေးသော ဘာသာစကား။ **HTML** (web display အတွက်)၊ **XML** (အသုံးပြုသူများ ကိုယ်ပိုင် tags များ သတ်မှတ်နိုင်ပြီး ဒေတာဖလှယ်ရန် အသုံးပြုသည်)။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:59:en"
  };

  window.CONTENT_I18N["itpass:60"] = window.CONTENT_I18N["itpass:60"] || {};
  window.CONTENT_I18N["itpass:60"].my = {
    title: "8-01 Planning and Requirements Definition",
    concept: "ဤသည်မှာ စနစ်တည်ဆောက်ခြင်းလုပ်ငန်း (system development) ၏ ပထမဆုံးအဆင့် ဖြစ်သည်။\n\n1. **System planning process**: စီမံခန့်ခွဲမှု မဟာဗျူဟာအပေါ် အခြေခံ၍ စနစ်ဖွဲ့စည်းမှုဆိုင်ရာ သဘောတရားကို ဖော်ထုတ်ခြင်း။\n2. **Requirements definition process**: စနစ်အတွက် လိုအပ်သော လုပ်ဆောင်ချက်များ၊ စွမ်းဆောင်ရည်နှင့် လုံခြုံရေးစံနှုန်းများကို ရှင်းလင်းစွာ သတ်မှတ်ပြီး အသုံးပြုသူများနှင့် သဘောတူညီမှု ရယူခြင်းလုပ်ငန်းစဉ် (အရေးကြီးဆုံးဖြစ်သည်)။\n3. **RFP (Request for Proposal)**: အပ်နှံသည့်ဘက်မှ (ကုမ္ပဏီ) စနစ်တည်ဆောက်ရေးအတွက် သီးသန့် အဆိုပြုလွှာ (proposal) ရေးဆွဲပေးရန် developer (IT ကုမ္ပဏီ) ထံ တောင်းဆိုသည့် စာရွက်စာတမ်း။ RFP ကို တင်ပြခြင်းဖြင့် မျှတပြီး တိကျသော developer ရွေးချယ်မှုကို ပြုလုပ်နိုင်သည်။\n\n**IT အစပြုသူများအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keywords များကို အဓိပ္ပာယ်ဖွင့်ရုံသာမက၊ လက်တွေ့အသုံးပြုမှု scenarios (ဥပမာများ) နှင့်အတူ သက်ဆိုင်ရာ terms များကို စနစ်တကျ စုစည်းထားရန် ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:60:en"
  };

  window.CONTENT_I18N["itpass:61"] = window.CONTENT_I18N["itpass:61"] || {};
  window.CONTENT_I18N["itpass:61"].my = {
    title: "8-02 ဖွံ့ဖြိုးတိုးတက်မှု လုပ်ငန်းစဉ် (Development Process)",
    concept: "၎င်းသည် စနစ်အား တည်ဆောက်ခြင်းနှင့် စစ်ဆေးခြင်း လုပ်ငန်းစဉ် (SLCP) ဖြစ်သည်။\n\n1. **Design** - လိုအပ်ချက်များအပေါ် အခြေခံ၍ မျက်နှာပြင်များနှင့် ဒေတာပုံစံများကို ဆုံးဖြတ်ခြင်း ဖြစ်သည်။ အသုံးပြုသူများ မြင်တွေ့နိုင်သည့်အရာကို ဆုံးဖြတ်ပေးသော \"external design\" နှင့် developer များအတွက် \"internal design\" ဟု ရှိသည်။\n2. **Test အမျိုးအစားများနှင့် အစီအစဉ်များ** -\n   - **Unit test** - ပရိုဂရမ်တစ်ခု၏ အသေးဆုံး အစိတ်အပိုင်းယူနစ် (module) အပေါ်တွင် စမ်းသပ်စစ်ဆေးခြင်း ဖြစ်သည်။\n   - **Integration test** - အစိတ်အပိုင်းအများအပြားကို ချိတ်ဆက်ခြင်းဖြင့် interface ကို စစ်ဆေးသည့် စမ်းသပ်မှု ဖြစ်သည်။\n   - **System testing** - developer မှ လုပ်ဆောင်ချက်အားလုံးကို ပေါင်းစည်းပြီး စနစ်တစ်ခုလုံး လိုအပ်သလို အလုပ်လုပ်ကြောင်း အတည်ပြုသည့် စမ်းသပ်မှု ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:61:en"
  };

  window.CONTENT_I18N["itpass:62"] = window.CONTENT_I18N["itpass:62"] || {};
  window.CONTENT_I18N["itpass:62"].my = {
    title: "8-03 စမ်းသပ်မှုနည်းလမ်းများ၊ လည်ပတ်ခြင်းနှင့် ထိန်းသိမ်းခြင်း (Test Methods, Operation and Maintenance)",
    concept: "၎င်းသည် စနစ်လည်ပတ်ပြီးနောက် လည်ပတ်ခြင်း/ထိန်းသိမ်းခြင်းနှင့် ပြုပြင်ခြင်းများအတွက် စမ်းသပ်မှုနည်းလမ်းဖြစ်သည်။\n\n1. **Regression test** - စနစ်၏အစိတ်အပိုင်းတစ်ခုကို ပြောင်းလဲသောအခါ အခြားမသက်ဆိုင်သော အစိတ်အပိုင်းများတွင် မမျှော်လင့်ထားသော ချို့ယွင်းချက်များ (bugs) ဖြစ်ပေါ်ခြင်းမရှိကြောင်း အတည်ပြုသည့် \"regression prevention\" စမ်းသပ်မှုဖြစ်သည်။\n2. **Acceptance test** - စနစ်အား မှာယူထားသော အသုံးပြုသူ (ဝယ်ယူသူ) က စာချုပ်အတိုင်း အလုပ်လုပ်ကြောင်း အတည်ပြုရန် တည်ဆောက်ထားသော စနစ်ကို ကိုယ်တိုင် လည်ပတ်ကြည့်ရှုသည့် နောက်ဆုံးစမ်းသပ်မှု ဖြစ်သည်။\n3. **Maintenance** - bug များကို ပြုပြင်ရန်နှင့် ပတ်ဝန်းကျင်ဆိုင်ရာ ပြောင်းလဲမှုများ (OS version upgrades စသည်) ကို တုံ့ပြန်ရန် ဆက်တိုက် လုပ်ဆောင်ရသော လုပ်ငန်းစဉ် ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:62:en"
  };

  window.CONTENT_I18N["itpass:63"] = window.CONTENT_I18N["itpass:63"] || {};
  window.CONTENT_I18N["itpass:63"].my = {
    title: "8-04 ဆော့ဖ်ဝဲလ် ဖွံ့ဖြိုးတိုးတက်မှု နည်းဗျူဟာများ (Software Development Methodologies)",
    concept: "၎င်းသည် ဆော့ဖ်ဝဲလ်ဖွံ့ဖြိုးတိုးတက်ရေးကို ဆောင်ရွက်ရန် ချဉ်းကပ်မှုတစ်ခုဖြစ်သည်။\n\n1. **Waterfall model** - လိုအပ်ချက် သတ်မှတ်ခြင်းမှသည် ဒီဇိုင်းနှင့် စမ်းသပ်ခြင်းအထိ မြစ်ရေကဲ့သို့ အစီအစဉ်တကျ ရှေ့သို့သာ တိုးသွားပြီး ယခင်အဆင့်များသို့ ပြန်လှည့်ခြင်းကို လုံးဝခွင့်မပြုသော ခိုင်မာသည့် နည်းလမ်းဖြစ်သည်။ သတ်မှတ်ချက်များ သေချာစွာ သတ်မှတ်ပြီးသားဖြစ်သော အကြီးစား ဖွံ့ဖြိုးတိုးတက်ရေး လုပ်ငန်းများအတွက် သင့်လျော်သည်။\n2. **Agile model** - ဖွံ့ဖြိုးတိုးတက်မှုကာလကို တိုတောင်းသောယူနစ်များ (**iterations** သို့မဟုတ် sprints) အဖြစ် ပိုင်းခြားပြီး သေးငယ်သော လုပ်ဆောင်ချက်ယူနစ်များအလိုက် ထုတ်ဝေခြင်းကို ထပ်ခါတလဲလဲ ပြုလုပ်ခြင်းဖြစ်သည်။ သတ်မှတ်ချက်များ ပြောင်းလဲမှုကို လိုက်လျောညီထွေရှိစွာ တုံ့ပြန်နိုင်သည်။\n3. **DevOps** - စနစ်အား လျင်မြန်စွာ ထုတ်ဝေနိုင်ခြင်းနှင့် တည်ငြိမ်စွာ လည်ပတ်နိုင်ခြင်း နှစ်ခုစလုံးကို ရရှိရန် ဖွံ့ဖြိုးတိုးတက်ရေး (development) နှင့် လည်ပတ်ရေး (operations) အဖွဲ့များ အနီးကပ် ပူးပေါင်းလုပ်ဆောင်သော ယဉ်ကျေးမှုနှင့် လုပ်ဆောင်ချက်များ ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:63:en"
  };

  window.CONTENT_I18N["itpass:64"] = window.CONTENT_I18N["itpass:64"] || {};
  window.CONTENT_I18N["itpass:64"].my = {
    title: "8-05 ပရောဂျက် စီမံခန့်ခွဲမှု (Project Management)",
    concept: "၎င်းသည် သတ်မှတ်ထားသော အချိန်အတွင်း၊ ဘတ်ဂျက်အတွင်းနှင့် လိုအပ်သော အရည်အသွေးဖြင့် ပရောဂျက်တစ်ခုကို ပြီးမြောက်ရန် စီမံခန့်ခွဲမှုနည်းလမ်း (PMBOK စသည်) ဖြစ်သည်။\n\n- **WBS (Work Breakdown Structure)** - ပရောဂျက်တစ်ခုလုံး၏ လုပ်ငန်းဆောင်တာများကို အဆင့်ဆင့် ခွဲခြမ်းစိတ်ဖြာပြသထားသော ပုံစံကားချပ်ဖြစ်သည်။ ၎င်းသည် လုပ်ငန်းများ လွတ်ကင်းကျန်ရစ်ခြင်းမှ ကာကွယ်ပေးပြီး အချိန်ဇယား ရေးဆွဲခြင်းနှင့် ဘတ်ဂျက် ခန့်မှန်းခြင်းတို့အတွက် အခြေခံအဖြစ် ဆောင်ရွက်သည်။ WBS တွင် အသေးဆုံး လုပ်ငန်းယူနစ်ကို **work package** ဟု ခေါ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:64:en"
  };

  window.CONTENT_I18N["itpass:65"] = window.CONTENT_I18N["itpass:65"] || {};
  window.CONTENT_I18N["itpass:65"].my = {
    title: "8-06 အချိန် စီမံခန့်ခွဲမှု (Time Management)",
    concept: "အချိန်ဇယားများကို စီမံခန့်ခွဲရန် နည်းလမ်းဖြစ်သည်။\n\n1. **Arrow diagram (PERT diagram)** - လုပ်ငန်းဆောင်တာများ၏ အစီအစဉ်ကို မြားများဖြင့် ချိတ်ဆက်ပြသထားသည့် ကွန်ရက်ပုံစံကားချပ် ဖြစ်သည်။ လုပ်ငန်းတစ်ခုချင်းစီအတွက် လိုအပ်သော အချိန်ကို ရေးမှတ်ထားသည်။\n2. **Critical path** - arrow diagram တွင် အစမှ အဆုံးအထိ ရက်ပေါင်း အကြာဆုံးယူရသော လမ်းကြောင်းဖြစ်သည်။ ဤလမ်းကြောင်းပေါ်ရှိ မည်သည့်လုပ်ငန်းမဆို ကြန့်ကြာပါက ပရောဂျက်တစ်ခုလုံး ပြီးစီးရန် ကြန့်ကြာစေမည်ဖြစ်သည်။\n3. **Gantt chart** - အချိန်ကို အလျားလိုက်ဝင်ရိုးတွင် ထားရှိပြီး လုပ်ငန်းများကို ဒေါင်လိုက်ဝင်ရိုးတွင် ထားရှိကာ တိုးတက်မှု အခြေအနေကို ဘား (bar) ပုံစံဖြင့် မြင်သာအောင် ပြသထားသော ပုံစံကားချပ်ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:65:en"
  };

  window.CONTENT_I18N["itpass:66"] = window.CONTENT_I18N["itpass:66"] || {};
  window.CONTENT_I18N["itpass:66"].my = {
    title: "8-07 IT ဝန်ဆောင်မှု စီမံခန့်ခွဲမှု (IT Service Management)",
    concept: "၎င်းသည် စနစ်လည်ပတ်ပြီးနောက် သုံးစွဲသူများထံ တည်ငြိမ်ပြီး အရည်အသွေးမြင့်မားသော IT ဝန်ဆောင်မှုများ ပံ့ပိုးပေးရန် လည်ပတ်မှု စီမံခန့်ခွဲမှုနည်းလမ်းဖြစ်သည် (**ITIL** ဟုခေါ်သော အကောင်းဆုံးလုပ်ဆောင်မှုများ စုစည်းမှု ရှိသည်)။\n\n- **SLA (Service Level Agreement)** - ဝန်ဆောင်မှုပေးသူနှင့် သုံးစွဲသူအကြား သဘောတူညီထားသည့် ဝန်ဆောင်မှု အရည်အသွေးအဆင့်များ (uptime စသည်) ကို သတ်မှတ်ဖော်ပြထားသော စာရွက်စာတမ်း ဖြစ်သည်။\n- **Service Desk** - အသုံးပြုသူများထံမှ ပြဿနာများနှင့် မေးမြန်းစုံစမ်းမှုများအတွက် ပထမဆုံး ဆက်သွယ်ရန်နေရာ (single point of contact) ဖြစ်သည်။\n- **Incident management** - ချို့ယွင်းမှုတစ်ခု ဖြစ်ပွားသောအခါ ယာယီဖြေရှင်းနည်းများကို အသုံးပြု၍ \"ဝန်ဆောင်မှုများကို အမြန်ဆုံး ပြန်လည်ကောင်းမွန်လာစေရန်\" ရည်ရွယ်သည့် လုပ်ဆောင်ချက်များ ဖြစ်သည် (အဓိက အကြောင်းရင်းကို စုံစမ်းစစ်ဆေးခြင်းသည် problem management ၏ အခန်းကဏ္ဍ ဖြစ်သည်)။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:66:en"
  };

  window.CONTENT_I18N["itpass:67"] = window.CONTENT_I18N["itpass:67"] || {};
  window.CONTENT_I18N["itpass:67"].my = {
    title: "8-08 စနစ် စစ်ဆေးခြင်း (System Audits)",
    concept: "၎င်းသည် သတင်းအချက်အလက်စနစ်များသည် စီမံခန့်ခွဲမှုမူဝါဒများနှင့် ကိုက်ညီမှုရှိမရှိ၊ ဘေးကင်းပြီး သင့်လျော်စွာ စီမံခန့်ခွဲလည်ပတ်နေခြင်း ရှိမရှိတို့ကို လွတ်လပ်သော ရှုထောင့်မှနေ၍ ဘက်မလိုက်သော ပြင်ပအဖွဲ့အစည်း (system auditor) မှ ဘက်စုံအကဲဖြတ်ပြီး စစ်ဆေးသည့် လုပ်ဆောင်ချက် ဖြစ်သည်။\n\nစစ်ဆေးသူသည် စစ်ဆေးခြင်းခံရသော ဌာနသို့ စစ်ဆေးမှုအစီရင်ခံစာကို တင်ပြပြီး ပြဿနာတစ်စုံတစ်ရာရှိပါက တိုးတက်ကောင်းမွန်လာစေရန် အကြံပြုချက်များကို ပေးသည်။ လွတ်လပ်စွာ လုပ်ဆောင်နိုင်မှုကို ထိန်းသိမ်းရန်အတွက် စစ်ဆေးသူများသည် စစ်ဆေးခံရမည့် ဌာန၏ လုပ်ငန်းများတွင် တာဝန်ရှိသူများ မဖြစ်စေရပါ။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:67:en"
  };

  window.CONTENT_I18N["itpass:68"] = window.CONTENT_I18N["itpass:68"] || {};
  window.CONTENT_I18N["itpass:68"].my = {
    title: "9-01 ဘဏ္ဍာရေးရှင်းတမ်းများ (Financial Statements)",
    concept: "၎င်းသည် ကုမ္ပဏီတစ်ခု၏ ဘဏ္ဍာရေးအခြေအနေနှင့် စွမ်းဆောင်ရည်ကို ပြင်ပကမ္ဘာသို့ ထုတ်ဖော်ပြသရန် ဘဏ္ဍာရေးအစီရင်ခံစာ ဖြစ်သည်။\n\n1. **Balance Sheet (B/S)** - ကုမ္ပဏီတစ်ခု၏ ဘဏ္ဍာရေးအခြေအနေကို သတ်မှတ်ထားသော အချိန်တစ်ခု၌ ပြသသည့် ဇယားဖြစ်သည်။ ဘယ်ဘက်တွင် **assets** (ငွေသားနှင့် အပ်ငွေများ၊ ရရန်ရှိသော ငွေစာရင်းများ စသည်) ကို ထားရှိပြီး၊ ညာဘက်တွင် **liabilities** (ချေးငွေများ၊ ပေးရန်ရှိသော ငွေစာရင်းများ စသည်) နှင့် **net assets** (အရင်းအနှီး၊ မခွဲဝေရသေးသော အမြတ်ငွေများ စသည်) ကို ထားရှိသည်။ \"Assets = Liabilities + Net Assets\" ဆိုသည်မှာ အမြဲတမ်း မှန်ကန်သည်။\n2. **P/L - Profit and Loss statement** - သတ်မှတ်ထားသော ကာလတစ်ခုအတွင်း လုပ်ငန်း၏ ရလဒ်များ (အမြတ်အစွန်းများ) ကို ပြသသည့် ဇယားဖြစ်သည်။ နောက်ဆုံး \"net income\" ကို ရှာဖွေရန် ရောင်းရငွေထဲမှ ကုန်ကျစရိတ် အမျိုးမျိုးကို နှုတ်ယူသည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:68:en"
  };

  window.CONTENT_I18N["itpass:69"] = window.CONTENT_I18N["itpass:69"] || {};
  window.CONTENT_I18N["itpass:69"].my = {
    title: "9-02 အမြတ်အစွန်းမဲ့ အခြေအနေနှင့် ပိုင်ဆိုင်မှု စီမံခန့်ခွဲမှု (Break-Even Point and Asset Management)",
    concept: "၎င်းသည် စီးပွားရေးစီမံကိန်း ရေးဆွဲခြင်းနှင့် ကုန်ကျစရိတ် တွက်ချက်ခြင်းအတွက် ညွှန်းကိန်းတစ်ခုဖြစ်သည်။\n\n1. **Break-even point** - ရောင်းရငွေနှင့် စုစုပေါင်းကုန်ကျစရိတ်တို့ အတိအကျတူညီပြီး အမြတ် သုညဖြစ်သော ရောင်းအား ဖြစ်သည်။ ၎င်းထက်ကျော်လွန်ပါက အမြတ်ရရှိမည်ဖြစ်သည်။\n   - **Fixed costs** - ရောင်းအားအပေါ် မူတည်ခြင်းမရှိဘဲ ပုံသေရှိနေသော ကုန်ကျစရိတ်များ ဖြစ်သည် (အိမ်ငှားခ၊ အခြေခံလစာ စသည်)။\n   - **Variable costs** - ရောင်းအားနှင့် တိုက်ရိုက်အချိုးကျ တိုးခြင်း သို့မဟုတ် လျော့ခြင်း ဖြစ်သည်။ (ကုန်ကြမ်းစရိတ်၊ ဝယ်ယူစရိတ် စသည်)။\n   - **ဖော်မြူလာ** - `Break-even sales = fixed costs / (1 - variable cost rate)` (variable cost rate = variable costs / sales)\n2. **Depreciation** - ကွန်ပျူတာများကဲ့သို့သော ပုံသေပိုင်ဆိုင်မှုများ ဝယ်ယူသည့်ကုန်ကျစရိတ်ကို ၎င်းတို့၏ သက်တမ်းအလိုက် ကုန်ကျစရိတ်များအဖြစ် ခွဲဝေသတ်မှတ်သည့် လုပ်ငန်းစဉ် ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:69:en"
  };

  window.CONTENT_I18N["itpass:70"] = window.CONTENT_I18N["itpass:70"] || {};
  window.CONTENT_I18N["itpass:70"].my = {
    title: "9-03 မူပိုင်ခွင့်နှင့် အသိဉာဏ်ပစ္စည်း မူပိုင်ခွင့်များ (Intellectual Property Rights)",
    concept: "အသိဉာဏ်ဆိုင်ရာ တီထွင်ဖန်တီးမှု လုပ်ဆောင်ချက်များမှ ထွက်ပေါ်လာသော ထုတ်ကုန်များအပေါ် မူပိုင်ခွင့်များ ဖြစ်သည်။\n\n1. **စက်မှုလုပ်ငန်းဆိုင်ရာ ပိုင်ဆိုင်မှုမူပိုင်ခွင့်များ (Patent Office တွင် လျှောက်ထားပြီး မှတ်ပုံတင်ရန် လိုအပ်သည်)** -\n   - **Patent rights** - နည်းပညာများနှင့် တီထွင်မှုများ (အဆင့်မြင့် စိတ်ကူးစိတ်သန်းများ၊ စီးပွားရေးဆိုင်ရာ တီထွင်မှုများ စသည်) ကို ကာကွယ်ပေးသည်။ သက်တမ်းသည် လျှောက်ထားသည့်နေ့မှစ၍ အနှစ် ၂၀ ဖြစ်သည်။\n   - **Utility model right** - ပစ္စည်းတစ်ခု၏ ပုံသဏ္ဌာန်အား တီထွင်မှု (သေးငယ်သော တီထွင်မှု) ဖြစ်သည်။ သက်တမ်းသည် လျှောက်ထားသည့်နေ့မှစ၍ ၁၀ နှစ်ဖြစ်သည်။\n   - **Design Rights** - ထုတ်ကုန်တစ်ခု၏ အလှအပဆိုင်ရာ ဒီဇိုင်းဖြစ်သည်။ သက်တမ်းသည် မှတ်ပုံတင်သည့်နေ့မှစ၍ ၂၅ နှစ်ဖြစ်သည်။\n   - **Trademark rights** - အမှတ်တံဆိပ်အမည်များနှင့် လိုဂိုသင်္ကေတများ ဖြစ်သည်။ ၁၀ နှစ်တစ်ကြိမ် သက်တမ်းတိုးနိုင်သည်။\n2. **Copyright** - စိတ်ကူးစိတ်သန်းများနှင့် ခံစားချက်များကို ဖန်တီးမှုရှိစွာ ဖော်ပြခြင်းကို ကာကွယ်ပေးသည် (ပရိုဂရမ် ကုဒ်များတွင်လည်း အကျုံးဝင်သည်)။ **လျှောက်လွှာမှတ်ပုံတင်ရန် မလိုပါ**၊ ဖန်တီးမှုပြီးဆုံးသည်နှင့် အလိုအလျောက် ပေါ်ပေါက်လာသည် (**non-formal system**)။ algorithms နှင့် programming languages များကိုယ်တိုင်ကိုမူ ကာကွယ်ပေးထားခြင်း မရှိပါ။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:70:en"
  };

  window.CONTENT_I18N["itpass:71"] = window.CONTENT_I18N["itpass:71"] || {};
  window.CONTENT_I18N["itpass:71"].my = {
    title: "9-04 လုံခြုံရေးနှင့် ကိုယ်ရေးကိုယ်တာအချက်အလက် စည်းမျဉ်းများ (Security and Personal Information Regulations)",
    concept: "၎င်းသည် ဘေးကင်းပြီး သင့်လျော်သော IT လုပ်ဆောင်ချက်များအတွက် ဥပဒေဖြစ်သည်။\n\n1. **Unauthorized Access Prohibition Act** - အခြားသူတစ်ဦး၏ ID နှင့် password ကို ခွင့်ပြုချက်မရှိဘဲ အသုံးပြု၍ log in ဝင်ခြင်းနှင့် ID အချက်အလက်များကို အခြားသူများထံ တရားမဝင် မျှဝေခြင်းတို့ကို တားမြစ်သည့် ဥပဒေဖြစ်သည်။\n2. **Personal Information Protection Act** - တစ်ဦးချင်းစီကို ခွဲခြားသတ်မှတ်နိုင်သော အချက်အလက်များကို သင့်လျော်စွာ ကိုင်တွယ်ဖြေရှင်းရန် သတ်မှတ်ထားသော ဥပဒေဖြစ်သည်။ **အသက်ရှင်ဆဲ လူပုဂ္ဂိုလ်များ** ၏ အချက်အလက်များသာ အကျုံးဝင်သည် (ကွယ်လွန်ပြီးသူများ မပါဝင်ပါ)။ မူအားဖြင့် ထိုသူ၏ သဘောတူညီချက်မပါဘဲ ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို ပြင်ဆင်သူ (တတိယအဖွဲ့အစည်း) ထံသို့ ပံ့ပိုးပေးခြင်းကို တားမြစ်ထားသည်။\n3. **Unfair Competition Prevention Act** - ကုမ္ပဏီတစ်ခု၏ นည်းပညာနှင့် ဖောက်သည်စာရင်း ကဲ့သို့သော **trade secrets** (စီးပွားရေး လျှို့ဝှက်ချက်များ) ကို တရားမဝင် ရယူခြင်းနှင့် အသုံးပြုခြင်းကို တားမြစ်သော ဥပဒေဖြစ်သည်။ trade secrets အဖြစ် အသိအမှတ်ပြုခံရရန်အတွက် သတ်မှတ်ချက် သုံးခုဖြစ်သော \"secrecy controllability\"၊ \"usefulness\" နှင့် \"non-public knowledge\" တို့နှင့် ကိုက်ညီရပါမည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:71:en"
  };

  window.CONTENT_I18N["itpass:72"] = window.CONTENT_I18N["itpass:72"] || {};
  window.CONTENT_I18N["itpass:72"].my = {
    title: "9-05 အလုပ်သမားရေးရာနှင့် အရောင်းအဝယ် စည်းမျဉ်းများ (Labor and Transaction Regulations)",
    concept: "စနစ်တည်ဆောက်ရေးတွင် အလုပ်သမားဥပဒေနှင့် စာချုပ်ဥပဒေများသည် အရေးကြီးဆုံး ဖြစ်သည်။\n\n1. **Contract** (ပြင်ပကန်ထရိုက်စာချုပ်) - ဖွံ့ဖြိုးတိုးတက်ရေးကုမ္ပဏီ (ကန်ထရိုက်တာ) မှ စနစ်ပြီးမြောက်ရန် (ပေးအပ်ရမည့်အရာများကို ပေးအပ်ရန်) ကတိပြုသော စာချုပ်ဖြစ်သည်။ **အပ်နှံခြင်းခံရသော ကုမ္ပဏီ** သည် အလုပ်သမားများကို ညွှန်ကြားစေခိုင်းပိုင်ခွင့် ရှိသည်။ မှာယူသူ (ဝယ်ယူသူ) သည် ကန်ထရိုက်တာ၏ အလုပ်သမားများအား တိုက်ရိုက်ညွှန်ကြားချက်များ မပေးရပါ (ထိုသို့ပြုလုပ်ပါက တရားမဝင်သော \"**double dispatch (disguised contracting)**\" ဖြစ်လာစေမည် ဖြစ်သည်)။\n2. **Worker dispatch contract** (အလုပ်သမားစေလွှတ်ခြင်း စာချုပ်) - လူသားအရင်းအမြစ်များကို စေလွှတ်ရန် စာချုပ်ဖြစ်သည်။ အလုပ်သမားများကို ညွှန်ကြားစေခိုင်းခွင့်သည် လက်ခံသူကုမ္ပဏီ (မှာယူသူကုမ္ပဏီ) ၌ ရှိသည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:72:en"
  };

  window.CONTENT_I18N["itpass:73"] = window.CONTENT_I18N["itpass:73"] || {};
  window.CONTENT_I18N["itpass:73"].my = {
    title: "9-06 စီးပွားရေး လုပ်ငန်း ဆန်းစစ်ခြင်း (Business Analysis)",
    concept: "၎င်းသည် ကုမ္ပဏီတစ်ခု၏ လက်ရှိအခြေအနေနှင့် အရည်အသွေးဆိုင်ရာ ပြဿနာများကို မြင်သာအောင် ပြသပေးသည့် ကိရိယာတစ်ခုဖြစ်သည်။\n\n1. **SWOT analysis** - ကုမ္ပဏီ၏ ပတ်ဝန်းကျင်ကို ဝင်ရိုး ၄ ခုဖြစ်သော **Strengths (S)**၊ **Weaknesses (W)** (အတွင်းပိုင်းပတ်ဝန်းကျင်) နှင့် **Opportunities (O)**၊ **Threats (T)** (ပြင်ပပတ်ဝန်းကျင်) တို့ဖြင့် ဆန်းစစ်သော နည်းလမ်းဖြစ်သည်။\n2. **3C analysis** - စီးပွားရေး မဟာဗျူဟာများ ရေးဆွဲရာတွင် စျေးကွက်ပတ်ဝန်းကျင်ကို **Customer**၊ **Competitor** နှင့် **Company** ဟူသော ရှုထောင့်သုံးခုမှ ဆန်းစစ်သည့် နည်းလမ်းဖြစ်သည်။\n3. **7 Quality Control (QC) Tools** -\n   - **Pareto Chart** - အချက်အလက်များကို အများဆုံးမှ အနည်းဆုံးအလိုက် အစီအစဉ်တကျ ပြသထားသော တိုင်ပုံစံပြဇယား (bar graph) နှင့် စုစုပေါင်းအချိုးအစားများကို ချိတ်ဆက်ပြသထားသော မြဉ်းပုံစံပြဇယား (line graph) တို့ ပေါင်းစပ်ထားသည့် ပုံစံကားချပ်ဖြစ်သည်။ အရေးကြီးသော စီမံခန့်ခွဲမှုကဏ္ဍများကို ကျဉ်းမြောင်းစေရန် အသုံးပြုသည် (80:20 rule)။\n   - **Cause-effect diagram** - ရလဒ်များ (ပြဿနာများ စသည်) နှင့် အကြောင်းရင်းများအကြား ဆက်နွှယ်မှုကို ပြသသော ငါးရိုးပုံသဏ္ဌာန် ပုံစံကားချပ်ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:73:en"
  };

  window.CONTENT_I18N["itpass:74"] = window.CONTENT_I18N["itpass:74"] || {};
  window.CONTENT_I18N["itpass:74"].my = {
    title: "9-07 ဒေတာအသုံးပြုမှုနှင့် ပြဿနာဖြေရှင်းခြင်း (Data Utilization and Problem Solving)",
    concept: "၎င်းသည် big data မှ စီမံခန့်ခွဲမှုအတွက် အသုံးဝင်သော အသိပညာများကို ထုတ်ယူသည့် နည်းလမ်းဖြစ်သည်။\n\n1. **Regression analysis** - အတိတ်က ဒေတာများအပေါ် အခြေခံ၍ ပြောင်းလဲကိန်းတစ်ခု (ဥပမာ - အပူချိန်) နှင့် အခြားပြောင်းလဲကိန်းတစ်ခု (ဥပမာ - ဘီယာရောင်းအား) အကြား အကြောင်းရင်းနှင့် ရလဒ် ဆက်နွှယ်မှုကို သင်္ချာဖော်မြူလာဖြင့် ဖော်ပြပြီး အနာဂတ်ကို ခန့်မှန်းသည့် နည်းလမ်းဖြစ်သည်။\n2. **Correlation** - ဒေတာအုပ်စုနှစ်ခု ဆက်စပ်မှုရှိနေသော ပတ်သက်မှုဖြစ်သည် (ဥပမာ - တစ်ခုတိုးလာလျှင် အခြားတစ်ခုလည်း တိုးလာခြင်း)။ သို့သော် correlation သည် အကြောင်းရင်းနှင့် ရလဒ် ဖြစ်တည်မှုကို မဆိုလိုပါ။\n3. **Data mining** - ဒေတာအမြောက်အမြားမှ လျှို့ဝှက်ဆန်းကြယ်သော စည်းမျဉ်းများနှင့် ဆက်စပ်မှုများကို ရှာဖွေဖော်ထုတ်ရန် စာရင်းအင်းနည်းလမ်းများနှင့် machine learning ကို အသုံးပြုသည့် နည်းပညာဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:74:en"
  };

  window.CONTENT_I18N["itpass:75"] = window.CONTENT_I18N["itpass:75"] || {};
  window.CONTENT_I18N["itpass:75"].my = {
    title: "9-08 စံချိန်စံညွှန်း သတ်မှတ်ခြင်း (Standardization)",
    concept: "၎င်းသည် သဟဇာတဖြစ်မှုနှင့် အဆင်ပြေမှုကို တိုးမြှင့်ရန် ထုတ်ကုန်များနှင့် ဆက်သွယ်ရေးစံနှုန်းများကို ပေါင်းစည်းရန် လုပ်ဆောင်ချက်ဖြစ်သည်။\n\n1. **စံချိန်စံညွှန်း သတ်မှတ်ရေး အဖွဲ့အစည်းများ** -\n   - **ISO** - အပြည်ပြည်ဆိုင်ရာ စံချိန်စံညွှန်းသတ်မှတ်ရေး အဖွဲ့အစည်း ဖြစ်သည်။\n   - **IEC** - လျှပ်စစ်ကဏ္ဍဆိုင်ရာ နိုင်ငံတကာ စံနှုန်းများ ဖြစ်သည်။\n   - **IEEE** - LAN စံနှုန်းများ အပါအဝင် လျှပ်စစ်နှင့် အီလက်ထရွန်နစ် အင်ဂျင်နီယာ အသင်းစံနှုန်းများ ဖြစ်သည်။\n   - **JIS** - ဂျပန်စက်မှုစံနှုန်းများ ဖြစ်သည်။\n2. **ကုဒ်စံနှုန်းများ** -\n   - **JAN code** - ဂျပန်နိုင်ငံသုံး ထုတ်ကုန် ဘားကုဒ် (barcode) ဖြစ်သည်။\n   - **QR code** - နှစ်ဖက်မြင် ကုဒ် (two-dimensional code) ဖြစ်သည်။ ၎င်းတွင် ဒေါင်လိုက်နှင့် အလျားလိုက် နှစ်ဖက်စလုံး၌ ဒေတာများ ရှိပြီး JAN code ထက် အချက်အလက်များကို ပိုမိုမှတ်တမ်းတင်နိုင်ပြီး ပျက်စီးသွားသော်လည်း တစ်စိတ်တစ်ပိုင်း ပြန်လည်ကောင်းမွန်အောင် ပြုလုပ်နိုင်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:75:en"
  };

  window.CONTENT_I18N["itpass:76"] = window.CONTENT_I18N["itpass:76"] || {};
  window.CONTENT_I18N["itpass:76"].my = {
    title: "10-01 စတုတ္ထမြောက် စက်မှုတော်လှန်ရေးနှင့် Big Data (The Fourth Industrial Revolution and Big Data)",
    concept: "ကျွန်ုပ်တို့သည် IoT၊ AI နှင့် big data တို့ကို အသုံးပြု၍ စက်မှုလုပ်ငန်း တည်ဆောက်ပုံများနှင့် လူနေမှုပုံစံများကို သိသိသာသာ ပြောင်းလဲစေမည့် ဒစ်ဂျစ်တယ်ဆန်းသစ်တီထွင်မှုခေတ်တွင် နေထိုင်နေကြသည်။\n\n- **Big Data** - သာမန်စနစ်များဖြင့် မလုပ်ဆောင်နိုင်သော ပမာဏကြီးမားပြီး မျိုးစုံလှသော အချိန်နှင့်တစ်ပြေးညီ ဖြစ်ပေါ်နေသည့် ဒေတာအုပ်စုများ ဖြစ်သည်။\n- **Sharing Economy** - အင်တာနက် ပလက်ဖောင်းမှတစ်ဆင့် လူတစ်ဦးချင်းစီအကြား အပိုအခန်းများနှင့် ကားများကဲ့သို့သော ပိုင်ဆိုင်မှုများကို ငှားရမ်းပေးသည့် စနစ်ဖြစ်သည် (ဥပမာ - ကားမျှဝေသုံးစွဲခြင်း၊ အိမ်ငှားခြင်း)။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:76:en"
  };

  window.CONTENT_I18N["itpass:77"] = window.CONTENT_I18N["itpass:77"] || {};
  window.CONTENT_I18N["itpass:77"].my = {
    title: "10-02 ကုမ္ပဏီများ၏ လုပ်ဆောင်ချက်များ (Corporate Activities)",
    concept: "၎င်းသည် ရေရှည်တည်တံ့သော လူ့အဖွဲ့အစည်းကို ဦးတည်ရာတွင် ကုမ္ပဏီများ ပါဝင်ဆောင်ရွက်ရမည့် အခန်းကဏ္ဍ ဖြစ်သည်။\n\n1. **CSR (Corporate Social Responsibility)** - ကုမ္ပဏီများသည် အမြတ်အစွန်းကိုသာ ရှာဖွေရုံတင်မကဘဲ ပတ်ဝန်းကျင်ထိန်းသိမ်းရေး၊ လူမှုရေးကူညီမှုနှင့် ဥပဒေလိုက်နာမှု ရှုထောင့်များမှနေ၍ လူမှုရေးဆိုင်ရာ တာဝန်ယူမှုများကိုလည်း ဖြည့်ဆည်းပေးရမည်ဟူသော စိတ်ကူးစိတ်သန်း ဖြစ်သည်။\n2. **SDGs (Sustainable Development Goals)** - ၂၀၃၀ ခုနှစ်တွင် အောင်မြင်ရန် ကုလသမဂ္ဂမှ သတ်မှတ်ထားသော ရေရှည်တည်တံ့သော ဖွံ့ဖြိုးတိုးတက်ရေး ပန်းတိုင် ၁၇ ခု ဖြစ်သည်။\n3. **Green IT** - လျှပ်စစ်သုံးစွဲမှုကို လျှော့ချခြင်းနှင့် စနစ်များကို စက္ကူမလိုသောစနစ်များ ဖြစ်အောင် ပြုလုပ်ခြင်းဖြင့် ပတ်ဝန်းကျင်ဆိုင်ရာ ထိခိုက်မှုများကို လျှော့ချရန် ကြိုးပမ်းမှုများ ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:77:en"
  };

  window.CONTENT_I18N["itpass:78"] = window.CONTENT_I18N["itpass:78"] || {};
  window.CONTENT_I18N["itpass:78"].my = {
    title: "10-03 ကုမ္ပဏီ စီမံအုပ်ချုပ်မှုနှင့် အတွင်းပိုင်း ထိန်းချုပ်မှု (Corporate Governance and Internal Control)",
    concept: "၎င်းသည် ကုမ္ပဏီ၏ မရိုးသားမှုများကို ကာကွယ်ရန်နှင့် ကောင်းမွန်သော စီမံခန့်ခွဲမှုကို သေချာစေရန် စနစ်တစ်ခုဖြစ်သည်။\n\n1. **Corporate Governance** - ရှယ်ယာရှင်များနှင့် ပြင်ပဒါရိုက်တာများက စီမံခန့်ခွဲမှုကို စောင့်ကြည့်ပြီး သံသယဖြစ်ဖွယ် အခြေအနေများကို ကာကွယ်ကာ စီမံခန့်ခွဲမှုစွမ်းဆောင်ရည်ကို မြှင့်တင်ပေးသည့် စနစ်ဖြစ်သည်။\n2. **Internal Control** - သင့်လျော်သော စီးပွားရေးလုပ်ငန်းများကို သေချာစေရန် ကုမ္ပဏီအတွင်း၌ ချမှတ်ထားသော စည်းမျဉ်းများနှင့် လုပ်ငန်းစဉ်များ ဖြစ်သည်။ ရည်ရွယ်ချက်မှာ ဘဏ္ဍာရေးအစီရင်ခံစာများ၏ ယုံကြည်စိတ်ချရမှုနှင့် ဥပဒေလိုက်နာမှုတို့ကို သေချာစေရန် ဖြစ်သည်။\n3. **Compliance** - ဥပဒေများနှင့် စည်းမျဉ်းများကိုသာမက ကုမ္ပဏီကျင့်ဝတ်နှင့် လူမှုရေးဆိုင်ရာ အများသဘောတူညီချက်များ ပါဝင်သည့် စည်းမျဉ်းများကိုပါ လိုက်နာခြင်း ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:78:en"
  };

  window.CONTENT_I18N["itpass:79"] = window.CONTENT_I18N["itpass:79"] || {};
  window.CONTENT_I18N["itpass:79"].my = {
    title: "10-04 စီမံခန့်ခွဲမှု မဟာဗျူဟာ (Management Strategy)",
    concept: "၎င်းသည် ပြိုင်ဆိုင်မှုများကို ကျော်လွှားရန်နှင့် တိုးတက်မှုကို အမြင့်မားဆုံးဖြစ်စေရန် စီမံခန့်ခွဲမှုနည်းလမ်း ဖြစ်သည်။\n\n1. **Core Competence** - အခြားကုမ္ပဏီများမှ အတုမယူနိုင်သော သင်၏ကုမ္ပဏီတွင်သာ ရှိသည့် ထူးခြားသော အဓိက အားသာချက်များ (နည်းပညာနှင့် นည်းပညာ ဗဟုသုတ) ဖြစ်သည်။\n2. **M&A** - ကုမ္ပဏီများကို ပူးပေါင်းခြင်းနှင့် ဝယ်ယူခြင်း ဖြစ်သည်။ စီးပွားရေးလုပ်ငန်းသစ်တစ်ခုသို့ ဝင်ရောက်ရန် လိုအပ်သော အချိန်ကို သိသိသာသာ တိုတောင်းစေနိုင်သည်။\n3. **Alliance** - ကုမ္ပဏီအများအပြားသည် นည်းပညာနှင့် ရောင်းဝယ်ရေး လမ်းကြောင်းများတွင် အပြန်အလှန် ပံ့ပိုးပေးပြီး တန်းတူညီမျှစွာ ချိတ်ဆက်ဆောင်ရွက်ခြင်း ဖြစ်သည်။\n4. **OEM** - မူလထုတ်ကုန် အမှတ်တံဆိပ်အမည်ဖြင့် ထုတ်ကုန်တစ်ခုကို ထုတ်လုပ်ခြင်းဖြစ်သည်။ ထုတ်လုပ်သူများသည် စက်ရုံအသုံးပြုမှုနှုန်းကို မြှင့်တင်နိုင်ပြီး ဝယ်ယူသူများသည် စက်ရုံပိုင်ဆိုင်ရန်မလိုဘဲ ထုတ်ကုန်များကို ရောင်းချနိုင်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:79:en"
  };

  window.CONTENT_I18N["itpass:80"] = window.CONTENT_I18N["itpass:80"] || {};
  window.CONTENT_I18N["itpass:80"].my = {
    title: "10-05 သတင်းအချက်အလက်စနစ် မဟာဗျူဟာနှင့် လုပ်ငန်းစဉ်များ (Information System Strategy and Business Processes)",
    concept: "၎င်းသည် လုပ်ငန်းများကို ပိုမိုမြန်ဆန်သွက်လက်စေရန်နှင့် ပြောင်းလဲရန် IT ကို အသုံးပြုသည့် စနစ်တကျ မဟာဗျူဟာ ဖြစ်သည်။\n\n1. **EA (Enterprise Architecture)** - ကြီးမားသောကုမ္ပဏီတစ်ခု၏ အဖွဲ့အစည်း၊ လုပ်ငန်းစဉ်များ၊ စနစ်များနှင့် ဒေတာများ၏ ပုံရိပ်တစ်ခုလုံးကို ပုံစံထုတ်ပြီး အလုံးစုံ ကောင်းမွန်အောင် ပြုလုပ်သည့် နည်းလမ်းဖြစ်သည်။\n2. **BPR (Business Process Redesign)** - သိသာထင်ရှားသော ရလဒ်များရရှိရန် လက်ရှိအဖွဲ့အစည်းများနှင့် လုပ်ငန်းစဉ်များကို **အခြေခံကျကျ ပြန်လည်သုံးသပ်ခြင်း၊ အကြီးအကျယ် ပြန်လည်ဒီဇိုင်းဆွဲခြင်းနှင့် ပြန်လည်တည်ဆောက်ခြင်း** ဖြစ်သည်။\n3. **BPM (Business Process Management)** - လုပ်ငန်းစီးဆင်းမှုကို ဆက်တိုက်စောင့်ကြည့်ပြီး မြှင့်တင်ပေးသည့် လုပ်ဆောင်ချက်များ ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:80:en"
  };

  window.CONTENT_I18N["itpass:81"] = window.CONTENT_I18N["itpass:81"] || {};
  window.CONTENT_I18N["itpass:81"].my = {
    title: "10-06 မားကတ်တင်း မဟာဗျူဟာ (Marketing Strategy)",
    concept: "၎င်းသည် သုံးစွဲသူများအား ထုတ်ကုန်တစ်ခုကို ရွေးချယ်စေရန် တိုက်တွန်းခြင်းဖြင့် ရောင်းအားကို အမြင့်မားဆုံးဖြစ်စေသည့် နည်းလမ်းဖြစ်သည်။\n\n1. **STP** - စျေးကွက်ကို အပိုင်းခွဲခြင်း (**S**egment)၊ ပစ်မှတ်ကို ကျဉ်းမြောင်းစေခြင်း (**T**arget) နှင့် သင့်ကုမ္ပဏီ၏ တည်နေရာကို သတ်မှတ်ခြင်း (**P**osition) တို့ကို ဆန်းစစ်သည့် နည်းလမ်းဖြစ်သည်။\n2. **4P** - ရောင်းချသူ၏ ရှုထောင့်မှ **Product**၊ **Price**၊ **Place** (ဖြန့်ဖြူးမှု) နှင့် **Promotion** (ရောင်းအားမြှင့်တင်မှု) ဟူသော အချက် ၄ ချက်ကို ပေါင်းစပ်ထားသည့် မားကတ်တင်း အရောအနှော (marketing mix) ဖြစ်သည်။\n3. **Upselling/Cross-selling** - ဈေးနှုန်းပိုမိုမြင့်မားသော ထုတ်ကုန်ကို အကြံပြုခြင်း (up) / ဆက်စပ်ထုတ်ကုန်များကို အတူတကွ ဝယ်ယူရန် တိုက်တွန်းခြင်း (cross) ဖြစ်သည်။\n4. **RFM analysis** - သုံးစွဲသူများ၏ အရည်အသွေးကို ဝင်ရိုး ၃ ခုဖြစ်သော **Recency** (နောက်ဆုံး ဝယ်ယူသည့် ရက်စွဲ)၊ **Frequency** (ဝယ်ယူသည့် အကြိမ်ရေ) နှင့် **Monetary** (ဝယ်ယူသည့် ပမာဏ) တို့ဖြင့် အကဲဖြတ်သည့် နည်းလမ်းဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:81:en"
  };

  window.CONTENT_I18N["itpass:82"] = window.CONTENT_I18N["itpass:82"] || {};
  window.CONTENT_I18N["itpass:82"].my = {
    title: "10-07 နည်းပညာ မဟာဗျူဟာ (Technology Strategy)",
    concept: "၎င်းသည် နည်းပညာကို အဓိကထား၍ ရေရှည်တည်တံ့သော ပြိုင်ဆိုင်မှု အားသာချက်ကို ရရှိရန် မဟာဗျူဟာ ဖြစ်သည်။\n\n1. **MOT (Management of Technology)** - နည်းပညာဖွံ့ဖြိုးတိုးတက်မှုရလဒ်များကို စီးပွားရေးလုပ်ငန်းများနှင့် ထိရောက်စွာ ချိတ်ဆက်ပေးပြီး ကုမ္ပဏီတန်ဖိုးဖန်တီးမှုကို မြှင့်တင်ပေးသည့် စီမံခန့်ခွဲမှု မဟာဗျူဟာ ဖြစ်သည်။\n2. **Technology roadmap** - နည်းပညာဆင့်ကဲပြောင်းလဲမှုနှင့် ထုတ်ကုန်အသစ် ဖွံ့ဖြိုးတိုးတက်မှုအတွက် ခန့်မှန်းချက်များနှင့် ပန်းတိုင်များကို အချိန်ဇယားဆွဲထားသော ပုံစံကားချပ်ဖြစ်ပြီး အလျားလိုက်ဝင်ရိုးတွင် အချိန်နှင့် ဒေါင်လိုက်ဝင်ရိုးတွင် นည်းပညာဆိုင်ရာ အစိတ်အပိုင်းများနှင့် ထုတ်ကုန်လိုင်းများကို ပြသသည်။\n3. **Innovation Dilemma** - ရှိရင်းစွဲ အောင်မြင်ပြီးသား ကုမ္ပဏီများသည် ဖောက်သည်များ၏ စကားကို နားထောင်ပြီး အရည်အသွေးမြင့်မားသော သာမန်ထုတ်ကုန်များကိုသာ ဆက်လက်ဖန်တီးသော်လည်း ကုန်ကျစရိတ်သက်သာပြီး นည်းပညာနိမ့်ပါးသော ဖောက်ထွက်ဆန်းသစ်တီထွင်မှုများ ပြုလုပ်သည့် ကုမ္ပဏီသစ်များထံ စျေးကွက်ကို ဆုံးရှုံးသွားသော ဖြစ်စဉ် ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:82:en"
  };

  window.CONTENT_I18N["itpass:83"] = window.CONTENT_I18N["itpass:83"] || {};
  window.CONTENT_I18N["itpass:83"].my = {
    title: "10-08 စွမ်းဆောင်ရည် အကဲဖြတ်ခြင်းနှင့် စီမံခန့်ခွဲမှု စနစ်များ (Performance Evaluation and Management Systems)",
    concept: "၎င်းသည် ကုမ္ပဏီစွမ်းဆောင်ရည်ကို မြင်သာအောင် ပြုလုပ်ပြီး ရင်းမြစ်များကို ဗဟိုပြုစုစည်းပေးသည့် စီမံခန့်ခွဲမှု ကိရိယာတစ်ခုဖြစ်သည်။\n\n1. **BSC (Balanced Scorecard)** - ဘဏ္ဍာရေးဆိုင်ရာ ညွှန်းကိန်းများသာမက \"ဘဏ္ဍာရေး\"၊ \"သုံးစွဲသူ\"၊ \"လုပ်ငန်းစဉ်\" နှင့် \"လေ့လာသင်ယူမှုနှင့် ကြီးထွားမှု\" ဟူသော ရှုထောင့်လေးခုမှနေ၍ စွမ်းဆောင်ရည် အကဲဖြတ်ခြင်းနှင့် မဟာဗျူဟာ ဆောင်ရွက်ခြင်းတို့ကို မျှတစွာ လုပ်ဆောင်သည့် နည်းလမ်းဖြစ်သည်။\n2. **KPI** - သော့ချက် စွမ်းဆောင်ရည် ညွှန်ကိန်း ဖြစ်သည်။ မဟာဗျူဟာအောင်မြင်ရန် တိုးတက်မှုကို တိုင်းတာသည့် ကြားခံ ပစ်မှတ်တန်ဖိုးဖြစ်သည် (CSF သည် အောင်မြင်မှုအတွက် သော့ချက်အချက် ဖြစ်သည်)။\n3. **အဓိက စီးပွားရေး စီမံခန့်ခွဲမှု စနစ်များ** -\n   - **ERP** - အလုံးစုံ ကောင်းမွန်အောင် ပြုလုပ်ရန် ကုမ္ပဏီ၏ လူအင်အား၊ ကုန်ပစ္စည်း၊ ငွေကြေးနှင့် အချက်အလက်များကို ဗဟိုမှ စုစည်းစီမံခန့်ခွဲပေးသည့် ပေါင်းစပ် သတင်းအချက်အလက်စနစ် ဖြစ်သည်။\n   - **SCM** - ကုန်ကြမ်းဝယ်ယူမှုမှသည် ရောင်းချမှုအထိ ကွင်းဆက်ကို ချိတ်ဆက်ပြီး သိုလှောင်မှုကို အနည်းဆုံးဖြစ်အောင် ပြုလုပ်ခြင်း ဖြစ်သည်။\n   - **CRM** - သုံးစွဲသူ အချက်အလက်များကို စုစည်းပြီး ဆက်ဆံရေးကို ပိုမိုနက်ရှိုင်းစေကာ ထပ်ခါတလဲလဲ ဝယ်ယူသူများကို တိုးပွားစေခြင်း ဖြစ်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:83:en"
  };

  window.CONTENT_I18N["itpass:84"] = window.CONTENT_I18N["itpass:84"] || {};
  window.CONTENT_I18N["itpass:84"].my = {
    title: "10-09 စီးပွားရေး စနစ်များနှင့် အင်ဂျင်နီယာပညာ (Business Systems and Engineering)",
    concept: "၎င်းသည် ထုတ်လုပ်မှုလုပ်ငန်းတွင် ထုတ်လုပ်မှုစွမ်းအားကို တိုးတက်စေသည့် IT စနစ်ဖြစ်သည်။\n\n1. **CAD / CAM** - စက်ကိရိယာများကို ထိန်းချုပ်ရန်နှင့် အလိုအလျောက် ထုတ်လုပ်ရန် ဒီဇိုင်းဒေတာကို အသုံးပြုသည့် ကွန်ပျူတာအကူအညီပြု ဒီဇိုင်း (CAD) နှင့် ထုတ်လုပ်မှု အကူအညီ (CAM) ဖြစ်သည်။\n2. **Concurrent Engineering** - ထုတ်ကုန်ဖွံ့ဖြိုးတိုးတက်မှုတွင် ဒီဇိုင်း, ရှေ့ပြေးပုံစံနှင့် ထုတ်လုပ်မှုကဲ့သို့သော လုပ်ငန်းစဉ်တစ်ခုချင်းစီကို သီးခြားစီ လုပ်ဆောင်မည့်အစား **ပြိုင်တူ (သို့မဟုတ်) အပြိုင် လုပ်ဆောင်ခြင်းဖြင့်** ဖွံ့ဖြိုးတိုးတက်မှု ကာလကို သိသိသာသာ တိုတောင်းစေသည့် နည်းလမ်းဖြစ်သည်။\n3. **JIT (Just in Time)** - လိုအပ်သောအရာကို၊ လိုအပ်သောအချိန်တွင်၊ လိုအပ်သောပမာဏဖြင့် ထုတ်လုပ်ပြီး ပံ့ပိုးပေးသည့် တိုယိုတာ (Toyota) ၏ အမှတ်အသား နည်းလမ်းဖြစ်သည်။ လုပ်ငန်းခွင်ရှိ လက်ကျန်များနှင့် သိုလှောင်မှုများကို အနည်းဆုံးအထိ လျှော့ချသည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:84:en"
  };

  window.CONTENT_I18N["itpass:85"] = window.CONTENT_I18N["itpass:85"] || {};
  window.CONTENT_I18N["itpass:85"].my = {
    title: "10-10 အီလက်ထရွန်နစ် စီးပွားရေး (E-Business)",
    concept: "၎င်းသည် အင်တာနက်ကို အသုံးပြုသည့် စီးပွားရေး ပုံစံတစ်ခု ဖြစ်သည်။\n\n1. **Transaction type** - **B2C** (စီးပွားရေးလုပ်ငန်းမှ လူတစ်ဦးချင်းစီသို့၊ e-commerce ကုန်တိုက် စသည်)၊ **B2B** (စီးပွားရေးလုပ်ငန်း အချင်းချင်း အရောင်းအဝယ်ပြုလုပ်ခြင်း)၊ **C2C** (လူတစ်ဦးချင်းစီအကြား အရောင်းအဝယ်ပြုလုပ်သည့် app များ စသည်)။\n2. **O2O (Online to Offline)** - အွန်လိုင်း လုပ်ဆောင်ချက်များ (ကူပွန်များ ဝေမျှခြင်း စသည်) မှတစ်ဆင့် သုံးစွဲသူများကို ရုပ်ပိုင်းဆိုင်ရာ ဆိုင်များ (offline) သို့ သွားရောက်ဝယ်ယူစေရန် တိုက်တွန်းသည့် နည်းလမ်းဖြစ်သည်။\n3. **Smart contract** - blockchain ပေါ်တွင် သတ်မှတ်ထားသော စည်းမျဉ်းများအတိုင်း စာချုပ်များကို အလိုအလျောက် ဆောင်ရွက်ပေးသည့် စနစ်ဖြစ်သည်။ ကြားခံမလိုဘဲ အတုပြုလုပ်ရန် အလွန်ခက်ခဲသော ဘေးကင်းသည့် အရောင်းအဝယ်များကို ပြုလုပ်နိုင်သည်။\n\n**IT အသစ်ဝင်များအတွက် အချက်များ:**\nဤကဏ္ဍသည် IT Passport စာမေးပွဲတွင် အလွန်မကြာခဏ မေးလေ့ရှိသောကြောင့် စာမေးပွဲအောင်မြင်ရန် ဖြတ်လမ်းမှာ keyword များကို အဓိပ္ပာယ်ဖွင့်ဆိုရုံသာမက သက်ဆိုင်ရာ ဝေါဟာရများကို လက်တွေ့အသုံးပြုမှု အခြေအနေများ (နမူနာများ) နှင့်အတူ စနစ်တကျ ပြင်ဆင်ထားခြင်း ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/itpass_en.js:itpass:85:en"
  };
})();
