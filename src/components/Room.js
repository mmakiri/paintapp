import React from "react";

const Room = ( { name, size, typeFactor, paintName, paintPrice, 
    paintCoverage, paintCount, } ) => {

    var totalSquareMeters = (size * typeFactor) * paintCount;
    var totalLitersNeeded = totalSquareMeters / paintCoverage;
    var totalCost = totalLitersNeeded * paintPrice;

    return (
        <div>
            <p>
                {name} {size}m<sup>2</sup> tarvitsee {Math.round(totalLitersNeeded * 100) / 100} L maalia.
            </p>
            <p className="costParagraph">Hinta: {Math.round((totalCost * 100) / 100)}€</p>
            <br></br>
        </div>
    )
}

export default Room;