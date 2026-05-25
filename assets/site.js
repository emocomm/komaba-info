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

  function downloadText(text, filename) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
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

  const publicKeyExercise = (() => {
    const keys = {
      keypair: "komaba-public-key-20260525-keypair-v1",
      exam: "komaba-public-key-20260525-exam-practice-v1",
      teacherFingerprint: "komaba-public-key-20260525-teacher-fingerprint-v1",
      cipher: "komaba-public-key-20260525-cipher-v1",
      signature: "komaba-public-key-20260525-signature-v1",
      encryptPlaintext: "komaba-public-key-20260525-encrypt-plaintext-v1",
      encryptPublicKey: "komaba-public-key-20260525-encrypt-public-key-v1",
      encryptConfirmed: "komaba-public-key-20260525-encrypt-confirmed-v1",
      signTarget: "komaba-public-key-20260525-sign-target-v1",
      signSecretKey: "komaba-public-key-20260525-sign-secret-key-v1",
      signTargetPreview: "komaba-public-key-20260525-sign-target-preview-v1"
    };

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let memoryStore = {};

    function canUseLocalStorage() {
      try {
        return typeof window.localStorage !== "undefined";
      } catch (error) {
        return false;
      }
    }

    function readFallbackStore() {
      return memoryStore;
    }

    function writeFallbackStore(store) {
      memoryStore = store;
    }

    function storageGet(key) {
      if (canUseLocalStorage()) return window.localStorage.getItem(key);
      const store = readFallbackStore();
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    }

    function storageSet(key, value) {
      if (canUseLocalStorage()) {
        window.localStorage.setItem(key, value);
        return;
      }
      const store = readFallbackStore();
      store[key] = value;
      writeFallbackStore(store);
    }

    function getJson(key) {
      try {
        const raw = storageGet(key);
        return raw ? JSON.parse(raw) : null;
      } catch (error) {
        return null;
      }
    }

    function setJson(key, value) {
      storageSet(key, JSON.stringify(value));
    }

    function compact(value) {
      return (value || "").trim().replace(/\s+/g, "");
    }

    function bytesToBase64Url(bytes) {
      let binary = "";
      const chunkSize = 0x8000;
      for (let index = 0; index < bytes.length; index += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.slice(index, index + chunkSize));
      }
      return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    }

    function base64UrlToBytes(value) {
      const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
      const binary = atob(padded);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
      }
      return bytes;
    }

    function encodePayload(payload) {
      return bytesToBase64Url(encoder.encode(JSON.stringify(payload)));
    }

    function decodePayload(value) {
      return JSON.parse(decoder.decode(base64UrlToBytes(value)));
    }

    function parseWrapped(value, prefix) {
      const clean = compact(value);
      if (!clean.startsWith(prefix + "-")) {
        throw new Error(prefix + "形式ではありません。");
      }
      return decodePayload(clean.slice(prefix.length + 1));
    }

    async function digestBytes(text) {
      return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(text)));
    }

    async function digestHex(text) {
      return Array.from(await digestBytes(text))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    }

    async function publicFingerprint(publicKey) {
      const hash = await digestHex(compact(publicKey));
      return "FP-" + hash.slice(0, 32).match(/.{1,4}/g).join("-");
    }

    async function visualFingerprint(text) {
      const bytes = await digestBytes(compact(text));
      const width = 17;
      const height = 9;
      const grid = Array.from({ length: height }, () => Array(width).fill(0));
      let x = Math.floor(width / 2);
      let y = Math.floor(height / 2);
      const startX = x;
      const startY = y;
      const marks = " .o+=*BOX@%&#/^";

      for (const byte of bytes) {
        for (const nibble of [byte & 0x0f, byte >> 4]) {
          x += (nibble & 1) ? 1 : -1;
          y += (nibble & 2) ? 1 : -1;
          x = Math.max(0, Math.min(width - 1, x));
          y = Math.max(0, Math.min(height - 1, y));
          grid[y][x] += 1;
        }
      }

      const endX = x;
      const endY = y;
      grid[startY][startX] = "S";
      grid[endY][endX] = "E";

      const rows = grid.map((row) => {
        return "|" + row.map((cell) => {
          if (cell === "S" || cell === "E") return cell;
          return marks[Math.min(cell, marks.length - 1)];
        }).join("") + "|";
      });

      return "+" + "-".repeat(width) + "+\n" + rows.join("\n") + "\n+" + "-".repeat(width) + "+";
    }

    async function generateKeypair() {
      const encKeys = await crypto.subtle.generateKey(
        { name: "ECDH", namedCurve: "P-256" },
        true,
        ["deriveKey"]
      );
      const sigKeys = await crypto.subtle.generateKey(
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign", "verify"]
      );
      const created = new Date().toISOString();
      const kid = bytesToBase64Url(crypto.getRandomValues(new Uint8Array(12)));
      const publicPayload = {
        v: 1,
        kid,
        created,
        encPub: await crypto.subtle.exportKey("jwk", encKeys.publicKey),
        sigPub: await crypto.subtle.exportKey("jwk", sigKeys.publicKey)
      };
      const publicKey = "PUB-" + encodePayload(publicPayload);
      const fingerprint = await publicFingerprint(publicKey);
      const secretPayload = {
        v: 1,
        kid,
        created,
        publicFingerprint: fingerprint,
        encPriv: await crypto.subtle.exportKey("jwk", encKeys.privateKey),
        sigPriv: await crypto.subtle.exportKey("jwk", sigKeys.privateKey)
      };
      const secretKey = "SEC-" + encodePayload(secretPayload);
      return {
        publicKey,
        secretKey,
        fingerprint,
        visual: await visualFingerprint(publicKey),
        created
      };
    }

    async function importPublic(publicKey) {
      const payload = parseWrapped(publicKey, "PUB");
      const encPub = await crypto.subtle.importKey(
        "jwk",
        payload.encPub,
        { name: "ECDH", namedCurve: "P-256" },
        false,
        []
      );
      const sigPub = await crypto.subtle.importKey(
        "jwk",
        payload.sigPub,
        { name: "ECDSA", namedCurve: "P-256" },
        false,
        ["verify"]
      );
      return {
        payload,
        encPub,
        sigPub,
        fingerprint: await publicFingerprint(publicKey),
        visual: await visualFingerprint(publicKey)
      };
    }

    async function importSecret(secretKey) {
      const payload = parseWrapped(secretKey, "SEC");
      const encPriv = await crypto.subtle.importKey(
        "jwk",
        payload.encPriv,
        { name: "ECDH", namedCurve: "P-256" },
        false,
        ["deriveKey"]
      );
      const sigPriv = await crypto.subtle.importKey(
        "jwk",
        payload.sigPriv,
        { name: "ECDSA", namedCurve: "P-256" },
        false,
        ["sign"]
      );
      return { payload, encPriv, sigPriv };
    }

    async function encryptMessage(plainText, publicKey) {
      const publicInfo = await importPublic(publicKey);
      const ephemeral = await crypto.subtle.generateKey(
        { name: "ECDH", namedCurve: "P-256" },
        true,
        ["deriveKey"]
      );
      const aesKey = await crypto.subtle.deriveKey(
        { name: "ECDH", public: publicInfo.encPub },
        ephemeral.privateKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
      );
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const cipherBytes = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, encoder.encode(plainText)));
      const payload = {
        v: 1,
        alg: "ECDH-P256+AES-GCM",
        recipientFingerprint: publicInfo.fingerprint,
        ephemeralPub: await crypto.subtle.exportKey("jwk", ephemeral.publicKey),
        iv: bytesToBase64Url(iv),
        ciphertext: bytesToBase64Url(cipherBytes),
        created: new Date().toISOString()
      };
      return "CIPHER-" + encodePayload(payload);
    }

    async function decryptMessage(cipherText, secretKey) {
      const cipherPayload = parseWrapped(cipherText, "CIPHER");
      const secretInfo = await importSecret(secretKey);
      const ephemeralPub = await crypto.subtle.importKey(
        "jwk",
        cipherPayload.ephemeralPub,
        { name: "ECDH", namedCurve: "P-256" },
        false,
        []
      );
      const aesKey = await crypto.subtle.deriveKey(
        { name: "ECDH", public: ephemeralPub },
        secretInfo.encPriv,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
      const plainBytes = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: base64UrlToBytes(cipherPayload.iv) },
        aesKey,
        base64UrlToBytes(cipherPayload.ciphertext)
      );
      return {
        text: decoder.decode(plainBytes),
        cipherPayload,
        secretPayload: secretInfo.payload
      };
    }

    async function signMessage(target, secretKey) {
      const secretInfo = await importSecret(secretKey);
      const signature = new Uint8Array(await crypto.subtle.sign(
        { name: "ECDSA", hash: "SHA-256" },
        secretInfo.sigPriv,
        encoder.encode(target)
      ));
      const payload = {
        v: 1,
        alg: "ECDSA-P256-SHA256",
        signerFingerprint: secretInfo.payload.publicFingerprint,
        targetHash: await digestHex(target),
        signature: bytesToBase64Url(signature),
        created: new Date().toISOString()
      };
      return "SIG-" + encodePayload(payload);
    }

    async function verifySignature(target, signatureText, publicKey) {
      const signaturePayload = parseWrapped(signatureText, "SIG");
      const publicInfo = await importPublic(publicKey);
      const targetHash = await digestHex(target);
      const verified = signaturePayload.targetHash === targetHash && await crypto.subtle.verify(
        { name: "ECDSA", hash: "SHA-256" },
        publicInfo.sigPub,
        base64UrlToBytes(signaturePayload.signature),
        encoder.encode(target)
      );
      return { verified, signaturePayload, publicInfo, targetHash };
    }

    function setValue(selector, value) {
      const element = document.querySelector(selector);
      if (element) element.value = value || "";
    }

    function setText(selector, value) {
      const element = document.querySelector(selector);
      if (element) element.textContent = value || "";
    }

    function restoreStoredValue(element, key, fallback) {
      const saved = storageGet(key);
      if (saved !== null) {
        element.value = saved;
      } else if (fallback && !element.value) {
        element.value = fallback;
      }
    }

    function bindStoredValue(element, key, fallback) {
      restoreStoredValue(element, key, fallback);
      element.addEventListener("input", () => {
        storageSet(key, element.value);
      });
    }

    function bindStoredCheckbox(element, key) {
      const saved = storageGet(key);
      if (saved !== null) element.checked = saved === "true";
      element.addEventListener("change", () => {
        storageSet(key, element.checked ? "true" : "false");
      });
    }

    function setCallout(selector, message, warn) {
      const element = document.querySelector(selector);
      if (!element) return;
      element.textContent = message;
      element.classList.toggle("warn", Boolean(warn));
    }

    function savedKeypair() {
      return getJson(keys.keypair);
    }

    function updateKeygenAction(pair) {
      const button = document.querySelector("#pk-generate");
      if (!button) return;
      button.textContent = pair ? "鍵を作り直す" : "鍵ペアを作る";
    }

    function renderKeypair(pair) {
      const output = document.querySelector("#pk-output");
      if (!output) return;
      updateKeygenAction(pair);
      if (!pair) {
        output.classList.add("hidden");
        setText("#pk-status", "まだ鍵ペアを作っていません。");
        return;
      }
      output.classList.remove("hidden");
      setText("#pk-status", "保存済みの鍵ペアを表示しています。");
      setValue("#pk-public-key", pair.publicKey);
      setValue("#pk-secret-key", pair.secretKey);
      setValue("#pk-fingerprint", pair.fingerprint);
      setValue("#pk-visual", pair.visual);
    }

    function initKeygen() {
      if (!document.querySelector("#pk-generate")) return;
      renderKeypair(savedKeypair());

      async function createPair() {
        setText("#pk-status", "鍵ペアを作成しています...");
        const pair = await generateKeypair();
        setJson(keys.keypair, pair);
        renderKeypair(pair);
        status("鍵ペアを作成しました");
      }

      document.querySelector("#pk-generate").addEventListener("click", () => {
        if (savedKeypair()) {
          const ok = confirm("鍵を作り直すと、前の鍵で作った署名は新しい公開鍵では検証できません。作り直しますか？");
          if (!ok) return;
        }
        createPair();
      });

      const toggle = document.querySelector("#pk-toggle-secret");
      const secret = document.querySelector("#pk-secret-key");
      toggle.addEventListener("click", () => {
        secret.classList.toggle("hidden");
        toggle.textContent = secret.classList.contains("hidden") ? "秘密鍵を表示する" : "秘密鍵を隠す";
      });

      document.querySelector("#pk-copy-secret").addEventListener("click", () => {
        const pair = savedKeypair();
        if (!pair) return;
        const ok = confirm("秘密鍵は他の人に共有しないものです。本当にコピーしますか？");
        if (ok) copyText(pair.secretKey);
      });

      document.querySelector("#pk-download-public").addEventListener("click", () => {
        const pair = savedKeypair();
        if (!pair) return;
        downloadText(pair.publicKey, "komaba-public-key-20260525-public-key.txt");
      });

      document.querySelector("#pk-download-secret").addEventListener("click", () => {
        const pair = savedKeypair();
        if (!pair) return;
        const ok = confirm("秘密鍵は他の人に共有しないものです。本当にダウンロードしますか？");
        if (ok) downloadText(pair.secretKey, "komaba-public-key-20260525-secret-key.txt");
      });
    }

    function initExamPractice() {
      const answer = document.querySelector("#exam-answer");
      if (!answer) return;
      answer.value = storageGet(keys.exam) || "";
      answer.addEventListener("input", () => {
        storageSet(keys.exam, answer.value);
      });
    }

    function initEncryptTool() {
      const run = document.querySelector("#encrypt-run");
      if (!run) return;
      const plain = document.querySelector("#encrypt-plaintext");
      const publicInput = document.querySelector("#encrypt-public-key");
      const confirmed = document.querySelector("#teacher-key-confirmed");
      const savedText = storageGet(keys.exam);
      const savedCipher = getJson(keys.cipher);
      bindStoredValue(plain, keys.encryptPlaintext, savedText);
      bindStoredValue(publicInput, keys.encryptPublicKey);
      bindStoredCheckbox(confirmed, keys.encryptConfirmed);
      if (savedCipher && savedCipher.cipherText) {
        setValue("#cipher-output", savedCipher.cipherText);
        setText("#encrypt-meta", "保存済みの暗号文を表示しています。");
      }

      async function updateKeyPreview() {
        const value = compact(publicInput.value);
        if (!value) {
          setValue("#encrypt-key-fingerprint", "");
          setValue("#encrypt-key-visual", "");
          return;
        }
        if (!value.startsWith("PUB-")) {
          setValue("#encrypt-key-fingerprint", "");
          setValue("#encrypt-key-visual", "");
          return;
        }
        try {
          const info = await importPublic(value);
          setValue("#encrypt-key-fingerprint", info.fingerprint);
          setValue("#encrypt-key-visual", info.visual);
        } catch (error) {
          setValue("#encrypt-key-fingerprint", "公開鍵として読めません");
          setValue("#encrypt-key-visual", "");
        }
      }

      publicInput.addEventListener("input", updateKeyPreview);
      updateKeyPreview();

      run.addEventListener("click", async () => {
        const plainText = plain.value.trim();
        const publicKey = compact(publicInput.value);
        const pair = savedKeypair();
        if (!plainText) {
          alert("確認してください。暗号化する本文が空です。穴埋め文に言葉を埋めた文章を作ってから暗号化してください。");
          return;
        }
        if (publicKey.startsWith("SEC-")) {
          alert("確認してください。ここは「受信者の公開鍵」を入れる欄です。秘密鍵を入れていませんか？");
          return;
        }
        if (!publicKey.startsWith("PUB-")) {
          alert("確認してください。暗号化に使う鍵欄には PUB-... から始まる公開鍵を入れてください。");
          return;
        }
        if (pair && compact(pair.publicKey) === publicKey) {
          alert("確認してください。教員宛の提出物は教員の公開鍵で暗号化します。自分の公開鍵を入れていませんか？このままだと教員は復号できません。");
          return;
        }
        if (!confirmed.checked) {
          alert("確認してください。スライドの指紋と、ツールに表示された指紋・見た目を見比べてからチェックを入れてください。");
          return;
        }
        try {
          setText("#encrypt-meta", "暗号化しています...");
          const info = await importPublic(publicKey);
          const cipherText = await encryptMessage(plainText, publicKey);
          setValue("#cipher-output", cipherText);
          storageSet(keys.encryptPlaintext, plain.value);
          storageSet(keys.encryptPublicKey, publicInput.value);
          storageSet(keys.encryptConfirmed, confirmed.checked ? "true" : "false");
          storageSet(keys.signTarget, cipherText);
          setJson(keys.cipher, { cipherText, created: new Date().toISOString() });
          setJson(keys.teacherFingerprint, { fingerprint: info.fingerprint, created: new Date().toISOString() });
          setText("#encrypt-meta", "暗号文を作成しました。");
          status("暗号化しました");
        } catch (error) {
          setText("#encrypt-meta", "暗号化に失敗しました。公開鍵を確認してください。");
          alert("確認してください。公開鍵または本文を処理できませんでした。");
        }
      });
    }

    function initSignTool() {
      const run = document.querySelector("#sign-run");
      if (!run) return;
      const target = document.querySelector("#sign-target");
      const secretInput = document.querySelector("#sign-secret-key");
      const savedCipher = getJson(keys.cipher);
      const savedSignature = getJson(keys.signature);
      bindStoredValue(target, keys.signTarget, savedCipher && savedCipher.cipherText);
      bindStoredValue(secretInput, keys.signSecretKey);
      if (savedSignature && savedSignature.signature) {
        setValue("#signature-output", savedSignature.signature);
        setText("#sign-meta", "保存済みのディジタル署名を表示しています。");
      }
      setValue("#sign-target-preview", storageGet(keys.signTargetPreview));

      run.addEventListener("click", async () => {
        const pair = savedKeypair();
        const targetText = compact(target.value);
        const secretKey = compact(secretInput.value);
        if (!pair) {
          alert("確認してください。先に鍵作成ツールで自分の鍵ペアを作ってください。");
          return;
        }
        if (!targetText) {
          alert("確認してください。署名する対象が空です。");
          return;
        }
        if (!targetText.startsWith("CIPHER-")) {
          alert("確認してください。今回は暗号化ツールで作った暗号文に署名します。平文を入れていませんか？");
          return;
        }
        if (!secretKey) {
          alert("確認してください。署名を作るには自分の秘密鍵が必要です。");
          return;
        }
        if (secretKey.startsWith("PUB-")) {
          alert("確認してください。署名を作る欄には「自分の秘密鍵」を入れます。公開鍵を入れていませんか？");
          return;
        }
        if (!secretKey.startsWith("SEC-")) {
          alert("確認してください。署名に使う鍵欄には SEC-... から始まる秘密鍵を入れてください。");
          return;
        }
        let secretPayload;
        try {
          secretPayload = parseWrapped(secretKey, "SEC");
        } catch (error) {
          alert("確認してください。秘密鍵として読めません。");
          return;
        }
        const teacher = getJson(keys.teacherFingerprint);
        if (teacher && teacher.fingerprint && secretPayload.publicFingerprint === teacher.fingerprint) {
          alert("確認してください。この秘密鍵は、さきほど教員の公開鍵として確認した鍵に対応しているようです。署名には自分の秘密鍵を使います。");
          return;
        }
        if (compact(pair.secretKey) !== secretKey) {
          alert("確認してください。署名は「自分の秘密鍵」で作ります。鍵作成ツールで表示されている自分の秘密鍵と違うものを入れていませんか？");
          return;
        }
        try {
          setText("#sign-meta", "署名しています...");
          const signature = await signMessage(targetText, secretKey);
          const targetPreview = targetText.slice(0, 180) + (targetText.length > 180 ? "..." : "");
          setValue("#signature-output", signature);
          setValue("#sign-target-preview", targetPreview);
          storageSet(keys.signTarget, target.value);
          storageSet(keys.signSecretKey, secretInput.value);
          storageSet(keys.signTargetPreview, targetPreview);
          setJson(keys.signature, { signature, created: new Date().toISOString() });
          setText("#sign-meta", "ディジタル署名を作成しました。");
          status("署名しました");
        } catch (error) {
          setText("#sign-meta", "署名に失敗しました。");
          alert("確認してください。暗号文または秘密鍵を処理できませんでした。");
        }
      });
    }

    function buildSubmissionText() {
      const cipher = document.querySelector("#submission-cipher").value.trim();
      const signature = document.querySelector("#submission-signature").value.trim();
      const publicKey = document.querySelector("#submission-public-key").value.trim();
      return [
        "暗号文:",
        cipher,
        "",
        "ディジタル署名:",
        signature,
        "",
        "自分の公開鍵:",
        publicKey
      ].join("\n");
    }

    function initSubmission() {
      const button = document.querySelector("#build-submission");
      if (!button) return;
      const pair = savedKeypair();
      const cipher = getJson(keys.cipher);
      const signature = getJson(keys.signature);
      if (cipher && cipher.cipherText) setValue("#submission-cipher", cipher.cipherText);
      if (signature && signature.signature) setValue("#submission-signature", signature.signature);
      if (pair && pair.publicKey) setValue("#submission-public-key", pair.publicKey);

      button.addEventListener("click", () => {
        const text = buildSubmissionText();
        setValue("#submission-output", text);
        if (/SEC-/.test(text)) {
          alert("確認してください。提出テキストに SEC-... から始まる秘密鍵が含まれています。秘密鍵は提出しません。");
        } else {
          status("提出テキストを作成しました");
        }
      });
    }

    function extractBetween(text, label, nextLabels) {
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const next = nextLabels.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
      const pattern = new RegExp(escaped + "\\s*[:：]\\s*([\\s\\S]*?)(?=\\n\\s*(?:" + next + ")\\s*[:：]|$)");
      const match = text.match(pattern);
      return match ? compact(match[1]) : "";
    }

    function parseSubmission(text) {
      return {
        cipherText: extractBetween(text, "暗号文", ["ディジタル署名", "署名", "自分の公開鍵", "公開鍵"]),
        signature: extractBetween(text, "ディジタル署名", ["自分の公開鍵", "公開鍵"]),
        publicKey: extractBetween(text, "自分の公開鍵", [])
      };
    }

    function countOccurrences(text, word) {
      return (text.match(new RegExp(word, "g")) || []).length;
    }

    function answerChecks(text) {
      const checks = [
        ["A", "平文", countOccurrences(text, "平文") >= 2],
        ["B", "復号", countOccurrences(text, "復号") >= 5],
        ["C", "公開鍵", countOccurrences(text, "公開鍵") >= 6],
        ["D", "秘密鍵", /復号用の鍵を秘密鍵/.test(text)],
        ["E", "一方向ハッシュ関数", countOccurrences(text, "一方向ハッシュ関数") >= 2],
        ["F", "電子指紋", countOccurrences(text, "電子指紋") >= 3],
        ["G", "秘密鍵", /送信者の秘密鍵/.test(text) && /秘密鍵の所有者/.test(text)],
        ["H", "ディジタル署名", countOccurrences(text, "ディジタル署名") >= 4],
        ["I", "公開鍵", /ディジタル署名を公開鍵によって復号/.test(text)],
        ["J", "認証局", /第三者である認証局/.test(text)],
        ["K", "電子証明書", /電子証明書/.test(text)]
      ];
      return checks;
    }

    function renderAnswerChecks(text) {
      const container = document.querySelector("#teacher-answer-result");
      if (!container) return;
      const rows = answerChecks(text).map(([label, expected, ok]) => {
        return "<tr><td>" + label + "</td><td>" + expected + "</td><td>" + (ok ? "一致" : "要確認") + "</td></tr>";
      }).join("");
      container.innerHTML = "<table><thead><tr><th>空欄</th><th>想定語</th><th>判定</th></tr></thead><tbody>" + rows + "</tbody></table>";
    }

    function initTeacher() {
      const button = document.querySelector("#teacher-check");
      if (!button) return;
      button.addEventListener("click", async () => {
        const submission = parseSubmission(document.querySelector("#teacher-submission-input").value);
        const teacherSecret = compact(document.querySelector("#teacher-secret-key").value);
        const diagnostics = [];
        if (!submission.cipherText || !submission.signature || !submission.publicKey) {
          setCallout("#teacher-parse-result", "提出テキストから暗号文、ディジタル署名、自分の公開鍵の3項目を読み取れませんでした。", true);
          return;
        }
        setCallout("#teacher-parse-result", "3項目を読み取りました。", false);
        setValue("#teacher-parsed-cipher", submission.cipherText);
        setValue("#teacher-parsed-signature", submission.signature);
        setValue("#teacher-parsed-public-key", submission.publicKey);
        if (document.querySelector("#teacher-submission-input").value.includes("SEC-")) {
          diagnostics.push("提出テキストに SEC-... が含まれています。秘密鍵を提出している可能性があります。");
        }

        try {
          const publicInfo = await importPublic(submission.publicKey);
          setValue("#teacher-student-fingerprint", publicInfo.fingerprint);
          setValue("#teacher-student-visual", publicInfo.visual);
        } catch (error) {
          setValue("#teacher-student-fingerprint", "学生の公開鍵を読めません。");
          setValue("#teacher-student-visual", "");
          diagnostics.push("自分の公開鍵欄が PUB-... として読めません。");
        }

        let decrypted = null;
        try {
          setText("#teacher-decrypt-meta", "復号しています...");
          decrypted = await decryptMessage(submission.cipherText, teacherSecret);
          setValue("#teacher-plaintext", decrypted.text);
          setText("#teacher-decrypt-meta", "復号しました。");
          renderAnswerChecks(decrypted.text);
        } catch (error) {
          setText("#teacher-decrypt-meta", "復号に失敗しました。教員の秘密鍵か暗号文を確認してください。");
          setValue("#teacher-plaintext", "");
          diagnostics.push("暗号文を教員の秘密鍵で復号できませんでした。教員の公開鍵以外で暗号化した可能性があります。");
        }

        try {
          const verify = await verifySignature(submission.cipherText, submission.signature, submission.publicKey);
          setCallout("#teacher-signature-result", verify.verified ? "署名は検証できました。" : "署名を検証できませんでした。暗号文、署名、公開鍵の組み合わせを確認してください。", !verify.verified);
          if (!verify.verified) diagnostics.push("署名検証に失敗しています。署名対象や公開鍵が違う可能性があります。");
        } catch (error) {
          setCallout("#teacher-signature-result", "署名検証に失敗しました。SIG-... または PUB-... を確認してください。", true);
          diagnostics.push("署名または学生の公開鍵を読み取れませんでした。");
        }

        try {
          const cipherPayload = parseWrapped(submission.cipherText, "CIPHER");
          const studentFp = await publicFingerprint(submission.publicKey);
          if (cipherPayload.recipientFingerprint === studentFp) {
            diagnostics.push("暗号文の宛先が学生本人の公開鍵になっています。教員宛の暗号化になっていない可能性があります。");
          }
          if (decrypted && decrypted.secretPayload.publicFingerprint !== cipherPayload.recipientFingerprint) {
            diagnostics.push("暗号文の宛先指紋と、復号に使った秘密鍵の対応公開鍵指紋が一致していません。");
          }
        } catch (error) {
          diagnostics.push("暗号文の内部情報を読み取れませんでした。");
        }

        setCallout(
          "#teacher-diagnostics",
          diagnostics.length ? diagnostics.join("\n") : "目立った形式上の問題は見つかりませんでした。",
          diagnostics.length > 0
        );
      });
    }

    function init() {
      if (!window.crypto || !crypto.subtle) {
        return;
      }
      initKeygen();
      initExamPractice();
      initEncryptTool();
      initSignTool();
      initSubmission();
      initTeacher();
    }

    return { init };
  })();

  publicKeyExercise.init();

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
