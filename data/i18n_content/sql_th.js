/* SQL Lessons Thai Content Pack — 36 lessons */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sql:1"] = {
    th: {
      title: "01-SQL และ Database คืออะไร?",
      concept: "Database (DB) คือกลุ่มของข้อมูลที่จัดเก็กไว้อย่างเป็นระบบ\n\nในระบบส่วนใหญ่จะใช้ **Relational Database (RDB)** ซึ่งจัดการข้อมูลในรูปแบบ **Table** คล้ายกับ sheet ของ Excel\n\n**SQL** (Structured Query Language) เป็นภาษาเฉพาะที่ใช้สั่งฐานข้อมูล เช่น \"ดึงข้อมูลมา\" หรือ \"เพิ่มข้อมูล\"\n\nในบทเรียนนี้เราจะดึงข้อมูลทั้งหมดจาก student master table ของโรงเรียน และทดลองคำสั่ง query พื้นฐานที่สุด",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:2"] = {
    th: {
      title: "02-โครงสร้าง Table (Data Type และ Primary Key)",
      concept: "Table ประกอบด้วย Column และ Row (Record)\nแต่ละ Column จะมี **Data Type** กำหนดไว้ เช่น INT (จำนวนเต็ม), VARCHAR (ข้อความ), DATETIME (วันที่) หากข้อมูลไม่ตรงประเภทที่กำหนดจะบันทึกไม่ได้\nนอกจากนี้เพื่อระบุแต่ละแถวให้ไม่ซ้ำกัน Table จะมี **Primary Key** ค่า Primary Key จะซ้ำกันใน Table เดียวไม่ได้\nตัวอย่างเช่นใน department master table ชื่อ departments_mst จะใช้ department_id เป็น Primary Key",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:3"] = {
    th: {
      title: "03-SELECT ① ไวยากรณ์พื้นฐาน",
      concept: "โครงสร้างพื้นฐานในการดึงข้อมูลคือ `SELECT ชื่อคอลัมน์ FROM ชื่อตาราง;`\nหากต้องการดึงทุกคอลัมน์ ให้ใช้ `*` (Asterisk) แทนชื่อคอลัมน์\nหากต้องการเฉพาะบางคอลัมน์ ให้ระบุชื่อคอลัมน์คั่นด้วยจุลภาค",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:4"] = {
    th: {
      title: "04-SELECT ② กรองเงื่อนไข: WHERE",
      concept: "หากต้องการกรองข้อมูลที่จะดึงตามเงื่อนไข ให้ใช้ **WHERE clause**\nไวยากรณ์: `SELECT ชื่อคอลัมน์ FROM ชื่อตาราง WHERE เงื่อนไข;`\nเช่น ต้องการเฉพาะนักเรียนที่อายุ (age) เท่ากับ 20 ปี ให้ระบุ `WHERE age = 20`\nเมื่อระบุข้อความเป็นเงื่อนไข ต้องครอบด้วย single quote `'` เสมอ\nในฐานข้อมูลของโรงเรียน ค่า `'0'` ของ field gender หมายถึงชาย และ `'1'` หมายถึงหญิง",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:5"] = {
    th: {
      title: "05-SELECT ③ หลายเงื่อนไข: AND",
      concept: "เมื่อต้องการให้ **ตรงทุกเงื่อนไขพร้อมกัน** ให้ใช้ **AND**\nไวยากรณ์: `WHERE เงื่อนไข1 AND เงื่อนไข2`\nเช่น ค้นหานักเรียน \"อายุ 24 ปีและ department ID เป็น 1\"\n\n**【คีย์เวิร์ดหลัก】**\n・**AND**: ดึงเฉพาะกรณีที่ตรงเงื่อนไขที่ระบุทั้งหมดพร้อมกัน",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:6"] = {
    th: {
      title: "06-SELECT ④ หลายเงื่อนไข: OR",
      concept: "เมื่อพอใจ **ตรงเงื่อนไขใดเงื่อนไขหนึ่ง** ก็เพียงพอ ให้ใช้ **OR**\nไวยากรณ์: `WHERE เงื่อนไข1 OR เงื่อนไข2`\nเช่น ดึงนักเรียนที่ \"department ID เป็น 1 หรือ 2\"\n\n**【คีย์เวิร์ดหลัก】**\n・**OR**: หากตรงเงื่อนไขใดเงื่อนไขหนึ่งที่ระบุ จะรวมแถวนั้น",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:7"] = {
    th: {
      title: "07-SELECT ⑤ ผสม AND กับ OR",
      concept: "สามารถใช้ AND และ OR ร่วมกันใน WHERE clause เดียวได้\n\n**ข้อควรระวัง**: ใน SQL **AND มีลำดับความสำคัญสูงกว่า OR** (เหมือนการคูณจะคำนวณก่อนการบวก)\n\nหากต้องการให้ประเมินตามลำดับที่ต้องการ ต้องจัดกลุ่มด้วยวงเล็บ `()` เหมือนในคณิตศาสตร์",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:8"] = {
    th: {
      title: "08-SELECT ⑥ Comparison Operator",
      concept: "นอกจากเครื่องหมายเท่ากับ (=) แล้ว ยังมี comparison operator อื่น ๆ ดังนี้:\n\n- `>` (มากกว่า) / `<` (น้อยกว่า)\n- `>=` (มากกว่าหรือเท่ากับ) / `<=` (น้อยกว่าหรือเท่ากับ)\n- `<>` หรือ `!=` (ไม่เท่ากับ)\n\nใช้ operator เหล่านี้เพื่อกรองข้อมูล เช่น ค้นหานักเรียนในช่วงคะแนนที่กำหนด หรือแยกข้อมูลบางส่วนออก",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:9"] = {
    th: {
      title: "09-SELECT ⑦ IS NULL / IS NOT NULL",
      concept: "สถานะที่ไม่มีค่าใด ๆ ถูกป้อนเลย เรียกว่า **NULL**\n\nเมื่อเปรียบเทียบ NULL ห้ามใช้ `= NULL` ต้องใช้ operator เฉพาะคือ **IS NULL** หรือ **IS NOT NULL**\n\nใน table ของโรงเรียน field delete_at ของนักเรียนที่ยังไม่ถูกลบ (ไม่ได้ออกจากโรงเรียน) จะเป็น NULL",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:10"] = {
    th: {
      title: "10-SELECT ⑧ ค้นหาด้วยรูปแบบ LIKE",
      concept: "หากต้องการค้นหาแบบบางส่วนตรง ให้ใช้ **LIKE** operator ร่วมกับ wildcard\n\n- **%**: สตริงอักขระใด ๆ จำนวน 0 ตัวขึ้นไป\n- **_**: อักขระใด ๆ หนึ่งตัว\n\nเช่น `'ヤマ%'` จะจับคู่ชื่อทั้งหมดที่ขึ้นต้นด้วย \"ヤマ\" (ตรงจากต้น)",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:11"] = {
    th: {
      title: "11-SELECT ⑨ ค้นหาช่วง BETWEEN",
      concept: "หากต้องการดึงข้อมูลในช่วงที่กำหนด ให้ใช้ **BETWEEN**\n\nเขียน `WHERE ชื่อคอลัมน์ BETWEEN A AND B` จะระบุช่วง \"ตั้งแต่ A ถึง B\" ได้ในประโยคเดียว\n\nมีความหมายเท่ากับ `>= A AND <= B` แต่เขียนได้กระชับกว่า",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:12"] = {
    th: {
      title: "12-SELECT ⑩ ค้นหาในเซต IN",
      concept: "หากต้องการตรวจสอบว่าตรงกับค่าใดค่าหนึ่งในหลายค่า ให้ใช้ **IN**\n\nเขียน `WHERE ชื่อคอลัมน์ IN (ค่า1, ค่า2, ...)`\n\nใช้แทนการเชื่อม OR ซ้ำ ๆ ทำให้เขียนได้สะอาดขึ้น",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:13"] = {
    th: {
      title: "13-SELECT ⑪ เรียงลำดับ: ORDER BY",
      concept: "หากต้องการดึงข้อมูลโดยเรียงลำดับ ให้ใช้ **ORDER BY** clause\n\n- **ASC**: น้อยไปมาก (จากค่าเล็ก) ※ค่าเริ่มต้น\n- **DESC**: มากไปน้อย (จากค่าใหญ่)\n\nเขียนไว้ท้าย SELECT statement เช่น `SELECT * FROM ชื่อตาราง ORDER BY ชื่อคอลัมน์ DESC;`",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:14"] = {
    th: {
      title: "14-SELECT ⑫ จำกัดจำนวนแถว: LIMIT",
      concept: "หากต้องการกำหนดขีดจำกัดจำนวนแถวที่ดึง ให้ใช้ **LIMIT**\n\nเขียน `LIMIT จำนวน` หรือ `LIMIT ตำแหน่งเริ่มต้น(offset), จำนวน`\n\nมีประโยชน์เมื่อต้องการดูเพียงไม่กี่รายการแรกจากข้อมูลจำนวนมากอย่างรวดเร็ว",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:15"] = {
    th: {
      title: "15-SELECT ⑬ กำจัดข้อมูลซ้ำ: DISTINCT",
      concept: "หากต้องการกำจัดแถวที่ซ้ำกันและดึงเฉพาะค่าที่ไม่ซ้ำ ให้ใช้ **DISTINCT**\n\nเขียน `SELECT DISTINCT ชื่อคอลัมน์ FROM ชื่อตาราง;` โดยวางไว้หลัง SELECT ทันที\n\nสะดวกเมื่อต้องการดูว่ามีค่าชนิดใดบ้างใน table",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:16"] = {
    th: {
      title: "16-Function: ข้อความ・วันที่ ฯลฯ",
      concept: "ใน SQL มี built-in function หลากหลายสำหรับแปลงข้อมูล\n\n- นับจำนวนอักขระ: **LENGTH()** / **CHAR_LENGTH()**\n- เชื่อมข้อความ: **CONCAT()**\n- ดึงวันที่・เวลาปัจจุบัน: **NOW()** / **CURRENT_DATE()**\n\nใช้ function เหล่านี้เพื่อประมวลผลข้อมูลได้ในขั้นตอนการ query",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:17"] = {
    th: {
      title: "17-การแยกเงื่อนไข: CASE WHEN",
      concept: "เมื่อต้องการแยกเงื่อนไขภายใน SQL ให้ใช้ **CASE expression**\n\nไวยากรณ์: `CASE WHEN เงื่อนไข THEN ค่า ELSE ค่าเริ่มต้น END`\n\nเช่น สามารถแสดงผลการตัดสินใจ เช่น \"คะแนน 80 ขึ้นไปเป็น 'ผ่าน' ไม่เช่นนั้นเป็น 'ไม่ผ่าน'\" เป็นคอลัมน์ใหม่ได้",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:18"] = {
    th: {
      title: "18-Aggregate Function: ผลรวม・ค่าเฉลี่ย・จำนวน ฯลฯ",
      concept: "Function ที่คำนวณข้อมูลหลายแถวพร้อมกันเรียกว่า **Aggregate Function**\n\n- **COUNT(คอลัมน์)**: นับจำนวนแถว\n- **SUM(คอลัมน์)**: คำนวณผลรวม\n- **AVG(คอลัมน์)**: คำนวณค่าเฉลี่ย\n- **MAX(คอลัมน์)** / **MIN(คอลัมน์)**: ค่ามากสุด / ค่าน้อยสุด\n\nใช้ aggregate function จะได้สถิติของกลุ่มทั้งหมดแทนแถวแต่ละแถว",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:19"] = {
    th: {
      title: "19-Aggregate Function ②: จัดกลุ่ม GROUP BY",
      concept: "หากต้องการแบ่งข้อมูลเป็นกลุ่มและคำนวณ ให้ใช้ **GROUP BY** clause\n\nเขียน `SELECT คอลัมน์กลุ่ม, AVG(คอลัมน์รวม) FROM ตาราง GROUP BY คอลัมน์กลุ่ม;`\n\nเช่น คำนวณ \"อายุเฉลี่ยของนักเรียนชาย\" และ \"อายุเฉลี่ยของนักเรียนหญิง\" ได้พร้อมกันในครั้งเดียว",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:20"] = {
    th: {
      title: "20-Aggregate Function ③: กรองหลังจัดกลุ่ม HAVING",
      concept: "หากต้องการกรองผลลัพธ์ **หลังจาก** คำนวณด้วย GROUP BY ให้ใช้ **HAVING** clause แทน WHERE\n\n- **WHERE**: กรองแถวต้นฉบับก่อนจัดกลุ่ม\n- **HAVING**: กรองในระดับกลุ่มหลังจัดกลุ่มแล้ว",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:21"] = {
    th: {
      title: "21-การออกแบบ Database และ Normalization",
      concept: "ในการออกแบบ database เพื่อหลีกเลี่ยงความซ้ำซ้อนและความขัดแย้งที่ไม่จำเป็น จะแบ่งข้อมูลออกเป็นหลาย table เรียกว่า **Normalization**\n\nเช่น ใน student table ไม่เขียน \"ชื่อแผนก\" โดยตรง แต่บันทึกเพียง \"department ID\" แล้วจัดการรายละเอียดใน \"department table\" แยกต่างหาก",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:22"] = {
    th: {
      title: "22-เชื่อม Table ①: INNER JOIN",
      concept: "การเชื่อม table ที่แบ่งไว้เป็นหนึ่งเดียวเพื่อดึงข้อมูลคือ **JOIN**\n\n**INNER JOIN** จะเชื่อมเฉพาะแถวที่ key ตรงกันซึ่งมีอยู่ใน table ทั้งสองฝั่ง\n\nเขียน `FROM tableA INNER JOIN tableB ON tableA.key = tableB.key`",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:23"] = {
    th: {
      title: "23-เชื่อม Table ②: LEFT / RIGHT JOIN",
      concept: "**OUTER JOIN** จะรักษาข้อมูลของ table ฝั่งหนึ่งไว้ทั้งหมด แล้วเชื่อมกับอีกฝั่ง\n\n- **LEFT JOIN**: รักษาข้อมูลของ table ฝั่งซ้ายของ FROM clause ไว้ทั้งหมด\n- **RIGHT JOIN**: รักษาข้อมูลของ table ฝั่งขวาไว้ทั้งหมด\n- หากไม่มีฝั่งตรงกันจะเป็น NULL",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:24"] = {
    th: {
      title: "24-Self Join: เชื่อมตารางตัวเอง",
      concept: "การเชื่อม table ตัวเองกับตัวเองเรียกว่า **Self Join**\n\nมีประโยชน์เมื่อต้องการดึงคู่ที่เกี่ยวข้องจาก table เดียวกัน\n\nใช้ alias เช่น `students_mst AS s1` เพื่อให้ตารางเดียวกันทำงานเหมือนเป็นคนละ table",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:25"] = {
    th: {
      title: "25-Subquery",
      concept: "การซ้อน SQL อีกตัวไว้ใน SQL เรียกว่า **Subquery**\n\nเช่น หากต้องการ \"รายชื่อนักเรียนที่คะแนนสูงกว่าค่าเฉลี่ย\" ให้คำนวณค่าเฉลี่ยด้วย subquery ก่อน แล้วส่งผลลัพธ์ไปยัง WHERE ของ SQL ภายนอก\n\nSubquery เขียนโดยครอบด้วยวงเล็บ `()`",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:26"] = {
    th: {
      title: "26-เพิ่มข้อมูล: INSERT",
      concept: "หากต้องการเพิ่มข้อมูลใหม่ลง table ให้ใช้ **INSERT** statement\n\nเขียน `INSERT INTO ชื่อตาราง (คอลัมน์1, คอลัมน์2) VALUES (ค่า1, ค่า2);`\n\nลำดับการเขียนค่าต้องตรงกับลำดับคอลัมน์ที่ระบุ",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:27"] = {
    th: {
      title: "27-แก้ไขข้อมูล: UPDATE",
      concept: "หากต้องการแก้ไขข้อมูลที่บันทึกไว้ ให้ใช้ **UPDATE** statement\n\nเขียน `UPDATE ชื่อตาราง SET ชื่อคอลัมน์ = ค่าใหม่ WHERE เงื่อนไข;`\n\n**ระวัง: หากลืม WHERE clause แถวทั้งหมดใน table จะถูกแก้ไข!**",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:28"] = {
    th: {
      title: "28-ลบข้อมูล: DELETE",
      concept: "หากต้องการลบข้อมูล ให้ใช้ **DELETE** statement\n\nเขียน `DELETE FROM ชื่อตาราง WHERE เงื่อนไข;`\n\nเช่นเดียวกับ UPDATE **หากไม่มี WHERE clause แถวทั้งหมดใน table จะถูกลบ**",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:29"] = {
    th: {
      title: "29-สร้าง Table: CREATE TABLE",
      concept: "หากต้องการสร้าง table ใหม่ ให้ใช้ **CREATE TABLE** statement\n\nกำหนด `CREATE TABLE ชื่อตาราง (ชื่อคอลัมน์ ประเภทข้อมูล, ชื่อคอลัมน์ ประเภทข้อมูล, ...);`\n\nคอลัมน์ที่กำหนดเป็น Primary Key ให้เพิ่ม constraint `PRIMARY KEY`",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:30"] = {
    th: {
      title: "30-Constraint: NOT NULL / UNIQUE / DEFAULT",
      concept: "คอลัมน์ของ table สามารถกำหนดกฎ (constraint) เพื่อรับประกันคุณภาพข้อมูลได้\n\n- **NOT NULL**: ห้ามเป็นค่าว่าง (NULL)\n- **UNIQUE**: ห้ามค่าซ้ำ\n- **DEFAULT ค่า**: กำหนดค่าที่จะใส่อัตโนมัติเมื่อค่าถูกละไว้",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:31"] = {
    th: {
      title: "31-Primary Key และกำหนดเลขอัตโนมัติ: AUTO_INCREMENT",
      concept: "Primary Key กำหนดได้เพียงหนึ่งอันต่อ table\n\nใน MySQL หากกำหนด **AUTO_INCREMENT** ให้ Primary Key เมื่อเพิ่มข้อมูลใหม่จะมีการกำหนดเลขลำดับเช่น \"1, 2, 3...\" ให้อัตโนมัติ",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:32"] = {
    th: {
      title: "32-แก้ไข Table: ALTER TABLE",
      concept: "หากต้องการเปลี่ยนโครงสร้างของ table ที่สร้างไว้แล้ว ให้ใช้ **ALTER TABLE** statement\n\n- เพิ่มคอลัมน์: `ALTER TABLE ชื่อตาราง ADD COLUMN ชื่อคอลัมน์ ประเภทข้อมูล;`\n- ลบคอลัมน์: `ALTER TABLE ชื่อตาราง DROP COLUMN ชื่อคอลัมน์;`\n- เปลี่ยนชื่อคอลัมน์: `ALTER TABLE ชื่อตาราง CHANGE COLUMN ชื่อเดิม ชื่อใหม่ ประเภทข้อมูล;`\n\nปรับโครงสร้างได้โดยไม่ต้องลบ table",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:33"] = {
    th: {
      title: "33-ลบ Table: DROP TABLE",
      concept: "หากต้องการลบ table ทั้งหมด ให้ใช้ **DROP TABLE** statement\n\nเขียน `DROP TABLE ชื่อตาราง;`\n\n**ระวัง: เมื่อรัน DROP TABLE ทั้งโครงสร้างและข้อมูลของ table จะถูกลบถาวร ต้องใช้อย่างระมัดระวัง!**",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:34"] = {
    th: {
      title: "34-View: ตารางเสมือน",
      concept: "**View** ไม่ใช่ table จริง แต่เป็นฟังก์ชันที่บันทึกผลลัพธ์ของ SELECT statement ไว้เป็นตารางเสมือน\n\nสร้างด้วย `CREATE VIEW ชื่อview AS SELECT ...;`\n\nเมื่อบันทึก query ที่ซับซ้อนที่ใช้บ่อยเป็น view แล้ว สามารถดึงผลลัพธ์เดิมได้ด้วย `SELECT * FROM ชื่อview;` แบบง่าย ๆ",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:35"] = {
    th: {
      title: "35-Index: เพิ่มประสิทธิภาพการค้นหา",
      concept: "**Index** คือโครงสร้างข้อมูลสนับสนุนเพื่อเพิ่มความเร็วในการค้นหาข้อมูล\n\nสร้างด้วย `CREATE INDEX ชื่อindex ON ชื่อตาราง(ชื่อคอลัมน์);`\n\nหากสร้าง index บนคอลัมน์ที่ใช้ในเงื่อนไข WHERE บ่อย ๆ ประสิทธิภาพการค้นหาจะดีขึ้นอย่างมาก แต่ index ใช้พื้นที่จัดเก็บและอาจทำให้ความเร็ว INSERT/UPDATE ลดลงเล็กน้อย จึงไม่ควรสร้างมากเกินไป",
      source: "manual-sql-th-v1"
    }
  };

  window.CONTENT_I18N["sql:36"] = {
    th: {
      title: "36-Transaction: รับประกันความถูกต้องของข้อมูล",
      concept: "**Transaction** คือกลไกที่รวมการทำงาน SQL หลายอย่างเป็นหนึ่งหน่วย โดยทำสำเร็จทั้งหมดหรือยกเลิกทั้งหมด\n\n- **BEGIN** (หรือ START TRANSACTION): เริ่ม transaction\n- **COMMIT**: ยืนยันการเปลี่ยนแปลงทั้งหมด\n- **ROLLBACK**: ยกเลิกการเปลี่ยนแปลงทั้งหมดและคืนสู่สถานะเดิม\n\nเช่นในการโอนเงินธนาคาร \"หักเงินจากบัญชี A\" และ \"เพิ่มเงินเข้าบัญชี B\" ต้องดำเนินการพร้อมกัน หากอย่างใดอย่างหนึ่งล้มเหลวให้ ROLLBACK กลับ",
      source: "manual-sql-th-v1"
    }
  };

})();
