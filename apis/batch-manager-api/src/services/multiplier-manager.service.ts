import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MultiplierRequest } from '../models';
import { GeneratedMultilplier } from '../models/generated-multiplier.model';

const BASE_PATH = process.env.GENERATOR_SERVICE_BASE_URL || 
'http://localhost:8082/api/multiplier';

function ping(): Observable<any> {
    return RxHR.get(`${BASE_PATH}/ping`).pipe(map(response => response.body));
}
function create(request: MultiplierRequest): Observable<any> {
    const options = {
        body: request,
        json: true
    };
    return RxHR.post(`${BASE_PATH}/create`, options).pipe(map(response => response.body));
}
function getAll(): Observable<GeneratedMultilplier[]> {
    return RxHR.get<GeneratedMultilplier[]>(`${BASE_PATH}/get-all`).pipe(map(response => response.body));;
}
function clearAll():Observable<any> {
    return RxHR.delete(`${BASE_PATH}/clear-all`);
}

export const multiplierManagerService = {
    ping,
    create,
    getAll,
    clearAll
};
