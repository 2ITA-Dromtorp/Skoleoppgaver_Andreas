import React, { useState, useEffect } from 'react';

// TicketSystem komponenten lar brukere legge til og oppdatere support tickets
const TicketSystem = () => {
  const [tickets, setTickets] = useState([]); // State for å holde på alle tickets
  const [newTicket, setNewTicket] = useState(''); // State for å holde på input fra bruker

  useEffect(() => {
    // Laster inn tickets fra localStorage når komponenten brukes
    const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    setTickets(storedTickets);
  }, []);

  useEffect(() => {
    // Lagrer tickets til localStorage hver gang tickets state endres
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleInputChange = (e) => {
    setNewTicket(e.target.value); // Oppdaterer newTicket state basert på input feltet
  };

  const addTicket = () => {
    if (newTicket.trim() === '') {
      // Legger ikke til tomme tickets
      return;
    }

    // Lager et nytt ticket objekt
    const newTicketObject = {
      id: Date.now(), // Unik ID basert på nåværende tidspunkt
      problem: newTicket, // Problem beskrivelse fra brukeren
      resolved: false, // Settes initialt til uløst
    };

    // Legger til det nye ticket objektet til listen av tickets
    setTickets([...tickets, newTicketObject]);
    setNewTicket(''); // Nullstiller input feltet etter å ha lagt til en ticket
  };

  const handleCheckboxChange = (ticketId) => {
    // Oppdaterer tickets state basert på om en ticket er løst eller ikke
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, resolved: !ticket.resolved } : ticket
      )
    );
  };

  return (
    <>
          <div className='supportInfo'>
      <p className='supportInfoText'>Dette er et support ticket system. Om du har et problem, sender du bare inn "ticketen" din, også løser vi det. Husk å huke av på boksen når problemet ditt er løst! Om du har problemer med nettsiden kan du kontakte oss via kontaktinformasjonen vår nederst på siden.</p>
      </div>
    <div className='mainPage'>

      <h1>Support Ticket System</h1>
      <div className='ticketDiv'>

 
          {/* Input felt for å beskrive et nytt problem */}
          <input className='ticketInput' type="text" placeholder='Skriv inn ticket' value={newTicket} onChange={handleInputChange} />



        <button className='ticketAdder' onClick={addTicket}>Legg til Ticket</button> {/* Knapp for å legge til en ny ticket */}

      </div>
      <div>
        <h2 className='ticketHeader'>Tickets</h2>
        <ul className='ticketList'>
          {tickets.map((ticket) => (
            <li key={ticket.id} className='ticket'>
              <label className='ticketTextDiv'>

                <div className='ticketTextBox'>  {ticket.problem} </div>
                <div className='ticketButtonBox'>  <button className='ticketButton' onClick={() => handleCheckboxChange(ticket.id)}>{ticket.resolved ? 'Løst' : 'Uløst'}{/* Viser om ticket er løst eller ikke */}</button> </div>
                {/* Knapp for å indikere om en ticket er løst eller ikke */}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default TicketSystem;

