import React from "react";

export function highlight(text: string, searchString: string) {
    const q = searchString.trim();
    if (!q) return text;
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return text;
    const a = text.slice(0, i);
    const b = text.slice(i, i + q.length);
    const c = text.slice(i + q.length);
    return (
      <>
        {a}
        <mark>{b}</mark>
        {c}
      </>
    );
}
