(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MOS365Content = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  var domains = [
    { id: 'A', ja: 'ワークシートやブックの管理', zh: '工作表与工作簿管理' },
    { id: 'B', ja: 'セルやセル範囲のデータの管理', zh: '单元格与单元格区域数据管理' },
    { id: 'C', ja: 'テーブルとテーブルのデータの管理', zh: '表格与表格数据管理' },
    { id: 'D', ja: '数式や関数を使用した演算の実行', zh: '使用公式与函数执行计算' },
    { id: 'E', ja: 'グラフの管理', zh: '图表管理' }
  ];

  var rawSkills = [
    ['A','WORKBOOK.NAVIGATE','ブックとシートを移動する','工作簿与工作表切换'],
    ['A','WORKBOOK.CREATE','ブックとワークシートを作成する','创建工作簿与工作表'],
    ['A','WORKBOOK.MANAGE_SHEETS','シートを挿入・削除・複製する','插入、删除、复制工作表'],
    ['A','WORKBOOK.PAGE_SETUP','ページ設定を構成する','配置页面设置'],
    ['A','WORKBOOK.PRINT_AREA','印刷範囲を設定する','设置打印区域'],
    ['A','WORKBOOK.HEADERS_FOOTERS','ヘッダーとフッターを設定する','设置页眉和页脚'],
    ['A','WORKBOOK.FREEZE_PANES','ウィンドウ枠を固定する','冻结窗格'],
    ['A','WORKBOOK.VIEW_OPTIONS','表示オプションを調整する','调整视图选项'],
    ['A','WORKBOOK.PROPERTIES','ブックのプロパティを確認する','查看工作簿属性'],
    ['A','WORKBOOK.SAVE_EXPORT','保存とエクスポートを使い分ける','区分保存与导出'],
    ['A','WORKBOOK.FIND_GO_TO','検索・置換・ジャンプを使う','使用查找、替换与定位'],
    ['A','WORKBOOK.PROTECT','シート保護の目的を理解する','理解工作表保护的用途'],

    ['B','CELL.ENTER_EDIT','データを入力・編集する','输入与编辑数据'],
    ['B','CELL.COPY_PASTE','コピー、貼り付け、オートフィルを使う','使用复制、粘贴与自动填充'],
    ['B','CELL.PASTE_SPECIAL','形式を選択して貼り付ける','选择性粘贴'],
    ['B','CELL.ROW_COLUMN','行・列のサイズと表示を管理する','管理行列大小与显示'],
    ['B','CELL.ALIGNMENT','配置、折り返し、インデントを設定する','设置对齐、换行与缩进'],
    ['B','CELL.BORDER_FILL','罫線と塗りつぶしを設定する','设置边框与填充'],
    ['B','CELL.NUMBER_FORMAT','数値表示形式を設定する','设置数字显示格式'],
    ['B','CELL.CONDITIONAL_FORMATTING','条件付き書式を設定する','设置条件格式'],
    ['B','CELL.DATA_VALIDATION','データの入力規則を設定する','设置数据验证'],
    ['B','CELL.NAMED_RANGE','名前付き範囲を作成する','创建命名范围'],
    ['B','CELL.CLEAR_FORMAT','値・書式・コメントを適切にクリアする','正确清除值、格式与批注'],
    ['B','CELL.HYPERLINK','ハイパーリンクを作成する','创建超链接'],

    ['C','TABLE.CREATE','テーブルを作成する','创建表格'],
    ['C','TABLE.STYLE','テーブルスタイルを変更する','更改表格样式'],
    ['C','TABLE.STRUCTURED_REFERENCE','構造化参照を使う','使用结构化引用'],
    ['C','TABLE.SORT','テーブルのデータを並べ替える','排序表格数据'],
    ['C','TABLE.FILTER','テーブルのデータをフィルターする','筛选表格数据'],
    ['C','TABLE.TOTAL_ROW','集計行を表示・設定する','显示与设置汇总行'],
    ['C','TABLE.REMOVE_DUPLICATES','重複データを削除する','删除重复数据'],
    ['C','TABLE.TEXT_TO_COLUMNS','区切り位置を使う','使用分列'],
    ['C','TABLE.FLASH_FILL','フラッシュフィルを使う','使用快速填充'],
    ['C','TABLE.SUBTOTAL','小計の考え方を理解する','理解分类汇总'],
    ['C','TABLE.OUTLINE','グループ化とアウトラインを使う','使用分组与分级显示'],
    ['C','TABLE.IMPORT_BOUNDARY','外部データ利用の境界を理解する','理解外部数据的使用边界'],

    ['D','FORMULA.BASIC','数式を入力し演算子を使う','输入公式并使用运算符'],
    ['D','FORMULA.RELATIVE_REFERENCE','相対参照を使う','使用相对引用'],
    ['D','FORMULA.ABSOLUTE_REFERENCE','絶対参照を使う','使用绝对引用'],
    ['D','FORMULA.MIXED_REFERENCE','複合参照を使う','使用混合引用'],
    ['D','FUNCTION.SUM','SUM 関数を使う','使用 SUM 函数'],
    ['D','FUNCTION.AVERAGE','AVERAGE 関数を使う','使用 AVERAGE 函数'],
    ['D','FUNCTION.MAX_MIN','MAX と MIN 関数を使う','使用 MAX 与 MIN 函数'],
    ['D','FUNCTION.COUNT','COUNT、COUNTA、COUNTBLANK を使う','使用 COUNT、COUNTA、COUNTBLANK'],
    ['D','FUNCTION.IF','IF 関数で条件分岐する','用 IF 函数做条件判断'],
    ['D','FUNCTION.TEXT','LEFT、RIGHT、MID、LEN を使う','使用 LEFT、RIGHT、MID、LEN'],
    ['D','FUNCTION.CONCAT','CONCAT と TEXTJOIN を使う','使用 CONCAT 与 TEXTJOIN'],
    ['D','FUNCTION.SORT_UNIQUE','SORT と UNIQUE を使う','使用 SORT 与 UNIQUE'],

    ['E','CHART.CREATE','グラフを作成する','创建图表'],
    ['E','CHART.TYPE','目的に合うグラフの種類を選ぶ','选择适合目的的图表类型'],
    ['E','CHART.SOURCE','グラフのデータ範囲を設定する','设置图表数据范围'],
    ['E','CHART.TITLE','グラフタイトルを設定する','设置图表标题'],
    ['E','CHART.LEGEND','凡例を管理する','管理图例'],
    ['E','CHART.DATA_LABELS','データラベルを設定する','设置数据标签'],
    ['E','CHART.AXIS','軸と軸ラベルを調整する','调整坐标轴与轴标题'],
    ['E','CHART.STYLE','グラフスタイルと配色を変更する','更改图表样式与配色'],
    ['E','CHART.MOVE','グラフを移動・サイズ変更する','移动与调整图表大小'],
    ['E','CHART.COMBO','複合グラフの目的を理解する','理解组合图的用途'],
    ['E','CHART.ACCESSIBILITY','読みやすいグラフを作る','创建易读图表'],
    ['E','CHART.TROUBLESHOOT','グラフのよくあるミスを修正する','修正图表常见错误']
  ];

  var skills = rawSkills.map(function (row, index) {
    var domain = domains.filter(function (item) { return item.id === row[0]; })[0];
    return {
      id: 'MOS365.EXCEL.' + row[1],
      domainId: row[0],
      domainJa: domain.ja,
      domainZh: domain.zh,
      titleJa: row[2],
      titleZh: row[3],
      order: index + 1
    };
  });

  var functionSeeds = [
    ['SUM','合計を計算します。','指定した数値を合計します。','=SUM(B2:B8)','主力考点'],
    ['AVERAGE','平均を計算します。','指定范围的平均值。','=AVERAGE(C2:C8)','主力考点'],
    ['MAX','最大値を返します。','返回范围内最大值。','=MAX(D2:D8)','主力考点'],
    ['MIN','最小値を返します。','返回范围内最小值。','=MIN(D2:D8)','主力考点'],
    ['COUNT','数値が入ったセルを数えます。','统计含数值的单元格。','=COUNT(A2:A20)','主力考点'],
    ['COUNTA','空白ではないセルを数えます。','统计非空单元格。','=COUNTA(A2:A20)','主力考点'],
    ['COUNTBLANK','空白セルを数えます。','统计空白单元格。','=COUNTBLANK(A2:A20)','主力考点'],
    ['IF','条件によって結果を切り替えます。','根据条件切换结果。','=IF(B2>=60,"合格","再挑戦")','主力考点'],
    ['LEFT','左側から文字を取り出します。','从左侧提取字符。','=LEFT(A2,3)','主力考点'],
    ['RIGHT','右側から文字を取り出します。','从右侧提取字符。','=RIGHT(A2,2)','主力考点'],
    ['MID','途中の文字を取り出します。','提取中间的字符。','=MID(A2,3,2)','実務拡張 / 非主力考点'],
    ['LEN','文字数を数えます。','统计字符数。','=LEN(A2)','実務拡張 / 非主力考点'],
    ['CONCAT','文字列を連結します。','连接文本字符串。','=CONCAT(A2,"-",B2)','実務拡張 / 非主力考点'],
    ['TEXTJOIN','区切り文字付きで連結します。','用分隔符连接文本。','=TEXTJOIN(",",TRUE,A2:A4)','実務拡張 / 非主力考点'],
    ['SORT','範囲を並べ替えて返します。','返回排序后的范围。','=SORT(A2:B10,2,-1)','実務拡張 / 非主力考点'],
    ['UNIQUE','重複しない値を返します。','返回不重复值。','=UNIQUE(A2:A20)','実務拡張 / 非主力考点'],
    ['SEQUENCE','連続した数列を作成します。','生成连续数列。','=SEQUENCE(12)','実務拡張 / 非主力考点'],
    ['RANDBETWEEN','指定範囲の整数乱数を返します。','返回指定范围内的随机整数。','=RANDBETWEEN(1,100)','実務拡張 / 非主力考点'],
    ['ROUND','指定した桁数で数値を丸めます。','按指定的小数位数对数值四舍五入。','=ROUND(B2,0)','実務拡張 / 非主力考点'],
    ['TODAY','今日の日付を返します。','返回今天的日期。','=TODAY()','実務拡張 / 非主力考点']
  ];

  function functionSkillId(name) {
    if (name === 'MAX' || name === 'MIN') return 'MOS365.EXCEL.FUNCTION.MAX_MIN';
    if (name === 'COUNT' || name === 'COUNTA' || name === 'COUNTBLANK') return 'MOS365.EXCEL.FUNCTION.COUNT';
    if (name === 'LEFT' || name === 'RIGHT' || name === 'MID' || name === 'LEN') return 'MOS365.EXCEL.FUNCTION.TEXT';
    if (name === 'CONCAT' || name === 'TEXTJOIN') return 'MOS365.EXCEL.FUNCTION.CONCAT';
    if (name === 'SORT' || name === 'UNIQUE') return 'MOS365.EXCEL.FUNCTION.SORT_UNIQUE';
    if (name === 'SEQUENCE' || name === 'RANDBETWEEN' || name === 'ROUND' || name === 'TODAY') return 'MOS365.EXCEL.FORMULA.BASIC';
    return 'MOS365.EXCEL.FUNCTION.' + name;
  }

  var dictionary = functionSeeds.map(function (item) {
    return {
      name: item[0],
      descriptionJa: item[1],
      descriptionZh: item[2],
      syntax: item[3],
      tier: item[4],
      paramsJa: '引数は対象範囲または条件に合わせて指定します。',
      paramsZh: '请根据目标范围或条件填写参数。',
      menuJa: '数式 タブ → 関数の挿入',
      menuZh: '公式选项卡 → 插入函数',
      businessExampleJa: '売上表や出席表で同じ考え方を使います。',
      businessExampleZh: '可用于销售表、出勤表等实际业务表格。',
      errorsJa: '範囲の開始と終了、全角記号、参照形式を確認します。',
      errorsZh: '检查范围起止、半角符号及引用方式。',
      skillIds: ['MOS365.EXCEL.FORMULA.BASIC', functionSkillId(item[0])]
    };
  });

  function lessonFor(skill, suffix) {
    var titleSuffix = suffix ? '：' + suffix.ja : '';
    var zhSuffix = suffix ? '：' + suffix.zh : '';
    return {
      id: skill.id + '.LESSON' + (suffix ? '.' + suffix.id : ''),
      skillId: skill.id,
      titleJa: skill.titleJa + titleSuffix,
      titleZh: skill.titleZh + zhSuffix,
      conceptJa: skill.titleJa + 'は、日常の表作成と MOS Excel 365 の操作問題で必要になる基本操作です。',
      conceptZh: skill.titleZh + '是日常表格制作和 MOS Excel 365 操作题需要掌握的基础操作。',
      menuJa: 'Excel の該当タブ → コマンドを選択',
      stepsJa: ['対象のセルまたはシートを選択します。', '目的に合うコマンドを選択します。', '結果を確認して保存します。'],
      stepsZh: ['选择目标单元格或工作表。', '选择符合目的的命令。', '确认结果并保存。'],
      keyboardJa: '必要に応じて Ctrl、Shift、F4 などのショートカットを使用します。',
      keyboardZh: '根据需要使用 Ctrl、Shift、F4 等快捷键。',
      exampleJa: '小さな売上表を使って、操作前後の変化を確認します。',
      exampleZh: '使用小型销售表，确认操作前后的变化。',
      mistakeJa: '対象範囲を選択せずに実行すると、意図しない場所に適用されることがあります。',
      mistakeZh: '未选中目标范围就执行时，可能会应用到意料之外的位置。',
      checkJa: 'この操作を使う目的を一文で説明できますか。',
      checkZh: '你能用一句话说明此操作的用途吗？',
      practiceSkillId: skill.id,
      guidedAvailable: skill.order % 2 === 0
    };
  }

  var lessons = skills.map(function (skill) { return lessonFor(skill, null); });
  var lessonExtensions = [
    ['JAPANESE_UI','日本語版メニューを読む','日语版菜单阅读'],
    ['SHORTCUT','ショートカットで操作を速くする','用快捷键提高操作速度'],
    ['EXAM_WORDING','試験指示文を分解する','拆解考试指令句'],
    ['ERROR_CHECK','操作後に確認する','操作后检查'],
    ['SAVING','保存先を確認する','确认保存位置'],
    ['PRINT_PREVIEW','印刷プレビューで確認する','在打印预览中确认'],
    ['TABLE_SCENARIO','コンビニ売上表で練習する','用便利店销售表练习'],
    ['SHIFT_SCENARIO','シフト表で練習する','用排班表练习'],
    ['BUDGET_SCENARIO','旅行予算表で練習する','用旅行预算表练习'],
    ['SCHOOL_SCENARIO','成績表で練習する','用成绩表练习'],
    ['FORMULA_AUDIT','数式を監査する','审查公式'],
    ['REFERENCE_AUDIT','参照を監査する','审查引用'],
    ['FORMAT_AUDIT','書式を監査する','审查格式'],
    ['TABLE_AUDIT','テーブルを監査する','审查表格'],
    ['CHART_AUDIT','グラフを監査する','审查图表'],
    ['TIME_PLAN','50分の時間配分を作る','制定50分钟时间分配'],
    ['MOCK_REVIEW','模擬結果を復習につなげる','把模拟结果转为复习'],
    ['WRONG_BOOK','弱点を具体化する','具体化薄弱项'],
    ['RETRY','再挑戦計画を作る','制定再挑战计划'],
    ['READINESS','受験準備度を理解する','理解报考准备度']
  ];
  lessonExtensions.forEach(function (item, index) {
    lessons.push(lessonFor(skills[index % skills.length], { id: item[0], ja: item[1], zh: item[2] }));
  });

  var exerciseTypes = ['menu_order', 'purpose', 'formula', 'error_diagnosis', 'japanese_task'];
  var exercises = [];
  skills.forEach(function (skill, skillIndex) {
    for (var i = 0; i < 3; i += 1) {
      var type = exerciseTypes[(skillIndex + i) % exerciseTypes.length];
      exercises.push({
        id: skill.id + '.PRACTICE.' + (i + 1),
        skillId: skill.id,
        type: type,
        promptJa: '「' + skill.titleJa + '」に関する操作として最も適切な考え方を選びなさい。',
        promptZh: '请选择与“' + skill.titleZh + '”有关且最合适的操作思路。',
        optionsJa: ['対象を選択してから操作する', '保存せずに閉じる', '値だけを見て判断する', '別のブックを削除する'],
        answerIndex: 0,
        explanationJa: 'Excel では、まず対象を正しく選択してから目的のコマンドを実行します。',
        explanationZh: '在 Excel 中，应先正确选择目标，再执行目的命令。'
      });
    }
  });

  var guidedPractices = skills.filter(function (_, index) { return index % 2 === 0; }).map(function (skill, index) {
    return {
      id: 'MOS365.GUIDED.' + String(index + 1).padStart(2, '0'),
      skillIds: [skill.id],
      titleJa: skill.titleJa + ' 実機ガイド練習',
      titleZh: skill.titleZh + ' 真机指导练习',
      taskJa: 'テンプレート内の対象箇所を確認し、「' + skill.titleJa + '」を実行してください。',
      taskZh: '请在模板中确认目标位置，并执行“' + skill.titleZh + '”。',
      hintsJa: ['最初に対象範囲を確認します。', 'Excel のリボンで目的のタブを開きます。', '保存してから採点に戻ります。'],
      hintsZh: ['先确认目标范围。', '在 Excel 功能区打开相应选项卡。', '保存后再返回评分。'],
      expectedOperationJa: skill.titleJa
    };
  });

  var scenarioLabels = [
    ['retail','コンビニ店舗売上','便利店门店销售'],
    ['shift','アルバイトシフトと給与','兼职排班与工资'],
    ['budget','旅行予算と精算','旅行预算与结算']
  ];

  function mockTasks(scenarioId) {
    var verbs = [
      'シート名を変更しなさい。', '行と列のサイズを調整しなさい。', '指定範囲に数値表示形式を設定しなさい。',
      '対象範囲に罫線を適用しなさい。', '表示形式をコピーして適用しなさい。', '条件付き書式を設定しなさい。',
      'テーブルを作成しなさい。', 'テーブルを指定の列で並べ替えなさい。', 'テーブルにフィルターを設定しなさい。',
      '集計行を表示しなさい。', '名前付き範囲を作成しなさい。', '相対参照の数式を入力しなさい。',
      '絶対参照を使った数式を入力しなさい。', 'IF 関数を入力しなさい。', 'SUM 関数を入力しなさい。',
      'AVERAGE 関数を入力しなさい。', 'COUNT 関数を入力しなさい。', '検索と置換を実行しなさい。',
      'ウィンドウ枠を固定しなさい。', '印刷範囲を設定しなさい。', 'ページの向きを変更しなさい。',
      'ヘッダーにページ番号を設定しなさい。', '集合縦棒グラフを作成しなさい。', 'グラフタイトルを設定しなさい。',
      '凡例の位置を変更しなさい。', 'データラベルを表示しなさい。', 'グラフのデータ範囲を確認しなさい.'
    ];
    var tasks = [];
    for (var i = 0; i < 50; i += 1) {
      tasks.push({
        taskId: scenarioId.toUpperCase() + '-' + String(i + 1).padStart(2, '0'),
        instructionJa: 'タスク ' + String(i + 1).padStart(2, '0') + '：' + verbs[i % verbs.length],
        skillIds: [skills[i % skills.length].id],
        weight: 2
      });
    }
    return tasks;
  }

  var mockBlueprints = scenarioLabels.map(function (item) {
    return {
      id: 'MOS365-MOCK-' + item[0].toUpperCase(),
      scenarioId: item[0],
      titleJa: item[1],
      titleZh: item[2],
      variants: [1, 2, 3, 4],
      tasks: mockTasks(item[0])
    };
  });

  function countByDomain(records) {
    return domains.map(function (domain) {
      return {
        domainId: domain.id,
        ja: domain.ja,
        zh: domain.zh,
        total: skills.filter(function (skill) { return skill.domainId === domain.id; }).length,
        records: records || []
      };
    });
  }

  return {
    examCode: 'MOS365-EXCEL-GENERAL',
    domains: domains,
    skills: skills,
    lessons: lessons,
    dictionary: dictionary,
    exercises: exercises,
    guidedPractices: guidedPractices,
    mockBlueprints: mockBlueprints,
    countByDomain: countByDomain
  };
});
