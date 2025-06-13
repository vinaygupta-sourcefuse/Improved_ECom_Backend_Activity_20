export enum PermissionKey {
  // Product Permissions
  CreateProduct = 'create_product',
  ViewProduct = 'view_product',
  ViewAllProducts = 'view_all_products',
  ViewProductsCount = 'view_products_count',
  UpdateProduct = 'update_product',
  ReplaceProduct = 'replace_product',
  DeleteProduct = 'delete_product',

  // OrderItem Permissions
  CreateOrderItem = 'create_order_item',
  ViewOrderItem = 'view_order_item',
  ViewAllOrderItems = 'view_all_order_items',
  ViewOrderItemsCount = 'view_order_items_count',
  UpdateOrderItem = 'update_order_item',
  ReplaceOrderItem = 'replace_order_item',
  DeleteOrderItem = 'delete_order_item',

  // Order Permissions
  CreateOrder = 'create_order',
  ViewOrder = 'view_order',
  ViewAllOrders = 'view_all_orders',
  ViewOrdersCount = 'view_orders_count',
  UpdateOrder = 'update_order',
  ReplaceOrder = 'replace_order',
  DeleteOrder = 'delete_order',

  // Cart Permissions
  CreateCart = 'create_cart',
  ViewCart = 'view_cart',
  ViewAllCarts = 'view_all_carts',
  ViewCartsCount = 'view_carts_count',
  UpdateCart = 'update_cart',
  ReplaceCart = 'replace_cart',
  DeleteCart = 'delete_cart',

  // Category Permissions
  CreateCategory = 'create_category',
  ViewCategory = 'view_category',
  ViewAllCategories = 'view_all_categories',
  ViewCategoriesCount = 'view_categories_count',
  UpdateCategory = 'update_category',
  ReplaceCategory = 'replace_category',
  DeleteCategory = 'delete_category',

  // Optional: Admin-level blanket access (if used)
  Admin = 'admin',
  User = 'user',
}
