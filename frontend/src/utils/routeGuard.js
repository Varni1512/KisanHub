import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ROLE_ROUTES = {
  Farmer: '/farmer',
  User: '/user',
  Seller: '/user',
  'Medicine Shopkeeper': '/medicine',
  Admin: '/admin',
};

export function useRoleGuard(allowedRoles) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user?._id) {
      navigate('/login', { replace: true });
      return;
    }
    const role = user.role;
    if (!allowedRoles.includes(role)) {
      const correctRoute = ROLE_ROUTES[role] || '/user';
      navigate(correctRoute, { replace: true });
    }
  }, [user?._id, user?.role, allowedRoles, navigate]);
}
