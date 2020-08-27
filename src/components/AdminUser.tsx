import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { adminUserData, IUser } from '../components/AdminUsers';


const AdminUser: React.SFC<RouteComponentProps<{ id: string }>> = props => {
    let user: IUser;
    
    if(props.match.params.id){
        const id: number = parseInt(props.match.params.id, 10);
        user = adminUserData.filter(item => item.id === id)[0];
    } else {
        return null;
    }
    return (
        <div>
            <h1>Admin User page</h1>
            <div>
                <b>Id: </b>
                <span>{user.id.toString()}</span>
            </div>
            <div>
                <b>Admin status: </b>
                <span>{user.isAdmin.toString()}</span>
            </div>
        </div>
    );
};

export default AdminUser;