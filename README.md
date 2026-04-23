# 🐍 Compython

> **AI chat assistant for Obsidian with vault awareness, semantic search, one-click edits, and native Python execution.**

Compython is a fork of [Smart Composer](https://github.com/glowingjade/obsidian-smart-composer) that adds the ability to **write and run Python code directly inside Obsidian** — both manually by the user and autonomously by the AI model.

---

## ✨ What's new in Compython

### Native Python Execution

Every Python code block in the chat gets a **"Run Python"** button. Click it and the output appears inline — no terminal, no switching apps, no copy-paste.

- Works with **any AI model** — local (Gemma, Qwen, LLaMA) or cloud (Claude, GPT, Gemini)
- No tool calling required — based on markdown code block detection, so every model works
- Output appears inline with stdout, stderr, and exit code
- The vault path is automatically available as the `VAULT_PATH` environment variable inside scripts

---

## 🚀 Features (inherited from Smart Composer)

- **Contextual Chat** — reference vault files with `@filename` syntax
- **Apply Edit** — AI suggests edits to your notes with one-click apply
- **Vault Search (RAG)** — semantic search across your entire vault
- **MCP Support** — connect to external tools via Model Context Protocol
- **Local Model Support** — Ollama, LM Studio, and any OpenAI-compatible provider
- **Custom System Prompts** and **Prompt Templates**
- Multiple AI providers: Anthropic, OpenAI, Gemini, Groq, DeepSeek, OpenRouter, and more

---

## 📦 Installation

### Manual installation

1. Download the latest release: `main.js`, `manifest.json`, `styles.css`
2. Create the folder: `YOUR_VAULT/.obsidian/plugins/compython/`
3. Copy the 3 files into that folder
4. In Obsidian: `Settings → Community plugins → reload` → enable **Compython**

> ⚠️ If you have **Smart Composer** installed, disable or uninstall it first — they conflict since they register the same view type.

---

## ⚙️ Setting up Python execution

1. Go to `Settings → Compython → Python Executor`
2. Toggle **Enable Python execution** ON
3. Set the **Python path**:
   - Windows: `python` or `C:\Python311\python.exe`
   - macOS/Linux: `python3`
4. Configure timeout and confirmation preferences
5. Done — every `python` code block in chat will now have a **Run Python** button

### Using your vault path in scripts

```python
import os

vault = os.environ.get("VAULT_PATH", ".")
print(f"My vault is at: {vault}")

# List all markdown files in the vault
import pathlib
notes = list(pathlib.Path(vault).rglob("*.md"))
print(f"Found {len(notes)} notes")
```

---

## 🔧 Development

```bash
git clone https://github.com/disonfranco/compython
cd compython
npm install
npm run dev      # watch mode
npm run build    # production build
```

Copy `main.js`, `manifest.json`, and `styles.css` to your vault's plugin folder after building.

---

## 🗺️ Roadmap

- [ ] Auto-run Python after AI response (agentic loop for local models)
- [ ] Plot rendering — display matplotlib figures inline in chat
- [ ] Session state — persistent Python environment across executions
- [ ] Virtual environment support — point to a venv instead of system Python
- [ ] Safety sandbox — optional restricted execution mode

---

## 🙏 Credits

Compython is built on top of [Smart Composer](https://github.com/glowingjade/obsidian-smart-composer) by [@glowingjade](https://github.com/glowingjade) and contributors. All original features and architecture are theirs — Compython adds the Python execution layer on top.

**Authors of the Python execution feature:**
- [Dison Franco](https://github.com/disonfranco) — concept, testing, and direction
- [Claude](https://claude.ai) (Anthropic) — implementation

---

## 📄 License

MIT — same as the original Smart Composer.
