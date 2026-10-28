export interface MenuItem {
  id: string;
  name: string;
  price: number;
  note?: string;
}

export interface MenuCategory {
  id: string;
  number: string;
  title: string;
  items: MenuItem[];
  footerNote?: string;
  infoOnly?: boolean;
  infoText?: string;
}

export interface CartLine {
  id: string;
  name: string;
  price: number;
  qty: number;
  categoryTitle: string;
}
