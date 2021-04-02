import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneratedNumber, GeneratorRequest } from '../models';

const BASE_PATH = process.env.GENERATOR_SERVICE_BASE_URL || 
'http://localhost:8081/api/generator';

function ping(): Observable<any> {
    return RxHR.get(`${BASE_PATH}/ping`).pipe(map(response => response.body));
}
function create(request: GeneratorRequest): Observable<any> {
    const options = {
        body: request,
        json: true
    };
    return RxHR.post(`${BASE_PATH}/create`, options).pipe(map(response => response.body));
}
function getAll(): Observable<GeneratedNumber[]> {
    return RxHR.get<GeneratedNumber[]>(`${BASE_PATH}/get-all`).pipe(map(response => response.body));;
}
function clearAll():Observable<any> {
    return RxHR.delete(`${BASE_PATH}/clear-all`);
}

export const generatorManagerService = {
    ping,
    create,
    getAll,
    clearAll
};
