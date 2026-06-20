/* Study Tools Content I18n - Java Thai Gold Gate Content Pack v2 */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["java:1"] = window.CONTENT_I18N["java:1"] || {};
  window.CONTENT_I18N["java:1"].th = {
    title: "โปรแกรมคืออะไร",
    concept: "โปรแกรม (program) คือชุดคำสั่งทีละขั้นที่บอกให้คอมพิวเตอร์ทำงานตามลำดับ เหมือนสูตรอาหารที่กำหนดว่าต้องทำอะไรก่อนและหลัง ภาษาเฉพาะที่ใช้เขียนคำสั่งเหล่านี้เรียกว่า programming language และ Java เป็นหนึ่งในภาษาที่ใช้กันแพร่หลายมาก",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:1:en"
  };

  window.CONTENT_I18N["java:2"] = window.CONTENT_I18N["java:2"] || {};
  window.CONTENT_I18N["java:2"].th = {
    title: "คุณสมบัติของ Java",
    concept: "Java มีจุดเด่นหลายอย่าง ได้แก่ โปรแกรมเดียวสามารถทำงานได้บน Windows, Mac และ Linux, แนวคิด Object-Oriented ช่วยออกแบบระบบจากวัตถุในโลกจริง, ระบบชนิดข้อมูลเข้มงวดช่วยลด bug และมี standard library จำนวนมากให้ใช้งานทันที",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:2:en"
  };

  window.CONTENT_I18N["java:3"] = window.CONTENT_I18N["java:3"] || {};
  window.CONTENT_I18N["java:3"].th = {
    title: "โครงสร้างพื้นฐานของโปรแกรม Java",
    concept: "โปรแกรม Java ขั้นต่ำต้องมี class และ method main ซึ่งเป็นจุดเริ่มต้นของการทำงาน โครงสร้างพื้นฐานคือ class ClassName { public static void main(String[] args) { คำสั่งของโปรแกรม } } ทุกคำสั่งที่ต้องรันจะถูกวางไว้ในขอบเขตของ class และ main",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:3:en"
  };

  window.CONTENT_I18N["java:4"] = window.CONTENT_I18N["java:4"] || {};
  window.CONTENT_I18N["java:4"].th = {
    title: "คอมเมนต์ (Comment)",
    concept: "Comment คือข้อความหมายเหตุที่ผู้เขียนโปรแกรมใส่ไว้เพื่ออธิบายโค้ด คอมพิวเตอร์จะข้าม comment ตอนรัน บรรทัดที่ขึ้นต้นด้วย // เป็น comment หนึ่งบรรทัด ส่วน comment หลายบรรทัดใช้เครื่องหมายเปิดและปิดแบบ slash-star",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:4:en"
  };

  window.CONTENT_I18N["java:5"] = window.CONTENT_I18N["java:5"] || {};
  window.CONTENT_I18N["java:5"].th = {
    title: "บล็อกและการเยื้อง (Blocks and Indentation)",
    concept: "Block คือช่วงโค้ดที่ถูกครอบด้วยวงเล็บปีกกา { และ } ใช้กำหนดขอบเขตของ class, method, if, loop และส่วนอื่นของโปรแกรม การเยื้องบรรทัด (indentation) ทำให้เห็นโครงสร้างของ block ชัดขึ้นและอ่านโค้ดง่ายขึ้น",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:5:en"
  };

  window.CONTENT_I18N["java:6"] = window.CONTENT_I18N["java:6"] || {};
  window.CONTENT_I18N["java:6"].th = {
    title: "แบบฝึกหัด: บทที่ 1",
    concept: "แบบฝึกหัดบทที่ 1: เขียนโปรแกรมที่พิมพ์ข้อความสองบรรทัด บรรทัดแรกคือ Start learning Java! และบรรทัดที่สองเป็นชื่อของคุณเอง ให้เติมโค้ดใน class Main แล้วกด Run เพื่อตรวจว่า output ตรงตามที่ต้องการ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:6:en"
  };

  window.CONTENT_I18N["java:7"] = window.CONTENT_I18N["java:7"] || {};
  window.CONTENT_I18N["java:7"].th = {
    title: "ตัวแปรคืออะไร",
    concept: "Variable หรือตัวแปรคือกล่องที่มีชื่อสำหรับเก็บค่าชั่วคราว ตัวแปรแต่ละตัวมีชนิดข้อมูลกำกับว่าเก็บค่าแบบใดได้ ก่อนใช้งานต้องประกาศ เช่น int score; หรือประกาศพร้อมค่าเริ่มต้น เช่น int score = 80;",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:7:en"
  };

  window.CONTENT_I18N["java:8"] = window.CONTENT_I18N["java:8"] || {};
  window.CONTENT_I18N["java:8"].th = {
    title: "ชนิดข้อมูลพื้นฐานใน Java",
    concept: "Java มีชนิดข้อมูลพื้นฐานหลายแบบ เช่น int สำหรับจำนวนเต็ม, double สำหรับทศนิยม, boolean สำหรับ true/false, char สำหรับอักขระหนึ่งตัว, long สำหรับจำนวนเต็มขนาดใหญ่ และ String สำหรับข้อความซึ่งเป็นชนิดแบบ class",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:8:en"
  };

  window.CONTENT_I18N["java:9"] = window.CONTENT_I18N["java:9"] || {};
  window.CONTENT_I18N["java:9"].th = {
    title: "ตัวดำเนินการทางคณิตศาสตร์",
    concept: "Arithmetic operators ใช้คำนวณตัวเลข ได้แก่ + บวก, - ลบ, * คูณ, / หาร และ % หาเศษจากการหาร ถ้าใช้จำนวนเต็มหารกัน ส่วนทศนิยมจะถูกตัดทิ้ง เช่น 7 / 2 ได้ 3 เครื่องหมาย ++ เพิ่มค่า 1 และ -- ลดค่า 1",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:9:en"
  };

  window.CONTENT_I18N["java:10"] = window.CONTENT_I18N["java:10"] || {};
  window.CONTENT_I18N["java:10"].th = {
    title: "การแปลงชนิดข้อมูล (Cast)",
    concept: "เมื่อคำนวณค่าที่มีชนิดข้อมูลต่างกัน Java อาจแปลงชนิดให้ใหญ่ขึ้นโดยอัตโนมัติ เช่น int เป็น double ถ้าต้องการแปลงเองให้ใช้ cast operator เช่น (int) 3.7 ผลลัพธ์จะเป็น 3 เพราะส่วนทศนิยมถูกตัดออก",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:10:en"
  };

  window.CONTENT_I18N["java:11"] = window.CONTENT_I18N["java:11"] || {};
  window.CONTENT_I18N["java:11"].th = {
    title: "คลาส String (ข้อความ)",
    concept: "String คือ class สำหรับจัดการข้อความ สามารถต่อข้อความด้วยเครื่องหมาย + และเรียก method เพื่อทำงานกับข้อความได้ ตัวอย่างเช่นเก็บชื่อไว้ในตัวแปร name แล้วพิมพ์ Hello พร้อมชื่อออกทางหน้าจอ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:11:en"
  };

  window.CONTENT_I18N["java:12"] = window.CONTENT_I18N["java:12"] || {};
  window.CONTENT_I18N["java:12"].th = {
    title: " Escape Sequence (ลำดับเอสเคป)",
    concept: "Escape sequence ใช้แทนอักขระพิเศษในข้อความ เช่น newline สำหรับขึ้นบรรทัดใหม่, tab สำหรับเว้นระยะ, double quote สำหรับใส่เครื่องหมายคำพูดใน String และ backslash สำหรับแสดงเครื่องหมาย slash กลับ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:12:en"
  };

  window.CONTENT_I18N["java:13"] = window.CONTENT_I18N["java:13"] || {};
  window.CONTENT_I18N["java:13"].th = {
    title: "แบบฝึกหัด: บทที่ 2",
    concept: "แบบฝึกหัดบทที่ 2: ใช้ Scanner อ่านอายุจากแป้นพิมพ์ แล้วพิมพ์ข้อความที่รวมอายุออกมา อย่าลืม import Scanner, สร้าง object สำหรับอ่าน stdin และทดสอบด้วยค่าตัวอย่างก่อนส่งคำตอบ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:13:en"
  };

  window.CONTENT_I18N["java:14"] = window.CONTENT_I18N["java:14"] || {};
  window.CONTENT_I18N["java:14"].th = {
    title: "การแยกเงื่อนไข (if)",
    concept: "if statement ใช้แยกเส้นทางการทำงานตามเงื่อนไข ถ้าเงื่อนไขแรกเป็นจริงจะรัน block แรก ถ้าไม่จริงสามารถตรวจ else if ต่อได้ และใช้ else สำหรับกรณีที่ไม่เข้าเงื่อนไขใดเลย",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:14:en"
  };

  window.CONTENT_I18N["java:15"] = window.CONTENT_I18N["java:15"] || {};
  window.CONTENT_I18N["java:15"].th = {
    title: "ตัวดำเนินการเปรียบเทียบและตรรกะ",
    concept: "Relational operators ใช้เปรียบเทียบค่า เช่น ==, !=, >, <, >= และ <= ส่วน logical operators ใช้รวมเงื่อนไข ได้แก่ && หมายถึง AND, || หมายถึง OR และ ! หมายถึง NOT ผลลัพธ์ของการเปรียบเทียบเป็น boolean",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:15:en"
  };

  window.CONTENT_I18N["java:16"] = window.CONTENT_I18N["java:16"] || {};
  window.CONTENT_I18N["java:16"].th = {
    title: "คำสั่ง switch",
    concept: "switch statement ใช้เลือกการทำงานจากค่าของตัวแปรหนึ่งตัว เหมาะกับกรณีที่มีตัวเลือกชัดเจนหลายค่า แต่ละ case กำหนดคำสั่งของค่านั้น และมักใช้ break เพื่อหยุดไม่ให้ไหลไป case ถัดไป default ใช้เมื่อไม่ตรงกับ case ใด",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:16:en"
  };

  window.CONTENT_I18N["java:17"] = window.CONTENT_I18N["java:17"] || {};
  window.CONTENT_I18N["java:17"].th = {
    title: "ลูป (for)",
    concept: "for loop ใช้ทำซ้ำเมื่อรู้รูปแบบการเริ่มต้น เงื่อนไข และการอัปเดตค่า เช่นเริ่ม i = 1 ทำงานระหว่าง i <= 5 แล้วเพิ่ม i ทีละ 1 เหมาะกับการนับรอบหรือวนผ่านข้อมูลตาม index",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:17:en"
  };

  window.CONTENT_I18N["java:18"] = window.CONTENT_I18N["java:18"] || {};
  window.CONTENT_I18N["java:18"].th = {
    title: "ลูป (while และ do-while)",
    concept: "while loop จะตรวจเงื่อนไขก่อนรัน block ทุกครั้ง ถ้าเงื่อนไขเป็นจริงจึงทำงาน ส่วน do-while จะรัน block อย่างน้อยหนึ่งครั้งก่อนตรวจเงื่อนไข เหมาะกับงานที่ต้องทำก่อนแล้วค่อยตัดสินใจว่าจะทำซ้ำหรือไม่",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:18:en"
  };

  window.CONTENT_I18N["java:19"] = window.CONTENT_I18N["java:19"] || {};
  window.CONTENT_I18N["java:19"].th = {
    title: "break และ continue",
    concept: "break ใช้หยุด loop หรือ switch ทันที ส่วน continue ใช้ข้ามรอบปัจจุบันแล้วไปตรวจรอบถัดไป คำสั่งทั้งสองช่วยควบคุมการทำซ้ำเมื่อต้องหยุดก่อนกำหนดหรือข้ามบางเงื่อนไข",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:19:en"
  };

  window.CONTENT_I18N["java:20"] = window.CONTENT_I18N["java:20"] || {};
  window.CONTENT_I18N["java:20"].th = {
    title: "อาร์เรย์ (Array)",
    concept: "Array ใช้เก็บค่าหลายตัวที่มีชนิดเดียวกันภายใต้ชื่อเดียว เช่น int[] scores = {85, 90, 78}; การเข้าถึงใช้ index ซึ่งเริ่มจาก 0 ดังนั้น scores[0] คือสมาชิกตัวแรก ต้องระวังไม่ให้ index เกินขอบเขต",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:20:en"
  };

  window.CONTENT_I18N["java:21"] = window.CONTENT_I18N["java:21"] || {};
  window.CONTENT_I18N["java:21"].th = {
    title: "แบบฝึกหัด: บทที่ 3",
    concept: "แบบฝึกหัดบทที่ 3: ใช้ for loop พิมพ์เลข 1 ถึง 10 ข้ามตัวเลขที่เป็นพหุคูณของ 3 ด้วย continue และหยุด loop เมื่อถึง 8 ด้วย break ให้ตรวจ output ว่าตัวเลขที่แสดงตรงตามเงื่อนไขทั้งหมด",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:21:en"
  };

  window.CONTENT_I18N["java:22"] = window.CONTENT_I18N["java:22"] || {};
  window.CONTENT_I18N["java:22"].th = {
    title: "เมธอด (Method) คืออะไร",
    concept: "Method คือ block ของการประมวลผลที่มีชื่อและเรียกใช้ซ้ำได้ ช่วยลดการเขียนโค้ดซ้ำและทำให้โปรแกรมเป็นระเบียบ Method ระบุชนิดค่าที่คืนกลับ ชื่อ method และ parameter ที่รับเข้ามา",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:22:en"
  };

  window.CONTENT_I18N["java:23"] = window.CONTENT_I18N["java:23"] || {};
  window.CONTENT_I18N["java:23"].th = {
    title: "พารามิเตอร์ (Parameter)",
    concept: "Parameter คือค่าที่ส่งเข้า method เพื่อให้ method ใช้ประมวลผล ตอนประกาศ method จะกำหนดชื่อและชนิดของ parameter ส่วนตอนเรียก method จะส่ง argument จริงเข้าไป เช่น greet(\"Taro\") ส่งชื่อให้ method greet",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:23:en"
  };

  window.CONTENT_I18N["java:24"] = window.CONTENT_I18N["java:24"] || {};
  window.CONTENT_I18N["java:24"].th = {
    title: "ค่าส่งกลับ (Return Value)",
    concept: "Return value คือค่าที่ method ส่งกลับหลังทำงานเสร็จ ใช้คำสั่ง return เพื่อคืนค่า ถ้า method ไม่คืนค่าให้ใช้ void ตัวอย่างเช่น method add รับ int สองตัวแล้ว return ผลบวกกลับไปให้ผู้เรียก",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:24:en"
  };

  window.CONTENT_I18N["java:25"] = window.CONTENT_I18N["java:25"] || {};
  window.CONTENT_I18N["java:25"].th = {
    title: "การโอเวอร์โหลดเมธอด (Overloading)",
    concept: "Method overloading คือการประกาศ method ชื่อเดียวกันได้หลายแบบ แต่ parameter ต้องต่างกัน เช่นจำนวน parameter หรือชนิดข้อมูลต่างกัน Java จะเลือก method ที่ตรงกับ argument ตอนเรียกใช้งาน",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:25:en"
  };

  window.CONTENT_I18N["java:26"] = window.CONTENT_I18N["java:26"] || {};
  window.CONTENT_I18N["java:26"].th = {
    title: "ขอบเขตของตัวแปร (Scope)",
    concept: "Variable scope คือขอบเขตที่ตัวแปรสามารถใช้งานได้ โดยทั่วไปตัวแปรที่ประกาศใน block จะใช้ได้เฉพาะภายใน block นั้น ตัวแปร local ใน method จึงเข้าถึงจากข้างนอก method ไม่ได้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:26:en"
  };

  window.CONTENT_I18N["java:27"] = window.CONTENT_I18N["java:27"] || {};
  window.CONTENT_I18N["java:27"].th = {
    title: "แบบฝึกหัด: บทที่ 4",
    concept: "แบบฝึกหัดบทที่ 4: สร้าง method public static int getMax(int a, int b) เพื่อรับจำนวนเต็มสองตัวและคืนค่าตัวที่มากกว่า จากนั้นเรียก method นี้ใน main แล้วพิมพ์ผลลัพธ์เพื่อตรวจสอบ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:27:en"
  };

  window.CONTENT_I18N["java:28"] = window.CONTENT_I18N["java:28"] || {};
  window.CONTENT_I18N["java:28"].th = {
    title: "การเขียนโปรแกรมเชิงวัตถุคืออะไร",
    concept: "Object-Oriented Programming หรือ OOP คือการออกแบบโปรแกรมโดยมองสิ่งต่างๆเป็น object ที่มีข้อมูลและพฤติกรรม เช่น object นักเรียนมีชื่อ รหัส และการทำงานอย่างเรียนหรือสอบ แนวคิดนี้ช่วยให้โค้ดจัดกลุ่มตามหน้าที่จริงได้ง่าย",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:28:en"
  };

  window.CONTENT_I18N["java:29"] = window.CONTENT_I18N["java:29"] || {};
  window.CONTENT_I18N["java:29"].th = {
    title: "คลาส (Class) และออบเจกต์ (Instance)",
    concept: "Class คือแบบพิมพ์เขียวสำหรับสร้าง object ส่วน instance คือ object จริงที่สร้างจาก class นั้น ใน class สามารถกำหนด field เพื่อเก็บข้อมูลและ method เพื่ออธิบายพฤติกรรมของ object",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:29:en"
  };

  window.CONTENT_I18N["java:30"] = window.CONTENT_I18N["java:30"] || {};
  window.CONTENT_I18N["java:30"].th = {
    title: "ชนิดอ้างอิง (Reference Type)",
    concept: "Reference type เก็บตำแหน่งอ้างอิงไปยัง object จริงใน memory ไม่ได้เก็บ object ทั้งก้อนโดยตรง ถ้าเขียน Student s2 = s ทั้งสองตัวแปรจะอ้างถึง object เดียวกัน การแก้ผ่านตัวหนึ่งจึงเห็นผลผ่านอีกตัวด้วย",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:30:en"
  };

  window.CONTENT_I18N["java:31"] = window.CONTENT_I18N["java:31"] || {};
  window.CONTENT_I18N["java:31"].th = {
    title: "null",
    concept: "null คือค่าพิเศษที่หมายถึงตัวแปร reference ยังไม่ได้ชี้ไปยัง object ใด ถ้าเรียก field หรือ method ผ่านตัวแปรที่เป็น null จะเกิด NullPointerException จึงควรตรวจ null ก่อนใช้งานในจุดที่มีความเสี่ยง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:31:en"
  };

  window.CONTENT_I18N["java:32"] = window.CONTENT_I18N["java:32"] || {};
  window.CONTENT_I18N["java:32"].th = {
    title: "อาร์เรย์ของการอ้างอิง",
    concept: "Array ของ reference ใช้เก็บตัวแปรที่ชี้ไปยัง object หลายตัว เช่น Student[] students สมาชิกแต่ละช่องอาจชี้ไปยัง Student คนละ object หรือยังเป็น null ก็ได้ จึงต้องสร้าง object ให้สมาชิกก่อนใช้งาน field หรือ method",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:32:en"
  };

  window.CONTENT_I18N["java:33"] = window.CONTENT_I18N["java:33"] || {};
  window.CONTENT_I18N["java:33"].th = {
    title: "แบบฝึกหัด: บทที่ 5",
    concept: "แบบฝึกหัดบทที่ 5: สร้าง class Student ที่มี instance variables String name และ int age จากนั้นสร้าง object, กำหนดค่าให้ field และพิมพ์ผลลัพธ์ออกหน้าจอเพื่อยืนยันว่า object เก็บข้อมูลถูกต้อง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:33:en"
  };

  window.CONTENT_I18N["java:34"] = window.CONTENT_I18N["java:34"] || {};
  window.CONTENT_I18N["java:34"].th = {
    title: "คอนสตรัคเตอร์ (Constructor)",
    concept: "Constructor คือ block พิเศษที่ถูกรันตอนสร้าง object ด้วย new ใช้กำหนดค่าเริ่มต้นให้ field ชื่อ constructor ต้องตรงกับชื่อ class และไม่มี return type ทำให้สร้าง object พร้อมข้อมูลเริ่มต้นได้ในขั้นตอนเดียว",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:34:en"
  };

  window.CONTENT_I18N["java:35"] = window.CONTENT_I18N["java:35"] || {};
  window.CONTENT_I18N["java:35"].th = {
    title: "คีย์เวิร์ด this",
    concept: "this keyword หมายถึง instance ปัจจุบันที่กำลังทำงานอยู่ ใช้แยก field ของ object ออกจาก parameter ที่ชื่อเหมือนกัน เช่น this.name = name; ฝั่งซ้ายคือ field ส่วนฝั่งขวาคือ parameter",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:35:en"
  };

  window.CONTENT_I18N["java:36"] = window.CONTENT_I18N["java:36"] || {};
  window.CONTENT_I18N["java:36"].th = {
    title: "ตัวแปรคลาส (static field)",
    concept: "static field หรือ class variable เป็นตัวแปรที่ใช้ร่วมกันทั้ง class ไม่ได้แยกตามแต่ละ instance เหมาะกับค่าที่ต้องนับหรือแชร์ร่วมกัน เช่น count จำนวน object ที่ถูกสร้าง สามารถเข้าถึงผ่านชื่อ class ได้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:36:en"
  };

  window.CONTENT_I18N["java:37"] = window.CONTENT_I18N["java:37"] || {};
  window.CONTENT_I18N["java:37"].th = {
    title: "เมธอดคลาส (static method)",
    concept: "static method หรือ class method เรียกได้โดยไม่ต้องสร้าง instance เช่น Math.sqrt() หรือ System.out.println() Method แบบ static เหมาะกับงาน utility ที่ไม่ต้องใช้สถานะเฉพาะของ object",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:37:en"
  };

  window.CONTENT_I18N["java:38"] = window.CONTENT_I18N["java:38"] || {};
  window.CONTENT_I18N["java:38"].th = {
    title: "แบบฝึกหัด: บทที่ 6",
    concept: "แบบฝึกหัดบทที่ 6: สร้าง constructor Student(String name, int age) เพื่อกำหนดค่าเริ่มต้นตอน new จากนั้นสร้าง object หนึ่งตัวและพิมพ์ข้อมูลออกมา ตรวจว่า constructor รับค่าและเก็บลง field ถูกต้อง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:38:en"
  };

  window.CONTENT_I18N["java:39"] = window.CONTENT_I18N["java:39"] || {};
  window.CONTENT_I18N["java:39"].th = {
    title: "การสืบทอด (Inheritance) คืออะไร",
    concept: "Inheritance คือการสร้าง class ใหม่ที่สืบทอดคุณสมบัติจาก class เดิม class ลูกสามารถใช้ field และ method ที่อนุญาตจาก class แม่ได้ ช่วยลดการเขียนซ้ำและจัดความสัมพันธ์แบบทั่วไปไปเฉพาะเจาะจง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:39:en"
  };

  window.CONTENT_I18N["java:40"] = window.CONTENT_I18N["java:40"] || {};
  window.CONTENT_I18N["java:40"].th = {
    title: "การโอเวอร์ไรด์เมธอด (Overriding)",
    concept: "Method overriding คือการนิยาม method ใน class ลูกใหม่ให้แทนพฤติกรรมของ class แม่ โดยชื่อ method, parameter และชนิดคืนค่าต้องเข้ากัน มักใช้ @Override เพื่อให้ compiler ช่วยตรวจว่ากำลัง override จริง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:40:en"
  };

  window.CONTENT_I18N["java:41"] = window.CONTENT_I18N["java:41"] || {};
  window.CONTENT_I18N["java:41"].th = {
    title: "พอลิมอร์ฟิซึม (Polymorphism)",
    concept: "Polymorphism คือความสามารถที่ตัวแปรชนิด class แม่สามารถอ้างถึง instance ของ class ลูกได้ ตอนเรียก method Java จะเลือก implementation ตามชนิด object จริงใน runtime ทำให้โค้ดยืดหยุ่นขึ้น",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:41:en"
  };

  window.CONTENT_I18N["java:42"] = window.CONTENT_I18N["java:42"] || {};
  window.CONTENT_I18N["java:42"].th = {
    title: "คีย์เวิร์ด super",
    concept: "super keyword ใช้อ้างถึง class แม่ เช่นเรียก constructor ของ class แม่ด้วย super(...) หรือเรียก method ของ class แม่เมื่อ class ลูก override ไปแล้ว ช่วยเชื่อมการทำงานระหว่างชั้น inheritance",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:42:en"
  };

  window.CONTENT_I18N["java:43"] = window.CONTENT_I18N["java:43"] || {};
  window.CONTENT_I18N["java:43"].th = {
    title: "คลาส Object",
    concept: "Object class เป็น class รากที่ทุก class ใน Java สืบทอดโดยอัตโนมัติ จึงมี method พื้นฐานบางอย่างร่วมกัน เช่น toString(), equals() และ hashCode() แม้ไม่ได้เขียน extends Object เองก็ตาม",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:43:en"
  };

  window.CONTENT_I18N["java:44"] = window.CONTENT_I18N["java:44"] || {};
  window.CONTENT_I18N["java:44"].th = {
    title: "แบบฝึกหัด: บทที่ 7",
    concept: "แบบฝึกหัดบทที่ 7: สร้าง class แม่ Animal และ class ลูก Dog ที่ extends Animal ให้ Animal มี method run() และ Dog มี method bark() จากนั้นสร้าง Dog instance แล้วเรียกทั้งสอง method เพื่อยืนยัน inheritance",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:44:en"
  };

  window.CONTENT_I18N["java:45"] = window.CONTENT_I18N["java:45"] || {};
  window.CONTENT_I18N["java:45"].th = {
    title: "ตัวแก้ไขการเข้าถึง (Access Modifier)",
    concept: "Access modifiers กำหนดระดับการเข้าถึงสมาชิกของ class เช่น public ใช้ได้จากทุกที่, private ใช้เฉพาะใน class เดียวกัน, protected ใช้ใน package เดียวกันและ class ลูก ส่วนไม่ระบุ modifier จะใช้ได้ใน package เดียวกัน",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:45:en"
  };

  window.CONTENT_I18N["java:46"] = window.CONTENT_I18N["java:46"] || {};
  window.CONTENT_I18N["java:46"].th = {
    title: "ตัวแก้ไข final",
    concept: "final modifier ใช้ห้ามการเปลี่ยนแปลงบางอย่าง final variable เปลี่ยนค่าไม่ได้หลังตั้งค่าแล้ว final method override ไม่ได้ และ final class ถูกสืบทอดไม่ได้ เหมาะกับค่าคงที่หรือพฤติกรรมที่ต้องการตรึงไว้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:46:en"
  };

  window.CONTENT_I18N["java:47"] = window.CONTENT_I18N["java:47"] || {};
  window.CONTENT_I18N["java:47"].th = {
    title: "คลาส абстракт (abstract class)",
    concept: "Abstract class คือ class ที่สร้าง instance โดยตรงไม่ได้ ใช้เป็นแม่แบบให้ class ลูกสืบทอด อาจมี abstract method ที่ประกาศไว้แต่ยังไม่มี body class ลูกต้อง implement method เหล่านั้นก่อนจึงสร้าง object ได้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:47:en"
  };

  window.CONTENT_I18N["java:48"] = window.CONTENT_I18N["java:48"] || {};
  window.CONTENT_I18N["java:48"].th = {
    title: "อินเทอร์เฟซ (Interface)",
    concept: "Interface คือสัญญาที่กำหนดชุด method ที่ class ต้องมี class สามารถ implements interface ได้หลายตัว จึงใช้แทนแนวคิดหลายบทบาท เช่น Flyable และ Swimmable โดยยังคง inheritance ของ class ได้หนึ่งสาย",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:48:en"
  };

  window.CONTENT_I18N["java:49"] = window.CONTENT_I18N["java:49"] || {};
  window.CONTENT_I18N["java:49"].th = {
    title: "แบบฝึกหัด: บทที่ 8",
    concept: "แบบฝึกหัดบทที่ 8: สร้าง abstract class Shape ที่มี abstract method draw() แล้วสร้าง class Circle ที่ extends Shape และ override draw() เพื่อพิมพ์ Drawing a circle. ตรวจว่า class ลูก implement method ครบถ้วน",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:49:en"
  };

  window.CONTENT_I18N["java:50"] = window.CONTENT_I18N["java:50"] || {};
  window.CONTENT_I18N["java:50"].th = {
    title: "แพ็กเกจ (Package) คืออะไร",
    concept: "Package คือกลไกจัดกลุ่ม class ที่เกี่ยวข้องกัน คล้ายโฟลเดอร์ของโค้ด ช่วยลดปัญหาชื่อซ้ำและทำให้โครงสร้างโปรเจกต์ชัดเจน เช่น java.util.ArrayList คือ class ArrayList ใน package java.util",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:50:en"
  };

  window.CONTENT_I18N["java:51"] = window.CONTENT_I18N["java:51"] || {};
  window.CONTENT_I18N["java:51"].th = {
    title: "การประกาศ import",
    concept: "import declaration ใช้นำ class จาก package อื่นมาใช้ในไฟล์ปัจจุบัน เช่น import java.util.ArrayList; ถ้า import java.util.* จะนำชื่อ class ใน package นั้นมาใช้ได้หลายตัว ส่วน java.lang ถูก import อัตโนมัติ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:51:en"
  };

  window.CONTENT_I18N["java:52"] = window.CONTENT_I18N["java:52"] || {};
  window.CONTENT_I18N["java:52"].th = {
    title: "เมธอดหลักของคลาส String",
    concept: "String class มี method สำคัญหลายตัว เช่น length() คืนจำนวนอักขระ, charAt(i) อ่านอักขระตามตำแหน่ง, substring(s,e) ตัดข้อความบางส่วน, indexOf(s) หาตำแหน่ง, equals(s) เปรียบเทียบข้อความ และ split(s) แยกข้อความ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:52:en"
  };

  window.CONTENT_I18N["java:53"] = window.CONTENT_I18N["java:53"] || {};
  window.CONTENT_I18N["java:53"].th = {
    title: "เมธอดหลักของคลาส Math",
    concept: "Math class รวม method คำนวณพื้นฐาน เช่น abs สำหรับค่าสัมบูรณ์, sqrt สำหรับรากที่สอง, pow สำหรับยกกำลัง, max/min สำหรับเลือกค่าสูงสุดหรือต่ำสุด, random สำหรับสุ่มเลข และ PI สำหรับค่าพาย",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:53:en"
  };

  window.CONTENT_I18N["java:54"] = window.CONTENT_I18N["java:54"] || {};
  window.CONTENT_I18N["java:54"].th = {
    title: "แบบฝึกหัด: บทที่ 1 (ส่วนที่ 2)",
    concept: "แบบฝึกหัดบทที่ 1 ส่วนที่ 2: ใช้ method สำคัญของ String เขียนโปรแกรมรับข้อความจาก stdin แล้วแสดงจำนวนอักขระและอักขระสามตัวแรกของข้อความนั้น ระวังกรณีข้อความสั้นกว่าสามตัวตามเงื่อนไขของโจทย์",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:54:en"
  };

  window.CONTENT_I18N["java:55"] = window.CONTENT_I18N["java:55"] || {};
  window.CONTENT_I18N["java:55"].th = {
    title: "ข้อยกเว้น (Exception) คืออะไร",
    concept: "Exception คือเหตุการณ์ผิดพลาดที่เกิดระหว่างรันโปรแกรม เช่นหารด้วยศูนย์, index ของ array เกินขอบเขต หรือเรียก method ผ่าน null ถ้าไม่จัดการ exception โปรแกรมอาจหยุดทำงานทันที",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:55:en"
  };

  window.CONTENT_I18N["java:56"] = window.CONTENT_I18N["java:56"] || {};
  window.CONTENT_I18N["java:56"].th = {
    title: "คำสั่ง try-catch",
    concept: "try-catch ใช้จับ exception เพื่อให้โปรแกรมจัดการข้อผิดพลาดได้อย่างปลอดภัย โค้ดที่เสี่ยงวางใน try และวิธีรับมือวางใน catch เช่นจับ ArithmeticException แล้วแสดงข้อความแทนการให้โปรแกรม crash",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:56:en"
  };

  window.CONTENT_I18N["java:57"] = window.CONTENT_I18N["java:57"] || {};
  window.CONTENT_I18N["java:57"].th = {
    title: "คลาสข้อยกเว้นหลัก",
    concept: "Exception class ที่พบบ่อย ได้แก่ ArithmeticException สำหรับการคำนวณผิดเช่นหารด้วยศูนย์, NullPointerException สำหรับใช้งาน null, ArrayIndexOutOfBoundsException สำหรับ index เกิน, NumberFormatException สำหรับแปลงตัวเลขผิด และ IOException สำหรับงาน input/output",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:57:en"
  };

  window.CONTENT_I18N["java:58"] = window.CONTENT_I18N["java:58"] || {};
  window.CONTENT_I18N["java:58"].th = {
    title: "การโยนข้อยกเว้น (throw)",
    concept: "throw ใช้โยน exception ด้วยตัวเองเมื่อพบค่าหรือสถานการณ์ที่ไม่ควรดำเนินต่อ เช่น throw new IllegalArgumentException(...) เพื่อบอกว่าค่าที่รับเข้ามาไม่ถูกต้อง ผู้เรียกต้องจัดการตามชนิด exception",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:58:en"
  };

  window.CONTENT_I18N["java:59"] = window.CONTENT_I18N["java:59"] || {};
  window.CONTENT_I18N["java:59"].th = {
    title: "การประกาศข้อยกเว้น (throws)",
    concept: "throws ใช้ประกาศว่า method อาจโยน exception ออกไปให้ผู้เรียกจัดการเอง เหมาะกับงานที่ method ระดับล่างไม่ควรกำหนดวิธีรับมือ เช่น readFile(String path) throws IOException",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:59:en"
  };

  window.CONTENT_I18N["java:60"] = window.CONTENT_I18N["java:60"] || {};
  window.CONTENT_I18N["java:60"].th = {
    title: "แบบฝึกหัด: บทที่ 2 (ส่วนที่ 2)",
    concept: "แบบฝึกหัดบทที่ 2 ส่วนที่ 2: เขียนโปรแกรมที่จับ ArithmeticException อย่างปลอดภัยเมื่อเกิดการหารด้วยศูนย์ แสดงข้อความ [Error] Cannot divide by zero. แล้วจบโปรแกรมตามปกติโดยไม่ crash",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:60:en"
  };

  window.CONTENT_I18N["java:61"] = window.CONTENT_I18N["java:61"] || {};
  window.CONTENT_I18N["java:61"].th = {
    title: " thread (เธรด) คืออะไร",
    concept: "Thread คือสายการทำงานหนึ่งของโปรแกรม โปรแกรมทั่วไปเริ่มจาก main thread เพียงสายเดียว แต่ multithreading ทำให้หลายงานเดินพร้อมกันได้ เช่นทำงานเบื้องหลังขณะ UI ยังตอบสนองผู้ใช้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:61:en"
  };

  window.CONTENT_I18N["java:62"] = window.CONTENT_I18N["java:62"] || {};
  window.CONTENT_I18N["java:62"].th = {
    title: "สร้าง Thread วิธีที่ 1: สืบทอด Thread",
    concept: "วิธีสร้าง thread แบบที่ 1 คือสร้าง class ที่ extends Thread แล้ว override method run() จากนั้นสร้าง instance และเรียก start() เพื่อให้ run() ทำงานบน thread ใหม่ ไม่ควรเรียก run() โดยตรงถ้าต้องการ thread แยก",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:62:en"
  };

  window.CONTENT_I18N["java:63"] = window.CONTENT_I18N["java:63"] || {};
  window.CONTENT_I18N["java:63"].th = {
    title: "สร้าง Thread วิธีที่ 2: ใช้ Runnable",
    concept: "วิธีสร้าง thread แบบที่ 2 คือสร้าง class ที่ implements Runnable แล้วเขียนงานใน run() จากนั้นส่ง object นี้ให้ new Thread(...) และเรียก start() วิธีนี้ยืดหยุ่นเพราะ class ยังสามารถสืบทอด class อื่นได้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:63:en"
  };

  window.CONTENT_I18N["java:64"] = window.CONTENT_I18N["java:64"] || {};
  window.CONTENT_I18N["java:64"].th = {
    title: "เมธอด Thread ที่ใช้บ่อย",
    concept: "Thread methods ที่ใช้บ่อย เช่น sleep(ms) เพื่อหยุด thread ชั่วคราวตามเวลาที่กำหนด, join() เพื่อรอให้ thread อื่นจบงาน และ getName() เพื่ออ่านชื่อ thread สำหรับ debug หรือ log",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:64:en"
  };

  window.CONTENT_I18N["java:65"] = window.CONTENT_I18N["java:65"] || {};
  window.CONTENT_I18N["java:65"].th = {
    title: "การซิงโครไนซ์ (synchronized)",
    concept: "synchronized ใช้ควบคุมไม่ให้หลาย thread เข้าแก้ข้อมูลร่วมกันพร้อมกันจนเกิดผลลัพธ์ผิดพลาด เมื่อ method หรือ block ถูก synchronized จะมี thread เดียวเข้าทำงานในช่วงวิกฤตนั้นได้ในเวลาเดียว",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:65:en"
  };

  window.CONTENT_I18N["java:66"] = window.CONTENT_I18N["java:66"] || {};
  window.CONTENT_I18N["java:66"].th = {
    title: "แบบฝึกหัด: บทที่ 3 (ส่วนที่ 2)",
    concept: "แบบฝึกหัดบทที่ 3 ส่วนที่ 2: สร้าง thread แยกโดยใช้ Runnable ให้พิมพ์ Thread has started! สามครั้งโดยเว้นระยะหนึ่งวินาที และให้ทำงานควบคู่กับ main thread เพื่อสังเกตลำดับ output",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:66:en"
  };

  window.CONTENT_I18N["java:67"] = window.CONTENT_I18N["java:67"] || {};
  window.CONTENT_I18N["java:67"].th = {
    title: "ชนิดของหน่วยความจำ",
    concept: "Memory หลักที่ควรรู้คือ stack และ heap Stack เก็บ local variables และข้อมูลการเรียก method แบบเข้าออกเร็ว ส่วน heap เก็บ object ที่สร้างด้วย new มีขนาดใหญ่กว่าแต่ต้องจัดการอายุการใช้งานผ่าน GC",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:67:en"
  };

  window.CONTENT_I18N["java:68"] = window.CONTENT_I18N["java:68"] || {};
  window.CONTENT_I18N["java:68"].th = {
    title: "Garbage Collection (GC)",
    concept: "Garbage Collection หรือ GC คือกลไกที่ JVM ใช้คืน memory ของ object ที่ไม่มี reference ชี้ถึงแล้ว โปรแกรมเมอร์ Java จึงไม่ต้อง free memory เองเหมือนบางภาษา แต่ยังต้องระวังการเก็บ reference ค้างไว้โดยไม่จำเป็น",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:68:en"
  };

  window.CONTENT_I18N["java:69"] = window.CONTENT_I18N["java:69"] || {};
  window.CONTENT_I18N["java:69"].th = {
    title: "GC ทำงานเมื่อไหร่",
    concept: "GC จะทำงานเมื่อ JVM เห็นว่าเหมาะสม เช่น heap เริ่มไม่พอหรือระบบต้องการคืน memory เวลาแน่นอนไม่สามารถควบคุมได้โดยตรง ถึงเรียก System.gc() ก็เป็นเพียงการขอให้ JVM พิจารณาเท่านั้น",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:69:en"
  };

  window.CONTENT_I18N["java:70"] = window.CONTENT_I18N["java:70"] || {};
  window.CONTENT_I18N["java:70"].th = {
    title: "เมื่อไหร่ที่ออบเจกต์กลายเป็นเป้าหมาย GC",
    concept: "Object จะเป็นเป้าหมายของ GC เมื่อไม่มี reference ใดเข้าถึงได้ เช่นตัวแปรถูกกำหนดไปชี้ object ใหม่ หรือตั้งค่าเป็น null เมื่อ object เดิมไม่มีทางถูกใช้ต่อ JVM สามารถเก็บคืน memory ได้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:70:en"
  };

  window.CONTENT_I18N["java:71"] = window.CONTENT_I18N["java:71"] || {};
  window.CONTENT_I18N["java:71"].th = {
    title: "ข้อควรระวังเกี่ยวกับหน่วยความจำ",
    concept: "ข้อควรระวังเรื่อง memory ได้แก่ OutOfMemoryError เมื่อ heap ไม่พอ และ StackOverflowError เมื่อเรียกซ้ำลึกเกินไปหรือ stack เต็ม การออกแบบโครงสร้างข้อมูลและ recursion จึงต้องคำนึงถึงขนาดและอายุของข้อมูล",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:71:en"
  };

  window.CONTENT_I18N["java:72"] = window.CONTENT_I18N["java:72"] || {};
  window.CONTENT_I18N["java:72"].th = {
    title: "แบบฝึกหัด: บทที่ 4 (ส่วนที่ 2)",
    concept: "แบบฝึกหัดบทที่ 4 ส่วนที่ 2: สร้าง instance จำนวนมากแล้วปล่อยให้ไม่ถูกใช้งาน จากนั้นเรียก Runtime.getRuntime().gc() และแสดง memory ก่อนและหลังเพื่อสังเกตแนวคิดของ GC โดยเข้าใจว่าผลจริงขึ้นกับ JVM",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:72:en"
  };

  window.CONTENT_I18N["java:73"] = window.CONTENT_I18N["java:73"] || {};
  window.CONTENT_I18N["java:73"].th = {
    title: "คอลเลกชัน (Collection) คืออะไร",
    concept: "Collection คือชุด class และ interface ที่ช่วยจัดการ object หลายตัวอย่างยืดหยุ่นกว่า array เช่น List สำหรับข้อมูลมีลำดับและซ้ำได้, Set สำหรับไม่ให้ซ้ำ และ Map สำหรับเก็บคู่ key-value",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:73:en"
  };

  window.CONTENT_I18N["java:74"] = window.CONTENT_I18N["java:74"] || {};
  window.CONTENT_I18N["java:74"].th = {
    title: "ArrayList",
    concept: "ArrayList เป็น List ที่ขนาดปรับได้ ใช้ add เพื่อเพิ่มสมาชิก, get(index) เพื่ออ่านสมาชิก และ size() เพื่อดูจำนวน เหมาะกับรายการที่ต้องเข้าถึงตามลำดับหรือ index บ่อยๆ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:74:en"
  };

  window.CONTENT_I18N["java:75"] = window.CONTENT_I18N["java:75"] || {};
  window.CONTENT_I18N["java:75"].th = {
    title: "HashMap",
    concept: "HashMap เก็บข้อมูลแบบ key-value ใช้ put เพื่อเพิ่มหรือแก้ค่า, get(key) เพื่ออ่านค่า, containsKey เพื่อตรวจว่ามี key หรือไม่ และ keySet เพื่อวนดู key ทั้งหมด เหมาะกับการค้นหาด้วยรหัสหรือชื่อ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:75:en"
  };

  window.CONTENT_I18N["java:76"] = window.CONTENT_I18N["java:76"] || {};
  window.CONTENT_I18N["java:76"].th = {
    title: "HashSet",
    concept: "HashSet เป็น Set ที่ไม่เก็บค่าซ้ำ ถ้า add ค่าเดิมอีกครั้ง ขนาดของ set จะไม่เพิ่ม เหมาะกับการเก็บรายการที่ต้องการความไม่ซ้ำ เช่นชุดคำศัพท์หรือรหัสที่พบแล้ว",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:76:en"
  };

  window.CONTENT_I18N["java:77"] = window.CONTENT_I18N["java:77"] || {};
  window.CONTENT_I18N["java:77"].th = {
    title: "ลูป for-each (Enhanced for)",
    concept: "Enhanced for loop หรือ for-each ใช้วนครบทุกสมาชิกใน array หรือ collection โดยไม่ต้องจัดการ index เอง รูปแบบคือ for (Type item : list) เหมาะกับงานที่อ่านหรือประมวลผลสมาชิกทีละตัว",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:77:en"
  };

  window.CONTENT_I18N["java:78"] = window.CONTENT_I18N["java:78"] || {};
  window.CONTENT_I18N["java:78"].th = {
    title: "เจเนริกส์ (Generics)",
    concept: "Generics ใช้ระบุชนิดข้อมูลที่ collection จะเก็บ เช่น ArrayList<String> ทำให้ compiler ตรวจชนิดได้ตั้งแต่ตอน compile ลดการ cast และลด bug จากการใส่ object ผิดชนิดลงใน collection",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:78:en"
  };

  window.CONTENT_I18N["java:79"] = window.CONTENT_I18N["java:79"] || {};
  window.CONTENT_I18N["java:79"].th = {
    title: "แบบฝึกหัด: บทที่ 5 (ส่วนที่ 2)",
    concept: "แบบฝึกหัดบทที่ 5 ส่วนที่ 2: ใช้ HashMap สร้างสมุดคะแนน โดย key เป็นชื่อนักเรียนแบบ String และ value เป็นคะแนนแบบ Integer เพิ่มข้อมูลนักเรียนสามคน แล้วค้นหาและพิมพ์คะแนนของนักเรียนที่กำหนด",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:79:en"
  };

  window.CONTENT_I18N["java:80"] = window.CONTENT_I18N["java:80"] || {};
  window.CONTENT_I18N["java:80"].th = {
    title: "คลาสไม่ระบุชื่อ (Anonymous Class) คืออะไร",
    concept: "Anonymous class คือ class ไม่มีชื่อที่ประกาศและใช้งานตรงจุดนั้นทันที มักใช้เมื่อต้อง implement interface หรือสืบทอด class เพียงครั้งเดียว ช่วยลดการสร้างไฟล์หรือ class แยกสำหรับงานเล็กๆ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:80:en"
  };

  window.CONTENT_I18N["java:81"] = window.CONTENT_I18N["java:81"] || {};
  window.CONTENT_I18N["java:81"].th = {
    title: "Functional Interface (อินเทอร์เฟซฟังก์ชัน)",
    concept: "Functional interface คือ interface ที่มี abstract method เพียงหนึ่งตัว จึงสามารถแทนด้วย lambda expression ได้ ตัวอย่างเช่น Runnable มี method run() หนึ่งตัว ทำให้เขียนงานสั้นลงโดยไม่ต้องสร้าง anonymous class ยาวๆ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:81:en"
  };

  window.CONTENT_I18N["java:82"] = window.CONTENT_I18N["java:82"] || {};
  window.CONTENT_I18N["java:82"].th = {
    title: "ไวยากรณ์ Lambda Expression",
    concept: "Lambda expression เป็นรูปแบบย่อสำหรับส่งพฤติกรรมเป็นค่า เช่น () -> System.out.println(\"Hello\") หรือ x -> x * 2 ด้านซ้ายคือ parameter และด้านขวาคือการประมวลผลหรือค่าที่คืนกลับ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:82:en"
  };

  window.CONTENT_I18N["java:83"] = window.CONTENT_I18N["java:83"] || {};
  window.CONTENT_I18N["java:83"].th = {
    title: "รูปแบบย่อของ Lambda",
    concept: "Lambda สามารถเขียนสั้นลงได้หลายแบบ ถ้ามี parameter เดียวอาจละวงเล็บได้ ถ้า body มี expression เดียวอาจละวงเล็บปีกกาและ return ได้ แต่ถ้ามีหลายคำสั่งต้องใช้ block และเขียน return เองเมื่อมีค่าคืน",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:83:en"
  };

  window.CONTENT_I18N["java:84"] = window.CONTENT_I18N["java:84"] || {};
  window.CONTENT_I18N["java:84"].th = {
    title: "forEach กับ Lambda",
    concept: "forEach ใช้ร่วมกับ lambda เพื่อประมวลผลสมาชิกทุกตัวใน collection เช่น list.forEach(s -> System.out.println(s)) หรือใช้ method reference แบบ System.out::println เมื่อแค่ส่งต่อค่าให้ method เดิม",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:84:en"
  };

  window.CONTENT_I18N["java:85"] = window.CONTENT_I18N["java:85"] || {};
  window.CONTENT_I18N["java:85"].th = {
    title: "การเรียงลำดับด้วย Lambda",
    concept: "การ sort ด้วย lambda ใช้กำหนด comparator ได้กระชับ เช่น list.sort((a, b) -> a.compareTo(b)) สำหรับเรียงจากน้อยไปมาก และสลับ a กับ b เพื่อเรียงกลับด้าน หลักสำคัญคือ lambda ต้องบอกลำดับเปรียบเทียบ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:85:en"
  };

  window.CONTENT_I18N["java:86"] = window.CONTENT_I18N["java:86"] || {};
  window.CONTENT_I18N["java:86"].th = {
    title: "แบบฝึกหัด: บทที่ 6 (ส่วนที่ 2)",
    concept: "แบบฝึกหัดบทที่ 6 ส่วนที่ 2: ใช้ lambda และ list ที่มี 10, 20, 30 เพื่อคูณสมาชิกแต่ละตัวเป็นสองเท่า แล้วพิมพ์ผลด้วย forEach ให้โค้ดสั้นและแสดงแนวคิด functional style",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:86:en"
  };

  window.CONTENT_I18N["java:87"] = window.CONTENT_I18N["java:87"] || {};
  window.CONTENT_I18N["java:87"].th = {
    title: "อินพุต/เอาต์พุตมาตรฐาน",
    concept: "Standard output คือช่องทางที่โปรแกรมพิมพ์ข้อมูลออก เช่น System.out.println() ส่วน standard input คือข้อมูลที่อ่านจากผู้ใช้หรือ stdin เช่น Scanner(System.in) การเข้าใจ stdin/stdout สำคัญมากสำหรับ sandbox และข้อสอบเขียนโปรแกรม",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:87:en"
  };

  window.CONTENT_I18N["java:88"] = window.CONTENT_I18N["java:88"] || {};
  window.CONTENT_I18N["java:88"].th = {
    title: "เขียนไฟล์",
    concept: "การเขียน file ใน Java ใช้ class ใน java.io เช่น FileWriter สำหรับเขียนพื้นฐาน และ BufferedWriter สำหรับเขียนแบบมี buffer ซึ่งมักมีประสิทธิภาพดีกว่า หลังใช้งานควรปิด resource เพื่อให้ข้อมูลถูกเขียนครบ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:88:en"
  };

  window.CONTENT_I18N["java:89"] = window.CONTENT_I18N["java:89"] || {};
  window.CONTENT_I18N["java:89"].th = {
    title: "อ่านไฟล์",
    concept: "การอ่าน file สามารถใช้ FileReader ร่วมกับ BufferedReader แล้วอ่านทีละบรรทัดด้วย readLine() จนได้ null ซึ่งหมายถึงจบไฟล์ หลังอ่านเสร็จต้องปิด reader เพื่อคืน resource ให้ระบบ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:89:en"
  };

  window.CONTENT_I18N["java:90"] = window.CONTENT_I18N["java:90"] || {};
  window.CONTENT_I18N["java:90"].th = {
    title: "try-with-resources",
    concept: "try-with-resources เป็น syntax ที่ช่วยปิด stream หรือ resource อัตโนมัติเมื่อออกจาก block ใช้กับ object ที่ implements AutoCloseable ทำให้โค้ดปลอดภัยกว่าและลดปัญหาลืม close เมื่อเกิด exception",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:90:en"
  };

  window.CONTENT_I18N["java:91"] = window.CONTENT_I18N["java:91"] || {};
  window.CONTENT_I18N["java:91"].th = {
    title: "Serialization (ซีเรียลไลเซชัน)",
    concept: "Serialization คือการแปลง object ให้บันทึกลง file หรือส่งต่อได้ แล้วอ่านกลับมาเป็น object อีกครั้ง Class ที่ต้องการ serialize ต้อง implements Serializable เหมาะกับการบันทึกสถานะ แต่ต้องระวังความเข้ากันได้ของ version",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:91:en"
  };

  window.CONTENT_I18N["java:92"] = window.CONTENT_I18N["java:92"] || {};
  window.CONTENT_I18N["java:92"].th = {
    title: "แบบฝึกหัด: บทที่ 7 (ส่วนที่ 2)",
    concept: "แบบฝึกหัดบทที่ 7 ส่วนที่ 2: ใช้ ByteArrayOutputStream เขียนข้อความ Java Advanced Learning Complete ลงใน memory จากนั้นอ่านกลับจาก byte array และพิมพ์ออก console เพื่อเข้าใจ input/output stream ใน memory",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:92:en"
  };

  window.CONTENT_I18N["java:93"] = window.CONTENT_I18N["java:93"] || {};
  window.CONTENT_I18N["java:93"].th = {
    title: "GUI คืออะไร",
    concept: "GUI ย่อมาจาก Graphical User Interface หมายถึงส่วนติดต่อผู้ใช้แบบภาพ เช่นหน้าต่าง ปุ่ม กล่องข้อความ และเมนู โปรแกรม GUI โต้ตอบกับผู้ใช้ผ่านเหตุการณ์มากกว่าการพิมพ์คำสั่งอย่างเดียว",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:93:en"
  };

  window.CONTENT_I18N["java:94"] = window.CONTENT_I18N["java:94"] || {};
  window.CONTENT_I18N["java:94"].th = {
    title: "ไลบรารี Swing",
    concept: "Swing เป็น standard library ของ Java สำหรับสร้าง GUI อยู่ใน package javax.swing มี component สำคัญเช่น JFrame สำหรับหน้าต่าง, JButton สำหรับปุ่ม, JLabel สำหรับข้อความ และ JTextField สำหรับช่องกรอก",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:94:en"
  };

  window.CONTENT_I18N["java:95"] = window.CONTENT_I18N["java:95"] || {};
  window.CONTENT_I18N["java:95"].th = {
    title: "Layout Manager (ตัวจัดการเลย์เอาต์)",
    concept: "Layout manager จัดตำแหน่ง component ในหน้าต่าง เช่น FlowLayout วางเรียงตามลำดับ, BorderLayout แบ่งพื้นที่เป็นบน ล่าง ซ้าย ขวา กลาง และ GridLayout วางเป็นตาราง ช่วยให้ UI ปรับตามขนาดหน้าต่างได้ดีขึ้น",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:95:en"
  };

  window.CONTENT_I18N["java:96"] = window.CONTENT_I18N["java:96"] || {};
  window.CONTENT_I18N["java:96"].th = {
    title: "การจัดการเหตุการณ์ (Event Handling)",
    concept: "Event handling คือการตอบสนองต่อเหตุการณ์ เช่นผู้ใช้กดปุ่มหรือขยับเมาส์ ใน Swing มักเพิ่ม listener ให้ component เช่น addActionListener เพื่อกำหนดโค้ดที่จะทำงานเมื่อเกิด event",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:96:en"
  };

  window.CONTENT_I18N["java:97"] = window.CONTENT_I18N["java:97"] || {};
  window.CONTENT_I18N["java:97"].th = {
    title: "หมายเหตุ",
    concept: "หมายเหตุ: โปรแกรม GUI ต้องใช้หน้าต่าง Swing จริง จึงไม่สามารถแสดงผลโดยตรงใน sandbox นี้ได้ ให้รันใน IDE หรือสภาพแวดล้อม Java บนเครื่องเพื่อเห็นหน้าต่างและ component จริง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:97:en"
  };

  window.CONTENT_I18N["java:98"] = window.CONTENT_I18N["java:98"] || {};
  window.CONTENT_I18N["java:98"].th = {
    title: "แบบฝึกหัด: บทที่ 8",
    concept: "แบบฝึกหัดบทที่ 8: ทบทวน GUI ใน Swing โดยสร้างโค้ดสำหรับ JFrame และ JButton เพื่อประกอบหน้าต่างพื้นฐาน ตั้งค่าขนาด ชื่อหน้าต่าง และการแสดงผล แล้วรันใน IDE ที่รองรับ GUI",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:98:en"
  };

  window.CONTENT_I18N["java:99"] = window.CONTENT_I18N["java:99"] || {};
  window.CONTENT_I18N["java:99"].th = {
    title: "กลไกการวาดรูปใน Java",
    concept: "การวาดภาพใน Java มักทำโดยสร้าง class ที่ extends JPanel แล้ว override method paintComponent(Graphics g) เมื่อระบบต้องวาด component จะเรียก method นี้ เราจึงใส่คำสั่งวาดรูปไว้ภายในอย่างเป็นระเบียบ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:99:en"
  };

  window.CONTENT_I18N["java:100"] = window.CONTENT_I18N["java:100"] || {};
  window.CONTENT_I18N["java:100"].th = {
    title: "คลาส Graphics2D",
    concept: "Graphics2D เป็นรุ่นที่มีความสามารถมากกว่า Graphics สามารถตั้งความหนาเส้น สี การเรนเดอร์ และวาดรูปทรงต่างๆได้ โดยมัก cast จาก Graphics เป็น Graphics2D ภายใน paintComponent",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:100:en"
  };

  window.CONTENT_I18N["java:101"] = window.CONTENT_I18N["java:101"] || {};
  window.CONTENT_I18N["java:101"].th = {
    title: "ระบบพิกัด",
    concept: "ระบบพิกัดของการวาดภาพใน Java เริ่มที่มุมซ้ายบนเป็น (0, 0) แกน X เพิ่มไปทางขวา และแกน Y เพิ่มลงด้านล่าง ดังนั้นตำแหน่งและขนาดของรูปต้องคำนวณตามทิศทางนี้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:101:en"
  };

  window.CONTENT_I18N["java:102"] = window.CONTENT_I18N["java:102"] || {};
  window.CONTENT_I18N["java:102"].th = {
    title: "เหตุการณ์เมาส์",
    concept: "Mouse events คือเหตุการณ์จากเมาส์ เช่น clicked, pressed, released, entered และ exited ใช้ MouseListener เพื่อรับเหตุการณ์เหล่านี้และเขียนโค้ดตอบสนอง เช่นวาดรูปเมื่อผู้ใช้คลิก",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:102:en"
  };

  window.CONTENT_I18N["java:103"] = window.CONTENT_I18N["java:103"] || {};
  window.CONTENT_I18N["java:103"].th = {
    title: "หมายเหตุ",
    concept: "หมายเหตุ: โปรแกรมวาดภาพต้องใช้ GUI window และไม่สามารถทำงานตรงๆใน sandbox นี้ได้ ให้ใช้ IDE บนเครื่องเพื่อเปิดหน้าต่าง Swing และตรวจผลการวาดจริง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:103:en"
  };

  window.CONTENT_I18N["java:104"] = window.CONTENT_I18N["java:104"] || {};
  window.CONTENT_I18N["java:104"].th = {
    title: "แบบฝึกหัด: บทที่ 9",
    concept: "แบบฝึกหัดบทที่ 9: ใช้ Graphics2D สร้างโครงสำหรับ method ที่วาดสี่เหลี่ยมผืนผ้าเริ่มที่ตำแหน่ง (50, 50) กว้าง 200 และสูง 100 ให้จัดโค้ดวาดไว้ในจุดที่ Swing เรียกตอน repaint",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:104:en"
  };

  window.CONTENT_I18N["java:105"] = window.CONTENT_I18N["java:105"] || {};
  window.CONTENT_I18N["java:105"].th = {
    title: "การเขียนโปรแกรมเครือข่ายใน Java",
    concept: "Java network programming ใช้ package java.net เพื่อสื่อสารผ่านเครือข่าย เช่น TCP/IP โปรแกรมอาจทำหน้าที่เป็น server ที่รอรับ connection หรือ client ที่เชื่อมต่อไปยัง server",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:105:en"
  };

  window.CONTENT_I18N["java:106"] = window.CONTENT_I18N["java:106"] || {};
  window.CONTENT_I18N["java:106"].th = {
    title: "แนวคิดพื้นฐาน",
    concept: "แนวคิดพื้นฐานของ network ได้แก่ IP address สำหรับระบุเครื่องในเครือข่าย, port number สำหรับระบุโปรแกรมหรือบริการบนเครื่องนั้น และ TCP สำหรับการส่งข้อมูลที่เชื่อถือได้โดยรักษาลำดับและการส่งถึงปลายทาง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:106:en"
  };

  window.CONTENT_I18N["java:107"] = window.CONTENT_I18N["java:107"] || {};
  window.CONTENT_I18N["java:107"].th = {
    title: "ฝั่ง Server",
    concept: "ฝั่ง server ใช้ ServerSocket เปิด port แล้วรอ client ด้วย accept() เมื่อมีการเชื่อมต่อจะได้ Socket สำหรับรับส่งข้อมูล จากนั้นใช้ stream เช่น BufferedReader และ PrintWriter เพื่ออ่านและเขียนข้อความ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:107:en"
  };

  window.CONTENT_I18N["java:108"] = window.CONTENT_I18N["java:108"] || {};
  window.CONTENT_I18N["java:108"].th = {
    title: "ฝั่ง Client",
    concept: "ฝั่ง client สร้าง Socket โดยระบุ host และ port ของ server จากนั้นใช้ output stream เพื่อส่งข้อความ และ input stream เพื่ออ่านข้อความตอบกลับ หลังใช้งานควรปิด stream และ socket เพื่อคืน resource",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:108:en"
  };

  window.CONTENT_I18N["java:109"] = window.CONTENT_I18N["java:109"] || {};
  window.CONTENT_I18N["java:109"].th = {
    title: "หมายเหตุ",
    concept: "หมายเหตุ: โปรแกรม network ต้องมีทั้ง server และ client และมักต้องเปิด port จริง จึงไม่สามารถทดลองเต็มรูปแบบใน sandbox นี้ได้ แต่สามารถศึกษาโครงสร้างโค้ดและลำดับการรับส่งข้อมูลได้",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:109:en"
  };

  window.CONTENT_I18N["java:110"] = window.CONTENT_I18N["java:110"] || {};
  window.CONTENT_I18N["java:110"].th = {
    title: "แบบฝึกหัด: บทที่ 10",
    concept: "แบบฝึกหัดบทที่ 10: ใช้ socket communication สร้าง client แบบง่ายที่พยายามเชื่อมต่อไปยัง localhost และ port ที่กำหนด จากนั้นจัดการผลสำเร็จหรือข้อผิดพลาดเพื่อเข้าใจขั้นตอนการเชื่อมต่อ",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:110:en"
  };

  window.CONTENT_I18N["java:111"] = window.CONTENT_I18N["java:111"] || {};
  window.CONTENT_I18N["java:111"].th = {
    title: "Stream API (Java 8+)",
    concept: "Stream API ใน Java 8 ขึ้นไปช่วยประมวลผล collection แบบ functional เช่น filter เพื่อคัดกรอง, map เพื่อแปลงค่า และ reduce เพื่อรวมผล ทำให้เขียน pipeline การประมวลผลข้อมูลได้กระชับและอ่านง่าย",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:111:en"
  };

  window.CONTENT_I18N["java:112"] = window.CONTENT_I18N["java:112"] || {};
  window.CONTENT_I18N["java:112"].th = {
    title: "การดำเนินการ Stream หลัก",
    concept: "Stream operation แบ่งเป็น intermediate และ terminal Intermediate เช่น filter, map และ sorted จะสร้าง stream ต่อไป ส่วน terminal เช่น collect, forEach, count หรือ sum จะสรุปผลและทำให้ pipeline ถูกประเมินจริง",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:112:en"
  };

  window.CONTENT_I18N["java:113"] = window.CONTENT_I18N["java:113"] || {};
  window.CONTENT_I18N["java:113"].th = {
    title: "Annotation (คำอธิบายประกอบ)",
    concept: "Annotation คือ metadata ที่ใส่เพิ่มให้โค้ด เช่น @Override บอกว่ากำลัง override method, @Deprecated บอกว่าไม่แนะนำให้ใช้ต่อ และ @SuppressWarnings ใช้ลด warning บางแบบ Annotation ช่วยให้ compiler และ framework เข้าใจเจตนา",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:113:en"
  };

  window.CONTENT_I18N["java:114"] = window.CONTENT_I18N["java:114"] || {};
  window.CONTENT_I18N["java:114"].th = {
    title: "enum (ชนิดแจงนับ)",
    concept: "enum คือชนิดข้อมูลสำหรับชุดค่าคงที่ที่มีตัวเลือกจำกัด เช่น Season มี SPRING, SUMMER, AUTUMN และ WINTER enum ทำให้ค่าที่ใช้ถูกจำกัดในรายการที่กำหนดและอ่านความหมายของโค้ดได้ชัดเจนกว่า String ธรรมดา",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:114:en"
  };

  window.CONTENT_I18N["java:115"] = window.CONTENT_I18N["java:115"] || {};
  window.CONTENT_I18N["java:115"].th = {
    title: "แบบฝึกหัด: บทที่ 11",
    concept: "แบบฝึกหัดบทที่ 11: ใช้ Stream API ดึงเลขคู่จากรายการ 1 ถึง 10 คูณเลขคู่แต่ละตัวด้วย 3 แล้วหาผลรวม เขียนเป็น pipeline ให้สั้นและตรวจ output ว่าผลรวมตรงตามเงื่อนไข",
    source: "manual-th-gold-gate-v1",
    sourceRef: "data/i18n_content/java_en.js:java:115:en"
  };

})();
