import React, { useContext, useState, useEffect } from 'react';
//import { GlobalContext } from './context/GlobalState';
import db from './firebase';
import firebase from 'firebase';
import './BalanceData.css';

const BalanceData = () => {
    //const { transactions } = useContext(GlobalContext);
    //const { addTransaction } = useContext(GlobalContext);

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);  

    useEffect(() => {
        db.collection('history').orderBy('timestamp','desc').onSnapshot(snapshot => {
          setTransactions(snapshot.docs.map(doc => ({id: doc.id, name: doc.data().name, amount: doc.data().amount})))
        });
      },[])

    //console.log(transactions);
    const amounts = transactions.map(transaction => transaction.amount);
    console.log(amounts);
    const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc+=item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    console.log(expense,income);

    const addNewUser = (event) => {
        /* const newUserData = {
            id: Math.floor(Math.random() * 1000000000),
            name: name,
            amount: +amount
        }; */

        event.preventDefault();
        setId(Math.floor(Math.random() * 1000000000));
        db.collection('history').add({
            id: id,
            name: name,
            amount: +amount,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setTransactions([...transactions,{id: id, name:name, amount:+amount}]);
        setAmount('');
        setName('');

        //addTransaction(newUserData);
    }

    return (
        <div>
            <div className="balance">
				<div className="balance-amt">
					<h3>BALANCE</h3>
					<p>₹{total}</p>
				</div>
				<div className="remaining">
					<div className="income">
						<h3>INCOME</h3>
						<p>+₹{income}</p>
					</div>
					<div className="expense">
						<h3>EXPENSE</h3>
						<p>-₹{expense}</p>
					</div>
				</div>
			</div>
			<form className="form-data">
				<input className="input" type="text" name="user" value={name} onChange={ e => setName(e.target.value)} placeholder="User" />
				<input className="input" type="text" name="amount" value={amount} onChange={ e => setAmount(e.target.value)} placeholder="Amount"  />
				<button className="btn" type="button" onClick={addNewUser}>SUBMIT</button>
			</form>
        </div>
    )
}

export default BalanceData;
