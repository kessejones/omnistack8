import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import logo from '../assets/logo.svg'

import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import api from '../services/api';

export default function Main({ match }){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });

            if(response.status == 200) {
                setUsers(response.data);
            }
        }

        loadUsers();
    }, [match.params.id]);

    async function handleLike(id){
        const response = await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id
            }
        });

        if(response.status == 200) {
            setUsers(users.filter(user => user._id !== id));
        }
    }
    
    async function handleDislike(id){
        const response = await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        });

        if(response.status == 200) {
            setUsers(users.filter(user => user._id !== id));
        }
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev"/>        
            </Link>
                { users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <img src={user.avatar} alt={user.name}/>
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p>{user.bio}</p>
                                </footer>
                                <div className="buttons">
                                    <button type="button"  onClick={e => handleLike(user._id)}>
                                        <img src={like} alt=""/>
                                    </button>
                                    <button type="button"  onClick={e => handleDislike(user._id)}>
                                        <img src={dislike} alt=""/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty">
                        Acabou :(
                    </div>
                ) }
        </div>
    );
}