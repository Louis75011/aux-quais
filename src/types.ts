export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'salé' | 'sucré' | 'boissons' | 'plat-du-jour';
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderMethod = 'takeaway' | 'delivery' | 'dine-in';
