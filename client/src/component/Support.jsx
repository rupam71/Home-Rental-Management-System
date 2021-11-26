import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../history';
import Input from './Input';
import { createSupportTicket, getUsersAllSupportTicket } from './../actions/support';

const Support = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    if (!user) history.push('/')

    const support = useSelector(state => state.support)

    useEffect(() => {
        if (user) dispatch(getUsersAllSupportTicket(user._id))
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (support.status === 'sent') {
            setsupportTicketState({
                subject: '',
                description: ''
            })
            dispatch({ type: 'CHANGE_STATUS' })
        }
        // eslint-disable-next-line
    }, [support]);

    const [supportTicketState, setsupportTicketState] = useState({
        subject: '',
        description: ''
    });
    const [createTicketBar, setcreateTicketBar] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createSupportTicket(supportTicketState))
    }

    const createTicketRender = () => {
        if (!createTicketBar) return <button onClick={() => setcreateTicketBar(true)} className="btn btn-primary btn-block" >Create Your Ticket</button>
        else return <div>
            <div className="create-support-ticket">
                <h2 className='text-center pt-2'>Create Your Support Ticket Here</h2>
                <form onSubmit={handleSubmit} className='mt-5'>
                    <div className="form-row">
                        <Input width="full"
                            change={e => setsupportTicketState({ ...supportTicketState, subject: e })}
                            type="text" label='Subject' value={supportTicketState.subject} />
                        <Input width="full"
                            change={e => setsupportTicketState({ ...supportTicketState, description: e })}
                            type="text" label='Description' value={supportTicketState.description} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Create Your Ticket</button>
                    <br />
                </form>
            </div>
            <div onClick={() => setcreateTicketBar(false)} className='close-span'><i className="fas fa-chevron-up" /></div>
        </div>
    }

    const ticketListRender = () => {
        if (support.tickets.length === 0) return <tr><td colSpan="2">No Ticket Created Yet</td></tr>
        else return support.tickets.map(ticket => 
            <tr key={ticket._id}>
                <td className='col-10'>{ticket.subject}</td>
                <th className='text-center' scope="row">{ticket.status}</th>
            </tr>
        )
    }

    return (
        <div className="container">
            {createTicketRender()}
            <div className="support-ticket-list">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Subject</th>
                            <th className='text-center' scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketListRender()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Support;