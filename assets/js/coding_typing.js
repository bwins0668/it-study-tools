(function() {
  'use strict';
  var s = {
    lang: "python", cat: "all", item: null, idx: -1, items: [],
    start: null, timer: null, elapsed: 0, active: false, done: false,
    total: 0, correct: 0, errors: 0, normFW: true, lenIndent: true
  };
  function $(i){return document.getElementById(i);}
  function qq(s){return document.querySelectorAll(s);}

  var CT = {
    open: function(){
      var h = $("coding-typing-hub");
      if(!h)return;
      h.classList.add("is-active");
      document.body.classList.add("mode-coding-typing");
      s.active = true;
      if(s.item){CT._renderItem();CT._resetTimer();CT._startTimer();}
    },
    close: function(){
      var h = $("coding-typing-hub");
      if(h)h.classList.remove("is-active");
      document.body.classList.remove("mode-coding-typing");
      s.active = false;
      CT._stopTimer();
    },
    init: function(){
      if(!window.CODING_TYPING_DATA)return;
      CT._setupInput();
      CT._populateCats();
      CT._filter();
    },
    filterLang: function(l){
      s.lang = l; s.cat = "all";
      qq("#ct-lang-tabs .ct-lang-tab").forEach(function(t){
        t.classList.toggle("active", t.getAttribute("data-lang")===l);
      });
      CT._filter();
    },
    filterCat: function(c){
      s.cat = c;
      qq("#ct-cat-list .ct-cat-btn").forEach(function(b){
        b.classList.toggle("active", b.getAttribute("data-cat")===c);
      });
      CT._filter();
    },
    nextItem: function(){CT._pick(1);},
    randomItem: function(){CT._pick(2);},
    restart: function(){CT._pick(0);},
    toggleNormalize: function(){s.normFW = !s.normFW;},
    toggleLenientIndent: function(){s.lenIndent = !s.lenIndent;},
    _pick: function(m){
      var list = s.items;
      if(!list||!list.length)return;
      var idx = s.idx;
      if(m===0){idx = s.idx;} // restart same
      else if(m===2){idx = Math.floor(Math.random()*list.length);}
      else {idx = (idx+1 < list.length) ? idx+1 : 0;}
      s.item = list[idx]; s.idx = idx;
      s.done = false; s.total = 0; s.correct = 0; s.errors = 0;
      s.elapsed = 0; s.start = null;
      var ta = $("ct-textarea");
      if(ta){ta.disabled=false;ta.value="";ta.focus();}
      var r = $("ct-result");
      if(r)r.style.display="none";
      CT._renderItem();
      if(s.active){CT._resetTimer();CT._startTimer();}
    },

    _renderItem: function(){
      var item = s.item;
      if(!item)return;
      // code display
      var cd = $("ct-code-display");
      if(cd)cd.textContent = item.code;
      // meta
      var meta = $("ct-item-meta");
      if(meta)meta.textContent = item.language+" | "+item.category+" | #"+item.id;
      // title
      var title = $("ct-item-title");
      if(title){
        var lang = CT._uiLang();
        title.textContent = (item.title&&item.title[lang])||item.title["zh-CN"]||item.title["ja-JP"]||item.id;
      }
      // explanation
      var exp = $("ct-explanation");
      if(exp){
        var lang = CT._uiLang();
        exp.textContent = (item.explanation&&(item.explanation[lang]||item.explanation["zh-CN"]||item.explanation["ja-JP"]))||"";
      }
      // focus
      var fc = $("ct-focus");
      if(fc){
        fc.innerHTML = "";
        if(item.focus&&item.focus.length){
          var h = $("<span>").className="ct-info-label";
          var lang = CT._uiLang();
          h.textContent = lang==="ja-JP"?"練習ポイント：":"Focus: ";
          fc.appendChild(h);
          item.focus.forEach(function(f){
            var sp = document.createElement("span");
            sp.className = "ct-focus-tag";
            sp.textContent = f;
            fc.appendChild(sp);
          });
        }
      }
      // hint
      var ht = $("ct-hint");
      if(ht){
        var lang = CT._uiLang();
        ht.innerHTML = "";
        if(item.hint&&(item.hint[lang]||item.hint["zh-CN"]||item.hint["ja-JP"])){
          var h = document.createElement("span");
          h.className = "ct-info-label";
          h.textContent = lang==="ja-JP"?"ヒント：":"Hint: ";
          ht.appendChild(h);
          ht.appendChild(document.createTextNode(item.hint[lang]||item.hint["zh-CN"]||item.hint["ja-JP"]));
        }
      }
      // clear compare
      var cmp = $("ct-compare-display");
      if(cmp)cmp.innerHTML = "";
      CT._updateStats();
    },

    _uiLang: function(){
      var r = document.documentElement.lang;
      if(r==="zh-Hans"||r==="zh-CN") return "zh-CN";
      if(r==="ja-JP")return "ja-JP";
      return "en-US";
    },
    _filter: function(){
      var all = window.CODING_TYPING_DATA||[];
      var lang = s.lang;
      if(lang&&lang!="all") all = all.filter(function(x){return x.language===lang;});
      var cat = s.cat;
      if(cat&&cat!="all") all = all.filter(function(x){return x.category===cat;});
      s.items = all;
      if(!$("ct-item-count"))return;
      $("ct-item-count").textContent = "("+all.length+" items)";
      // populate item list
      var list = $("ct-item-list");
      if(!list)return;
      list.innerHTML = "";
      all.forEach(function(item, i){
        var btn = document.createElement("button");
        btn.className = "ct-item-btn";
        if(s.item&&s.item.id===item.id)btn.classList.add("active");
        var lang2 = CT._uiLang();
        btn.textContent = (item.title&&(item.title[lang2]||item.title["zh-CN"]||item.title["ja-JP"]))||item.id;
        btn.onclick = function(){
          s.item = item; s.idx = i; s.done = false;
          s.total = 0; s.correct = 0; s.errors = 0;
          s.elapsed = 0; s.start = null;
          var ta = $("ct-textarea");
          if(ta){ta.disabled=false;ta.value="";ta.focus();}
          var r = $("ct-result");
          if(r)r.style.display="none";
          CT._renderItem();
          if(s.active){CT._resetTimer();CT._startTimer();}
        };
        list.appendChild(btn);
      });
      // auto-select first if none
      if(!s.item&&all.length>0){
        s.item = all[0]; s.idx = 0;
        CT._renderItem();
      }
    },

    _populateCats: function(){
      var all = window.CODING_TYPING_DATA||[];
      var lang = s.lang;
      var filtered = lang&&lang!="all" ? all.filter(function(x){return x.language===lang;}) : all;
      var cats = {};
      filtered.forEach(function(x){cats[x.category]=true;});
      var list = $("ct-cat-list");
      if(!list)return;
      list.innerHTML = "";
      var allBtn = document.createElement("button");
      allBtn.className = "ct-cat-btn active";
      allBtn.setAttribute("data-cat","all");
      allBtn.textContent = "All / 全部";
      allBtn.onclick = function(){CT.filterCat("all");};
      list.appendChild(allBtn);
      Object.keys(cats).sort().forEach(function(c){
        var btn = document.createElement("button");
        btn.className = "ct-cat-btn";
        btn.setAttribute("data-cat",c);
        btn.textContent = c;
        btn.onclick = function(){CT.filterCat(c);};
        list.appendChild(btn);
      });
    },
    _setupInput: function(){
      var ta = $("ct-textarea");
      if(!ta)return;
      ta.addEventListener("input", function(){
        if(s.done)return;
        var target = s.item?s.item.code:"";
        if(!target){CT._updateStats();return;}
        if(!s.start){s.start=Date.now();CT._startTimer();}
        var input = ta.value;
        if(s.normFW) input = CT._normFW(input);
        s.total = target.length;
        // compare char by char
        var maxLen = Math.max(input.length, target.length);
        s.correct = 0; s.errors = 0;
        var cmpHtml = "";
        for(var i=0;i<maxLen;i++){
          var a = i < input.length ? input[i] : "";
          var b = i < target.length ? target[i] : "";
          var cls = "ct-cmp-char";
          if(!a){cls+=" ct-cmp-missing";}
          else if(a===b || CT._indentMatch(a,b)){cls+=" ct-cmp-correct";s.correct++;}
          else{cls+=" ct-cmp-error";s.errors++;}
          var display = a || b;
          if(display===" ")display="\u00b7";
          if(display==="\n"){cmpHtml+="<br>";continue;}
          if(display==="\t")display="\u2192";
          cmpHtml += "<span class=\""+cls+"\">"+CT._esc(display)+"</span>";
        }
        var cmp = $("ct-compare-display");
        if(cmp)cmp.innerHTML = cmpHtml;
        // check done
        if(input.length >= target.length && s.errors===0 && input.length>0){
          s.done = true;
          CT._complete();
        }
        CT._updateStats();
      });
    },

    _normFW: function(str){
      var r = "";
      for(var i=0;i<str.length;i++){
        var c = str.charCodeAt(i);
        if(c>=0xFF01&&c<=0xFF5E) r+=String.fromCharCode(c-0xFEE0);
        else if(c===0x3000) r+=" ";
        else r+=str[i];
      }
      return r;
    },

    _indentMatch: function(a,b){
      if(!s.lenIndent)return false;
      if(a==="\t"&&b===" ") return true;
      if(a===" "&&b==="\t") return true;
      return false;
    },

    _esc: function(str){
      return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    },
    _updateStats: function(){
      var cpm = 0;
      if(s.elapsed>0) cpm = Math.round(s.correct/(s.elapsed/60));
      var attempted = s.correct+s.errors;
      var acc = attempted>0 ? Math.round(s.correct/attempted*100) : 100;
      if($("ct-stat-cpm"))$("ct-stat-cpm").textContent = cpm;
      if($("ct-stat-accuracy"))$("ct-stat-accuracy").textContent = acc+"%";
      if($("ct-stat-progress"))$("ct-stat-progress").textContent = s.correct+"/"+s.total;
      if($("ct-stat-errors"))$("ct-stat-errors").textContent = s.errors;
    },

    _resetTimer: function(){
      CT._stopTimer();
      s.elapsed = 0;s.start=null;
      if($("ct-stat-time"))$("ct-stat-time").textContent = "00:00";
    },

    _startTimer: function(){
      if(s.timer)return;
      s.start = Date.now();
      s.timer = setInterval(function(){
        s.elapsed = Math.floor((Date.now()-s.start)/1000);
        var m = Math.floor(s.elapsed/60);
        var se = s.elapsed%60;
        if($("ct-stat-time"))$("ct-stat-time").textContent =
          (m<10?"0":"")+m+":"+(se<10?"0":"")+se;
        CT._updateStats();
      },200);
    },

    _stopTimer: function(){
      if(s.timer){clearInterval(s.timer);s.timer=null;}
    },

    _complete: function(){
      CT._stopTimer();
      var ta = $("ct-textarea");
      if(ta)ta.disabled=true;
      var r = $("ct-result");
      if(r){
        r.style.display = "";
        var sum = $("ct-result-summary");
        if(sum){
          var cpm = s.elapsed>0?Math.round(s.total/(s.elapsed/60)):0;
          sum.textContent = "CPM: "+cpm+" | Time: "+s.elapsed+"s | Accuracy: 100%";
        }
      }
    }
  };

  window.CodingTyping = CT;
})();
