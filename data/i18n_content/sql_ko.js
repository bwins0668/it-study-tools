/* SQL Lessons Korean Content Pack — 36 lessons */
(function () {
  "use strict";

  window.CONTENT_I18N = window.CONTENT_I18N || {};

  window.CONTENT_I18N["sql:1"] = {
    ko: {
      title: "01-SQL과 데이터베이스란 무엇인가?",
      concept: "데이터베이스(DB)는 일정한 구조로 정리해서 저장한 데이터의 모음입니다.\n\n대부분의 시스템에서는 Excel 표와 비슷한 **테이블(Table)** 형식으로 데이터를 관리하는 **관계형 데이터베이스(RDB)**를 사용합니다.\n\n**SQL**(Structured Query Language)은 데이터베이스에 \"데이터를 읽어 와라\", \"데이터를 추가해라\" 같은 명령을 보내기 위한 전용 언어입니다.\n\n이번 수업에서는 학교의 학생 마스터 테이블에서 모든 데이터를 가져오며 가장 기본적인 조회 명령을 익힙니다.",
      playgroundTask: "학생 마스터 테이블(students_mst)의 모든 열과 모든 행을 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:2"] = {
    ko: {
      title: "02-테이블 구조（데이터 타입과 기본 키）",
      concept: "테이블(Table)은 컬럼(Column)과 행(Row/Record)으로 구성됩니다.\n각 컬럼에는 **데이터 타입(Data Type)** — 정수(INT), 문자열(VARCHAR), 날짜(DATETIME) 등 — 이 정해져 있으며, 정해진 타입과 맞지 않는 데이터는 저장할 수 없습니다.\n또한 각 행을 유일하게 식별하기 위해 테이블에는 **기본 키(Primary Key)** 를 설정합니다. 기본 키 값은 한 테이블 안에서 중복될 수 없습니다.\n예를 들어 학과 마스터 테이블 departments_mst에서는 department_id가 기본 키가 됩니다.",
      playgroundTask: "학과 마스터 테이블(departments_mst)의 모든 열과 모든 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:3"] = {
    ko: {
      title: "03-SELECT문① 기본 구문",
      concept: "데이터를 조회하는 기본 구조는 `SELECT 열명 FROM 테이블명;` 입니다.\n모든 열을 가져오고 싶다면 열명 대신 `*`(별표/Asterisk)를 지정합니다.\n특정 열만 필요할 때는 열 이름을 쉼표로 구분해서 나열합니다.",
      playgroundTask: "students_mst 테이블에서 학생 이름(student_name)과 점수(test_score) 두 열만 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:4"] = {
    ko: {
      title: "04-SELECT문② 조건 필터링: WHERE",
      concept: "조회할 데이터를 특정 조건으로 필터링하려면 **WHERE 절**을 사용합니다.\n구문: `SELECT 열명 FROM 테이블명 WHERE 조건;`\n예를 들어 나이(age)가 20세인 학생만 조회하려면 `WHERE age = 20`으로 지정합니다.\n문자열을 조건으로 지정할 때는 반드시 싱글 쿼테이션 `'`으로 감싸야 합니다.\n학교 데이터베이스에서 gender 필드의 `'0'`은 남성, `'1'`은 여성을 의미합니다.",
      playgroundTask: "students_mst 테이블에서 성별(gender)이 '1'(여학생)인 모든 학생 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:5"] = {
    ko: {
      title: "05-SELECT문③ 다중 조건: AND",
      concept: "**여러 조건을 모두 만족**해야 할 때는 **AND**를 사용합니다.\n구문: `WHERE 조건1 AND 조건2`\n예를 들어 \"24세이면서 학과 ID가 1인\" 학생을 찾을 수 있습니다.\n\n**핵심 키워드**\n- **AND**: 지정한 모든 조건을 동시에 만족하는 경우만 추출합니다.",
      playgroundTask: "students_mst 테이블에서 나이(age)가 24세이고 학과 ID(department_id)가 1인 학생 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:6"] = {
    ko: {
      title: "06-SELECT문④ 다중 조건: OR",
      concept: "**여러 조건 중 하나라도 만족**하면 될 때는 **OR**를 사용합니다.\n구문: `WHERE 조건1 OR 조건2`\n예를 들어 \"학과 ID가 1이거나 2인\" 학생을 추출할 때 사용합니다.\n\n**핵심 키워드**\n- **OR**: 지정한 조건 중 하나라도 만족하면 해당 행을 포함합니다.",
      playgroundTask: "students_mst 테이블에서 학과 ID(department_id)가 1 또는 2인 모든 학생 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:7"] = {
    ko: {
      title: "07-SELECT문⑤ AND와 OR 조합",
      concept: "AND와 OR는 같은 WHERE 절 안에서 조합하여 사용할 수 있습니다.\n\n**주의할 점**: SQL에서 **AND가 OR보다 우선순위가 높습니다** (마치 곱셈이 덧셈보다 먼저 계산되듯이).\n\n원하는 순서대로 평가하려면 수학처럼 괄호 `()`로 그룹화해야 합니다.",
      playgroundTask: "students_mst 테이블에서 나이가 20세이거나 24세이면서, 성별(gender)이 '0'(남학생)인 학생을 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:8"] = {
    ko: {
      title: "08-SELECT문⑥ 비교 연산자",
      concept: "등호(=) 외에도 다양한 비교 연산자를 사용할 수 있습니다:\n\n- `>` (보다 큼) / `<` (보다 작음)\n- `>=` (크거나 같음) / `<=` (작거나 같음)\n- `<>` 또는 `!=` (같지 않음)\n\n이 연산자들을 활용하면 특정 점수 범위의 학생을 찾거나, 특정 데이터를 제외하는 등의 필터링이 가능합니다.",
      playgroundTask: "students_mst에서 점수(test_score)가 90점 이상인 모든 학생 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:9"] = {
    ko: {
      title: "09-SELECT문⑦ IS NULL / IS NOT NULL",
      concept: "값이 아무것도 입력되지 않은 상태를 **NULL**이라고 합니다.\n\nNULL을 비교할 때는 `= NULL`이 아니라 전용 연산자인 **IS NULL** 또는 **IS NOT NULL**을 사용해야 합니다.\n\n학교 테이블에서 퇴학하지 않은(삭제되지 않은) 학생의 delete_at 필드는 NULL입니다.",
      playgroundTask: "students_mst에서 삭제 처리된(delete_at이 NULL이 아닌) 모든 학생 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:10"] = {
    ko: {
      title: "10-SELECT문⑧ LIKE 패턴 검색",
      concept: "부분 일치를 검색하려면 **LIKE** 연산자와 와일드카드를 사용합니다.\n\n- **%**: 0자 이상의 임의의 문자열\n- **_**: 임의의 1글자\n\n예를 들어 `'Kim%'`은 \"Kim\"으로 시작하는 모든 이름(전방 일치)에 매칭됩니다.",
      playgroundTask: "students_mst에서 이름 가나(student_name_kana)가 'Kim'으로 시작하는 학생 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:11"] = {
    ko: {
      title: "11-SELECT문⑨ BETWEEN 범위 검색",
      concept: "특정 범위 안의 데이터를 추출하려면 **BETWEEN**을 사용합니다.\n\n`WHERE 열명 BETWEEN A AND B`로 작성하면 \"A 이상 B 이하\"의 범위를 한 문장으로 지정할 수 있습니다.\n\n이는 `>= A AND <= B`와 같은 의미이지만 더 간결하게 작성할 수 있습니다.",
      playgroundTask: "students_mst에서 나이(age)가 20세 이상 25세 이하인 모든 학생 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:12"] = {
    ko: {
      title: "12-SELECT문⑩ IN 집합 검색",
      concept: "여러 값 중 하나에 일치하는지 판별하려면 **IN**을 사용합니다.\n\n`WHERE 열명 IN (값1, 값2, ...)`로 작성합니다.\n\nOR를 반복해서 연결하는 대신 깔끔하게 작성할 수 있습니다.",
      playgroundTask: "students_mst에서 나이(age)가 20, 25, 30 중 하나인 학생을 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:13"] = {
    ko: {
      title: "13-SELECT문⑪ 정렬: ORDER BY",
      concept: "데이터를 정렬하여 가져오려면 **ORDER BY** 절을 사용합니다.\n\n- **ASC**: 오름차순 (작은 값부터) ※기본값\n- **DESC**: 내림차순 (큰 값부터)\n\n`SELECT * FROM 테이블명 ORDER BY 열명 DESC;`처럼 SELECT문의 마지막에 작성합니다.",
      playgroundTask: "students_mst 테이블에서 모든 학생을 조회하고 나이(age)를 낮은 순서(오름차순)로 정렬하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:14"] = {
    ko: {
      title: "14-SELECT문⑫ 행 수 제한: LIMIT",
      concept: "가져올 행 수의 상한을 지정하려면 **LIMIT**을 사용합니다.\n\n`LIMIT 개수` 또는 `LIMIT 시작위치(오프셋), 개수`로 작성합니다.\n\n대량의 데이터에서 처음 몇 건만 빠르게 확인할 때 유용합니다.",
      playgroundTask: "students_mst에서 시험 점수(test_score)를 높은 순서(내림차순)로 정렬하고 상위 3명의 학생 데이터만 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:15"] = {
    ko: {
      title: "15-SELECT문⑬ 중복 제거: DISTINCT",
      concept: "검색 결과에서 중복된 행을 제거하고 고유한 값만 가져오려면 **DISTINCT**를 사용합니다.\n\n`SELECT DISTINCT 열명 FROM 테이블명;`처럼 SELECT 바로 뒤에 작성합니다.\n\n테이블 안에 어떤 종류가 있는지 확인할 때 편리합니다.",
      playgroundTask: "students_mst에서 기록된 학생 나이(age)의 목록을 중복 없이 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:16"] = {
    ko: {
      title: "16-함수: 문자열·날짜 등",
      concept: "SQL에는 데이터를 변환하는 다양한 내장 함수가 있습니다.\n\n- 글자 수 세기: **LENGTH()** / **CHAR_LENGTH()**\n- 문자열 결합: **CONCAT()**\n- 현재 날짜·시간 가져오기: **NOW()** / **CURRENT_DATE()**\n\n이 함수들을 활용하면 조회 단계에서 데이터를 바로 가공할 수 있습니다.",
      playgroundTask: "students_mst에서 학생 ID(student_id)와 학생 이름의 문자 수(CHAR_LENGTH(student_name) 사용)를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:17"] = {
    ko: {
      title: "17-조건 분기: CASE WHEN 표현식",
      concept: "SQL 안에서 조건 분기를 하고 싶을 때는 **CASE 식**을 사용합니다.\n\n구문: `CASE WHEN 조건 THEN 값 ELSE 기본값 END`\n\n예를 들어 \"점수가 80 이상이면 '합격', 아니면 '불합격'\" 같은 판정 결과를 새로운 열로 출력할 수 있습니다.",
      playgroundTask: "students_mst에서 학생 이름(student_name)과 나이 판정을 조회하세요. 나이(age)가 20세 이상이면 '成人', 그렇지 않으면 '未成年'을 출력하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:18"] = {
    ko: {
      title: "18-집계 함수: 합계·평균·건수 등",
      concept: "여러 행의 데이터를 한꺼번에 계산하는 함수를 **집계 함수(Aggregate Functions)** 라고 합니다.\n\n- **COUNT(열)**: 행 수를 셉니다\n- **SUM(열)**: 합계를 계산합니다\n- **AVG(열)**: 평균을 계산합니다\n- **MAX(열)** / **MIN(열)**: 최댓값 / 최솟값\n\n집계 함수를 사용하면 개별 행이 아닌 그룹 전체의 통계를 얻을 수 있습니다.",
      playgroundTask: "students_mst에서 정상 재학 중인 학생(delete_at IS NULL)의 점수(test_score) 평균값(AVG(test_score))을 계산하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:19"] = {
    ko: {
      title: "19-집계 함수②: 그룹화 GROUP BY",
      concept: "데이터를 그룹별로 나누어 집계하려면 **GROUP BY** 절을 사용합니다.\n\n`SELECT 그룹열, AVG(집계열) FROM 테이블 GROUP BY 그룹열;`로 작성합니다.\n\n예를 들어 \"남학생 평균 나이\"와 \"여학생 평균 나이\"를 한 번에 계산할 수 있습니다.",
      playgroundTask: "students_mst에서 학과 ID(department_id)별로 그룹화하고, 각 학과의 학생 수(COUNT(*))를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:20"] = {
    ko: {
      title: "20-집계 함수③: 그룹 후 필터링 HAVING",
      concept: "GROUP BY로 집계한 **후의** 결과에 대해 추가로 필터링하려면 WHERE가 아니라 **HAVING** 절을 사용합니다.\n\n- **WHERE**: 그룹화하기 전에 원본 행을 필터링합니다.\n- **HAVING**: 그룹화한 후에 그룹 단위로 필터링합니다.",
      playgroundTask: "students_mst에서 학과 ID(department_id)별 평균 점수(AVG(test_score))가 60점 이상인 그룹의 학과 ID와 평균 점수를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:21"] = {
    ko: {
      title: "21-데이터베이스 설계와 정규화",
      concept: "데이터베이스 설계에서는 불필요한 중복이나 모순을 피하기 위해 데이터를 여러 테이블로 분할합니다. 이를 **정규화(Normalization)** 라고 합니다.\n\n예를 들어 학생 테이블에 직접 \"학과명\"을 쓰지 않고 \"학과 ID\"만 기록한 뒤, 상세 정보는 별도의 \"학과 테이블\"에서 관리합니다.",
      playgroundTask: "학과 마스터 테이블(departments_mst)을 조회하여 어떤 열 구조와 데이터가 있는지 확인하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:22"] = {
    ko: {
      title: "22-테이블 결합①: INNER JOIN",
      concept: "분할된 테이블을 하나로 연결해서 정보를 가져오는 것이 **JOIN(결합)** 입니다.\n\n**INNER JOIN(내부 결합)** 은 양쪽 테이블 모두에 존재하는 공통 키가 일치하는 행만 결합하여 가져옵니다.\n\n`FROM 테이블A INNER JOIN 테이블B ON 테이블A.키 = 테이블B.키`로 작성합니다.",
      playgroundTask: "students_mst 테이블과 departments_mst 테이블을 INNER JOIN으로 결합하고, 학생 이름(student_name)과 학과 이름(department_name)을 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:23"] = {
    ko: {
      title: "23-테이블 결합②: LEFT / RIGHT JOIN",
      concept: "**OUTER JOIN(외부 결합)** 은 한쪽 테이블의 데이터를 모두 유지하면서 다른 쪽 테이블을 결합합니다.\n\n- **LEFT JOIN**: FROM 절 왼쪽에 쓴 테이블의 데이터를 모두 유지합니다.\n- **RIGHT JOIN**: 오른쪽에 쓴 테이블의 데이터를 모두 유지합니다.\n- 매칭되는 상대가 없는 경우 NULL이 들어갑니다.",
      playgroundTask: "LEFT JOIN으로 students_mst와 departments_mst를 결합하고, 모든 학생의 이름(student_name)과 해당 학과 이름(department_name)을 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:24"] = {
    ko: {
      title: "24-자기 결합: Self Join",
      concept: "같은 테이블끼리 결합하는 것을 **자기 결합(Self Join)** 이라고 합니다.\n\n같은 테이블에서 관련된 쌍을 추출하고 싶을 때 유용합니다.\n\n별명(Alias)을 `students_mst AS s1`처럼 붙여서 마치 다른 테이블인 것처럼 취급합니다.",
      playgroundTask: "self join을 사용해 학과(department_id)는 같지만 ID가 서로 다른 두 학생의 이름 조합을 찾으세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:25"] = {
    ko: {
      title: "25-서브쿼리(Subquery)",
      concept: "SQL 안에 또 다른 SQL을 중첩한 것을 **서브쿼리(Subquery)** 라고 합니다.\n\n예를 들어 \"평균 점수보다 높은 학생 목록\"을 찾고 싶을 때, 먼저 서브쿼리로 평균을 계산하고 그 결과를 외부 SQL의 WHERE 조건에 전달합니다.\n\n서브쿼리는 괄호 `()`로 감싸서 작성합니다.",
      playgroundTask: "students_mst 테이블에서 시험 점수(test_score)가 전체 평균보다 높은 모든 학생 데이터를 조회하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:26"] = {
    ko: {
      title: "26-데이터 삽입: INSERT문",
      concept: "테이블에 새로운 데이터를 등록하려면 **INSERT** 문을 사용합니다.\n\n`INSERT INTO 테이블명 (열1, 열2) VALUES (값1, 값2);`로 작성합니다.\n\n값을 작성하는 순서는 지정한 열의 순서와 일치해야 합니다.",
      playgroundTask: "students_mst에 새 레코드 1건을 삽입하세요. ID(student_id)는 31, 이름은 '鈴木 健', 성별(gender)은 '0', insert_at과 update_at은 '2026-06-03 12:00:00'입니다.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:27"] = {
    ko: {
      title: "27-데이터 수정: UPDATE문",
      concept: "등록된 데이터를 수정하려면 **UPDATE** 문을 사용합니다.\n\n`UPDATE 테이블명 SET 열명 = 새값 WHERE 조건;`으로 작성합니다.\n\n**주의: WHERE 절을 빠뜨리면 테이블의 모든 행이 수정됩니다!**",
      playgroundTask: "students_mst 테이블에서 ID(student_id)가 3인 학생의 시험 점수(test_score)를 95점으로 업데이트하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:28"] = {
    ko: {
      title: "28-데이터 삭제: DELETE문",
      concept: "데이터를 삭제하려면 **DELETE** 문을 사용합니다.\n\n`DELETE FROM 테이블명 WHERE 조건;`으로 작성합니다.\n\nUPDATE문과 마찬가지로 **WHERE 절이 없으면 테이블의 모든 행이 삭제됩니다.**",
      playgroundTask: "students_mst 테이블에서 학생 ID(student_id)가 30인 레코드를 완전히 삭제하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:29"] = {
    ko: {
      title: "29-테이블 생성: CREATE TABLE문",
      concept: "새로운 테이블을 만들려면 **CREATE TABLE** 문을 사용합니다.\n\n`CREATE TABLE 테이블명 (열명 자료형, 열명 자료형, ...);`으로 정의합니다.\n\n기본 키로 지정할 열에는 `PRIMARY KEY` 제약 조건을 추가합니다.",
      playgroundTask: "데이터베이스에 test_table이라는 테이블을 만들고, id(INT, PRIMARY KEY)와 name(VARCHAR(50)) 두 열을 포함하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:30"] = {
    ko: {
      title: "30-제약 조건: NOT NULL / UNIQUE / DEFAULT",
      concept: "테이블의 열에는 데이터 품질을 보장하기 위한 규칙(제약 조건)을 설정할 수 있습니다.\n\n- **NOT NULL**: 빈 값(NULL)을 금지합니다\n- **UNIQUE**: 중복된 값을 금지합니다\n- **DEFAULT 값**: 값이 생략되었을 때 자동으로 들어갈 값을 설정합니다",
      playgroundTask: "log_table이라는 테이블을 만들고, 기본 키 log_id(INT PRIMARY KEY), NOT NULL인 action(VARCHAR(100)), 기본값이 '2026-06-03 12:00:00'인 created_at(DATETIME)을 포함하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:31"] = {
    ko: {
      title: "31-기본 키와 자동 채번: AUTO_INCREMENT",
      concept: "기본 키(Primary Key)는 테이블마다 하나만 설정할 수 있습니다.\n\nMySQL에서는 기본 키에 **AUTO_INCREMENT**를 지정하면 데이터를 새로 삽입할 때 \"1, 2, 3...\"과 같이 자동으로 연속 번호가 할당됩니다.",
      playgroundTask: "items라는 테이블을 만들고, id를 자동 증가 기본 키(INT AUTO_INCREMENT PRIMARY KEY)로, item_name을 VARCHAR(100)으로 정의하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:32"] = {
    ko: {
      title: "32-테이블 수정: ALTER TABLE",
      concept: "이미 만들어진 테이블의 구조를 변경하려면 **ALTER TABLE** 문을 사용합니다.\n\n- 열 추가: `ALTER TABLE 테이블명 ADD COLUMN 열명 자료형;`\n- 열 삭제: `ALTER TABLE 테이블명 DROP COLUMN 열명;`\n- 열 이름 변경: `ALTER TABLE 테이블명 CHANGE COLUMN 기존이름 새이름 자료형;`\n\n테이블을 삭제하지 않고 구조만 조정할 수 있습니다.",
      playgroundTask: "scores라는 테이블을 만들고, 기본 키 score_id(INT PRIMARY KEY)와 students_mst의 student_id를 참조하는 외래 키 student_id(INT, FOREIGN KEY (student_id) REFERENCES students_mst(student_id))를 포함하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:33"] = {
    ko: {
      title: "33-테이블 삭제: DROP TABLE",
      concept: "테이블 자체를 완전히 삭제하려면 **DROP TABLE** 문을 사용합니다.\n\n`DROP TABLE 테이블명;`으로 작성합니다.\n\n**주의: DROP TABLE을 실행하면 테이블의 구조와 데이터가 모두 영구적으로 삭제됩니다. 신중하게 사용해야 합니다!**",
      playgroundTask: "students_mst 테이블에 email 열을 추가하고 데이터 타입을 VARCHAR(100)으로 지정하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:34"] = {
    ko: {
      title: "34-뷰(View): 가상 테이블",
      concept: "**뷰(View)** 는 실제 테이블이 아니라, SELECT 문의 결과를 가상 테이블처럼 저장해두는 기능입니다.\n\n`CREATE VIEW 뷰이름 AS SELECT ...;`로 생성합니다.\n\n복잡한 쿼리를 자주 사용할 때 뷰로 저장해두면 간단한 `SELECT * FROM 뷰이름;`만으로 같은 결과를 얻을 수 있습니다.",
      playgroundTask: "트랜잭션을 시작(START TRANSACTION)하고, ID가 1인 학생의 점수를 100으로 업데이트한 뒤 COMMIT으로 확정하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:35"] = {
    ko: {
      title: "35-인덱스(Index): 검색 성능 최적화",
      concept: "**인덱스(Index)** 는 데이터 검색 속도를 높이기 위한 보조 자료 구조입니다.\n\n`CREATE INDEX 인덱스명 ON 테이블명(열명);`으로 생성합니다.\n\n자주 WHERE 조건으로 사용하는 열에 인덱스를 만들면 검색 성능이 크게 향상됩니다. 다만 인덱스는 저장 공간을 차지하고 INSERT/UPDATE 속도를 약간 저하시킬 수 있으므로 과도하게 만들지 않도록 주의합니다.",
      playgroundTask: "students_mst 테이블의 student_name 열에 idx_student_name이라는 인덱스를 생성하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

  window.CONTENT_I18N["sql:36"] = {
    ko: {
      title: "36-트랜잭션(Transaction): 데이터 무결성 보장",
      concept: "**트랜잭션(Transaction)** 은 여러 SQL 작업을 하나의 단위로 묶어서 모두 성공하거나 모두 취소하는 메커니즘입니다.\n\n- **BEGIN** (또는 START TRANSACTION): 트랜잭션 시작\n- **COMMIT**: 모든 변경 사항을 확정\n- **ROLLBACK**: 모든 변경 사항을 취소하고 원래 상태로 되돌리기\n\n예를 들어 은행 송금에서 \"A 계좌에서 출금\"과 \"B 계좌에 입금\"은 반드시 함께 처리되어야 합니다. 하나라도 실패하면 ROLLBACK으로 되돌립니다.",
      playgroundTask: "students_mst에 active_students라는 view를 만들어 delete_at IS NULL인 재학 중 학생 데이터를 저장하세요.",
      practicalExamTitle: "SQL 실전 모의시험",
      practicalExamDescription: "일본 IT 전문학교의 SQL 실기 시험 형식을 연습하는 모드입니다. 제한 시간 안에 제시된 일본어 과제를 읽고 오른쪽 SQL 샌드박스에서 해당 데이터를 조회한 뒤, 판정 버튼으로 제출합니다.",
      source: "manual-sql-ko-v1"
    }
  };

})();
