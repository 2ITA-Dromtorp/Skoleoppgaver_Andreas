

export default function Kvittering() {

    let bestillingsId = sessionStorage.getItem("bestillingsID");
    let pris = sessionStorage.getItem("pris");
    let data = sessionStorage.getItem("data");

    return (
        <div className="kvitteringDiv">
            <h1 className="kvitteringText">Bestillingsnummer: {bestillingsId}</h1>
            <h2>Sum: {pris} kr</h2>
            <h2>Bestilte produkter: {data}</h2>
        </div>
    );
}