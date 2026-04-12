
export interface TimeRange {
  startDate?: Date;
  endDate?: Date;
}

export interface DashboardStats {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalUsers: number;
    totalProducts: number;
    averageOrderValue: number;
  };
  charts: {
    revenueTrend: Array<{ date: string; revenue: number }>;
    orderTrend: Array<{ date: string; count: number }>;
    topProducts: Array<{ id: string; name: string; sold: number; revenue: number }>;
    categoryDistribution: Array<{ name: string; count: number }>;
  };
  recent: {
    recentOrders: Array<any>;
    recentUsers: Array<any>;
    lowStockProducts: Array<any>;
  };
}

export interface SellerDashboardStats {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    averageRating: number;
  };
  charts: {
    revenueTrend: Array<{ date: string; revenue: number }>;
    topProducts: Array<{ id: string; name: string; sold: number; revenue: number }>;
  };
  recent: {
    recentOrders: Array<any>;
    lowStockProducts: Array<any>;
    recentReviews: Array<any>;
  };
}