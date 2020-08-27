import * as React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';

const Header: React.SFC<RouteComponentProps> = props => {

    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        setSearch(props.location.search);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.history.push(`/products?search=${search}`);
        }
    }

    return (
        <header className='header'>
            <h1 className='header-title'>React Router with typescript</h1>
            <span><div className='search-container'>
                <input type='search'
                    value={search}
                    placeholder='search'
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
                <NavLink className="header-link"
                    activeClassName="header-link-active"
                    to="/products">Products</NavLink>
                <NavLink className="header-link"
                    activeClassName="header-link-active"
                    to="/admin">Admin</NavLink>
                <NavLink className="header-link"
                    activeClassName="header-link-active"
                    to="/alert">Alert</NavLink>
            </span>
        </header>
    );
};

export default withRouter(Header);