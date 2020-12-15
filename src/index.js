import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";
import data from "./data/Asunnot.json";
import "../src/styles/index.css";

const formReducer = (state, event) => {
	return {
		...state,
		[event.name]: event.value,
	};
};
function Form() {
	const [formData, setFormData] = useReducer(formReducer, {});
	const handleSubmit = (event) => {
		event.preventDefault();
		var paint = {
			paintName: event.target.name.value,
			paintPrice: event.target.price.value,
			paintCoverage: event.target.coverage.value,
			paintCount: event.target.count.value,
		};
		renderResults(paint);
	};
	const handleChange = (event) => {
		setFormData({
			name: event.target.name,
			value: event.target.value,
		});
	};
	return (
		<div className="form">
			<h1>Maalilaskuri</h1>
			<h2>Syötä maalin tiedot:</h2>
			<form onSubmit={handleSubmit}>
				<p>Maalin nimi:</p>
				<input type="text" name="name" required="required" onChange={handleChange} />
				<p>Hinta (€/L):</p>
				<input type="number" name="price" required="required" onChange={handleChange} />
				<p>Riittoisuus (m<sup>2</sup>/L):{" "}</p>
				<input type="number" name="coverage" required="required" onChange={handleChange} />
				<p>Maalauskerrat:</p>
				<input type="number" name="count" required="required" onChange={handleChange} />
				<br></br>
				<button type="submit>" className="submitButton">Lähetä tiedot</button>
			</form>
			<a
				href="https://github.com/mmakiri/paintapp"
				target="_blank"
				rel="noopener noreferrer"
			>
				<button>Github</button>
			</a>
		</div>
	);
}
const Room = ({
	name,
	size,
	typeFactor,
	paintName,
	paintPrice,
	paintCoverage,
	paintCount,
}) => {
	var totalSquareMeters = size * typeFactor * paintCount;
	var totalLitersNeeded = totalSquareMeters / paintCoverage;
	var totalCost = totalLitersNeeded * paintPrice;
	return (
		<div className="huone">
			<p>
				{name}({size}m<sup>2</sup>) = {Math.round(totalLitersNeeded * 100) / 100}L maalia. Hinta: {Math.round((totalCost * 100) / 100)}€
      		</p>
			<br></br>
		</div>
	);
};
const Apartment = ({ name, rooms, paint }) => {
	function getTotalPrice(rooms, paint) {
		let paintPrice = paint.paintPrice;
		let totalLetersNeeded = getTotalLiters(rooms, paint);
		let totalPrice = totalLetersNeeded * paintPrice;
		return totalPrice;
	}
	function getTotalLiters(rooms, paint) {
		let paintCount = paint.paintCount;
		let totalSquareMeters = 0;
		let paintCoverage = paint.paintCoverage;
		rooms.forEach((element) => {
			totalSquareMeters += element.size * element.typeFactor;
		});
		let totalLetersNeeded = (totalSquareMeters / paintCoverage) * paintCount;
		return totalLetersNeeded;
	}
	function getSquareMeters(rooms) {
		let totalSquareMeters = 0;
		rooms.forEach((element) => {
			totalSquareMeters += element.size;
		});
		return totalSquareMeters;
	}
	return (
		<div className="asunnot">
			<h3>
				{name} {getSquareMeters(rooms)}m<sup>2</sup>
			</h3>
			<div className="rooms">
				{rooms.map((room, i) => {
					return <Room key={i} {...room} {...paint} />;
				})}
				<p>
					Asunnon maalauksen hinta: {Math.round((getTotalPrice(rooms, paint) * 100) / 100)}€
        		</p>
				<p>
					Maalintarve: {Math.round((getTotalLiters(rooms, paint) * 100) / 100)}L
        		</p>
			</div>
		</div>
	);
};
const HousingCooperative = ({ apartments = [], paint }) => {
	function getTotalPrice(apartments, paint) {
		let paintPrice = paint.paintPrice;
		let totalLitersNeeded = getTotalLiters(apartments, paint);
		var totalPrice = totalLitersNeeded * paintPrice;
		return totalPrice;
	}
	function getTotalLiters(apartments, paint) {
		let paintCount = paint.paintCount;
		let totalSquareMeters = 0;
		let paintCoverage = paint.paintCoverage;
		apartments.forEach((element) => {
			element.rooms.forEach((element) => {
				totalSquareMeters += element.size * element.typeFactor;
			});
		});
		let totalLitersNeeded = (totalSquareMeters / paintCoverage) * paintCount;
		return totalLitersNeeded;
	}
	return (
		<div className="results">
			<div>
				<h2>Asunnot:</h2>
				<div className="apartments">
					{apartments.map((apartment, i) => {
						return <Apartment key={i} {...apartment} paint={paint} />;
					})}
				</div>
				<div>
					<h3>
						Kokonaishinta:{" "}
						{Math.round((getTotalPrice(apartments, paint) * 100) / 100)}€
          			</h3>
					<h3>
						Maalin {paint.paintName} kokonaistarve:{" "}
						{Math.round((getTotalLiters(apartments, paint) * 100) / 100)}L
					</h3>
				</div>
			</div>
		</div>
	);
};
function renderResults(paint) {
	ReactDOM.render(
		<HousingCooperative apartments={data} paint={paint} />,
		document.getElementById("result-root")
	);
}
ReactDOM.render(<Form />, document.getElementById("root"));