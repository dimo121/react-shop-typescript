import * as React from 'react';
import AdminProducts from '../components/AdminProducts';
import { AdminUsers } from '../components/AdminUsers';
import AdminUser from '../components/AdminUser';
import { NavLink, Route, RouteComponentProps } from 'react-router-dom';

const AdminPage: React.SFC = () => {
    return (
        <div className="page-container">
            <h1>Admin Panel</h1>
            <ul className='admin-sections'>
                <li key='users'>
                    <NavLink to={`/admin/users`} activeClassName="admin-link-active">
                        Users
                    </NavLink>
                </li>
                <li key="products">
                    <NavLink to={`/admin/products`} activeClassName="admin-link-active">
                        Products
                    </NavLink>
                </li>
            </ul>
            <Route path="/admin/users" component={AdminUsers} />
            <Route path="/admin/products" component={AdminProducts} />
            <Route path="/admin/users/:id" component={AdminUser} />
        </div>
    );
};

export default AdminPage;