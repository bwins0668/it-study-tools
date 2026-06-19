/* Study Tools Content I18n — Python Thai Content Language Pack v1 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  // Lesson 1
  window.CONTENT_I18N["python:1"] = window.CONTENT_I18N["python:1"] || {};
  window.CONTENT_I18N["python:1"].th = {
    title: "คอมพิวเตอร์ทำงานอย่างไร",
    concept: "คอมพิวเตอร์ทำงานผ่านการประสานงานของส่วนประกอบฮาร์ดแวร์หลัก:\n\n- **CPU (หน่วยประมวลผลกลาง)** — \"สมอง\" ของคอมพิวเตอร์ที่ทำการคำนวณด้วยความเร็วสูง\n- **หน่วยความจำ (RAM)** — เก็บข้อมูลโปรแกรมชั่วคราวขณะทำงาน (ถูกลบเมื่อปิดเครื่อง)\n- **ฮาร์ดดิสก์ (SSD/HDD)** — เก็บไฟล์อย่างถาวร แม้หลังจากปิดคอมพิวเตอร์แล้ว",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:1:en"
  };

  // Lesson 2
  window.CONTENT_I18N["python:2"] = window.CONTENT_I18N["python:2"] || {};
  window.CONTENT_I18N["python:2"].th = {
    title: "ภาษามนุษย์กับภาษาเครื่อง",
    concept: "มนุษย์สื่อสารด้วยภาษาเช่นอังกฤษหรือญี่ปุ่น แต่คอมพิวเตอร์เข้าใจเฉพาะ**เลขฐานสอง** (0 และ 1) ที่เรียกว่า**ภาษาเครื่อง** โค้ดที่มนุษย์เขียนต้องถูกแปลเป็นภาษาเครื่องโดย**อินเทอร์พรีเตอร์**หรือ**คอมไพเลอร์** Python ใช้อินเทอร์พรีเตอร์ในการแปลโค้ดทีละบรรทัด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:2:en"
  };

  // Lesson 3
  window.CONTENT_I18N["python:3"] = window.CONTENT_I18N["python:3"] || {};
  window.CONTENT_I18N["python:3"].th = {
    title: "ภาษาการเขียนโปรแกรมต่างๆ",
    concept: "มีภาษาการเขียนโปรแกรมมากมายในโลก แต่ละภาษาเหมาะกับวัตถุประสงค์ที่แตกต่างกัน:\n\n- **Python** — ไวยากรณ์ง่าย เหมาะสำหรับ AI การวิเคราะห์ข้อมูล และระบบอัตโนมัติ\n- **Java** — เสถียรและใช้กันอย่างแพร่หลายในระบบองค์กรและแอป Android\n- **C++** — ประสิทธิภาพสูง ใช้ในเกมเอ็นจินและการเขียนโปรแกรมระบบ\n\nไม่มีภาษาใดที่ดีที่สุด; เลือกเครื่องมือที่เหมาะสมกับงาน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:3:en"
  };

  // Lesson 4
  window.CONTENT_I18N["python:4"] = window.CONTENT_I18N["python:4"] || {};
  window.CONTENT_I18N["python:4"].th = {
    title: "การเริ่มต้นพร้อมรับคำสั่ง",
    concept: "**CUI (ส่วนติดต่อผู้ใช้แบบอักขระ)** ช่วยให้คุณสั่งงานคอมพิวเตอร์โดยพิมพ์คำสั่งแทนการใช้เมาส์ บน Windows คุณสามารถใช้**พร้อมรับคำสั่ง**หรือ**PowerShell** นี่เป็นสิ่งจำเป็นสำหรับการรันโปรแกรม Python จากบรรทัดคำสั่ง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:4:en"
  };

  // Lesson 5
  window.CONTENT_I18N["python:5"] = window.CONTENT_I18N["python:5"] || {};
  window.CONTENT_I18N["python:5"].th = {
    title: "เส้นทางไฟล์ (แบบสัมบูรณ์และสัมพัทธ์)",
    concept: "**พาธ** คือ \"ที่อยู่\" ที่แสดงตำแหน่งของไฟล์หรือโฟลเดอร์:\n\n- **พาธสัมบูรณ์** — พาธเต็มที่เริ่มต้นจากราก (เช่น `C:/Users/Coco/main.py`) ใช้งานได้ไม่ว่าคุณจะอยู่ที่ไหน\n- **พาธสัมพัทธ์** — พาธที่สัมพันธ์กับไดเรกทอรีทำงานปัจจุบันของคุณ (เช่น `./main.py` หรือ `../data.txt`)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:5:en"
  };

  // Lesson 6
  window.CONTENT_I18N["python:6"] = window.CONTENT_I18N["python:6"] || {};
  window.CONTENT_I18N["python:6"].th = {
    title: "การใช้คำสั่งบรรทัดคำสั่ง",
    concept: "คำสั่งทั่วไปสำหรับบรรทัดคำสั่ง:\n\n- `dir` — แสดงรายการไฟล์และโฟลเดอร์ (Windows)\n- `ls` — แสดงรายการไฟล์และโฟลเดอร์ (Mac/Linux)\n- `cd folderName` — เปลี่ยนไดเรกทอรีไปยังโฟลเดอร์ย่อย\n- `cd ..` — กลับไปยังโฟลเดอร์แม่\n- `python --version` — ตรวจสอบเวอร์ชัน Python ที่ติดตั้ง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:6:en"
  };

  // Lesson 7
  window.CONTENT_I18N["python:7"] = window.CONTENT_I18N["python:7"] || {};
  window.CONTENT_I18N["python:7"].th = {
    title: "การเตรียมตัวก่อนติดตั้ง",
    concept: "ก่อนติดตั้ง Python ให้ตรวจสอบข้อมูลระบบคอมพิวเตอร์ของคุณ:\n\n- เป็น**Windows** หรือ**macOS**?\n- ถ้า Windows เป็นระบบ**64-bit** หรือ**32-bit**? (คอมพิวเตอร์สมัยใหม่ส่วนใหญ่เป็น 64-bit)\n- ตรวจสอบให้แน่ใจว่าคุณมีสิทธิ์ของผู้ดูแลระบบ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:7:en"
  };

  // Lesson 8
  window.CONTENT_I18N["python:8"] = window.CONTENT_I18N["python:8"] || {};
  window.CONTENT_I18N["python:8"].th = {
    title: "แอปพลิเคชันที่จำเป็น",
    concept: "ในการเริ่มเรียน Python คุณต้องมีเครื่องมือหลักสามอย่าง:\n\n1. **Python อินเทอร์พรีเตอร์** — เอนจินที่รันโค้ดของคุณ\n2. **โปรแกรมแก้ไขข้อความ (VS Code, Atom ฯลฯ)** — สำหรับเขียนไฟล์ `.py` พร้อมการเน้นสีไวยากรณ์\n3. **เทอร์มินอล/คอนโซล** — สำหรับรันสคริปต์และดูผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:8:en"
  };

  // Lesson 9
  window.CONTENT_I18N["python:9"] = window.CONTENT_I18N["python:9"] || {};
  window.CONTENT_I18N["python:9"].th = {
    title: "การติดตั้ง Python",
    concept: "เมื่อติดตั้ง Python บน Windows มีขั้นตอนสำคัญอย่างหนึ่ง:\n\n⚠️ **เลือก \"Add python.exe to PATH\"** ในตัวติดตั้ง!\n\nการดำเนินการนี้จะลงทะเบียนตำแหน่งของ Python ในตัวแปรสภาพแวดล้อม PATH ของระบบ ทำให้คุณสามารถรัน `python` จากโฟลเดอร์ใดก็ได้ในบรรทัดคำสั่ง หากไม่เลือก การพิมพ์ `python` จะเกิดข้อผิดพลาด \"command not found\"",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:9:en"
  };

  // Lesson 10
  window.CONTENT_I18N["python:10"] = window.CONTENT_I18N["python:10"] || {};
  window.CONTENT_I18N["python:10"].th = {
    title: "การติดตั้งโปรแกรมแก้ไขโค้ด",
    concept: "หลังจากติดตั้งโปรแกรมแก้ไขโค้ด (เช่น VS Code หรือ Atom) ให้ทำตามขั้นตอนเหล่านี้:\n\n1. สร้างไฟล์ใหม่\n2. บันทึกด้วยนามสกุล `.py` (เช่น `hello.py`)\n3. โปรแกรมแก้ไขจะรู้จักว่าเป็นโค้ด Python และเปิดใช้งานการเน้นสีไวยากรณ์\n\nนามสกุล `.py` ทำหน้าที่เป็นบัตรประจำตัว — บอกให้โปรแกรมแก้ไขเริ่มวิเคราะห์ Python เน้นคำสำคัญ และแม้แต่แจ้งข้อผิดพลาดที่อาจเกิดขึ้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:10:en"
  };

  // Lesson 11
  window.CONTENT_I18N["python:11"] = window.CONTENT_I18N["python:11"] || {};
  window.CONTENT_I18N["python:11"].th = {
    title: "แบบฝึกหัดทบทวนบทที่ 1",
    concept: "นี่คือแบบทดสอบทบทวนสิ่งที่คุณเรียนในบทที่ 1: วิธีที่คอมพิวเตอร์ทำงาน การดำเนินการบรรทัดคำสั่ง และการตั้งค่าสภาพแวดล้อม Python\n\nคำถามทดสอบความเข้าใจของคุณเกี่ยวกับ:\n- วิธีที่ CPU หน่วยความจำ และฮาร์ดดิสก์ทำงานร่วมกัน\n- วิธีการนำทางไดเรกทอรีและแสดงรายการไฟล์ในบรรทัดคำสั่ง\n- ขั้นตอนสำคัญในการเลือก \"Add python.exe to PATH\" เมื่อติดตั้ง Python",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:11:en"
  };

  // Lesson 12
  window.CONTENT_I18N["python:12"] = window.CONTENT_I18N["python:12"] || {};
  window.CONTENT_I18N["python:12"].th = {
    title: "โหมดโต้ตอบและโปรแกรมแรก (hello.py)",
    concept: "ในการแสดงข้อความบนหน้าจอใน Python ให้ใช้ฟังก์ชัน `print()`\n\nใส่ข้อความที่คุณต้องการแสดงในเครื่องหมายคำพูดเดี่ยว (`'`) หรือเครื่องหมายคำพูดคู่ (`\"`) และเขียนเช่น `print('Hello')`\n\n**ข้อผิดพลาดทั่วไปสำหรับมือใหม่:** Python คำนึงถึงตัวพิมพ์เล็กใหญ่ `print` ต้องเขียนด้วยตัวพิมพ์เล็ก — `Print` จะทำให้เกิด `NameError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:12:en"
  };

  // Lesson 13
  window.CONTENT_I18N["python:13"] = window.CONTENT_I18N["python:13"] || {};
  window.CONTENT_I18N["python:13"].th = {
    title: "การรันไฟล์สคริปต์ (hello2.py)",
    concept: "ใช้ฟังก์ชัน `print()` เพื่อแสดงข้อความบนหน้าจอ ใส่ข้อความในเครื่องหมายคำพูดเดี่ยว (`'`) หรือเครื่องหมายคำพูดคู่ (`\"`) เช่น `print('Hello')`\n\nไฟล์สคริปต์สามารถมีคำสั่ง `print()` ได้หลายคำสั่ง และแต่ละคำสั่งจะแสดงผลหนึ่งบรรทัดตามลำดับ คุณสามารถพิมพ์สตริง ตัวเลข และแม้แต่ผลลัพธ์การคำนวณเช่น `print(3+4)`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:13:en"
  };

  // Lesson 14
  window.CONTENT_I18N["python:14"] = window.CONTENT_I18N["python:14"] || {};
  window.CONTENT_I18N["python:14"].th = {
    title: "พื้นฐานความคิดเห็น (comment.py)",
    concept: "**ความคิดเห็น** คือข้อความในโค้ดของคุณที่ไม่มีผลต่อการทำงานของโปรแกรม เขียนความคิดเห็นบรรทัดเดียวโดยใส่ `#` ที่ต้นบรรทัด คุณยังสามารถใช้เครื่องหมายคำพูดสามตัว (`'''`) สำหรับความคิดเห็นหลายบรรทัด\n\nความคิดเห็นจะถูกมองข้ามโดยอินเทอร์พรีเตอร์ Python และมีไว้สำหรับผู้อ่านที่เป็นมนุษย์เท่านั้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:14:en"
  };

  // Lesson 15
  window.CONTENT_I18N["python:15"] = window.CONTENT_I18N["python:15"] || {};
  window.CONTENT_I18N["python:15"].th = {
    title: "ความคิดเห็นหลายบรรทัด (comment2.py)",
    concept: "นอกจากความคิดเห็นบรรทัดเดียวด้วย `#` คุณสามารถเขียน**ความคิดเห็นหลายบรรทัด**โดยใส่ข้อความในเครื่องหมายคำพูดสามตัว (`'''`)\n\nทุกอย่างระหว่างเครื่องหมายคำพูดสามตัวเปิด `'''` และปิด `'''` จะถูกถือเป็นความคิดเห็นและจะไม่ถูกดำเนินการโดย Python\n\nมีประโยชน์สำหรับคำอธิบายยาวๆ หรือการปิดการทำงานบล็อกโค้ดชั่วคราว",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:15:en"
  };

  // Lesson 16
  window.CONTENT_I18N["python:16"] = window.CONTENT_I18N["python:16"] || {};
  window.CONTENT_I18N["python:16"].th = {
    title: "ข้อผิดพลาดการเยื้องของเครื่องหมายคำพูดสามตัว (comment_A1.py)",
    concept: "Python ตรวจสอบ**การเยื้อง** (ช่องว่างที่ต้นบรรทัด) อย่างเคร่งครัดเป็นส่วนหนึ่งของกฎไวยากรณ์ แม้แต่บรรทัดความคิดเห็นก็อาจทำให้เกิด `IndentationError` หากมีช่องว่างนำหน้าที่ไม่เหมาะสม\n\nหากบล็อกความคิดเห็นแบบเครื่องหมายคำพูดสามตัวเริ่มต้นด้วยการเยื้องที่ไม่คาดคิด Python อาจโยน `IndentationError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:16:en"
  };

  // Lesson 17
  window.CONTENT_I18N["python:17"] = window.CONTENT_I18N["python:17"] || {};
  window.CONTENT_I18N["python:17"].th = {
    title: "ข้อผิดพลาดการเยื้องของความคิดเห็น (comment_A2.py)",
    concept: "Python ตรวจสอบ**การเยื้อง** (ช่องว่างที่ต้นบรรทัด) อย่างเคร่งครัด แม้แต่บรรทัดความคิดเห็น `#` ที่มีช่องว่างนำหน้าที่ไม่เหมาะสมจะทำให้เกิด `IndentationError`\n\nตรวจสอบให้แน่ใจว่าการเยื้องของคุณสอดคล้องกัน แม้ในบรรทัดที่ Python จะมองข้าม (เช่น ความคิดเห็น)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:17:en"
  };

  // Lesson 18
  window.CONTENT_I18N["python:18"] = window.CONTENT_I18N["python:18"] || {};
  window.CONTENT_I18N["python:18"].th = {
    title: "แบบฝึกหัด: การคำนวณและแสดงผลโดยไม่ใช้ตัวแปร (script01.py)",
    concept: "**แบบฝึกหัดปฏิบัติ — บทที่ 2 (script01.py)**\n\nภารกิจ: ทำการคำนวณและแสดงผลลัพธ์โดยไม่ใช้ตัวแปร\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:18:en"
  };

  // Lesson 19
  window.CONTENT_I18N["python:19"] = window.CONTENT_I18N["python:19"] || {};
  window.CONTENT_I18N["python:19"].th = {
    title: "เรียนรู้เกี่ยวกับชนิดข้อมูล",
    concept: "**ชนิดข้อมูล** กำหนดว่าข้อมูลนั้นเป็นประเภทใด Python มีชนิดพื้นฐานหลายชนิด:\n\n- **int** — จำนวนเต็ม (ไม่มีจุดทศนิยม) เช่น `10` หรือ `-5`\n- **float** — จำนวนทศนิยม เช่น `3.14` หรือ `2.0`\n- **str** — สตริงข้อความที่อยู่ในเครื่องหมายคำพูด เช่น `'Hello'`\n- **bool** — ค่าบูลีน คือ `True` หรือ `False`\n\nใช้ `type()` เพื่อตรวจสอบชนิดข้อมูลของค่าใดๆ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:19:en"
  };

  // Lesson 20
  window.CONTENT_I18N["python:20"] = window.CONTENT_I18N["python:20"] || {};
  window.CONTENT_I18N["python:20"].th = {
    title: "ข้อมูลตัวเลข (int และ float)",
    concept: "ข้อมูลตัวเลขมีสองประเภทหลัก:\n\n- **int (จำนวนเต็ม)** — จำนวนเต็มไม่มีทศนิยม เช่น `10`, `-5`, `0`\n- **float (ทศนิยม)** — จำนวนที่มีจุดทศนิยม เช่น `3.14`, `2.0`, `-0.5`\n\nPython แปลงชนิดอัตโนมัติระหว่างการคำนวณ เช่น การหารจำนวนเต็มสองจำนวนด้วย `/` จะคืนค่า float เสมอ (เช่น `5 / 2` ได้ `2.5`)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:20:en"
  };

  // Lesson 21
  window.CONTENT_I18N["python:21"] = window.CONTENT_I18N["python:21"] || {};
  window.CONTENT_I18N["python:21"].th = {
    title: "ข้อมูลสตริง (str)",
    concept: "**สตริง (str)** คือข้อมูลที่แสดงถึงข้อความ สตริงต้องอยู่ในเครื่องหมายคำพูดเดี่ยว (`'`) หรือเครื่องหมายคำพูดคู่ (`\"`)\n\nตัวอย่าง: `'Hello'` หรือ `\"Python\"`\n\nหากลืมเครื่องหมายคำพูด Python จะพยายามตีความข้อความนั้นเป็นชื่อตัวแปรหรือคำสำคัญ ซึ่งจะทำให้เกิด `NameError` หรือ `SyntaxError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:21:en"
  };

  // Lesson 22
  window.CONTENT_I18N["python:22"] = window.CONTENT_I18N["python:22"] || {};
  window.CONTENT_I18N["python:22"].th = {
    title: "ข้อมูลบูลีน (bool)",
    concept: "ชนิด **bool (บูลีน)** มีเพียงสองค่าเท่านั้น: `True` (ถูกต้อง/ใช่) หรือ `False` (ไม่ถูกต้อง/ไม่ใช่) บูลีนมีบทบาทสำคัญในการแตกกิ่งแบบมีเงื่อนไข (คำสั่ง if)\n\n**สำคัญ:** `True` และ `False` ต้องพิมพ์ด้วยตัวพิมพ์ใหญ่ การเขียน `true` หรือ `false` (ตัวพิมพ์เล็ก) จะทำให้เกิด `NameError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:22:en"
  };

  // Lesson 23
  window.CONTENT_I18N["python:23"] = window.CONTENT_I18N["python:23"] || {};
  window.CONTENT_I18N["python:23"].th = {
    title: "เลขคณิตเชิงตัวเลข (enzanshi01.py)",
    concept: "Python รองรับตัวดำเนินการเลขคณิตหลายตัว: `+` (บวก), `-` (ลบ), `*` (คูณ), `/` (หาร), `//` (หารจำนวนเต็ม), `%` (มอดุโล/เศษ) และ `**` (ยกกำลัง)\n\nระวัง: การบวกตัวเลขและสตริงโดยตรงจะทำให้เกิด `TypeError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:23:en"
  };

  // Lesson 24
  window.CONTENT_I18N["python:24"] = window.CONTENT_I18N["python:24"] || {};
  window.CONTENT_I18N["python:24"].th = {
    title: "การต่อสตริง (enzanshi02.py)",
    concept: "คุณสามารถเชื่อม (ต่อ) สตริงเข้าด้วยกันโดยใช้ตัวดำเนินการ `+` เช่น `'Hello!' + 'Python'` ได้ผลลัพธ์เป็น `'Hello!Python'`\n\nการใช้เครื่องหมายคำพูดสามตัว (`'''`) ช่วยให้คุณสร้างสตริงหลายบรรทัดที่รวมการขึ้นบรรทัดใหม่",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:24:en"
  };

  // Lesson 25
  window.CONTENT_I18N["python:25"] = window.CONTENT_I18N["python:25"] || {};
  window.CONTENT_I18N["python:25"].th = {
    title: "ข้อผิดพลาดชนิด (สตริงและตัวเลข) (enzanshi03.py)",
    concept: "Python ใช้ `+`, `-`, `*`, `/`, `//`, `%` และ `**` สำหรับเลขคณิต หากคุณพยายามบวกตัวเลขและสตริงโดยตรง (เช่น `'Number: ' + 5`) Python จะโยน `TypeError` เพราะคุณไม่สามารถรวมชนิดข้อมูลต่างกันได้โดยไม่แปลงอย่างชัดเจน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:25:en"
  };

  // Lesson 26
  window.CONTENT_I18N["python:26"] = window.CONTENT_I18N["python:26"] || {};
  window.CONTENT_I18N["python:26"].th = {
    title: "การแปลงชนิดด้วย str() (enzanshi04.py)",
    concept: "ในการรวมตัวเลขกับสตริง ให้แปลงตัวเลขเป็นสตริงโดยใช้ `str()` เช่น `'Value: ' + str(5)` ทำงานได้ถูกต้อง\n\nลำดับความสำคัญของตัวดำเนินการ: การคูณ `*` และการหาร `/` จะถูกประเมินก่อนการบวก `+` และการลบ `-` ใช้วงเล็บ `()` เพื่อเปลี่ยนลำดับการประเมิน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:26:en"
  };

  // Lesson 27
  window.CONTENT_I18N["python:27"] = window.CONTENT_I18N["python:27"] || {};
  window.CONTENT_I18N["python:27"].th = {
    title: "การแปลงชนิดด้วย int() (enzanshi05.py)",
    concept: "ใช้ `int()` เพื่อแปลงสตริงเป็นจำนวนเต็ม เช่น `5 + int('3')` ได้ผลลัพธ์ `8`\n\nการคูณ `*` และการหาร `/` มีลำดับความสำคัญสูงกว่าการบวก `+` และการลบ `-` ใช้วงเล็บ `()` เพื่อควบคุมลำดับการดำเนินการ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:27:en"
  };

  // Lesson 28
  window.CONTENT_I18N["python:28"] = window.CONTENT_I18N["python:28"] || {};
  window.CONTENT_I18N["python:28"].th = {
    title: "การแปลงชนิดด้วย float() (enzanshi06.py)",
    concept: "ใช้ `float()` เพื่อแปลงสตริงเป็นจำนวนทศนิยม เช่น `5 + float('3.000')` ได้ผลลัพธ์ `8.0`\n\nคุณสามารถต่อสายการแปลง: `int(float('3.000'))` จะแปลงสตริงเป็น float ก่อน แล้วจึงเป็นจำนวนเต็ม ได้ผลลัพธ์เป็น `3`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:28:en"
  };

  // Lesson 29
  window.CONTENT_I18N["python:29"] = window.CONTENT_I18N["python:29"] || {};
  window.CONTENT_I18N["python:29"].th = {
    title: "การกำหนดและใช้ตัวแปร (hensu01.py)",
    concept: "**ตัวแปร** คือภาชนะที่มีชื่อที่เก็บค่า ใช้ `=` เพื่อกำหนดค่า เช่น `x = 10` ตัวแปรสามารถถูกกำหนดค่าใหม่ได้\n\n**กฎสำหรับชื่อตัวแปร:** ต้องขึ้นต้นด้วยตัวอักษรหรือขีดล่าง ขึ้นต้นด้วยตัวเลขไม่ได้ เช่น `1num` ไม่ถูกต้อง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:29:en"
  };

  // Lesson 30
  window.CONTENT_I18N["python:30"] = window.CONTENT_I18N["python:30"] || {};
  window.CONTENT_I18N["python:30"].th = {
    title: "การกำหนดค่าให้ตัวแปร (hensu02.py)",
    concept: "**ตัวแปร** เก็บค่าและสามารถถูกกำหนดค่าใหม่ได้ ใช้ `variable_name = value` เพื่อเก็บข้อมูล ค่าทางด้านขวาของ `=` จะถูกเก็บลงในตัวแปรทางด้านซ้าย\n\nตัวแปรสามารถเก็บข้อมูลชนิดต่างๆ และสามารถถูกกำหนดค่าชนิดที่แตกต่างกันโดยสิ้นเชิงใหม่ได้ (เช่น จากตัวเลขเป็นสตริง)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:30:en"
  };

  // Lesson 31
  window.CONTENT_I18N["python:31"] = window.CONTENT_I18N["python:31"] || {};
  window.CONTENT_I18N["python:31"].th = {
    title: "การคำนวณโดยใช้ตัวแปร (hensu03.py)",
    concept: "**ตัวแปร** คือภาชนะที่มีชื่อที่เก็บค่า กำหนดค่าด้วย `x = 10` ค่าสามารถเปลี่ยนแปลงได้ผ่านการกำหนดค่าใหม่\n\nตัวแปรสามารถใช้ในนิพจน์เลขคณิต เช่น ถ้า `num1 = 5` และ `num2 = 3` คุณสามารถเขียน `result = num1 + num2` เพื่อคำนวณและเก็บผลรวม ใช้ `type()` เพื่อตรวจสอบชนิดข้อมูลของตัวแปร",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:31:en"
  };

  // Lesson 32
  window.CONTENT_I18N["python:32"] = window.CONTENT_I18N["python:32"] || {};
  window.CONTENT_I18N["python:32"].th = {
    title: "การแสดงผลตัวแปรและข้อความร่วมกัน (hensu04.py)",
    concept: "Python รองรับ**ตัวดำเนินการกำหนดค่าแบบผสม**ที่รวมการดำเนินการเข้ากับการกำหนดค่า เช่น `a = a + 1` สามารถเขียนแบบสั้นเป็น `a += 1`\n\nคุณยังสามารถกำหนดค่าเดียวกันให้หลายตัวแปรพร้อมกัน: `a = b = c = 0`\n\nใช้เครื่องหมายจุลภาคใน `print()` เพื่อแสดงผลหลายรายการ: `print(msg, num1)`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:32:en"
  };

  // Lesson 33
  window.CONTENT_I18N["python:33"] = window.CONTENT_I18N["python:33"] || {};
  window.CONTENT_I18N["python:33"].th = {
    title: "การเขียนทับค่าตัวแปร (hensu06.py)",
    concept: "ใช้ตัวดำเนินการกำหนดค่าแบบผสมเช่น `+=` เพื่ออัปเดตค่าตัวแปรอย่างกระชับ เช่น `num1 += 3` บวก 3 ให้กับ `num1`\n\nคุณยังสามารถกำหนดค่าเริ่มต้นเดียวกันให้หลายตัวแปร: `a = b = c = 0`\n\nเมื่อตัวแปรหนึ่งถูกกำหนดจากอีกตัวแปรหนึ่ง (`num2 = num1`), `num2` จะได้รับสำเนาของค่า การเปลี่ยน `num1` ภายหลังจะไม่มีผลต่อ `num2`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:33:en"
  };

  // Lesson 34
  window.CONTENT_I18N["python:34"] = window.CONTENT_I18N["python:34"] || {};
  window.CONTENT_I18N["python:34"].th = {
    title: "การกำหนดตัวแปรหนึ่งให้อีกตัวแปรหนึ่ง (hensu05.py)",
    concept: "ในการต่อตัวเลขกับสตริง ให้แปลงตัวเลขเป็นสตริงโดยใช้ `str()` (การแปลงชนิด) หรือใช้ **f-string**: `f'Value is {val}'` ช่วยให้คุณแทรกตัวแปรลงในสตริงโดยตรงโดยใช้เครื่องหมายปีกกา `{}`\n\nเมื่อคุณกำหนดตัวแปรหนึ่งให้อีกตัวแปรหนึ่ง (`num2 = num1`), `num2` จะคัดลอกค่าปัจจุบันของ `num1`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:34:en"
  };

  // Lesson 35
  window.CONTENT_I18N["python:35"] = window.CONTENT_I18N["python:35"] || {};
  window.CONTENT_I18N["python:35"].th = {
    title: "การอัปเดตค่าของตัวแปรเอง (hensu07.py)",
    concept: "ในการต่อตัวเลขกับสตริง ให้ใช้ `str()` เพื่อแปลงตัวเลขเป็นสตริง อีกวิธีคือใช้ f-strings: `f'The value is {val}'` เพื่อแทรกตัวแปรโดยตรง\n\nตัวแปรสามารถอัปเดตโดยใช้ค่าปัจจุบันของตัวเอง: `num1 = num1 + 3` อ่านค่าเก่า บวก 3 และเก็บผลลัพธ์กลับเข้าไปใน `num1`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:35:en"
  };

  // Lesson 36
  window.CONTENT_I18N["python:36"] = window.CONTENT_I18N["python:36"] || {};
  window.CONTENT_I18N["python:36"].th = {
    title: "ตัวดำเนินการกำหนดค่าแบบผสม (+=) (hensu08.py)",
    concept: "ตัวดำเนินการกำหนดค่าแบบผสมทำให้โค้ดสั้นลงเมื่ออัปเดตตัวแปร ตัวอย่าง:\n- `num1 += 3` คือรูปย่อของ `num1 = num1 + 3`\n- `num1 -= 3` คือรูปย่อของ `num1 = num1 - 3`\n- `num1 *= 3` คือรูปย่อของ `num1 = num1 * 3`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:36:en"
  };

  // Lesson 37
  window.CONTENT_I18N["python:37"] = window.CONTENT_I18N["python:37"] || {};
  window.CONTENT_I18N["python:37"].th = {
    title: "การกำหนดค่าแบบผสมสำหรับสตริง (hensu09.py)",
    concept: "ตัวดำเนินการกำหนดค่าแบบผสมยังทำงานกับสตริง:\n- `str1 += 'def'` ต่อท้าย 'def' เข้ากับสตริงปัจจุบัน (เทียบเท่า `str1 = str1 + 'def'`)\n- `str1 *= 3` ทำซ้ำสตริง 3 ครั้ง (เทียบเท่า `str1 = str1 * 3`)\n\nใช้ `str()` เพื่อแปลงตัวเลขเป็นสตริง และ f-strings (`f'text {var}'`) สำหรับการแทรกตัวแปรที่สะอาดขึ้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:37:en"
  };

  // Lesson 38
  window.CONTENT_I18N["python:38"] = window.CONTENT_I18N["python:38"] || {};
  window.CONTENT_I18N["python:38"].th = {
    title: "การรับข้อมูลจากคีย์บอร์ด (input01.py)",
    concept: "ใช้ `input()` เพื่อรับข้อมูลจากผู้ใช้ผ่านคีย์บอร์ด ค่าที่คืนมาจาก `input()` **เป็นสตริง (str) เสมอ** แม้ว่าผู้ใช้จะพิมพ์ตัวเลขก็ตาม\n\nเพื่อใช้ข้อมูลที่รับมาในการคำนวณเชิงตัวเลข คุณต้องแปลงโดยใช้ `int()` หรือ `float()` เช่น `int(input())`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:38:en"
  };

  // Lesson 39
  window.CONTENT_I18N["python:39"] = window.CONTENT_I18N["python:39"] || {};
  window.CONTENT_I18N["python:39"].th = {
    title: "การต่อค่าที่รับเข้ามา (input02.py)",
    concept: "ใช้ `input()` เพื่อรับข้อมูลจากคีย์บอร์ด ค่าที่คืนมา**เป็นสตริง (str) เสมอ**\n\nหากคุณถามผู้ใช้ให้ป้อนตัวเลขสองตัวและใช้ `+` โดยตรง มันจะ**ต่อสตริงเข้าด้วยกัน**แทนที่จะบวกเป็นตัวเลข เช่น ป้อน 5 และ 3 จะได้ `'5' + '3' = '53'` ไม่ใช่ `8`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:39:en"
  };

  // Lesson 40
  window.CONTENT_I18N["python:40"] = window.CONTENT_I18N["python:40"] || {};
  window.CONTENT_I18N["python:40"].th = {
    title: "การแปลงข้อมูลนำเข้าเป็นตัวเลขและคำนวณ (input03.py)",
    concept: "ใช้ `input()` เพื่อรับข้อมูลจากคีย์บอร์ด เนื่องจาก `input()` คืนค่าเป็นสตริงเสมอ คุณต้องแปลงด้วย `int()` หรือ `float()` ก่อนใช้ในการคำนวณเชิงตัวเลข\n\nตัวอย่าง:\n```\nstr1 = input('Enter number 1: ')\nnum1 = int(str1)\nstr2 = input('Enter number 2: ')\nnum2 = int(str2)\nprint(num1 + num2)\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:40:en"
  };

  // Lesson 41
  window.CONTENT_I18N["python:41"] = window.CONTENT_I18N["python:41"] || {};
  window.CONTENT_I18N["python:41"].th = {
    title: "การรับข้อมูลและแปลงพร้อมกัน (input04.py)",
    concept: "คุณสามารถรวม `input()` และ `int()` ในบรรทัดเดียวเพื่อความกระชับ:\n```\nnum1 = int(input('Enter number 1: '))\nnum2 = int(input('Enter number 2: '))\nprint(num1 + num2)\n```\n\nจำไว้ว่า: `input()` คืนค่าเป็นสตริงเสมอ คุณต้องแปลงด้วย `int()` หรือ `float()` ก่อนการดำเนินการเชิงตัวเลข",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:41:en"
  };

  // Lesson 42
  window.CONTENT_I18N["python:42"] = window.CONTENT_I18N["python:42"] || {};
  window.CONTENT_I18N["python:42"].th = {
    title: "แบบฝึกหัด: กำหนดและยืนยันชนิดข้อมูลของนิพจน์ (script3-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติ — บทที่ 3 (script3-1.py)**\n\nภารกิจ: กำหนดและยืนยันชนิดข้อมูลของนิพจน์ต่างๆ\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไป ใช้ `type()` ภายใน `print()` เพื่อเปิดเผยชนิดข้อมูลของแต่ละนิพจน์ เช่น `print(type(1 + 2))`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:42:en"
  };

  // Lesson 43
  window.CONTENT_I18N["python:43"] = window.CONTENT_I18N["python:43"] || {};
  window.CONTENT_I18N["python:43"].th = {
    title: "แบบฝึกหัด: การรับและต่อสตริง (script3-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติ — บทที่ 3 (script3-2.py)**\n\nภารกิจ: รับนามสกุลและชื่อต้น จากนั้นต่อและแสดงผล\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป ใช้ `input()` เพื่ออ่านนามสกุลและชื่อของผู้ใช้ จากนั้นรวมด้วย `+` และพิมพ์ผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:43:en"
  };

  // Lesson 44
  window.CONTENT_I18N["python:44"] = window.CONTENT_I18N["python:44"] || {};
  window.CONTENT_I18N["python:44"].th = {
    title: "แบบฝึกหัด: การรับข้อมูลตัวเลขและเลขคณิต (script3-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติ — บทที่ 3 (script3-3.py)**\n\nภารกิจ: รับจำนวนเต็มสองตัวและคำนวณผลคูณ\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป ใช้ `int()` เพื่อแปลงสตริงนำเข้าเป็นจำนวนเต็ม จากนั้นดำเนินการบวก ลบ และแสดงผลลัพธ์ที่จัดรูปแบบโดยใช้การต่อสตริง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:44:en"
  };

  // Lesson 45
  window.CONTENT_I18N["python:45"] = window.CONTENT_I18N["python:45"] || {};
  window.CONTENT_I18N["python:45"].th = {
    title: "การเปรียบเทียบค่าความเท่ากัน (hikaku01.py)",
    concept: "**ตัวดำเนินการเปรียบเทียบ** เปรียบเทียบค่าสองค่าและคืนผลลัพธ์บูลีน (`True` หรือ `False`):\n- `==` — เท่ากับ\n- `!=` — ไม่เท่ากับ\n- `>` — มากกว่า\n- `<` — น้อยกว่า\n- `>=` — มากกว่าหรือเท่ากับ\n- `<=` — น้อยกว่าหรือเท่ากับ\n\n**ข้อผิดพลาดที่พบบ่อย:** ใช้ `==` สำหรับการเปรียบเทียบ (เครื่องหมายเท่ากับสองตัว) `=` ตัวเดียวใช้สำหรับกำหนดค่าและจะทำให้เกิดข้อผิดพลาดภายในเงื่อนไข `if`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:45:en"
  };

  // Lesson 46
  window.CONTENT_I18N["python:46"] = window.CONTENT_I18N["python:46"] || {};
  window.CONTENT_I18N["python:46"].th = {
    title: "การเปรียบเทียบขนาดตัวเลข (hikaku02.py)",
    concept: "ตัวดำเนินการเปรียบเทียบเปรียบเทียบค่าสองค่าและคืน `True` หรือ `False` ตัวดำเนินการที่มี: `==`, `!=`, `>`, `<`, `>=`, `<=`\n\n**ข้อผิดพลาดที่พบบ่อย:**\n- ใส่เครื่องหมายทวิภาค `:` ที่ท้ายคำสั่ง `if` เสมอ\n- เยื้องบล็อกโค้ดข้างใต้ด้วย 4 ช่องว่างเสมอ\n- การไม่มีทวิภาคหรือการเยื้องผิดทำให้เกิด `IndentationError` หรือ `SyntaxError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:46:en"
  };

  // Lesson 47
  window.CONTENT_I18N["python:47"] = window.CONTENT_I18N["python:47"] || {};
  window.CONTENT_I18N["python:47"].th = {
    title: "การเปรียบเทียบสตริง (hikaku03.py)",
    concept: "ตัวดำเนินการเปรียบเทียบยังทำงานกับสตริงด้วย Python เปรียบเทียบสตริงตามพจนานุกรม (ลำดับตัวอักษรตามรหัสอักขระ Unicode)\n\nตัวอย่างเช่น `'a' < 'c'` ประเมินเป็น `True` เพราะ 'a' มาก่อน 'c' ตามตัวอักษร\n\nใส่เครื่องหมายทวิภาค `:` หลัง `if` เสมอ และเยื้องเนื้อหาด้วย 4 ช่องว่าง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:47:en"
  };

  // Lesson 48
  window.CONTENT_I18N["python:48"] = window.CONTENT_I18N["python:48"] || {};
  window.CONTENT_I18N["python:48"].th = {
    title: "การเปรียบเทียบสตริงภาษาไทย (hikaku04.py)",
    concept: "ตัวดำเนินการเปรียบเทียบยังทำงานกับอักขระที่ไม่ใช่ภาษาอังกฤษเช่นภาษาไทย Python เปรียบเทียบตามรหัสจุด Unicode\n\nตัวอย่างนี้ใช้โครงสร้าง `if-else`:\n- บล็อก `if` ทำงานเมื่อเงื่อนไขเป็น `True`\n- บล็อก `else` ทำงานเมื่อเงื่อนไขเป็น `False`\n\nอย่าลืมเครื่องหมายทวิภาค `:` และการเยื้องที่ถูกต้อง!",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:48:en"
  };

  // Lesson 49
  window.CONTENT_I18N["python:49"] = window.CONTENT_I18N["python:49"] || {};
  window.CONTENT_I18N["python:49"].th = {
    title: "การเปรียบเทียบค่ากับตัวแปร (hikaku05.py)",
    concept: "ตัวดำเนินการเปรียบเทียบสามารถเปรียบเทียบตัวแปรและค่าได้ ตัวอย่าง:\n```\na = 10\nb = 10\nif a >= b:\n    print('a มากกว่าหรือเท่ากับ b')\n```\n\n**ข้อผิดพลาดที่พบบ่อย:**\n- ใช้ `==` สำหรับการเปรียบเทียบความเท่ากัน ไม่ใช่ `=`\n- ใส่ `:` ที่ท้ายบรรทัด `if` เสมอ\n- เยื้องบล็อก if ด้วย 4 ช่องว่าง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:49:en"
  };

  // Lesson 50
  window.CONTENT_I18N["python:50"] = window.CONTENT_I18N["python:50"] || {};
  window.CONTENT_I18N["python:50"].th = {
    title: "การตัดสินใจแบบมีเงื่อนไขด้วยค่าบูลีน (hikaku06.py)",
    concept: "คุณสามารถใช้ตัวแปรบูลีนโดยตรงในเงื่อนไข `if` ตัวอย่าง:\n```\nb = True\nif b:\n    print('b มีค่าเป็น True')\n```\n\nไม่จำเป็นต้องเขียน `if b == True` — แค่ `if b:` ก็เพียงพอ\n\n**ข้อผิดพลาดที่พบบ่อย:** อย่าลืมเครื่องหมายทวิภาค `:` และการเยื้อง 4 ช่องว่าง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:50:en"
  };

  // Lesson 51
  window.CONTENT_I18N["python:51"] = window.CONTENT_I18N["python:51"] || {};
  window.CONTENT_I18N["python:51"].th = {
    title: "การแตกกิ่งแบบ if อย่างง่าย (if01.py)",
    concept: "ใช้คำสั่ง `if` เพื่อแตกกิ่งตามเงื่อนไข เมื่อเงื่อนไขเป็น `True` บล็อกที่เยื้อง (4 ช่องว่าง) จะถูกดำเนินการ\n\n```\nif condition:\n    # โค้ดที่จะรันเมื่อเป็น True\n```\n\nถ้าเงื่อนไขเป็น `False` บล็อกที่เยื้องจะถูกข้ามและการทำงานจะดำเนินต่อหลังจากบล็อก if\n\n**ข้อผิดพลาดที่พบบ่อย:** อย่าลืมเครื่องหมายทวิภาค `:` และการเยื้อง 4 ช่องว่าง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:51:en"
  };

  // Lesson 52
  window.CONTENT_I18N["python:52"] = window.CONTENT_I18N["python:52"] || {};
  window.CONTENT_I18N["python:52"].th = {
    title: "การแตกกิ่งสามทางด้วย if-elif (ifelif01.py)",
    concept: "ในการสร้างสามกิ่งหรือมากกว่า ให้ใช้ `elif` (ย่อมาจาก \"else if\") เงื่อนไขจะถูกประเมินจากบนลงล่าง และเฉพาะบล็อกแรกที่เงื่อนไขเป็น `True` เท่านั้นที่จะทำงาน\n\n```\nif condition1:\n    # ทำงานถ้า condition1 เป็น True\nelif condition2:\n    # ทำงานถ้า condition2 เป็น True (และ condition1 เป็น False)\nelse:\n    # ทำงานถ้าไม่มีเงื่อนไขใดเป็น True\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:52:en"
  };

  // Lesson 53
  window.CONTENT_I18N["python:53"] = window.CONTENT_I18N["python:53"] || {};
  window.CONTENT_I18N["python:53"].th = {
    title: "การแตกกิ่งสองทางด้วย if-else (ifelse01.py)",
    concept: "ใช้ `if-else` เพื่อจัดการทั้งสองความเป็นไปได้: บล็อกหนึ่งทำงานเมื่อเงื่อนไขเป็น `True` และอีกบล็อกหนึ่งทำงานเมื่อเป็น `False`\n\n```\nif condition:\n    # ทำงานเมื่อเป็น True\nelse:\n    # ทำงานเมื่อเป็น False\n```\n\n**ข้อผิดพลาดที่พบบ่อย:** อย่าลืมเครื่องหมายทวิภาค `:` หลังทั้ง `if` และ `else` ใช้การเยื้อง 4 ช่องว่างสำหรับทั้งสองบล็อก",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:53:en"
  };

  // Lesson 54
  window.CONTENT_I18N["python:54"] = window.CONTENT_I18N["python:54"] || {};
  window.CONTENT_I18N["python:54"].th = {
    title: "การใช้คำสั่ง elif หลายตัว (ifelif02.py)",
    concept: "คุณสามารถต่อคำสั่ง `elif` หลายตัวเพื่อจัดการหลายเงื่อนไข Python ประเมินจากบนลงล่างและดำเนินการเฉพาะบล็อกแรกที่ตรงกัน\n\n```\nif condition1:\n    ...\nelif condition2:\n    ...\nelif condition3:\n    ...\nelse:\n    # ทำงานถ้าไม่มีข้อใดตรงกัน\n```",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:54:en"
  };

  // Lesson 55
  window.CONTENT_I18N["python:55"] = window.CONTENT_I18N["python:55"] || {};
  window.CONTENT_I18N["python:55"].th = {
    title: "เงื่อนไขแบบซ้อน (ifnest01.py)",
    concept: "คุณสามารถวางคำสั่ง `if` ภายในคำสั่ง `if` อื่น เรียกว่า**การซ้อน** แต่ละระดับการซ้อนเพิ่มอีก 4 ช่องว่างของการเยื้อง\n\n```\nif outer_condition:\n    # +4 ช่องว่าง\n    if inner_condition:\n        # +8 ช่องว่าง\n        print('ตรงตามเงื่อนไขทั้งสอง')\n```\n\nการซ้อนช่วยให้คุณตรวจสอบหลายเงื่อนไขตามลำดับ เหมือนการปลดล็อกประตูก่อนเปิดกล่องข้างใน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:55:en"
  };

  // Lesson 56
  window.CONTENT_I18N["python:56"] = window.CONTENT_I18N["python:56"] || {};
  window.CONTENT_I18N["python:56"].th = {
    title: "ตรรกะ AND (and01.py)",
    concept: "ตัวดำเนินการ `and` รวมหลายเงื่อนไข ผลลัพธ์โดยรวมเป็น `True` เมื่อ**ทั้งสอง**เงื่อนไขเป็น `True` เท่านั้น\n\n```\nif a < 10 and a >= 0:\n    print('a อยู่ระหว่าง 0 และ 9')\n```\n\nสิ่งนี้เทียบเท่ากับการเขียนคำสั่ง `if` แยกสองอันซ้อนกัน แต่กระชับกว่า",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:56:en"
  };

  // Lesson 57
  window.CONTENT_I18N["python:57"] = window.CONTENT_I18N["python:57"] || {};
  window.CONTENT_I18N["python:57"].th = {
    title: "การเปรียบเทียบแบบลูกโซ่ (and02.py)",
    concept: "Python อนุญาต**การเปรียบเทียบแบบลูกโซ่**เพื่อโค้ดที่สะอาดขึ้น แทนที่จะเขียน `if a < 10 and a >= 0` คุณสามารถเขียน:\n\n```\nif 0 <= a < 10:\n    print('a อยู่ระหว่าง 0 และ 9')\n```\n\nสิ่งนี้อ่านได้เป็นธรรมชาติเหมือนอสมการทางคณิตศาสตร์และอ่านง่ายกว่าการใช้ `and`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:57:en"
  };

  // Lesson 58
  window.CONTENT_I18N["python:58"] = window.CONTENT_I18N["python:58"] || {};
  window.CONTENT_I18N["python:58"].th = {
    title: "ตรรกะ OR (or01.py)",
    concept: "ตัวดำเนินการ `or` รวมหลายเงื่อนไข ผลลัพธ์โดยรวมเป็น `True` ถ้า**อย่างน้อยหนึ่ง**เงื่อนไขเป็น `True`\n\n```\nif a > 10 or a <= 0:\n    print('a อยู่นอกช่วง 0-10')\n```\n\n`or` เป็น `True` เมื่อด้านใดด้านหนึ่ง (หรือทั้งสอง) เป็น `True` มันเป็น `False` เฉพาะเมื่อทั้งสองด้านเป็น `False`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:58:en"
  };

  // Lesson 59
  window.CONTENT_I18N["python:59"] = window.CONTENT_I18N["python:59"] || {};
  window.CONTENT_I18N["python:59"].th = {
    title: "ตรรกะ NOT (not01.py)",
    concept: "ตัวดำเนินการ `not` **กลับด้าน**ค่าบูลีน `not True` กลายเป็น `False` และ `not False` กลายเป็น `True`\n\n```\nif not a < 10:\n    print('a ไม่น้อยกว่า 10')\n```\n\n`not` เป็นตัวดำเนินการเอกภาค — ทำงานบนเงื่อนไขหรือค่าเดียว กลับค่าความจริงของมัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:59:en"
  };

  // Lesson 60
  window.CONTENT_I18N["python:60"] = window.CONTENT_I18N["python:60"] || {};
  window.CONTENT_I18N["python:60"].th = {
    title: "การกลับด้านบูลีน (not02.py)",
    concept: "ใช้ `not` เพื่อกลับด้านค่าบูลีนที่เก็บในตัวแปร:\n\n```\nb = False\nif not b:\n    print('b ไม่เป็น True')\n```\n\nเนื่องจาก `not False` เท่ากับ `True` บล็อก `if` จึงทำงาน\n\n**ข้อผิดพลาดที่พบบ่อย:** อย่าลืมเครื่องหมายทวิภาค `:` หลังบรรทัด `if` และใช้การเยื้อง 4 ช่องว่างสำหรับบล็อกโค้ด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:60:en"
  };

  // Lesson 61
  window.CONTENT_I18N["python:61"] = window.CONTENT_I18N["python:61"] || {};
  window.CONTENT_I18N["python:61"].th = {
    title: "คอลัมน์: การตรวจสอบการมีอยู่ของค่า (column01.py)",
    concept: "ตัวดำเนินการ `not` กลับด้านผลลัพธ์ของเงื่อนไข `not True` กลายเป็น `False` และ `not False` กลายเป็น `True` คอลัมน์นี้ยังครอบคลุมการประเมินค่าความจริงของตัวเลขในนิพจน์เงื่อนไข",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:61:en"
  };

  // Lesson 62
  window.CONTENT_I18N["python:62"] = window.CONTENT_I18N["python:62"] || {};
  window.CONTENT_I18N["python:62"].th = {
    title: "คอลัมน์: ตัวดำเนินการสามเงื่อนไข (นิพจน์เงื่อนไข) (column02.py)",
    concept: "ตัวดำเนินการ `not` กลับด้านผลลัพธ์ของเงื่อนไข `not True` กลายเป็น `False` และ `not False` กลายเป็น `True` คอลัมน์นี้ครอบคลุมการใช้นิพจน์เงื่อนไข (ตัวดำเนินการสามเงื่อนไข) สำหรับการกำหนดค่าแบบกระชับตามเงื่อนไข",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:62:en"
  };

  // Lesson 63
  window.CONTENT_I18N["python:63"] = window.CONTENT_I18N["python:63"] || {};
  window.CONTENT_I18N["python:63"].th = {
    title: "แบบฝึกหัด: บวก ลบ หรือศูนย์ (script4-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 4 (script4-1.py)**\n\nภารกิจ: กำหนดว่าจำนวนเต็มเป็นบวก ลบ หรือศูนย์\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:63:en"
  };

  // Lesson 64
  window.CONTENT_I18N["python:64"] = window.CONTENT_I18N["python:64"] || {};
  window.CONTENT_I18N["python:64"].th = {
    title: "แบบฝึกหัด: การเปรียบเทียบตัวเลขสองตัว (script4-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 4 (script4-2.py)**\n\nภารกิจ: รับจำนวนทศนิยมสองตัวและเปรียบเทียบขนาด\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:64:en"
  };

  // Lesson 65
  window.CONTENT_I18N["python:65"] = window.CONTENT_I18N["python:65"] || {};
  window.CONTENT_I18N["python:65"].th = {
    title: "แบบฝึกหัด: การทักทายอัตโนมัติตามช่วงเวลา (script4-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 4 (script4-3.py)**\n\nภารกิจ: พิมพ์คำทักทายตามเวลาที่ป้อน (รูปแบบ 24 ชั่วโมง)\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไป ใช้การเปรียบเทียบแบบลูกโซ่และ `or` เพื่อตรวจสอบหลายช่วงเวลา",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:65:en"
  };

  // Lesson 66
  window.CONTENT_I18N["python:66"] = window.CONTENT_I18N["python:66"] || {};
  window.CONTENT_I18N["python:66"].th = {
    title: "การสร้างและแสดงผลลิสต์ (list01.py)",
    concept: "**ลิสต์** คือชุดที่เก็บหลายค่าไว้ด้วยกัน เหมือนอาร์เรย์ สร้างลิสต์โดยใช้วงเล็บเหลี่ยม `[]` โดยมีสมาชิกคั่นด้วยเครื่องหมายจุลภาค เข้าถึงสมาชิกด้วย `list[index]` จำไว้ว่า**การจัดทำดัชนีเริ่มต้นที่ 0**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:66:en"
  };

  // Lesson 67
  window.CONTENT_I18N["python:67"] = window.CONTENT_I18N["python:67"] || {};
  window.CONTENT_I18N["python:67"].th = {
    title: "ลิสต์แบบซ้อน (list02.py)",
    concept: "**ลิสต์** คือชุดที่เก็บหลายค่าไว้ด้วยกัน ลิสต์สามารถ**ซ้อนกัน**ได้ — ลิสต์หนึ่งสามารถบรรจุลิสต์อื่นเป็นสมาชิกได้ สร้างลิสต์ด้วยวงเล็บเหลี่ยม `[]` เข้าถึงสมาชิกโดยใช้ `list[index]` และ**การจัดทำดัชนีเริ่มต้นที่ 0**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:67:en"
  };

  // Lesson 68
  window.CONTENT_I18N["python:68"] = window.CONTENT_I18N["python:68"] || {};
  window.CONTENT_I18N["python:68"].th = {
    title: "การเข้าถึงสมาชิกโดยดัชนี (list03.py)",
    concept: "**ลิสต์** เก็บหลายค่าในวงเล็บเหลี่ยม `[]` เข้าถึงสมาชิกแต่ละตัวโดยใช้ `list[index]` **การจัดทำดัชนีเริ่มต้นที่ 0** ดังนั้น `list[0]` ให้สมาชิกตัวแรก `list[1]` ให้ตัวที่สอง และอื่นๆ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:68:en"
  };

  // Lesson 69
  window.CONTENT_I18N["python:69"] = window.CONTENT_I18N["python:69"] || {};
  window.CONTENT_I18N["python:69"].th = {
    title: "การใช้ดัชนีติดลบ (list04.py)",
    concept: "**ลิสต์** เก็บหลายค่าในวงเล็บเหลี่ยม `[]` Python รองรับ**การจัดทำดัชนีติดลบ**: `list[-1]` คืนสมาชิกตัวสุดท้าย `list[-2]` คืนสมาชิกตัวรองสุดท้าย และอื่นๆ นี่เป็นวิธีที่สะดวกในการเข้าถึงสมาชิกจากท้ายลิสต์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:69:en"
  };

  // Lesson 70
  window.CONTENT_I18N["python:70"] = window.CONTENT_I18N["python:70"] || {};
  window.CONTENT_I18N["python:70"].th = {
    title: "การทำสไลซ์: การรับช่วงของสมาชิก (list05.py)",
    concept: "**ลิสต์** เก็บหลายค่าในวงเล็บเหลี่ยม `[]` ใช้**การทำสไลซ์** (`list[start:end]`) เพื่อดึงลิสต์ย่อย ดัชนีเริ่มต้นรวมอยู่ด้วย แต่ดัชนีสิ้นสุด**ไม่รวม** เช่น `lst[1:3]` คืนสมาชิกที่ตำแหน่ง 1 และ 2",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:70:en"
  };

  // Lesson 71
  window.CONTENT_I18N["python:71"] = window.CONTENT_I18N["python:71"] || {};
  window.CONTENT_I18N["python:71"].th = {
    title: "การละเว้นจุดเริ่มต้นและสิ้นสุดของสไลซ์ (list06.py)",
    concept: "**ลิสต์** เก็บหลายค่าในวงเล็บเหลี่ยม `[]` ในสไลซ์ `list[start:end]` คุณสามารถ**ละเว้น**ดัชนีเริ่มต้นหรือสิ้นสุด `lst[:2]` ได้สมาชิกตั้งแต่ต้นจนถึง (แต่ไม่รวม) ดัชนี 2 `lst[1:]` ได้สมาชิกตั้งแต่ดัชนี 1 ไปจนจบ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:71:en"
  };

  // Lesson 72
  window.CONTENT_I18N["python:72"] = window.CONTENT_I18N["python:72"] || {};
  window.CONTENT_I18N["python:72"].th = {
    title: "การแกะกล่องลิสต์ (list07.py)",
    concept: "การดำเนินการลิสต์ทั่วไป:\n\n- `append(value)` — เพิ่มต่อท้าย\n- `insert(position, value)` — แทรกที่ตำแหน่งเฉพาะ\n- `pop(position)` — ลบและคืนสมาชิกที่ตำแหน่ง\n- `remove(value)` — ลบสมาชิกที่ตรงกันตัวแรก\n- `del list[position]` — ลบตามตำแหน่ง\n\n**การแกะกล่อง** กำหนดสมาชิกลิสต์แต่ละตัวให้ตัวแปร: `a, b, c = lst`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:72:en"
  };

  // Lesson 73
  window.CONTENT_I18N["python:73"] = window.CONTENT_I18N["python:73"] || {};
  window.CONTENT_I18N["python:73"].th = {
    title: "ข้อผิดพลาดจำนวนสมาชิกไม่ตรงกันในการแกะกล่อง (list08.py)",
    concept: "การดำเนินการลิสต์ทั่วไปรวมถึง `append()`, `insert()`, `pop()`, `remove()` และ `del` เมื่อแกะกล่องลิสต์เป็นตัวแปร จำนวนตัวแปร**ต้องตรงกัน**กับจำนวนสมาชิก ถ้าคุณเขียน `a, b = lst` แต่ `lst` มี 3 สมาชิก Python จะโยน **ValueError**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:73:en"
  };

  // Lesson 74
  window.CONTENT_I18N["python:74"] = window.CONTENT_I18N["python:74"] || {};
  window.CONTENT_I18N["python:74"].th = {
    title: "การตรวจสอบการมีอยู่ด้วย `in` (list09.py)",
    concept: "การดำเนินการลิสต์ทั่วไปรวมถึง `append()`, `insert()`, `pop()`, `remove()` และ `del` ใช้ตัวดำเนินการ `in` เพื่อตรวจสอบว่ามีค่าอยู่ในลิสต์หรือไม่: `'abc' in lst` คืนค่า `True` หรือ `False`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:74:en"
  };

  // Lesson 75
  window.CONTENT_I18N["python:75"] = window.CONTENT_I18N["python:75"] || {};
  window.CONTENT_I18N["python:75"].th = {
    title: "การค้นหาตำแหน่งสมาชิกด้วย index() (list10.py)",
    concept: "การดำเนินการลิสต์ทั่วไปรวมถึง `append()`, `insert()`, `pop()`, `remove()` และ `del` ใช้ `list.index(value)` เพื่อหาตำแหน่งดัชนีของสมาชิกเฉพาะ ถ้าไม่มีสมาชิกนั้น Python จะโยน **ValueError**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:75:en"
  };

  // Lesson 76
  window.CONTENT_I18N["python:76"] = window.CONTENT_I18N["python:76"] || {};
  window.CONTENT_I18N["python:76"].th = {
    title: "การแก้ไขสมาชิกตามดัชนี (list11.py)",
    concept: "การดำเนินการลิสต์ทั่วไปรวมถึง `append()`, `insert()`, `pop()`, `remove()` และ `del` คุณสามารถแก้ไขสมาชิกลิสต์โดยกำหนดค่าใหม่ให้ดัชนี: `lst[1] = 6.2` ลิสต์**แก้ไขได้** หมายถึงเนื้อหาสามารถเปลี่ยนแปลงได้หลังสร้าง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:76:en"
  };

  // Lesson 77
  window.CONTENT_I18N["python:77"] = window.CONTENT_I18N["python:77"] || {};
  window.CONTENT_I18N["python:77"].th = {
    title: "การต่อท้ายลิสต์ด้วย += (list12.py)",
    concept: "การดำเนินการลิสต์ทั่วไปรวมถึง `append()`, `insert()`, `pop()`, `remove()` และ `del` ใช้ตัวดำเนินการ `+=` เพื่อขยายลิสต์ด้วยสมาชิกจากลิสต์อื่น: `lst += [20]` ต่อท้าย 20 ต่อท้าย `lst`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:77:en"
  };

  // Lesson 78
  window.CONTENT_I18N["python:78"] = window.CONTENT_I18N["python:78"] || {};
  window.CONTENT_I18N["python:78"].th = {
    title: "การเพิ่มสมาชิกด้วย append() (list13.py)",
    concept: "การดำเนินการลิสต์ทั่วไปรวมถึง `append()`, `insert()`, `pop()`, `remove()` และ `del` ใช้ `list.append(value)` เพื่อเพิ่มสมาชิกเดี่ยวต่อ**ท้าย**ลิสต์ นี่เป็นวิธีที่ใช้บ่อยที่สุดในการขยายลิสต์แบบไดนามิก",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:78:en"
  };

  // Lesson 79
  window.CONTENT_I18N["python:79"] = window.CONTENT_I18N["python:79"] || {};
  window.CONTENT_I18N["python:79"].th = {
    title: "การแทรกสมาชิกที่ตำแหน่งด้วย insert() (list14.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึงการค้นหา การเรียงลำดับ และการคัดลอก:\n\n- `index(value)` — หาดัชนีของค่า\n- `count(value)` — นับสมาชิกที่ตรงกัน\n- `sort()` — เรียงลำดับจากน้อยไปมาก\n- `reverse()` — กลับลำดับ\n- `copy()` — สร้างสำเนาตื้น\n\nใช้ `insert(position, value)` เพื่อแทรกที่ดัชนีเฉพาะ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:79:en"
  };

  // Lesson 80
  window.CONTENT_I18N["python:80"] = window.CONTENT_I18N["python:80"] || {};
  window.CONTENT_I18N["python:80"].th = {
    title: "การลบสมาชิกด้วย del (list15.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึง `index()`, `count()`, `sort()`, `reverse()` และ `copy()` ใช้ `del list[index]` เพื่อลบสมาชิกที่ตำแหน่งเฉพาะออกจากลิสต์หรือดิกชันนารีอย่างถาวร",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:80:en"
  };

  // Lesson 81
  window.CONTENT_I18N["python:81"] = window.CONTENT_I18N["python:81"] || {};
  window.CONTENT_I18N["python:81"].th = {
    title: "การดึงและลบสมาชิกด้วย pop() (list16.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึง `index()`, `count()`, `sort()`, `reverse()` และ `copy()` ใช้ `list.pop(index)` เพื่อ**ลบและคืน**สมาชิกที่ตำแหน่งที่กำหนด ถ้าไม่ระบุดัชนี `pop()` จะลบและคืนสมาชิก**ตัวสุดท้าย**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:81:en"
  };

  // Lesson 82
  window.CONTENT_I18N["python:82"] = window.CONTENT_I18N["python:82"] || {};
  window.CONTENT_I18N["python:82"].th = {
    title: "การลบตามค่าด้วย remove() (list17.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึง `index()`, `count()`, `sort()`, `reverse()` และ `copy()` ใช้ `list.remove(value)` เพื่อลบ**การปรากฏครั้งแรก**ของค่าเฉพาะจากลิสต์ ถ้าไม่พบค่า Python จะโยน **ValueError**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:82:en"
  };

  // Lesson 83
  window.CONTENT_I18N["python:83"] = window.CONTENT_I18N["python:83"] || {};
  window.CONTENT_I18N["python:83"].th = {
    title: "การลบอย่างปลอดภัยโดยตรวจสอบการมีอยู่ก่อน (list18.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึง `index()`, `count()`, `sort()`, `reverse()` และ `copy()` เพื่อหลีกเลี่ยงข้อผิดพลาดเมื่อลบ ให้ตรวจสอบก่อนว่ามีค่าอยู่หรือไม่โดยใช้ `in`: `if 'XYZ' in lst:` ก่อนเรียก `lst.remove('XYZ')`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:83:en"
  };

  // Lesson 84
  window.CONTENT_I18N["python:84"] = window.CONTENT_I18N["python:84"] || {};
  window.CONTENT_I18N["python:84"].th = {
    title: "การหาความยาวลิสต์ด้วย len() (list19.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึง `index()`, `count()`, `sort()`, `reverse()` และ `copy()` ใช้ `len(list)` เพื่อหาจำนวนสมาชิกในลิสต์ `len()` เป็นฟังก์ชันในตัวของ Python ที่ทำงานกับลิสต์ ทูเพิล สตริง และชุดข้อมูลอื่นๆ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:84:en"
  };

  // Lesson 85
  window.CONTENT_I18N["python:85"] = window.CONTENT_I18N["python:85"] || {};
  window.CONTENT_I18N["python:85"].th = {
    title: "การรับสมาชิกตัวสุดท้ายอย่างปลอดภัย (list20.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึง `index()`, `count()`, `sort()`, `reverse()` และ `copy()` เพื่อรับสมาชิกตัวสุดท้ายอย่างปลอดภัย ให้ใช้ `list[len(list) - 1]` คุณยังสามารถใช้ดัชนีติดลบ: `list[-1]` ง่ายกว่าและพบบ่อยกว่า",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:85:en"
  };

  // Lesson 86
  window.CONTENT_I18N["python:86"] = window.CONTENT_I18N["python:86"] || {};
  window.CONTENT_I18N["python:86"].th = {
    title: "คอลัมน์: min() และ max() (listcolumn01.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึง `index()`, `count()`, `sort()`, `reverse()` และ `copy()` ใช้ `min(list)` เพื่อรับค่าที่น้อยที่สุดและ `max(list)` เพื่อรับค่าที่มากที่สุด ฟังก์ชันในตัวเหล่านี้ทำงานกับ iterable ใดๆ ของสมาชิกที่เปรียบเทียบกันได้",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:86:en"
  };

  // Lesson 87
  window.CONTENT_I18N["python:87"] = window.CONTENT_I18N["python:87"] || {};
  window.CONTENT_I18N["python:87"].th = {
    title: "คอลัมน์: ข้อผิดพลาดค่าสุดขีดกับชนิดผสม (listcolumn02.py)",
    concept: "การดำเนินการลิสต์ขั้นสูงรวมถึง `index()`, `count()`, `sort()`, `reverse()` และ `copy()` `min()` และ `max()` **ไม่** ทำงานกับลิสต์ที่มีชนิดผสม (เช่น ตัวเลขและสตริง) การพยายามเปรียบเทียบชนิดที่เข้ากันไม่ได้จะโยน **TypeError**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:87:en"
  };

  // Lesson 88
  window.CONTENT_I18N["python:88"] = window.CONTENT_I18N["python:88"] || {};
  window.CONTENT_I18N["python:88"].th = {
    title: "ข้อผิดพลาดการแก้ไขทูเพิล (tuple01.py)",
    concept: "**ทูเพิล** คล้ายกับลิสต์ แต่สมาชิกของมัน**ไม่สามารถเปลี่ยนแปลง เพิ่ม หรือลบ**ได้หลังสร้าง สร้างทูเพิลด้วยวงเล็บ `()` ใช้ทูเพิลเมื่อคุณต้องการป้องกันข้อมูลจากการแก้ไขโดยไม่ตั้งใจ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:88:en"
  };

  // Lesson 89
  window.CONTENT_I18N["python:89"] = window.CONTENT_I18N["python:89"] || {};
  window.CONTENT_I18N["python:89"].th = {
    title: "การสร้างและใช้ทูเพิล (tuple02.py)",
    concept: "**ทูเพิล** คล้ายกับลิสต์ แต่สมาชิกของมัน**ไม่สามารถเปลี่ยนแปลง เพิ่ม หรือลบ**ได้หลังสร้าง สร้างทูเพิลด้วยวงเล็บ `()` ทูเพิลเป็น**ไม่เปลี่ยนสภาพ** — ใช้เมื่อข้อมูลควรคงที่ตลอดโปรแกรม",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:89:en"
  };

  // Lesson 90
  window.CONTENT_I18N["python:90"] = window.CONTENT_I18N["python:90"] || {};
  window.CONTENT_I18N["python:90"].th = {
    title: "การสร้างทูเพิลสมาชิกเดี่ยว (tuple03.py)",
    concept: "**ทูเพิล** คือชุดข้อมูลที่ไม่เปลี่ยนสภาพสร้างด้วยวงเล็บ `()` ในการสร้างทูเพิลที่มีสมาชิกหนึ่งตัว คุณ**ต้อง**ใส่เครื่องหมายจุลภาคต่อท้าย: `(10,)` การเขียน `(10)` โดยไม่มีเครื่องหมายจุลภาคจะสร้างจำนวนเต็ม ไม่ใช่ทูเพิล",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:90:en"
  };

  // Lesson 91
  window.CONTENT_I18N["python:91"] = window.CONTENT_I18N["python:91"] || {};
  window.CONTENT_I18N["python:91"].th = {
    title: "การเข้าถึงและทำสไลซ์ทูเพิล (tuple04.py)",
    concept: "**ทูเพิล** คือชุดข้อมูลที่ไม่เปลี่ยนสภาพสร้างด้วยวงเล็บ `()` แม้ว่าทูเพิลจะแก้ไขไม่ได้ แต่คุณ**สามารถ**อ่านสมาชิกโดยใช้ดัชนี (`tpl[1]`) และการทำสไลซ์ (`tpl[1:3]`) — เหมือนกับลิสต์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:91:en"
  };

  // Lesson 92
  window.CONTENT_I18N["python:92"] = window.CONTENT_I18N["python:92"] || {};
  window.CONTENT_I18N["python:92"].th = {
    title: "การหาความยาวทูเพิลด้วย len() (tuple05.py)",
    concept: "**ทูเพิล** คือชุดข้อมูลที่ไม่เปลี่ยนสภาพสร้างด้วยวงเล็บ `()` ใช้ `len(tuple)` เพื่อหาจำนวนสมาชิก ตัวดำเนินการ `in` ก็ทำงานกับทูเพิลด้วย: `3.14 in tpl` คืนค่า `True` หรือ `False`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:92:en"
  };

  // Lesson 93
  window.CONTENT_I18N["python:93"] = window.CONTENT_I18N["python:93"] || {};
  window.CONTENT_I18N["python:93"].th = {
    title: "คอลัมน์: การแปลงระหว่างลิสต์และทูเพิล (tuplecolumun.py)",
    concept: "**ทูเพิล** คือชุดข้อมูลที่ไม่เปลี่ยนสภาพ แปลงทูเพิลเป็นลิสต์ด้วย `list(tuple)` เพื่อให้แก้ไขได้ แปลงลิสต์เป็นทูเพิลด้วย `tuple(list)` เพื่อให้ไม่เปลี่ยนสภาพ การแปลงนี้มีประโยชน์เมื่อคุณต้องการแก้ไขข้อมูลทูเพิลชั่วคราว",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:93:en"
  };

  // Lesson 94
  window.CONTENT_I18N["python:94"] = window.CONTENT_I18N["python:94"] || {};
  window.CONTENT_I18N["python:94"].th = {
    title: "การสร้างและแสดงผลดิกชันนารี (jisho01.py)",
    concept: "**ดิกชันนารี (dict)** เก็บคู่คีย์-ค่า สร้างดิกชันนารีด้วยเครื่องหมายปีกกา `{}` โดยใช้ไวยากรณ์ `{key: value}` เข้าถึงสมาชิกโดยใช้คีย์ด้วย `dict[key]` ไม่ใช่โดยดัชนีตัวเลข คีย์ไม่ซ้ำกันและให้การค้นหาที่รวดเร็ว",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:94:en"
  };

  // Lesson 95
  window.CONTENT_I18N["python:95"] = window.CONTENT_I18N["python:95"] || {};
  window.CONTENT_I18N["python:95"].th = {
    title: "พฤติกรรมเมื่อคีย์ซ้ำกัน (jisho02.py)",
    concept: "**ดิกชันนารี (dict)** เก็บคู่คีย์-ค่าโดยใช้เครื่องหมายปีกกา `{}` คีย์ของดิกชันนารีต้อง**ไม่ซ้ำกัน** ถ้าคุณระบุคีย์เดียวกันสองครั้ง **ค่าสุดท้ายจะเขียนทับ**ค่าแรก ไม่มีข้อผิดพลาดเกิดขึ้น — ค่าของคีย์ที่ซ้ำกันจะถูกแทนที่",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:95:en"
  };

  // Lesson 96
  window.CONTENT_I18N["python:96"] = window.CONTENT_I18N["python:96"] || {};
  window.CONTENT_I18N["python:96"].th = {
    title: "การรับค่าตามคีย์ (jisho03.py)",
    concept: "**ดิกชันนารี (dict)** เก็บคู่คีย์-ค่า ดึงค่าตามคีย์โดยใช้เครื่องหมายวงเล็บเหลี่ยม: `dct[key]` ถ้าคีย์ไม่มีอยู่ Python จะโยน **KeyError** ไม่เหมือนลิสต์ ดิกชันนารีไม่ได้ใช้ดัชนีตัวเลข",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:96:en"
  };

  // Lesson 97
  window.CONTENT_I18N["python:97"] = window.CONTENT_I18N["python:97"] || {};
  window.CONTENT_I18N["python:97"].th = {
    title: "ข้อผิดพลาดดิกชันนารีไม่รองรับสไลซ์ (jisho04.py)",
    concept: "**ดิกชันนารี (dict)** เก็บคู่คีย์-ค่า ดิกชันนารี**ไม่รองรับการทำสไลซ์**เหมือนลิสต์ การพยายามใช้สไลซ์เช่น `dct[:2]` กับดิกชันนารีจะโยน **TypeError** เพราะดิกชันนารีไม่เรียงลำดับและเข้าถึงโดยคีย์ ไม่ใช่ตำแหน่ง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:97:en"
  };

  // Lesson 98
  window.CONTENT_I18N["python:98"] = window.CONTENT_I18N["python:98"] || {};
  window.CONTENT_I18N["python:98"].th = {
    title: "การรับค่าอย่างปลอดภัยด้วย get() (jisho05.py)",
    concept: "**ดิกชันนารี (dict)** เก็บคู่คีย์-ค่า ใช้ `dict.get(key)` เพื่อเข้าถึงอย่างปลอดภัย — มันคืน `None` (หรือค่าเริ่มต้น) ถ้าคีย์ไม่มีอยู่ แทนที่จะโยน **KeyError** เช่น `dct.get(999, 'not found')` คืน `'not found'` ถ้าคีย์ 999 หายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:98:en"
  };

  // Lesson 99
  window.CONTENT_I18N["python:99"] = window.CONTENT_I18N["python:99"] || {};
  window.CONTENT_I18N["python:99"].th = {
    title: "การอัปเดตค่าตามคีย์ (jisho06.py)",
    concept: "การดำเนินการดิกชันนารีรวมถึง:\n\n- `d[new_key] = value` — เพิ่มคู่คีย์-ค่าใหม่\n- `d[existing_key] = value` — อัปเดตค่าที่มีอยู่\n- `d.get(key)` — รับค่าอย่างปลอดภัย\n- `d.pop(key)` — ลบคีย์และคืนค่า\n- `d.keys()` — รับคีย์ทั้งหมด, `d.values()` — รับค่าทั้งหมด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:99:en"
  };

  // Lesson 100
  window.CONTENT_I18N["python:100"] = window.CONTENT_I18N["python:100"] || {};
  window.CONTENT_I18N["python:100"].th = {
    title: "การเพิ่มคู่คีย์-ค่าใหม่ (jisho07.py)",
    concept: "การดำเนินการดิกชันนารีรวมถึงการเพิ่ม อัปเดต และลบรายการ ในการเพิ่มคู่คีย์-ค่าใหม่ กำหนดค่าให้คีย์ใหม่: `dct[201] = 'ABC'` ถ้าคีย์มีอยู่แล้ว ค่าจะถูก**อัปเดต**แทน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:100:en"
  };

  // Lesson 101
  window.CONTENT_I18N["python:101"] = window.CONTENT_I18N["python:101"] || {};
  window.CONTENT_I18N["python:101"].th = {
    title: "การลบสมาชิกดิกชันนารีด้วย del (jisho08.py)",
    concept: "การดำเนินการดิกชันนารีรวมถึงการเพิ่ม อัปเดต และลบรายการ ใช้ `del dict[key]` เพื่อลบคู่คีย์-ค่าเฉพาะ ถ้าคีย์ไม่มีอยู่ Python จะโยน **KeyError**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:101:en"
  };

  // Lesson 102
  window.CONTENT_I18N["python:102"] = window.CONTENT_I18N["python:102"] || {};
  window.CONTENT_I18N["python:102"].th = {
    title: "ข้อผิดพลาดเมื่อลบคีย์ที่ไม่มีอยู่ (jisho09.py)",
    concept: "การดำเนินการดิกชันนารีรวมถึงการเพิ่ม อัปเดต และลบรายการ การใช้ `del dict[key]` กับคีย์ที่**ไม่มีอยู่**จะโยน **KeyError** ตรวจสอบการมีอยู่ด้วย `in` หรือใช้เมธอด `pop()` เพื่อจัดการคีย์ที่หายไปอย่างปลอดภัย",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:102:en"
  };

  // Lesson 103
  window.CONTENT_I18N["python:103"] = window.CONTENT_I18N["python:103"] || {};
  window.CONTENT_I18N["python:103"].th = {
    title: "การลบอย่างปลอดภัยโดยตรวจสอบการมีอยู่ก่อน (jisho10.py)",
    concept: "การดำเนินการดิกชันนารีรวมถึงการเพิ่ม อัปเดต และลบรายการ เพื่อลบอย่างปลอดภัย ให้ตรวจสอบก่อนว่าคีย์มีอยู่โดยใช้ `in`: `if 999 in dct:` ก่อนเรียก `del dct[999]` วิธีนี้ป้องกัน **KeyError**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:103:en"
  };

  // Lesson 104
  window.CONTENT_I18N["python:104"] = window.CONTENT_I18N["python:104"] || {};
  window.CONTENT_I18N["python:104"].th = {
    title: "การรับคีย์ทั้งหมดด้วย keys() (jisho11.py)",
    concept: "การดำเนินการดิกชันนารีรวมถึงการเพิ่ม อัปเดต และลบรายการ ใช้ `dict.keys()` เพื่อรับมุมมองแบบไดนามิกของคีย์ทั้งหมด การเปลี่ยนแปลงดิกชันนารีจะสะท้อนในมุมมองคีย์ ใช้ `list(dict.keys())` เพื่อแปลงเป็นลิสต์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:104:en"
  };

  // Lesson 105
  window.CONTENT_I18N["python:105"] = window.CONTENT_I18N["python:105"] || {};
  window.CONTENT_I18N["python:105"].th = {
    title: "การรับคู่คีย์-ค่าด้วย items() (jisho12.py)",
    concept: "การดำเนินการดิกชันนารีรวมถึงการเพิ่ม อัปเดต และลบรายการ ใช้ `dict.items()` เพื่อรับมุมมองแบบไดนามิกของคู่คีย์-ค่าทั้งหมดเป็นทูเพิล การเปลี่ยนแปลงดิกชันนารีจะสะท้อนในมุมมอง items",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:105:en"
  };

  // Lesson 106
  window.CONTENT_I18N["python:106"] = window.CONTENT_I18N["python:106"] || {};
  window.CONTENT_I18N["python:106"].th = {
    title: "การตรวจสอบการมีอยู่ของค่าด้วย values() (jisho_values01.py)",
    concept: "การดำเนินการดิกชันนารีรวมถึงการเพิ่ม อัปเดต และลบรายการ ใช้ `dict.values()` เพื่อรับมุมมองของค่าทั้งหมด รวมกับ `in` คุณสามารถตรวจสอบว่ามีค่าอยู่หรือไม่: `if 'xyz' in dct.values():`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:106:en"
  };

  // Lesson 107
  window.CONTENT_I18N["python:107"] = window.CONTENT_I18N["python:107"] || {};
  window.CONTENT_I18N["python:107"].th = {
    title: "การสร้างเซ็ตด้วย set() (shugou01.py)",
    concept: "**เซ็ต** คือชุดที่**ไม่มีสมาชิกซ้ำกัน**และ**ไม่มีลำดับที่แน่นอน** สร้างเซ็ตโดยใช้เครื่องหมายปีกกา `{}` หรือฟังก์ชัน `set()` เซ็ตรองรับการดำเนินการทางคณิตศาสตร์เช่น**อินเตอร์เซกชัน** (`&`) และ**ยูเนียน** (`|`)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:107:en"
  };

  // Lesson 108
  window.CONTENT_I18N["python:108"] = window.CONTENT_I18N["python:108"] || {};
  window.CONTENT_I18N["python:108"].th = {
    title: "การสร้างเซ็ตด้วยลิเทอรัลและการลบซ้ำ (shugou02.py)",
    concept: "**เซ็ต** ประกอบด้วย**ไม่มีสมาชิกซ้ำกัน**และ**ไม่มีลำดับที่แน่นอน** สร้างเซ็ตโดยตรงด้วยเครื่องหมายปีกกา: `{10, 3.14, 'abc', 10}` ค่าที่ซ้ำกันเช่น 10 จะถูกลบออกโดยอัตโนมัติ — เซ็ตจะลบข้อมูลที่ซ้ำกัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:108:en"
  };

  // Lesson 109
  window.CONTENT_I18N["python:109"] = window.CONTENT_I18N["python:109"] || {};
  window.CONTENT_I18N["python:109"].th = {
    title: "การตรวจสอบสมาชิกในเซ็ต (shugou03.py)",
    concept: "**เซ็ต** ประกอบด้วย**ไม่มีสมาชิกซ้ำกัน**และ**ไม่มีลำดับที่แน่นอน** ใช้ตัวดำเนินการ `in` เพื่อตรวจสอบว่ามีค่าอยู่ในเซ็ตหรือไม่: `if 3.14 in st:` การทดสอบสมาชิกภาพของเซ็ตเร็วมาก (O(1) โดยเฉลี่ย)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:109:en"
  };

  // Lesson 110
  window.CONTENT_I18N["python:110"] = window.CONTENT_I18N["python:110"] || {};
  window.CONTENT_I18N["python:110"].th = {
    title: "การลบสมาชิกด้วย remove() (shugou04.py)",
    concept: "**เซ็ต** ประกอบด้วย**ไม่มีสมาชิกซ้ำกัน**และ**ไม่มีลำดับที่แน่นอน** ใช้ `set.remove(value)` เพื่อลบสมาชิก ถ้าสมาชิกไม่มีอยู่ `remove()` จะโยน **KeyError** ใช้ `set.discard(value)` แทนเพื่อลบอย่างปลอดภัยโดยไม่มีข้อผิดพลาด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:110:en"
  };

  // Lesson 111
  window.CONTENT_I18N["python:111"] = window.CONTENT_I18N["python:111"] || {};
  window.CONTENT_I18N["python:111"].th = {
    title: "การเพิ่มสมาชิกด้วย add() (shugou05.py)",
    concept: "เซ็ตคือชุดที่ไม่มีสมาชิกซ้ำกันและไม่มีลำดับที่แน่นอน สร้างเซ็ตโดยใช้เครื่องหมายปีกกา `{}` หรือฟังก์ชัน `set()` เซ็ตรองรับการดำเนินการทางคณิตศาสตร์เช่นอินเตอร์เซกชัน (`&`) และยูเนียน (`|`) ในการเพิ่มสมาชิกให้เซ็ต ใช้ `set.add(value)`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:111:en"
  };

  // Lesson 112
  window.CONTENT_I18N["python:112"] = window.CONTENT_I18N["python:112"] || {};
  window.CONTENT_I18N["python:112"].th = {
    title: "การลบรายการซ้ำในลิสต์โดยใช้เซ็ต (set_list.py)",
    concept: "ในการลบรายการซ้ำออกจากลิสต์ เทคนิค Python ทั่วไปคือการแปลงลิสต์เป็นเซ็ตด้วย `set()` (ซึ่งลบรายการซ้ำโดยอัตโนมัติ) จากนั้นแปลงกลับเป็นลิสต์ด้วย `list()` นี่เป็นวิธีที่รวดเร็วและกระชับในการลบข้อมูลที่ซ้ำกัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:112:en"
  };

  // Lesson 113
  window.CONTENT_I18N["python:113"] = window.CONTENT_I18N["python:113"] || {};
  window.CONTENT_I18N["python:113"].th = {
    title: "แบบฝึกหัด: สร้างและแสดงรายการคะแนน (script5-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 5 (script5-1.py)**\n\nภารกิจ: สร้างรายการคะแนนและแสดงผล\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:113:en"
  };

  // Lesson 114
  window.CONTENT_I18N["python:114"] = window.CONTENT_I18N["python:114"] || {};
  window.CONTENT_I18N["python:114"].th = {
    title: "แบบฝึกหัด: คำนวณรวมและเฉลี่ยโดยใช้ดัชนีลิสต์ (script5-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 5 (script5-2.py)**\n\nภารกิจ: คำนวณคะแนนรวมและเฉลี่ยโดยเข้าถึงสมาชิกลิสต์ตามดัชนี\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:114:en"
  };

  // Lesson 115
  window.CONTENT_I18N["python:115"] = window.CONTENT_I18N["python:115"] || {};
  window.CONTENT_I18N["python:115"].th = {
    title: "แบบฝึกหัด: การลบสมาชิกลิสต์อย่างปลอดภัย (script5-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 5 (script5-3.py)**\n\nภารกิจ: ลบสมาชิกจากลิสต์อย่างปลอดภัย\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:115:en"
  };

  // Lesson 116
  window.CONTENT_I18N["python:116"] = window.CONTENT_I18N["python:116"] || {};
  window.CONTENT_I18N["python:116"].th = {
    title: "แบบฝึกหัด: กำหนดดิกชันนารีชื่อนักเรียนและคะแนน (script5-4.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 5 (script5-4.py)**\n\nภารกิจ: กำหนดดิกชันนารีที่เก็บชื่อนักเรียนและคะแนน\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:116:en"
  };

  // Lesson 117
  window.CONTENT_I18N["python:117"] = window.CONTENT_I18N["python:117"] || {};
  window.CONTENT_I18N["python:117"].th = {
    title: "แบบฝึกหัด: กำหนดดิกชันนารีซ้อนสำหรับหลายวิชา (script5-5.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 5 (script5-5.py)**\n\nภารกิจ: กำหนดดิกชันนารีแบบซ้อนที่เก็บคะแนนนักเรียนหลายวิชา\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:117:en"
  };

  // Lesson 118
  window.CONTENT_I18N["python:118"] = window.CONTENT_I18N["python:118"] || {};
  window.CONTENT_I18N["python:118"].th = {
    title: "แบบฝึกหัด: การค้นหาอย่างปลอดภัยในดิกชันนารีซ้อน (script5-6.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 5 (script5-6.py)**\n\nภารกิจ: ป้อนชื่อนักเรียนเพื่อค้นหาคะแนนรายวิชาในดิกชันนารีซ้อน\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไป ใช้ `in` เพื่อตรวจสอบการมีอยู่ของคีย์ก่อนเข้าถึงดิกชันนารีเพื่อหลีกเลี่ยง KeyError",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:118:en"
  };

  // Lesson 119
  window.CONTENT_I18N["python:119"] = window.CONTENT_I18N["python:119"] || {};
  window.CONTENT_I18N["python:119"].th = {
    title: "การสร้างค่าต่อเนื่องด้วย range() (kurikaeshi01.py)",
    concept: "ใช้ลูป `for` เพื่อทำซ้ำกระบวนการตามจำนวนครั้งที่กำหนด `for i in range(5):` กำหนดจำนวนเต็มจาก 0 ถึง 4 ให้กับตัวแปร `i` และทำซ้ำ 5 ครั้ง `range(start, stop)` กำหนดจุดเริ่มต้นและจุดสิ้นสุดแบบไม่รวม `range(start, stop, step)` เพิ่มค่าขั้นบันได",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:119:en"
  };

  // Lesson 120
  window.CONTENT_I18N["python:120"] = window.CONTENT_I18N["python:120"] || {};
  window.CONTENT_I18N["python:120"].th = {
    title: "การระบุจุดเริ่มต้นและสิ้นสุดของ range() (kurikaeshi02.py)",
    concept: "ใช้ลูป `for` เพื่อทำซ้ำกระบวนการตามจำนวนครั้งที่กำหนด `for i in range(5):` กำหนดจำนวนเต็มจาก 0 ถึง 4 ให้กับตัวแปร `i` `range(3, 5)` สร้าง 3 ถึง 4 (ค่าสิ้นสุดไม่รวม) ใช้ `range(start, stop)` เพื่อควบคุมจุดเริ่มต้นและสิ้นสุด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:120:en"
  };

  // Lesson 121
  window.CONTENT_I18N["python:121"] = window.CONTENT_I18N["python:121"] || {};
  window.CONTENT_I18N["python:121"].th = {
    title: "การระบุขั้นบันไดบวกใน range() (kurikaeshi03.py)",
    concept: "ใช้ลูป `for` เพื่อทำซ้ำกระบวนการตามจำนวนครั้งที่กำหนด `range(1, 5, 2)` สร้าง 1, 3 — อาร์กิวเมนต์ที่สาม (step) ควบคุมการเพิ่มขึ้นระหว่างค่า `range(start, stop, step)` สร้างลำดับเลขคณิต",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:121:en"
  };

  // Lesson 122
  window.CONTENT_I18N["python:122"] = window.CONTENT_I18N["python:122"] || {};
  window.CONTENT_I18N["python:122"].th = {
    title: "การระบุขั้นบันไดลบใน range() (kurikaeshi04.py)",
    concept: "ใช้ลูป `for` เพื่อทำซ้ำกระบวนการตามจำนวนครั้งที่กำหนด `range(10, 4, -2)` สร้าง 10, 8, 6 — ขั้นบันไดลบสร้างลำดับลดลง ค่าเริ่มต้นต้องมากกว่าค่าสิ้นสุดเมื่อใช้ขั้นบันไดลบ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:122:en"
  };

  // Lesson 123
  window.CONTENT_I18N["python:123"] = window.CONTENT_I18N["python:123"] || {};
  window.CONTENT_I18N["python:123"].th = {
    title: "การทำซ้ำด้วยลูป for (kurikaeshi05.py)",
    concept: "ใช้ลูป `for` เพื่อทำซ้ำกระบวนการตามจำนวนครั้งที่กำหนด `for i in range(3):` กำหนด 0, 1, 2 ให้กับตัวแปร `i` ตามลำดับ รันบล็อกที่เยื้องในแต่ละครั้ง ใส่เครื่องหมายทวิภาค `:` และเยื้อง 4 ช่องว่างเสมอ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:123:en"
  };

  // Lesson 124
  window.CONTENT_I18N["python:124"] = window.CONTENT_I18N["python:124"] || {};
  window.CONTENT_I18N["python:124"].th = {
    title: "การวนลูปด้วยค่าลดลง (kurikaeshi06.py)",
    concept: "การใช้ลูป `for` คุณสามารถวนผ่านชุดข้อมูลโดยดึงสมาชิกตั้งแต่ต้นจนจบ `for item in list:` ประมวลผลแต่ละสมาชิก เมื่อใช้กับดิกชันนารี ลูปจะดึงคีย์ตามค่าเริ่มต้น ขั้นบันไดลบใน `range()` สร้างลูปแบบลดลง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:124:en"
  };

  // Lesson 125
  window.CONTENT_I18N["python:125"] = window.CONTENT_I18N["python:125"] || {};
  window.CONTENT_I18N["python:125"].th = {
    title: "การวนลิสต์ตามดัชนี (kurikaeshi07.py)",
    concept: "การใช้ลูป `for` คุณสามารถวนผ่านชุดข้อมูลโดยดึงสมาชิกตั้งแต่ต้นจนจบ `for i in range(len(lst)):` ให้คุณสำรวจลิสต์โดยใช้ดัชนี เข้าถึงแต่ละสมาชิกด้วย `lst[i]` ต้องใช้เครื่องหมายทวิภาค `:` และเยื้อง 4 ช่องว่าง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:125:en"
  };

  // Lesson 126
  window.CONTENT_I18N["python:126"] = window.CONTENT_I18N["python:126"] || {};
  window.CONTENT_I18N["python:126"].th = {
    title: "การวนลิสต์โดยตรงด้วย for...in (kurikaeshi08.py)",
    concept: "การใช้ลูป `for` คุณสามารถวนผ่านชุดข้อมูลโดยดึงสมาชิกตั้งแต่ต้นจนจบ `for v in lst:` ให้แต่ละสมาชิกในลิสต์โดยตรงโดยไม่ต้องใช้ดัชนี เมื่อใช้กับดิกชันนารี ลูปจะดึงคีย์ตามค่าเริ่มต้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:126:en"
  };

  // Lesson 127
  window.CONTENT_I18N["python:127"] = window.CONTENT_I18N["python:127"] || {};
  window.CONTENT_I18N["python:127"].th = {
    title: "การวนเซ็ตด้วยลูป for (kurikaeshi09.py)",
    concept: "การใช้ลูป `for` คุณสามารถวนผ่านชุดข้อมูลโดยดึงสมาชิกตั้งแต่ต้นจนจบ `for v in st:` ใช้กับเซ็ตได้เช่นกัน วนผ่านแต่ละสมาชิก จำไว้ว่าเซ็ตไม่เรียงลำดับ ดังนั้นลำดับการวนไม่รับประกัน ใส่เครื่องหมายทวิภาค `:` และการเยื้องที่ถูกต้องเสมอ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:127:en"
  };

  // Lesson 128
  window.CONTENT_I18N["python:128"] = window.CONTENT_I18N["python:128"] || {};
  window.CONTENT_I18N["python:128"].th = {
    title: "การวนคีย์ดิกชันนารี (kurikaeshi10.py)",
    concept: "การใช้ลูป `for` คุณสามารถวนผ่านชุดข้อมูลโดยดึงสมาชิกตั้งแต่ต้นจนจบ `for k in dct:` วนผ่านคีย์ของดิกชันนารีตามค่าเริ่มต้น ใช้ `dct[k]` ภายในลูปเพื่อเข้าถึงค่าที่สอดคล้องกัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:128:en"
  };

  // Lesson 129
  window.CONTENT_I18N["python:129"] = window.CONTENT_I18N["python:129"] || {};
  window.CONTENT_I18N["python:129"].th = {
    title: "การอ่านค่าดิกชันนารีตามคีย์ในลูป (kurikaeshi11.py)",
    concept: "ลูป `while` ทำซ้ำตราบเท่าที่เงื่อนไขยังคงเป็น `True` เมื่อเงื่อนไขกลายเป็น `False` ลูปจะสิ้นสุด ระวังการอัปเดตเงื่อนไขภายในลูป มิฉะนั้นจะกลายเป็นลูปอนันต์ที่ไม่สิ้นสุด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:129:en"
  };

  // Lesson 130
  window.CONTENT_I18N["python:130"] = window.CONTENT_I18N["python:130"] || {};
  window.CONTENT_I18N["python:130"].th = {
    title: "การวนคู่คีย์-ค่าดิกชันนารีด้วย items() (kurikaeshi12.py)",
    concept: "ลูป `while` ทำซ้ำตราบเท่าที่เงื่อนไขยังคงเป็น `True` ใช้ `dict.items()` เพื่อรับมุมมองของคู่คีย์-ค่าเป็นทูเพิล `for kv in dct.items():` วนผ่านแต่ละทูเพิลคู่คีย์-ค่า ซึ่งสามารถแกะกล่องหรือเข้าถึงด้วยดัชนี",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:130:en"
  };

  // Lesson 131
  window.CONTENT_I18N["python:131"] = window.CONTENT_I18N["python:131"] || {};
  window.CONTENT_I18N["python:131"].th = {
    title: "การวนคีย์และค่าดิกชันนารีด้วยการแกะกล่อง (kurikaeshi13.py)",
    concept: "ลูป `while` ทำซ้ำตราบเท่าที่เงื่อนไขยังคงเป็น `True` ใช้การแกะกล่องทูเพิลในลูป `for`: `for k, v in dct.items():` กำหนดแต่ละคีย์และค่าให้กับตัวแปร `k` และ `v` โดยตรง ทำให้โค้ดสะอาดและอ่านง่ายขึ้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:131:en"
  };

  // Lesson 132
  window.CONTENT_I18N["python:132"] = window.CONTENT_I18N["python:132"] || {};
  window.CONTENT_I18N["python:132"].th = {
    title: "การวนลูปแบบมีเงื่อนไขด้วย while (kurikaeshi14.py)",
    concept: "เมื่อคำสั่ง `break` ถูกดำเนินการภายในลูป มันจะยุติลูปทันที และการทำงานจะดำเนินต่อด้วยโค้ดหลังจากลูป `break` มักใช้ร่วมกับคำสั่ง `if` เพื่อออกจากลูปเมื่อตรงตามเงื่อนไข",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:132:en"
  };

  // Lesson 133
  window.CONTENT_I18N["python:133"] = window.CONTENT_I18N["python:133"] || {};
  window.CONTENT_I18N["python:133"].th = {
    title: "การประมวลผลตัวนับด้วย while (kurikaeshi15.py)",
    concept: "เมื่อคำสั่ง `break` ถูกดำเนินการภายในลูป มันจะยุติลูปทันที ลูป `while` ที่มีตัวแปรตัวนับเป็นรูปแบบทั่วไป: อัปเดตตัวนับภายในลูปเพื่อให้เงื่อนไขกลายเป็น `False` ในที่สุดและลูปสิ้นสุดตามธรรมชาติ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:133:en"
  };

  // Lesson 134
  window.CONTENT_I18N["python:134"] = window.CONTENT_I18N["python:134"] || {};
  window.CONTENT_I18N["python:134"].th = {
    title: "ลูปอนันต์ด้วย while True (kurikaeshi16.py)",
    concept: "เมื่อคำสั่ง `continue` ถูกดำเนินการ โค้ดที่เหลือในการวนซ้ำปัจจุบันจะถูกข้าม และการทำงานจะข้ามไปยังการวนซ้ำถัดไป (ด้านบนของลูป) เข้าใจความแตกต่าง: `break` ออกจากลูปทั้งหมด ในขณะที่ `continue` ข้ามเฉพาะรอบปัจจุบัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:134:en"
  };

  // Lesson 135
  window.CONTENT_I18N["python:135"] = window.CONTENT_I18N["python:135"] || {};
  window.CONTENT_I18N["python:135"].th = {
    title: "การออกจากลูปอนันต์ด้วย break (kurikaeshi17.py)",
    concept: "เมื่อคำสั่ง `continue` ถูกดำเนินการ โค้ดที่เหลือในการวนซ้ำปัจจุบันจะถูกข้าม ใช้ `break` ภายในลูป `while True` อนันต์เพื่อออกเมื่อตรงตามเงื่อนไขที่กำหนด รูปแบบนี้พบได้ทั่วไปในโปรแกรมที่ขับเคลื่อนด้วยเมนูที่ผู้ใช้เป็นผู้ตัดสินใจเมื่อจะออก",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:135:en"
  };

  // Lesson 136
  window.CONTENT_I18N["python:136"] = window.CONTENT_I18N["python:136"] || {};
  window.CONTENT_I18N["python:136"].th = {
    title: "การข้ามการวนซ้ำด้วย continue (kurikaeshi18.py)",
    concept: "เมื่อคำสั่ง `continue` ถูกดำเนินการ โค้ดที่เหลือในการวนซ้ำปัจจุบันจะถูกข้าม และการทำงานจะข้ามไปยังด้านบนของลูปสำหรับการวนซ้ำถัดไป `continue` มีประโยชน์สำหรับการข้ามค่าที่ไม่ต้องการในขณะที่ให้ลูปทำงานต่อไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:136:en"
  };

  // Lesson 137
  window.CONTENT_I18N["python:137"] = window.CONTENT_I18N["python:137"] || {};
  window.CONTENT_I18N["python:137"].th = {
    title: "แบบฝึกหัด: การใช้ลูป for เพื่อรวมคะแนนในลิสต์ (script6-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 6 (script6-1.py)**\n\nภารกิจ: คำนวณคะแนนรวมและเฉลี่ยของคะแนนที่เก็บในลิสต์โดยใช้ลูป `for`\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์ กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:137:en"
  };

  // Lesson 138
  window.CONTENT_I18N["python:138"] = window.CONTENT_I18N["python:138"] || {};
  window.CONTENT_I18N["python:138"].th = {
    title: "แบบฝึกหัด: พิมพ์คะแนนนักเรียนทั้งหมดด้วยลูปดิกชันนารี (script6-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 6 (script6-2.py)**\n\nภารกิจ: ใช้ลูป `for` กับ `items()` เพื่อวนผ่านดิกชันนารีและพิมพ์ชื่อนักเรียนและคะแนนทั้งหมด\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไป กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:138:en"
  };

  // Lesson 139
  window.CONTENT_I18N["python:139"] = window.CONTENT_I18N["python:139"] || {};
  window.CONTENT_I18N["python:139"].th = {
    title: "แบบฝึกหัด: การค้นหาคะแนนแบบโต้ตอบด้วยลูป while อนันต์ (script6-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 6 (script6-3.py)**\n\nภารกิจ: สร้างระบบค้นหาคะแนนนักเรียนแบบโต้ตอบโดยใช้ลูป `while True` อนันต์กับ `break`\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไป กดปุ่ม Run ทางด้านขวาเพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:139:en"
  };

  // Lesson 140
  window.CONTENT_I18N["python:140"] = window.CONTENT_I18N["python:140"] || {};
  window.CONTENT_I18N["python:140"].th = {
    title: "การกำหนดและเรียกใช้ฟังก์ชันไม่มีพารามิเตอร์ (kansu01.py)",
    concept: "**ฟังก์ชัน** คือหน่วยโปรแกรมอิสระที่รวมหลายคำสั่งเข้าด้วยกัน กำหนดฟังก์ชันด้วย `def function_name():` เยื้องเนื้อหา และเรียกใช้ด้วย `function_name()` ฟังก์ชันช่วยหลีกเลี่ยงการเขียนโค้ดซ้ำ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:140:en"
  };

  // Lesson 141
  window.CONTENT_I18N["python:141"] = window.CONTENT_I18N["python:141"] || {};
  window.CONTENT_I18N["python:141"].th = {
    title: "ลำดับการกำหนดฟังก์ชันและข้อผิดพลาด (kansu02.py)",
    concept: "**ฟังก์ชัน** คือหน่วยโปรแกรมอิสระที่รวมหลายคำสั่งเข้าด้วยกัน ใน Python ฟังก์ชันต้องถูก**กำหนดก่อนถูกเรียกใช้** ถ้าคุณเรียกใช้ฟังก์ชันก่อนกำหนด Python จะโยน `NameError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:141:en"
  };

  // Lesson 142
  window.CONTENT_I18N["python:142"] = window.CONTENT_I18N["python:142"] || {};
  window.CONTENT_I18N["python:142"].th = {
    title: "การเรียกใช้ฟังก์ชันเดียวกันหลายครั้ง (kansu03.py)",
    concept: "**ฟังก์ชัน** คือหน่วยโปรแกรมอิสระที่รวมหลายคำสั่งเข้าด้วยกัน คุณสามารถเรียกใช้ฟังก์ชันเดียวกันหลายครั้ง รวมถึงภายในลูป แต่ละครั้งที่เรียกใช้จะดำเนินการเนื้อหาฟังก์ชันตั้งแต่ต้น ทำให้โค้ดสามารถนำกลับมาใช้ใหม่ได้",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:142:en"
  };

  // Lesson 143
  window.CONTENT_I18N["python:143"] = window.CONTENT_I18N["python:143"] || {};
  window.CONTENT_I18N["python:143"].th = {
    title: "การกำหนดฟังก์ชันที่มีพารามิเตอร์เดียว (kansu04.py)",
    concept: "**ฟังก์ชัน** คือหน่วยโปรแกรมอิสระที่รวมหลายคำสั่งเข้าด้วยกัน กำหนดฟังก์ชันที่มีพารามิเตอร์ภายในวงเล็บ: `def function_name(param):` พารามิเตอร์ทำหน้าที่เป็นตัวแปรที่รับค่าที่ส่งเมื่อเรียกใช้ฟังก์ชัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:143:en"
  };

  // Lesson 144
  window.CONTENT_I18N["python:144"] = window.CONTENT_I18N["python:144"] || {};
  window.CONTENT_I18N["python:144"].th = {
    title: "การส่งชนิดข้อมูลต่างๆ เป็นอาร์กิวเมนต์ (kansu05.py)",
    concept: "**ฟังก์ชัน** คือหน่วยโปรแกรมอิสระที่รวมหลายคำสั่งเข้าด้วยกัน พารามิเตอร์สามารถรับอาร์กิวเมนต์ของชนิดข้อมูลต่างๆ ฟังก์ชันจะประมวลผลค่าที่ส่งไป ตราบใดที่การดำเนินการภายในเข้ากันได้กับชนิดข้อมูลนั้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:144:en"
  };

  // Lesson 145
  window.CONTENT_I18N["python:145"] = window.CONTENT_I18N["python:145"] || {};
  window.CONTENT_I18N["python:145"].th = {
    title: "การกำหนดฟังก์ชันที่มีหลายพารามิเตอร์ (kansu06.py)",
    concept: "**พารามิเตอร์** คือข้อมูลที่ส่งเข้าสู่ฟังก์ชันจากภายนอกเมื่อเรียกใช้ กำหนดภายในวงเล็บเช่น `def cook(food):` ฟังก์ชันสามารถมีหลายพารามิเตอร์คั่นด้วยเครื่องหมายจุลภาค ลำดับของอาร์กิวเมนต์ต้องตรงกับลำดับพารามิเตอร์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:145:en"
  };

  // Lesson 146
  window.CONTENT_I18N["python:146"] = window.CONTENT_I18N["python:146"] || {};
  window.CONTENT_I18N["python:146"].th = {
    title: "ลำดับการส่งอาร์กิวเมนต์และการจับคู่ชนิด (kansu07.py)",
    concept: "**พารามิเตอร์** คือข้อมูลที่ส่งเข้าสู่ฟังก์ชันจากภายนอกเมื่อเรียกใช้ อาร์กิวเมนต์ถูกกำหนดให้พารามิเตอร์ตามตำแหน่ง — อาร์กิวเมนต์แรกไปยังพารามิเตอร์แรก และต่อไปเรื่อยๆ การใช้ตัวแปรเป็นอาร์กิวเมนต์ก็ทำงานในลักษณะเดียวกัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:146:en"
  };

  // Lesson 147
  window.CONTENT_I18N["python:147"] = window.CONTENT_I18N["python:147"] || {};
  window.CONTENT_I18N["python:147"].th = {
    title: "พารามิเตอร์ฟังก์ชันที่มีค่าเริ่มต้น (kansu09.py)",
    concept: "**พารามิเตอร์** คือข้อมูลที่ส่งเข้าสู่ฟังก์ชันจากภายนอกเมื่อเรียกใช้ พารามิเตอร์สามารถมีค่าเริ่มต้นกำหนดด้วย `=` เช่น `def cook(name='Curry'):` เมื่อละเว้นอาร์กิวเมนต์ ค่าเริ่มต้นจะถูกใช้โดยอัตโนมัติ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:147:en"
  };

  // Lesson 148
  window.CONTENT_I18N["python:148"] = window.CONTENT_I18N["python:148"] || {};
  window.CONTENT_I18N["python:148"].th = {
    title: "การละเว้นอาร์กิวเมนต์เริ่มต้น (kansu10.py)",
    concept: "**พารามิเตอร์** คือข้อมูลที่ส่งเข้าสู่ฟังก์ชันจากภายนอกเมื่อเรียกใช้ ถ้าพารามิเตอร์มีค่าเริ่มต้น คุณสามารถละเว้นอาร์กิวเมนต์นั้นเมื่อเรียกใช้ฟังก์ชัน คุณยังคงสามารถแทนที่ค่าเริ่มต้นโดยส่งค่าที่แตกต่างอย่างชัดเจน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:148:en"
  };

  // Lesson 149
  window.CONTENT_I18N["python:149"] = window.CONTENT_I18N["python:149"] || {};
  window.CONTENT_I18N["python:149"].th = {
    title: "การใช้คีย์เวิร์ดอาร์กิวเมนต์ (kansu11.py)",
    concept: "**ค่าส่งกลับ** คือผลลัพธ์ที่ฟังก์ชันส่งกลับไปยังผู้เรียกใช้โดยใช้ `return value` เมื่อ `return` ถูกดำเนินการ ฟังก์ชันจะออกทันทีและส่งค่ากลับ คีย์เวิร์ดอาร์กิวเมนต์ให้คุณระบุว่าพารามิเตอร์ใดได้รับค่าใดตามชื่อ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:149:en"
  };

  // Lesson 150
  window.CONTENT_I18N["python:150"] = window.CONTENT_I18N["python:150"] || {};
  window.CONTENT_I18N["python:150"].th = {
    title: "พารามิเตอร์เริ่มต้นต้องอยู่หลังพารามิเตอร์ปกติ (kansu12.py)",
    concept: "**ค่าส่งกลับ** คือผลลัพธ์ที่ฟังก์ชันส่งกลับไปยังผู้เรียกใช้โดยใช้ `return value` ใน Python พารามิเตอร์ที่มีค่าเริ่มต้นต้องถูกกำหนด**หลัง**พารามิเตอร์ทั้งหมดที่ไม่มีค่าเริ่มต้น มิฉะนั้นจะเกิด `SyntaxError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:150:en"
  };

  // Lesson 151
  window.CONTENT_I18N["python:151"] = window.CONTENT_I18N["python:151"] || {};
  window.CONTENT_I18N["python:151"].th = {
    title: "อาร์กิวเมนต์แปรผัน (*args) (kansu13.py)",
    concept: "**ค่าส่งกลับ** คือผลลัพธ์ที่ฟังก์ชันส่งกลับไปยังผู้เรียกใช้โดยใช้ `return value` ใช้ `*args` เพื่อรับอาร์กิวเมนต์ตามตำแหน่งจำนวนแปรผัน `args` กลายเป็นทูเพิลภายในฟังก์ชัน มีประโยชน์เมื่อคุณไม่ทราบว่าจะส่งอาร์กิวเมนต์มากี่ตัว",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:151:en"
  };

  // Lesson 152
  window.CONTENT_I18N["python:152"] = window.CONTENT_I18N["python:152"] || {};
  window.CONTENT_I18N["python:152"].th = {
    title: "คีย์เวิร์ดอาร์กิวเมนต์แปรผัน (**kwargs) (kansu14.py)",
    concept: "**ค่าส่งกลับ** คือผลลัพธ์ที่ฟังก์ชันส่งกลับไปยังผู้เรียกใช้โดยใช้ `return value` ใช้ `**kwargs` เพื่อรับคีย์เวิร์ดอาร์กิวเมนต์จำนวนแปรผัน `kwargs` กลายเป็นดิกชันนารีภายในฟังก์ชัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:152:en"
  };

  // Lesson 153
  window.CONTENT_I18N["python:153"] = window.CONTENT_I18N["python:153"] || {};
  window.CONTENT_I18N["python:153"].th = {
    title: "การรวมอาร์กิวเมนต์ปกติและแปรผัน (kansu15.py)",
    concept: "**ค่าส่งกลับ** คือผลลัพธ์ที่ฟังก์ชันส่งกลับไปยังผู้เรียกใช้โดยใช้ `return value` คุณสามารถรวมพารามิเตอร์ปกติ `*args` และ `**kwargs` ในการกำหนดฟังก์ชันเดียว",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:153:en"
  };

  // Lesson 154
  window.CONTENT_I18N["python:154"] = window.CONTENT_I18N["python:154"] || {};
  window.CONTENT_I18N["python:154"].th = {
    title: "การใช้งานพารามิเตอร์ค่าเริ่มต้นขั้นสูง (kansu16.py)",
    concept: "เมื่อกำหนดฟังก์ชัน คุณสามารถตั้งค่าเริ่มต้นสำหรับพารามิเตอร์เช่น `def greet(name='Guest'):` ถ้าละเว้นอาร์กิวเมนต์เมื่อเรียกใช้ จะใช้ค่าเริ่มต้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:154:en"
  };

  // Lesson 155
  window.CONTENT_I18N["python:155"] = window.CONTENT_I18N["python:155"] || {};
  window.CONTENT_I18N["python:155"].th = {
    title: "การคืนค่าด้วย return (kansu17.py)",
    concept: "เมื่อกำหนดฟังก์ชัน คุณสามารถตั้งค่าเริ่มต้นสำหรับพารามิเตอร์เช่น `def greet(name='Guest'):` คำสั่ง `return` ส่งค่ากลับจากฟังก์ชันไปยังผู้เรียกใช้ เมื่อ `return` ทำงาน ฟังก์ชันจะออกทันที",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:155:en"
  };

  // Lesson 156
  window.CONTENT_I18N["python:156"] = window.CONTENT_I18N["python:156"] || {};
  window.CONTENT_I18N["python:156"].th = {
    title: "แบบฝึกหัด: ฟังก์ชันที่พิมพ์คะแนนรวมและเฉลี่ย (script7-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 7 (script7-1.py)**\n\nภารกิจ: กำหนดฟังก์ชันที่รับคะแนนสามตัวและพิมพ์รวมและเฉลี่ย\n\nตรวจสอบโค้ดเทมเพลตในโปรแกรมแก้ไขและเติมส่วนที่ขาดหายไปให้สมบูรณ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:156:en"
  };

  // Lesson 157
  window.CONTENT_I18N["python:157"] = window.CONTENT_I18N["python:157"] || {};
  window.CONTENT_I18N["python:157"].th = {
    title: "การรับค่าส่งกลับในตัวแปร (kansu18.py)",
    concept: "เมื่อกำหนดฟังก์ชัน คุณสามารถตั้งค่าเริ่มต้นสำหรับพารามิเตอร์เช่น `def greet(name='Guest'):` ฟังก์ชันสามารถคืนค่าที่ผู้เรียกใช้รับไว้ได้",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:157:en"
  };

  // Lesson 158
  window.CONTENT_I18N["python:158"] = window.CONTENT_I18N["python:158"] || {};
  window.CONTENT_I18N["python:158"].th = {
    title: "การยุติฟังก์ชันก่อนกำหนดด้วย return (kansu19.py)",
    concept: "เมื่อกำหนดฟังก์ชัน คุณสามารถตั้งค่าเริ่มต้นสำหรับพารามิเตอร์เช่น `def greet(name='Guest'):` คำสั่ง `return` สามารถใช้เพื่อออกจากฟังก์ชันก่อนกำหนด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:158:en"
  };

  // Lesson 159
  window.CONTENT_I18N["python:159"] = window.CONTENT_I18N["python:159"] || {};
  window.CONTENT_I18N["python:159"].th = {
    title: "การคืนค่าหลายค่าจากฟังก์ชัน (การแกะกล่องทูเพิล) (kansu20.py)",
    concept: "เมื่อกำหนดฟังก์ชัน คุณสามารถตั้งค่าเริ่มต้นสำหรับพารามิเตอร์เช่น `def greet(name='Guest'):` Python อนุญาตให้คืนค่าหลายค่าโดยคั่นด้วยเครื่องหมายจุลภาคในคำสั่ง `return`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:159:en"
  };

  // Lesson 160
  window.CONTENT_I18N["python:160"] = window.CONTENT_I18N["python:160"] || {};
  window.CONTENT_I18N["python:160"].th = {
    title: "ตัวแปรเฉพาะที่กับตัวแปรส่วนกลาง (kansu_a1.py)",
    concept: "ตัวแปรที่กำหนดภายในฟังก์ชันคือ**ตัวแปรเฉพาะที่** — สามารถเข้าถึงได้เฉพาะภายในฟังก์ชันนั้น การพยายามใช้ตัวแปรเฉพาะที่นอกฟังก์ชันจะโยน `NameError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:160:en"
  };

  // Lesson 161
  window.CONTENT_I18N["python:161"] = window.CONTENT_I18N["python:161"] || {};
  window.CONTENT_I18N["python:161"].th = {
    title: "แบบฝึกหัด: ฟังก์ชันที่มีค่าส่งกลับสำหรับการคำนวณ (script7-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 7 (script7-2.py)**\n\nภารกิจ: กำหนดฟังก์ชันที่มีค่าส่งกลับที่ทำการคำนวณและดึงผลลัพธ์\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป กดปุ่ม Run เพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:161:en"
  };

  // Lesson 162
  window.CONTENT_I18N["python:162"] = window.CONTENT_I18N["python:162"] || {};
  window.CONTENT_I18N["python:162"].th = {
    title: "แบบฝึกหัด: ฟังก์ชันประมวลผลเกรดที่มีค่าเริ่มต้น (script7-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 7 (script7-3.py)**\n\nภารกิจ: กำหนดฟังก์ชันประมวลผลเกรดที่มีพารามิเตอร์ค่าเริ่มต้นและค่าส่งกลับ\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป กดปุ่ม Run เพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:162:en"
  };

  // Lesson 163
  window.CONTENT_I18N["python:163"] = window.CONTENT_I18N["python:163"] || {};
  window.CONTENT_I18N["python:163"].th = {
    title: "การกำหนดคลาสพื้นฐานและอินสแตนซ์ว่าง (class01.py)",
    concept: "**คลาส** คือพิมพ์เขียวสำหรับสร้างออบเจ็กต์ กำหนดคลาสด้วย `class ClassName:` และกำหนด**ตัวแปรอินสแตนซ์ (แอตทริบิวต์)** ภายในเพื่อเก็บข้อมูล",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:163:en"
  };

  // Lesson 164
  window.CONTENT_I18N["python:164"] = window.CONTENT_I18N["python:164"] || {};
  window.CONTENT_I18N["python:164"].th = {
    title: "การตั้งค่าเริ่มต้นของคอนสตรักเตอร์ (class02.py)",
    concept: "**คอนสตรักเตอร์** (เมธอด `__init__` ใน Python) ถูกดำเนินการโดยอัตโนมัติเมื่อสร้างออบเจ็กต์จากคลาส พารามิเตอร์แรกคือ `self` เสมอ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:164:en"
  };

  // Lesson 165
  window.CONTENT_I18N["python:165"] = window.CONTENT_I18N["python:165"] || {};
  window.CONTENT_I18N["python:165"].th = {
    title: "การกำหนดเมธอดและคีย์เวิร์ด self (class03.py)",
    concept: "ฟังก์ชันที่กำหนดภายในคลาสเรียกว่า**เมธอด** พารามิเตอร์แรกของทุกเมธอดคือ `self` ซึ่งหมายถึงอินสแตนซ์ปัจจุบัน เข้าถึงตัวแปรอินสแตนซ์ด้วย `self.variable_name`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:165:en"
  };

  // Lesson 166
  window.CONTENT_I18N["python:166"] = window.CONTENT_I18N["python:166"] || {};
  window.CONTENT_I18N["python:166"].th = {
    title: "ตัวแปรคลาสกับตัวแปรอินสแตนซ์ (class04.py)",
    concept: "**ตัวแปรคลาส** ใช้ร่วมกันทุกอินสแตนซ์ของคลาส **ตัวแปรอินสแตนซ์** เฉพาะแต่ละอินสแตนซ์ (กำหนดใน `__init__` โดยใช้ `self`)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:166:en"
  };

  // Lesson 167
  window.CONTENT_I18N["python:167"] = window.CONTENT_I18N["python:167"] || {};
  window.CONTENT_I18N["python:167"].th = {
    title: "แบบฝึกหัด: กำหนดคลาส Student ที่เก็บคะแนน (script8-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 8 (script8-1.py)**\n\nภารกิจ: กำหนดคลาส Student ที่เก็บชื่อนักเรียนและคะแนนรายวิชา\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป กดปุ่ม Run เพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:167:en"
  };

  // Lesson 168
  window.CONTENT_I18N["python:168"] = window.CONTENT_I18N["python:168"] || {};
  window.CONTENT_I18N["python:168"].th = {
    title: "แบบฝึกหัด: คำนวณรวมและเฉลี่ยด้วยเมธอดคลาส (script8-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 8 (script8-2.py)**\n\nภารกิจ: กำหนดคลาส Student ที่มีเมธอดสำหรับคำนวณรวมและเฉลี่ย\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป กดปุ่ม Run เพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:168:en"
  };

  // Lesson 169
  window.CONTENT_I18N["python:169"] = window.CONTENT_I18N["python:169"] || {};
  window.CONTENT_I18N["python:169"].th = {
    title: "แบบฝึกหัด: วนผ่านรายการอินสแตนซ์และพิมพ์คะแนน (script8-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 8 (script8-3.py)**\n\nภารกิจ: สร้างอินสแตนซ์ Student หลายตัว เก็บในลิสต์ และวนพิมพ์คะแนนทั้งหมด\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป กดปุ่ม Run เพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:169:en"
  };

  // Lesson 170
  window.CONTENT_I18N["python:170"] = window.CONTENT_I18N["python:170"] || {};
  window.CONTENT_I18N["python:170"].th = {
    title: "การสร้างโมดูลฟังก์ชัน (my_func.py)",
    concept: "**โมดูล** คือไฟล์ที่ประกอบด้วยฟังก์ชันและคลาส ใช้ `import` เพื่อนำเข้าฟังก์ชันจากโมดูลอื่น เมื่อนำเข้าแล้ว ฟังก์ชันจะถูกเรียกใช้ด้วย `module_name.function_name()`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:170:en"
  };

  // Lesson 171
  window.CONTENT_I18N["python:171"] = window.CONTENT_I18N["python:171"] || {};
  window.CONTENT_I18N["python:171"].th = {
    title: "การสร้างโมดูลคลาส (my_class.py)",
    concept: "**โมดูล** คือไฟล์ที่ประกอบด้วยคลาสและฟังก์ชันที่นำกลับมาใช้ใหม่ได้ ใช้ `import` เพื่อนำเข้าคลาสจากโมดูลอื่น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:171:en"
  };

  // Lesson 172
  window.CONTENT_I18N["python:172"] = window.CONTENT_I18N["python:172"] || {};
  window.CONTENT_I18N["python:172"].th = {
    title: "สคริปต์โมดูลแบบผสม (calc_account.py)",
    concept: "**โมดูล** คือไฟล์ Python ที่มีฟังก์ชัน คลาส และตัวแปรที่สามารถนำเข้าและใช้ในไฟล์อื่นได้ โมดูลช่วยในการจัดระเบียบโค้ด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:172:en"
  };

  // Lesson 173
  window.CONTENT_I18N["python:173"] = window.CONTENT_I18N["python:173"] || {};
  window.CONTENT_I18N["python:173"].th = {
    title: "การกำหนดคลาสภายในแพ็กเกจ (my_class.py)",
    concept: "**แพ็กเกจ** คือโฟลเดอร์ที่มีไฟล์ `__init__.py` และโมดูลตั้งแต่หนึ่งโมดูลขึ้นไป จัดกลุ่มโมดูลที่เกี่ยวข้องกันเป็นลำดับชั้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:173:en"
  };

  // Lesson 174
  window.CONTENT_I18N["python:174"] = window.CONTENT_I18N["python:174"] || {};
  window.CONTENT_I18N["python:174"].th = {
    title: "การกำหนดฟังก์ชันภายในแพ็กเกจ (my_func.py)",
    concept: "**แพ็กเกจ** คือวิธีจัดระเบียบโมดูลที่เกี่ยวข้องกันเป็นลำดับชั้นของไดเรกทอรี แพ็กเกจมีไฟล์ `__init__.py`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:174:en"
  };

  // Lesson 175
  window.CONTENT_I18N["python:175"] = window.CONTENT_I18N["python:175"] || {};
  window.CONTENT_I18N["python:175"].th = {
    title: "การกำหนดฟังก์ชันภายในแพ็กเกจย่อยซ้อน (my_func.py)",
    concept: "**แพ็กเกจ** สามารถซ้อนกันเป็นลำดับชั้นได้ แพ็กเกจย่อยคือโฟลเดอร์ที่มี `__init__.py` อยู่ภายในแพ็กเกจอื่น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:175:en"
  };

  // Lesson 176
  window.CONTENT_I18N["python:176"] = window.CONTENT_I18N["python:176"] || {};
  window.CONTENT_I18N["python:176"].th = {
    title: "การโหลดโมดูลด้วย import (script.py)",
    concept: "ใช้ `import module_name` เพื่อนำเข้าโมดูลทั้งหมด หลังจากนำเข้า เข้าถึงฟังก์ชันและคลาสด้วย `module_name.function_name()`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:176:en"
  };

  // Lesson 177
  window.CONTENT_I18N["python:177"] = window.CONTENT_I18N["python:177"] || {};
  window.CONTENT_I18N["python:177"].th = {
    title: "การนำเข้าโมดูลจากแพ็กเกจ (script_package01.py)",
    concept: "ใช้ `import package_name.module_name` เพื่อนำเข้าโมดูลเฉพาะจากแพ็กเกจ เช่น `import shop.money`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:177:en"
  };

  // Lesson 178
  window.CONTENT_I18N["python:178"] = window.CONTENT_I18N["python:178"] || {};
  window.CONTENT_I18N["python:178"].th = {
    title: "การนำเข้าจากแพ็กเกจซ้อน (script_package02.py)",
    concept: "แพ็กเกจสามารถซ้อนกันเป็นลำดับชั้นได้ ใช้ `import parent.sub.module` เพื่อนำเข้าโมดูลจากแพ็กเกจย่อย",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:178:en"
  };

  // Lesson 179
  window.CONTENT_I18N["python:179"] = window.CONTENT_I18N["python:179"] || {};
  window.CONTENT_I18N["python:179"].th = {
    title: "ไฟล์เริ่มต้นแพ็กเกจ (__init__.py)",
    concept: "ไฟล์ `__init__.py` บอกให้ Python ทราบว่าไดเรกทอรีนั้นเป็นแพ็กเกจ สามารถเว้นว่างหรือมีโค้ดเริ่มต้นสำหรับแพ็กเกจได้",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:179:en"
  };

  // Lesson 180
  window.CONTENT_I18N["python:180"] = window.CONTENT_I18N["python:180"] || {};
  window.CONTENT_I18N["python:180"].th = {
    title: "การนำเข้าโมดูลเฉพาะด้วย from (script_package03.py)",
    concept: "ใช้ `from package import module` เพื่อนำเข้าโมดูลเฉพาะโดยไม่ต้องใช้คำนำหน้าแพ็กเกจ จากนั้นเรียกใช้เนื้อหาโดยตรง: `module.function()`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:180:en"
  };

  // Lesson 181
  window.CONTENT_I18N["python:181"] = window.CONTENT_I18N["python:181"] || {};
  window.CONTENT_I18N["python:181"].th = {
    title: "การนำเข้าฟังก์ชันเฉพาะโดยตรงด้วย from (script_package04.py)",
    concept: "ใช้ `from module import function_name` เพื่อนำเข้าฟังก์ชันเฉพาะเข้าสู่เนมสเปซปัจจุบัน จากนั้นเรียกใช้ฟังก์ชันโดยตรง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:181:en"
  };

  // Lesson 182
  window.CONTENT_I18N["python:182"] = window.CONTENT_I18N["python:182"] || {};
  window.CONTENT_I18N["python:182"].th = {
    title: "การสร้างชื่อแทนโมดูลด้วย as (script_package05.py)",
    concept: "ใช้ `import module as alias` เพื่อกำหนดชื่อสั้นหรือชื่ออื่นให้กับโมดูล เช่น `import numpy as np`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:182:en"
  };

  // Lesson 183
  window.CONTENT_I18N["python:183"] = window.CONTENT_I18N["python:183"] || {};
  window.CONTENT_I18N["python:183"].th = {
    title: "การเริ่มต้นแพ็กเกจย่อยซ้อน (__init__.py)",
    concept: "แต่ละแพ็กเกจย่อยในลำดับชั้นต้องมี `__init__.py` ของตัวเอง ไฟล์ `__init__.py` ในแพ็กเกจย่อยสามารถกำหนดค่าที่ควรใช้ร่วมกันภายในแพ็กเกจย่อยนั้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:183:en"
  };

  // Lesson 184
  window.CONTENT_I18N["python:184"] = window.CONTENT_I18N["python:184"] || {};
  window.CONTENT_I18N["python:184"].th = {
    title: "แบบฝึกหัด: นำเข้าและใช้คลาสในโมดูลอื่น (script9-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 9 (script9-2.py)**\n\nภารกิจ: นำเข้าคลาส Student จากโมดูลแยกและใช้สร้างอินสแตนซ์\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป กดปุ่ม Run เพื่อตรวจสอบผลลัพธ์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:184:en"
  };

  // Lesson 185
  window.CONTENT_I18N["python:185"] = window.CONTENT_I18N["python:185"] || {};
  window.CONTENT_I18N["python:185"].th = {
    title: "การรับวันที่และเวลาปัจจุบัน (hiduke01.py)",
    concept: "โมดูล `datetime` ในตัวของ Python มีคลาส `datetime` สำหรับทำงานกับวันที่และเวลา ใช้ `datetime.datetime.now()` เพื่อรับวันที่และเวลาปัจจุบันของระบบ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:185:en"
  };

  // Lesson 186
  window.CONTENT_I18N["python:186"] = window.CONTENT_I18N["python:186"] || {};
  window.CONTENT_I18N["python:186"].th = {
    title: "การสร้าง datetime ด้วยวันที่และเวลาเฉพาะ (hiduke02.py)",
    concept: "ใช้ `datetime.datetime(year, month, day, hour, minute, second)` เพื่อสร้างออบเจ็กต์ datetime ที่มีวันที่และเวลาเฉพาะ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:186:en"
  };

  // Lesson 187
  window.CONTENT_I18N["python:187"] = window.CONTENT_I18N["python:187"] || {};
  window.CONTENT_I18N["python:187"].th = {
    title: "การสร้างออบเจ็กต์วันที่โดยไม่มีเวลา (hiduke03.py)",
    concept: "ใช้ `datetime.date(year, month, day)` เพื่อสร้างออบเจ็กต์วันที่โดยไม่มีองค์ประกอบเวลา คลาส `date` เก็บเฉพาะวันที่ ไม่เก็บเวลา",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:187:en"
  };

  // Lesson 188
  window.CONTENT_I18N["python:188"] = window.CONTENT_I18N["python:188"] || {};
  window.CONTENT_I18N["python:188"].th = {
    title: "ข้อผิดพลาดการระบุวันที่ไม่ถูกต้อง (hiduke04.py)",
    concept: "เมื่อสร้างออบเจ็กต์ `datetime` หรือ `date` ด้วยวันที่ไม่ถูกต้อง (เช่น เดือน 13 หรือวันที่ 32) Python จะโยน **ValueError**",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:188:en"
  };

  // Lesson 189
  window.CONTENT_I18N["python:189"] = window.CONTENT_I18N["python:189"] || {};
  window.CONTENT_I18N["python:189"].th = {
    title: "การรับวันที่วันนี้ด้วย date.today() (hiduke05.py)",
    concept: "ใช้ `datetime.date.today()` เพื่อรับวันที่ปัจจุบันของระบบ คืนค่าเป็นออบเจ็กต์ `date` ที่มีเฉพาะปี เดือน และวัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:189:en"
  };

  // Lesson 190
  window.CONTENT_I18N["python:190"] = window.CONTENT_I18N["python:190"] || {};
  window.CONTENT_I18N["python:190"].th = {
    title: "การสร้างวันที่ในอนาคต (hiduke06.py)",
    concept: "คุณสามารถสร้างวันที่ในอนาคตโดยระบุปี เดือน และวันที่ต้องการโดยตรง เช่น `datetime.date(2025, 12, 25)` หรือใช้ `timedelta` เพื่อเพิ่มวัน",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:190:en"
  };

  // Lesson 191
  window.CONTENT_I18N["python:191"] = window.CONTENT_I18N["python:191"] || {};
  window.CONTENT_I18N["python:191"].th = {
    title: "การเปรียบเทียบวันที่ (hiduke07.py)",
    concept: "ออบเจ็กต์ `datetime` และ `date` สามารถเปรียบเทียบโดยใช้ตัวดำเนินการเปรียบเทียบมาตรฐาน (`<`, `>`, `==`, ฯลฯ) วันที่เร็วกว่าถือว่า \"น้อยกว่า\" วันที่ช้ากว่า",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:191:en"
  };

  // Lesson 192
  window.CONTENT_I18N["python:192"] = window.CONTENT_I18N["python:192"] || {};
  window.CONTENT_I18N["python:192"].th = {
    title: "การบวกและลบวันที่ด้วย timedelta (hiduke08.py)",
    concept: "`timedelta` แทนช่วงเวลา คุณสามารถบวกหรือลบ `timedelta` จากออบเจ็กต์ `date` หรือ `datetime` เช่น `today + timedelta(days=7)` ให้วันที่ 7 วันนับจากวันนี้",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:192:en"
  };

  // Lesson 193
  window.CONTENT_I18N["python:193"] = window.CONTENT_I18N["python:193"] || {};
  window.CONTENT_I18N["python:193"].th = {
    title: "การแปลงผลต่าง datetime เป็นวินาที (hiduke09.py)",
    concept: "การลบออบเจ็กต์ `datetime` สองตัวจะได้ `timedelta` ใช้ `total_seconds()` บน `timedelta` เพื่อแปลงช่วงเวลาเป็นวินาทีทั้งหมด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:193:en"
  };

  // Lesson 194
  window.CONTENT_I18N["python:194"] = window.CONTENT_I18N["python:194"] || {};
  window.CONTENT_I18N["python:194"].th = {
    title: "การรับวันในสัปดาห์ด้วย weekday() (hiduke10.py)",
    concept: "ใช้ `date.weekday()` เพื่อรับวันในสัปดาห์เป็นจำนวนเต็ม โดยวันจันทร์คือ 0 และวันอาทิตย์คือ 6",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:194:en"
  };

  // Lesson 195
  window.CONTENT_I18N["python:195"] = window.CONTENT_I18N["python:195"] || {};
  window.CONTENT_I18N["python:195"].th = {
    title: "การแปลงสตริงวันที่ด้วย strptime (hiduke11.py)",
    concept: "ใช้ `datetime.strptime(date_string, format)` เพื่อแปลงสตริงวันที่เป็นออบเจ็กต์ `datetime` รหัสรูปแบบเช่น `%Y` สำหรับปี 4 หลัก",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:195:en"
  };

  // Lesson 196
  window.CONTENT_I18N["python:196"] = window.CONTENT_I18N["python:196"] || {};
  window.CONTENT_I18N["python:196"].th = {
    title: "การจัดรูปแบบ datetime ด้วย strftime (hiduke12.py)",
    concept: "ใช้ `datetime.strftime(format)` เพื่อจัดรูปแบบออบเจ็กต์ `datetime` เป็นสตริงตามรหัสรูปแบบ เช่น `%Y-%m-%d`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:196:en"
  };

  // Lesson 197
  window.CONTENT_I18N["python:197"] = window.CONTENT_I18N["python:197"] || {};
  window.CONTENT_I18N["python:197"].th = {
    title: "การสร้างเลขทศนิยมสุ่ม 0-1 ด้วย random() (ransu01.py)",
    concept: "โมดูล `random` ของ Python มีฟังก์ชันสำหรับสร้างตัวเลขสุ่ม ใช้ `random.random()` เพื่อรับเลขทศนิยมสุ่มในช่วง [0.0, 1.0)",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:197:en"
  };

  // Lesson 198
  window.CONTENT_I18N["python:198"] = window.CONTENT_I18N["python:198"] || {};
  window.CONTENT_I18N["python:198"].th = {
    title: "การสร้างจำนวนเต็มสุ่มในช่วงด้วย randint() (ransu02.py)",
    concept: "ใช้ `random.randint(a, b)` เพื่อสร้างจำนวนเต็มสุ่มในช่วง [a, b] รวมทั้งสองค่า เช่น `random.randint(1, 6)` จำลองการทอยลูกเต๋า",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:198:en"
  };

  // Lesson 199
  window.CONTENT_I18N["python:199"] = window.CONTENT_I18N["python:199"] || {};
  window.CONTENT_I18N["python:199"].th = {
    title: "การสุ่มเลือกสมาชิกจากลำดับด้วย choice() (ransu03.py)",
    concept: "ใช้ `random.choice(sequence)` เพื่อสุ่มเลือกหนึ่งสมาชิกจากลิสต์ ทูเพิล หรือลำดับอื่นๆ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:199:en"
  };

  // Lesson 200
  window.CONTENT_I18N["python:200"] = window.CONTENT_I18N["python:200"] || {};
  window.CONTENT_I18N["python:200"].th = {
    title: "แบบฝึกหัด: แยกวิเคราะห์สตริงวันที่ (script10-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 10 (script10-1.py)**\n\nภารกิจ: รับสตริงวันที่จากผู้ใช้และแปลงเป็นออบเจ็กต์ datetime\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:200:en"
  };

  // Lesson 201
  window.CONTENT_I18N["python:201"] = window.CONTENT_I18N["python:201"] || {};
  window.CONTENT_I18N["python:201"].th = {
    title: "แบบฝึกหัด: คำนวณผลต่างวันระหว่างวันที่ (script10-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 10 (script10-2.py)**\n\nภารกิจ: คำนวณจำนวนวันระหว่างวันที่สองวัน\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:201:en"
  };

  // Lesson 202
  window.CONTENT_I18N["python:202"] = window.CONTENT_I18N["python:202"] || {};
  window.CONTENT_I18N["python:202"].th = {
    title: "แบบฝึกหัด: จำลองเกมทอยลูกเต๋าสองลูก (script10-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 10 (script10-3.py)**\n\nภารกิจ: จำลองการทอยลูกเต๋าสองลูกและแสดงผลรวม\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:202:en"
  };

  // Lesson 203
  window.CONTENT_I18N["python:203"] = window.CONTENT_I18N["python:203"] || {};
  window.CONTENT_I18N["python:203"].th = {
    title: "การปิดไฟล์อัตโนมัติด้วยคำสั่ง with (sample.txt)",
    concept: "คำสั่ง `with` ใน Python จัดการทรัพยากร (เช่น ไฟล์) โดยอัตโนมัติ ใช้ `with open('file.txt') as f:` เพื่อเปิดไฟล์ ไฟล์จะถูกปิดโดยอัตโนมัติเมื่อออกจากบล็อก `with`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:203:en"
  };

  // Lesson 204
  window.CONTENT_I18N["python:204"] = window.CONTENT_I18N["python:204"] || {};
  window.CONTENT_I18N["python:204"].th = {
    title: "การตรวจสอบการมีอยู่ของไฟล์ด้วย os.path.exists (arunashi01.py)",
    concept: "โมดูล `os` มีฟังก์ชัน `os.path.exists(path)` ที่คืนค่า `True` ถ้าไฟล์หรือไดเรกทอรีมีอยู่ มิฉะนั้นคืน `False`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:204:en"
  };

  // Lesson 205
  window.CONTENT_I18N["python:205"] = window.CONTENT_I18N["python:205"] || {};
  window.CONTENT_I18N["python:205"].th = {
    title: "การอ่านเนื้อหาไฟล์ทั้งหมดด้วย read() (yomikomi01.py)",
    concept: "ใช้ `file.read()` เพื่ออ่านเนื้อหาทั้งหมดของไฟล์เป็นสตริงเดียว เหมาะสำหรับไฟล์ขนาดเล็ก",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:205:en"
  };

  // Lesson 206
  window.CONTENT_I18N["python:206"] = window.CONTENT_I18N["python:206"] || {};
  window.CONTENT_I18N["python:206"].th = {
    title: "การเปิดไฟล์อย่างปลอดภัยด้วยคำสั่ง with (yomikomi01_with.py)",
    concept: "ใช้ `with open('file.txt') as f:` เพื่อเปิดไฟล์ ไฟล์จะถูกปิดโดยอัตโนมัติเมื่อออกจากบล็อก `with`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:206:en"
  };

  // Lesson 207
  window.CONTENT_I18N["python:207"] = window.CONTENT_I18N["python:207"] || {};
  window.CONTENT_I18N["python:207"].th = {
    title: "การอ่านไฟล์ทีละบรรทัดด้วย readline() (yomikomi02.py)",
    concept: "ใช้ `file.readline()` เพื่ออ่านหนึ่งบรรทัดจากไฟล์ แต่ละครั้งที่เรียกใช้จะอ่านบรรทัดถัดไป เมื่ออ่านถึงจุดสิ้นสุดของไฟล์ จะคืนสตริงว่าง",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:207:en"
  };

  // Lesson 208
  window.CONTENT_I18N["python:208"] = window.CONTENT_I18N["python:208"] || {};
  window.CONTENT_I18N["python:208"].th = {
    title: "การอ่านทุกบรรทัดเป็นลิสต์ด้วย readlines() (yomikomi03.py)",
    concept: "ใช้ `file.readlines()` เพื่ออ่านทุกบรรทัดของไฟล์และคืนเป็นลิสต์ของสตริง แต่ละสมาชิกของลิสต์คือหนึ่งบรรทัด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:208:en"
  };

  // Lesson 209
  window.CONTENT_I18N["python:209"] = window.CONTENT_I18N["python:209"] || {};
  window.CONTENT_I18N["python:209"].th = {
    title: "การสร้างและเขียนไฟล์ด้วยโหมด w (kakikomi01.py)",
    concept: "ใช้ `open('file.txt', 'w')` เพื่อเปิดไฟล์ในโหมดเขียน ('w') ถ้าไฟล์มีอยู่แล้ว โหมด 'w' จะเขียนทับเนื้อหาเดิมทั้งหมด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:209:en"
  };

  // Lesson 210
  window.CONTENT_I18N["python:210"] = window.CONTENT_I18N["python:210"] || {};
  window.CONTENT_I18N["python:210"].th = {
    title: "แบบฝึกหัด: อ่านและแสดงเนื้อหา students.txt (script11-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 11 (script11-1.py)**\n\nภารกิจ: อ่านและแสดงเนื้อหาทั้งหมดของไฟล์ students.txt\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:210:en"
  };

  // Lesson 211
  window.CONTENT_I18N["python:211"] = window.CONTENT_I18N["python:211"] || {};
  window.CONTENT_I18N["python:211"].th = {
    title: "การเขียนหลายบรรทัดจากลิสต์ด้วย writelines() (kakikomi02.py)",
    concept: "ใช้ `file.writelines(lines)` เพื่อเขียนลิสต์ของสตริงลงในไฟล์ แต่ละสตริงในลิสต์จะถูกเขียนตามลำดับ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:211:en"
  };

  // Lesson 212
  window.CONTENT_I18N["python:212"] = window.CONTENT_I18N["python:212"] || {};
  window.CONTENT_I18N["python:212"].th = {
    title: "แบบฝึกหัด: บันทึกข้อมูลนักเรียนลงในไฟล์ (script11-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 11 (script11-2.py)**\n\nภารกิจ: รับข้อมูลนักเรียนจากผู้ใช้และบันทึกลงในไฟล์\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:212:en"
  };

  // Lesson 213
  window.CONTENT_I18N["python:213"] = window.CONTENT_I18N["python:213"] || {};
  window.CONTENT_I18N["python:213"].th = {
    title: "การต่อท้ายไฟล์ที่มีอยู่ด้วยโหมด Append (kakikomi03.py)",
    concept: "ใช้ `open('file.txt', 'a')` เพื่อเปิดไฟล์ในโหมดต่อท้าย ('a') การเขียนจะเพิ่มเนื้อหาต่อท้ายไฟล์โดยไม่ลบเนื้อหาเดิม",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:213:en"
  };

  // Lesson 214
  window.CONTENT_I18N["python:214"] = window.CONTENT_I18N["python:214"] || {};
  window.CONTENT_I18N["python:214"].th = {
    title: "การเปิดไฟล์สัมพันธ์กับพาธแพ็กเกจ (openfile.py)",
    concept: "ใช้ `__file__` เพื่อรับพาธของโมดูลปัจจุบัน และ `os.path.dirname()` เพื่อรับไดเรกทอรี ช่วยให้เปิดไฟล์ที่สัมพันธ์กับตำแหน่งของโมดูล",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:214:en"
  };

  // Lesson 215
  window.CONTENT_I18N["python:215"] = window.CONTENT_I18N["python:215"] || {};
  window.CONTENT_I18N["python:215"].th = {
    title: "แบบฝึกหัด: อ่านไฟล์และเก็บบรรทัดในลิสต์ (script11-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 11 (script11-3.py)**\n\nภารกิจ: อ่านไฟล์และเก็บแต่ละบรรทัดเป็นสมาชิกในลิสต์\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:215:en"
  };

  // Lesson 216
  window.CONTENT_I18N["python:216"] = window.CONTENT_I18N["python:216"] || {};
  window.CONTENT_I18N["python:216"].th = {
    title: "แบบฝึกหัด: สร้างอินสแตนซ์ Student จากข้อมูลในไฟล์ (script11-4.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 11 (script11-4.py)**\n\nภารกิจ: อ่านข้อมูลนักเรียนจากไฟล์และสร้างออบเจ็กต์ Student\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:216:en"
  };

  // Lesson 217
  window.CONTENT_I18N["python:217"] = window.CONTENT_I18N["python:217"] || {};
  window.CONTENT_I18N["python:217"].th = {
    title: "การจับคู่ regex แบบชุดบนเนื้อหาไฟล์ (aaa.txt)",
    concept: "โมดูล `re` ของ Python ให้การทำงานกับนิพจน์ปกติ ใช้ `re.findall(pattern, text)` เพื่อค้นหารูปแบบทั้งหมดในข้อความและคืนเป็นลิสต์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:217:en"
  };

  // Lesson 218
  window.CONTENT_I18N["python:218"] = window.CONTENT_I18N["python:218"] || {};
  window.CONTENT_I18N["python:218"].th = {
    title: "การจับคู่ regex แบบชุดบนเนื้อหาไฟล์ (bbb.txt)",
    concept: "โมดูล `re` ของ Python ให้การทำงานกับนิพจน์ปกติ ใช้ `re.findall(pattern, text)` เพื่อค้นหารูปแบบทั้งหมดในข้อความ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:218:en"
  };

  // Lesson 219
  window.CONTENT_I18N["python:219"] = window.CONTENT_I18N["python:219"] || {};
  window.CONTENT_I18N["python:219"].th = {
    title: "การจับคู่ regex แบบชุดบนเนื้อหาไฟล์ (ccc.txt)",
    concept: "โมดูล `re` ของ Python ให้การทำงานกับนิพจน์ปกติ ใช้ `re.findall(pattern, text)` เพื่อค้นหารูปแบบทั้งหมดในข้อความ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:219:en"
  };

  // Lesson 220
  window.CONTENT_I18N["python:220"] = window.CONTENT_I18N["python:220"] || {};
  window.CONTENT_I18N["python:220"].th = {
    title: "การจับคู่ regex แบบชุดบนเนื้อหาไฟล์ (test-result.txt)",
    concept: "โมดูล `re` ของ Python ให้การทำงานกับนิพจน์ปกติ ใช้ `re.findall(pattern, text)` เพื่อค้นหารูปแบบทั้งหมดในข้อความ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:220:en"
  };

  // Lesson 221
  window.CONTENT_I18N["python:221"] = window.CONTENT_I18N["python:221"] || {};
  window.CONTENT_I18N["python:221"].th = {
    title: "การค้นหาแบบบางส่วนด้วย re.search (seiki01.py)",
    concept: "ใช้ `re.search(pattern, string)` เพื่อค้นหารูปแบบในสตริง คืนออบเจ็กต์ `Match` ถ้าพบ หรือ `None` ถ้าไม่พบ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:221:en"
  };

  // Lesson 222
  window.CONTENT_I18N["python:222"] = window.CONTENT_I18N["python:222"] || {};
  window.CONTENT_I18N["python:222"].th = {
    title: "การตรวจสอบออบเจ็กต์ผลลัพธ์ re.search (seiki02.py)",
    concept: "ออบเจ็กต์ `Match` ที่คืนโดย `re.search()` มีข้อมูลเกี่ยวกับการจับคู่ ตรวจสอบว่ามีการจับคู่หรือไม่โดยใช้ `if match:`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:222:en"
  };

  // Lesson 223
  window.CONTENT_I18N["python:223"] = window.CONTENT_I18N["python:223"] || {};
  window.CONTENT_I18N["python:223"].th = {
    title: "จุดยึดต้นบรรทัด (^) (seiki03.py)",
    concept: "ในนิพจน์ปกติ `^` จับคู่กับจุดเริ่มต้นของสตริง เมื่อใช้กับ `re.search()` มันจะจับคู่เฉพาะรูปแบบที่อยู่ต้นสตริงเท่านั้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:223:en"
  };

  // Lesson 224
  window.CONTENT_I18N["python:224"] = window.CONTENT_I18N["python:224"] || {};
  window.CONTENT_I18N["python:224"].th = {
    title: "จุดยึดท้ายบรรทัด ($) (seiki04.py)",
    concept: "ในนิพจน์ปกติ `$` จับคู่กับจุดสิ้นสุดของสตริง เช่น `world$` จับคู่ 'world' ต่อเมื่ออยู่ท้ายสตริงเท่านั้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:224:en"
  };

  // Lesson 225
  window.CONTENT_I18N["python:225"] = window.CONTENT_I18N["python:225"] || {};
  window.CONTENT_I18N["python:225"].th = {
    title: "การจับคู่แบบแม่นยำโดยใช้ ^ และ $ ร่วมกัน (seiki05.py)",
    concept: "ใช้ `^` และ `$` ร่วมกันเพื่อจับคู่สตริงทั้งหมดอย่างแม่นยำ เช่น `^Python$` จับคู่เฉพาะสตริงที่เท่ากับ 'Python' ทุกประการ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:225:en"
  };

  // Lesson 226
  window.CONTENT_I18N["python:226"] = window.CONTENT_I18N["python:226"] || {};
  window.CONTENT_I18N["python:226"].th = {
    title: "ไวลด์การ์ด: อักขระเดี่ยวใดๆ (.) (seiki06.py)",
    concept: "ในนิพจน์ปกติ `.` (จุด) จับคู่กับอักขระเดี่ยวใดๆ ยกเว้นอักขระขึ้นบรรทัดใหม่ เช่น `c.t` จับคู่ 'cat', 'cot', 'cut'",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:226:en"
  };

  // Lesson 227
  window.CONTENT_I18N["python:227"] = window.CONTENT_I18N["python:227"] || {};
  window.CONTENT_I18N["python:227"].th = {
    title: "การทำซ้ำศูนย์ครั้งหรือมากกว่า (*) (seiki07.py)",
    concept: "ในนิพจน์ปกติ `*` หมายถึง \"อักขระที่อยู่ด้านหน้าศูนย์ครั้งหรือมากกว่า\" เช่น `ab*c` จับคู่ 'ac', 'abc', 'abbc' ฯลฯ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:227:en"
  };

  // Lesson 228
  window.CONTENT_I18N["python:228"] = window.CONTENT_I18N["python:228"] || {};
  window.CONTENT_I18N["python:228"].th = {
    title: "การทำซ้ำหนึ่งครั้งหรือมากกว่า (+) (seiki08.py)",
    concept: "ในนิพจน์ปกติ `+` หมายถึง \"อักขระที่อยู่ด้านหน้าหนึ่งครั้งหรือมากกว่า\" เช่น `ab+c` จับคู่ 'abc', 'abbc' แต่**ไม่**จับคู่ 'ac'",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:228:en"
  };

  // Lesson 229
  window.CONTENT_I18N["python:229"] = window.CONTENT_I18N["python:229"] || {};
  window.CONTENT_I18N["python:229"].th = {
    title: "การปรากฏศูนย์หรือหนึ่งครั้ง (ไม่บังคับ) (?) (seiki09.py)",
    concept: "ในนิพจน์ปกติ `?` หมายถึง \"อักขระที่อยู่ด้านหน้าศูนย์ครั้งหรือหนึ่งครั้ง\" (ไม่บังคับ) เช่น `colou?r` จับคู่ทั้ง 'color' และ 'colour'",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:229:en"
  };

  // Lesson 230
  window.CONTENT_I18N["python:230"] = window.CONTENT_I18N["python:230"] || {};
  window.CONTENT_I18N["python:230"].th = {
    title: "การจับคู่ช่วงคลาสอักขระ (seiki10.py)",
    concept: "วงเล็บเหลี่ยม `[]` กำหนดคลาสอักขระ เช่น `[a-z]` จับคู่ตัวอักษรพิมพ์เล็กใดๆ `[0-9]` จับคู่ตัวเลขใดๆ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:230:en"
  };

  // Lesson 231
  window.CONTENT_I18N["python:231"] = window.CONTENT_I18N["python:231"] || {};
  window.CONTENT_I18N["python:231"].th = {
    title: "ชุดอักขระที่กำหนดไว้ล่วงหน้า \\d (seiki11.py)",
    concept: "ในนิพจน์ปกติ `\\d` จับคู่กับตัวเลขใดๆ (เทียบเท่า `[0-9]`) `\\w` จับคู่กับอักขระคำใดๆ `\\s` จับคู่กับช่องว่างใดๆ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:231:en"
  };

  // Lesson 232
  window.CONTENT_I18N["python:232"] = window.CONTENT_I18N["python:232"] || {};
  window.CONTENT_I18N["python:232"].th = {
    title: "การระบุจำนวนการทำซ้ำด้วยเครื่องหมายปีกกา (seiki12.py)",
    concept: "ใช้ `{m,n}` เพื่อระบุจำนวนการทำซ้ำที่แน่นอน `{3}` = 3 ครั้ง, `{2,4}` = 2-4 ครั้ง, `{3,}` = 3 ครั้งขึ้นไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:232:en"
  };

  // Lesson 233
  window.CONTENT_I18N["python:233"] = window.CONTENT_I18N["python:233"] || {};
  window.CONTENT_I18N["python:233"].th = {
    title: "การจัดกลุ่มและการจับคู่ regex ด้วยวงเล็บ (seiki13.py)",
    concept: "วงเล็บ `()` ในนิพจน์ปกติใช้สำหรับจัดกลุ่มและจับส่วนที่ตรงกัน ใช้ `match.group(1)` เพื่อดึงกลุ่มแรกที่จับได้",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:233:en"
  };

  // Lesson 234
  window.CONTENT_I18N["python:234"] = window.CONTENT_I18N["python:234"] || {};
  window.CONTENT_I18N["python:234"].th = {
    title: "การสแกนไฟล์ด้วยนิพจน์ปกติ (seiki14.py)",
    concept: "รวมการอ่านไฟล์กับนิพจน์ปกติ เปิดไฟล์ อ่านทีละบรรทัด และใช้ `re.search()` หรือ `re.match()` เพื่อค้นหารูปแบบในแต่ละบรรทัด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:234:en"
  };

  // Lesson 235
  window.CONTENT_I18N["python:235"] = window.CONTENT_I18N["python:235"] || {};
  window.CONTENT_I18N["python:235"].th = {
    title: "การสแกนไฟล์ regex พร้อมการดึงกลุ่ม (seiki14_sep.py)",
    concept: "รวมการอ่านไฟล์กับนิพจน์ปกติและการจับกลุ่ม ใช้ `re.search()` กับรูปแบบที่มีกลุ่ม จากนั้นใช้ `.group()` เพื่อดึงส่วนที่สนใจ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:235:en"
  };

  // Lesson 236
  window.CONTENT_I18N["python:236"] = window.CONTENT_I18N["python:236"] || {};
  window.CONTENT_I18N["python:236"].th = {
    title: "การแยกชื่อผู้ใช้ด้วย regex (seiki15.py)",
    concept: "ใช้รูปแบบนิพจน์ปกติเพื่อแยกชื่อผู้ใช้จากข้อมูล เช่น รูปแบบ `@\\w+` จับคู่ชื่อผู้ใช้ที่ขึ้นต้นด้วย @",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:236:en"
  };

  // Lesson 237
  window.CONTENT_I18N["python:237"] = window.CONTENT_I18N["python:237"] || {};
  window.CONTENT_I18N["python:237"].th = {
    title: "การแยกชื่อผู้ใช้ regex แบบแยกส่วน (seiki15_sep.py)",
    concept: "แยกฟังก์ชันการประมวลผล regex ออกเป็นส่วนประกอบที่นำกลับมาใช้ใหม่ได้ ทำให้โค้ดเป็นโมดูลาร์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:237:en"
  };

  // Lesson 238
  window.CONTENT_I18N["python:238"] = window.CONTENT_I18N["python:238"] || {};
  window.CONTENT_I18N["python:238"].th = {
    title: "การแยกข้อมูลคะแนนด้วยกลุ่ม regex (seiki16.py)",
    concept: "ใช้กลุ่มนิพจน์ปกติเพื่อแยกข้อมูลคะแนนที่มีโครงสร้างจากสตริง เช่น รูปแบบ `Name:(\\w+),Score:(\\d+)`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:238:en"
  };

  // Lesson 239
  window.CONTENT_I18N["python:239"] = window.CONTENT_I18N["python:239"] || {};
  window.CONTENT_I18N["python:239"].th = {
    title: "การแยกข้อมูลคะแนน regex แบบแยกส่วน (seiki16_sep.py)",
    concept: "แยกตรรกะการแยกข้อมูลคะแนนด้วย regex เป็นฟังก์ชันที่เรียกซ้ำได้ ทำให้โค้ดเป็นโมดูลาร์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:239:en"
  };

  // Lesson 240
  window.CONTENT_I18N["python:240"] = window.CONTENT_I18N["python:240"] || {};
  window.CONTENT_I18N["python:240"].th = {
    title: "แบบฝึกหัด: ตรวจสอบรูปแบบเบอร์โทรด้วย regex (script12-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 12 (script12-1.py)**\n\nภารกิจ: ใช้ regex เพื่อตรวจสอบว่าสตริงเป็นรูปแบบเบอร์โทรศัพท์ที่ถูกต้องหรือไม่\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:240:en"
  };

  // Lesson 241
  window.CONTENT_I18N["python:241"] = window.CONTENT_I18N["python:241"] || {};
  window.CONTENT_I18N["python:241"].th = {
    title: "แบบฝึกหัด: แยกข้อมูลนักเรียนจากไฟล์ด้วย regex (script12-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 12 (script12-2.py)**\n\nภารกิจ: อ่านไฟล์และใช้ regex เพื่อแยกข้อมูลนักเรียน\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:241:en"
  };

  // Lesson 242
  window.CONTENT_I18N["python:242"] = window.CONTENT_I18N["python:242"] || {};
  window.CONTENT_I18N["python:242"].th = {
    title: "แบบฝึกหัด: แยกวิเคราะห์ข้อมูลคะแนนซับซ้อนด้วยกลุ่ม regex (script12-3.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 12 (script12-3.py)**\n\nภารกิจ: ใช้กลุ่มนิพจน์ปกติเพื่อแยกวิเคราะห์ข้อมูลคะแนนที่ซับซ้อน\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:242:en"
  };

  // Lesson 243
  window.CONTENT_I18N["python:243"] = window.CONTENT_I18N["python:243"] || {};
  window.CONTENT_I18N["python:243"].th = {
    title: "ข้อยกเว้น: การหารด้วยศูนย์ (ZeroDivisionError) (reigai01.py)",
    concept: "**ข้อยกเว้น** คือข้อผิดพลาดที่เกิดขึ้นขณะโปรแกรมทำงาน ตัวอย่างเช่น การหารจำนวนด้วยศูนย์จะทำให้เกิด `ZeroDivisionError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:243:en"
  };

  // Lesson 244
  window.CONTENT_I18N["python:244"] = window.CONTENT_I18N["python:244"] || {};
  window.CONTENT_I18N["python:244"].th = {
    title: "ข้อยกเว้น: ดัชนีเกินช่วง (IndexError) (reigai02.py)",
    concept: "**ข้อยกเว้น** คือข้อผิดพลาดที่เกิดขึ้นขณะโปรแกรมทำงาน การเข้าถึงดัชนีลิสต์ที่ไม่มีอยู่จะทำให้เกิด `IndexError`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:244:en"
  };

  // Lesson 245
  window.CONTENT_I18N["python:245"] = window.CONTENT_I18N["python:245"] || {};
  window.CONTENT_I18N["python:245"].th = {
    title: "การจับข้อยกเว้นด้วย try-except (reigai03.py)",
    concept: "ใช้บล็อก `try-except` เพื่อจัดการข้อยกเว้น โค้ดที่อาจเกิดข้อผิดพลาดใส่ในบล็อก `try` ถ้าข้อยกเว้นเกิดขึ้น บล็อก `except` จะถูกดำเนินการ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:245:en"
  };

  // Lesson 246
  window.CONTENT_I18N["python:246"] = window.CONTENT_I18N["python:246"] || {};
  window.CONTENT_I18N["python:246"].th = {
    title: "การรับรายละเอียดข้อยกเว้นในบล็อก except (reigai04.py)",
    concept: "ใช้ `except ExceptionType as e:` เพื่อจับข้อยกเว้นและเก็บรายละเอียดไว้ในตัวแปร `e` จากนั้นพิมพ์ `e` เพื่อดูข้อความข้อผิดพลาด",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:246:en"
  };

  // Lesson 247
  window.CONTENT_I18N["python:247"] = window.CONTENT_I18N["python:247"] || {};
  window.CONTENT_I18N["python:247"].th = {
    title: "การใช้บล็อก else (ไม่มีข้อยกเว้น) (reigai07.py)",
    concept: "เพิ่มบล็อก `else` หลัง `try-except` เพื่อรันโค้ดเมื่อ**ไม่มี**ข้อยกเว้นเกิดขึ้น",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:247:en"
  };

  // Lesson 248
  window.CONTENT_I18N["python:248"] = window.CONTENT_I18N["python:248"] || {};
  window.CONTENT_I18N["python:248"].th = {
    title: "การจัดการข้อยกเว้นหลายประเภท (reigai05.py)",
    concept: "คุณสามารถมีบล็อก `except` หลายอันเพื่อจัดการข้อยกเว้นประเภทต่างๆ แต่ละ `except` จับข้อยกเว้นเฉพาะ",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:248:en"
  };

  // Lesson 249
  window.CONTENT_I18N["python:249"] = window.CONTENT_I18N["python:249"] || {};
  window.CONTENT_I18N["python:249"].th = {
    title: "การจับข้อยกเว้นทั้งหมดด้วยคลาสแม่ (reigai06.py)",
    concept: "ใช้ `except Exception:` เพื่อจับข้อยกเว้นในตัวทุกประเภท เพราะ `Exception` เป็นคลาสแม่ของข้อยกเว้นในตัวส่วนใหญ่",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:249:en"
  };

  // Lesson 250
  window.CONTENT_I18N["python:250"] = window.CONTENT_I18N["python:250"] || {};
  window.CONTENT_I18N["python:250"].th = {
    title: "การแพร่กระจายข้อยกเว้นไปยังผู้เรียกใช้ (reigai08.py)",
    concept: "ถ้าข้อยกเว้นเกิดขึ้นในฟังก์ชันและไม่ถูกจับภายในฟังก์ชันนั้น มันจะแพร่กระจายไปยังผู้เรียกใช้",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:250:en"
  };

  // Lesson 251
  window.CONTENT_I18N["python:251"] = window.CONTENT_I18N["python:251"] || {};
  window.CONTENT_I18N["python:251"].th = {
    title: "การทำความสะอาดด้วยบล็อก finally (reigai09.py)",
    concept: "บล็อก `finally` จะถูกดำเนินการ**เสมอ** ไม่ว่าข้อยกเว้นจะเกิดขึ้นหรือไม่ ใช้สำหรับทำความสะอาด เช่น ปิดไฟล์",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:251:en"
  };

  // Lesson 252
  window.CONTENT_I18N["python:252"] = window.CONTENT_I18N["python:252"] || {};
  window.CONTENT_I18N["python:252"].th = {
    title: "แบบฝึกหัด: ฟังก์ชันตรวจสอบอาร์กิวเมนต์และโยนข้อยกเว้น (script13-1.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 13 (script13-1.py)**\n\nภารกิจ: กำหนดฟังก์ชันที่ตรวจสอบค่าอาร์กิวเมนต์และโยน ValueError ถ้าไม่ถูกต้อง\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:252:en"
  };

  // Lesson 253
  window.CONTENT_I18N["python:253"] = window.CONTENT_I18N["python:253"] || {};
  window.CONTENT_I18N["python:253"].th = {
    title: "แบบฝึกหัด: การจับข้อยกเว้นเฉพาะและการกู้คืน (script13-2.py)",
    concept: "**แบบฝึกหัดปฏิบัติบทที่ 13 (script13-2.py)**\n\nภารกิจ: จับข้อยกเว้นเฉพาะประเภทและดำเนินการกู้คืน\n\nตรวจสอบโค้ดเทมเพลตและเติมส่วนที่ขาดหายไป",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:253:en"
  };

  // Lesson 254
  window.CONTENT_I18N["python:254"] = window.CONTENT_I18N["python:254"] || {};
  window.CONTENT_I18N["python:254"].th = {
    title: "การโยนข้อยกเว้นโดยเจตนาด้วย raise (reigai10.py)",
    concept: "ใช้ `raise ExceptionType('message')` เพื่อโยนข้อยกเว้นโดยเจตนาในโค้ดของคุณ มีประโยชน์สำหรับการตรวจสอบความถูกต้องของข้อมูลนำเข้า",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:254:en"
  };

  // Lesson 255
  window.CONTENT_I18N["python:255"] = window.CONTENT_I18N["python:255"] || {};
  window.CONTENT_I18N["python:255"].th = {
    title: "การกำหนดและโยนคลาสข้อยกเว้นแบบกำหนดเอง (reigai11.py)",
    concept: "คุณสามารถกำหนดคลาสข้อยกเว้นของคุณเองโดยสืบทอดจาก `Exception` เช่น `class MyError(Exception):` แล้วโยนด้วย `raise MyError('message')`",
source: "ai-assisted-from-en-v1",
    sourceRef: "data/i18n_content/python_en.js:python:255:en"
  };

})();