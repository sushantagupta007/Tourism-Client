import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from './../../Hooks/useAuth';


const ManageMyorder = () => {
    const {user} = useAuth(); 
    const [orders,setOrder] = useState([])
    const [myorder,setmyorder] = useState([]); 
    let i=1; 
    useEffect(()=>{
        fetch('https://radiant-everglades-28341.herokuapp.com/users/managemyorder')
        .then(res=>res.json())
        .then(data=>{
            setOrder(data)
            const filtereddata = data.filter(item=>item.email===user.email)
            setmyorder(filtereddata); 
            
            
        })
    },[user.email])
    
    const handleDecline=(id)=>{
        const permission = prompt("Do you want to delte")
        if(permission==='ok'|| permission==='yes'){
            fetch(`https://radiant-everglades-28341.herokuapp.com/managemyorder/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0){
                const remainingUsers = orders.filter(order=>order._id!==id)
                setOrder(remainingUsers)
                alert("Deleted Successfully")
            }
        })
        }
        else{
            return
        }
        
    }

    return (        
    <div className="border w-75 mx-auto mt-4 bg-light p-4"> 
        <h2 className="text-center border-bottom"> Manage Order</h2>

        <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Service Name</th>
            <th scope="col">User Name</th>
            <th scope="col">User Email</th>
            <th scope="col">User Date</th>
            <th scope="col">Delete</th>
            
            
            </tr>
        </thead>
        <tbody>
            {
                myorder.map((order)=> <tr>
                    <th key={order._id}scope="row">{i++}</th>
                        <td>{order.service}</td>
                        <td>{order.UserName}</td>
                        <td>{order.email}</td>
                        <td>{order.date}</td>
                        
                        <td> <button onClick={()=>handleDecline(order._id)}type="button" className="btn btn-danger">Delete</button></td>
                    </tr>)
            }
            
        </tbody>
        </table>
        
    </div>
    );
};

export default ManageMyorder; 