import { User } from "./User";

export interface Review{

    reviewId?: number;
    reviewTitle?: string;
    reviewText?: string;
    verified?: boolean;
    rating?: number;
    name?: string;
    user?: User;
  
}
