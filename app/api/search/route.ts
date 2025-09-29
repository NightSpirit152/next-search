import { NextResponse } from "next/server";
import { MOCK_GAMES } from "../mocks";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const q = (searchParams.get("q") || "").trim().toLowerCase();

	const delay = 150 + Math.floor(Math.random() * 1000);
	await new Promise((r) => setTimeout(r, delay));

	const items = q
		? MOCK_GAMES.filter(s => s.title?.toLowerCase().includes(q))
		: [];

	return NextResponse.json({ items, took: delay });
}
