"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryDataService = /** @class */ (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var kommentit = [
            { id: 11, name: 'Mr. Nice', comment: 'Tänne mäkkäri' },
            { id: 12, name: 'Narco', comment: 'Tänne hai-hieronta' },
            { id: 13, name: 'Bombasto', comment: 'Tänne hai-hieronta' },
            { id: 14, name: 'Celeritas', comment: 'Tänne hai-hieronta' },
            { id: 15, name: 'Magneta', comment: 'Tänne hai-hieronta' },
            { id: 16, name: 'RubberMan', comment: 'Tänne hai-hieronta' },
            { id: 17, name: 'Dynama', comment: 'Tänne hai-hieronta' },
            { id: 18, name: 'Dr IQ', comment: 'Tänne hai-hieronta' },
            { id: 19, name: 'Magma', comment: 'Tänne hai-hieronta' },
            { id: 20, name: 'Tornado', comment: 'Tänne hai-hieronta' }
        ];
        return { kommentit: kommentit };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map