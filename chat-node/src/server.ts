import { http } from './http';
import './websockets/User';

http.listen(3333, () => console.log("Server is running on port 3333"));