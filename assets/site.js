(function () {
  const patternA = [
    "引っ越し先の物件で迷っていて、ちょっと相談したいんですよね",
    "どんな物件で迷ってるんですか、駅近とか広さとか色々ありますよね",
    "駅から近い物件と、駅から遠いけど広い物件で悩んでいまして",
    "駅近の物件だと家賃も上がりますよね、駅まで何分くらいですか",
    "駅から五分の物件と、駅から十五分の物件で家賃が二万違います",
    "二万差なら駅近の物件の方が、毎日の通勤を考えるといいかも",
    "やはり駅近の物件にしようかな、駅近の物件で決めようと思います"
  ];

  const patternB = [
    "今朝、駅前で見たことない鳥が桜の枝にとまっていました",
    "桜といえば、地元の老舗和菓子屋の桜餅が絶品なんですよ",
    "和菓子なら抹茶も外せませんよね、京都旅行を思い出します",
    "京都の鴨川沿いを散歩してから蕎麦を食べるの最高ですよね",
    "蕎麦屋の二階で日本酒をちびちびやる夜は格別の楽しみです",
    "日本酒だと新潟の蔵元巡りに今度行ってみたいんですよ実は",
    "新潟は雪景色も綺麗ですし冬の温泉宿で読書も贅沢ですね"
  ];

  const patterns = {
    a: patternA,
    b: patternB,
    both: patternA.concat(patternB)
  };

  function status(message, isError) {
    const el = document.querySelector(".copy-status");
    if (!el) return;
    el.textContent = message;
    el.style.color = isError ? "#b91c1c" : "";
    window.clearTimeout(status.timer);
    status.timer = window.setTimeout(() => {
      el.textContent = "";
      el.style.color = "";
    }, 1800);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        status("コピーしました");
        return;
      }
    } catch (error) {
      // Fall back to execCommand below. Some local preview browsers deny clipboard access.
    }

    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);

    if (ok) {
      status("コピーしました");
    } else {
      status("コピーできませんでした。手動で選択してコピーしてください。", true);
    }
  }

  function codePointCompare(a, b) {
    const ac = a.codePointAt(0);
    const bc = b.codePointAt(0);
    if (ac === bc) return 0;
    return ac < bc ? -1 : 1;
  }

  function generateUniqueChars(text, excludePunct) {
    const excluded = new Set(["、", "。", "?", "!", "？", "！", " ", "　", "\n", "\r", "\t"]);
    const chars = new Set();
    for (const ch of text) {
      if (excludePunct && excluded.has(ch)) continue;
      chars.add(ch);
    }
    return Array.from(chars).sort(codePointCompare);
  }

  function lineToCell(line, stripNumber) {
    const trimmed = line.trim();
    if (!stripNumber) return trimmed;
    return trimmed.replace(/^\d+\s*[\.:：．、\)]?\s*/, "");
  }

  document.addEventListener("click", (event) => {
    const directButton = event.target.closest("[data-copy]");
    if (directButton) {
      copyText(directButton.getAttribute("data-copy"));
      return;
    }

    const textAreaButton = event.target.closest("[data-copy-textarea]");
    if (textAreaButton) {
      const selector = textAreaButton.getAttribute("data-copy-textarea");
      const target = document.querySelector(selector);
      if (target) copyText(target.value || target.textContent || "");
      return;
    }

    const presetButton = event.target.closest("[data-preset]");
    if (presetButton) {
      const input = document.querySelector("#char-input, #tsv-input");
      const key = presetButton.getAttribute("data-preset");
      if (input && patterns[key]) {
        input.value = patterns[key].join("\n");
        const tsvResult = document.querySelector("#tsv-result");
        const tsvMeta = document.querySelector("#tsv-meta");
        if (input.id === "tsv-input") {
          if (tsvResult) tsvResult.value = "";
          if (tsvMeta) tsvMeta.textContent = "まだ変換していません";
        }
      }
    }
  });

  const generateButton = document.querySelector("#generate-chars");
  if (generateButton) {
    const input = document.querySelector("#char-input");
    const result = document.querySelector("#char-result");
    const meta = document.querySelector("#char-meta");
    const exclude = document.querySelector("#exclude-punct");

    function renderChars() {
      const chars = generateUniqueChars(input.value, exclude.checked);
      result.value = chars.join("\n");
      meta.textContent = chars.length + "種類の文字が見つかりました";
    }

    generateButton.addEventListener("click", renderChars);
    exclude.addEventListener("change", renderChars);
  }

  const convertTsvButton = document.querySelector("#convert-tsv");
  if (convertTsvButton) {
    const input = document.querySelector("#tsv-input");
    const result = document.querySelector("#tsv-result");
    const meta = document.querySelector("#tsv-meta");
    const skipEmpty = document.querySelector("#tsv-skip-empty");
    const stripNumber = document.querySelector("#tsv-strip-number");

    function renderTsv() {
      const lines = input.value
        .split(/\r?\n/)
        .map((line) => lineToCell(line, stripNumber.checked))
        .filter((line) => !skipEmpty.checked || line !== "");

      result.value = lines.join("\t");
      meta.textContent = lines.length + "行を横タブ区切りに変換しました";
    }

    convertTsvButton.addEventListener("click", renderTsv);
    skipEmpty.addEventListener("change", renderTsv);
    stripNumber.addEventListener("change", renderTsv);
  }

  const backLink = document.querySelector("#tool-back-link, #count-back-link");
  if (backLink) {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    if (from && /^[a-z0-9-]+$/.test(from)) {
      const prefix = document.body.dataset.baseurl || "";
      backLink.href = prefix + "/" + from + "/";
      backLink.textContent = "元のページに戻る";
    }
  }

  const navMenu = document.querySelector(".nav-menu");
  if (navMenu) {
    document.addEventListener("click", (event) => {
      if (!navMenu.contains(event.target)) {
        navMenu.removeAttribute("open");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navMenu.removeAttribute("open");
      }
    });
  }
})();
