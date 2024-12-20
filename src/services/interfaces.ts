export interface Category {
    _id: number;
    name: string;
    items: CategoryItems;
}

export type Categories = Category[];
  
export interface CategoryItem {
    id: number;
    name: string;
}
  
export type CategoryItems = CategoryItem[];

export interface Choice {
    userId: string;
    category: string;
    choice: number;
    choiceName: string;
}

export interface ChoiseR {
    hasChosen: boolean;
    choiceName?: string;
}

export interface Votes {
    votes: number, choiceName: string
}

export type Voteses = Votes[]