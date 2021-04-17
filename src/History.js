import React, {useContext, useEffect, useState} from 'react';
import HistoryList from './HistoryList';
//import { GlobalContext } from './context/GlobalState';
import './History.css';
import db from './firebase';

const History = () => {

    //const { transactions } = useContext(GlobalContext);
    const [transactions, setTransactions] = useState([]);  

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    useEffect(() => {
        db.collection('history').orderBy('timestamp','desc').onSnapshot(snapshot => {
          setTransactions(snapshot.docs.map(doc => ({id: doc.id, name: doc.data().name, amount: doc.data().amount})))
        });
      },[])
    
    return (
        <div className="history">
            <div className="hist">
                <h3 className="history-title">HISTORY</h3>
                <p className="date">{today}</p>
            </div>
            <div className="list">
                {
                    transactions.map(transaction => (    
                        <HistoryList key={transaction.id} id={transaction.id} name={transaction.name} amount={transaction.amount} />
                    ))
                }
			</div>
        </div>
    )
}

export default History;
