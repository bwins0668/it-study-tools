import re
import os
import sys

def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
        
    js_file = 'app.js'
    if not os.path.isfile(js_file):
        print("ERROR: app.js not found.")
        return
        
    with open(js_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Standard globals and properties to ignore
    ignored_names = set([
        'window', 'document', 'console', 'Math', 'localStorage', 'JSON',
        'setInterval', 'clearInterval', 'fetch', 'confirm', 'parseInt',
        'Number', 'String', 'setTimeout', 'clearTimeout', 'location', 'event', 'typeof',
        'alert', 'sessionStorage', 'Boolean', 'Object', 'Array', 'RegExp', 'Date',
        'Error', 'undefined', 'null', 'true', 'false', 'NaN', 'Infinity', 'sqlEngine',
        'SQL_LESSONS', 'JAVA_LESSONS', 'PYTHON_LESSONS', 'IT_PASSPORT_LESSONS', 'SG_LESSONS',
        'SQL_EXAM_QUESTIONS', 'JAVA_EXAM_QUESTIONS', 'PYTHON_EXAM_QUESTIONS', 'SG_TEXTBOOK_PDF',
        'ITPASS_TEXTBOOK_PDF', 'JavaSandbox', 'PythonSandbox', 'currentSubject', 'itpassSubMode',
        'sgSubMode', 'sqlSubMode', 'pythonSubMode', 'javaSubMode', 'currentLessonId',
        'completedLessons', 'selectedLang', 'selectedQuizOption', 'selectedSchemaTable',
        'isRandomPracticeActive', 'currentDBGroup', 'crossChallengeActive', 'crossChallengePool',
        'crossChallengeIndex', 'crossChallengeCurrentExercise', 'currentItPassLessonId',
        'completedItPassLessons', 'itpassQuizIdx', 'selectedItPassQuizOption', 'currentSgLessonId',
        'completedSgLessons', 'sgQuizIdx', 'selectedSgQuizOption', 'currentFlashcardIdx',
        'isFlashcardFlipped', 'currentJavaLessonId', 'currentJavaSectionIndex', 'lastLoadedJavaChapterId',
        'currentJavaBook', 'javaQuizIdx', 'selectedJavaQuizOption', 'completedJavaLessons',
        'currentPythonLessonId', 'pythonQuizIdx', 'selectedPythonQuizOption',
        'completedPythonLessons', 'lastLoadedPythonChapterId', 'activeCbtExam',
        'cbtTimerInterval', 'activeCodingExam', 'currentPdfObjectUrl',
        
        # HTML element standard properties (often matched by re.findall(r'\b(word)\.prop\b'))
        'className', 'classList', 'innerHTML', 'style', 'innerText', 'textContent',
        'display', 'value', 'disabled', 'animation', 'cursor', 'href', 'target', 'src',
        'onclick', 'length', 'status', 'message', 'success', 'rows', 'columns', 'error',
        'dbGroup', 'titleJa', 'taskJa', 'taskZh', 'solutionQuery', 'hint', 'expectedOutput',
        'solutionCode', 'templateCode', 'stdinExample', 'timeLimit', 'id', 'book', 'bookName',
        'chapterId', 'chapterName', 'subSectionId', 'subSectionName', 'titleZh', 'conceptJa',
        'conceptZh', 'analogy', 'example', 'vocabList', 'quizList', 'pdfPage', 'pdfHighlightTerm',
        'quiz', 'options', 'answerIdx', 'question', 'questionJa', 'questionZh', 'optionA',
        'optionB', 'optionC', 'optionD', 'correctOption', 'explanation', 'category',
        'subcategory', 'topic', 'isSelectable', 'userCodes', 'userStatuses', 'flags',
        'timeRemaining', 'timeSpent', 'isSubmitted', 'subject', 'title', 'currentQIdx',
        
        # Common methods
        'push', 'pop', 'shift', 'unshift', 'splice', 'slice', 'indexOf', 'lastIndexOf',
        'forEach', 'map', 'filter', 'reduce', 'some', 'every', 'find', 'findIndex',
        'includes', 'split', 'join', 'replace', 'replaceAll', 'match', 'test', 'exec',
        'trim', 'toLowerCase', 'toUpperCase', 'charAt', 'charCodeAt', 'substring',
        'addEventListener', 'removeEventListener', 'getElementById', 'getElementsByClassName',
        'getElementsByTagName', 'querySelector', 'querySelectorAll', 'createElement',
        'appendChild', 'removeChild', 'insertBefore', 'replaceChild', 'setAttribute',
        'getAttribute', 'removeAttribute', 'hasAttribute', 'classList', 'add', 'remove',
        'toggle', 'contains', 'focus', 'blur', 'click', 'select', 'submit', 'reset',
        'preventDefault', 'stopPropagation', 'toString', 'valueOf', 'toLocaleString',
        'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'get', 'set',
        'keys', 'values', 'entries', 'assign', 'create', 'defineProperties',
        'defineProperty', 'freeze', 'seal', 'preventExtensions', 'isFrozen', 'isSealed',
        'isExtensible', 'getPrototypeOf', 'setPrototypeOf', 'is', 'all', 'race',
        'resolve', 'reject', 'then', 'catch', 'finally', 'next', 'throw', 'return',
        'log', 'warn', 'error', 'info', 'debug', 'clear', 'dir', 'table', 'trace',
        'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'timeLog', 'count',
        'countReset', 'assert', 'profile', 'profileEnd', 'timeStamp', 'takeHeapSnapshot'
    ])
    
    # Extract function declarations, let/const/var declarations
    declared = set(ignored_names)
    
    funcs = re.findall(r'\bfunction\s+([a-zA-Z0-9_]+)\b', content)
    declared.update(funcs)
    
    declarations = re.findall(r'\b(?:let|const|var)\s+([a-zA-Z0-9_,\s=]+?)(?:;|=|\n)', content)
    for dec in declarations:
        for part in dec.split(','):
            part = part.strip().split('=')[0].strip()
            if part:
                part = part.split()[0]
                declared.add(part)
                
    params = re.findall(r'\(([^)]*)\)\s*=>', content)
    for p in params:
        for name in p.split(','):
            name = name.strip()
            if name:
                declared.add(name)
                
    # Also parse traditional function parameters
    func_params = re.findall(r'function\s+[a-zA-Z0-9_]*\s*\(([^)]*)\)', content)
    for fp in func_params:
        for name in fp.split(','):
            name = name.strip()
            if name:
                declared.add(name)
                
    # Find all words that are assigned: word = ...
    # excluding member accesses like a.b = ...
    assignments = re.findall(r'\b([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?!=)', content)
    
    potential_undeclared = set()
    for var in set(assignments):
        if var not in declared and not var.isupper():
            potential_undeclared.add(var)
            
    print("Potential undeclared assigned variables:")
    for var in sorted(potential_undeclared):
        # find where it is used
        lines = content.split('\n')
        for i, l in enumerate(lines):
            if var in l:
                print(f"  {var} at line {i+1}: {l.strip()}")
                break

if __name__ == '__main__':
    main()
