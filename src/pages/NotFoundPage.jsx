import {  NavLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <p>Page not found</p>
      <p>
        Return to <NavLink to={'/'}>Home Page</NavLink>
      </p>
    </>
  );
}
