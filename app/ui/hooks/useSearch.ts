"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { TGameSearchResult } from "../../api/types";
import { useDebounced } from "./useDebouned";

export const useSearch = () => {
	const [searchString, setSearchString] = useState<string>("");
	const [results, setResults] = useState<TGameSearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const reqId = useRef(0);
	const abortRef = useRef<AbortController | null>(null);
	const debouncedSearch = useDebounced(searchString, 300);

	// Инициализация из URL
	useEffect(() => {
		if (typeof window === "undefined") return;

		const urlParams = new URLSearchParams(window.location.search);
		const initialSearch = urlParams.get("q") ?? "";
		setSearchString(initialSearch);
	}, []);

	// Обновление URL при изменении searchString
	useEffect(() => {
		if (typeof window === "undefined") return;

		const url = new URL(window.location.href);
		if (searchString.trim()) {
			url.searchParams.set("q", searchString.trim());
		} else {
			url.searchParams.delete("q");
		}
		window.history.replaceState(null, "", url.toString());
	}, [searchString]);

	useEffect(() => {
		const query = debouncedSearch.trim();
		setError(null);

		if (!query) {
			setResults([]);
			setLoading(false);
			abortRef.current?.abort();
			return;
		}

		setLoading(true);

		// Отменяем предыдущий запрос
		abortRef.current?.abort();
		const controller = new AbortController();
		abortRef.current = controller;

		const currentReqId = ++reqId.current;

		const executeSearch = async () => {
			try {
				const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
					signal: controller.signal
				});

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}

				const data = await response.json() as { items: TGameSearchResult[]; took: number };

				// Защита от устаревших ответов
				if (currentReqId === reqId.current) {
					setResults(data.items);
					setLoading(false);
				}
			} catch (error: any) {
				if (error?.name === "AbortError") return;

				if (currentReqId === reqId.current) {
					setError(error?.message ?? "Произошла ошибка при поиске");
					setLoading(false);
				}
			}
		};

		void executeSearch();

		return () => {
			controller.abort();
		};
	}, [debouncedSearch]);

	const resetSearch = useCallback(() => {
		setSearchString("");
		setResults([]);
		setError(null);
		setLoading(false);
		abortRef.current?.abort();
	}, []);

	return {
		searchString,
		setSearchString,
		results,
		loading,
		error,
		resetSearch
	};
}