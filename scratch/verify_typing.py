# -*- coding: utf-8 -*-
# Python unit test script mirroring the JS Romaji-to-Kana syllable parsing rules
import sys
import re

KANA_TO_ROMAJI_MAP = {
    # Vowels
    "あ": ["a"], "い": ["i", "yi"], "う": ["u", "wu"], "え": ["e"], "お": ["o"],
    # K-row
    "か": ["ka"], "き": ["ki"], "く": ["ku"], "け": ["ke"], "こ": ["ko"],
    # S-row
    "さ": ["sa"], "し": ["shi", "si"], "す": ["su"], "せ": ["se"], "そ": ["so"],
    # T-row
    "た": ["ta"], "ち": ["chi", "ti"], "つ": ["tsu", "tu"], "て": ["te"], "と": ["to"],
    # N-row
    "な": ["na"], "に": ["ni"], "ぬ": ["nu"], "ね": ["ne"], "の": ["no"],
    # H-row
    "は": ["ha"], "ひ": ["hi"], "ふ": ["fu", "hu"], "へ": ["he"], "ほ": ["ho"],
    # M-row
    "ま": ["ma"], "み": ["mi"], "む": ["mu"], "め": ["me"], "も": ["mo"],
    # Y-row
    "や": ["ya"], "ゆ": ["yu"], "よ": ["yo"],
    # R-row
    "ら": ["ra"], "り": ["ri"], "る": ["ru"], "れ": ["re"], "ろ": ["ro"],
    # W-row
    "わ": ["wa"], "を": ["wo"], "ん": ["nn", "n"],
    
    # G-row (Dakuon)
    "が": ["ga"], "ぎ": ["gi"], "ぐ": ["gu"], "げ": ["ge"], "ご": ["go"],
    # Z-row
    "ざ": ["za"], "じ": ["ji", "zi"], "ず": ["zu"], "ぜ": ["ze"], "ぞ": ["zo"],
    # D-row
    "だ": ["da"], "ぢ": ["ji", "di"], "づ": ["zu", "du"], "で": ["de"], "ど": ["do"],
    # B-row
    "ば": ["ba"], "び": ["bi"], "ぶ": ["bu"], "べ": ["be"], "ぼ": ["bo"],
    # P-row (Handakuon)
    "ぱ": ["pa"], "ぴ": ["pi"], "ぷ": ["pu"], "ぺ": ["pe"], "ぽ": ["po"],
    
    # Compound Sounds (Yoon)
    "きゃ": ["kya"], "きゅ": ["kyu"], "きょ": ["kyo"],
    "しゃ": ["sha", "sya"], "しゅ": ["shu", "syu"], "しょ": ["sho", "syo"],
    "ちゃ": ["cha", "tya"], "ちゅ": ["chu", "tyu"], "ちょ": ["cho", "tyo"],
    "にゃ": ["nya"], "にゅ": ["nyu"], "にょ": ["nyo"],
    "ひゃ": ["hya"], "ひゅ": ["hyu"], "ひょ": ["hyo"],
    "みゃ": ["mya"], "みゅ": ["myu"], "みょ": ["myo"],
    "りゃ": ["rya"], "りゅ": ["ryu"], "りょ": ["ryo"],
    "ぎゃ": ["gya"], "ぎゅ": ["gyu"], "ぎょ": ["gyo"],
    "じゃ": ["ja", "jya", "zya"], "じゅ": ["ju", "jyu", "zyu"], "じょ": ["jo", "jyo", "zyo"],
    "びゃ": ["bya"], "びゅ": ["byu"], "びょ": ["byo"],
    "ぴゃ": ["pya"], "ぴゅ": ["pyu"], "ぴょ": ["pyo"],
    
    # Small vowels
    "ぁ": ["la", "xa"], "ぃ": ["li", "xi"], "ぅ": ["lu", "xu"], "ぇ": ["le", "xe"], "ぉ": ["lo", "xo"],
    "ゃ": ["lya", "xya"], "ゅ": ["lyu", "xyu"], "ょ": ["lyo", "xyo"],
    
    # Long vowel mark
    "ー": ["-"]
}

