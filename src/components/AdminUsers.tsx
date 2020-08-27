import * as React from 'react';
import { NavLink } from 'react-router-dom';


interface IUser {
    id: number;
    name: string;
    isAdmin: boolean;
};

const adminUserData: IUser[] = [
    { id:1001, name:'Ronaldo', isAdmin: true }, 
    { id:1002, name:'Cosmo', isAdmin: false }, 
    { id:1003, name:'Trent', isAdmin: true } 
];

const AdminUsers: React.SFC = props => {
      
    return (
        <div>
            <ul className='admin-sections'>
                {adminUserData.map(item => (
                    <li>
                        <NavLink    to={`/admin/users/${item.id}`}
                                    activeClassName='admin-link-active'
                        >
                            {item.name}
                        </NavLink>
                    </li>
                    ))}
            </ul>    
        </div>
    );
}

export { AdminUsers, adminUserData, IUser };