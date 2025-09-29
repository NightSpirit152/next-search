"use client";

import SearchInput from "./ui/components/SearchInput";
import ResultsList from "./ui/components/ResultsList";
import { useSearch } from "./ui/hooks/useSearch";

export default function Page() {
	const { searchString, setSearchString, resetSearch, results, loading, error } = useSearch();

	return (
		<main className="container">
			<h1 style={{ margin: "0 0 16px" }}>Поиск</h1>

			<div className="panel">
				<SearchInput
					value={searchString}
					onChange={setSearchString}
					onClear={() => resetSearch()}
				/>
				{loading && "⏳ Идет поиск..."}
				{!error && <ResultsList items={results} searchString={searchString} />}
				{error && <div style={{ color: "#ef4444", marginTop: 8 }}>Ошибка: {error}</div>}
			</div>
		</main>
	);
}
