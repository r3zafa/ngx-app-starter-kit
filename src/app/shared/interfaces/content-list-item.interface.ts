import { MatIconType } from "../types/mat-icon.type";


export interface ListItemBase {
  title: string;
  route: string;
  icon?: MatIconType;
}

export interface ContentListItem extends ListItemBase {
  subtitle?: string;
  subroutes?: ListItemBase[];
}

