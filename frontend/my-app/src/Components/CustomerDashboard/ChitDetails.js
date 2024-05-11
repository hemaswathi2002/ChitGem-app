import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetUsersChit } from '../Actions/customersAction';

export default function ChitDetails() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetUsersChit());
    }, [dispatch]);
    
    const chit = useSelector((state) => {
        return state.customer.chit;
    });

    return (
        <div style = {{paddingTop: '60px'}}>
            <table style={{ border: '2px solid darkpink', borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ backgroundColor: 'lightpink', border: '2px solid darkpink' }}>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Chit Amount</th>
                        <th>Total</th>
                        <th>Installment</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {chit.map((ele) => (
                        <tr key={ele._id}>
                            <td>{ele.name}</td>
                            <td>{ele.email}</td>
                            <td>{ele.date.startDate.split('T')[0]}</td>
                            <td>{ele.date.endDate.split('T')[0]}</td>
                            <td>{ele.chitAmount}</td>
                            <td>{ele.totalAmount}</td>
                            <td>{ele.installments}</td>
                            <td>{ele.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
