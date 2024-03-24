import customersData from './test.json';

export default function EquipmentTable() {

    return (
        <table className='styled_table'>
        <thead>
            <tr>
                <th>ElevID</th>
                <th>Fornavn</th>
                <th>Etternavn</th>
                <th>DatamaskinID</th>
                <th>Hobby</th>
                <th>Klasse</th>
                <th>Kjonn</th>
            </tr>
        </thead>
        <tbody>
            {customersData.map((customer) => (
            <tr key={customer.ElevID}>
                <td>{customer.ElevID}</td>
                <td>{customer.Fornavn}</td>
                <td>{customer.Etternavn}</td>
                <td>{customer.DatamaskinID}</td>
                <td>{customer.Hobby}</td>
                <td>{customer.Klasse}</td>
                <td>{customer.Kjonn}</td>
            </tr>
            ))}
        </tbody>
    </table>
    );

}