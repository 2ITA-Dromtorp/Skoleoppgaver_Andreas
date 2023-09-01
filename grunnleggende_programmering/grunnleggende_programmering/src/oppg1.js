
function DelOppgaveA() {
    return (
        <div className="deloppgaveTekst">
            <h2>Hva skriver man i JS for å gi en testvariabel verdien 8?</h2>
            <p>Svar: let test = 8 </p>
            <p>Svar: sjekk konsollen {console.log(typeof(8))};</p>
            
        </div>
    )

}

function Oppgave1() {

    return (
        <div>
        <h1>Dette er oppgave 1</h1>
        <DelOppgaveA/>
        </div>
    )

}

export default Oppgave1;