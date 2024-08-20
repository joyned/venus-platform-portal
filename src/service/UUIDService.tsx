import { v4 as uuidv4 } from 'uuid';

export default class UUIDService {
    static generateUUID(): any {
        return uuidv4();
    }
}