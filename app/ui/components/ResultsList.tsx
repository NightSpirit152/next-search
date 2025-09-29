"use client";

import React from "react";
import { highlight } from "../utils/highlight";
import { TGameSearchResult } from "../../api/types";

type Props = {
	items: TGameSearchResult[];
	searchString: string;
};

const ResultsList = ({ items, searchString }: Props)=> {
	return (
		<div className="grid" role="list">
			{items.map((item) => (
				<div key={item.id} className="search_card" role="listitem" tabIndex={0} aria-label={item.title}>
					<img className="search_card__image" src={item?.image} height={150} width={100}  alt="no image"/>
					<div className="search_card__details">
						<h3 className="search_card__title">{highlight(item?.title, searchString)}</h3>
						<p>{item?.description}</p>
						<span>Год издания/Разработчик: {item?.year}г., {item?.developer}</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default ResultsList;