/* Study Tools Content I18n — Python Burmese Derived Language Pack POC v1 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["python:1"] = window.CONTENT_I18N["python:1"] || {};
  window.CONTENT_I18N["python:1"].my = {
    title: "ကွန်ပျူတာ အလုပ်လုပ်ပုံ",
    concept: "ကွန်ပျူတာသည် ၎င်း၏ အဓိက ဟာ့ဒ်ဝဲ (hardware) အစိတ်အပိုင်းများ ပူးပေါင်းဆောင်ရွက်မှုဖြင့် အလုပ်လုပ်သည်:\n\n- **CPU (Central Processing Unit)** — ကွန်ပျူတာ၏ \"ဦးနှောက်\" ဖြစ်ပြီး မြန်နှုန်းမြင့်စွာ တွက်ချက်မှုများကို လုပ်ဆောင်သည်\n- **Memory (RAM)** — လုပ်ဆောင်နေသော ပရိုဂရမ်၏ ဒေတာကို ယာယီသိမ်းဆည်းသည် (ပါဝါပိတ်ပါက ဖျက်ပစ်သည်)\n- **Hard Disk (SSD/HDD)** — ဖိုင်များကို ကွန်ပျူတာပိတ်ထားသည့်တိုင် အမြဲတမ်းသိမ်းဆည်းပေးသည်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:1:en"
  };

  window.CONTENT_I18N["python:2"] = window.CONTENT_I18N["python:2"] || {};
  window.CONTENT_I18N["python:2"].my = {
    title: "လူသားဘာသာစကားနှင့် စက်ဘာသာစကား",
    concept: "လူသားများသည် ဘာသာစကားများဖြင့် ဆက်သွယ်ကြသော်လည်း ကွန်ပျူတာများသည် **binary** (0 နှင့် 1) ကိုသာ နားလည်သည်၊ ၎င်းကို **machine language** ဟုခေါ်သည်။ လူသားများရေးသားသော code ကို **interpreter** သို့မဟုတ် **compiler** ဖြင့် machine language သို့ ပြန်ဆိုပေးရသည်။ Python သည် interpreter ကိုသုံးပြီး code ကို တစ်ကြောင်းချင်း ပြန်ဆိုသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:2:en"
  };

  window.CONTENT_I18N["python:3"] = window.CONTENT_I18N["python:3"] || {};
  window.CONTENT_I18N["python:3"].my = {
    title: "အမျိုးမျိုးသော ပရိုဂရမ်းမင်းဘာသာစကားများ",
    concept: "ကမ္ဘာပေါ်တွင် ပရိုဂရမ်းမင်းဘာသာစကားများစွာရှိပြီး တစ်ခုချင်းစီသည် မတူညီသော ရည်ရွယ်ချက်များအတွက် သင့်လျော်သည်:\n\n- **Python** — ရိုးရှင်းသော syntax၊ AI၊ data analysis နှင့် automation အတွက် ကောင်းမွန်\n- **Java** — တည်ငြိမ်ပြီး လုပ်ငန်းသုံးစနစ်များနှင့် Android အက်ပ်များတွင် တွင်ကျယ်စွာသုံးသည်\n- **C++** — စွမ်းဆောင်ရည်မြင့်မားပြီး game engine များနှင့် system programming တွင် အသုံးပြုသည်\n\nအကောင်းဆုံးဘာသာစကားဟူ၍ မရှိပါ။ သင့်လျော်သောအလုပ်အတွက် သင့်လျော်သော tool ကို ရွေးချယ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:3:en"
  };

  /* ---- Lessons 4-40: AI-assisted Burmese translation from English source ---- */

  window.CONTENT_I18N["python:4"] = window.CONTENT_I18N["python:4"] || {};
  window.CONTENT_I18N["python:4"].my = {
    title: "ကွန်မန်းပရောမ့်ကို စတင်ခြင်း (Starting the Command Prompt)",
    concept: "**CUI (Character User Interface)** သည် မောက်စ်အစား ကွန်မန်းများရိုက်ခြင်းဖြင့် ကွန်ပျူတာကို လည်ပတ်စေသည်။ Windows တွင် **Command Prompt** သို့မဟုတ် **PowerShell** ကို သုံးနိုင်သည်။ ၎င်းသည် ကွန်မန်းလိုင်းမှ Python ပရိုဂရမ်များကို run ရန် မရှိမဖြစ်လိုအပ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:4:en"
  };

  window.CONTENT_I18N["python:5"] = window.CONTENT_I18N["python:5"] || {};
  window.CONTENT_I18N["python:5"].my = {
    title: "ဖိုင်လမ်းကြောင်းများ (Absolute and Relative Paths)",
    concept: "**Path** ဆိုသည်မှာ ဖိုင် သို့မဟုတ် ဖိုဒါတစ်ခု၏ တည်နေရာကို ညွှန်ပြသော \"လိပ်စာ\" ဖြစ်သည်:\n\n- **Absolute Path** — root မှစတင်သော လမ်းကြောင်းအပြည့်အစုံ (ဥပမာ၊ `C:/Users/Coco/main.py`)။ သင်မည်သည့်နေရာတွင်ရှိရှိ အလုပ်လုပ်သည်။\n- **Relative Path** — သင်၏ လက်ရှိလုပ်ဆောင်နေသော directory နှင့် ဆက်စပ်သော လမ်းကြောင်း (ဥပမာ၊ `./main.py` သို့မဟုတ် `../data.txt`)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:5:en"
  };

  window.CONTENT_I18N["python:6"] = window.CONTENT_I18N["python:6"] || {};
  window.CONTENT_I18N["python:6"].my = {
    title: "ကွန်မန်းလိုင်း ကွန်မန်းများ အသုံးပြုခြင်း",
    concept: "ကွန်မန်းလိုင်းအတွက် အသုံးများသော ကွန်မန်းများ:\n\n- `dir` — ဖိုင်များနှင့် ဖိုဒါများကို စာရင်းပြသည် (Windows)\n- `ls` — ဖိုင်များနှင့် ဖိုဒါများကို စာရင်းပြသည် (Mac/Linux)\n- `cd folderName` — အတွင်းဖိုဒါတစ်ခုသို့ directory ပြောင်းသည်\n- `cd ..` — မိခင်ဖိုဒါသို့ ပြန်သွားသည်\n- `python --version` — ထည့်သွင်းထားသော Python ဗားရှင်းကို စစ်ဆေးသည်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:6:en"
  };

  window.CONTENT_I18N["python:7"] = window.CONTENT_I18N["python:7"] || {};
  window.CONTENT_I18N["python:7"].my = {
    title: "ထည့်သွင်းခြင်းမပြုမီ ပြင်ဆင်မှုများ",
    concept: "Python မထည့်သွင်းမီ သင့်ကွန်ပျူတာ၏ system information ကို စစ်ဆေးပါ:\n\n- **Windows** လား **macOS** လား?\n- Windows ဖြစ်ပါက **64-bit** လား **32-bit** လား? (ခေတ်မီကွန်ပျူတာအများစုသည် 64-bit ဖြစ်သည်)\n- သင့်တွင် administrator privileges ရှိကြောင်း သေချာပါစေ",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:7:en"
  };

  window.CONTENT_I18N["python:8"] = window.CONTENT_I18N["python:8"] || {};
  window.CONTENT_I18N["python:8"].my = {
    title: "လိုအပ်သော Application များ",
    concept: "Python စတင်လေ့လာရန် အဓိက tool သုံးခု လိုအပ်သည်:\n\n1. **Python Interpreter** — သင့် code ကို run ပေးသော engine\n2. **Text Editor (VS Code, Atom, etc.)** — syntax highlighting ဖြင့် `.py` ဖိုင်များရေးရန်\n3. **Terminal/Console** — script များ run ရန်နှင့် output မြင်ရန်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:8:en"
  };

  window.CONTENT_I18N["python:9"] = window.CONTENT_I18N["python:9"] || {};
  window.CONTENT_I18N["python:9"].my = {
    title: "Python ကို ထည့်သွင်းခြင်း (Installing Python)",
    concept: "Windows တွင် Python ထည့်သွင်းရာတွင် အရေးကြီးသော အဆင့်တစ်ခုရှိသည်:\n\n⚠️ **\"Add python.exe to PATH\" ကို အမှန်ခြစ်ရန် မမေ့ပါနှင့်!**\n\n၎င်းသည် system ၏ PATH environment variable တွင် Python ၏တည်နေရာကို မှတ်ပုံတင်ပေးသည်။ သို့မှသာ command line ရှိ မည်သည့်ဖိုဒါမှ `python` ကို run နိုင်မည်။ မလုပ်ပါက `python` ရိုက်လျှင် \"command not found\" error ပေါ်လိမ့်မည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:9:en"
  };

  window.CONTENT_I18N["python:10"] = window.CONTENT_I18N["python:10"] || {};
  window.CONTENT_I18N["python:10"].my = {
    title: "Code Editor တစ်ခုကို ထည့်သွင်းခြင်း",
    concept: "Code editor (VS Code သို့မဟုတ် Atom ကဲ့သို့) ထည့်သွင်းပြီးနောက် ဤအဆင့်များကို လိုက်နာပါ:\n\n1. ဖိုင်အသစ်တစ်ခု ဖန်တီးပါ\n2. `.py` extension ဖြင့် သိမ်းပါ (ဥပမာ၊ `hello.py`)\n3. Editor က ၎င်းကို Python code အဖြစ် မှတ်မိပြီး syntax highlighting (အရောင်စုံစာသား) ကို ဖွင့်ပေးလိမ့်မည်\n\n`.py` extension သည် ID ကတ်တစ်ခုအနေဖြင့် ဆောင်ရွက်သည် — ၎င်းသည် editor ကို Python analysis စတင်ရန်၊ keywords များကို အရောင်ခြယ်ရန်နှင့် ဖြစ်နိုင်သော error များကို အလံပြရန် ပြောသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:10:en"
  };

  window.CONTENT_I18N["python:11"] = window.CONTENT_I18N["python:11"] || {};
  window.CONTENT_I18N["python:11"].my = {
    title: "အခန်း ၁ ပြန်လည်လေ့ကျင့်ခန်းများ (Chapter 1 Review Exercises)",
    concept: "ဤသည်မှာ အခန်း ၁ တွင် သင်လေ့လာခဲ့သော အကြောင်းအရာများကို ပြန်လည်သုံးသပ်သည့် မေးခွန်းများဖြစ်သည်: ကွန်ပျူတာအလုပ်လုပ်ပုံ၊ command-line လုပ်ဆောင်ချက်များနှင့် Python environment တည်ဆောက်မှု။\n\nမေးခွန်းများသည် အောက်ပါတို့ကို သင့်နားလည်မှုကို စမ်းသပ်သည်:\n- CPU၊ memory နှင့် hard disk တို့ မည်သို့အတူတကွလုပ်ဆောင်သည်\n- Command line တွင် directories များကို သွားလာခြင်းနှင့် ဖိုင်များကို စာရင်းပြခြင်း\n- Python ထည့်သွင်းရာတွင် \"Add python.exe to PATH\" ကို အမှန်ခြစ်ရန် အရေးကြီးသောအဆင့်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:11:en"
  };

  window.CONTENT_I18N["python:12"] = window.CONTENT_I18N["python:12"] || {};
  window.CONTENT_I18N["python:12"].my = {
    title: "အပြန်အလှန်မုဒ် (Interactive Mode) နှင့် ပထမဆုံးပရိုဂရမ် hello.py",
    concept: "Python တွင် စာသားကို စခရင်ပေါ်တွင် ပြသရန် `print()` function ကို သုံးသည်။\n\nသင်ပြသလိုသော စာသားကို single quotes (`'`) သို့မဟုတ် double quotes (`\"`) ဖြင့် ထုပ်ပြီး `print('Hello')` ဟု ရေးပါ။\n\n**စတင်လေ့လာသူများ မကြာခဏမှားတတ်သောအချက်:** Python သည် case-sensitive ဖြစ်သည်။ `print` ကို စာလုံးသေးဖြင့်သာ ရေးရမည် — `Print` ဟုရေးပါက `NameError` ဖြစ်လိမ့်မည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:12:en"
  };

  window.CONTENT_I18N["python:13"] = window.CONTENT_I18N["python:13"] || {};
  window.CONTENT_I18N["python:13"].my = {
    title: "Script ဖိုင်များကို run ခြင်း (hello2.py)",
    concept: "စာသားကို စခရင်ပေါ်တွင် ပြသရန် `print()` function ကို သုံးပါ။ စာသားကို single quotes (`'`) သို့မဟုတ် double quotes (`\"`) ဖြင့် ထုပ်ပါ၊ ဥပမာ `print('Hello')`။\n\nScript ဖိုင်တစ်ခုတွင် `print()` statement အများအပြား ပါဝင်နိုင်ပြီး တစ်ခုချင်းစီသည် အစဉ်လိုက် တစ်ကြောင်းစီ output ထုတ်ပေးလိမ့်မည်။ သင်သည် string များ၊ ဂဏန်းများနှင့် `print(3+4)` ကဲ့သို့ တွက်ချက်မှုရလဒ်များကိုပါ print ထုတ်နိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:13:en"
  };

  window.CONTENT_I18N["python:14"] = window.CONTENT_I18N["python:14"] || {};
  window.CONTENT_I18N["python:14"].my = {
    title: "Comment အခြေခံများ (comment.py)",
    concept: "**Comment** ဆိုသည်မှာ ပရိုဂရမ်၏ လုပ်ဆောင်မှုကို မထိခိုက်စေသော သင့် code အတွင်းမှတ်စုတစ်ခုဖြစ်သည်။ စာကြောင်းတစ်ကြောင်း comment ကို စာကြောင်းအစတွင် `#` ထည့်၍ ရေးနိုင်သည်။ Multi-line comment များအတွက် triple quotes (`'''`) ကိုလည်း သုံးနိုင်သည်။\n\nComment များကို Python interpreter က လျစ်လျူရှုထားပြီး လူဖတ်ရန်အတွက်သာ ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:14:en"
  };

  window.CONTENT_I18N["python:15"] = window.CONTENT_I18N["python:15"] || {};
  window.CONTENT_I18N["python:15"].my = {
    title: "Multi-line Comment များ (comment2.py)",
    concept: "`#` ဖြင့် တစ်ကြောင်း comment များအပြင်၊ **multi-line comments** များကို triple quotes (`'''`) ဖြင့် စာသားကို ထုပ်၍ ရေးနိုင်သည်။\n\nအဖွင့် `'''` နှင့် အပိတ် `'''` ကြားရှိ အရာအားလုံးကို comment အဖြစ် သတ်မှတ်ပြီး Python က execute မလုပ်ပါ။\n\n၎င်းသည် ရှည်လျားသော ရှင်းလင်းချက်များ သို့မဟုတ် code အပိုင်းများကို ယာယီပိတ်ထားရန် အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:15:en"
  };

  window.CONTENT_I18N["python:16"] = window.CONTENT_I18N["python:16"] || {};
  window.CONTENT_I18N["python:16"].my = {
    title: "Triple-quote Indentation Error (comment_A1.py)",
    concept: "Python သည် **indentation** (စာကြောင်းအစရှိ နေရာလွတ်များ) ကို ၎င်း၏ syntax စည်းမျဉ်း၏ တစ်စိတ်တစ်ပိုင်းအဖြစ် တင်းကျပ်စွာ စစ်ဆေးသည်။ Comment စာကြောင်းများပင် မသင့်လျော်သော ရှေ့နေရာလွတ်များရှိပါက `IndentationError` ကို ဖြစ်စေနိုင်သည်။\n\nTriple-quoted comment block တစ်ခုကို မမျှော်လင့်သော indentation ဖြင့် စတင်ပါက Python သည် `IndentationError` ကို တက်လာစေနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:16:en"
  };

  window.CONTENT_I18N["python:17"] = window.CONTENT_I18N["python:17"] || {};
  window.CONTENT_I18N["python:17"].my = {
    title: "Comment Indentation Error (comment_A2.py)",
    concept: "Python သည် **indentation** (စာကြောင်းအစရှိ နေရာလွတ်များ) ကို တင်းကျပ်စွာ စစ်ဆေးသည်။ `#` comment စာကြောင်းတစ်ကြောင်းပင် မသင့်လျော်သော ရှေ့နေရာလွတ်များရှိပါက `IndentationError` ကို ဖြစ်စေလိမ့်မည်။\n\nPython က လျစ်လျူရှုမည့် စာကြောင်းများ (comment များကဲ့သို့) ပေါ်တွင်ပင် သင်၏ indentation ကို တသမတ်တည်းဖြစ်အောင် သေချာပါစေ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:17:en"
  };

  window.CONTENT_I18N["python:18"] = window.CONTENT_I18N["python:18"] || {};
  window.CONTENT_I18N["python:18"].my = {
    title: "လေ့ကျင့်ခန်း: Variable မသုံးဘဲ တွက်ချက်ခြင်းနှင့် Output (script01.py)",
    concept: "**အခန်း ၂ လေ့ကျင့်ခန်း (script01.py)**\n\nလုပ်စရာ: Variable များကို မသုံးဘဲ တွက်ချက်မှုများနှင့် output များ ပြုလုပ်ပါ။\n\nEditor ရှိ template code ကို စစ်ဆေးပြီး ပျောက်နေသော အစိတ်အပိုင်းများကို ဖြည့်စွက်ကာ ပရိုဂရမ်ကို ပြီးမြောက်အောင်လုပ်ပါ။ output ကို အတည်ပြုရန် ညာဘက်ရှိ Run ခလုတ်ကို နှိပ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:18:en"
  };

  window.CONTENT_I18N["python:19"] = window.CONTENT_I18N["python:19"] || {};
  window.CONTENT_I18N["python:19"].my = {
    title: "Data Type များအကြောင်း လေ့လာခြင်း",
    concept: "**Data type** သည် တန်ဖိုးတစ်ခု၏ ဒေတာအမျိုးအစားကို သတ်မှတ်ပေးသည်။ Python တွင် အခြေခံ type များစွာရှိသည်:\n\n- **int** — ကိန်းပြည့်ဂဏန်းများ (ဒသမကိန်းမပါ)၊ `10` သို့မဟုတ် `-5` ကဲ့သို့\n- **float** — Floating-point ကိန်းများ (ဒသမပါ)၊ `3.14` သို့မဟုတ် `2.0` ကဲ့သို့\n- **str** — Quotes များဖြင့် ထုပ်ထားသော စာသား string များ၊ `'Hello'` ကဲ့သို့\n- **bool** — Boolean တန်ဖိုးများ၊ `True` သို့မဟုတ် `False`\n\nမည်သည့်တန်ဖိုး၏ data type ကိုမဆို စစ်ရန် `type()` ကို သုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:19:en"
  };

  window.CONTENT_I18N["python:20"] = window.CONTENT_I18N["python:20"] || {};
  window.CONTENT_I18N["python:20"].my = {
    title: "ကိန်းဂဏန်းဒေတာ (int နှင့် float)",
    concept: "ကိန်းဂဏန်းဒေတာသည် အဓိက type နှစ်မျိုး ပါဝင်သည်:\n\n- **int (integer)** — ဒသမကိန်းမပါသော ကိန်းပြည့်များ၊ ဥပမာ `10`, `-5`, `0`\n- **float (floating-point)** — ဒသမကိန်းပါသော ကိန်းများ၊ ဥပမာ `3.14`, `2.0`, `-0.5`\n\nPython သည် တွက်ချက်မှုများအတွင်း type များကို အလိုအလျောက် ပြောင်းပေးသည်။ ဥပမာ၊ integer နှစ်ခုကို `/` ဖြင့် စားပါက float ကို အမြဲပြန်ပေးသည် (ဥပမာ၊ `5 / 2` က `2.5` ကိုပေးသည်)။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:20:en"
  };

  window.CONTENT_I18N["python:21"] = window.CONTENT_I18N["python:21"] || {};
  window.CONTENT_I18N["python:21"].my = {
    title: "String ဒေတာ (str)",
    concept: "**String (str)** သည် စာသားကို ကိုယ်စားပြုသော ဒေတာဖြစ်သည်။ String များကို single quotes (`'`) သို့မဟုတ် double quotes (`\"`) ဖြင့် ထုပ်ရမည်။\n\nဥပမာ: `'Hello'` သို့မဟုတ် `\"Python\"`။\n\nQuotes များကို မေ့ပါက Python က စာသားကို variable name သို့မဟုတ် keyword အဖြစ် အဓိပ္ပာယ်ကောက်ပြီး `NameError` သို့မဟုတ် `SyntaxError` ဖြစ်စေလိမ့်မည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:21:en"
  };

  window.CONTENT_I18N["python:22"] = window.CONTENT_I18N["python:22"] || {};
  window.CONTENT_I18N["python:22"].my = {
    title: "Boolean ဒေတာ (bool)",
    concept: "**Bool (boolean)** type တွင် ဖြစ်နိုင်သော တန်ဖိုး နှစ်ခုသာရှိသည်: `True` (မှန်/ဟုတ်) သို့မဟုတ် `False` (မှား/မဟုတ်)။ Boolean များသည် conditional branching (if statements) တွင် အဓိကအခန်းကဏ္ဍမှ ပါဝင်သည်။\n\n**အရေးကြီးသည်:** `True` နှင့် `False` ကို စာလုံးကြီးဖြင့် ရေးရမည်။ `true` သို့မဟုတ် `false` (စာလုံးသေး) ရေးပါက `NameError` ဖြစ်လိမ့်မည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:22:en"
  };

  window.CONTENT_I18N["python:23"] = window.CONTENT_I18N["python:23"] || {};
  window.CONTENT_I18N["python:23"].my = {
    title: "ကိန်းဂဏန်း သင်္ချာလုပ်ဆောင်ချက်များ (enzanshi01.py)",
    concept: "Python သည် သင်္ချာ operator များစွာကို ထောက်ပံ့သည်: `+` (ပေါင်း), `-` (နုတ်), `*` (မြှောက်), `/` (စား), `//` (ကိန်းပြည့်စား), `%` (အကြွင်း), နှင့် `**` (ထပ်ကိန်း)။\n\nဂဏန်းတစ်ခုနှင့် string တစ်ခုကို တိုက်ရိုက်ပေါင်းပါက `TypeError` ဖြစ်လိမ့်မည်ကို သတိပြုပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:23:en"
  };

  window.CONTENT_I18N["python:24"] = window.CONTENT_I18N["python:24"] || {};
  window.CONTENT_I18N["python:24"].my = {
    title: "String များကို ဆက်စပ်ခြင်း (enzanshi02.py)",
    concept: "`+` operator ကို သုံးပြီး string များကို အတူတကွ ဆက်စပ် (concatenate) နိုင်သည်။ ဥပမာ၊ `'Hello!' + 'Python'` သည် `'Hello!Python'` ကို ထုတ်ပေးသည်။\n\nTriple quotes (`'''`) ကို သုံးခြင်းဖြင့် line breaks များပါဝင်သော multi-line strings များကို ဖန်တီးနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:24:en"
  };

  window.CONTENT_I18N["python:25"] = window.CONTENT_I18N["python:25"] || {};
  window.CONTENT_I18N["python:25"].my = {
    title: "Type Error (String နှင့် ဂဏန်း) (enzanshi03.py)",
    concept: "Python သည် သင်္ချာအတွက် `+`, `-`, `*`, `/`, `//`, `%`, နှင့် `**` တို့ကို သုံးသည်။ ဂဏန်းတစ်ခုနှင့် string တစ်ခုကို တိုက်ရိုက်ပေါင်းရန် ကြိုးစားပါက (ဥပမာ၊ `'Number: ' + 5`) Python သည် `TypeError` ကို တက်လာစေသည်။ အကြောင်းမှာ ရှင်းလင်းပြတ်သားသော conversion မရှိဘဲ မတူညီသော data types များကို ပေါင်း၍မရသောကြောင့်ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:25:en"
  };

  window.CONTENT_I18N["python:26"] = window.CONTENT_I18N["python:26"] || {};
  window.CONTENT_I18N["python:26"].my = {
    title: "str() ဖြင့် Type Conversion (enzanshi04.py)",
    concept: "ဂဏန်းတစ်ခုကို string တစ်ခုနှင့် ပေါင်းရန် `str()` ကို သုံးပြီး ဂဏန်းကို string အဖြစ်သို့ ပြောင်းပါ။ ဥပမာ၊ `'Value: ' + str(5)` သည် မှန်ကန်စွာ အလုပ်လုပ်သည်။\n\nOperator precedence: multiplication `*` နှင့် division `/` ကို addition `+` နှင့် subtraction `-` မတိုင်မီ အကဲဖြတ်သည်။ စစ်ဆေးမှု အစဉ်ကို ပြောင်းရန် parentheses `()` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:26:en"
  };

  window.CONTENT_I18N["python:27"] = window.CONTENT_I18N["python:27"] || {};
  window.CONTENT_I18N["python:27"].my = {
    title: "int() ဖြင့် Type Conversion (enzanshi05.py)",
    concept: "String တစ်ခုကို integer အဖြစ်သို့ ပြောင်းရန် `int()` ကိုသုံးပါ။ ဥပမာ၊ `5 + int('3')` သည် `8` ကို ထုတ်ပေးသည်။\n\nMultiplication `*` နှင့် division `/` သည် addition `+` နှင့် subtraction `-` ထက် ဦးစားပေးမှု ပိုမြင့်သည်။ လုပ်ဆောင်မှု အစဉ်ကို ထိန်းချုပ်ရန် parentheses `()` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:27:en"
  };

  window.CONTENT_I18N["python:28"] = window.CONTENT_I18N["python:28"] || {};
  window.CONTENT_I18N["python:28"].my = {
    title: "float() ဖြင့် Type Conversion (enzanshi06.py)",
    concept: "String တစ်ခုကို floating-point ဂဏန်းအဖြစ်သို့ ပြောင်းရန် `float()` ကိုသုံးပါ။ ဥပမာ၊ `5 + float('3.000')` သည် `8.0` ကို ထုတ်ပေးသည်။\n\nသင်သည် conversion များကို ဆက်တွဲနိုင်သည်: `int(float('3.000'))` သည် ဦးစွာ string ကို float အဖြစ်သို့ ပြောင်းပြီး၊ ထို့နောက် integer အဖြစ်သို့ ပြောင်းကာ `3` ကို ထုတ်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:28:en"
  };

  window.CONTENT_I18N["python:29"] = window.CONTENT_I18N["python:29"] || {};
  window.CONTENT_I18N["python:29"].my = {
    title: "Variable များကို သတ်မှတ်ခြင်းနှင့် အသုံးပြုခြင်း (hensu01.py)",
    concept: "**Variable** ဆိုသည်မှာ တန်ဖိုးတစ်ခုကို သိမ်းဆည်းပေးသော အမည်ပေးထားသည့် ကွန်တိန်နာတစ်ခုဖြစ်သည်။ တန်ဖိုးသတ်မှတ်ရန် `=` ကို သုံးပါ၊ `x = 10` ကဲ့သို့။ Variable များကို တန်ဖိုးအသစ်ဖြင့် ပြန်လည်သတ်မှတ်နိုင်သည်။\n\n**Variable အမည်များအတွက် စည်းမျဉ်းများ:** စာလုံး သို့မဟုတ် underscore ဖြင့် စတင်ရမည်၊ ဂဏန်းဖြင့် စတင်၍မရပါ။ ဥပမာ၊ `1num` သည် တရားဝင်မဟုတ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:29:en"
  };

  window.CONTENT_I18N["python:30"] = window.CONTENT_I18N["python:30"] || {};
  window.CONTENT_I18N["python:30"].my = {
    title: "Variable များထံသို့ တန်ဖိုးများ သတ်မှတ်ခြင်း (hensu02.py)",
    concept: "**Variable** သည် တန်ဖိုးတစ်ခုကို သိမ်းဆည်းပြီး ပြန်လည်သတ်မှတ်နိုင်သည်။ ဒေတာကို သိမ်းရန် `variable_name = value` ကိုသုံးပါ။ `=` ၏ ညာဘက်ရှိ တန်ဖိုးကို ဘယ်ဘက်ရှိ variable ထဲသို့ သိမ်းသည်။\n\nVariable များသည် မတူညီသော data type များကို ကိုင်တွယ်နိုင်ပြီး လုံးဝကွဲပြားသော type (ဥပမာ၊ ဂဏန်းမှ string သို့) ဖြင့် ပြန်လည်သတ်မှတ်နိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:30:en"
  };

  window.CONTENT_I18N["python:31"] = window.CONTENT_I18N["python:31"] || {};
  window.CONTENT_I18N["python:31"].my = {
    title: "Variable များကို အသုံးပြု၍ တွက်ချက်ခြင်း (hensu03.py)",
    concept: "**Variable** ဆိုသည်မှာ တန်ဖိုးများကို သိမ်းဆည်းပေးသော အမည်ပေးထားသည့် ကွန်တိန်နာတစ်ခုဖြစ်သည်။ `x = 10` ဖြင့် တန်ဖိုးသတ်မှတ်ပါ။ တန်ဖိုးကို ပြန်လည်သတ်မှတ်ခြင်းဖြင့် ပြောင်းလဲနိုင်သည်။\n\nVariable များကို သင်္ချာ expressions များတွင် သုံးနိုင်သည်။ ဥပမာ၊ `num1 = 5` နှင့် `num2 = 3` ရှိပါက ပေါင်းလဒ်ကို တွက်ချက်သိမ်းရန် `result = num1 + num2` ဟု ရေးနိုင်သည်။ Variable တစ်ခု၏ data type ကို စစ်ရန် `type()` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:31:en"
  };

  window.CONTENT_I18N["python:32"] = window.CONTENT_I18N["python:32"] || {};
  window.CONTENT_I18N["python:32"].my = {
    title: "Variable များနှင့် စာသားများကို တစ်ပြိုင်နက် Output ထုတ်ခြင်း (hensu04.py)",
    concept: "Python သည် လုပ်ဆောင်ချက်တစ်ခုကို assignment နှင့် ပေါင်းစပ်ပေးသော **compound assignment operators** များကို ထောက်ပံ့သည်။ ဥပမာ၊ `a = a + 1` ကို `a += 1` ဟု ပိုတိုတောင်းစွာ ရေးနိုင်သည်။\n\nVariable အများအပြားသို့ တစ်ပြိုင်နက်တန်ဖိုးတူ သတ်မှတ်နိုင်သည်: `a = b = c = 0`။\n\n`print()` တွင် commas များကို သုံးပြီး items အများအပြားကို output ထုတ်ပါ: `print(msg, num1)`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:32:en"
  };

  window.CONTENT_I18N["python:33"] = window.CONTENT_I18N["python:33"] || {};
  window.CONTENT_I18N["python:33"].my = {
    title: "Variable တန်ဖိုးများကို ပြန်လည်ရေးသားခြင်း (hensu06.py)",
    concept: "Variable တစ်ခု၏တန်ဖိုးကို ကျစ်လစ်စွာ update လုပ်ရန် `+=` ကဲ့သို့သော compound assignment operators များကိုသုံးပါ။ ဥပမာ၊ `num1 += 3` သည် `num1` သို့ 3 ကို ပေါင်းထည့်သည်။\n\nVariable အများအပြားသို့ တူညီသောကနဦးတန်ဖိုးကိုလည်း သတ်မှတ်နိုင်သည်: `a = b = c = 0`။\n\nVariable တစ်ခုကို အခြားတစ်ခုမှ assign လုပ်သောအခါ (`num2 = num1`), `num2` သည် တန်ဖိုး၏ copy တစ်ခုကို ရရှိသည်။ ထို့နောက် `num1` ကို ပြောင်းလဲပါက `num2` ကို မထိခိုက်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:33:en"
  };

  window.CONTENT_I18N["python:34"] = window.CONTENT_I18N["python:34"] || {};
  window.CONTENT_I18N["python:34"].my = {
    title: "Variable တစ်ခုမှ အခြားတစ်ခုသို့ သတ်မှတ်ခြင်း (hensu05.py)",
    concept: "ဂဏန်းတစ်ခုကို string တစ်ခုနှင့် ဆက်စပ်ရန် `str()` (type casting) ကို သုံးပြီး ဂဏန်းကို string အဖြစ်သို့ ပြောင်းပါ။ တစ်နည်းအားဖြင့် **f-string** ကိုသုံးပါ: `f'Value is {val}'` သည် curly braces `{}` ကိုသုံးပြီး variable များကို string အတွင်း တိုက်ရိုက်ထည့်နိုင်သည်။\n\nVariable တစ်ခုကို အခြားတစ်ခုသို့ assign လုပ်သောအခါ (`num2 = num1`), `num2` သည် `num1` ၏ လက်ရှိတန်ဖိုးကို copy လုပ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:34:en"
  };

  window.CONTENT_I18N["python:35"] = window.CONTENT_I18N["python:35"] || {};
  window.CONTENT_I18N["python:35"].my = {
    title: "Variable တစ်ခု၏ မိမိတန်ဖိုးကို Update လုပ်ခြင်း (hensu07.py)",
    concept: "ဂဏန်းတစ်ခုကို string တစ်ခုနှင့် ဆက်စပ်ရန် ဂဏန်းကို string အဖြစ်သို့ ပြောင်းရန် `str()` ကိုသုံးပါ။ အခြားနည်းလမ်းမှာ variable များကို တိုက်ရိုက်ထည့်ရန် f-strings: `f'The value is {val}'` ကိုသုံးခြင်းဖြစ်သည်။\n\nVariable တစ်ခုသည် ၎င်း၏ လက်ရှိတန်ဖိုးကို အသုံးပြုကာ update လုပ်နိုင်သည်: `num1 = num1 + 3` သည် တန်ဖိုးဟောင်းကိုဖတ်၊ 3 ကိုပေါင်းကာ ရလဒ်ကို `num1` သို့ ပြန်သိမ်းသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:35:en"
  };

  window.CONTENT_I18N["python:36"] = window.CONTENT_I18N["python:36"] || {};
  window.CONTENT_I18N["python:36"].my = {
    title: "Compound Assignment Operator (+=) (hensu08.py)",
    concept: "Compound assignment operators များသည် variable များကို update လုပ်ရာတွင် code ကို တိုတောင်းစေသည်။ ဥပမာ:\n- `num1 += 3` သည် `num1 = num1 + 3` ၏ အတိုကောက်ဖြစ်သည်\n- `num1 -= 3` သည် `num1 = num1 - 3` ၏ အတိုကောက်ဖြစ်သည်\n- `num1 *= 3` သည် `num1 = num1 * 3` ၏ အတိုကောက်ဖြစ်သည်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:36:en"
  };

  window.CONTENT_I18N["python:37"] = window.CONTENT_I18N["python:37"] || {};
  window.CONTENT_I18N["python:37"].my = {
    title: "String Compound Assignment (hensu09.py)",
    concept: "Compound assignment operators များသည် string များနှင့်လည်း အလုပ်လုပ်သည်:\n- `str1 += 'def'` သည် လက်ရှိ string ၏နောက်တွင် 'def' ကို ဆက်စပ်သည် (`str1 = str1 + 'def'` နှင့် ညီမျှသည်)\n- `str1 *= 3` သည် string ကို 3 ကြိမ် ထပ်လုပ်သည် (`str1 = str1 * 3` နှင့် ညီမျှသည်)\n\nဂဏန်းများကို string သို့ပြောင်းရန် `str()` ကိုသုံးပါ၊ variable များကို သန့်ရှင်းစွာထည့်ရန် f-strings (`f'text {var}'`) ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:37:en"
  };

  window.CONTENT_I18N["python:38"] = window.CONTENT_I18N["python:38"] || {};
  window.CONTENT_I18N["python:38"].my = {
    title: "ကီးဘုတ်မှ Input (input01.py)",
    concept: "အသုံးပြုသူထံမှ ကီးဘုတ်မှတစ်ဆင့် input ရယူရန် `input()` ကိုသုံးပါ။ `input()` မှ ပြန်ပေးသော တန်ဖိုးသည် **အမြဲတမ်း string (str) ဖြစ်သည်** — အသုံးပြုသူသည် ဂဏန်းတစ်ခုကို ရိုက်ထည့်သော်လည်း။\n\nInput ကို ကိန်းဂဏန်းတွက်ချက်မှုများတွင် သုံးရန် ၎င်းကို `int()` သို့မဟုတ် `float()` ဖြင့် ပြောင်းရမည်၊ ဥပမာ `int(input())`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:38:en"
  };

  window.CONTENT_I18N["python:39"] = window.CONTENT_I18N["python:39"] || {};
  window.CONTENT_I18N["python:39"].my = {
    title: "Input တန်ဖိုးများကို ဆက်စပ်ခြင်း (input02.py)",
    concept: "ကီးဘုတ် input လက်ခံရန် `input()` ကိုသုံးပါ။ ပြန်ပေးသော တန်ဖိုးသည် **အမြဲတမ်း string (str) ဖြစ်သည်**။\n\nသင်သည် အသုံးပြုသူအား ဂဏန်းနှစ်ခုတောင်းပြီး `+` ကို တိုက်ရိုက်သုံးပါက ၎င်းတို့ကို **string များအဖြစ် ဆက်စပ်** လိမ့်မည်ဖြစ်ပြီး ကိန်းဂဏန်းအဖြစ် မပေါင်းပါ။ ဥပမာ၊ 5 နှင့် 3 ကို ထည့်ပါက `'5' + '3' = '53'` ကိုရမည်၊ `8` မဟုတ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:39:en"
  };

  window.CONTENT_I18N["python:40"] = window.CONTENT_I18N["python:40"] || {};
  window.CONTENT_I18N["python:40"].my = {
    title: "Input တန်ဖိုးများကို ဂဏန်းသို့ပြောင်းခြင်းနှင့် တွက်ချက်ခြင်း (input03.py)",
    concept: "ကီးဘုတ် input လက်ခံရန် `input()` ကိုသုံးပါ။ `input()` သည် string တစ်ခုကို အမြဲပြန်ပေးသောကြောင့် ကိန်းဂဏန်းတွက်ချက်မှုများတွင် မသုံးမီ ၎င်းကို `int()` သို့မဟုတ် `float()` ဖြင့် cast (ပြောင်း) ရမည်။\n\nဥပမာ:\n```\nstr1 = input('Enter number 1: ')\nnum1 = int(str1)\nstr2 = input('Enter number 2: ')\nnum2 = int(str2)\nprint(num1 + num2)\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:40:en"
  };

  window.CONTENT_I18N["python:41"] = window.CONTENT_I18N["python:41"] || {};
  window.CONTENT_I18N["python:41"].my = {
    title: "တစ်ပြိုင်နက် Input နှင့် Conversion (input04.py)",
    concept: "အတိုချုံးရန်အတွက် `input()` နှင့် `int()` ကို တစ်ကြောင်းတည်းတွင် ပေါင်းစပ်နိုင်သည်:\n```\nnum1 = int(input('Enter number 1: '))\nnum2 = int(input('Enter number 2: '))\nprint(num1 + num2)\n```\n\nသတိရပါ: `input()` သည် string ကိုအမြဲပြန်ပေးသည်။ ကိန်းဂဏန်းလုပ်ဆောင်မှုများမပြုမီ `int()` သို့မဟုတ် `float()` ဖြင့် ပြောင်းရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:41:en"
  };

  window.CONTENT_I18N["python:42"] = window.CONTENT_I18N["python:42"] || {};
  window.CONTENT_I18N["python:42"].my = {
    title: "လေ့ကျင့်ခန်း: Expression များ၏ Data Type ကို ဆုံးဖြတ်ခြင်းနှင့် အတည်ပြုခြင်း (script3-1.py)",
    concept: "**အခန်း ၃ လေ့ကျင့်ခန်း (script3-1.py)**\n\nလုပ်စရာ: အမျိုးမျိုးသော expression များ၏ data type ကို ဆုံးဖြတ်ပြီး အတည်ပြုပါ။\n\nEditor ရှိ template code ကို စစ်ဆေးပြီး ပျောက်နေသော အစိတ်အပိုင်းများကို ဖြည့်စွက်ပါ။ Expression တစ်ခုချင်းစီ၏ data type ကိုပြရန် `print()` အတွင်း `type()` ကိုသုံးပါ၊ ဥပမာ `print(type(1 + 2))`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:42:en"
  };

  window.CONTENT_I18N["python:43"] = window.CONTENT_I18N["python:43"] || {};
  window.CONTENT_I18N["python:43"].my = {
    title: "လေ့ကျင့်ခန်း: String Input နှင့် ဆက်စပ်ခြင်း (script3-2.py)",
    concept: "**အခန်း ၃ လေ့ကျင့်ခန်း (script3-2.py)**\n\nလုပ်စရာ: မျိုးရိုးအမည်နှင့် ကိုယ်ပိုင်အမည်ကို ထည့်သွင်းပြီး ဆက်စပ်၍ output ထုတ်ပါ။\n\nTemplate code ကိုစစ်ဆေးပြီး ပျောက်နေသော အစိတ်အပိုင်းများကို ဖြည့်စွက်ပါ။ အသုံးပြုသူ၏ မျိုးရိုးအမည်နှင့် ကိုယ်ပိုင်အမည်ကိုဖတ်ရန် `input()` ကိုသုံးပါ၊ ထို့နောက် `+` ဖြင့် ပေါင်းစပ်ပြီး ရလဒ်ကို print ထုတ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:43:en"
  };

  window.CONTENT_I18N["python:44"] = window.CONTENT_I18N["python:44"] || {};
  window.CONTENT_I18N["python:44"].my = {
    title: "လေ့ကျင့်ခန်း: ကိန်းဂဏန်း Input နှင့် သင်္ချာလုပ်ဆောင်ချက်များ (script3-3.py)",
    concept: "**အခန်း ၃ လေ့ကျင့်ခန်း (script3-3.py)**\n\nလုပ်စရာ: ကိန်းပြည့်နှစ်ခုကို ထည့်သွင်းပြီး ၎င်းတို့၏ မြှောက်လဒ်ကို တွက်ချက်ပါ။\n\nTemplate code ကိုစစ်ဆေးပြီး ပျောက်နေသော အစိတ်အပိုင်းများကို ဖြည့်စွက်ပါ။ Input string များကို integer သို့ပြောင်းရန် `int()` ကိုသုံးပါ၊ ထို့နောက် ပေါင်းခြင်း၊ နုတ်ခြင်းတို့ကိုလုပ်ဆောင်ကာ string concatenation ဖြင့် ဖော်မတ်ရလဒ်များကို ပြသပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:44:en"
  };

  window.CONTENT_I18N["python:45"] = window.CONTENT_I18N["python:45"] || {};
  window.CONTENT_I18N["python:45"].my = {
    title: "တန်ဖိုးများ၏ တူညီမှု နှိုင်းယှဉ်ခြင်း (hikaku01.py)",
    concept: "**နှိုင်းယှဉ် operator များ** သည် တန်ဖိုးနှစ်ခုကို နှိုင်းယှဉ်ပြီး boolean ရလဒ် (`True` သို့မဟုတ် `False`) ကို ပြန်ပေးသည်:\n- `==` — ညီမျှသည်\n- `!=` — မညီမျှပါ\n- `>` — ကြီးသည်\n- `<` — ငယ်သည်\n- `>=` — ကြီးသည် သို့မဟုတ် ညီသည်\n- `<=` — ငယ်သည် သို့မဟုတ် ညီသည်\n\n**အဖြစ်များသောအမှား:** နှိုင်းယှဉ်ရန် `==` (နှစ်ချောင်း) ကိုသုံးပါ။ တစ်ချောင်း `=` သည် assignment အတွက်ဖြစ်ပြီး `if` condition အတွင်းတွင် error ဖြစ်စေလိမ့်မည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:45:en"
  };

  window.CONTENT_I18N["python:46"] = window.CONTENT_I18N["python:46"] || {};
  window.CONTENT_I18N["python:46"].my = {
    title: "ကိန်းဂဏန်း အရွယ်အစား နှိုင်းယှဉ်ခြင်း (hikaku02.py)",
    concept: "နှိုင်းယှဉ် operator များသည် တန်ဖိုးနှစ်ခုကို နှိုင်းယှဉ်ပြီး `True` သို့မဟုတ် `False` ကို ပြန်ပေးသည်။ ရရှိနိုင်သော operator များ: `==`, `!=`, `>`, `<`, `>=`, `<=`။\n\n**အဖြစ်များသောအမှားများ:**\n- `if` statement ၏အဆုံးတွင် colon `:` ကို အမြဲထည့်ပါ\n- အောက်ရှိ code block ကို နေရာ ၄ နေရာဖြင့် အမြဲ indent လုပ်ပါ\n- Colon ပျောက်ခြင်း သို့မဟုတ် မှားယွင်းသော indentation သည် `IndentationError` သို့မဟုတ် `SyntaxError` ကို ဖြစ်စေသည်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:46:en"
  };

  window.CONTENT_I18N["python:47"] = window.CONTENT_I18N["python:47"] || {};
  window.CONTENT_I18N["python:47"].my = {
    title: "String နှိုင်းယှဉ်ခြင်း (hikaku03.py)",
    concept: "နှိုင်းယှဉ် operator များသည် string များနှင့်လည်း အလုပ်လုပ်သည်။ Python သည် string များကို lexicographically (Unicode character codes အပေါ်အခြေခံသော အက္ခရာစဉ်အလိုက်) နှိုင်းယှဉ်သည်။\n\nဥပမာ၊ `'a' < 'c'` သည် `True` ဟု အဖြေထုတ်သည် — 'a' သည် 'c' ရှေ့တွင်ရှိသောကြောင့်ဖြစ်သည်။\n\n`if` နောက်တွင် colon `:` ကို အမြဲထည့်ပါ၊ body ကို နေရာ ၄ နေရာဖြင့် indent လုပ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:47:en"
  };

  window.CONTENT_I18N["python:48"] = window.CONTENT_I18N["python:48"] || {};
  window.CONTENT_I18N["python:48"].my = {
    title: "မြန်မာစာကြောင်း နှိုင်းယှဉ်ခြင်း (hikaku04.py)",
    concept: "နှိုင်းယှဉ် operator များသည် အင်္ဂလိပ်မဟုတ်သော စာလုံးများနှင့်လည်း အလုပ်လုပ်သည်။ Python သည် ၎င်းတို့ကို Unicode code points အပေါ်အခြေခံ၍ နှိုင်းယှဉ်သည်။\n\nဤဥပမာသည် `if-else` တည်ဆောက်ပုံကို အသုံးပြုသည်:\n- `if` block သည် condition က `True` ဖြစ်သောအခါ run သည်\n- `else` block သည် condition က `False` ဖြစ်သောအခါ run သည်\n\nColon `:` နှင့် သင့်လျော်သော indentation ကို အမြဲသတိရပါ!",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:48:en"
  };

  window.CONTENT_I18N["python:49"] = window.CONTENT_I18N["python:49"] || {};
  window.CONTENT_I18N["python:49"].my = {
    title: "Variable များဖြင့် တန်ဖိုးများ နှိုင်းယှဉ်ခြင်း (hikaku05.py)",
    concept: "နှိုင်းယှဉ် operator များသည် variable များနှင့် တန်ဖိုးများကို နှိုင်းယှဉ်နိုင်သည်။ ဥပမာ:\n```\na = 10\nb = 10\nif a >= b:\n    print('a is greater than or equal to b')\n```\n\n**အဖြစ်များသောအမှားများ:**\n- တူညီမှုနှိုင်းယှဉ်ရန် `==` ကိုသုံးပါ၊ `=` မဟုတ်ပါ\n- `if` စာကြောင်းများ၏အဆုံးတွင် `:` ကို အမြဲထည့်ပါ\n- if-block ကို နေရာ ၄ နေရာဖြင့် indent လုပ်ပါ",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:49:en"
  };

  window.CONTENT_I18N["python:50"] = window.CONTENT_I18N["python:50"] || {};
  window.CONTENT_I18N["python:50"].my = {
    title: "Boolean တန်ဖိုးများဖြင့် အခြေအနေအလိုက် ဆုံးဖြတ်ခြင်း (hikaku06.py)",
    concept: "Boolean variable တစ်ခုကို `if` condition တွင် တိုက်ရိုက်သုံးနိုင်သည်။ ဥပမာ:\n```\nb = True\nif b:\n    print('b is True')\n```\n\n`if b == True` ဟုရေးရန်မလိုပါ — `if b:` ဆိုသည်နှင့် လုံလောက်သည်။\n\n**အဖြစ်များသောအမှားများ:** colon `:` နှင့် နေရာ ၄ နေရာ indentation ကို မမေ့ပါနှင့်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:50:en"
  };

  window.CONTENT_I18N["python:51"] = window.CONTENT_I18N["python:51"] || {};
  window.CONTENT_I18N["python:51"].my = {
    title: "ရိုးရှင်းသော if အကိုင်းအခက် (if01.py)",
    concept: "အခြေအနေတစ်ခုအပေါ်မူတည်၍ အကိုင်းအခက်ခွဲရန် `if` statement ကိုသုံးပါ။ Condition က `True` ဖြစ်သောအခါ၊ indent လုပ်ထားသော block (နေရာ ၄ နေရာ) ကို execute လုပ်သည်။\n\n```\nif condition:\n    # True ဖြစ်သောအခါ run ရန် code\n```\n\nCondition က `False` ဖြစ်ပါက၊ indent လုပ်ထားသော block ကို ကျော်သွားပြီး if-block ပြီးနောက် ဆက်လက် execute လုပ်သည်။\n\n**အဖြစ်များသောအမှားများ:** colon `:` နှင့် နေရာ ၄ နေရာ indentation ကို မမေ့ပါနှင့်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:51:en"
  };

  window.CONTENT_I18N["python:52"] = window.CONTENT_I18N["python:52"] || {};
  window.CONTENT_I18N["python:52"].my = {
    title: "if-elif ဖြင့် သုံးလမ်းခွဲ အကိုင်းအခက် (ifelif01.py)",
    concept: "အကိုင်းအခက် သုံးခု သို့မဟုတ် ထို့ထက်ပိုရန် `elif` (\"else if\" ၏အတိုကောက်) ကိုသုံးပါ။ အခြေအနေများကို အပေါ်မှအောက်သို့ အကဲဖြတ်ပြီး condition က `True` ဖြစ်သော ပထမဆုံး block သာ execute လုပ်မည်။\n\n```\nif condition1:\n    # condition1 True ဖြစ်ပါက run သည်\nelif condition2:\n    # condition2 True ဖြစ်ပါက run သည် (condition1 False ဖြစ်ခဲ့လျှင်)\nelse:\n    # condition များအားလုံး False ဖြစ်ပါက run သည်\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:52:en"
  };

  window.CONTENT_I18N["python:53"] = window.CONTENT_I18N["python:53"] || {};
  window.CONTENT_I18N["python:53"].my = {
    title: "if-else ဖြင့် နှစ်လမ်းခွဲ အကိုင်းအခက် (ifelse01.py)",
    concept: "ဖြစ်နိုင်ခြေနှစ်ခုလုံးကို ကိုင်တွယ်ရန် `if-else` ကိုသုံးပါ: condition က `True` ဖြစ်သောအခါ block တစ်ခု execute လုပ်ပြီး `False` ဖြစ်သောအခါ အခြား block တစ်ခု execute လုပ်သည်။\n\n```\nif condition:\n    # True ဖြစ်သောအခါ run သည်\nelse:\n    # False ဖြစ်သောအခါ run သည်\n```\n\n**အဖြစ်များသောအမှားများ:** `if` နှင့် `else` နှစ်ခုလုံးနောက်တွင် colon `:` ကို မမေ့ပါနှင့်။ block နှစ်ခုလုံးအတွက် နေရာ ၄ နေရာ indentation ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:53:en"
  };

  window.CONTENT_I18N["python:54"] = window.CONTENT_I18N["python:54"] || {};
  window.CONTENT_I18N["python:54"].my = {
    title: "elif များစွာ အသုံးပြုခြင်း (ifelif02.py)",
    concept: "ဖြစ်နိုင်သော အခြေအနေများစွာကို ကိုင်တွယ်ရန် `elif` statement များစွာကို ဆက်တိုက်သုံးနိုင်သည်။ Python သည် ၎င်းတို့ကို အပေါ်မှအောက်သို့ အကဲဖြတ်ပြီး ပထမဆုံး matching block ကိုသာ execute လုပ်သည်။\n\n```\nif condition1:\n    ...\nelif condition2:\n    ...\nelif condition3:\n    ...\nelse:\n    # အထက်ပါတစ်ခုမှမကိုက်ပါက run သည်\n```",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:54:en"
  };

  window.CONTENT_I18N["python:55"] = window.CONTENT_I18N["python:55"] || {};
  window.CONTENT_I18N["python:55"].my = {
    title: "အသိုက်လိုက် အခြေအနေဆုံးဖြတ်ချက်များ (ifnest01.py)",
    concept: "`if` statement တစ်ခုကို အခြား `if` statement အတွင်းတွင် ထားနိုင်သည်။ ၎င်းကို **nesting** ဟုခေါ်သည်။ အဆင့်တစ်ခုစီတွင် နောက်ထပ် နေရာ ၄ နေရာ indentation ထည့်ရသည်။\n\n```\nif outer_condition:\n    # +4 spaces\n    if inner_condition:\n        # +8 spaces\n        print('Both conditions met')\n```\n\nNesting သည် အခြေအနေများစွာကို အစဉ်လိုက်စစ်ဆေးနိုင်စေသည် — တံခါးဖွင့်ပြီးမှ သေတ္တာဖွင့်သကဲ့သို့။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:55:en"
  };

  window.CONTENT_I18N["python:56"] = window.CONTENT_I18N["python:56"] || {};
  window.CONTENT_I18N["python:56"].my = {
    title: "Logical AND (and01.py)",
    concept: "`and` operator သည် အခြေအနေများစွာကို ပေါင်းစပ်သည်။ **နှစ်ခုလုံး** `True` ဖြစ်မှသာ ရလဒ်သည် `True` ဖြစ်သည်။\n\n```\nif a < 10 and a >= 0:\n    print('a is between 0 and 9')\n```\n\n၎င်းသည် သီးခြား `if` statement နှစ်ခုကို အသိုက်လိုက်ရေးခြင်းနှင့် တူညီသော်လည်း ပိုမိုတိုတောင်းသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:56:en"
  };

  window.CONTENT_I18N["python:57"] = window.CONTENT_I18N["python:57"] || {};
  window.CONTENT_I18N["python:57"].my = {
    title: "ကွင်းဆက်နှိုင်းယှဉ်ခြင်း (and02.py)",
    concept: "Python သည် သန့်ရှင်းသော code အတွက် **ကွင်းဆက်နှိုင်းယှဉ်မှုများ (chained comparisons)** ကို ခွင့်ပြုသည်။ `if a < 10 and a >= 0` အစား ဤသို့ရေးနိုင်သည်:\n\n```\nif 0 <= a < 10:\n    print('a is between 0 and 9')\n```\n\n၎င်းသည် သင်္ချာမညီမျှခြင်းကဲ့သို့ သဘာဝကျကျဖတ်ရပြီး `and` သုံးခြင်းထက် ပိုမိုရှင်းလင်းသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:57:en"
  };

  window.CONTENT_I18N["python:58"] = window.CONTENT_I18N["python:58"] || {};
  window.CONTENT_I18N["python:58"].my = {
    title: "Logical OR (or01.py)",
    concept: "`or` operator သည် အခြေအနေများစွာကို ပေါင်းစပ်သည်။ အခြေအနေများထဲမှ **အနည်းဆုံးတစ်ခု** `True` ဖြစ်ပါက ရလဒ်သည် `True` ဖြစ်သည်။\n\n```\nif a > 10 or a <= 0:\n    print('a is outside the range 0-10')\n```\n\n`or` သည် တစ်ဖက်ဖက် (သို့မဟုတ် နှစ်ဖက်လုံး) `True` ဖြစ်သောအခါ `True` ဖြစ်သည်။ နှစ်ဖက်လုံး `False` ဖြစ်မှသာ `False` ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:58:en"
  };

  window.CONTENT_I18N["python:59"] = window.CONTENT_I18N["python:59"] || {};
  window.CONTENT_I18N["python:59"].my = {
    title: "Logical NOT (not01.py)",
    concept: "`not` operator သည် boolean တန်ဖိုးကို **ပြောင်းပြန်လှန်** ပေးသည်။ `not True` သည် `False` ဖြစ်လာပြီး `not False` သည် `True` ဖြစ်လာသည်။\n\n```\nif not a < 10:\n    print('a is NOT less than 10')\n```\n\n`not` သည် unary operator တစ်ခုဖြစ်သည် — ၎င်းသည် တစ်ခုတည်းသော condition သို့မဟုတ် တန်ဖိုးပေါ်တွင် အလုပ်လုပ်ကာ ၎င်း၏ truth value ကို ပြောင်းပြန်လှန်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:59:en"
  };

  window.CONTENT_I18N["python:60"] = window.CONTENT_I18N["python:60"] || {};
  window.CONTENT_I18N["python:60"].my = {
    title: "Boolean ပြောင်းပြန်လှန်ခြင်း (not02.py)",
    concept: "Variable တစ်ခုတွင် သိမ်းထားသော boolean တန်ဖိုးကို ပြောင်းပြန်လှန်ရန် `not` ကိုသုံးပါ:\n\n```\nb = False\nif not b:\n    print('b is not True')\n```\n\n`not False` သည် `True` နှင့်ညီသောကြောင့် `if` block သည် execute လုပ်သည်။\n\n**အဖြစ်များသောအမှားများ:** `if` စာကြောင်းနောက်တွင် colon `:` ကို မမေ့ပါနှင့်၊ code block အတွက် နေရာ ၄ နေရာ indentation ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:60:en"
  };

  window.CONTENT_I18N["python:61"] = window.CONTENT_I18N["python:61"] || {};
  window.CONTENT_I18N["python:61"].my = {
    title: "ကော်လံ: တန်ဖိုးတည်ရှိမှု စစ်ဆေးခြင်း (column01.py)",
    concept: "`not` operator သည် condition တစ်ခု၏ရလဒ်ကို ပြောင်းပြန်လှန်သည်။ `not True` သည် `False` ဖြစ်လာပြီး `not False` သည် `True` ဖြစ်လာသည်။ ဤကော်လံသည် conditional expressions များအတွင်းရှိ ကိန်းဂဏန်းတန်ဖိုးများ၏ truthiness အကဲဖြတ်ခြင်းကိုလည်း အကျုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:61:en"
  };

  window.CONTENT_I18N["python:62"] = window.CONTENT_I18N["python:62"] || {};
  window.CONTENT_I18N["python:62"].my = {
    title: "ကော်လံ: Ternary Operator (Conditional Expression) (column02.py)",
    concept: "`not` operator သည် condition တစ်ခု၏ရလဒ်ကို ပြောင်းပြန်လှန်သည်။ `not True` သည် `False` ဖြစ်လာပြီး `not False` သည် `True` ဖြစ်လာသည်။ ဤကော်လံသည် အခြေအနေတစ်ခုအပေါ်မူတည်၍ တိုတောင်းသော တန်ဖိုးသတ်မှတ်ခြင်းအတွက် conditional expressions (ternary operator) ကိုအသုံးပြုခြင်းကို အကျုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:62:en"
  };

  window.CONTENT_I18N["python:63"] = window.CONTENT_I18N["python:63"] || {};
  window.CONTENT_I18N["python:63"].my = {
    title: "လေ့ကျင့်ခန်း: အပေါင်း၊ အနှုတ် သို့မဟုတ် သုည စစ်ဆေးခြင်း (script4-1.py)",
    concept: "**အခန်း ၄ လေ့ကျင့်ခန်း (script4-1.py)**\n\nလုပ်စရာ: ကိန်းပြည့်တစ်ခုသည် အပေါင်း၊ အနှုတ် သို့မဟုတ် သုည ဟုတ်မဟုတ် ဆုံးဖြတ်ပါ။\n\nEditor ရှိ template code ကိုစစ်ဆေးပြီး ပျောက်နေသော အစိတ်အပိုင်းများကို ဖြည့်စွက်ကာ ပရိုဂရမ်ကို ပြီးမြောက်အောင်လုပ်ပါ။ output ကိုအတည်ပြုရန် ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:63:en"
  };

  window.CONTENT_I18N["python:64"] = window.CONTENT_I18N["python:64"] || {};
  window.CONTENT_I18N["python:64"].my = {
    title: "လေ့ကျင့်ခန်း: ဂဏန်းနှစ်ခု နှိုင်းယှဉ်ခြင်း (script4-2.py)",
    concept: "**အခန်း ၄ လေ့ကျင့်ခန်း (script4-2.py)**\n\nလုပ်စရာ: floating-point ဂဏန်းနှစ်ခုကို ထည့်သွင်းပြီး ၎င်းတို့၏ အရွယ်အစားကို နှိုင်းယှဉ်ပါ။\n\nEditor ရှိ template code ကိုစစ်ဆေးပြီး ပျောက်နေသော အစိတ်အပိုင်းများကို ဖြည့်စွက်ကာ ပရိုဂရမ်ကို ပြီးမြောက်အောင်လုပ်ပါ။ output ကိုအတည်ပြုရန် ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:64:en"
  };

  window.CONTENT_I18N["python:65"] = window.CONTENT_I18N["python:65"] || {};
  window.CONTENT_I18N["python:65"].my = {
    title: "လေ့ကျင့်ခန်း: အချိန်ဇုန်အလိုက် အလိုအလျောက် နှုတ်ဆက်ခြင်း (script4-3.py)",
    concept: "**အခန်း ၄ လေ့ကျင့်ခန်း (script4-3.py)**\n\nလုပ်စရာ: ၂၄ နာရီအချိန် input တစ်ခုအပေါ်မူတည်၍ နှုတ်ဆက်စကားကို print ထုတ်ပါ။\n\nEditor ရှိ template code ကိုစစ်ဆေးပြီး ပျောက်နေသော အစိတ်အပိုင်းများကို ဖြည့်စွက်ပါ။ အချိန်အကွာအဝေးများစွာကိုစစ်ဆေးရန် ကွင်းဆက်နှိုင်းယှဉ်မှုများနှင့် `or` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:65:en"
  };

  window.CONTENT_I18N["python:66"] = window.CONTENT_I18N["python:66"] || {};
  window.CONTENT_I18N["python:66"].my = {
    title: "List တစ်ခုကို ဖန်တီးခြင်းနှင့် Output ထုတ်ခြင်း (list01.py)",
    concept: "**List** ဆိုသည်မှာ တန်ဖိုးများစွာကို အတူတကွသိမ်းဆည်းပေးသော collection တစ်ခုဖြစ်သည်။ လေးထောင့်ကွင်း `[]` ကိုသုံးပြီး element များကို comma ဖြင့်ခြားကာ list တစ်ခုကိုဖန်တီးပါ။ `list[index]` ဖြင့် element များကိုရယူပါ။ **Indexing သည် 0 မှစသည်** ကိုသတိရပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:66:en"
  };

  window.CONTENT_I18N["python:67"] = window.CONTENT_I18N["python:67"] || {};
  window.CONTENT_I18N["python:67"].my = {
    title: "အသိုက်လိုက် List များ (list02.py)",
    concept: "**List** ဆိုသည်မှာ တန်ဖိုးများစွာကို အတူတကွသိမ်းဆည်းပေးသော collection တစ်ခုဖြစ်သည်။ List များကို **အသိုက်လိုက် (nested)** ထားနိုင်သည် — list တစ်ခုသည် အခြား list တစ်ခုကို element အဖြစ် ထည့်သွင်းနိုင်သည်။ လေးထောင့်ကွင်း `[]` ဖြင့် list များကိုဖန်တီးပါ။ `list[index]` ဖြင့် element များကိုရယူပြီး **indexing သည် 0 မှစသည်**။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:67:en"
  };

  window.CONTENT_I18N["python:68"] = window.CONTENT_I18N["python:68"] || {};
  window.CONTENT_I18N["python:68"].my = {
    title: "Index ဖြင့် Element များကို ရယူခြင်း (list03.py)",
    concept: "**List** သည် တန်ဖိုးများစွာကို လေးထောင့်ကွင်း `[]` အတွင်းတွင် သိမ်းဆည်းသည်။ `list[index]` ကိုသုံးပြီး တစ်ခုချင်းစီ element များကိုရယူပါ။ **Indexing သည် 0 မှစသည်**၊ ထို့ကြောင့် `list[0]` သည် ပထမ element၊ `list[1]` သည် ဒုတိယ element စသည်ဖြင့်ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:68:en"
  };

  window.CONTENT_I18N["python:69"] = window.CONTENT_I18N["python:69"] || {};
  window.CONTENT_I18N["python:69"].my = {
    title: "အနှုတ် Index များ အသုံးပြုခြင်း (list04.py)",
    concept: "**List** သည် တန်ဖိုးများစွာကို လေးထောင့်ကွင်း `[]` အတွင်းတွင် သိမ်းဆည်းသည်။ Python သည် **negative indexing** ကို ထောက်ပံ့သည်: `list[-1]` သည် နောက်ဆုံး element ကိုပြန်ပေးပြီး `list[-2]` သည် နောက်မှဒုတိယ element စသည်ဖြင့်ဖြစ်သည်။ ၎င်းသည် list ၏အဆုံးမှ element များကိုရယူရန် အဆင်ပြေသောနည်းလမ်းဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:69:en"
  };

  window.CONTENT_I18N["python:70"] = window.CONTENT_I18N["python:70"] || {};
  window.CONTENT_I18N["python:70"].my = {
    title: "Slicing: Element အကွာအဝေးတစ်ခုကို ရယူခြင်း (list05.py)",
    concept: "**List** သည် တန်ဖိုးများစွာကို လေးထောင့်ကွင်း `[]` အတွင်းတွင် သိမ်းဆည်းသည်။ **Slicing** (`list[start:end]`) ကိုသုံးပြီး sublist တစ်ခုကို ထုတ်ယူပါ။ Start index သည် ပါဝင်သော်လည်း end index သည် **ဖယ်ထုတ်ထားသည်**။ ဥပမာ၊ `lst[1:3]` သည် position 1 နှင့် 2 ရှိ element များကို ပြန်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:70:en"
  };

  window.CONTENT_I18N["python:71"] = window.CONTENT_I18N["python:71"] || {};
  window.CONTENT_I18N["python:71"].my = {
    title: "Slice ၏ အစနှင့်အဆုံးကို ချန်လှပ်ခြင်း (list06.py)",
    concept: "**List** သည် တန်ဖိုးများစွာကို လေးထောင့်ကွင်း `[]` အတွင်းတွင် သိမ်းဆည်းသည်။ Slice `list[start:end]` တွင် start သို့မဟုတ် end index ကို **ချန်လှပ်** နိုင်သည်။ `lst[:2]` သည် အစမှ index 2 အထိ (သို့သော် index 2 မပါ) element များကိုရယူသည်။ `lst[1:]` သည် index 1 မှအဆုံးအထိ element များကိုရယူသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:71:en"
  };

  window.CONTENT_I18N["python:72"] = window.CONTENT_I18N["python:72"] || {};
  window.CONTENT_I18N["python:72"].my = {
    title: "List Unpacking (list07.py)",
    concept: "အသုံးများသော list လုပ်ဆောင်ချက်များ:\n\n- `append(value)` — အဆုံးတွင် ထည့်ရန်\n- `insert(position, value)` — သတ်မှတ်နေရာတွင် ထည့်သွင်းရန်\n- `pop(position)` — နေရာတစ်ခုမှ element ကိုဖယ်ရှားပြီး ပြန်ပေးရန်\n- `remove(value)` — ပထမဆုံးကိုက်ညီသော element ကိုဖယ်ရှားရန်\n- `del list[position]` — နေရာအလိုက် ဖျက်ရန်\n\n**Unpacking** သည် list element တစ်ခုစီကို variable တစ်ခုစီသို့ သတ်မှတ်ပေးသည်: `a, b, c = lst`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:72:en"
  };

  window.CONTENT_I18N["python:73"] = window.CONTENT_I18N["python:73"] || {};
  window.CONTENT_I18N["python:73"].my = {
    title: "Unpacking Element အရေအတွက် မကိုက်ညီမှု Error (list08.py)",
    concept: "အသုံးများသော list လုပ်ဆောင်ချက်များတွင် `append()`, `insert()`, `pop()`, `remove()`, နှင့် `del` တို့ပါဝင်သည်။ List တစ်ခုကို variable များအဖြစ် unpacking လုပ်သောအခါ variable အရေအတွက်သည် element အရေအတွက်နှင့် **ကိုက်ညီရမည်**။ `a, b = lst` ဟုရေးသော်လည်း `lst` တွင် element ၃ ခုရှိပါက Python သည် **ValueError** ကိုတက်စေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:73:en"
  };

  window.CONTENT_I18N["python:74"] = window.CONTENT_I18N["python:74"] || {};
  window.CONTENT_I18N["python:74"].my = {
    title: "`in` ဖြင့် တည်ရှိမှု စစ်ဆေးခြင်း (list09.py)",
    concept: "အသုံးများသော list လုပ်ဆောင်ချက်များတွင် `append()`, `insert()`, `pop()`, `remove()`, နှင့် `del` တို့ပါဝင်သည်။ List တစ်ခုတွင် တန်ဖိုးတစ်ခုရှိမရှိစစ်ဆေးရန် `in` operator ကိုသုံးပါ: `'abc' in lst` သည် `True` သို့မဟုတ် `False` ကိုပြန်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:74:en"
  };

  window.CONTENT_I18N["python:75"] = window.CONTENT_I18N["python:75"] || {};
  window.CONTENT_I18N["python:75"].my = {
    title: "index() ဖြင့် Element နေရာရှာဖွေခြင်း (list10.py)",
    concept: "အသုံးများသော list လုပ်ဆောင်ချက်များတွင် `append()`, `insert()`, `pop()`, `remove()`, နှင့် `del` တို့ပါဝင်သည်။ တိကျသော element တစ်ခု၏ index နေရာကိုရှာရန် `list.index(value)` ကိုသုံးပါ။ Element မရှိပါက Python သည် **ValueError** ကိုတက်စေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:75:en"
  };

  window.CONTENT_I18N["python:76"] = window.CONTENT_I18N["python:76"] || {};
  window.CONTENT_I18N["python:76"].my = {
    title: "Index အလိုက် Element များကို ပြောင်းလဲခြင်း (list11.py)",
    concept: "အသုံးများသော list လုပ်ဆောင်ချက်များတွင် `append()`, `insert()`, `pop()`, `remove()`, နှင့် `del` တို့ပါဝင်သည်။ Index တစ်ခုသို့ တန်ဖိုးအသစ်သတ်မှတ်ခြင်းဖြင့် list element ကိုပြောင်းလဲနိုင်သည်: `lst[1] = 6.2`။ List များသည် **mutable** ဖြစ်သည် — ဆိုလိုသည်မှာ ၎င်းတို့၏ပါဝင်မှုကို ဖန်တီးပြီးနောက် ပြောင်းလဲနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:76:en"
  };

  window.CONTENT_I18N["python:77"] = window.CONTENT_I18N["python:77"] || {};
  window.CONTENT_I18N["python:77"].my = {
    title: "+= ဖြင့် List များကို ဆက်စပ်ခြင်း (list12.py)",
    concept: "အသုံးများသော list လုပ်ဆောင်ချက်များတွင် `append()`, `insert()`, `pop()`, `remove()`, နှင့် `del` တို့ပါဝင်သည်။ အခြား list မှ element များဖြင့် list တစ်ခုကိုချဲ့ရန် `+=` operator ကိုသုံးပါ: `lst += [20]` သည် 20 ကို `lst` ၏အဆုံးတွင် ထည့်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:77:en"
  };

  window.CONTENT_I18N["python:78"] = window.CONTENT_I18N["python:78"] || {};
  window.CONTENT_I18N["python:78"].my = {
    title: "append() ဖြင့် Element များထည့်ခြင်း (list13.py)",
    concept: "အသုံးများသော list လုပ်ဆောင်ချက်များတွင် `append()`, `insert()`, `pop()`, `remove()`, နှင့် `del` တို့ပါဝင်သည်။ List တစ်ခု၏ **အဆုံး**တွင် element တစ်ခုတည်းထည့်ရန် `list.append(value)` ကိုသုံးပါ။ ၎င်းသည် list တစ်ခုကို dynamically ကြီးထွားစေရန် အသုံးအများဆုံးနည်းလမ်းဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:78:en"
  };

  window.CONTENT_I18N["python:79"] = window.CONTENT_I18N["python:79"] || {};
  window.CONTENT_I18N["python:79"].my = {
    title: "insert() ဖြင့် နေရာသတ်မှတ်ထည့်သွင်းခြင်း (list14.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် ရှာဖွေခြင်း၊ စီခြင်းနှင့် ကူးယူခြင်းတို့ပါဝင်သည်:\n\n- `index(value)` — တန်ဖိုးတစ်ခု၏ index ကိုရယူရန်\n- `count(value)` — ကိုက်ညီသော element များကိုရေတွက်ရန်\n- `sort()` — ငယ်စဉ်ကြီးလိုက်စီရန်\n- `reverse()` — အစဉ်လိုက်ပြောင်းပြန်လှန်ရန်\n- `copy()` — Shallow copy တစ်ခုဖန်တီးရန်\n\nတိကျသော index တစ်ခုတွင်ထည့်ရန် `insert(position, value)` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:79:en"
  };

  window.CONTENT_I18N["python:80"] = window.CONTENT_I18N["python:80"] || {};
  window.CONTENT_I18N["python:80"].my = {
    title: "del ဖြင့် Element များကို ဖျက်ခြင်း (list15.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် `index()`, `count()`, `sort()`, `reverse()`, နှင့် `copy()` တို့ပါဝင်သည်။ List သို့မဟုတ် dictionary တစ်ခုမှ တိကျသော နေရာတစ်ခုရှိ element တစ်ခုကို အပြီးတိုင်ဖျက်ရန် `del list[index]` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:80:en"
  };

  window.CONTENT_I18N["python:81"] = window.CONTENT_I18N["python:81"] || {};
  window.CONTENT_I18N["python:81"].my = {
    title: "pop() ဖြင့် Element များကို ထုတ်ယူဖျက်ခြင်း (list16.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် `index()`, `count()`, `sort()`, `reverse()`, နှင့် `copy()` တို့ပါဝင်သည်။ သတ်မှတ်ထားသော နေရာတစ်ခုမှ element တစ်ခုကို **ဖယ်ရှားပြီး ပြန်ပေးရန်** `list.pop(index)` ကိုသုံးပါ။ index မပေးပါက `pop()` သည် **နောက်ဆုံး** element ကို ဖယ်ရှားပြီး ပြန်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:81:en"
  };

  window.CONTENT_I18N["python:82"] = window.CONTENT_I18N["python:82"] || {};
  window.CONTENT_I18N["python:82"].my = {
    title: "remove() ဖြင့် တန်ဖိုးအလိုက် ဖျက်ခြင်း (list17.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် `index()`, `count()`, `sort()`, `reverse()`, နှင့် `copy()` တို့ပါဝင်သည်။ List တစ်ခုမှ သတ်မှတ်တန်ဖိုးတစ်ခု၏ **ပထမဆုံးတွေ့ရှိရသော** နေရာကို ဖျက်ရန် `list.remove(value)` ကိုသုံးပါ။ တန်ဖိုးကိုရှာမတွေ့ပါက Python သည် **ValueError** ကို မြှင့်တင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:82:en"
  };

  window.CONTENT_I18N["python:83"] = window.CONTENT_I18N["python:83"] || {};
  window.CONTENT_I18N["python:83"].my = {
    title: "တည်ရှိမှုကို ဦးစွာစစ်ဆေးပြီး ဘေးကင်းစွာ ဖျက်ခြင်း (list18.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် `index()`, `count()`, `sort()`, `reverse()`, နှင့် `copy()` တို့ပါဝင်သည်။ ဖျက်သည့်အခါ အမှားအယွင်းများကိုရှောင်ရှားရန် `in` ကိုသုံးပြီး တန်ဖိုးရှိမရှိကို ဦးစွာစစ်ဆေးပါ: `lst.remove('XYZ')` ကိုမခေါ်မီ `if 'XYZ' in lst:` ဟုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:83:en"
  };

  window.CONTENT_I18N["python:84"] = window.CONTENT_I18N["python:84"] || {};
  window.CONTENT_I18N["python:84"].my = {
    title: "len() ဖြင့် List ၏အရှည်ကိုရယူခြင်း (list19.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် `index()`, `count()`, `sort()`, `reverse()`, နှင့် `copy()` တို့ပါဝင်သည်။ List တစ်ခုရှိ element အရေအတွက်ကိုရရန် `len(list)` ကိုသုံးပါ။ `len()` သည် list များ၊ tuple များ၊ string များနှင့် အခြား collection များတွင် အလုပ်လုပ်သော Python ၏ built-in function တစ်ခုဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:84:en"
  };

  window.CONTENT_I18N["python:85"] = window.CONTENT_I18N["python:85"] || {};
  window.CONTENT_I18N["python:85"].my = {
    title: "နောက်ဆုံး Element ကို ဘေးကင်းစွာရယူခြင်း (list20.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် `index()`, `count()`, `sort()`, `reverse()`, နှင့် `copy()` တို့ပါဝင်သည်။ နောက်ဆုံး element ကိုဘေးကင်းစွာရယူရန် `list[len(list) - 1]` ကိုသုံးပါ။ အနှုတ် index ကိုလည်းသုံးနိုင်သည်: `list[-1]` သည် ပိုမိုရိုးရှင်းပြီး ပိုအသုံးများသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:85:en"
  };

  window.CONTENT_I18N["python:86"] = window.CONTENT_I18N["python:86"] || {};
  window.CONTENT_I18N["python:86"].my = {
    title: "ကော်လံ: min() နှင့် max() (listcolumn01.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် `index()`, `count()`, `sort()`, `reverse()`, နှင့် `copy()` တို့ပါဝင်သည်။ အသေးဆုံးတန်ဖိုးရရန် `min(list)` နှင့် အကြီးဆုံးတန်ဖိုးရရန် `max(list)` ကိုသုံးပါ။ ဤ built-in function များသည် နှိုင်းယှဉ်နိုင်သော element များပါဝင်သည့် မည်သည့် iterable တွင်မဆို အလုပ်လုပ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:86:en"
  };

  window.CONTENT_I18N["python:87"] = window.CONTENT_I18N["python:87"] || {};
  window.CONTENT_I18N["python:87"].my = {
    title: "ကော်လံ: ရောနှောထားသော အမျိုးအစားများတွင် လွန်ကဲတန်ဖိုးအမှား (listcolumn02.py)",
    concept: "အဆင့်မြင့် list လုပ်ဆောင်ချက်များတွင် `index()`, `count()`, `sort()`, `reverse()`, နှင့် `copy()` တို့ပါဝင်သည်။ `min()` နှင့် `max()` သည် ရောနှောထားသော အမျိုးအစားများ (ဥပမာ၊ ဂဏန်းများနှင့် string များ) ပါဝင်သော list များတွင် **အလုပ်မလုပ်ပါ**။ နှိုင်းယှဉ်၍မရသော အမျိုးအစားများကို နှိုင်းယှဉ်ကြည့်ပါက **TypeError** ကို မြှင့်တင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:87:en"
  };

  window.CONTENT_I18N["python:88"] = window.CONTENT_I18N["python:88"] || {};
  window.CONTENT_I18N["python:88"].my = {
    title: "Tuple ပြုပြင်မွမ်းမံခြင်း အမှား (tuple01.py)",
    concept: "**Tuple** သည် list နှင့်ဆင်သော်လည်း ၎င်း၏ element များကို ဖန်တီးပြီးနောက် **ပြောင်းလဲခြင်း၊ ထည့်ခြင်း၊ သို့မဟုတ် ဖယ်ရှားခြင်း မပြုနိုင်ပါ**။ ကွင်းပိတ်စုံ `()` ဖြင့် tuple တစ်ခုကိုဖန်တီးပါ။ ဒေတာကို မတော်တဆ ပြုပြင်မွမ်းမံခြင်းမှ ကာကွယ်လိုသည့်အခါ tuple ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:88:en"
  };

  window.CONTENT_I18N["python:89"] = window.CONTENT_I18N["python:89"] || {};
  window.CONTENT_I18N["python:89"].my = {
    title: "Tuple များကိုဖန်တီးခြင်းနှင့် အသုံးပြုခြင်း (tuple02.py)",
    concept: "**Tuple** သည် list နှင့်ဆင်သော်လည်း ၎င်း၏ element များကို ဖန်တီးပြီးနောက် **ပြောင်းလဲခြင်း၊ ထည့်ခြင်း၊ သို့မဟုတ် ဖယ်ရှားခြင်း မပြုနိုင်ပါ**။ ကွင်းပိတ်စုံ `()` ဖြင့် tuple တစ်ခုကိုဖန်တီးပါ။ Tuple များသည် **ပြောင်းလဲ၍မရသော (immutable)** — ပရိုဂရမ်တစ်လျှောက် ဒေတာကို မပြောင်းလဲစေလိုသည့်အခါ ၎င်းတို့ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:89:en"
  };

  window.CONTENT_I18N["python:90"] = window.CONTENT_I18N["python:90"] || {};
  window.CONTENT_I18N["python:90"].my = {
    title: "Element တစ်ခုတည်းပါသော Tuple ဖန်တီးခြင်း သတိပြုစရာများ (tuple03.py)",
    concept: "**Tuple** သည် ကွင်းပိတ်စုံ `()` ဖြင့်ဖန်တီးထားသော ပြောင်းလဲ၍မရသော collection တစ်ခုဖြစ်သည်။ Element တစ်ခုတည်းပါသော tuple တစ်ခုကိုဖန်တီးရန် နောက်တွင် ကော်မာ **ထည့်ရန် လိုအပ်သည်**: `(10,)`။ ကော်မာမပါဘဲ `(10)` ဟုရေးပါက integer တစ်ခုကိုဖန်တီးသည်၊ tuple မဟုတ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:90:en"
  };

  window.CONTENT_I18N["python:91"] = window.CONTENT_I18N["python:91"] || {};
  window.CONTENT_I18N["python:91"].my = {
    title: "Tuple ၏ Element များကိုရယူခြင်းနှင့် ဖြတ်တောက်ခြင်း (tuple04.py)",
    concept: "**Tuple** သည် ကွင်းပိတ်စုံ `()` ဖြင့်ဖန်တီးထားသော ပြောင်းလဲ၍မရသော collection တစ်ခုဖြစ်သည်။ Tuple များကို ပြုပြင်၍မရသော်လည်း သင်သည် index သုံး၍ (`tpl[1]`) နှင့် slicing သုံး၍ (`tpl[1:3]`) element များကို **ဖတ်နိုင်သည်** — list များကဲ့သို့ပင်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:91:en"
  };

  window.CONTENT_I18N["python:92"] = window.CONTENT_I18N["python:92"] || {};
  window.CONTENT_I18N["python:92"].my = {
    title: "len() ဖြင့် Tuple ၏အရှည်ကိုရယူခြင်း (tuple05.py)",
    concept: "**Tuple** သည် ကွင်းပိတ်စုံ `()` ဖြင့်ဖန်တီးထားသော ပြောင်းလဲ၍မရသော collection တစ်ခုဖြစ်သည်။ Element အရေအတွက်ကိုရရန် `len(tuple)` ကိုသုံးပါ။ `in` အော်ပရေတာသည် tuple များတွင်လည်း အလုပ်လုပ်သည်: `3.14 in tpl` သည် `True` သို့မဟုတ် `False` ကို ပြန်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:92:en"
  };

  window.CONTENT_I18N["python:93"] = window.CONTENT_I18N["python:93"] || {};
  window.CONTENT_I18N["python:93"].my = {
    title: "ကော်လံ: List နှင့် Tuple အကြား အပြန်အလှန်ပြောင်းလဲခြင်း (tuplecolumun.py)",
    concept: "**Tuple** သည် ပြောင်းလဲ၍မရသော collection တစ်ခုဖြစ်သည်။ Tuple တစ်ခုကို ပြောင်းလဲနိုင်စေရန် `list(tuple)` ဖြင့် list အဖြစ်ပြောင်းပါ။ List တစ်ခုကို ပြောင်းလဲ၍မရစေရန် `tuple(list)` ဖြင့် tuple အဖြစ်ပြောင်းပါ။ ဤပြောင်းလဲခြင်းသည် tuple ဒေတာကို ယာယီပြုပြင်မွမ်းမံရန် လိုအပ်သည့်အခါ အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:93:en"
  };

  window.CONTENT_I18N["python:94"] = window.CONTENT_I18N["python:94"] || {};
  window.CONTENT_I18N["python:94"].my = {
    title: "Dictionary တစ်ခုကိုဖန်တီးခြင်းနှင့် ထုတ်ပြခြင်း (jisho01.py)",
    concept: "**Dictionary (dict)** သည် key-value pair များကိုသိမ်းဆည်းသည်။ လက်ကွင်းစုံ `{}` ဖြင့် `{key: value}` syntax သုံးကာ dictionary တစ်ခုကိုဖန်တီးပါ။ ဂဏန်း index အစား `dict[key]` သုံးပြီး key ဖြင့် element များကိုရယူပါ။ Key များသည် တစ်ခုတည်းသာရှိပြီး မြန်ဆန်သော lookup ကိုပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:94:en"
  };

  window.CONTENT_I18N["python:95"] = window.CONTENT_I18N["python:95"] || {};
  window.CONTENT_I18N["python:95"].my = {
    title: "Key များထပ်နေသည့်အခါ အလုပ်လုပ်ပုံ (jisho02.py)",
    concept: "**Dictionary (dict)** သည် လက်ကွင်းစုံ `{}` ကိုသုံးပြီး key-value pair များကိုသိမ်းဆည်းသည်။ Dictionary key များသည် **တစ်ခုတည်းသာရှိရမည်**။ တူညီသော key ကို နှစ်ကြိမ်သတ်မှတ်ပါက **နောက်ဆုံး value က အစောပိုင်း value ကို အစားထိုးသည်**။ အမှားအယွင်းမရှိပါ — ထပ်နေသော key ၏ value ကို အစားထိုးလိုက်ရုံသာဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:95:en"
  };

  window.CONTENT_I18N["python:96"] = window.CONTENT_I18N["python:96"] || {};
  window.CONTENT_I18N["python:96"].my = {
    title: "Key ဖြင့် တန်ဖိုးများကိုရယူခြင်း (jisho03.py)",
    concept: "**Dictionary (dict)** သည် key-value pair များကိုသိမ်းဆည်းသည်။ Key တစ်ခုဖြင့် တန်ဖိုးကိုရယူရန် bracket notation: `dct[key]` ကိုသုံးပါ။ Key မရှိပါက Python သည် **KeyError** ကို မြှင့်တင်သည်။ List များနှင့်မတူဘဲ dictionary များသည် ဂဏန်း index ကိုမသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:96:en"
  };

  window.CONTENT_I18N["python:97"] = window.CONTENT_I18N["python:97"] || {};
  window.CONTENT_I18N["python:97"].my = {
    title: "Dictionary Slice မပံ့ပိုးနိုင်သောအမှား (jisho04.py)",
    concept: "**Dictionary (dict)** သည် key-value pair များကိုသိမ်းဆည်းသည်။ Dictionary များသည် list များကဲ့သို့ **slicing ကို မပံ့ပိုးပါ**။ Dictionary တစ်ခုပေါ်တွင် `dct[:2]` ကဲ့သို့သော slice notation ကိုသုံးရန် ကြိုးစားပါက dictionary များသည် အစဉ်မရှိဘဲ key ဖြင့်ရယူသောကြောင့် **TypeError** ကို မြှင့်တင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:97:en"
  };

  window.CONTENT_I18N["python:98"] = window.CONTENT_I18N["python:98"] || {};
  window.CONTENT_I18N["python:98"].my = {
    title: "get() Method ဖြင့် ဘေးကင်းစွာ တန်ဖိုးရယူခြင်း (jisho05.py)",
    concept: "**Dictionary (dict)** သည် key-value pair များကိုသိမ်းဆည်းသည်။ ဘေးကင်းစွာရယူရန် `dict.get(key)` ကိုသုံးပါ — key မရှိပါက **KeyError** မြှင့်တင်မည့်အစား `None` (သို့မဟုတ် ပုံသေတန်ဖိုး) ကို ပြန်ပေးသည်။ ဥပမာ၊ `dct.get(999, 'not found')` သည် key 999 မရှိပါက `'not found'` ကိုပြန်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:98:en"
  };

  window.CONTENT_I18N["python:99"] = window.CONTENT_I18N["python:99"] || {};
  window.CONTENT_I18N["python:99"].my = {
    title: "Key ဖြင့် တန်ဖိုးများကို ပြောင်းလဲခြင်း (jisho06.py)",
    concept: "Dictionary လုပ်ဆောင်ချက်များတွင် ပါဝင်သည်:\n\n- `d[new_key] = value` — Key-value pair အသစ်တစ်ခုထည့်ရန်\n- `d[existing_key] = value` — ရှိပြီးသားတန်ဖိုးကို အပ်ဒိတ်လုပ်ရန်\n- `d.get(key)` — ဘေးကင်းစွာ တန်ဖိုးရယူရန်\n- `d.pop(key)` — Key တစ်ခုကိုဖယ်ရှားပြီး ၎င်း၏တန်ဖိုးကိုပြန်ပေးရန်\n- `d.keys()` — Key များအားလုံးရယူရန်၊ `d.values()` — တန်ဖိုးများအားလုံးရယူရန်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:99:en"
  };

  window.CONTENT_I18N["python:100"] = window.CONTENT_I18N["python:100"] || {};
  window.CONTENT_I18N["python:100"].my = {
    title: "Key-Value Pair အသစ်များထည့်ခြင်း (jisho07.py)",
    concept: "Dictionary လုပ်ဆောင်ချက်များတွင် ထည့်ခြင်း၊ အပ်ဒိတ်လုပ်ခြင်းနှင့် ဖျက်ခြင်းတို့ပါဝင်သည်။ Key-value pair အသစ်တစ်ခုထည့်ရန် key အသစ်တစ်ခုသို့ တန်ဖိုးသတ်မှတ်ပါ: `dct[201] = 'ABC'`။ Key ရှိပြီးသားဖြစ်ပါက တန်ဖိုးကို **အပ်ဒိတ်** လုပ်မည်ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:100:en"
  };

  window.CONTENT_I18N["python:101"] = window.CONTENT_I18N["python:101"] || {};
  window.CONTENT_I18N["python:101"].my = {
    title: "del ဖြင့် Dictionary Element များကိုဖျက်ခြင်း (jisho08.py)",
    concept: "Dictionary လုပ်ဆောင်ချက်များတွင် ထည့်ခြင်း၊ အပ်ဒိတ်လုပ်ခြင်းနှင့် ဖျက်ခြင်းတို့ပါဝင်သည်။ သတ်မှတ် key-value pair တစ်ခုကိုဖျက်ရန် `del dict[key]` ကိုသုံးပါ။ Key မရှိပါက Python သည် **KeyError** ကို မြှင့်တင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:101:en"
  };

  window.CONTENT_I18N["python:102"] = window.CONTENT_I18N["python:102"] || {};
  window.CONTENT_I18N["python:102"].my = {
    title: "မရှိသော Key ကိုဖျက်သည့်အခါ အမှား (jisho09.py)",
    concept: "Dictionary လုပ်ဆောင်ချက်များတွင် ထည့်ခြင်း၊ အပ်ဒိတ်လုပ်ခြင်းနှင့် ဖျက်ခြင်းတို့ပါဝင်သည်။ **မရှိသော** key တစ်ခုပေါ်တွင် `del dict[key]` ကိုသုံးပါက **KeyError** ကို မြှင့်တင်သည်။ `in` ဖြင့် တည်ရှိမှုကို အမြဲစစ်ဆေးပါ သို့မဟုတ် ပျောက်နေသော key များကို ဘေးကင်းစွာကိုင်တွယ်ရန် `pop()` method ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:102:en"
  };

  window.CONTENT_I18N["python:103"] = window.CONTENT_I18N["python:103"] || {};
  window.CONTENT_I18N["python:103"].my = {
    title: "တည်ရှိမှုကို ဦးစွာစစ်ဆေးပြီး ဘေးကင်းစွာ ဖျက်ခြင်း (jisho10.py)",
    concept: "Dictionary လုပ်ဆောင်ချက်များတွင် ထည့်ခြင်း၊ အပ်ဒိတ်လုပ်ခြင်းနှင့် ဖျက်ခြင်းတို့ပါဝင်သည်။ ဘေးကင်းစွာဖျက်ရန် `in` ကိုသုံးပြီး key ရှိမရှိကို ဦးစွာစစ်ဆေးပါ: `del dct[999]` ကိုမခေါ်မီ `if 999 in dct:` ဟုစစ်ဆေးပါ။ ၎င်းသည် **KeyError** ကိုကာကွယ်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:103:en"
  };

  window.CONTENT_I18N["python:104"] = window.CONTENT_I18N["python:104"] || {};
  window.CONTENT_I18N["python:104"].my = {
    title: "keys() ဖြင့် Key များအားလုံးကိုရယူခြင်း (jisho11.py)",
    concept: "Dictionary လုပ်ဆောင်ချက်များတွင် ထည့်ခြင်း၊ အပ်ဒိတ်လုပ်ခြင်းနှင့် ဖျက်ခြင်းတို့ပါဝင်သည်။ Key များအားလုံး၏ dynamic view ကိုရရန် `dict.keys()` ကိုသုံးပါ။ Dictionary ကိုပြောင်းလဲမှုများသည် keys view တွင် ထင်ဟပ်သည်။ List အဖြစ်ပြောင်းရန် `list(dict.keys())` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:104:en"
  };

  window.CONTENT_I18N["python:105"] = window.CONTENT_I18N["python:105"] || {};
  window.CONTENT_I18N["python:105"].my = {
    title: "items() ဖြင့် Key-Value Pair များကိုရယူခြင်း (jisho12.py)",
    concept: "Dictionary လုပ်ဆောင်ချက်များတွင် ထည့်ခြင်း၊ အပ်ဒိတ်လုပ်ခြင်းနှင့် ဖျက်ခြင်းတို့ပါဝင်သည်။ Key-value pair များအားလုံး၏ dynamic view ကို tuple များအဖြစ်ရရန် `dict.items()` ကိုသုံးပါ။ Dictionary ကိုပြောင်းလဲမှုများသည် items view တွင် ထင်ဟပ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:105:en"
  };

  window.CONTENT_I18N["python:106"] = window.CONTENT_I18N["python:106"] || {};
  window.CONTENT_I18N["python:106"].my = {
    title: "values() ဖြင့် တန်ဖိုးတည်ရှိမှုကိုစစ်ဆေးခြင်း (jisho_values01.py)",
    concept: "Dictionary လုပ်ဆောင်ချက်များတွင် ထည့်ခြင်း၊ အပ်ဒိတ်လုပ်ခြင်းနှင့် ဖျက်ခြင်းတို့ပါဝင်သည်။ တန်ဖိုးများအားလုံး၏ view ကိုရရန် `dict.values()` ကိုသုံးပါ။ `in` နှင့်တွဲသုံးပါက တန်ဖိုးရှိမရှိကိုစစ်ဆေးနိုင်သည်: `if 'xyz' in dct.values():`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:106:en"
  };

  window.CONTENT_I18N["python:107"] = window.CONTENT_I18N["python:107"] || {};
  window.CONTENT_I18N["python:107"].my = {
    title: "set() ဖြင့် Set များကိုဖန်တီးခြင်း (shugou01.py)",
    concept: "**Set** သည် **ထပ်နေသော element များမပါဝင်**ဘဲ **သတ်မှတ်ထားသော အစဉ်မရှိသော** collection တစ်ခုဖြစ်သည်။ လက်ကွင်းစုံ `{}` သို့မဟုတ် `set()` function ကိုသုံးပြီး set တစ်ခုကိုဖန်တီးပါ။ Set များသည် **intersection** (`&`) နှင့် **union** (`|`) ကဲ့သို့သော သင်္ချာလုပ်ဆောင်ချက်များကို ပံ့ပိုးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:107:en"
  };

  window.CONTENT_I18N["python:108"] = window.CONTENT_I18N["python:108"] || {};
  window.CONTENT_I18N["python:108"].my = {
    title: "Literal ဖြင့် Set များကိုဖန်တီးခြင်းနှင့် ထပ်နေမှုဖယ်ရှားခြင်း (shugou02.py)",
    concept: "**Set** တစ်ခုတွင် **ထပ်နေသော element များမပါဝင်**ဘဲ **သတ်မှတ်ထားသော အစဉ်မရှိပါ**။ လက်ကွင်းစုံဖြင့် တိုက်ရိုက် set တစ်ခုကိုဖန်တီးပါ: `{10, 3.14, 'abc', 10}`။ 10 ကဲ့သို့သော ထပ်နေသည့်တန်ဖိုးများကို အလိုအလျောက်ဖယ်ရှားသည် — set သည် ၎င်းတို့ကို deduplicate လုပ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:108:en"
  };

  window.CONTENT_I18N["python:109"] = window.CONTENT_I18N["python:109"] || {};
  window.CONTENT_I18N["python:109"].my = {
    title: "Set တစ်ခုတွင် Element တည်ရှိမှုကိုစစ်ဆေးခြင်း (shugou03.py)",
    concept: "**Set** တစ်ခုတွင် **ထပ်နေသော element များမပါဝင်**ဘဲ **သတ်မှတ်ထားသော အစဉ်မရှိပါ**။ Set တစ်ခုတွင် တန်ဖိုးတစ်ခုရှိမရှိစစ်ဆေးရန် `in` အော်ပရေတာကိုသုံးပါ: `if 3.14 in st:`။ Set membership testing သည် အလွန်မြန်ဆန်သည် (O(1) ပျမ်းမျှ)။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:109:en"
  };

  window.CONTENT_I18N["python:110"] = window.CONTENT_I18N["python:110"] || {};
  window.CONTENT_I18N["python:110"].my = {
    title: "remove() ဖြင့် Element များကိုဖယ်ရှားခြင်း (shugou04.py)",
    concept: "**Set** တစ်ခုတွင် **ထပ်နေသော element များမပါဝင်**ဘဲ **သတ်မှတ်ထားသော အစဉ်မရှိပါ**။ Element တစ်ခုကိုဖျက်ရန် `set.remove(value)` ကိုသုံးပါ။ Element မရှိပါက `remove()` သည် **KeyError** ကို မြှင့်တင်သည်။ အမှားမရှိဘဲ ဘေးကင်းစွာဖယ်ရှားရန် `set.discard(value)` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:110:en"
  };

  window.CONTENT_I18N["python:111"] = window.CONTENT_I18N["python:111"] || {};
  window.CONTENT_I18N["python:111"].my = {
    title: "add() ဖြင့် Element များထည့်ခြင်း (shugou05.py)",
    concept: "Set သည် ထပ်နေသော element များမပါဝင်ဘဲ သတ်မှတ်ထားသော အစဉ်မရှိသော collection တစ်ခုဖြစ်သည်။ လက်ကွင်းစုံ `{}` သို့မဟုတ် `set()` function ကိုသုံးပြီး set တစ်ခုကိုဖန်တီးပါ။ Set များသည် intersection (`&`) နှင့် union (`|`) ကဲ့သို့သော သင်္ချာလုပ်ဆောင်ချက်များကို ပံ့ပိုးသည်။ Set တစ်ခုသို့ element တစ်ခုထည့်ရန် `set.add(value)` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:111:en"
  };

  window.CONTENT_I18N["python:112"] = window.CONTENT_I18N["python:112"] || {};
  window.CONTENT_I18N["python:112"].my = {
    title: "Set ကိုအသုံးပြု၍ List မှ ထပ်နေမှုများကိုဖယ်ရှားခြင်း (set_list.py)",
    concept: "List တစ်ခုမှ ထပ်နေသောဒေတာများကိုဖယ်ရှားရန် လူသိများသော Python နည်းလမ်းတစ်ခုမှာ list ကို `set()` ဖြင့် set အဖြစ်ပြောင်းလဲခြင်း (ထပ်နေမှုများကို အလိုအလျောက်ဖယ်ရှားသည်)၊ ထို့နောက် `list()` ဖြင့် list အဖြစ်ပြန်ပြောင်းခြင်းဖြစ်သည်။ ၎င်းသည် ဒေတာကို deduplicate လုပ်ရန် မြန်ဆန်ပြီး တိုတောင်းသောနည်းလမ်းဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:112:en"
  };

  window.CONTENT_I18N["python:113"] = window.CONTENT_I18N["python:113"] || {};
  window.CONTENT_I18N["python:113"].my = {
    title: "လေ့ကျင့်ခန်း: ရမှတ်စာရင်းတစ်ခုကိုဖန်တီးပြီး ပြသခြင်း (script5-1.py)",
    concept: "**Chapter 5 လေ့ကျင့်ခန်း (script5-1.py)**\n\nတာဝန်: ရမှတ်စာရင်းတစ်ခုကိုဖန်တီးပြီး ပြသပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:113:en"
  };

  window.CONTENT_I18N["python:114"] = window.CONTENT_I18N["python:114"] || {};
  window.CONTENT_I18N["python:114"].my = {
    title: "လေ့ကျင့်ခန်း: List Index များသုံးကာ စုစုပေါင်းနှင့် ပျမ်းမျှတွက်ချက်ခြင်း (script5-2.py)",
    concept: "**Chapter 5 လေ့ကျင့်ခန်း (script5-2.py)**\n\nတာဝန်: List element များကို index ဖြင့်ရယူပြီး စုစုပေါင်းနှင့် ပျမ်းမျှရမှတ်ကိုတွက်ချက်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:114:en"
  };

  window.CONTENT_I18N["python:115"] = window.CONTENT_I18N["python:115"] || {};
  window.CONTENT_I18N["python:115"].my = {
    title: "လေ့ကျင့်ခန်း: List Element များကို ဘေးကင်းစွာဖျက်ခြင်း (script5-3.py)",
    concept: "**Chapter 5 လေ့ကျင့်ခန်း (script5-3.py)**\n\nတာဝန်: List တစ်ခုမှ element များကို ဘေးကင်းစွာဖျက်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:115:en"
  };

  window.CONTENT_I18N["python:116"] = window.CONTENT_I18N["python:116"] || {};
  window.CONTENT_I18N["python:116"].my = {
    title: "လေ့ကျင့်ခန်း: ကျောင်းသားအမည်များနှင့် ရမှတ်များပါသော Dictionary တစ်ခုကိုသတ်မှတ်ခြင်း (script5-4.py)",
    concept: "**Chapter 5 လေ့ကျင့်ခန်း (script5-4.py)**\n\nတာဝန်: ကျောင်းသားအမည်များနှင့် ၎င်းတို့၏ရမှတ်များကိုသိမ်းဆည်းသော dictionary တစ်ခုကိုသတ်မှတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:116:en"
  };

  window.CONTENT_I18N["python:117"] = window.CONTENT_I18N["python:117"] || {};
  window.CONTENT_I18N["python:117"].my = {
    title: "လေ့ကျင့်ခန်း: ဘာသာရပ်စုံအတွက် Nested Dictionary တစ်ခုကိုသတ်မှတ်ခြင်း (script5-5.py)",
    concept: "**Chapter 5 လေ့ကျင့်ခန်း (script5-5.py)**\n\nတာဝန်: ဘာသာရပ်များစွာအတွက် ကျောင်းသားရမှတ်များကိုသိမ်းဆည်းသော nested dictionary တစ်ခုကိုသတ်မှတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:117:en"
  };

  window.CONTENT_I18N["python:118"] = window.CONTENT_I18N["python:118"] || {};
  window.CONTENT_I18N["python:118"].my = {
    title: "လေ့ကျင့်ခန်း: Nested Dictionary တွင် ဘေးကင်းစွာရှာဖွေခြင်း (script5-6.py)",
    concept: "**Chapter 5 လေ့ကျင့်ခန်း (script5-6.py)**\n\nတာဝန်: Nested dictionary တစ်ခုတွင် ကျောင်းသားတစ်ဦး၏အမည်ကိုထည့်ကာ ဘာသာရပ်အလိုက်ရမှတ်များကိုရှာဖွေပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ပါ။ KeyError ကိုရှောင်ရှားရန် dictionary ကိုမရယူမီ `in` ဖြင့် key တည်ရှိမှုကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:118:en"
  };

  window.CONTENT_I18N["python:119"] = window.CONTENT_I18N["python:119"] || {};
  window.CONTENT_I18N["python:119"].my = {
    title: "range() ဖြင့် ဆက်တိုက်တန်ဖိုးများထုတ်ပေးခြင်း (kurikaeshi01.py)",
    concept: "သတ်မှတ်ထားသောအကြိမ်ရေအတွက် လုပ်ငန်းစဉ်တစ်ခုကိုထပ်လုပ်ရန် `for` loop ကိုသုံးပါ။ `for i in range(5):` သည် variable `i` သို့ 0 မှ 4 အထိ integer များကိုသတ်မှတ်ပြီး 5 ကြိမ်ထပ်လုပ်သည်။ `range(start, stop)` သည် စတင်မှတ်နှင့် သီးသန့်အဆုံးမှတ်ကိုသတ်မှတ်သည်။ `range(start, stop, step)` သည် step တန်ဖိုးကိုထည့်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:119:en"
  };

  window.CONTENT_I18N["python:120"] = window.CONTENT_I18N["python:120"] || {};
  window.CONTENT_I18N["python:120"].my = {
    title: "range() ၏ စတင်မှတ်နှင့် အဆုံးမှတ်သတ်မှတ်ခြင်း (kurikaeshi02.py)",
    concept: "သတ်မှတ်ထားသောအကြိမ်ရေအတွက် လုပ်ငန်းစဉ်တစ်ခုကိုထပ်လုပ်ရန် `for` loop ကိုသုံးပါ။ `for i in range(5):` သည် variable `i` သို့ 0 မှ 4 အထိ integer များကိုသတ်မှတ်သည်။ `range(3, 5)` သည် 3 မှ 4 အထိထုတ်ပေးသည် (အဆုံးတန်ဖိုးသည် သီးသန့်ဖြစ်သည်)။ စတင်မှတ်နှင့်အဆုံးမှတ်ကိုထိန်းချုပ်ရန် `range(start, stop)` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:120:en"
  };

  window.CONTENT_I18N["python:121"] = window.CONTENT_I18N["python:121"] || {};
  window.CONTENT_I18N["python:121"].my = {
    title: "range() တွင် အကောင်းဘက်ခြေလှမ်းသတ်မှတ်ခြင်း (kurikaeshi03.py)",
    concept: "သတ်မှတ်ထားသောအကြိမ်ရေအတွက် လုပ်ငန်းစဉ်တစ်ခုကိုထပ်လုပ်ရန် `for` loop ကိုသုံးပါ။ `range(1, 5, 2)` သည် 1, 3 ကိုထုတ်ပေးသည် — တတိယ argument (step) သည် တန်ဖိုးများကြားရှိ တိုးနှုန်းကိုထိန်းချုပ်သည်။ `range(start, stop, step)` သည် ဂဏန်းသင်္ချာတိုးတက်မှု (arithmetic progression) တစ်ခုကိုထုတ်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:121:en"
  };

  window.CONTENT_I18N["python:122"] = window.CONTENT_I18N["python:122"] || {};
  window.CONTENT_I18N["python:122"].my = {
    title: "range() တွင် အနုတ်ဘက်ခြေလှမ်းသတ်မှတ်ခြင်း (kurikaeshi04.py)",
    concept: "သတ်မှတ်ထားသောအကြိမ်ရေအတွက် လုပ်ငန်းစဉ်တစ်ခုကိုထပ်လုပ်ရန် `for` loop ကိုသုံးပါ။ `range(10, 4, -2)` သည် 10, 8, 6 ကိုထုတ်ပေးသည် — အနုတ်ဘက်ခြေလှမ်းသည် လျော့နည်းသွားသော အစဉ်လိုက်တစ်ခုကိုဖန်တီးသည်။ အနုတ်ဘက်ခြေလှမ်းကိုသုံးသည့်အခါ စတင်တန်ဖိုးသည် အဆုံးတန်ဖိုးထက် ကြီးရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:122:en"
  };

  window.CONTENT_I18N["python:123"] = window.CONTENT_I18N["python:123"] || {};
  window.CONTENT_I18N["python:123"].my = {
    title: "for Loop ဖြင့် ထပ်ခါထပ်ခါလုပ်ဆောင်ခြင်း (kurikaeshi05.py)",
    concept: "သတ်မှတ်ထားသောအကြိမ်ရေအတွက် လုပ်ငန်းစဉ်တစ်ခုကိုထပ်လုပ်ရန် `for` loop ကိုသုံးပါ။ `for i in range(3):` သည် variable `i` သို့ 0, 1, 2 ကိုအစဉ်လိုက်သတ်မှတ်ပြီး indent လုပ်ထားသော block ကိုတစ်ကြိမ်စီ run သည်။ Colon `:` နှင့် 4-space indentation ကိုအမြဲထည့်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:123:en"
  };

  window.CONTENT_I18N["python:124"] = window.CONTENT_I18N["python:124"] || {};
  window.CONTENT_I18N["python:124"].my = {
    title: "လျော့နည်းသွားသောတန်ဖိုးများဖြင့် Loop လုပ်ဆောင်ခြင်း (kurikaeshi06.py)",
    concept: "`for` loop ကိုသုံးပြီး collection တစ်ခုကို အစမှအဆုံးအထိ element များကိုထုတ်ယူကာ iterate လုပ်နိုင်သည်။ `for item in list:` သည် element တစ်ခုစီကိုလုပ်ဆောင်သည်။ Dictionary တစ်ခုတွင်သုံးပါက loop သည် ပုံသေအားဖြင့် key များကိုထုတ်ယူသည်။ `range()` တွင် အနုတ်ဘက်ခြေလှမ်းသည် လျော့နည်းသွားသော loop ကိုဖန်တီးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:124:en"
  };

  window.CONTENT_I18N["python:125"] = window.CONTENT_I18N["python:125"] || {};
  window.CONTENT_I18N["python:125"].my = {
    title: "Index ဖြင့် List ကို Iterate လုပ်ခြင်း (kurikaeshi07.py)",
    concept: "`for` loop ကိုသုံးပြီး collection တစ်ခုကို အစမှအဆုံးအထိ element များကိုထုတ်ယူကာ iterate လုပ်နိုင်သည်။ `for i in range(len(lst)):` သည် ၎င်း၏ index ကိုသုံးကာ list တစ်ခုကိုဖြတ်၍ သွားနိုင်စေပြီး element တစ်ခုစီကို `lst[i]` ဖြင့်ရယူသည်။ Colon `:` နှင့် 4-space indentation လိုအပ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:125:en"
  };

  window.CONTENT_I18N["python:126"] = window.CONTENT_I18N["python:126"] || {};
  window.CONTENT_I18N["python:126"].my = {
    title: "for...in ဖြင့် List ကို တိုက်ရိုက် Iterate လုပ်ခြင်း (kurikaeshi08.py)",
    concept: "`for` loop ကိုသုံးပြီး collection တစ်ခုကို အစမှအဆုံးအထိ element များကိုထုတ်ယူကာ iterate လုပ်နိုင်သည်။ `for v in lst:` သည် index မလိုအပ်ဘဲ list ရှိ element တစ်ခုစီကို တိုက်ရိုက်ပေးသည်။ Dictionary တစ်ခုတွင်သုံးပါက loop သည် ပုံသေအားဖြင့် key များကိုထုတ်ယူသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:126:en"
  };

  window.CONTENT_I18N["python:127"] = window.CONTENT_I18N["python:127"] || {};
  window.CONTENT_I18N["python:127"].my = {
    title: "for Loop ဖြင့် Set တစ်ခုကို Iterate လုပ်ခြင်း (kurikaeshi09.py)",
    concept: "`for` loop ကိုသုံးပြီး collection တစ်ခုကို အစမှအဆုံးအထိ element များကိုထုတ်ယူကာ iterate လုပ်နိုင်သည်။ `for v in st:` သည် set များတွင်လည်းအလုပ်လုပ်ပြီး element တစ်ခုစီကို iterate လုပ်သည်။ Set များသည် အစဉ်မရှိသောကြောင့် iteration အစဉ်ကိုအာမမခံနိုင်ကြောင်းသတိရပါ။ Colon `:` နှင့် သင့်လျော်သော indentation ကိုအမြဲထည့်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:127:en"
  };

  window.CONTENT_I18N["python:128"] = window.CONTENT_I18N["python:128"] || {};
  window.CONTENT_I18N["python:128"].my = {
    title: "Dictionary Key များကို Iterate လုပ်ခြင်း (kurikaeshi10.py)",
    concept: "`for` loop ကိုသုံးပြီး collection တစ်ခုကို အစမှအဆုံးအထိ element များကိုထုတ်ယူကာ iterate လုပ်နိုင်သည်။ `for k in dct:` သည် ပုံသေအားဖြင့် dictionary တစ်ခု၏ key များကို iterate လုပ်သည်။ Loop အတွင်းတွင် သက်ဆိုင်ရာတန်ဖိုးများကိုရယူရန် `dct[k]` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:128:en"
  };

  window.CONTENT_I18N["python:129"] = window.CONTENT_I18N["python:129"] || {};
  window.CONTENT_I18N["python:129"].my = {
    title: "Loop အတွင်း Dictionary Key မှ သက်ဆိုင်ရာတန်ဖိုးများကိုဖတ်ခြင်း (kurikaeshi11.py)",
    concept: "`while` loop သည် အခြေအနေတစ်ခုက `True` ဖြစ်နေသမျှ ထပ်ခါထပ်ခါလုပ်ဆောင်သည်။ အခြေအနေက `False` ဖြစ်သွားသောအခါ loop မှထွက်သည်။ Loop အတွင်းတွင် အခြေအနေကို update လုပ်ရန်သတိထားပါ၊ သို့မဟုတ်ပါက မည်သည့်အခါမှမဆုံးသော infinite loop ဖြစ်သွားမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:129:en"
  };

  window.CONTENT_I18N["python:130"] = window.CONTENT_I18N["python:130"] || {};
  window.CONTENT_I18N["python:130"].my = {
    title: "items() ဖြင့် Dictionary Key-Value Tuple များကို Iterate လုပ်ခြင်း (kurikaeshi12.py)",
    concept: "`while` loop သည် အခြေအနေတစ်ခုက `True` ဖြစ်နေသမျှ ထပ်ခါထပ်ခါလုပ်ဆောင်သည်။ Key-value pair များ၏ view ကို tuple များအဖြစ်ရရန် `dict.items()` ကိုသုံးပါ။ `for kv in dct.items():` သည် key-value tuple တစ်ခုစီကို iterate လုပ်ပြီး ၎င်းကို unpack သို့မဟုတ် index ဖြင့်ရယူနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:130:en"
  };

  /* ---- Lessons 131-200: AI-assisted Burmese translation from English source ---- */

  window.CONTENT_I18N["python:131"] = window.CONTENT_I18N["python:131"] || {};
  window.CONTENT_I18N["python:131"].my = {
    title: "Unpacking ဖြင့် Dictionary Key နှင့် Value များကို Iterate လုပ်ခြင်း (kurikaeshi13.py)",
    concept: "A `while` loop repeats as long as a condition remains `True`. Use tuple unpacking in a `for` loop: `for k, v in dct.items():` assigns each key and value directly to variables `k` and `v`, making the code cleaner and more readable.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:131:en"
  };

  window.CONTENT_I18N["python:132"] = window.CONTENT_I18N["python:132"] || {};
  window.CONTENT_I18N["python:132"].my = {
    title: "while ဖြင့် အခြေအနေအလိုက် ထပ်ခါလုပ်ဆောင်ခြင်း (kurikaeshi14.py)",
    concept: "When a `break` statement is executed inside a loop, it forcefully terminates the loop immediately, and execution continues with the code after the loop. `break` is commonly combined with an `if` statement to exit a loop when a condition is met.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:132:en"
  };

  window.CONTENT_I18N["python:133"] = window.CONTENT_I18N["python:133"] || {};
  window.CONTENT_I18N["python:133"].my = {
    title: "while ဖြင့် ကောင်တာလုပ်ဆောင်ခြင်း (kurikaeshi15.py)",
    concept: "When a `break` statement is executed inside a loop, it forcefully terminates the loop immediately. A `while` loop with a counter variable is a common pattern: update the counter inside the loop so the condition eventually becomes `False` and the loop ends naturally.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:133:en"
  };

  window.CONTENT_I18N["python:134"] = window.CONTENT_I18N["python:134"] || {};
  window.CONTENT_I18N["python:134"].my = {
    title: "while True ဖြင့် Infinite Loop (kurikaeshi16.py)",
    concept: "When a `continue` statement is executed, the remaining code in the current iteration is skipped, and execution jumps to the next iteration (the top of the loop). Understand the difference: `break` exits the entire loop, while `continue` only skips the current round.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:134:en"
  };

  window.CONTENT_I18N["python:135"] = window.CONTENT_I18N["python:135"] || {};
  window.CONTENT_I18N["python:135"].my = {
    title: "break ဖြင့် Infinite Loop မှထွက်ခြင်း (kurikaeshi17.py)",
    concept: "When a `continue` statement is executed, the remaining code in the current iteration is skipped. Use `break` inside an infinite `while True` loop to exit when a certain condition is met. This pattern is common for menu-driven programs where the user decides when to quit.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:135:en"
  };

  window.CONTENT_I18N["python:136"] = window.CONTENT_I18N["python:136"] || {};
  window.CONTENT_I18N["python:136"].my = {
    title: "continue ဖြင့် Iteration များကိုကျော်ခြင်း (kurikaeshi18.py)",
    concept: "When a `continue` statement is executed, the remaining code in the current iteration is skipped, and execution jumps to the top of the loop for the next iteration. `continue` is useful for skipping unwanted values while keeping the loop running.",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:136:en"
  };

  window.CONTENT_I18N["python:137"] = window.CONTENT_I18N["python:137"] || {};
  window.CONTENT_I18N["python:137"].my = {
    title: "လေ့ကျင့်ခန်း: for Loop သုံးကာ List ရမှတ်များကို ပေါင်းခြင်း (script6-1.py)",
    concept: "**Chapter 6 လေ့ကျင့်ခန်း (script6-1.py)**\n\nတာဝန်: `for` loop ကိုသုံးပြီး list တစ်ခုတွင်သိမ်းထားသောရမှတ်များ၏ စုစုပေါင်းနှင့် ပျမ်းမျှကိုတွက်ချက်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:137:en"
  };

  window.CONTENT_I18N["python:138"] = window.CONTENT_I18N["python:138"] || {};
  window.CONTENT_I18N["python:138"].my = {
    title: "လေ့ကျင့်ခန်း: Dictionary Loop ဖြင့် ကျောင်းသားရမှတ်အားလုံးကို ထုတ်ပြခြင်း (script6-2.py)",
    concept: "**Chapter 6 လေ့ကျင့်ခန်း (script6-2.py)**\n\nတာဝန်: Dictionary တစ်ခုကို iterate လုပ်ရန် `for` loop ကို `items()` နှင့်တွဲသုံးပြီး ကျောင်းသားအားလုံး၏အမည်နှင့်ရမှတ်များကို print ထုတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:138:en"
  };

  window.CONTENT_I18N["python:139"] = window.CONTENT_I18N["python:139"] || {};
  window.CONTENT_I18N["python:139"].my = {
    title: "လေ့ကျင့်ခန်း: while Infinite Loop ဖြင့် အပြန်အလှန်ရမှတ်ရှာဖွေခြင်း (script6-3.py)",
    concept: "**Chapter 6 လေ့ကျင့်ခန်း (script6-3.py)**\n\nတာဝန်: `while True` infinite loop နှင့် `break` ကိုသုံးပြီး အပြန်အလှန်ကျောင်းသားရမှတ်ရှာဖွေမှုကိုအကောင်အထည်ဖော်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:139:en"
  };

  window.CONTENT_I18N["python:140"] = window.CONTENT_I18N["python:140"] || {};
  window.CONTENT_I18N["python:140"].my = {
    title: "Parameter မပါသော Function ကိုသတ်မှတ်ခြင်းနှင့် ခေါ်ခြင်း (kansu01.py)",
    concept: "**Function** သည် statement များစွာကိုစုစည်းထားသော သီးခြားပရိုဂရမ်ယူနစ်တစ်ခုဖြစ်သည်။ `def function_name():` ဖြင့် function တစ်ခုကိုသတ်မှတ်ပြီး body ကို indent လုပ်ကာ `function_name()` ဖြင့်ခေါ်ပါ။ Function များသည် တူညီသော code ကိုထပ်ခါမရေးရအောင်ကူညီပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:140:en"
  };

  window.CONTENT_I18N["python:141"] = window.CONTENT_I18N["python:141"] || {};
  window.CONTENT_I18N["python:141"].my = {
    title: "Function သတ်မှတ်ရေးအစဉ်နှင့် အမှားများ (kansu02.py)",
    concept: "**Function** သည် statement များစွာကိုစုစည်းထားသော သီးခြားပရိုဂရမ်ယူနစ်တစ်ခုဖြစ်သည်။ Python တွင် function တစ်ခုကို ၎င်းကိုမခေါ်မီ **သတ်မှတ်ထားရမည်**။ Function တစ်ခုကိုမသတ်မှတ်မီ ခေါ်ပါက Python သည် `NameError` ကိုမြှင့်တင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:141:en"
  };

  window.CONTENT_I18N["python:142"] = window.CONTENT_I18N["python:142"] || {};
  window.CONTENT_I18N["python:142"].my = {
    title: "တူညီသော Function ကိုအကြိမ်များစွာခေါ်ခြင်း (kansu03.py)",
    concept: "**Function** သည် statement များစွာကိုစုစည်းထားသော သီးခြားပရိုဂရမ်ယူနစ်တစ်ခုဖြစ်သည်။ တူညီသော function ကို loop အတွင်းအပါအဝင် အကြိမ်များစွာခေါ်နိုင်သည်။ ခေါ်ဆိုမှုတစ်ခုစီသည် function body ကိုအစမှ execute လုပ်ပြီး code ကိုပြန်သုံးနိုင်စေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:142:en"
  };

  window.CONTENT_I18N["python:143"] = window.CONTENT_I18N["python:143"] || {};
  window.CONTENT_I18N["python:143"].my = {
    title: "Parameter တစ်ခုတည်းပါသော Function ကိုသတ်မှတ်ခြင်း (kansu04.py)",
    concept: "**Function** သည် statement များစွာကိုစုစည်းထားသော သီးခြားပရိုဂရမ်ယူနစ်တစ်ခုဖြစ်သည်။ `def function_name(param):` ဖြင့် parentheses အတွင်းတွင် parameters များပါသော function တစ်ခုကိုသတ်မှတ်ပါ။ Parameter သည် function ကိုခေါ်သည့်အခါပေးသောတန်ဖိုးကိုလက်ခံသည့် variable တစ်ခုအနေဖြင့်ဆောင်ရွက်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:143:en"
  };

  window.CONTENT_I18N["python:144"] = window.CONTENT_I18N["python:144"] || {};
  window.CONTENT_I18N["python:144"].my = {
    title: "မတူညီသော Data Type များကို Argument အဖြစ်ပေးပို့ခြင်း (kansu05.py)",
    concept: "**Function** သည် statement များစွာကိုစုစည်းထားသော သီးခြားပရိုဂရမ်ယူနစ်တစ်ခုဖြစ်သည်။ Parameters များသည် မတူညီသော data type များ၏ arguments များကိုလက်ခံနိုင်သည်။ Function သည် ပေးပို့လာသောတန်ဖိုးကို လုပ်ဆောင်ပေးသည် — အတွင်းရှိလုပ်ဆောင်ချက်များသည် data type နှင့်ကိုက်ညီသရွေ့။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:144:en"
  };

  window.CONTENT_I18N["python:145"] = window.CONTENT_I18N["python:145"] || {};
  window.CONTENT_I18N["python:145"].my = {
    title: "Parameter အများအပြားပါသော Function ကိုသတ်မှတ်ခြင်း (kansu06.py)",
    concept: "**Parameter** သည် function တစ်ခုကိုခေါ်သည့်အခါ အပြင်မှ function အတွင်းသို့ပေးပို့သော သတင်းအချက်အလက်ဖြစ်သည်။ `def cook(food):` ကဲ့သို့ parentheses အတွင်းတွင်သတ်မှတ်ပါ။ Function များတွင် comma ဖြင့်ခြားထားသော parameters အများအပြားရှိနိုင်သည်။ Arguments များ၏အစဉ်သည် parameter အစဉ်နှင့်ကိုက်ညီရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:145:en"
  };

  window.CONTENT_I18N["python:146"] = window.CONTENT_I18N["python:146"] || {};
  window.CONTENT_I18N["python:146"].my = {
    title: "Argument ပေးပို့သည့်အစဉ်နှင့် Type ကိုက်ညီမှု (kansu07.py)",
    concept: "**Parameter** သည် function တစ်ခုကိုခေါ်သည့်အခါ အပြင်မှ function အတွင်းသို့ပေးပို့သော သတင်းအချက်အလက်ဖြစ်သည်။ Arguments များကို parameters များသို့ position အလိုက်သတ်မှတ်သည် — ပထမ argument သည် ပထမ parameter သို့သွားသည်။ Variable များကို argument အဖြစ်သုံးခြင်းသည် အလားတူအလုပ်လုပ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:146:en"
  };

  window.CONTENT_I18N["python:147"] = window.CONTENT_I18N["python:147"] || {};
  window.CONTENT_I18N["python:147"].my = {
    title: "ပုံသေတန်ဖိုးပါသော Function Parameter များ (kansu09.py)",
    concept: "**Parameter** သည် function တစ်ခုကိုခေါ်သည့်အခါ အပြင်မှ function အတွင်းသို့ပေးပို့သော သတင်းအချက်အလက်ဖြစ်သည်။ Parameters များသည် `=` ဖြင့်ပုံသေတန်ဖိုးများရှိနိုင်သည် — `def cook(name='Curry'):` ကဲ့သို့။ Argument ကိုချန်လှပ်ပါက ပုံသေတန်ဖိုးကိုအလိုအလျောက်သုံးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:147:en"
  };

  window.CONTENT_I18N["python:148"] = window.CONTENT_I18N["python:148"] || {};
  window.CONTENT_I18N["python:148"].my = {
    title: "ပုံသေ Argument များကိုချန်လှပ်ခြင်း (kansu10.py)",
    concept: "**Parameter** သည် function တစ်ခုကိုခေါ်သည့်အခါ အပြင်မှ function အတွင်းသို့ပေးပို့သော သတင်းအချက်အလက်ဖြစ်သည်။ Parameter တစ်ခုတွင် ပုံသေတန်ဖိုးရှိပါက ထို argument ကိုချန်လှပ်နိုင်သည်။ မတူညီသောတန်ဖိုးတစ်ခုကိုရှင်းလင်းစွာပေးပို့ခြင်းဖြင့် ပုံသေတန်ဖိုးကိုအစားထိုးနိုင်သေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:148:en"
  };

  window.CONTENT_I18N["python:149"] = window.CONTENT_I18N["python:149"] || {};
  window.CONTENT_I18N["python:149"].my = {
    title: "Keyword Argument များကိုအသုံးပြုခြင်း (kansu11.py)",
    concept: "**Return value** သည် function က `return value` ကိုသုံးပြီး ခေါ်ဆိုသူထံသို့ပြန်ပို့သောရလဒ်ဖြစ်သည်။ `return` ကို execute လုပ်သောအခါ function သည် ချက်ချင်းထွက်ပြီး တန်ဖိုးကိုပြန်ပို့သည်။ Keyword arguments များသည် မည်သည့် parameter က မည်သည့်တန်ဖိုးကိုရမည်ကို အမည်ဖြင့်သတ်မှတ်ခွင့်ပြုသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:149:en"
  };

  window.CONTENT_I18N["python:150"] = window.CONTENT_I18N["python:150"] || {};
  window.CONTENT_I18N["python:150"].my = {
    title: "ပုံသေ Parameter များသည် ပုံသေမဟုတ်သော Parameter များနောက်တွင်ရှိရမည် (kansu12.py)",
    concept: "**Return value** သည် function က `return value` ကိုသုံးပြီး ခေါ်ဆိုသူထံသို့ပြန်ပို့သောရလဒ်ဖြစ်သည်။ Python တွင် ပုံသေတန်ဖိုးပါသော parameters များကို ပုံသေတန်ဖိုးမပါသော parameters များ၏ **နောက်တွင်** သတ်မှတ်ရမည်။ မဟုတ်ပါက `SyntaxError` ကိုမြှင့်တင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:150:en"
  };

  window.CONTENT_I18N["python:151"] = window.CONTENT_I18N["python:151"] || {};
  window.CONTENT_I18N["python:151"].my = {
    title: "ပြောင်းလဲနိုင်သောအရှည် Argument များ (*args) (kansu13.py)",
    concept: "**Return value** သည် function က `return value` ကိုသုံးပြီး ခေါ်ဆိုသူထံသို့ပြန်ပို့သောရလဒ်ဖြစ်သည်။ ပြောင်းလဲနိုင်သော positional arguments အရေအတွက်ကိုလက်ခံရန် `*args` ကိုသုံးပါ။ `args` သည် function အတွင်းတွင် tuple တစ်ခုဖြစ်လာသည်။ မည်မျှ argument ပေးပို့မည်ကိုမသိသည့်အခါ အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:151:en"
  };

  window.CONTENT_I18N["python:152"] = window.CONTENT_I18N["python:152"] || {};
  window.CONTENT_I18N["python:152"].my = {
    title: "Keyword ပြောင်းလဲနိုင်သောအရှည် Argument များ (**kwargs) (kansu14.py)",
    concept: "**Return value** သည် function က `return value` ကိုသုံးပြီး ခေါ်ဆိုသူထံသို့ပြန်ပို့သောရလဒ်ဖြစ်သည်။ ပြောင်းလဲနိုင်သော keyword arguments အရေအတွက်ကိုလက်ခံရန် `**kwargs` ကိုသုံးပါ။ `kwargs` သည် function အတွင်းတွင် dictionary တစ်ခုဖြစ်လာပြီး parameter အမည်များက key များအဖြစ်၊ ပေးပို့သောတန်ဖိုးများက values များအဖြစ်ရှိသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:152:en"
  };

  window.CONTENT_I18N["python:153"] = window.CONTENT_I18N["python:153"] || {};
  window.CONTENT_I18N["python:153"].my = {
    title: "ပုံမှန် Argument များနှင့် ပြောင်းလဲနိုင်သောအရှည် Argument များပေါင်းစပ်ခြင်း (kansu15.py)",
    concept: "**Return value** သည် function က `return value` ကိုသုံးပြီး ခေါ်ဆိုသူထံသို့ပြန်ပို့သောရလဒ်ဖြစ်သည်။ ပုံမှန် parameters များ၊ `*args` နှင့် `**kwargs` တို့ကို function သတ်မှတ်ချက်တစ်ခုတည်းတွင်ပေါင်းစပ်နိုင်သည်။ ပုံမှန် parameters များကိုရှေ့တွင်၊ ထို့နောက် `*args`၊ ထို့နောက် `**kwargs` ဟုထားပါ။ Keyword arguments များကို မည်သည့်အစဉ်မဆိုပေးပို့နိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:153:en"
  };

  window.CONTENT_I18N["python:154"] = window.CONTENT_I18N["python:154"] || {};
  window.CONTENT_I18N["python:154"].my = {
    title: "အဆင့်မြင့် ပုံသေ Parameter အသုံးပြုခြင်း (kansu16.py)",
    concept: "Function တစ်ခုကိုသတ်မှတ်သည့်အခါ `def greet(name='Guest'):` ကဲ့သို့ parameters များအတွက်ပုံသေတန်ဖိုးများသတ်မှတ်နိုင်သည်။ ခေါ်သည့်အခါ argument ကိုချန်လှပ်ပါက ပုံသေတန်ဖိုးကိုသုံးသည်။ ပုံသေနှင့်ပုံသေမဟုတ်သော parameters များကိုရောနှောနိုင်သော်လည်း ပုံသေ parameters များအားလုံးသည် ပုံသေမဟုတ်သောအရာများ၏နောက်တွင်ရှိရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:154:en"
  };

  window.CONTENT_I18N["python:155"] = window.CONTENT_I18N["python:155"] || {};
  window.CONTENT_I18N["python:155"].my = {
    title: "return ဖြင့် တန်ဖိုးများကိုပြန်ပေးခြင်း (kansu17.py)",
    concept: "Function တစ်ခုကိုသတ်မှတ်သည့်အခါ `def greet(name='Guest'):` ကဲ့သို့ parameters များအတွက်ပုံသေတန်ဖိုးများသတ်မှတ်နိုင်သည်။ `return` statement သည် function မှခေါ်ဆိုသူထံသို့တန်ဖိုးတစ်ခုကိုပြန်ပို့သည်။ `return` ကို execute လုပ်သည်နှင့် function သည် ချက်ချင်းထွက်သည်။ ပြန်ပို့သောတန်ဖိုးကို variable တစ်ခုတွင်သိမ်းနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:155:en"
  };

  window.CONTENT_I18N["python:156"] = window.CONTENT_I18N["python:156"] || {};
  window.CONTENT_I18N["python:156"].my = {
    title: "လေ့ကျင့်ခန်း: ရမှတ်စုစုပေါင်းနှင့် ပျမ်းမျှကိုပြသသော Function (script7-1.py)",
    concept: "**Chapter 7 လေ့ကျင့်ခန်း (script7-1.py)**\n\nတာဝန်: ရမှတ်သုံးခုကိုလက်ခံပြီး ၎င်းတို့၏စုစုပေါင်းနှင့်ပျမ်းမျှကို print ထုတ်သော function တစ်ခုကိုသတ်မှတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:156:en"
  };

  window.CONTENT_I18N["python:157"] = window.CONTENT_I18N["python:157"] || {};
  window.CONTENT_I18N["python:157"].my = {
    title: "Return Value ကို Variable တစ်ခုတွင်လက်ခံခြင်း (kansu18.py)",
    concept: "Function တစ်ခုကိုသတ်မှတ်သည့်အခါ `def greet(name='Guest'):` ကဲ့သို့ parameters များအတွက်ပုံသေတန်ဖိုးများသတ်မှတ်နိုင်သည်။ Function တစ်ခုသည် ခေါ်ဆိုသူမှဖမ်းယူနိုင်သောတန်ဖိုးတစ်ခုကိုပြန်ပေးနိုင်သည်။ `return` ပြီးနောက် function အတွင်းရှိ code သည် မည်သည့်အခါမှ execute မလုပ်ပါ — `return` သည် function ကိုချက်ချင်းထွက်စေသောကြောင့်ဖြစ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:157:en"
  };

  window.CONTENT_I18N["python:158"] = window.CONTENT_I18N["python:158"] || {};
  window.CONTENT_I18N["python:158"].my = {
    title: "return ဖြင့် Function ကိုအလယ်တွင်ရပ်စဲခြင်း (kansu19.py)",
    concept: "Function တစ်ခုကိုသတ်မှတ်သည့်အခါ `def greet(name='Guest'):` ကဲ့သို့ parameters များအတွက်ပုံသေတန်ဖိုးများသတ်မှတ်နိုင်သည်။ `return` statement ကို function တစ်ခုကိုစောစီးစွာထွက်ရန်အသုံးပြုနိုင်သည်။ `return` ပြီးနောက်ရှိ code အားလုံးကိုကျော်သွားသည်။ ၎င်းသည် function ၏ထိပ်တွင် inputs များကိုစစ်ဆေးသည့် guard clauses များအတွက်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:158:en"
  };

  window.CONTENT_I18N["python:159"] = window.CONTENT_I18N["python:159"] || {};
  window.CONTENT_I18N["python:159"].my = {
    title: "Function မှတန်ဖိုးများစွာကိုပြန်ပေးခြင်း (Tuple Unpacking) (kansu20.py)",
    concept: "Function တစ်ခုကိုသတ်မှတ်သည့်အခါ `def greet(name='Guest'):` ကဲ့သို့ parameters များအတွက်ပုံသေတန်ဖိုးများသတ်မှတ်နိုင်သည်။ Python သည် `return` statement တွင် တန်ဖိုးများကို comma ဖြင့်ခြားကာ တန်ဖိုးများစွာကိုပြန်ပေးခွင့်ပြုသည်။ ၎င်းတို့ကို tuple တစ်ခုအနေဖြင့်ပြန်ပေးပြီး သီးခြား variables များသို့ unpack လုပ်နိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:159:en"
  };

  window.CONTENT_I18N["python:160"] = window.CONTENT_I18N["python:160"] || {};
  window.CONTENT_I18N["python:160"].my = {
    title: "Local Variable များနှင့် Global Variable များ (kansu_a1.py)",
    concept: "Function အတွင်းတွင်သတ်မှတ်ထားသော variable သည် **local variable** ဖြစ်သည် — ၎င်းကိုထို function အတွင်းတွင်သာရယူနိုင်သည်။ Local variable တစ်ခုကို ၎င်း၏ function အပြင်ဘက်တွင်သုံးရန်ကြိုးစားပါက `NameError` ကိုမြှင့်တင်သည်။ မည်သည့် function မျှ၏အပြင်ဘက်တွင်သတ်မှတ်ထားသော variable များသည် **global variables** များဖြစ်ပြီး မည်သည့်နေရာမှမဆိုရယူနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:160:en"
  };

  window.CONTENT_I18N["python:161"] = window.CONTENT_I18N["python:161"] || {};
  window.CONTENT_I18N["python:161"].my = {
    title: "လေ့ကျင့်ခန်း: တွက်ချက်ခြင်းနှင့်ရယူခြင်းအတွက် Return Value ပါသော Function (script7-2.py)",
    concept: "**Chapter 7 လေ့ကျင့်ခန်း (script7-2.py)**\n\nတာဝန်: တွက်ချက်မှုများလုပ်ဆောင်ပြီး ရလဒ်များကိုပြန်ပေးသော return values ပါသည့် function တစ်ခုကိုသတ်မှတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:161:en"
  };

  window.CONTENT_I18N["python:162"] = window.CONTENT_I18N["python:162"] || {};
  window.CONTENT_I18N["python:162"].my = {
    title: "လေ့ကျင့်ခန်း: ပုံသေတန်ဖိုးများနှင့် Return Values ပါသော အဆင့်လုပ်ဆောင်ချက် Function (script7-3.py)",
    concept: "**Chapter 7 လေ့ကျင့်ခန်း (script7-3.py)**\n\nတာဝန်: ပုံသေ parameter တန်ဖိုးများနှင့် return values များပါသော အဆင့်လုပ်ဆောင်ချက် function တစ်ခုကိုသတ်မှတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:162:en"
  };

  window.CONTENT_I18N["python:163"] = window.CONTENT_I18N["python:163"] || {};
  window.CONTENT_I18N["python:163"].my = {
    title: "အခြေခံ Class သတ်မှတ်ခြင်းနှင့် Instance အလွတ် (class01.py)",
    concept: "**Class** သည် object များဖန်တီးရန်အတွက် ပုံစံပလိတ်တစ်ခုဖြစ်သည်။ `class ClassName:` ဖြင့် class တစ်ခုကိုသတ်မှတ်ပြီး ၎င်းအတွင်းတွင် **instance variables (attributes)** များကိုသတ်မှတ်ကာ ဒေတာကိုကိုင်ဆောင်ထားသည်။ Instance တစ်ခုကို class ကို function တစ်ခုလိုခေါ်ခြင်းဖြင့်ဖန်တီးသည်: `stu1 = Student()`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:163:en"
  };

  window.CONTENT_I18N["python:164"] = window.CONTENT_I18N["python:164"] || {};
  window.CONTENT_I18N["python:164"].my = {
    title: "Constructor ကနဦးတန်ဖိုးသတ်မှတ်ခြင်း (class02.py)",
    concept: "**Constructor** (Python တွင် `__init__` method) သည် class တစ်ခုမှ object တစ်ခုကိုဖန်တီးသည့်အခါ အလိုအလျောက် execute လုပ်သည်။ ပထမ parameter သည် `self` ဖြစ်ပြီး instance ကိုယ်၌ကိုရည်ညွှန်းသည်။ `__init__` သို့ပေးသော parameters များသည် ကနဦး attribute တန်ဖိုးများကိုသတ်မှတ်နိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:164:en"
  };

  window.CONTENT_I18N["python:165"] = window.CONTENT_I18N["python:165"] || {};
  window.CONTENT_I18N["python:165"].my = {
    title: "Method များကိုသတ်မှတ်ခြင်းနှင့် self (class03.py)",
    concept: "Class အတွင်းတွင်သတ်မှတ်ထားသော function များကို **method** ဟုခေါ်သည်။ Method တိုင်း၏ပထမ parameter သည် `self` ဖြစ်ပြီး လက်ရှိ instance ကိုရည်ညွှန်းသည်။ Instance variables များကို `self.variable_name` ဖြင့်ရယူပါ။ Method များသည် object တစ်ခု၏ဒေတာကိုရယူခြင်းနှင့်ပြုပြင်ခြင်းတို့လုပ်ဆောင်နိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:165:en"
  };

  window.CONTENT_I18N["python:166"] = window.CONTENT_I18N["python:166"] || {};
  window.CONTENT_I18N["python:166"].my = {
    title: "Class Variable များနှင့် Instance Variable များ (class04.py)",
    concept: "**Class variable** သည် class ၏ instance အားလုံးကြားတွင်မျှဝေသည် (class body တွင်တိုက်ရိုက်သတ်မှတ်သည်)။ **Instance variable** သည် instance တစ်ခုချင်းစီအတွက်သီးသန့်ဖြစ်သည် (`__init__` တွင် `self` ကိုသုံးကာသတ်မှတ်သည်)။ Class တစ်ခုတွင် method များစွာပါဝင်နိုင်သည် — အချို့ကဒေတာကိုပြသသည်၊ အချို့ကတွက်ချက်ထားသောတန်ဖိုးများကိုပြန်ပေးသည်၊ အချို့က attributes များကိုပြုပြင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:166:en"
  };

  window.CONTENT_I18N["python:167"] = window.CONTENT_I18N["python:167"] || {};
  window.CONTENT_I18N["python:167"].my = {
    title: "လေ့ကျင့်ခန်း: ရမှတ်များကိုသိမ်းဆည်းသော Student Class တစ်ခုကိုသတ်မှတ်ခြင်း (script8-1.py)",
    concept: "**Chapter 8 လေ့ကျင့်ခန်း (script8-1.py)**\n\nတာဝန်: ကျောင်းသားအမည်များနှင့် ဘာသာရပ်ရမှတ်များကိုသိမ်းဆည်းသော Student class တစ်ခုကိုသတ်မှတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:167:en"
  };

  window.CONTENT_I18N["python:168"] = window.CONTENT_I18N["python:168"] || {};
  window.CONTENT_I18N["python:168"].my = {
    title: "လေ့ကျင့်ခန်း: Class Method များဖြင့် စုစုပေါင်းနှင့် ပျမ်းမျှတွက်ချက်ခြင်း (script8-2.py)",
    concept: "**Chapter 8 လေ့ကျင့်ခန်း (script8-2.py)**\n\nတာဝန်: စုစုပေါင်းနှင့်ပျမ်းမျှရမှတ်များကိုတွက်ချက်ရန် Student class သို့ method များထည့်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:168:en"
  };

  window.CONTENT_I18N["python:169"] = window.CONTENT_I18N["python:169"] || {};
  window.CONTENT_I18N["python:169"].my = {
    title: "လေ့ကျင့်ခန်း: Instance List ကိုဖြတ်၍ ရမှတ်များကိုထုတ်ပြခြင်း (script8-3.py)",
    concept: "**Chapter 8 လေ့ကျင့်ခန်း (script8-3.py)**\n\nတာဝန်: ကျောင်းသား object များ၏ list တစ်ခုကိုဖန်တီးပြီး loop ကိုသုံးကာ ရမှတ်များကို print ထုတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:169:en"
  };

  window.CONTENT_I18N["python:170"] = window.CONTENT_I18N["python:170"] || {};
  window.CONTENT_I18N["python:170"].my = {
    title: "Function Module တစ်ခုကိုဖန်တီးခြင်း (my_func.py)",
    concept: "Python code ပါဝင်သော သီးခြား `.py` ဖိုင်တစ်ခုကို **module** ဟုခေါ်သည်။ အခြားဖိုင်များတွင်သတ်မှတ်ထားသော functions နှင့် classes များကို သင့် code တွင်ပြန်သုံးရန် `import module_name` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:170:en"
  };

  window.CONTENT_I18N["python:171"] = window.CONTENT_I18N["python:171"] || {};
  window.CONTENT_I18N["python:171"].my = {
    title: "Class Module တစ်ခုကိုဖန်တီးခြင်း (my_class.py)",
    concept: "Python code ပါဝင်သော သီးခြား `.py` ဖိုင်တစ်ခုကို **module** ဟုခေါ်သည်။ အခြားဖိုင်များတွင်သတ်မှတ်ထားသော functions နှင့် classes များကို သင့် code တွင်ပြန်သုံးရန် `import module_name` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:171:en"
  };

  window.CONTENT_I18N["python:172"] = window.CONTENT_I18N["python:172"] || {};
  window.CONTENT_I18N["python:172"].my = {
    title: "ပေါင်းစပ် Module Script (calc_account.py)",
    concept: "Python code ပါဝင်သော သီးခြား `.py` ဖိုင်တစ်ခုကို **module** ဟုခေါ်သည်။ အခြားဖိုင်များတွင်သတ်မှတ်ထားသော functions နှင့် classes များကို သင့် code တွင်ပြန်သုံးရန် `import module_name` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:172:en"
  };

  window.CONTENT_I18N["python:173"] = window.CONTENT_I18N["python:173"] || {};
  window.CONTENT_I18N["python:173"].my = {
    title: "Package အတွင်း Class သတ်မှတ်ခြင်း (my_class.py)",
    concept: "Module များ (ဖိုင်များ) အများအပြားပါဝင်သော ဖိုဒါတစ်ခုကို **package** ဟုခေါ်သည်။ Package ဖိုဒါတစ်ခုတွင် package ကိုစတင်သည့်အခါ run သော အထူးဖိုင် `__init__.py` ပါဝင်ရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:173:en"
  };

  window.CONTENT_I18N["python:174"] = window.CONTENT_I18N["python:174"] || {};
  window.CONTENT_I18N["python:174"].my = {
    title: "Package အတွင်း Function သတ်မှတ်ခြင်း (my_func.py)",
    concept: "Module များ (ဖိုင်များ) အများအပြားပါဝင်သော ဖိုဒါတစ်ခုကို **package** ဟုခေါ်သည်။ Package ဖိုဒါတစ်ခုတွင် package ကိုစတင်သည့်အခါ run သော အထူးဖိုင် `__init__.py` ပါဝင်ရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:174:en"
  };

  window.CONTENT_I18N["python:175"] = window.CONTENT_I18N["python:175"] || {};
  window.CONTENT_I18N["python:175"].my = {
    title: "အသိုက်လိုက် Sub-Package အတွင်း Function သတ်မှတ်ခြင်း (my_func.py)",
    concept: "`module_name.function_name` သည်ရှည်လွန်းပါက module အမည်ကိုချန်လှပ်ရန် `from module_name import function_name` ကိုသုံးပါ။ `as` ကိုသုံးကာ alias တစ်ခုဖန်တီးနိုင်သည်: `import library as lib`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:175:en"
  };

  window.CONTENT_I18N["python:176"] = window.CONTENT_I18N["python:176"] || {};
  window.CONTENT_I18N["python:176"].my = {
    title: "import ဖြင့် Module များကိုဖတ်ခြင်း (script.py)",
    concept: "Python code ပါဝင်သော သီးခြား `.py` ဖိုင်တစ်ခုကို **module** ဟုခေါ်သည်။ အခြားဖိုင်များတွင်သတ်မှတ်ထားသော functions နှင့် classes များကို သင့် code တွင်ပြန်သုံးရန် `import module_name` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:176:en"
  };

  window.CONTENT_I18N["python:177"] = window.CONTENT_I18N["python:177"] || {};
  window.CONTENT_I18N["python:177"].my = {
    title: "Package မှ Module တစ်ခုကိုတင်သွင်းခြင်း (script_package01.py)",
    concept: "Module များ (ဖိုင်များ) အများအပြားပါဝင်သော ဖိုဒါတစ်ခုကို **package** ဟုခေါ်သည်။ Package ဖိုဒါတစ်ခုတွင် package ကိုစတင်သည့်အခါ run သော အထူးဖိုင် `__init__.py` ပါဝင်ရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:177:en"
  };

  window.CONTENT_I18N["python:178"] = window.CONTENT_I18N["python:178"] || {};
  window.CONTENT_I18N["python:178"].my = {
    title: "အသိုက်လိုက် Package မှတင်သွင်းခြင်း (script_package02.py)",
    concept: "Module များ (ဖိုင်များ) အများအပြားပါဝင်သော ဖိုဒါတစ်ခုကို **package** ဟုခေါ်သည်။ Package ဖိုဒါတစ်ခုတွင် package ကိုစတင်သည့်အခါ run သော အထူးဖိုင် `__init__.py` ပါဝင်ရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:178:en"
  };

  window.CONTENT_I18N["python:179"] = window.CONTENT_I18N["python:179"] || {};
  window.CONTENT_I18N["python:179"].my = {
    title: "Package စတင်ခြင်းဖိုင် (__init__.py)",
    concept: "Module များ (ဖိုင်များ) အများအပြားပါဝင်သော ဖိုဒါတစ်ခုကို **package** ဟုခေါ်သည်။ Package ဖိုဒါတစ်ခုတွင် package ကိုစတင်သည့်အခါ run သော အထူးဖိုင် `__init__.py` ပါဝင်ရမည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:179:en"
  };

  window.CONTENT_I18N["python:180"] = window.CONTENT_I18N["python:180"] || {};
  window.CONTENT_I18N["python:180"].my = {
    title: "from ဖြင့် သတ်မှတ် Module တစ်ခုကိုတင်သွင်းခြင်း (script_package03.py)",
    concept: "`module_name.function_name` သည်ရှည်လွန်းပါက module အမည်ကိုချန်လှပ်ရန် `from module_name import function_name` ကိုသုံးပါ။ `as` ကိုသုံးကာ alias တစ်ခုဖန်တီးနိုင်သည်: `import library as lib`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:180:en"
  };

  window.CONTENT_I18N["python:181"] = window.CONTENT_I18N["python:181"] || {};
  window.CONTENT_I18N["python:181"].my = {
    title: "from ဖြင့် သတ်မှတ် Function များကိုတိုက်ရိုက်တင်သွင်းခြင်း (script_package04.py)",
    concept: "`module_name.function_name` သည်ရှည်လွန်းပါက module အမည်ကိုချန်လှပ်ရန် `from module_name import function_name` ကိုသုံးပါ။ `as` ကိုသုံးကာ alias တစ်ခုဖန်တီးနိုင်သည်: `import library as lib`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:181:en"
  };

  window.CONTENT_I18N["python:182"] = window.CONTENT_I18N["python:182"] || {};
  window.CONTENT_I18N["python:182"].my = {
    title: "as ဖြင့် Module Alias (အမည်ပြောင်) ဖန်တီးခြင်း (script_package05.py)",
    concept: "`module_name.function_name` သည်ရှည်လွန်းပါက module အမည်ကိုချန်လှပ်ရန် `from module_name import function_name` ကိုသုံးပါ။ `as` ကိုသုံးကာ alias တစ်ခုဖန်တီးနိုင်သည်: `import library as lib`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:182:en"
  };

  window.CONTENT_I18N["python:183"] = window.CONTENT_I18N["python:183"] || {};
  window.CONTENT_I18N["python:183"].my = {
    title: "အသိုက်လိုက် Sub-Package စတင်ခြင်းဖိုင် (__init__.py)",
    concept: "`module_name.function_name` သည်ရှည်လွန်းပါက module အမည်ကိုချန်လှပ်ရန် `from module_name import function_name` ကိုသုံးပါ။ `as` ကိုသုံးကာ alias တစ်ခုဖန်တီးနိုင်သည်: `import library as lib`။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:183:en"
  };

  window.CONTENT_I18N["python:184"] = window.CONTENT_I18N["python:184"] || {};
  window.CONTENT_I18N["python:184"].my = {
    title: "လေ့ကျင့်ခန်း: အခြား Module တွင်သတ်မှတ်ထားသော Class တစ်ခုကိုတင်သွင်းခြင်းနှင့်အသုံးပြုခြင်း (script9-2.py)",
    concept: "**Chapter 9 လေ့ကျင့်ခန်း (script9-2.py)**\n\nတာဝန်: ကျောင်းသားတစ်ဦးကိုရှာဖွေရန် ပြင်ပ module များမှ custom class နှင့် search function တစ်ခုကိုတင်သွင်းပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:184:en"
  };

  window.CONTENT_I18N["python:185"] = window.CONTENT_I18N["python:185"] || {};
  window.CONTENT_I18N["python:185"].my = {
    title: "လက်ရှိရက်စွဲနှင့်အချိန်ကိုရယူခြင်း (hiduke01.py)",
    concept: "Python တွင် ရက်စွဲနှင့်အချိန်များကိုကိုင်တွယ်ရန် standard library `datetime` module ကိုသုံးပါ။ လက်ရှိ date-time object ကိုမြန်မြန်ရရန် `datetime.now()` ကိုခေါ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:185:en"
  };

  window.CONTENT_I18N["python:186"] = window.CONTENT_I18N["python:186"] || {};
  window.CONTENT_I18N["python:186"].my = {
    title: "သတ်မှတ်ရက်စွဲနှင့်အချိန်ဖြင့် datetime ဖန်တီးခြင်း (hiduke02.py)",
    concept: "Python တွင် ရက်စွဲနှင့်အချိန်များကိုကိုင်တွယ်ရန် standard library `datetime` module ကိုသုံးပါ။ လက်ရှိ date-time object ကိုမြန်မြန်ရရန် `datetime.now()` ကိုခေါ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:186:en"
  };

  window.CONTENT_I18N["python:187"] = window.CONTENT_I18N["python:187"] || {};
  window.CONTENT_I18N["python:187"].my = {
    title: "အချိန်မပါဘဲ ရက်စွဲ Object ဖန်တီးခြင်း (hiduke03.py)",
    concept: "Python တွင် ရက်စွဲနှင့်အချိန်များကိုကိုင်တွယ်ရန် standard library `datetime` module ကိုသုံးပါ။ လက်ရှိ date-time object ကိုမြန်မြန်ရရန် `datetime.now()` ကိုခေါ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:187:en"
  };

  window.CONTENT_I18N["python:188"] = window.CONTENT_I18N["python:188"] || {};
  window.CONTENT_I18N["python:188"].my = {
    title: "မမှန်ကန်သော ရက်စွဲသတ်မှတ်ချက်အမှား (hiduke04.py)",
    concept: "Python တွင် ရက်စွဲနှင့်အချိန်များကိုကိုင်တွယ်ရန် standard library `datetime` module ကိုသုံးပါ။ မမှန်ကန်သောရက်စွဲတစ်ခု (ဥပမာ၊ လ ၂ လ ၃၀ ရက်) ကိုပေးပို့ပါက `ValueError` ကိုမြှင့်တင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:188:en"
  };

  window.CONTENT_I18N["python:189"] = window.CONTENT_I18N["python:189"] || {};
  window.CONTENT_I18N["python:189"].my = {
    title: "date.today() ဖြင့် ယနေ့ရက်စွဲကိုရယူခြင်း (hiduke05.py)",
    concept: "Python တွင် ရက်စွဲနှင့်အချိန်များကိုကိုင်တွယ်ရန် standard library `datetime` module ကိုသုံးပါ။ လက်ရှိရက်စွဲကိုရရန် `date.today()` ကိုခေါ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:189:en"
  };

  window.CONTENT_I18N["python:190"] = window.CONTENT_I18N["python:190"] || {};
  window.CONTENT_I18N["python:190"].my = {
    title: "အနာဂတ်ရက်စွဲတစ်ခုကိုဖန်တီးခြင်း (hiduke06.py)",
    concept: "Python တွင် ရက်စွဲနှင့်အချိန်များကိုကိုင်တွယ်ရန် standard library `datetime` module ကိုသုံးပါ။ `date()` သို့ နှစ်၊ လ၊ ရက်ကိုပေးပို့ခြင်းဖြင့် အနာဂတ်ရက်စွဲတစ်ခုကိုဖန်တီးနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:190:en"
  };

  window.CONTENT_I18N["python:191"] = window.CONTENT_I18N["python:191"] || {};
  window.CONTENT_I18N["python:191"].my = {
    title: "ရက်စွဲများကိုနှိုင်းယှဉ်ခြင်း (hiduke07.py)",
    concept: "ရက်စွဲနှစ်ခုကိုနုတ်ခြင်းသည် အချိန်ကွာခြားချက်ကိုကိုယ်စားပြုသော `timedelta` object တစ်ခုကိုထုတ်ပေးသည်။ Date-time object တစ်ခုကို စိတ်ကြိုက် string format (ဥပမာ `2026/06/04`) ဖြင့်ထုတ်ရန် `strftime()` method ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:191:en"
  };

  window.CONTENT_I18N["python:192"] = window.CONTENT_I18N["python:192"] || {};
  window.CONTENT_I18N["python:192"].my = {
    title: "timedelta ဖြင့် ရက်စွဲများကိုပေါင်းခြင်းနှင့်နုတ်ခြင်း (hiduke08.py)",
    concept: "ရက်စွဲနှစ်ခုကိုနုတ်ခြင်းသည် အချိန်ကွာခြားချက်ကိုကိုယ်စားပြုသော `timedelta` object တစ်ခုကိုထုတ်ပေးသည်။ ရက်များကိုပေါင်းရန်သို့မဟုတ်နုတ်ရန် `timedelta(days=N)` ကိုသုံးပါ။ ကွာခြားချက်ကိုရက်များဖြင့် `.days` သို့မဟုတ် စက္ကန့်များဖြင့် `.seconds` ဖြင့်ရယူပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:192:en"
  };

  window.CONTENT_I18N["python:193"] = window.CONTENT_I18N["python:193"] || {};
  window.CONTENT_I18N["python:193"].my = {
    title: "datetime ကွာခြားချက်ကို စက္ကန့်များသို့ပြောင်းခြင်း (hiduke09.py)",
    concept: "datetime string တစ်ခုကို `datetime` object အဖြစ်ပြောင်းရန် `strptime()` ကိုသုံးပါ။ `%Y`, `%m`, `%d` ကဲ့သို့သော directives များဖြင့် format ကိုသတ်မှတ်ပါ။ ကွာခြားချက်ကိုရက်များဖြင့် `.days` သို့မဟုတ် စက္ကန့်များဖြင့် `.seconds` ဖြင့်ရယူပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:193:en"
  };

  window.CONTENT_I18N["python:194"] = window.CONTENT_I18N["python:194"] || {};
  window.CONTENT_I18N["python:194"].my = {
    title: "weekday() ဖြင့် ရက်သတ္တပတ်၏ရက်ကိုရယူခြင်း (hiduke10.py)",
    concept: "ရက်စွဲနှစ်ခုကိုနုတ်ခြင်းသည် အချိန်ကွာခြားချက်ကိုကိုယ်စားပြုသော `timedelta` object တစ်ခုကိုထုတ်ပေးသည်။ ရက်သတ္တပတ်၏ရက်ကို integer အနေဖြင့်ရရန် `date.weekday()` ကိုသုံးပါ (တနင်္လာ = 0၊ တနင်္ဂနွေ = 6)။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:194:en"
  };

  window.CONTENT_I18N["python:195"] = window.CONTENT_I18N["python:195"] || {};
  window.CONTENT_I18N["python:195"].my = {
    title: "strptime ဖြင့် စာသားမှ ရက်စွဲသို့ပြောင်းခြင်း (hiduke11.py)",
    concept: "ရက်စွဲနှစ်ခုကိုနုတ်ခြင်းသည် `timedelta` object တစ်ခုကိုထုတ်ပေးသည်။ ရက်စွဲ string တစ်ခုကို `datetime` object အဖြစ်ပြောင်းရန် `datetime.strptime(string, format)` ကိုသုံးပြီး `%Y`, `%m`, `%d` ကဲ့သို့သော directives များဖြင့် format ကိုသတ်မှတ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:195:en"
  };

  window.CONTENT_I18N["python:196"] = window.CONTENT_I18N["python:196"] || {};
  window.CONTENT_I18N["python:196"].my = {
    title: "strftime ဖြင့် datetime ကိုဖော်မတ်ခြင်း (hiduke12.py)",
    concept: "ရက်စွဲနှစ်ခုကိုနုတ်ခြင်းသည် `timedelta` object တစ်ခုကိုထုတ်ပေးသည်။ Date-time object တစ်ခုကို ဖော်မတ်ထားသော string အဖြစ်ထုတ်ရန် `datetime.strftime(format)` ကိုသုံးပါ။ အသုံးများသော format codes: `%Y` (နှစ်), `%m` (လ), `%d` (ရက်), `%H` (နာရီ), `%M` (မိနစ်)။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:196:en"
  };

  window.CONTENT_I18N["python:197"] = window.CONTENT_I18N["python:197"] || {};
  window.CONTENT_I18N["python:197"].my = {
    title: "random() ဖြင့် 0 မှ 1 ကြား Random Float ထုတ်ပေးခြင်း (ransu01.py)",
    concept: "ကျပန်းတန်ဖိုးများထုတ်ပေးရန် `random` module ကိုသုံးပါ:\n- `random.random()` — 0.0 မှ 1.0 ကြားရှိ float\n- `random.randint(a, b)` — a နှင့် b ကြားရှိ integer (a နှင့် b အပါအဝင်)\n- `random.shuffle(list)` — List တစ်ခုကိုနေရာတွင်ကျပန်းရောနှောသည်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:197:en"
  };

  window.CONTENT_I18N["python:198"] = window.CONTENT_I18N["python:198"] || {};
  window.CONTENT_I18N["python:198"].my = {
    title: "randint() ဖြင့် အကွာအဝေးသတ်မှတ်ထားသော ကျပန်း Integer ထုတ်ပေးခြင်း (ransu02.py)",
    concept: "ကျပန်းတန်ဖိုးများထုတ်ပေးရန် `random` module ကိုသုံးပါ:\n- `random.random()` — 0.0 မှ 1.0 ကြားရှိ float\n- `random.randint(a, b)` — a နှင့် b ကြားရှိ integer (a နှင့် b အပါအဝင်)\n- `random.shuffle(list)` — List တစ်ခုကိုနေရာတွင်ကျပန်းရောနှောသည်",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:198:en"
  };

  window.CONTENT_I18N["python:199"] = window.CONTENT_I18N["python:199"] || {};
  window.CONTENT_I18N["python:199"].my = {
    title: "choice() ဖြင့် Sequence တစ်ခုမှ Element တစ်ခုကိုကျပန်းရွေးချယ်ခြင်း (ransu03.py)",
    concept: "ကျပန်းတန်ဖိုးများထုတ်ပေးရန် `random` module ကိုသုံးပါ။ `random.choice(sequence)` သည် list သို့မဟုတ် အခြား sequence တစ်ခုမှ element တစ်ခုကိုကျပန်းရွေးချယ်ပြီး ပြန်ပေးသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:199:en"
  };

  window.CONTENT_I18N["python:200"] = window.CONTENT_I18N["python:200"] || {};
  window.CONTENT_I18N["python:200"].my = {
    title: "လေ့ကျင့်ခန်း: အသုံးပြုသူထည့်သွင်းသော ရက်စွဲ String ကိုခွဲခြမ်းစိတ်ဖြာခြင်း (script10-1.py)",
    concept: "**Chapter 10 လေ့ကျင့်ခန်း (script10-1.py)**\n\nတာဝန်: အသုံးပြုသူထည့်သွင်းသော ရက်စွဲ string တစ်ခုကို datetime object အဖြစ်ခွဲခြမ်းစိတ်ဖြာပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:200:en"
  };

  /* ---- Lessons 201-255: AI-assisted Burmese translation from English source ---- */

  window.CONTENT_I18N["python:201"] = window.CONTENT_I18N["python:201"] || {};
  window.CONTENT_I18N["python:201"].my = {
    title: "လေ့ကျင့်ခန်း: ရက်စွဲနှစ်ခုကြား ရက်ကွာခြားချက်ကို တွက်ချက်ခြင်း (script10-2.py)",
    concept: "**Chapter 10 လေ့ကျင့်ခန်း (script10-2.py)**\n\nတာဝန်: ရက်စွဲနှစ်ခုကိုထည့်သွင်းပြီး ၎င်းတို့ကြားရှိ ရက်အရေအတွက်ကို တွက်ချက်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:201:en"
  };

  window.CONTENT_I18N["python:202"] = window.CONTENT_I18N["python:202"] || {};
  window.CONTENT_I18N["python:202"].my = {
    title: "လေ့ကျင့်ခန်း: အန်စာတုံးလိပ်ဂိမ်း သရုပ်ဖော်ခြင်း (script10-3.py)",
    concept: "**Chapter 10 လေ့ကျင့်ခန်း (script10-3.py)**\n\nတာဝန်: အန်စာတုံးလိပ်ခြင်းကို သရုပ်ဖော်ပြီး ၎င်းတို့၏ပေါင်းလဒ်သည် စုံဂဏန်း (even) သို့မဟုတ် မ ဂဏန်း (odd) ဟုတ်မဟုတ် စစ်ဆေးပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:202:en"
  };

  window.CONTENT_I18N["python:203"] = window.CONTENT_I18N["python:203"] || {};
  window.CONTENT_I18N["python:203"].my = {
    title: "with ဖြင့် ဖိုင်ကိုအလိုအလျောက်ပိတ်ခြင်း (sample.txt)",
    concept: "ဖိုင်လုပ်ဆောင်နေစဉ် error ဖြစ်ပါက `close()` ကို execute မလုပ်နိုင်တော့ဘဲ ဖိုင်ကိုပွင့်နေစေနိုင်သည်။ `with open(...) as f:` ကိုသုံးခြင်းဖြင့် block မှထွက်သည့်အခါ (error ဖြစ်သည့်တိုင်) **ဖိုင်ကိုအလိုအလျောက်ပိတ်ပေးပြီး** code ကိုပိုမိုလုံခြုံပြီး တိုတောင်းစေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:203:en"
  };

  window.CONTENT_I18N["python:204"] = window.CONTENT_I18N["python:204"] || {};
  window.CONTENT_I18N["python:204"].my = {
    title: "os.path.exists ဖြင့် ဖိုင်တည်ရှိမှုစစ်ဆေးခြင်း (arunashi01.py)",
    concept: "ဖိုင်တစ်ခုသို့ဒေတာရေးရန် `open('filename', 'w', encoding='utf-8')` ဖြင့်ဖွင့်ပါ။ စာသားရေးရန် `write()` ကိုသုံးပြီး ပြီးသည့်အခါ `close()` ကိုအမြဲခေါ်ပါ။ ဖိုင်တစ်ခုကိုမလုပ်ဆောင်မီ ၎င်းရှိမရှိစစ်ဆေးရန် `os.path.exists()` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:204:en"
  };

  window.CONTENT_I18N["python:205"] = window.CONTENT_I18N["python:205"] || {};
  window.CONTENT_I18N["python:205"].my = {
    title: "read() ဖြင့် ဖိုင်တစ်ခုလုံးပါအကြောင်းအရာကိုဖတ်ခြင်း (yomikomi01.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ရန် `'r'` (read) mode ဖြင့်ဖွင့်ပါ။ `read()` သည် ဖိုင်တစ်ခုလုံးကို string ကြီးတစ်ခုတည်းအဖြစ်ဖတ်သည်။ `readlines()` သည် စာကြောင်းအားလုံးကို list တစ်ခုထဲသို့ စာကြောင်းတစ်ကြောင်းလျှင် element တစ်ခုစီဖြင့်ဖတ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:205:en"
  };

  window.CONTENT_I18N["python:206"] = window.CONTENT_I18N["python:206"] || {};
  window.CONTENT_I18N["python:206"].my = {
    title: "with ကိုသုံးကာ လုံခြုံသောဖိုင်ဖွင့်ခြင်း (yomikomi01_with.py)",
    concept: "ဖိုင်လုပ်ဆောင်နေစဉ် error ဖြစ်ပါက `close()` ကို execute မလုပ်နိုင်တော့ဘဲ ဖိုင်ကိုပွင့်နေစေနိုင်သည်။ `with open(...) as f:` ကိုသုံးခြင်းဖြင့် block မှထွက်သည့်အခါ (error ဖြစ်သည့်တိုင်) **ဖိုင်ကိုအလိုအလျောက်ပိတ်ပေးပြီး** code ကိုပိုမိုလုံခြုံပြီး တိုတောင်းစေသည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:206:en"
  };

  window.CONTENT_I18N["python:207"] = window.CONTENT_I18N["python:207"] || {};
  window.CONTENT_I18N["python:207"].my = {
    title: "readline() ဖြင့် ဖိုင်ကိုစာကြောင်းတစ်ကြောင်းချင်းဖတ်ခြင်း (yomikomi02.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ရန် `'r'` (read) mode ဖြင့်ဖွင့်ပါ။ `read()` သည် ဖိုင်တစ်ခုလုံးကို string ကြီးတစ်ခုတည်းအဖြစ်ဖတ်သည်။ `readlines()` သည် စာကြောင်းအားလုံးကို list တစ်ခုထဲသို့ဖတ်သည်။ Loop ထဲတွင် `readline()` ကိုသုံးကာ ဖိုင်အဆုံးအထိ တစ်ကြောင်းချင်းဖတ်ပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:207:en"
  };

  window.CONTENT_I18N["python:208"] = window.CONTENT_I18N["python:208"] || {};
  window.CONTENT_I18N["python:208"].my = {
    title: "readlines() ဖြင့် စာကြောင်းအားလုံးကို List တစ်ခုအဖြစ်ရယူခြင်း (yomikomi03.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ရန် `'r'` (read) mode ဖြင့်ဖွင့်ပါ။ `read()` သည် ဖိုင်တစ်ခုလုံးကို string ကြီးတစ်ခုတည်းအဖြစ်ဖတ်သည်။ `readlines()` သည် စာကြောင်းအားလုံးကို list တစ်ခုထဲသို့ စာကြောင်းတစ်ကြောင်းလျှင် element တစ်ခုစီ (newline character များအပါအဝင်) ဖြင့်ဖတ်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:208:en"
  };

  window.CONTENT_I18N["python:209"] = window.CONTENT_I18N["python:209"] || {};
  window.CONTENT_I18N["python:209"].my = {
    title: "w Mode ဖြင့် ဖိုင်အသစ်ဖန်တီးရေးသားခြင်း (kakikomi01.py)",
    concept: "ဖိုင်တစ်ခုသို့ဒေတာရေးရန် `open('filename', 'w', encoding='utf-8')` ဖြင့်ဖွင့်ပါ။ စာသားရေးရန် `write()` ကိုသုံးပြီး ပြီးသည့်အခါ `close()` ကိုအမြဲခေါ်ပါ။ ဖိုင်တစ်ခုကိုမလုပ်ဆောင်မီ ၎င်းရှိမရှိစစ်ဆေးရန် `os.path.exists()` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:209:en"
  };

  window.CONTENT_I18N["python:210"] = window.CONTENT_I18N["python:210"] || {};
  window.CONTENT_I18N["python:210"].my = {
    title: "လေ့ကျင့်ခန်း: students.txt ၏ အကြောင်းအရာအားလုံးကိုဖတ်ပြသခြင်း (script11-1.py)",
    concept: "**Chapter 11 လေ့ကျင့်ခန်း (script11-1.py)**\n\nတာဝန်: students.txt မှစာကြောင်းအားလုံးကိုဖွင့်ဖတ်ပြီး print ထုတ်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:210:en"
  };

  window.CONTENT_I18N["python:211"] = window.CONTENT_I18N["python:211"] || {};
  window.CONTENT_I18N["python:211"].my = {
    title: "writelines() ဖြင့် List မှစာကြောင်းများစွာကိုရေးသားခြင်း (kakikomi02.py)",
    concept: "ဖိုင်တစ်ခုသို့ဒေတာရေးရန် `open('filename', 'w', encoding='utf-8')` ဖြင့်ဖွင့်ပါ။ string တစ်ခုရေးရန် `write()` ကိုသုံးပြီး ပြီးသည့်အခါ `close()` ကိုအမြဲခေါ်ပါ။ List မှစာကြောင်းများစွာကိုတစ်ပြိုင်နက်ရေးရန် `f.writelines(list)` ကိုသုံးပါ။ ဖိုင်တစ်ခုကိုမလုပ်ဆောင်မီ `os.path.exists()` ဖြင့်စစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:211:en"
  };

  window.CONTENT_I18N["python:212"] = window.CONTENT_I18N["python:212"] || {};
  window.CONTENT_I18N["python:212"].my = {
    title: "လေ့ကျင့်ခန်း: အသုံးပြုသူထည့်သွင်းသော ကျောင်းသားဒေတာကိုဖိုင်သို့သိမ်းဆည်းခြင်း (script11-2.py)",
    concept: "**Chapter 11 လေ့ကျင့်ခန်း (script11-2.py)**\n\nတာဝန်: အသုံးပြုသူထည့်သွင်းသော ကျောင်းသားဒေတာကိုဖိုင်တစ်ခုသို့သိမ်းဆည်းပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:212:en"
  };

  window.CONTENT_I18N["python:213"] = window.CONTENT_I18N["python:213"] || {};
  window.CONTENT_I18N["python:213"].my = {
    title: "Append Mode ('a') ဖြင့် ရှိပြီးသားဖိုင်ကိုဆက်ရေးခြင်း (kakikomi03.py)",
    concept: "ဖိုင်တစ်ခုသို့ဒေတာရေးရန် `open('filename', 'w', encoding='utf-8')` ဖြင့်ဖွင့်ပါ။ string တစ်ခုရေးရန် `write()` ကိုသုံးပြီး ပြီးသည့်အခါ `close()` ကိုအမြဲခေါ်ပါ။ ရှိပြီးသားဖိုင်တစ်ခုကို မဖျက်ဘဲဆက်ရေးရန် append mode `'a'` ဖြင့်ဖွင့်ပါ။ ဖိုင်တစ်ခုကိုမလုပ်ဆောင်မီ `os.path.exists()` ဖြင့်စစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:213:en"
  };

  window.CONTENT_I18N["python:214"] = window.CONTENT_I18N["python:214"] || {};
  window.CONTENT_I18N["python:214"].my = {
    title: "Package လမ်းကြောင်းကိုအခြေခံ၍ ဖိုင်ဖွင့်ခြင်း (openfile.py)",
    concept: "ပရိုဂရမ်တစ်ခုမှဖိုင်တစ်ခုကိုဖတ်သည့်အခါ execute လုပ်သည့် directory နှင့် target ဖိုင်ကြားရှိ ဆက်စပ်တည်နေရာ (path) သည်အရေးကြီးသည်။ တူညီသော relative path သည်အခြား working directory မှ run ပါက ပျက်သွားနိုင်ပြီး `FileNotFoundError` ကိုဖြစ်စေနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:214:en"
  };

  window.CONTENT_I18N["python:215"] = window.CONTENT_I18N["python:215"] || {};
  window.CONTENT_I18N["python:215"].my = {
    title: "လေ့ကျင့်ခန်း: ဖိုင်ကိုဖတ်ပြီး List ထဲသို့သိမ်းဆည်းခြင်း (script11-3.py)",
    concept: "**Chapter 11 လေ့ကျင့်ခန်း (script11-3.py)**\n\nတာဝန်: ဖိုင်တစ်ခုကိုဖတ်ပြီး ၎င်း၏အကြောင်းအရာများကို list တစ်ခုထဲသို့သိမ်းဆည်းပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:215:en"
  };

  window.CONTENT_I18N["python:216"] = window.CONTENT_I18N["python:216"] || {};
  window.CONTENT_I18N["python:216"].my = {
    title: "လေ့ကျင့်ခန်း: ဖိုင်ဒေတာမှ Student Instance များဖန်တီးခြင်း (script11-4.py)",
    concept: "**Chapter 11 လေ့ကျင့်ခန်း (script11-4.py)**\n\nတာဝန်: ဖိုင်ဒေတာမှ Student instance များကိုဖန်တီးပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:216:en"
  };

  window.CONTENT_I18N["python:217"] = window.CONTENT_I18N["python:217"] || {};
  window.CONTENT_I18N["python:217"].my = {
    title: "ဖိုင်အကြောင်းအရာများပေါ်တွင် Regex အစုလိုက်လိုက်ဖက်ခြင်း (aaa.txt)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:217:en"
  };

  window.CONTENT_I18N["python:218"] = window.CONTENT_I18N["python:218"] || {};
  window.CONTENT_I18N["python:218"].my = {
    title: "ဖိုင်အကြောင်းအရာများပေါ်တွင် Regex အစုလိုက်လိုက်ဖက်ခြင်း (bbb.txt)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:218:en"
  };

  window.CONTENT_I18N["python:219"] = window.CONTENT_I18N["python:219"] || {};
  window.CONTENT_I18N["python:219"].my = {
    title: "ဖိုင်အကြောင်းအရာများပေါ်တွင် Regex အစုလိုက်လိုက်ဖက်ခြင်း (ccc.txt)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:219:en"
  };

  window.CONTENT_I18N["python:220"] = window.CONTENT_I18N["python:220"] || {};
  window.CONTENT_I18N["python:220"].my = {
    title: "ဖိုင်အကြောင်းအရာများပေါ်တွင် Regex အစုလိုက်လိုက်ဖက်ခြင်း (test-result.txt)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:220:en"
  };

  window.CONTENT_I18N["python:221"] = window.CONTENT_I18N["python:221"] || {};
  window.CONTENT_I18N["python:221"].my = {
    title: "re.search ဖြင့် တစ်စိတ်တစ်ပိုင်းကိုက်ညီမှုရှာဖွေခြင်း (seiki01.py)",
    concept: "**Regular expression** သည် စာသားအတွင်းရှာဖွေရန် ရှုပ်ထွေးသော string pattern များ (ဥပမာ၊ ဂဏန်း ၃ လုံးနောက်တွင် hyphen နှင့်ဂဏန်း ၄ လုံး) ကိုသတ်မှတ်သည့် ယန္တရားတစ်ခုဖြစ်သည်။ Python တွင် `re` module ကိုတင်သွင်းပြီး `re.search(pattern, string)` ကိုသုံးပါ။ အသုံးများသော metacharacters များတွင် string အစအတွက် `^` နှင့် string အဆုံးအတွက် `$` တို့ပါဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:221:en"
  };

  window.CONTENT_I18N["python:222"] = window.CONTENT_I18N["python:222"] || {};
  window.CONTENT_I18N["python:222"].my = {
    title: "re.search ရလဒ် Object ကိုစစ်ဆေးခြင်း (seiki02.py)",
    concept: "**Regular expression** သည် ရှုပ်ထွေးသော string pattern များကိုသတ်မှတ်သည့် ယန္တရားတစ်ခုဖြစ်သည်။ Python တွင် `re` module ကိုတင်သွင်းပြီး `re.search(pattern, string)` ကိုသုံးပါ။ အသုံးများသော metacharacters များတွင် string အစအတွက် `^` နှင့် string အဆုံးအတွက် `$` တို့ပါဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:222:en"
  };

  window.CONTENT_I18N["python:223"] = window.CONTENT_I18N["python:223"] || {};
  window.CONTENT_I18N["python:223"].my = {
    title: "စာကြောင်းအစကျောက်ဆူး (^) (seiki03.py)",
    concept: "**Regular expression** သည် ရှုပ်ထွေးသော string pattern များကိုသတ်မှတ်သည့် ယန္တရားတစ်ခုဖြစ်သည်။ Python တွင် `re` module ကိုတင်သွင်းပြီး `re.search(pattern, string)` ကိုသုံးပါ။ အသုံးများသော metacharacters များတွင် string အစအတွက် `^` နှင့် string အဆုံးအတွက် `$` တို့ပါဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:223:en"
  };

  window.CONTENT_I18N["python:224"] = window.CONTENT_I18N["python:224"] || {};
  window.CONTENT_I18N["python:224"].my = {
    title: "စာကြောင်းအဆုံးကျောက်ဆူး ($) (seiki04.py)",
    concept: "**Regular expression** သည် ရှုပ်ထွေးသော string pattern များကိုသတ်မှတ်သည့် ယန္တရားတစ်ခုဖြစ်သည်။ Python တွင် `re` module ကိုတင်သွင်းပြီး `re.search(pattern, string)` ကိုသုံးပါ။ အသုံးများသော metacharacters များတွင် string အစအတွက် `^` နှင့် string အဆုံးအတွက် `$` တို့ပါဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:224:en"
  };

  window.CONTENT_I18N["python:225"] = window.CONTENT_I18N["python:225"] || {};
  window.CONTENT_I18N["python:225"].my = {
    title: "^ နှင့် $ တို့ကိုတွဲသုံးကာ အတိအကျကိုက်ညီမှုစစ်ဆေးခြင်း (seiki05.py)",
    concept: "**Regular expression** သည် ရှုပ်ထွေးသော string pattern များကိုသတ်မှတ်သည့် ယန္တရားတစ်ခုဖြစ်သည်။ Python တွင် `re` module ကိုတင်သွင်းပြီး `re.search(pattern, string)` ကိုသုံးပါ။ အသုံးများသော metacharacters များတွင် string အစအတွက် `^` နှင့် string အဆုံးအတွက် `$` တို့ပါဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:225:en"
  };

  window.CONTENT_I18N["python:226"] = window.CONTENT_I18N["python:226"] || {};
  window.CONTENT_I18N["python:226"].my = {
    title: "မည်သည့်စာလုံးတစ်လုံးကိုမဆိုကိုယ်စားပြုသော Wildcard (.) (seiki06.py)",
    concept: "အသုံးများသော regex metacharacters များနှင့် quantifiers များ:\n- `.` — မည်သည့်စာလုံးတစ်လုံးမဆို\n- `*` — ရှေ့ဆုံးပုံစံ၏ သုညသို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `+` — ရှေ့ဆုံးပုံစံ၏ တစ်ကြိမ်သို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `[a-z]` — a မှ z အထိ စာလုံးအသေးတစ်လုံးတည်း\n- `\\d` — ဂဏန်းတစ်လုံးတည်း (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:226:en"
  };

  window.CONTENT_I18N["python:227"] = window.CONTENT_I18N["python:227"] || {};
  window.CONTENT_I18N["python:227"].my = {
    title: "ရှေ့ဆုံးစာလုံး၏ ၀ ကြိမ်သို့မဟုတ်ထို့ထက်ပိုသောထပ်ခါမှု (*) (seiki07.py)",
    concept: "အသုံးများသော regex metacharacters များနှင့် quantifiers များ:\n- `.` — မည်သည့်စာလုံးတစ်လုံးမဆို\n- `*` — ရှေ့ဆုံးပုံစံ၏ သုညသို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `+` — ရှေ့ဆုံးပုံစံ၏ တစ်ကြိမ်သို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `[a-z]` — a မှ z အထိ စာလုံးအသေးတစ်လုံးတည်း\n- `\\d` — ဂဏန်းတစ်လုံးတည်း (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:227:en"
  };

  window.CONTENT_I18N["python:228"] = window.CONTENT_I18N["python:228"] || {};
  window.CONTENT_I18N["python:228"].my = {
    title: "ရှေ့ဆုံးစာလုံး၏ တစ်ကြိမ်သို့မဟုတ်ထို့ထက်ပိုသောထပ်ခါမှု (+) (seiki08.py)",
    concept: "အသုံးများသော regex metacharacters များနှင့် quantifiers များ:\n- `.` — မည်သည့်စာလုံးတစ်လုံးမဆို\n- `*` — ရှေ့ဆုံးပုံစံ၏ သုညသို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `+` — ရှေ့ဆုံးပုံစံ၏ တစ်ကြိမ်သို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `[a-z]` — a မှ z အထိ စာလုံးအသေးတစ်လုံးတည်း\n- `\\d` — ဂဏန်းတစ်လုံးတည်း (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:228:en"
  };

  window.CONTENT_I18N["python:229"] = window.CONTENT_I18N["python:229"] || {};
  window.CONTENT_I18N["python:229"].my = {
    title: "ရှေ့ဆုံးစာလုံး၏ ၀ ကြိမ်သို့မဟုတ် ၁ ကြိမ်သာပေါ်ခြင်း (Optional) (?) (seiki09.py)",
    concept: "အသုံးများသော regex metacharacters များနှင့် quantifiers များ:\n- `.` — မည်သည့်စာလုံးတစ်လုံးမဆို\n- `*` — ရှေ့ဆုံးပုံစံ၏ သုညသို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `+` — ရှေ့ဆုံးပုံစံ၏ တစ်ကြိမ်သို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `[a-z]` — a မှ z အထိ စာလုံးအသေးတစ်လုံးတည်း\n- `\\d` — ဂဏန်းတစ်လုံးတည်း (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:229:en"
  };

  window.CONTENT_I18N["python:230"] = window.CONTENT_I18N["python:230"] || {};
  window.CONTENT_I18N["python:230"].my = {
    title: "Character Class အကွာအဝေးသတ်မှတ်ခြင်း [a-z] နှင့် [0-9] (seiki10.py)",
    concept: "အသုံးများသော regex metacharacters များနှင့် quantifiers များ:\n- `.` — မည်သည့်စာလုံးတစ်လုံးမဆို\n- `*` — ရှေ့ဆုံးပုံစံ၏ သုညသို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `+` — ရှေ့ဆုံးပုံစံ၏ တစ်ကြိမ်သို့မဟုတ်ထို့ထက်ပိုသော ထပ်ခါမှုများ\n- `[a-z]` — a မှ z အထိ စာလုံးအသေးတစ်လုံးတည်း\n- `\\d` — ဂဏန်းတစ်လုံးတည်း (0-9)",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:230:en"
  };

  window.CONTENT_I18N["python:231"] = window.CONTENT_I18N["python:231"] || {};
  window.CONTENT_I18N["python:231"].my = {
    title: "ဂဏန်းများအတွက် ကြိုတင်သတ်မှတ်ထားသော Character Set \\d (seiki11.py)",
    concept: "လက်တွေ့ကမ္ဘာအတည်ပြုချက်ပုံစံများ:\n- စာတိုက်ကုဒ် (၃-၄ ဂဏန်း): `^\\d{3}-\\d{4}$`\n- ဖုန်းနံပါတ်: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- ထပ်ခါမှုအရေအတွက်ကိုတိုက်ရိုက်သတ်မှတ်ရန် `{count}` သို့မဟုတ် `{min, max}` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:231:en"
  };

  window.CONTENT_I18N["python:232"] = window.CONTENT_I18N["python:232"] || {};
  window.CONTENT_I18N["python:232"].my = {
    title: "လက်ကွင်းစုံ {m,n} ဖြင့် ထပ်ခါမှုအရေအတွက်သတ်မှတ်ခြင်း (seiki12.py)",
    concept: "လက်တွေ့ကမ္ဘာအတည်ပြုချက်ပုံစံများ:\n- စာတိုက်ကုဒ် (၃-၄ ဂဏန်း): `^\\d{3}-\\d{4}$`\n- ဖုန်းနံပါတ်: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- ထပ်ခါမှုအရေအတွက်ကိုတိုက်ရိုက်သတ်မှတ်ရန် `{count}` သို့မဟုတ် `{min, max}` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:232:en"
  };

  window.CONTENT_I18N["python:233"] = window.CONTENT_I18N["python:233"] || {};
  window.CONTENT_I18N["python:233"].my = {
    title: "လက်ဝါးကပ်တိုင် () ဖြင့် Regex အုပ်စုဖွဲ့ခြင်းနှင့် ဖမ်းယူခြင်း (seiki13.py)",
    concept: "လက်တွေ့ကမ္ဘာအတည်ပြုချက်ပုံစံများ:\n- စာတိုက်ကုဒ် (၃-၄ ဂဏန်း): `^\\d{3}-\\d{4}$`\n- ဖုန်းနံပါတ်: `^\\d{2,4}-\\d{2,4}-\\d{4}$`\n- ထပ်ခါမှုအရေအတွက်ကိုတိုက်ရိုက်သတ်မှတ်ရန် `{count}` သို့မဟုတ် `{min, max}` ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:233:en"
  };

  window.CONTENT_I18N["python:234"] = window.CONTENT_I18N["python:234"] || {};
  window.CONTENT_I18N["python:234"].my = {
    title: "Regular Expressions ဖြင့် ဖိုင်တစ်ခုကိုစကင်ဖတ်ခြင်း (seiki14.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:234:en"
  };

  window.CONTENT_I18N["python:235"] = window.CONTENT_I18N["python:235"] || {};
  window.CONTENT_I18N["python:235"].my = {
    title: "Regex ဖိုင်စကင်ဖတ်ခြင်း (အုပ်စုထုတ်ယူမှုပါ) (seiki14_sep.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:235:en"
  };

  window.CONTENT_I18N["python:236"] = window.CONTENT_I18N["python:236"] || {};
  window.CONTENT_I18N["python:236"].my = {
    title: "Regex ဖြင့် အသုံးပြုသူအမည်များကိုထုတ်ယူခြင်း (seiki15.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:236:en"
  };

  window.CONTENT_I18N["python:237"] = window.CONTENT_I18N["python:237"] || {};
  window.CONTENT_I18N["python:237"].my = {
    title: "သီးခြား Regex အသုံးပြုသူအမည်ထုတ်ယူခြင်း (seiki15_sep.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:237:en"
  };

  window.CONTENT_I18N["python:238"] = window.CONTENT_I18N["python:238"] || {};
  window.CONTENT_I18N["python:238"].my = {
    title: "Regex Groups ဖြင့် ရမှတ်ဒေတာထုတ်ယူခြင်း (seiki16.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:238:en"
  };

  window.CONTENT_I18N["python:239"] = window.CONTENT_I18N["python:239"] || {};
  window.CONTENT_I18N["python:239"].my = {
    title: "သီးခြား Regex ရမှတ်ဒေတာထုတ်ယူခြင်း (seiki16_sep.py)",
    concept: "ဖိုင်တစ်ခုကိုဖတ်ပြီးနောက် သတ်မှတ်ထားသော pattern တစ်ခုနှင့်ကိုက်ညီသော စာကြောင်းများကိုသာထုတ်ယူရန် `re.search()` ကိုတစ်ကြောင်းချင်းအသုံးပြုနိုင်သည်။ ၎င်းသည် log ဖိုင်များသို့မဟုတ် ဖွဲ့စည်းထားသော စာသားဒေတာများကို regular expressions ဖြင့်စစ်ထုတ်ရန်အသုံးဝင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:239:en"
  };

  window.CONTENT_I18N["python:240"] = window.CONTENT_I18N["python:240"] || {};
  window.CONTENT_I18N["python:240"].my = {
    title: "လေ့ကျင့်ခန်း: Regex ဖြင့် မိုဘိုင်းဖုန်းနံပါတ်ပုံစံကိုအတည်ပြုခြင်း (script12-1.py)",
    concept: "**Chapter 12 လေ့ကျင့်ခန်း (script12-1.py)**\n\nတာဝန်: Regular expressions ကိုသုံးကာ မိုဘိုင်းဖုန်းနံပါတ်တစ်ခု၏ပုံစံကိုအတည်ပြုပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:240:en"
  };

  window.CONTENT_I18N["python:241"] = window.CONTENT_I18N["python:241"] || {};
  window.CONTENT_I18N["python:241"].my = {
    title: "လေ့ကျင့်ခန်း: Regex ဖြင့် ဖိုင်မှကျောင်းသားဒေတာထုတ်ယူခြင်း (script12-2.py)",
    concept: "**Chapter 12 လေ့ကျင့်ခန်း (script12-2.py)**\n\nတာဝန်: Regular expressions ကိုသုံးကာ ဖိုင်တစ်ခုမှကျောင်းသားဒေတာကိုထုတ်ယူပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:241:en"
  };

  window.CONTENT_I18N["python:242"] = window.CONTENT_I18N["python:242"] || {};
  window.CONTENT_I18N["python:242"].my = {
    title: "လေ့ကျင့်ခန်း: Regex အုပ်စုများဖြင့် ရှုပ်ထွေးသောရမှတ်ဒေတာကိုခွဲခြမ်းခြင်း (script12-3.py)",
    concept: "**Chapter 12 လေ့ကျင့်ခန်း (script12-3.py)**\n\nတာဝန်: Regex capture groups ကိုသုံးကာ ရှုပ်ထွေးသောရမှတ်ဒေတာကိုခွဲခြမ်းပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:242:en"
  };

  window.CONTENT_I18N["python:243"] = window.CONTENT_I18N["python:243"] || {};
  window.CONTENT_I18N["python:243"].my = {
    title: "Runtime Exception: သုညဖြင့်စားခြင်း (ZeroDivisionError) (reigai01.py)",
    concept: "ပရိုဂရမ်လုပ်ဆောင်နေစဉ်အတွင်းဖြစ်ပေါ်သော error များကို **exception** ဟုခေါ်သည်။ Exception တစ်ခုဖြစ်ပေါ်သည့်အခါ ပရိုဂရမ်သည်ပုံမှန်အားဖြင့်အတင်းအဓမ္မရပ်ဆိုင်းသွားသည်။ Error များကိုလုံခြုံစွာကိုင်တွယ်ရန် ပုံမှန် code ကို `try` block တွင်ထားပြီး error-handling code ကို `except` block တွင်ထားပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:243:en"
  };

  window.CONTENT_I18N["python:244"] = window.CONTENT_I18N["python:244"] || {};
  window.CONTENT_I18N["python:244"].my = {
    title: "Runtime Exception: Index အကွာအဝေးပြင်ပ (IndexError) (reigai02.py)",
    concept: "ပရိုဂရမ်လုပ်ဆောင်နေစဉ်အတွင်းဖြစ်ပေါ်သော error များကို **exception** ဟုခေါ်သည်။ Exception တစ်ခုဖြစ်ပေါ်သည့်အခါ ပရိုဂရမ်သည်ပုံမှန်အားဖြင့်အတင်းအဓမ္မရပ်ဆိုင်းသွားသည်။ Error များကိုလုံခြုံစွာကိုင်တွယ်ရန် ပုံမှန် code ကို `try` block တွင်ထားပြီး error-handling code ကို `except` block တွင်ထားပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:244:en"
  };

  window.CONTENT_I18N["python:245"] = window.CONTENT_I18N["python:245"] || {};
  window.CONTENT_I18N["python:245"].my = {
    title: "try-except ဖြင့် Exception များကိုဖမ်းယူခြင်း (reigai03.py)",
    concept: "ပရိုဂရမ်လုပ်ဆောင်နေစဉ်အတွင်းဖြစ်ပေါ်သော error များကို **exception** ဟုခေါ်သည်။ Exception တစ်ခုဖြစ်ပေါ်သည့်အခါ ပရိုဂရမ်သည်ပုံမှန်အားဖြင့်အတင်းအဓမ္မရပ်ဆိုင်းသွားသည်။ Error များကိုလုံခြုံစွာကိုင်တွယ်ရန် ပုံမှန် code ကို `try` block တွင်ထားပြီး error-handling code ကို `except` block တွင်ထားပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:245:en"
  };

  window.CONTENT_I18N["python:246"] = window.CONTENT_I18N["python:246"] || {};
  window.CONTENT_I18N["python:246"].my = {
    title: "except Block တွင် Exception အသေးစိတ်အချက်အလက်ရယူခြင်း (reigai04.py)",
    concept: "ပရိုဂရမ်လုပ်ဆောင်နေစဉ်အတွင်းဖြစ်ပေါ်သော error များကို **exception** ဟုခေါ်သည်။ Exception တစ်ခုဖြစ်ပေါ်သည့်အခါ ပရိုဂရမ်သည်ပုံမှန်အားဖြင့်အတင်းအဓမ္မရပ်ဆိုင်းသွားသည်။ Error များကိုလုံခြုံစွာကိုင်တွယ်ရန် ပုံမှန် code ကို `try` block တွင်ထားပြီး error-handling code ကို `except` block တွင်ထားပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:246:en"
  };

  window.CONTENT_I18N["python:247"] = window.CONTENT_I18N["python:247"] || {};
  window.CONTENT_I18N["python:247"].my = {
    title: "else Block ကိုအသုံးပြုခြင်း (Exception မရှိသည့်အခါ) (reigai07.py)",
    concept: "Error များတွင် `ZeroDivisionError` (သုညဖြင့်စားခြင်း), `ValueError` (မမှန်ကန်သောကိန်းဂဏန်းပြောင်းလဲခြင်း), နှင့် `IndexError` (list index အကွာအဝေးပြင်ပ) ကဲ့သို့သော သီးခြား type များရှိသည်။ `except ValueError:` ကဲ့သို့ type ကိုသတ်မှတ်ခြင်းဖြင့် error type တစ်ခုစီအတွက် မတူညီသောကိုင်တွယ်မှုကိုရေးနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:247:en"
  };

  window.CONTENT_I18N["python:248"] = window.CONTENT_I18N["python:248"] || {};
  window.CONTENT_I18N["python:248"].my = {
    title: "Exception အမျိုးအစားများစွာကိုကိုင်တွယ်ခြင်း (reigai05.py)",
    concept: "Error များတွင် `ZeroDivisionError` (သုညဖြင့်စားခြင်း), `ValueError` (မမှန်ကန်သောကိန်းဂဏန်းပြောင်းလဲခြင်း), နှင့် `IndexError` (list index အကွာအဝေးပြင်ပ) ကဲ့သို့သော သီးခြား type များရှိသည်။ `except ValueError:` ကဲ့သို့ type ကိုသတ်မှတ်ခြင်းဖြင့် error type တစ်ခုစီအတွက် မတူညီသောကိုင်တွယ်မှုကိုရေးနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:248:en"
  };

  window.CONTENT_I18N["python:249"] = window.CONTENT_I18N["python:249"] || {};
  window.CONTENT_I18N["python:249"].my = {
    title: "မိဘ Exception Class ဖြင့် Exception အားလုံးကိုဖမ်းယူခြင်း (reigai06.py)",
    concept: "Error များတွင် `ZeroDivisionError` (သုညဖြင့်စားခြင်း), `ValueError` (မမှန်ကန်သောကိန်းဂဏန်းပြောင်းလဲခြင်း), နှင့် `IndexError` (list index အကွာအဝေးပြင်ပ) ကဲ့သို့သော သီးခြား type များရှိသည်။ `except ValueError:` ကဲ့သို့ type ကိုသတ်မှတ်ခြင်းဖြင့် error type တစ်ခုစီအတွက် မတူညီသောကိုင်တွယ်မှုကိုရေးနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:249:en"
  };

  window.CONTENT_I18N["python:250"] = window.CONTENT_I18N["python:250"] || {};
  window.CONTENT_I18N["python:250"].my = {
    title: "ခေါ်ဆိုသူထံသို့ Exception ပျံ့နှံ့ခြင်း (reigai08.py)",
    concept: "Error များတွင် `ZeroDivisionError` (သုညဖြင့်စားခြင်း), `ValueError` (မမှန်ကန်သောကိန်းဂဏန်းပြောင်းလဲခြင်း), နှင့် `IndexError` (list index အကွာအဝေးပြင်ပ) ကဲ့သို့သော သီးခြား type များရှိသည်။ `except ValueError:` ကဲ့သို့ type ကိုသတ်မှတ်ခြင်းဖြင့် error type တစ်ခုစီအတွက် မတူညီသောကိုင်တွယ်မှုကိုရေးနိုင်သည်။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:250:en"
  };

  window.CONTENT_I18N["python:251"] = window.CONTENT_I18N["python:251"] || {};
  window.CONTENT_I18N["python:251"].my = {
    title: "finally Block ဖြင့် မဖြစ်မနေသန့်ရှင်းရေးလုပ်ခြင်း (reigai09.py)",
    concept: "Exception ဖြစ်သည်ဖြစ်စေ မဖြစ်သည်ဖြစ်စေ **အမြဲတမ်း execute လုပ်ရမည့်** code အတွက် `finally:` block ကိုသုံးပါ။ ၎င်းသည် ဖိုင်ပိတ်ခြင်းလုပ်ဆောင်ချက်များအတွက်အသုံးဝင်သည်။ ထို့အပြင် exception တစ်ခုကိုရည်ရွယ်ချက်ရှိရှိပစ်ရန် `raise` keyword ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:251:en"
  };

  window.CONTENT_I18N["python:252"] = window.CONTENT_I18N["python:252"] || {};
  window.CONTENT_I18N["python:252"].my = {
    title: "လေ့ကျင့်ခန်း: Argument စစ်ဆေးခြင်းနှင့် Exception ပစ်သော Function (script13-1.py)",
    concept: "**Chapter 13 လေ့ကျင့်ခန်း (script13-1.py)**\n\nတာဝန်: Arguments များကိုစစ်ဆေးပြီး exceptions များကိုပစ်သော function တစ်ခုကိုဖန်တီးပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:252:en"
  };

  window.CONTENT_I18N["python:253"] = window.CONTENT_I18N["python:253"] || {};
  window.CONTENT_I18N["python:253"].my = {
    title: "လေ့ကျင့်ခန်း: သီးခြား Exception များကိုဖမ်းယူခြင်းနှင့် ပြန်လည်ကိုင်တွယ်ခြင်း (script13-2.py)",
    concept: "**Chapter 13 လေ့ကျင့်ခန်း (script13-2.py)**\n\nတာဝန်: သီးခြား exceptions များကိုဖမ်းယူပြီး ပြန်လည်ကိုင်တွယ်ခြင်းကိုအကောင်အထည်ဖော်ပါ။\n\nEditor ရှိ template ကုဒ်ကိုစစ်ဆေးပြီး ပျောက်နေသောအပိုင်းများကိုဖြည့်ကာ ပရိုဂရမ်ကိုအပြီးသတ်ပါ။ ညာဘက်ရှိ Run ခလုတ်ကိုနှိပ်ပြီး output ကိုစစ်ဆေးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:253:en"
  };

  window.CONTENT_I18N["python:254"] = window.CONTENT_I18N["python:254"] || {};
  window.CONTENT_I18N["python:254"].my = {
    title: "raise ဖြင့် ရည်ရွယ်ချက်ရှိရှိ Exception ပစ်ခြင်း (reigai10.py)",
    concept: "Exception ဖြစ်သည်ဖြစ်စေ မဖြစ်သည်ဖြစ်စေ **အမြဲတမ်း execute လုပ်ရမည့်** code အတွက် `finally:` block ကိုသုံးပါ။ ၎င်းသည် ဖိုင်ပိတ်ခြင်းလုပ်ဆောင်ချက်များအတွက်အသုံးဝင်သည်။ ထို့အပြင် exception တစ်ခုကိုရည်ရွယ်ချက်ရှိရှိပစ်ရန် `raise` keyword ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:254:en"
  };

  window.CONTENT_I18N["python:255"] = window.CONTENT_I18N["python:255"] || {};
  window.CONTENT_I18N["python:255"].my = {
    title: "စိတ်ကြိုက် Exception Classes များကိုသတ်မှတ်ခြင်းနှင့် ပစ်ခြင်း (reigai11.py)",
    concept: "Exception ဖြစ်သည်ဖြစ်စေ မဖြစ်သည်ဖြစ်စေ **အမြဲတမ်း execute လုပ်ရမည့်** code အတွက် `finally:` block ကိုသုံးပါ။ ၎င်းသည် ဖိုင်ပိတ်ခြင်းလုပ်ဆောင်ချက်များအတွက်အသုံးဝင်သည်။ ထို့အပြင် exception တစ်ခုကိုရည်ရွယ်ချက်ရှိရှိပစ်ရန် `raise` keyword ကိုသုံးပါ။",
    needsReview: true,
    source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:255:en"
  };

})();
