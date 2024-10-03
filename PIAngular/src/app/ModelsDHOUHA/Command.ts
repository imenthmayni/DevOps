import { Cart } from "./Cart";
import { CommandPayment } from "./CommandPayment.enum";
import { CommandStatus } from "./CommandStatus.enum";
import { User } from "./User";
export interface Command {
    commandId: number;
    dateCommand: string; 
    commandStatus: CommandStatus;
    commandPayment: CommandPayment;
    user: User; 
    cart: Cart; 
  }