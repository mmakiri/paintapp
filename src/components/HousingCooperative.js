import React from "react";
import Apartment from "./Apartment";

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
                totalSquareMeters += (element.size * element.typeFactor);
            })
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
                        return <Apartment key={i} {...apartment} paint={paint} />
                    })}
                </div>
                <div>
                    <h3>Kokonaishinta: {Math.round((getTotalPrice(apartments, paint) * 100) / 100)}€</h3>
                    <h3>Maalin kokonaistarve: {Math.round((getTotalLiters(apartments, paint) * 100) / 100)}L</h3>
                </div>
            </div>
        </div>
    )
};

export default HousingCooperative;