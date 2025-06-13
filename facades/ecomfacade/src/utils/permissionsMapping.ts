import { PermissionKey } from './permissionKeys.js';

export const RolePermissions: { [role: string]: PermissionKey[] } = {
  admin: [
    // Product Permissions
    PermissionKey.CreateProduct,
    PermissionKey.ViewProduct,
    PermissionKey.ViewAllProducts,
    PermissionKey.ViewProductsCount,
    PermissionKey.UpdateProduct,
    PermissionKey.ReplaceProduct,
    PermissionKey.DeleteProduct,

    // OrderItem Permissions
    PermissionKey.CreateOrderItem,
    PermissionKey.ViewOrderItem,
    PermissionKey.ViewAllOrderItems,
    PermissionKey.ViewOrderItemsCount,
    PermissionKey.UpdateOrderItem,
    PermissionKey.ReplaceOrderItem,
    PermissionKey.DeleteOrderItem,

    // Order Permissions
    PermissionKey.CreateOrder,
    PermissionKey.ViewOrder,
    PermissionKey.ViewAllOrders,
    PermissionKey.ViewOrdersCount,
    PermissionKey.UpdateOrder,
    PermissionKey.ReplaceOrder,
    PermissionKey.DeleteOrder,

    // Cart Permissions
    PermissionKey.CreateCart,
    PermissionKey.ViewCart,
    PermissionKey.ViewAllCarts,
    PermissionKey.ViewCartsCount,
    PermissionKey.UpdateCart,
    PermissionKey.ReplaceCart,
    PermissionKey.DeleteCart,

    // Category Permissions
    PermissionKey.CreateCategory,
    PermissionKey.ViewCategory,
    PermissionKey.ViewAllCategories,
    PermissionKey.ViewCategoriesCount,
    PermissionKey.UpdateCategory,
    PermissionKey.ReplaceCategory,
    PermissionKey.DeleteCategory,

    // Blanket Access
    PermissionKey.Admin,
  ],
  user: [
    // Product Permissions
    PermissionKey.ViewProduct,
    PermissionKey.ViewAllProducts,

    // OrderItem Permissions
    PermissionKey.ViewOrderItem,
    PermissionKey.ViewAllOrderItems,

    // Order Permissions
    PermissionKey.ViewOrder,
    PermissionKey.ViewAllOrders,

    // Cart Permissions
    PermissionKey.ViewCart,
    PermissionKey.ViewAllCarts,

    // Category Permissions
    PermissionKey.ViewCategory,
    PermissionKey.ViewAllCategories,

    // Blanket Access
    PermissionKey.User,
  ],
};