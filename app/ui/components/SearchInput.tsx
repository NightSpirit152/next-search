"use client";

import React from "react";

type TSearchInputProps = {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
};

const SearchInput = ({ value, onChange, onClear }: TSearchInputProps) => {
  return (
    <div className="inputWrap">
      <input
        className="input"
        placeholder="Введите запрос…"
        aria-label="Строка поиска"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      {value && (
        <button
          className="clearBtn"
          aria-label="Очистить"
          onClick={onClear}
          type="button"
          title="Очистить"
        >X</button>
      )}
    </div>
  );
}

export default SearchInput;