def katakana_to_hiragana(src):
    result = ""
    for char in src:
        code = ord(char)
        if 0x30a1 <= code <= 0x30f6:
            result += chr(code - 0x60)
        else:
            result += char
    return result

def get_base_romaji_list(kana):
    if kana in KANA_TO_ROMAJI_MAP:
        return list(KANA_TO_ROMAJI_MAP[kana])
    
    converted = katakana_to_hiragana(kana)
    if converted in KANA_TO_ROMAJI_MAP:
        return list(KANA_TO_ROMAJI_MAP[converted])
        
    return [kana.lower()]

def parse_to_syllables(kana_str):
    output = []
    i = 0
    while i < len(kana_str):
        char = kana_str[i]
        next_char = kana_str[i+1] if i+1 < len(kana_str) else ""
        
        # Check促音っ
        if char == "っ":
            if next_char != "":
                next_syllable = next_char
                consume_count = 1
                third_char = kana_str[i+2] if i+2 < len(kana_str) else ""
                
                if third_char in ["ゃ", "ゅ", "ょ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ"]:
                    next_syllable += third_char
                    consume_count = 2
                    
                base_romajis = get_base_romaji_list(next_syllable)
                doubled_romajis = [r[0] + r for r in base_romajis]
                
                output.append({
                    "kana": "っ" + next_syllable,
                    "romajiList": doubled_romajis
                })
                i += 1 + consume_count
                continue
            else:
                output.append({
                    "kana": "っ",
                    "romajiList": ["ltu", "xtu", "ltsu", "xtsu"]
                })
                i += 1
                continue
                
        # Compound
        if next_char in ["ゃ", "ゅ", "ょ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ"]:
            compound = char + next_char
            output.append({
                "kana": compound,
                "romajiList": get_base_romaji_list(compound)
            })
            i += 2
        else:
            output.append({
                "kana": char,
                "romajiList": get_base_romaji_list(char)
            })
            i += 1
    return output

# Test Cases
test_cases = [
    {
        "input": "あいうえお",
        "expected": [("あ", "a"), ("い", "i"), ("う", "u"), ("え", "e"), ("お", "o")]
    },
    {
        "input": "しゅきー",
        "expected": [("しゅ", "shu"), ("き", "ki"), ("ー", "-")]
    },
    {
        "input": "がっこう",
        "expected": [("が", "ga"), ("っこ", "kko"), ("う", "u")]
    },
    {
        "input": "っしゃ",
        "expected": [("っしゃ", "ssha")]
    },
    {
        "input": "データベース",
        "expected": [("デ", "de"), ("ー", "-"), ("タ", "ta"), ("ベ", "be"), ("ー", "-"), ("ス", "su")]
    },
    {
        "input": "SQL",
        "expected": [("S", "s"), ("Q", "q"), ("L", "l")]
    }
]

failed = False

for t in test_cases:
    print(f"Testing input: '{t['input']}'")
    result = parse_to_syllables(t['input'])
    
    if len(result) != len(t['expected']):
        print(f"  [Error] Length mismatch. Expected {len(t['expected'])}, got {len(result)}")
        failed = True
        continue
        
    for idx, (expected_kana, expected_romaji) in enumerate(t['expected']):
        parsed = result[idx]
        if parsed['kana'] != expected_kana:
            print(f"  [Error] Kana mismatch at index {idx}. Expected '{expected_kana}', got '{parsed['kana']}'")
            failed = True
            
        has_match = any(r.startswith(expected_romaji) for r in parsed['romajiList'])
        if not has_match:
            print(f"  [Error] Romaji mismatch at index {idx}. Expected starts with '{expected_romaji}', got {parsed['romajiList']}")
            failed = True
        else:
            print(f"  [Ok] Group {idx}: {parsed['kana']} -> {parsed['romajiList']}")

if failed:
    print("\n[FAILED] Verification failed!")
    sys.exit(1)
else:
    print("\n[SUCCESS] All syllable parsing tests passed successfully!")
