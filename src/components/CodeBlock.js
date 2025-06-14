import React, { useState, useMemo } from "react";
import { Clipboard, Check } from "lucide-react";
import { useTheme } from "../app/ThemeContext";
import cx from "../utils/cx";

const CodeBlock = ({ code, language }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const highlightedLines = useMemo(() => {
    const lines = code.split("\n");
    return lines
      .map((line, index) => {
        let highlightedLine = line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        if (language === "jsx") {
          highlightedLine = highlightedLine
            .replace(/(\w+)=/g, '<span class="jsx-attr">$1</span>=')
            .replace(/(&lt;\/?)(\w+)/g, '$1<span class="jsx-tag">$2</span>')
            .replace(
              /(&#39;[^&#39;]*&#39;|&quot;[^&quot;]*&quot;)/g,
              '<span class="string">$1</span>'
            )
            .replace(/(\{[^}]*\})/g, '<span class="jsx-expression">$1</span>')
            .replace(
              /(\/\*[\s\S]*?\*\/|\/\/[^\r\n]*)/g,
              '<span class="comment">$1</span>'
            );
        } else if (language === "css") {
          highlightedLine = highlightedLine
            .replace(
              /^(\s*)([.#]?[\w-]+(?::[\w-]+)*(?:\([^)]*\))?)\s*\{/g,
              '$1<span class="css-selector">$2</span> {'
            )
            .replace(/(\w[\w-]*)\s*:/g, '<span class="css-property">$1</span>:')
            .replace(/:\s*([^;{}]+);/g, ': <span class="css-value">$1</span>;')
            .replace(/(@[\w-]+)/g, '<span class="css-at-rule">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
            .replace(/([{}();])/g, '<span class="punctuation">$1</span>');
        } else if (language === "js") {
          highlightedLine = highlightedLine
            .replace(
              /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|this|super|class|extends|import|export|from|default|async|await|yield|typeof|instanceof|in|of|delete|void|null|undefined|true|false)\b/g,
              '<span class="js-keyword">$1</span>'
            )
            .replace(
              /\b(Math|Date|Array|Object|String|Number|Boolean|RegExp|Error|Promise|console|window|document|localStorage|sessionStorage|setTimeout|setInterval|clearTimeout|clearInterval|JSON|parseInt|parseFloat|isNaN|isFinite|encodeURIComponent|decodeURIComponent)\b/g,
              '<span class="js-builtin">$1</span>'
            )
            .replace(/(\w+)(\()/g, '<span class="js-function">$1</span>$2')
            .replace(
              /(&#39;[^&#39;]*&#39;|&quot;[^&quot;]*&quot;|`[^`]*`)/g,
              '<span class="string">$1</span>'
            )
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
            .replace(
              /(\/\*[\s\S]*?\*\/|\/\/[^\r\n]*)/g,
              '<span class="comment">$1</span>'
            )
            .replace(
              /(\$\{[^}]*\})/g,
              '<span class="template-expression">$1</span>'
            );
        }

        return `<div class="line-container">
                <span class="line-number">${index + 1}</span>
                <span class="line-content">${highlightedLine || " "}</span>
            </div>`;
      })
      .join("");
  }, [code, language]);

  const styles = useMemo(
    () => ({
      ".line-container": {
        display: "flex",
        alignItems: "flex-start",
        minHeight: "1.6rem",
        padding: "0.1rem 0",
      },
      ".line-number": {
        display: "inline-block",
        width: "3em",
        textAlign: "right",
        marginRight: "1.5em",
        color: theme === "dark" ? "#a8a29e" : "#78716c",
        userSelect: "none",
        fontSize: "0.85em",
        opacity: 0.6,
        paddingTop: "0.1em",
        flexShrink: 0,
      },
      ".line-content": { whiteSpace: "pre", flex: 1, wordBreak: "break-word" },
      ".jsx-attr": {
        color: theme === "dark" ? "#f97316" : "#ea580c",
        fontWeight: 500,
      },
      ".jsx-tag": {
        color: theme === "dark" ? "#ef4444" : "#dc2626",
        fontWeight: 600,
      },
      ".jsx-expression": { color: theme === "dark" ? "#a855f7" : "#9333ea" },
      ".css-selector": {
        color: theme === "dark" ? "#ef4444" : "#dc2626",
        fontWeight: 600,
      },
      ".css-property": {
        color: theme === "dark" ? "#f97316" : "#ea580c",
        fontWeight: 500,
      },
      ".css-value": { color: theme === "dark" ? "#eab308" : "#ca8a04" },
      ".css-at-rule": {
        color: theme === "dark" ? "#ef4444" : "#dc2626",
        fontWeight: 600,
      },
      ".js-keyword": {
        color: theme === "dark" ? "#f97316" : "#ea580c",
        fontWeight: 600,
      },
      ".js-builtin": {
        color: theme === "dark" ? "#a855f7" : "#9333ea",
        fontWeight: 500,
      },
      ".js-function": {
        color: theme === "dark" ? "#06b6d4" : "#0891b2",
        fontWeight: 500,
      },
      ".template-expression": {
        color: theme === "dark" ? "#a855f7" : "#9333ea",
      },
      ".string": { color: theme === "dark" ? "#22c55e" : "#16a34a" },
      ".number": { color: theme === "dark" ? "#eab308" : "#ca8a04" },
      ".comment": {
        color: theme === "dark" ? "#6b7280" : "#9ca3af",
        fontStyle: "italic",
        opacity: 0.8,
      },
      ".punctuation": {
        color: theme === "dark" ? "#ef4444" : "#dc2626",
        opacity: 0.8,
      },
    }),
    [theme]
  );

  const cssString = Object.entries(styles)
    .map(([selector, style]) => {
      const styleString = Object.entries(style)
        .map(([property, value]) => {
          const cssProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase();
          return `${cssProperty}: ${value};`;
        })
        .join(" ");
      return `${selector} { ${styleString} }`;
    })
    .join(" ");

  return (
    <div className="relative group h-full">
      <button
        onClick={handleCopy}
        className={cx(
          "absolute top-4 right-4 p-3 rounded-xl transition-all duration-300 z-10",
          "opacity-0 group-hover:opacity-100 focus:opacity-100 transform hover:scale-105",
          "backdrop-blur-sm border shadow-lg font-medium text-xs flex items-center gap-2",
          theme === "dark"
            ? "bg-slate-800/90 hover:bg-slate-700/90 text-amber-200 border-red-500/30 hover:border-red-400/50 shadow-red-900/20"
            : "bg-white/90 hover:bg-amber-50/90 text-red-700 border-red-300/50 hover:border-red-400/70 shadow-red-200/30"
        )}
      >
        {copied ? (
          <>
            <Check size={14} className="text-green-500" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Clipboard size={14} />
            <span>Copy</span>
          </>
        )}
      </button>

      <pre
        className={cx(
          "text-sm p-6 rounded-2xl overflow-auto h-full font-mono leading-relaxed relative border-2",
          "backdrop-blur-sm transition-all duration-300 group-hover:border-opacity-60",
          theme === "dark"
            ? "bg-slate-900/70 border-red-500/25 shadow-xl shadow-red-900/10"
            : "bg-white/70 border-red-200/50 shadow-xl shadow-red-100/20"
        )}
      >
        <code
          className="font-mono block"
          dangerouslySetInnerHTML={{ __html: highlightedLines }}
        />
      </pre>

      <style jsx>{cssString}</style>
    </div>
  );
};

export default CodeBlock;
