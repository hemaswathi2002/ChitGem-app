import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChitsNotPaidPerMonth } from '../../Actions/Invoice';
import { Table } from 'react-bootstrap';

const ChitsNotPaidPerMonth = () => {
    const dispatch = useDispatch()
    const chitsNotPaidPerMonth = useSelector(state => state.invoice.chitsNotPaidPerMonth)
    console.log(chitsNotPaidPerMonth)

    useEffect(() => {
        dispatch(getChitsNotPaidPerMonth())
    }, [dispatch])

    const formatMonthKey = (monthKey) => {
        const [year, month] = monthKey.split('-')
        const date = new Date(year, month - 1)
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    return (
        <div style={{ marginTop: '20px', paddingTop: '40px'}}>
            <h2>List Of Pending Payments</h2>
            {Object.keys(chitsNotPaidPerMonth).map(monthKey => (
                <div key={monthKey}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Chit Amount</th>
                                <th>Pending</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chitsNotPaidPerMonth[monthKey].map(chit => (
                                <tr key={chit._id}>
                                    <td>{chit.name}</td>
                                    <td>{chit.email}</td>
                                    <td>{chit.amount}</td>
                                    <td>{chit.month_year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
};

export default ChitsNotPaidPerMonth;
