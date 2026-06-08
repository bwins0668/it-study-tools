import csv
import json

import os

def load_csv(filename):
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    filepath = os.path.join(base_dir, "data", filename)
    with open(filepath, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = []
        for r in reader:
            row_dict = {}
            for k, v in r.items():
                if v == '' or v is None:
                    row_dict[k] = None
                elif v.isdigit():
                    row_dict[k] = int(v)
                else:
                    row_dict[k] = v
            rows.append(row_dict)
        return rows

departments = load_csv('department.csv')
students = load_csv('students.csv')

db_data = {
    "students_mst": students,
    "departments_mst": departments
}

db_schema = {
    "students_mst": {
        "columns": [
            { "name": "student_id", "type": "INT", "desc": "学生ID (主キー)", "primary": True },
            { "name": "student_name", "type": "VARCHAR(255)", "desc": "氏名", "primary": False },
            { "name": "student_name_kana", "type": "VARCHAR(255)", "desc": "氏名カナ", "primary": False },
            { "name": "student_number", "type": "VARCHAR(20)", "desc": "学籍番号", "primary": False },
            { "name": "department_id", "type": "INT", "desc": "学科ID (外部キー -> departments_mst.department_id)", "primary": False },
            { "name": "gender", "type": "CHAR(1)", "desc": "性別 (0:男, 1:女)", "primary": False },
            { "name": "age", "type": "INT", "desc": "年齢", "primary": False },
            { "name": "test_score", "type": "INT", "desc": "得点", "primary": False },
            { "name": "insert_at", "type": "DATETIME", "desc": "登録日時", "primary": False },
            { "name": "update_at", "type": "DATETIME", "desc": "更新日時", "primary": False },
            { "name": "delete_at", "type": "DATETIME", "desc": "削除日時", "primary": False }
        ]
    },
    "departments_mst": {
        "columns": [
            { "name": "department_id", "type": "INT", "desc": "学科ID (主キー)", "primary": True },
            { "name": "department_name", "type": "VARCHAR(255)", "desc": "学科名", "primary": False },
            { "name": "insert_at", "type": "DATETIME", "desc": "登録日時", "primary": False },
            { "name": "update_at", "type": "DATETIME", "desc": "更新日時", "primary": False },
            { "name": "delete_at", "type": "DATETIME", "desc": "削除日時", "primary": False }
        ]
    }
}

# Now read MockSQLEngine class definition from previous db.js or just write the whole thing
mock_sql_engine_code = """
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
      .replace(/\\s+/g, ' ')
      .replace(/;\\s*$/, '')
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
    const selectRegex = /^SELECT\\s+(DISTINCT\\s+)?([\\w\\s\\*,\\(\\)\\.\\'\\"]+)\\s+FROM\\s+(\\w+)(?:\\s+JOIN\\s+(\\w+)\\s+ON\\s+([\\w\\.]+)\\s*=\\s*([\\w\\.]+))?(?:\\s+WHERE\\s+(.+?))?(?:\\s+GROUP\\s+BY\\s+([\\w\\.]+))?(?:\\s+HAVING\\s+(.+?))?(?:\\s+ORDER\\s+BY\\s+([\\w\\.]+)(?:\\s+(ASC|DESC))?)?(?:\\s+LIMIT\\s+(\\d+)(?:\\s*,\\s*(\\d+))?)?$/i;
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
    const aggMatches = fieldsStr.match(/(COUNT|SUM|AVG|MAX|MIN)\\(([\\w\\.\\*]+)\\)/gi);
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
          const cleanCol = col.replace(/[\\'\\`\\"\\s]/g, '');
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

    columns = columns.map(c => c.replace(/[\\`\\'\\"]/g, ''));

    return {
      success: true,
      columns,
      rows: finalRows
    };
  }

  evalWhere(row, clause) {
    let cleanClause = clause.replace(/\\s+AND\\s+/gi, " && ").replace(/\\s+OR\\s+/gi, " || ");

    const evaluateCondition = (cond) => {
      cond = cond.trim();
      if (!cond) return true;

      if (/IS\\s+NOT\\s+NULL$/i.test(cond)) {
        const fieldName = cond.replace(/\\s+IS\\s+NOT\\s+NULL$/i, '').trim().replace(/[\\`\\'\\"]/g, '');
        return this.getFieldValue(row, fieldName) !== null && this.getFieldValue(row, fieldName) !== undefined;
      }
      if (/IS\\s+NULL$/i.test(cond)) {
        const fieldName = cond.replace(/\\s+IS\\s+NULL$/i, '').trim().replace(/[\\`\\'\\"]/g, '');
        const val = this.getFieldValue(row, fieldName);
        return val === null || val === undefined;
      }

      if (/\\s+LIKE\\s+/i.test(cond)) {
        const parts = cond.split(/\\s+LIKE\\s+/i);
        const fieldName = parts[0].trim().replace(/[\\`\\'\\"]/g, '');
        let pattern = parts[1].trim().replace(/^[\\'\\"]|[\\'\\"]$/g, '');
        pattern = pattern.replace(/%/g, '.*').replace(/_/g, '.');
        const regex = new RegExp(`^${pattern}$`, 'i');
        const val = String(this.getFieldValue(row, fieldName) || '');
        return regex.test(val);
      }

      if (/\\s+BETWEEN\\s+/i.test(cond)) {
        const parts = cond.split(/\\s+BETWEEN\\s+/i);
        const fieldName = parts[0].trim().replace(/[\\`\\'\\"]/g, '');
        const rangeParts = parts[1].split(/\\s+AND\\s+/i);
        const minVal = parseFloat(rangeParts[0].trim().replace(/[\\'\\"]/g, ''));
        const maxVal = parseFloat(rangeParts[1].trim().replace(/[\\'\\"]/g, ''));
        const val = parseFloat(this.getFieldValue(row, fieldName));
        return val >= minVal && val <= maxVal;
      }

      if (/\\s+IN\\s*\\(/i.test(cond)) {
        const parts = cond.split(/\\s+IN\\s*\\(/i);
        const fieldName = parts[0].trim().replace(/[\\`\\'\\"]/g, '');
        const valuesList = parts[1].replace(/\\)$/, '').split(',').map(v => v.trim().replace(/^[\\'\\"]|[\\'\\"]$/g, ''));
        const val = String(this.getFieldValue(row, fieldName));
        return valuesList.includes(val);
      }

      const compRegex = /([\\w\\.]+)\\s*(=|!=|<>|>=|<=|>|<)\\s*(.+)/i;
      const compMatch = cond.match(compRegex);
      if (compMatch) {
        const fieldName = compMatch[1].trim().replace(/[\\`\\'\\"]/g, '');
        const op = compMatch[2].trim();
        let targetVal = compMatch[3].trim().replace(/^[\\'\\"]|[\\'\\"]$/g, '');

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
      const aggMatch = item.match(/(COUNT|SUM|AVG|MAX|MIN)\\(([\\w\\.\\*]+)\\)/i);
      if (aggMatch) {
        aggregations.push({
          alias: item,
          func: aggMatch[1].toUpperCase(),
          field: aggMatch[2].replace(/[\\`\\'\\"]/g, '')
        });
      } else {
        plainFields.push(item.replace(/[\\`\\'\\"]/g, ''));
      }
    });

    const groups = {};
    const groupKeyName = groupByField ? groupByField.replace(/[\\`\\'\\"]/g, '') : "all";

    rows.forEach(row => {
      const groupVal = groupByField ? String(this.getFieldValue(row, groupKeyName)) : "all";
      if (!groups[groupVal]) {
        groups[groupVal] = [];
      }
      groups[groupVal].push(row);
    });

    const resultColumns = selectItems.map(item => item.replace(/[\\`\\'\\"]/g, ''));
    const resultRows = [];

    Object.keys(groups).forEach(key => {
      const groupRows = groups[key];
      const resultRow = [];

      selectItems.forEach(item => {
        const cleanItem = item.replace(/[\\`\\'\\"]/g, '');
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
        const compRegex = /([\\w\\.\\(\\)\\*]+)\\s*(=|!=|<>|>=|<=|>|<)\\s*(.+)/i;
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
    const insertRegex = /^INSERT\\s+INTO\\s+(\\w+)\\s*\\(([\\w\\s,]+)\\)\\s*VALUES\\s*\\(([\\w\\s\\',\\.@\\-\\u3000-\\u303F\\u3040-\\u309F\\u30A0-\\u30FF\\uFF00-\\uFFEF\\u4E00-\\u9FAF]+)\\)$/i;
    const match = sql.match(insertRegex);

    if (!match) {
      throw new Error("INSERT文の構文エラーです。(例: INSERT INTO students_mst (student_id, student_name, gender) VALUES (31, '名前', '0'))");
    }

    const tableName = match[1].trim().toLowerCase();
    const columns = match[2].split(',').map(c => c.trim().toLowerCase());
    const values = match[3].split(',').map(v => v.trim().replace(/^[\\'\\"]|[\\'\\"]$/g, ''));

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

    const pkKey = tableName === 'students_mst' ? 'student_id' : 'department_id';
    if (newRow[pkKey] && this.db[tableName].some(r => r[pkKey] == newRow[pkKey])) {
      throw new Error(`一意制約エラー: ID ${newRow[pkKey]} は既に存在します。`);
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
    const updateRegex = /^UPDATE\\s+(\\w+)\\s+SET\\s+([\\w\\s=\\',\\.\\-\\u4E00-\\u9FAF\\u3040-\\u309F\\u30A0-\\u30FF]+)\\s+WHERE\\s+(.+)$/i;
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
        let val = sides[1].trim().replace(/^[\\'\\"]|[\\'\\"]$/g, '');
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
    const deleteRegex = /^DELETE\\s+FROM\\s+(\\w+)(?:\\s+WHERE\\s+(.+))?$/i;
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
"""

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
db_js_path = os.path.join(base_dir, "data", "db.js")
with open(db_js_path, 'w', encoding='utf-8') as f:
    f.write("// Mock Database Schema and Tables\n")
    f.write(f"const DB_DATA = {json.dumps(db_data, ensure_ascii=False, indent=2)};\n\n")
    f.write("// Database Schema Metadata for Visualizer\n")
    f.write(f"const DB_SCHEMA = {json.dumps(db_schema, ensure_ascii=False, indent=2)};\n\n")
    f.write(mock_sql_engine_code)

print("Done! db.js updated successfully.")
