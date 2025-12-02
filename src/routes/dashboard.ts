import { Router } from 'express';
import { getCustomers, getCustomerById, getProducts, getDashboardStats } from '../controllers/dashboardController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.use(authenticateAdmin);

router.get('/stats', getDashboardStats);
router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.get('/products', getProducts);

export default router;